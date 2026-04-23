#!/usr/bin/env node --experimental-strip-types
/**
 * Mechanical v3.1 fixes across all posts in src/data/blogs.ts.
 *
 * Strategy (agreed with user): keep every word the author wrote, just
 * re-layer the content.
 *   - excerpt > 280 chars → truncate at sentence boundary into 180–280 chars,
 *                           prepend the remainder to `content` as a fresh <p>
 *                           so nothing is lost and word count goes up.
 *   - first sentence > 25 words → cut at first comma/semicolon inside the
 *                           25-word window; rest stays in excerpt/content.
 *   - metaDescription > 155 chars → trim at last word boundary inside 155.
 *   - title < 50 chars → append " — RFIDAK 2026 Guide" until in range, capped
 *                        at 75 chars.
 *   - title > 75 chars → cut at last word boundary ≤ 75.
 *   - keywords count < 5 → append brand fallback keywords until 5.
 *
 * Writes updated src/data/blogs.ts in place. Preserves the file's existing
 * formatting (string quotes, content backticks) by doing targeted
 * String.replace calls anchored to the exact unique old value.
 *
 *   npm run blog:fix -- --dry   # print plan, do not write
 *   npm run blog:fix            # write blogs.ts, re-run audit
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const blogsTsPath = join(projectRoot, 'src/data/blogs.ts');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');

// ---------- v3.1 thresholds ----------
const EXCERPT_MIN = 180;
const EXCERPT_MAX = 280;
const FIRST_SENTENCE_MAX_WORDS = 25;
const META_MAX = 155;
const TITLE_MIN = 50;
const TITLE_MAX = 75;
const KEYWORDS_MIN = 5;

// Brand appendix — used to pad short titles / keyword lists
const TITLE_APPENDIX_OPTIONS = [' Guide 2026', ' for B2B Buyers', ' — RFIDAK'];
const KEYWORDS_FALLBACK = ['RFID manufacturer China', 'RFIDAK', 'smart card supplier', 'OEM RFID', 'wholesale RFID'];

// ---------- Helpers ----------
const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length;

function splitSentences(text: string): string[] {
  // Keep sentence-ending punctuation attached. Do not break on abbreviations
  // like "U.S." or "e.g." because our excerpts are technical prose.
  const raw = text.split(/(?<=[.!?])\s+(?=[A-Z(])/);

  return raw.map((s) => s.trim()).filter(Boolean);
}

function computeNewExcerpt(raw: string): { excerpt: string; tail: string; firstSentencePatched: boolean } {
  const sentences = splitSentences(raw);

  if (sentences.length === 0) return { excerpt: raw, tail: '', firstSentencePatched: false };

  let firstSentencePatched = false;
  let first = sentences[0]!;

  if (wordCount(first) > FIRST_SENTENCE_MAX_WORDS) {
    // Cut at first comma/semicolon/colon inside the 25-word window
    const words = first.split(/\s+/);
    let cut = FIRST_SENTENCE_MAX_WORDS;

    for (let i = FIRST_SENTENCE_MAX_WORDS - 1; i >= 5; i--) {
      const w = words[i] || '';

      if (/[,;:]$/.test(w)) {
        cut = i + 1;
        break;
      }
    }
    first = words.slice(0, cut).join(' ').replace(/[,;:]$/, '') + '.';
    firstSentencePatched = true;
  }

  // Build excerpt: first sentence + additional sentences to land in 180–280
  let excerpt = first;
  let endIdx = 0;

  // Pass 1: add full sentences while we stay ≤ 280
  for (let i = 1; i < sentences.length && i < 4; i++) {
    const candidate = (excerpt + ' ' + sentences[i]).trim();

    if (candidate.length > EXCERPT_MAX) break;
    excerpt = candidate;
    endIdx = i;
  }

  // Pass 2: still below 180? Add next sentence and clause-trim to ≤ 280.
  if (excerpt.length < EXCERPT_MIN && endIdx + 1 < sentences.length) {
    const next = sentences[endIdx + 1]!;
    const overflow = (excerpt + ' ' + next).trim();

    // Trim overflow to 280 at clause boundary (comma/semicolon) or word boundary
    let trimmed = overflow.slice(0, EXCERPT_MAX);
    const punctMatch = trimmed.match(/^.*[,;:][^,;:]*$/);

    // prefer trimming at last comma/semicolon to produce readable cutoff
    const lastClause = Math.max(trimmed.lastIndexOf(', '), trimmed.lastIndexOf('; '));

    if (lastClause > EXCERPT_MIN) {
      trimmed = trimmed.slice(0, lastClause);
    } else {
      trimmed = trimmed.replace(/\s+\S*$/, '');
    }
    if (!/[.!?]$/.test(trimmed)) trimmed += '.';

    if (trimmed.length >= EXCERPT_MIN && trimmed.length <= EXCERPT_MAX) {
      excerpt = trimmed;
      // We consumed part of sentences[endIdx + 1]; still count it as "partially used"
      // for tail purposes — caller treats everything >= endIdx + 1 as tail (duplicates
      // a bit of wording from excerpt back into content. Acceptable: duplicate
      // opening sentence across excerpt + content is a common SEO pattern).
    }
  }

  // Safety: if somehow still > 280 (e.g., first sentence alone), hard-cut at word.
  if (excerpt.length > EXCERPT_MAX) {
    excerpt = excerpt.slice(0, EXCERPT_MAX).replace(/\s+\S*$/, '');
    if (!/[.!?]$/.test(excerpt)) excerpt += '.';
  }

  // Tail = everything the excerpt dropped, preserving the original first sentence if we patched it.
  const tailParts: string[] = [];

  if (firstSentencePatched) {
    tailParts.push(sentences[0]!);
  }
  for (let i = endIdx + 1; i < sentences.length; i++) {
    tailParts.push(sentences[i]!);
  }

  const tail = tailParts.join(' ').trim();

  return { excerpt, tail, firstSentencePatched };
}

function trimMeta(meta: string): string {
  if (meta.length <= META_MAX) return meta;

  let cut = meta.slice(0, META_MAX);

  cut = cut.replace(/\s+\S*$/, '');
  if (!/[.!?]$/.test(cut)) cut += '.';

  return cut;
}

function padTitle(title: string): string {
  if (title.length >= TITLE_MIN && title.length <= TITLE_MAX) return title;

  if (title.length > TITLE_MAX) {
    let cut = title.slice(0, TITLE_MAX);

    return cut.replace(/\s+\S*$/, '').replace(/[,;:\-]$/, '').trim();
  }

  let out = title;

  for (const suffix of TITLE_APPENDIX_OPTIONS) {
    if (out.length >= TITLE_MIN) break;
    const candidate = out + suffix;

    if (candidate.length <= TITLE_MAX) out = candidate;
  }

  return out;
}

function padKeywords(keywords: string): string {
  const list = keywords.split(',').map((k) => k.trim()).filter(Boolean);

  // Over max → trim
  if (list.length > 8) {
    return list.slice(0, 8).join(', ');
  }

  if (list.length >= KEYWORDS_MIN) return keywords;

  for (const kw of KEYWORDS_FALLBACK) {
    if (list.length >= KEYWORDS_MIN) break;
    if (!list.map((k) => k.toLowerCase()).includes(kw.toLowerCase())) list.push(kw);
  }

  return list.join(', ');
}

function splitTailIntoParagraphs(tail: string): string {
  // Split tail at sentence boundary so each paragraph stays ≤ 60 words
  // (v3.1 short-paragraph-rate requirement).
  const sentences = splitSentences(tail);
  const paragraphs: string[] = [];
  let current = '';

  for (const s of sentences) {
    const combined = current ? current + ' ' + s : s;

    if (wordCount(combined) > 55) {
      if (current) paragraphs.push(current);
      current = s;
    } else {
      current = combined;
    }
  }

  if (current) paragraphs.push(current);
  if (paragraphs.length === 0) return '';

  return paragraphs.map((p) => `<p>${p}</p>`).join('\n      ');
}

// ---------- In-place text patching ----------
interface Patch {
  slug: string;
  kind: 'excerpt' | 'title' | 'meta' | 'keywords' | 'content-prepend';
  oldValue: string;
  newValue: string;
}

function findPostBlock(src: string, slug: string): { start: number; end: number } | null {
  const slugNeedle = `slug: '${slug}'`;
  const slugIdx = src.indexOf(slugNeedle);

  if (slugIdx === -1) return null;

  // Walk back to the enclosing object opener `{`
  let start = slugIdx;

  while (start > 0 && src[start] !== '{') start--;

  // Walk forward, tracking brace depth, to the matching `}`
  let depth = 0;
  let i = start;

  for (; i < src.length; i++) {
    const c = src[i];

    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        return { start, end: i + 1 };
      }
    } else if (c === '`') {
      // skip over backtick template literal content
      i++;
      while (i < src.length && src[i] !== '`') {
        if (src[i] === '\\' && i + 1 < src.length) i++;
        i++;
      }
    } else if (c === "'" || c === '"') {
      // skip over quoted string
      const q = c;

      i++;
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\' && i + 1 < src.length) i++;
        i++;
      }
    }
  }

  return null;
}

function findFieldValue(block: string, field: string, quoteChar: "'" | '"' | '`'): { valueStart: number; valueEnd: number; value: string } | null {
  const needle = `${field}: ${quoteChar}`;
  const idx = block.indexOf(needle);

  if (idx === -1) return null;

  const valueStart = idx + needle.length;
  let i = valueStart;

  while (i < block.length) {
    const c = block[i];

    if (c === '\\' && i + 1 < block.length) {
      i += 2;
      continue;
    }
    if (c === quoteChar) {
      return { valueStart, valueEnd: i, value: block.slice(valueStart, i) };
    }
    i++;
  }

  return null;
}

function escapeSingleQuoted(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function decodeSingleQuoted(literal: string): string {
  return literal.replace(/\\'/g, "'").replace(/\\\\/g, '\\').replace(/\\"/g, '"');
}

// ---------- Main ----------
(async () => {
  const blogsModulePath = 'file:///' + blogsTsPath.replace(/\\/g, '/');
  const { blogPosts } = (await import(blogsModulePath)) as { blogPosts: any[] };

  let src = readFileSync(blogsTsPath, 'utf8');
  const plans: Patch[] = [];
  const summary: Array<{ slug: string; changes: string[] }> = [];

  for (const post of blogPosts) {
    const slug: string = post.slug;
    const localChanges: string[] = [];

    const blockBounds = findPostBlock(src, slug);

    if (!blockBounds) {
      console.warn(`[blog-fix] Could not locate block for slug=${slug}`);
      continue;
    }

    const block = src.slice(blockBounds.start, blockBounds.end);

    // --- excerpt ---
    const excerptField = findFieldValue(block, 'excerpt', "'");

    if (!excerptField) {
      console.warn(`[blog-fix] No excerpt field for ${slug}`);
      continue;
    }

    const currentExcerpt = decodeSingleQuoted(excerptField.value);
    let excerptTailToPrepend = '';

    if (currentExcerpt.length > EXCERPT_MAX || wordCount(splitSentences(currentExcerpt)[0] || '') > FIRST_SENTENCE_MAX_WORDS) {
      const { excerpt: newExcerpt, tail } = computeNewExcerpt(currentExcerpt);

      if (newExcerpt !== currentExcerpt) {
        plans.push({
          slug,
          kind: 'excerpt',
          oldValue: excerptField.value,
          newValue: escapeSingleQuoted(newExcerpt),
        });
        localChanges.push(`excerpt ${currentExcerpt.length}\u2192${newExcerpt.length} chars`);
        excerptTailToPrepend = tail;
      }
    }

    // --- title ---
    const titleField = findFieldValue(block, 'title', "'");

    if (titleField) {
      const currentTitle = decodeSingleQuoted(titleField.value);
      const newTitle = padTitle(currentTitle);

      if (newTitle !== currentTitle) {
        plans.push({
          slug,
          kind: 'title',
          oldValue: titleField.value,
          newValue: escapeSingleQuoted(newTitle),
        });
        localChanges.push(`title ${currentTitle.length}\u2192${newTitle.length}`);
      }
    }

    // --- seoTitle (audit reads seoTitle || title) ---
    const seoTitleField = findFieldValue(block, 'seoTitle', "'");

    if (seoTitleField) {
      const currentSeoTitle = decodeSingleQuoted(seoTitleField.value);
      const newSeoTitle = padTitle(currentSeoTitle);

      if (newSeoTitle !== currentSeoTitle) {
        plans.push({
          slug,
          kind: 'seoTitle' as any,
          oldValue: seoTitleField.value,
          newValue: escapeSingleQuoted(newSeoTitle),
        });
        localChanges.push(`seoTitle ${currentSeoTitle.length}\u2192${newSeoTitle.length}`);
      }
    }

    // --- metaDescription ---
    const metaField = findFieldValue(block, 'metaDescription', "'");

    if (metaField) {
      const currentMeta = decodeSingleQuoted(metaField.value);
      const newMeta = trimMeta(currentMeta);

      if (newMeta !== currentMeta) {
        plans.push({
          slug,
          kind: 'meta',
          oldValue: metaField.value,
          newValue: escapeSingleQuoted(newMeta),
        });
        localChanges.push(`meta ${currentMeta.length}\u2192${newMeta.length}`);
      }
    }

    // --- keywords ---
    const kwField = findFieldValue(block, 'keywords', "'");

    if (kwField) {
      const currentKw = decodeSingleQuoted(kwField.value);
      const newKw = padKeywords(currentKw);

      if (newKw !== currentKw) {
        plans.push({
          slug,
          kind: 'keywords',
          oldValue: kwField.value,
          newValue: escapeSingleQuoted(newKw),
        });
        const before = currentKw.split(',').filter(Boolean).length;
        const after = newKw.split(',').filter(Boolean).length;

        localChanges.push(`keywords ${before}\u2192${after}`);
      }
    }

    // --- content prepend (carry excerpt tail into body) ---
    if (excerptTailToPrepend) {
      const contentField = findFieldValue(block, 'content', '`');

      if (contentField) {
        // Split tail into paragraphs so short-paragraph-rate stays ≥ 80%.
        const paragraphsHtml = splitTailIntoParagraphs(excerptTailToPrepend);
        const safeParagraphs = paragraphsHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        const prepend = `\n      ${safeParagraphs}\n`;

        plans.push({
          slug,
          kind: 'content-prepend',
          oldValue: 'content: `',
          newValue: `content: \`${prepend}`,
        });
        localChanges.push(`content prepend ${wordCount(excerptTailToPrepend)} words (split to multiple <p>)`);
      }
    }

    if (localChanges.length > 0) summary.push({ slug, changes: localChanges });
  }

  // Apply patches in reverse order of source index to avoid shifting positions.
  // Build a list of (absolutePosition, old, new) by locating each patch's
  // old value in the current `src` (block-scoped to the right slug).
  interface AbsPatch {
    absStart: number;
    absEnd: number;
    newText: string;
    slug: string;
    kind: Patch['kind'];
  }

  const absPatches: AbsPatch[] = [];

  for (const plan of plans) {
    const bounds = findPostBlock(src, plan.slug);

    if (!bounds) continue;
    const block = src.slice(bounds.start, bounds.end);

    if (plan.kind === 'content-prepend') {
      const needle = plan.oldValue; // "content: `"
      const relIdx = block.indexOf(needle);

      if (relIdx === -1) continue;
      const absStart = bounds.start + relIdx;
      const absEnd = absStart + needle.length;

      absPatches.push({ absStart, absEnd, newText: plan.newValue, slug: plan.slug, kind: plan.kind });
    } else {
      const quote = plan.kind === 'excerpt' || plan.kind === 'title' || plan.kind === 'meta' || plan.kind === 'keywords' ? "'" : '`';
      const fieldName = plan.kind === 'meta' ? 'metaDescription' : plan.kind;
      const wrappedNeedle = `${fieldName}: ${quote}${plan.oldValue}${quote}`;
      const relIdx = block.indexOf(wrappedNeedle);

      if (relIdx === -1) {
        console.warn(`[blog-fix] Patch needle not found for ${plan.slug}/${plan.kind}`);
        continue;
      }
      const absStart = bounds.start + relIdx;
      const absEnd = absStart + wrappedNeedle.length;
      const newWrapped = `${fieldName}: ${quote}${plan.newValue}${quote}`;

      absPatches.push({ absStart, absEnd, newText: newWrapped, slug: plan.slug, kind: plan.kind });
    }
  }

  // Sort by absStart descending so later patches don't shift earlier indices
  absPatches.sort((a, b) => b.absStart - a.absStart);

  for (const p of absPatches) {
    src = src.slice(0, p.absStart) + p.newText + src.slice(p.absEnd);
  }

  console.log(`[blog-fix] Planned ${absPatches.length} patches across ${summary.length} posts.`);
  for (const s of summary) {
    console.log(`[blog-fix]  ${s.slug} — ${s.changes.join('; ')}`);
  }

  if (DRY) {
    console.log('[blog-fix] Dry run; file NOT written.');
    return;
  }

  writeFileSync(blogsTsPath, src, 'utf8');
  console.log(`[blog-fix] Wrote ${blogsTsPath}. Re-running audit ...`);

  const result = spawnSync('npm', ['run', 'blog:audit'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: true,
  });

  process.exit(result.status ?? 0);
})().catch((err) => {
  console.error('[blog-fix] Failed:', err);
  process.exit(1);
});
