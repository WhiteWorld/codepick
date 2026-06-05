import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Build a lastmod map from YAML data files
function buildLastmodMap() {
  const map = new Map();
  const siteUrl = 'https://codepick.dev';

  // Tools
  const toolsDir = path.resolve('data/tools');
  if (fs.existsSync(toolsDir)) {
    for (const f of fs.readdirSync(toolsDir).filter(f => f.endsWith('.yaml'))) {
      const data = yaml.load(fs.readFileSync(path.join(toolsDir, f), 'utf-8'));
      const id = data.id || f.replace(/\.ya?ml$/, '');
      const date = data.last_full_review || data.version_tracked_at;
      if (date) {
        map.set(`${siteUrl}/zh/tool/${id}/`, new Date(date));
        map.set(`${siteUrl}/en/tool/${id}/`, new Date(date));
      }
    }
  }

  // Plans
  const plansDir = path.resolve('data/plans');
  if (fs.existsSync(plansDir)) {
    for (const f of fs.readdirSync(plansDir).filter(f => f.endsWith('.yaml'))) {
      const data = yaml.load(fs.readFileSync(path.join(plansDir, f), 'utf-8'));
      const id = data.id || f.replace(/\.ya?ml$/, '');
      const date = data.last_full_review || data.last_updated;
      if (date) {
        map.set(`${siteUrl}/zh/plan/${id}/`, new Date(date));
        map.set(`${siteUrl}/en/plan/${id}/`, new Date(date));
      }
    }
  }

  return map;
}

const lastmodMap = buildLastmodMap();

function canonicalizePagePath(pathname) {
  const isFilePath = /\.[^/]+$/.test(pathname);
  if (pathname === '/' || isFilePath || pathname.endsWith('/')) {
    return pathname;
  }

  return `${pathname}/`;
}

function canonicalizeInternalUrl(url) {
  if (!url.startsWith('/zh') && !url.startsWith('/en')) {
    return url;
  }

  const suffixIndex = (() => {
    const query = url.indexOf('?');
    const hash = url.indexOf('#');
    if (query === -1) return hash;
    if (hash === -1) return query;
    return Math.min(query, hash);
  })();

  const pathname = suffixIndex === -1 ? url : url.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : url.slice(suffixIndex);
  return `${canonicalizePagePath(pathname)}${suffix}`;
}

function canonicalizeMarkdownInternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = canonicalizeInternalUrl(node.url);
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

export default defineConfig({
  site: 'https://codepick.dev',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [canonicalizeMarkdownInternalLinks],
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const lastmod = lastmodMap.get(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  vite: {
    ssr: { noExternal: ['js-yaml'] },
  },
});
