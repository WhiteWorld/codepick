import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [compare, guides] = await Promise.all([
    getCollection('compare-en', ({ data }) => !data.draft),
    getCollection('guides-en', ({ data }) => !data.draft),
  ]);

  const items = [
    ...compare.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/en/compare/${entry.slug}/`,
      pubDate: new Date(entry.data.date),
      categories: ['Comparison', ...(entry.data.tags || [])],
    })),
    ...guides.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/en/guides/${entry.slug}/`,
      pubDate: new Date(entry.data.updated_at || entry.data.date),
      categories: ['Guide', ...(entry.data.tags || [])],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'CodePick — AI Coding Tool Picker',
    description:
      'Head-to-head comparisons of 20+ AI coding tools and plans — Cursor, Copilot, Claude Code, Cline and more. Pricing, capability, and China access at a glance.',
    site: context.site ?? 'https://codepick.dev',
    items,
    customData: '<language>en-US</language>',
    trailingSlash: true,
  });
}
