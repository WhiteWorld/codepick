import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://codepick.dev';
const failures = [];

function fail(message) {
  failures.push(message);
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    fail(`${label}: expected ${expected}, got ${actual}`);
  }
}

async function checkLocalePath() {
  const outFile = path.join(os.tmpdir(), `codepick-i18n-${Date.now()}.mjs`);
  await esbuild({
    entryPoints: [path.join(root, 'src/lib/i18n.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: outFile,
    logLevel: 'silent',
  });

  const { localePath } = await import(`file://${outFile}`);
  assertEqual(localePath('/', 'zh'), '/zh/', 'localePath keeps locale home canonical');
  assertEqual(localePath('/guides', 'zh'), '/zh/guides/', 'localePath adds a trailing slash to page hubs');
  assertEqual(localePath('/guides/multica-setup', 'en'), '/en/guides/multica-setup/', 'localePath adds a trailing slash to article pages');
  assertEqual(localePath('/rss.xml', 'zh'), '/zh/rss.xml', 'localePath leaves file-like URLs unchanged');
  assertEqual(localePath('/?tag=diy', 'zh'), '/zh/?tag=diy', 'localePath keeps home query URLs canonical');
  fs.rmSync(outFile, { force: true });
}

function walkHtml(dir) {
  if (!fs.existsSync(dir)) return [];

  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walkHtml(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      found.push(fullPath);
    }
  }
  return found;
}

function routeExists(pathname) {
  const clean = decodeURIComponent(pathname);
  if (!clean.startsWith('/')) return false;

  if (clean.endsWith('/')) {
    return fs.existsSync(path.join(root, 'dist', clean.slice(1), 'index.html'));
  }

  if (path.extname(clean)) {
    return fs.existsSync(path.join(root, 'dist', clean.slice(1)));
  }

  return fs.existsSync(path.join(root, 'dist', clean.slice(1), 'index.html'));
}

function checkBuiltHtml() {
  const htmlFiles = walkHtml(path.join(root, 'dist'));
  if (htmlFiles.length === 0) {
    fail('dist/ has no HTML files; run npm run build before npm run check:seo');
    return;
  }

  const bareInternalLinks = [];
  const forbiddenLinks = [];
  const missingAlternates = [];

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const relFile = path.relative(root, file);

    for (const match of html.matchAll(/\bhref="(\/(?:zh|en)(?:\/[^"#?]*)?)([#?][^"]*)?"/g)) {
      const pathname = match[1];
      if (pathname === '/zh' || pathname === '/en' || pathname.includes('.')) continue;
      if (!pathname.endsWith('/')) {
        bareInternalLinks.push(`${relFile} -> ${pathname}`);
      }
    }

    for (const forbidden of ['/faq', '/faq/', '/zh/faq', '/zh/faq/', '/en/faq', '/en/faq/']) {
      if (html.includes(`href="${forbidden}"`)) {
        forbiddenLinks.push(`${relFile} -> ${forbidden}`);
      }
    }

    for (const match of html.matchAll(/<link\s+rel="alternate"\s+hreflang="(zh|en|x-default)"\s+href="([^"]+)"/g)) {
      const hreflang = match[1];
      const href = match[2];
      if (!href.startsWith(siteUrl)) continue;

      const url = new URL(href);
      if (!routeExists(url.pathname)) {
        missingAlternates.push(`${relFile} -> ${hreflang} ${url.pathname}`);
      }
    }
  }

  if (bareInternalLinks.length > 0) {
    fail(`Found internal page links without trailing slash:\n${bareInternalLinks.slice(0, 25).join('\n')}`);
  }

  if (forbiddenLinks.length > 0) {
    fail(`Found internal links to removed FAQ routes:\n${forbiddenLinks.join('\n')}`);
  }

  if (missingAlternates.length > 0) {
    fail(`Found hreflang alternates that do not have generated pages:\n${missingAlternates.slice(0, 25).join('\n')}`);
  }
}

function checkRedirects() {
  const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  if (vercel.trailingSlash !== true) {
    fail('vercel.json should set trailingSlash: true so no-slash page URLs 301 to canonical slash URLs');
  }

  const redirects = vercel.redirects ?? [];

  const redirectMap = new Map(redirects.map((redirect) => [redirect.source, redirect]));
  const expectedRedirects = [
    ['/en/guides/slock-vs-multica-vs-agentrq-vs-taskade', '/zh/guides/slock-vs-multica-vs-agentrq-vs-taskade/'],
    ['/en/guides/why-solo-founders-need-ai-agent-teams', '/zh/guides/why-solo-founders-need-ai-agent-teams/'],
    ['/en/guides/agent-collaboration-platform-types', '/zh/guides/agent-collaboration-platform-types/'],
    ['/en/guides/ai-employees-vs-coding-agents', '/zh/guides/ai-employees-vs-coding-agents/'],
    ['/en/compare/claude-code-budget-alternatives', '/en/guides/claude-code-budget-alternatives/'],
    ['/zh/compare/claude-code-budget-alternatives', '/zh/guides/claude-code-budget-alternatives/'],
    ['/en/practices/openclaw-cloud-deploy', '/zh/practices/openclaw-cloud-deploy/'],
  ];

  for (const [source, destination] of expectedRedirects) {
    for (const variant of [source, `${source}/`]) {
      const redirect = redirectMap.get(variant);
      if (!redirect) {
        fail(`Missing redirect for ${variant}`);
        continue;
      }
      if (redirect.statusCode !== 301 || redirect.destination !== destination) {
        fail(`Unexpected redirect for ${variant}: expected 301 to ${destination}, got ${redirect.statusCode} to ${redirect.destination}`);
      }
    }
  }
}

await checkLocalePath();
checkBuiltHtml();
checkRedirects();

if (failures.length > 0) {
  console.error(`SEO route checks failed (${failures.length}):`);
  console.error(failures.join('\n\n'));
  process.exit(1);
}

console.log('SEO route checks passed.');
