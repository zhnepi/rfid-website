export interface HeadingAnchor {
  id: string;
  level: number;
  text: string;
}

// Historical source imports included a few mojibake fragments.
// Keep replacements literal so they never match the empty string.
const artifactMap: Array<[string, string]> = [
  ['閳ヮ洑', '-'],
  ['閳ヮ泧', '-'],
  ['閳ヮ洕', '-'],
  ['閳ヮ洖', '-'],
  ['閳ヮ洘', '-'],
  ['閳?', '-'],
  ['鈥?', ' - '],
  ['鈥撐', '-'],
  ['鈥揇', '-'],
  ['鈥', '-'],
  ['鎺矯', 'deg C'],
  ['鈩冿綖', 'deg C to '],
  ['鈩儈', 'deg C to '],
  ['鈩?', 'deg C'],
  ['鈩', 'deg C'],
  ['掳C', 'deg C'],
  ['潞C', 'deg C'],
  ['掳', 'deg '],
  ['潞', 'deg '],
  ['卤', '+/-'],
  ['脴', 'Ø'],
  ['桅', 'Φ'],
  ['庐', '®'],
  ['鈮?', '<='],
];

export function normalizeText(text = '') {
  return artifactMap
    .reduce((value, [pattern, replacement]) => value.split(pattern).join(replacement), text)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([([{])\s+/g, '$1')
    .replace(/\s+([)\]}])/g, '$1')
    .trim();
}

export function stripHtml(html = '') {
  return normalizeText(
    html
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&#39;/gi, "'")
      .replace(/&quot;/gi, '"')
  );
}

export function truncateText(text: string, maxLength = 155) {
  const clean = stripHtml(text);

  if (clean.length <= maxLength) {
    return clean;
  }

  const softCut = clean.slice(0, maxLength + 1);
  const sentenceEnd = Math.max(softCut.lastIndexOf('. '), softCut.lastIndexOf('; '));

  if (sentenceEnd >= Math.floor(maxLength * 0.6)) {
    return softCut.slice(0, sentenceEnd + 1).trim();
  }

  const wordEnd = softCut.lastIndexOf(' ');
  return `${softCut.slice(0, wordEnd > 0 ? wordEnd : maxLength).trim()}...`;
}

export function estimateReadingTime(html: string, wordsPerMinute = 220) {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return {
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / wordsPerMinute)),
  };
}

export function slugifyHeading(text: string) {
  return stripHtml(text)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function addHeadingAnchors(html: string) {
  const seen = new Map<string, number>();
  const headings: HeadingAnchor[] = [];

  const content = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_match, level, innerHtml) => {
    const text = stripHtml(innerHtml);
    const baseId = slugifyHeading(text) || `section-${headings.length + 1}`;
    const seenCount = seen.get(baseId) ?? 0;
    seen.set(baseId, seenCount + 1);
    const id = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

    headings.push({
      id,
      level: Number(level),
      text,
    });

    return `<h${level} id="${id}">${innerHtml}</h${level}>`;
  });

  return {
    content,
    headings,
  };
}

export function splitApplicationText(text: string) {
  const normalized = normalizeText(text);
  const parts = normalized
    .split(/\s+(?:-|--|---)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    title: parts[0] || normalized,
    description: parts.slice(1).join(' - '),
  };
}
