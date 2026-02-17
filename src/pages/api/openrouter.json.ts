import type { APIRoute } from 'astro';
import { getApi } from '../../lib/data';

export const prerender = true;

export const GET: APIRoute = () => {
  const api = getApi('openrouter');
  if (!api) {
    return new Response(JSON.stringify({ error: 'NOT_FOUND' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
  return new Response(JSON.stringify(api), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
