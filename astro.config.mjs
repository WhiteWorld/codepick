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

  // Content collections (markdown): guides / compare / practices, zh + en.
  // Uses frontmatter `updated_at || date` so every article page carries a
  // <lastmod>, helping search engines discover & re-crawl new/updated content.
  const contentCollections = [
    { dir: 'src/content/guides', locale: 'zh', seg: 'guides' },
    { dir: 'src/content/guides-en', locale: 'en', seg: 'guides' },
    { dir: 'src/content/compare', locale: 'zh', seg: 'compare' },
    { dir: 'src/content/compare-en', locale: 'en', seg: 'compare' },
    { dir: 'src/content/practices', locale: 'zh', seg: 'practices' },
    { dir: 'src/content/practices-en', locale: 'en', seg: 'practices' },
  ];
  for (const { dir, locale, seg } of contentCollections) {
    const abs = path.resolve(dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter(f => /\.mdx?$/.test(f))) {
      const raw = fs.readFileSync(path.join(abs, f), 'utf-8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fm) continue;
      let data;
      try { data = yaml.load(fm[1]); } catch { continue; }
      if (!data || data.draft) continue;
      const slug = data.slug || f.replace(/\.mdx?$/, '');
      const date = data.updated_at || data.date;
      if (date) map.set(`${siteUrl}/${locale}/${seg}/${slug}/`, new Date(date));
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
