#!/usr/bin/env node --experimental-strip-types
/**
 * Blog v3.1 quality audit.
 *
 * Loads all posts from src/data/blogs.ts + FAQ sets from src/data/blogSeo.ts,
 * scores each against the v3.1 quality bar, and produces a Markdown gap report.
 *
 * v3.1 quality bar (per ProudTek-Blog-Upgrade-Prompts-v3.1-Local.md):
 *   - title: 50–75 chars
 *   - metaDescription: ≤ 155 chars
 *   - keywords: 5–8 comma-separated
 *   - excerpt: 180–280 chars, first sentence ≤ 25 words
 *   - content: ≥ 1500 words, ≥ 6 H2, 80% paragraphs ≤ 60 words
 *   - internal links (same-site): ≥ 6
 *   - external sources / citations: ≥ 5 (counted by <a href="http"> with rel=external/authoritative or "Sources" section)
 *   - FAQ entries in blogSeo.ts: ≥ 8
 *   - JSON-LD: Article + FAQPage (auto-handled by template — no per-post check)
 *
 * Output: reports/blog-quality-audit-YYYY-MM-DD.md with per-post pass/fail + totals.
 *
 * Usage:
 *   npm run blog:audit
 *   npm run blog:audit -- --dry           # print to stdout, no file write
 *   npm run blog:audit -- --top=N         # write only the top-N worst posts
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// CLI args
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const TOP = (() => {
  const flag = args.find((a) => a.startsWith('--top='));
  if (!flag) return 0;
  const n = parseInt(flag.split('=')[1]!, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
})();

// ---------- v3.1 thresholds ----------
const BAR = {
  titleMin: 50,
  titleMax: 75,
  metaDescMax: 155,
  keywordsMin: 5,
  keywordsMax: 8,
  excerptMinChars: 180,
  excerptMaxChars: 280,
  excerptFirstSentenceMaxWords: 25,
  contentMinWords: 1500,
  h2MinCount: 6,
  paragraphMaxWords: 60,
  paragraphShortPct: 0.8, // ≥ 80% paragraphs must be ≤ 60 words
  internalLinksMin: 6,
  sourcesMin: 5,
  faqMin: 8,
};

// ---------- Helpers ----------
const stripTags = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

function countMatches(html: string, re: RegExp): number {
  const m = html.match(re);

  return m ? m.length : 0;
}

function firstSentenceWords(text: string): number {
  const first = text.split(/(?<=[.!?])\s+/)[0] || text;

  return wordCount(first);
}

function internalVsExternalLinks(html: string): { internal: number; external: number } {
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let internal = 0;
  let external = 0;
  let m: RegExpExecArray | null;

  while ((m = anchorRe.exec(html)) !== null) {
    const href = m[1] || '';

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes('rfidak.com')) internal++;
      else external++;
    } else if (href.startsWith('/')) {
      internal++;
    }
  }

  return { internal, external };
}

function paragraphShortPct(html: string): { total: number; short: number; pct: number } {
  const pRe = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let total = 0;
  let short = 0;
  let m: RegExpExecArray | null;

  while ((m = pRe.exec(html)) !== null) {
    const text = stripTags(m[1] || '');

    if (!text) continue;
    total++;
    if (wordCount(text) <= BAR.paragraphMaxWords) short++;
  }

  return { total, short, pct: total ? short / total : 1 };
}

function hasSourcesSection(html: string): boolean {
  return /<h2[^>]*>\s*(?:<[^>]+>)*\s*(?:sources|references|citations|\u6765\u6e90|\u5f15\u7528)/i.test(html);
}

// ---------- Audit ----------
interface PostMetric {
  slug: string;
  title: string;
  category: string;
  checks: Array<{ name: string; pass: boolean; actual: string | number; target: string }>;
  passCount: number;
  totalCount: number;
}

async function runAudit(): Promise<PostMetric[]> {
  const blogsModulePath = 'file:///' + join(projectRoot, 'src/data/blogs.ts').replace(/\\/g, '/');
  const seoModulePath = 'file:///' + join(projectRoot, 'src/data/blogSeo.ts').replace(/\\/g, '/');

  const { blogPosts } = (await import(blogsModulePath)) as { blogPosts: any[] };
  const { blogFaqs } = (await import(seoModulePath)) as { blogFaqs: Record<string, Array<unknown>> };

  const metrics: PostMetric[] = [];

  for (const post of blogPosts) {
    const checks: PostMetric['checks'] = [];

    // Title length
    const titleLen = (post.seoTitle || post.title || '').length;
    checks.push({
      name: 'title length',
      pass: titleLen >= BAR.titleMin && titleLen <= BAR.titleMax,
      actual: titleLen,
      target: `${BAR.titleMin}\u2013${BAR.titleMax}`,
    });

    // Meta description
    const metaLen = (post.metaDescription || '').length;
    checks.push({
      name: 'metaDescription length',
      pass: metaLen > 0 && metaLen <= BAR.metaDescMax,
      actual: metaLen,
      target: `1\u2013${BAR.metaDescMax}`,
    });

    // Keywords count
    const kwCount = (post.keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean).length;
    checks.push({
      name: 'keywords count',
      pass: kwCount >= BAR.keywordsMin && kwCount <= BAR.keywordsMax,
      actual: kwCount,
      target: `${BAR.keywordsMin}\u2013${BAR.keywordsMax}`,
    });

    // Excerpt length + first sentence
    const excerpt = post.excerpt || '';
    const excerptLen = excerpt.length;
    const excerptFirstWords = firstSentenceWords(excerpt);
    checks.push({
      name: 'excerpt length',
      pass: excerptLen >= BAR.excerptMinChars && excerptLen <= BAR.excerptMaxChars,
      actual: excerptLen,
      target: `${BAR.excerptMinChars}\u2013${BAR.excerptMaxChars}`,
    });
    checks.push({
      name: 'excerpt first sentence words',
      pass: excerptFirstWords <= BAR.excerptFirstSentenceMaxWords,
      actual: excerptFirstWords,
      target: `\u2264${BAR.excerptFirstSentenceMaxWords}`,
    });

    // Content word count
    const content: string = post.content || '';
    const contentText = stripTags(content);
    const wc = wordCount(contentText);
    checks.push({
      name: 'content words',
      pass: wc >= BAR.contentMinWords,
      actual: wc,
      target: `\u2265${BAR.contentMinWords}`,
    });

    // H2 count
    const h2 = countMatches(content, /<h2\b[^>]*>/gi);
    checks.push({
      name: 'H2 sections',
      pass: h2 >= BAR.h2MinCount,
      actual: h2,
      target: `\u2265${BAR.h2MinCount}`,
    });

    // Paragraph short percentage
    const par = paragraphShortPct(content);
    checks.push({
      name: 'short paragraph rate',
      pass: par.pct >= BAR.paragraphShortPct,
      actual: `${Math.round(par.pct * 100)}% (${par.short}/${par.total})`,
      target: `\u2265${Math.round(BAR.paragraphShortPct * 100)}%`,
    });

    // Internal / external links
    const links = internalVsExternalLinks(content);
    checks.push({
      name: 'internal links',
      pass: links.internal >= BAR.internalLinksMin,
      actual: links.internal,
      target: `\u2265${BAR.internalLinksMin}`,
    });
    checks.push({
      name: 'external sources',
      pass: links.external >= BAR.sourcesMin || hasSourcesSection(content),
      actual: `${links.external}${hasSourcesSection(content) ? ' (+Sources section)' : ''}`,
      target: `\u2265${BAR.sourcesMin} or Sources section`,
    });

    // FAQ count
    const faq = blogFaqs[post.slug];
    const faqCount = Array.isArray(faq) ? faq.length : 0;
    checks.push({
      name: 'FAQ entries',
      pass: faqCount >= BAR.faqMin,
      actual: faqCount,
      target: `\u2265${BAR.faqMin}`,
    });

    const passCount = checks.filter((c) => c.pass).length;

    metrics.push({
      slug: post.slug,
      title: post.title,
      category: post.category || '',
      checks,
      passCount,
      totalCount: checks.length,
    });
  }

  return metrics;
}

// ---------- Report ----------
function renderReport(metrics: PostMetric[]): string {
  const sorted = metrics.slice().sort((a, b) => a.passCount - b.passCount || a.slug.localeCompare(b.slug));
  const topMetrics = TOP > 0 ? sorted.slice(0, TOP) : sorted;

  const totalPosts = metrics.length;
  const avgPass = metrics.reduce((s, m) => s + m.passCount / m.totalCount, 0) / Math.max(totalPosts, 1);
  const fullPassCount = metrics.filter((m) => m.passCount === m.totalCount).length;

  // Per-check failure distribution
  const checkFailStats = new Map<string, number>();

  for (const m of metrics) {
    for (const c of m.checks) {
      if (!c.pass) {
        checkFailStats.set(c.name, (checkFailStats.get(c.name) || 0) + 1);
      }
    }
  }

  const checkRanking = Array.from(checkFailStats.entries())
    .sort((a, b) => b[1] - a[1]);

  const lines: string[] = [];

  lines.push(`# RFIDAK \u535a\u5ba2 v3.1 \u8d28\u91cf\u5ba1\u8ba1`);
  lines.push('');
  lines.push(`\u751f\u6210\u65f6\u95f4\uff1a${new Date().toISOString()}`);
  lines.push(`\u603b\u7bc7\u6570\uff1a${totalPosts}`);
  lines.push(`\u5b8c\u5168\u8fbe\u6807\uff1a${fullPassCount} / ${totalPosts}`);
  lines.push(`\u5e73\u5747\u901a\u8fc7\u7387\uff1a${Math.round(avgPass * 100)}%`);
  lines.push('');
  lines.push('## A. \u6bcf\u9879\u68c0\u67e5\u5931\u8d25\u5206\u5e03\uff08\u9ad8 \u2192 \u4f4e\uff09');
  lines.push('');
  lines.push('| \u68c0\u67e5\u9879 | \u5931\u8d25\u7bc7\u6570 | \u5931\u8d25\u7387 |');
  lines.push('| --- | ---: | ---: |');
  for (const [name, fails] of checkRanking) {
    lines.push(`| ${name} | ${fails} | ${Math.round((fails / totalPosts) * 100)}% |`);
  }
  lines.push('');

  lines.push(`## B. \u9010\u7bc7\u5ba1\u8ba1\u8be6\u60c5${TOP > 0 ? `\uff08Top ${TOP} \u6700\u5dee\uff09` : ''}`);
  lines.push('');
  lines.push('> \u6309\u901a\u8fc7\u9879\u5347\u5e8f\uff08\u6700\u9700\u8981\u4fee\u7684\u6392\u6700\u524d\uff09\u3002');
  lines.push('');

  for (const m of topMetrics) {
    lines.push(`### ${m.slug} \u2014 \u901a\u8fc7 ${m.passCount}/${m.totalCount}`);
    lines.push(`**Title**: ${m.title}`);
    lines.push(`**Category**: ${m.category}`);
    lines.push('');
    lines.push('| \u68c0\u67e5\u9879 | \u72b6\u6001 | \u5b9e\u9645 | \u76ee\u6807 |');
    lines.push('| --- | :---: | --- | --- |');
    for (const c of m.checks) {
      lines.push(`| ${c.name} | ${c.pass ? '\u2705' : '\u274c'} | ${c.actual} | ${c.target} |`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## C. \u5347\u7ea7\u5efa\u8bae\uff08\u81ea\u52a8\u751f\u6210\uff09');
  lines.push('');
  lines.push('\u4f18\u5148\u5904\u7406\u5931\u8d25\u7387 > 30% \u7684\u68c0\u67e5\u9879\uff0c\u56e0\u4e3a\u6a2a\u626b 32 \u7bc7\u80fd\u4e00\u6279\u65b9\u6848\u3002');
  for (const [name, fails] of checkRanking) {
    const pct = fails / totalPosts;
    if (pct > 0.3) {
      lines.push(`- **${name}**\uff08${fails}/${totalPosts} \u5931\u8d25\uff09\uff1a\u5efa\u8bae\u5efa\u4e00\u4e2a\u6279\u91cf\u811a\u672c\u6216\u4e00\u6b21\u6027 PR \u5904\u7406`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('\u5347\u7ea7\u5b8c\u6210\u540e\u91cd\u8dd1\uff1a`npm run blog:audit`');

  return lines.join('\n');
}

// ---------- Main ----------
(async () => {
  const metrics = await runAudit();
  const report = renderReport(metrics);

  if (DRY) {
    console.log(report);
    return;
  }

  const date = new Date();
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const fileName = `blog-quality-audit-${y}-${m}-${d}.md`;
  const outDir = join(projectRoot, 'reports');

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, fileName);

  writeFileSync(outPath, report + '\n', 'utf8');

  const fullPass = metrics.filter((m) => m.passCount === m.totalCount).length;

  console.log(`[blog-audit] Wrote ${outPath}`);
  console.log(`[blog-audit] Posts: ${metrics.length} | Full-pass: ${fullPass} | Avg pass: ${Math.round(
    (metrics.reduce((s, m) => s + m.passCount / m.totalCount, 0) / metrics.length) * 100
  )}%`);
})().catch((err) => {
  console.error('[blog-audit] Failed:', err);
  process.exit(1);
});
