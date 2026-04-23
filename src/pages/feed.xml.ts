import { blogPosts } from '../data/blogs';

const siteURL = 'https://www.rfidak.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRFC822(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export async function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.updatedDate || b.date).getTime() -
      new Date(a.updatedDate || a.date).getTime(),
  );

  const lastBuildDate = toRFC822(sortedPosts[0]?.updatedDate || sortedPosts[0]?.date || new Date().toISOString());

  const items = sortedPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteURL}/blogs/${post.slug}</link>
      <guid isPermaLink="true">${siteURL}/blogs/${post.slug}</guid>
      <description>${escapeXml(post.metaDescription || post.excerpt)}</description>
      <pubDate>${toRFC822(post.date)}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>info@rfidak.com (RFIDAK Editorial Team)</author>
    </item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>RFIDAK RFID Blog</title>
    <link>${siteURL}/blogs</link>
    <description>RFID buying guides, technology comparisons, and application insights from RFIDAK — an RFID card, tag, and label manufacturer since 2008.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteURL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteURL}/favicon.svg</url>
      <title>RFIDAK RFID Blog</title>
      <link>${siteURL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
