import type { APIRoute } from 'astro';
import { buildRssFeed } from '../../lib/rss';

export const GET: APIRoute = async () => {
  const xml = await buildRssFeed('zh');
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
