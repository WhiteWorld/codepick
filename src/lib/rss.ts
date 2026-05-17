import type { Locale } from './i18n';
import { getCollectionName } from './i18n';
import { getCollection } from 'astro:content';

interface FeedEntry {
  type: 'compare' | 'guides' | 'practices';
  slug: string;
  title: string;
  description: string;
  date: string;
}

const SITE_URL = 'https://codepick.dev';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRfc822(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

async function loadFeed(lang: Locale): Promise<FeedEntry[]> {
  const compareName = getCollectionName('compare', lang) as 'compare' | 'compare-en';
  const guidesName = getCollectionName('guides', lang) as 'guides' | 'guides-en';
  const practicesName = getCollectionName('practices', lang) as 'practices' | 'practices-en';

  const [compareItems, guidesItems, practicesItems] = await Promise.all([
    getCollection(compareName).catch(() => [] as any[]),
    getCollection(guidesName).catch(() => [] as any[]),
    getCollection(practicesName).catch(() => [] as any[]),
  ]);

  const toEntry = (type: FeedEntry['type']) => (e: any): FeedEntry => ({
    type,
    slug: e.slug,
    title: e.data.title,
    description: e.data.description || '',
    date: e.data.date,
  });

  return [
    ...compareItems.filter((a: any) => !a.data.draft).map(toEntry('compare')),
    ...guidesItems.filter((a: any) => !a.data.draft).map(toEntry('guides')),
    ...practicesItems.filter((a: any) => !a.data.draft).map(toEntry('practices')),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50);
}

export async function buildRssFeed(lang: Locale): Promise<string> {
  const entries = await loadFeed(lang);
  const channelTitle = lang === 'zh' ? 'CodePick — AI 编程工具选型指南' : 'CodePick — AI Coding Tool Guide';
  const channelDesc = lang === 'zh'
    ? 'AI 编程工具评测、对比、使用指南。中英文双语。'
    : 'AI coding tool reviews, comparisons, and guides. Bilingual.';
  const langTag = lang === 'zh' ? 'zh-CN' : 'en';
  const channelLink = `${SITE_URL}/${lang}/`;
  const feedUrl = `${SITE_URL}/${lang}/rss.xml`;
  const lastBuildDate = entries[0] ? formatRfc822(entries[0].date) : new Date().toUTCString();

  const items = entries.map((entry) => {
    const link = `${SITE_URL}/${lang}/${entry.type}/${entry.slug}/`;
    const categoryLabel = lang === 'zh'
      ? { compare: '对比', guides: '指南', practices: '实践' }[entry.type]
      : { compare: 'Compare', guides: 'Guide', practices: 'Practice' }[entry.type];
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(categoryLabel)}</category>
      <pubDate>${formatRfc822(entry.date)}</pubDate>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${langTag}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
