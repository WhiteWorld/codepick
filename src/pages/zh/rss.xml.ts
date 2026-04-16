import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [compare, guides] = await Promise.all([
    getCollection('compare', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
  ]);

  const items = [
    ...compare.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/zh/compare/${entry.slug}/`,
      pubDate: new Date(entry.data.date),
      categories: ['对比', ...(entry.data.tags || [])],
    })),
    ...guides.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/zh/guides/${entry.slug}/`,
      pubDate: new Date(entry.data.updated_at || entry.data.date),
      categories: ['指南', ...(entry.data.tags || [])],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'CodePick — AI 编程工具选型',
    description:
      '横向对比 Cursor、Copilot、Claude Code、Cline 等 20+ 款 AI 编程工具与方案，覆盖价格、能力、国内可用性。',
    site: context.site ?? 'https://codepick.dev',
    items,
    customData: '<language>zh-CN</language>',
    trailingSlash: true,
  });
}
