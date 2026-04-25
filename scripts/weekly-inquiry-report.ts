#!/usr/bin/env node --experimental-strip-types
/**
 * W7 QW#15: Weekly inquiry report generator.
 *
 * Pulls the last 7 days of `Inquiry Submitted` events + pageview distribution
 * from Vercel Analytics, aggregates them against the `referrer_bucket` /
 * `inquiry_intent` / `context_type` dimensions and produces a Markdown report
 * under `reports/inquiry-YYYY-Www.md`.
 *
 * Env:
 *   VERCEL_ANALYTICS_TOKEN   Team / project token (optional; if missing the
 *                            script produces a skeleton report with TBDs and
 *                            exits 0 so it can run in CI without secrets yet)
 *   VERCEL_PROJECT_ID        Project ID for the analytics API
 *   VERCEL_TEAM_ID           Team ID (if project lives under a team)
 *
 * Usage:
 *   npm run inquiry:report               # write reports/inquiry-YYYY-Www.md
 *   npm run inquiry:report -- --dry      # print to stdout, no file write
 *   npm run inquiry:report -- --days=14  # custom window (default 7)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

type ReferrerBucket = string;

interface InquiryEventPoint {
  timestamp: string;
  inquiry_intent?: string;
  context_type?: string;
  referrer_bucket?: ReferrerBucket;
  delivery_mode?: string;
  utm_source?: string;
  utm_medium?: string;
  page?: string;
}

interface PageviewPoint {
  page: string;
  views: number;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// ---------- CLI args ----------
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const DAYS = (() => {
  const flag = args.find((a) => a.startsWith('--days='));
  if (!flag) return 7;
  const n = parseInt(flag.split('=')[1]!, 10);
  return Number.isFinite(n) && n > 0 ? n : 7;
})();

// ---------- Date / week helpers ----------
function isoWeek(date: Date): { year: number; week: number } {
  // Thursday in current week decides the year (ISO 8601)
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;

  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);

  return { year: tmp.getUTCFullYear(), week };
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDate(date: Date): string {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

// ---------- Vercel Analytics fetch (best-effort) ----------
async function fetchVercelEvents(days: number): Promise<{
  submits: InquiryEventPoint[];
  pageviews: PageviewPoint[];
  mode: 'live' | 'token-missing' | 'fetch-failed';
  reason?: string;
} > {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return {
      submits: [],
      pageviews: [],
      mode: 'token-missing',
      reason: `Set VERCEL_ANALYTICS_TOKEN + VERCEL_PROJECT_ID${teamId ? '' : ' (VERCEL_TEAM_ID optional)'} to enable live data.`,
    };
  }

  const from = Date.now() - days * 86_400_000;
  const to = Date.now();
  const base = 'https://vercel.com/api/web/insights/v2';
  const params = new URLSearchParams({ projectId, from: String(from), to: String(to) });

  if (teamId) params.set('teamId', teamId);

  try {
    const [customRes, viewsRes] = await Promise.all([
      fetch(`${base}/custom-events?${params.toString()}&eventName=Inquiry%20Submitted`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${base}/page-views?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!customRes.ok || !viewsRes.ok) {
      return {
        submits: [],
        pageviews: [],
        mode: 'fetch-failed',
        reason: `Vercel API responded custom=${customRes.status} views=${viewsRes.status}`,
      };
    }

    const customJson = (await customRes.json()) as { data?: Array<{ properties?: Record<string, string>; timestamp?: string }> };
    const viewsJson = (await viewsRes.json()) as { data?: Array<{ page?: string; views?: number }> };

    const submits: InquiryEventPoint[] = (customJson.data || []).map((e) => ({
      timestamp: e.timestamp || '',
      inquiry_intent: e.properties?.inquiry_intent,
      context_type: e.properties?.context_type,
      referrer_bucket: e.properties?.referrer_bucket,
      delivery_mode: e.properties?.delivery_mode,
      utm_source: e.properties?.utm_source,
      utm_medium: e.properties?.utm_medium,
      page: e.properties?.page,
    }));
    const pageviews: PageviewPoint[] = (viewsJson.data || []).map((v) => ({
      page: v.page || '/',
      views: v.views || 0,
    }));

    return { submits, pageviews, mode: 'live' };
  } catch (error) {
    return {
      submits: [],
      pageviews: [],
      mode: 'fetch-failed',
      reason: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ---------- Aggregation ----------
function crosstab<T extends string>(items: Array<Record<string, string | undefined>>, dim: string): Array<{ key: T; count: number; pct: number }> {
  const total = items.length || 1;
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = (item[dim] || 'unknown').toString();

    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([key, count]) => ({ key: key as T, count, pct: Math.round((count / total) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);
}

function formatTable(headers: string[], rows: Array<Array<string | number>>): string {
  if (!rows.length) return '*No data in window.*';

  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');

  return `${head}\n${sep}\n${body}`;
}

// ---------- Report builder ----------
function buildReport(
  submits: InquiryEventPoint[],
  pageviews: PageviewPoint[],
  mode: string,
  reason: string | undefined,
  windowDays: number
): string {
  const now = new Date();
  const { year, week } = isoWeek(now);
  const windowEnd = now;
  const windowStart = new Date(now.getTime() - windowDays * 86_400_000);

  const totalSubmits = submits.length;
  const byReferrer = crosstab(submits, 'referrer_bucket');
  const byIntent = crosstab(submits, 'inquiry_intent');
  const byContext = crosstab(submits, 'context_type');
  const byUtm = crosstab(submits, 'utm_source');

  const aiShare = byReferrer
    .filter((r) => r.key.startsWith('ai_engine:'))
    .reduce((sum, r) => sum + r.count, 0);
  const aiPct = totalSubmits > 0 ? Math.round((aiShare / totalSubmits) * 1000) / 10 : 0;

  // Top landing pages + zero-inquiry pages
  const pagesBySubmit = new Map<string, number>();

  for (const s of submits) {
    const p = s.page || '/contact';

    pagesBySubmit.set(p, (pagesBySubmit.get(p) || 0) + 1);
  }

  const topLanding = pageviews
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
    .map((v) => ({ page: v.page, views: v.views, submits: pagesBySubmit.get(v.page) || 0 }));
  const zeroInquiry = pageviews
    .filter((v) => v.views >= 50 && !pagesBySubmit.has(v.page))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const lines: string[] = [];

  lines.push(`# RFIDAK 询盘周报 — ${year}-W${pad2(week)}`);
  lines.push('');
  lines.push(`**窗口**：${formatDate(windowStart)} → ${formatDate(windowEnd)}（${windowDays} 天）`);
  lines.push(`**数据源**：Vercel Analytics · 模式 = **${mode}**${reason ? `（${reason}）` : ''}`);
  lines.push(`**总询盘数**：${totalSubmits}`);
  lines.push(`**AI 引擎占比**：${aiPct}% (${aiShare}/${totalSubmits})`);
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push('## A. 按 referrer_bucket 分桶');
  lines.push('');
  lines.push(
    formatTable(
      ['Bucket', 'Count', 'Share'],
      byReferrer.map((r) => [r.key, r.count, `${r.pct}%`])
    )
  );
  lines.push('');

  lines.push('## B. 按 inquiry_intent');
  lines.push('');
  lines.push(
    formatTable(
      ['Intent', 'Count', 'Share'],
      byIntent.map((r) => [r.key, r.count, `${r.pct}%`])
    )
  );
  lines.push('');

  lines.push('## C. 按 context_type');
  lines.push('');
  lines.push(
    formatTable(
      ['Context', 'Count', 'Share'],
      byContext.map((r) => [r.key, r.count, `${r.pct}%`])
    )
  );
  lines.push('');

  lines.push('## D. UTM source Top');
  lines.push('');
  lines.push(
    formatTable(
      ['utm_source', 'Count', 'Share'],
      byUtm.map((r) => [r.key, r.count, `${r.pct}%`])
    )
  );
  lines.push('');

  lines.push('## E. 落地页 Top 10（pageview 排序）');
  lines.push('');
  lines.push(
    formatTable(
      ['Page', 'Views', 'Submits', 'CVR'],
      topLanding.map((r) => [r.page, r.views, r.submits, r.views ? `${Math.round((r.submits / r.views) * 1000) / 10}%` : '-'])
    )
  );
  lines.push('');

  lines.push('## F. 零询盘页（≥50 views 但 0 submit）');
  lines.push('');
  lines.push(
    formatTable(
      ['Page', 'Views'],
      zeroInquiry.map((r) => [r.page, r.views])
    )
  );
  lines.push('');

  lines.push('## G. 下一步动作（自动生成 — 供每周复盘）');
  lines.push('');
  lines.push('- [ ] 对 AI 引擎占比 < 5% 的周：按 `RFIDAK-Authority-Optimization-Prompts.md` 补 llms-full.txt 典型问答');
  lines.push('- [ ] 对零询盘页 TOP 3：检查是否缺决策卡 / CTA / Sample Express 入口');
  lines.push('- [ ] 对 `other` referrer_bucket ≥ 20% 的周：补 `classifyReferrer` 的白名单域名');
  lines.push('');
  lines.push(`> 生成时间：${now.toISOString()}`);

  return lines.join('\n');
}

// ---------- Main ----------
(async () => {
  const { submits, pageviews, mode, reason } = await fetchVercelEvents(DAYS);
  const report = buildReport(submits, pageviews, mode, reason, DAYS);

  if (DRY) {
    console.log(report);
    return;
  }

  const { year, week } = isoWeek(new Date());
  const fileName = `inquiry-${year}-W${pad2(week)}.md`;
  const outDir = join(projectRoot, 'reports');
  const outPath = join(outDir, fileName);

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  writeFileSync(outPath, report + '\n', 'utf8');
  console.log(`[inquiry-report] Wrote ${outPath} (mode=${mode}, submits=${submits.length}, days=${DAYS})`);
  if (mode !== 'live') {
    console.warn(`[inquiry-report] Note: ${reason}`);
  }
})().catch((err) => {
  console.error('[inquiry-report] Failed:', err);
  process.exit(1);
});
