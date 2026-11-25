// Editorial/build regressions only. Build first for page, listing and sitemap checks.
// Do not install or start Orca, Herdr, Paseo, or T3 Code, do not sign in, and do not
// call paid APIs or run runtime security tests.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const slug = 'choose-orca-herdr-paseo-t3-code';
const source = lang => read('src/content/guides' + (lang === 'en' ? '-en' : '') + '/' + slug + '.md');
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();

const OFFICIAL = [
  'https://github.com/getpaseo/paseo',
  'https://github.com/getpaseo/paseo/releases',
  'https://github.com/herdrdev/herdr-app',
  'https://github.com/herdrdev/herdr-app/blob/master/docs/security.md',
  'https://github.com/herdrdev/herdr-core',
  'https://github.com/herdrdev/herdr/releases',
  'https://github.com/pingdotgg/t3code/blob/main/README.md',
  'https://github.com/pingdotgg/t3code/blob/main/docs/user/outside-agents.md',
  'https://github.com/pingdotgg/t3code/blob/main/docs/user/permission-modes.md',
  'https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md',
  'https://github.com/pingdotgg/t3code/blob/main/docs/user/source-control.md',
  'https://github.com/pingdotgg/t3code/blob/main/docs/user/workflows.md',
  'https://github.com/pingdotgg/t3code/releases',
  'https://github.com/stablyai/orca/releases',
  'https://herdr.dev/',
  'https://herdr.dev/core/',
  'https://herdr.dev/download/',
  'https://herdr.dev/mobile/',
  'https://herdr.dev/privacy/',
  'https://herdr.dev/tui/',
  'https://orca.dev/',
  'https://orca.dev/docs/agents/supported',
  'https://orca.dev/docs/bots/security',
  'https://orca.dev/docs/cli/orchestration',
  'https://orca.dev/docs/mobile',
  'https://orca.dev/docs/model/agents-sessions',
  'https://orca.dev/docs/model/worktrees',
  'https://orca.dev/docs/ways-to-run',
  'https://paseo.sh/',
  'https://paseo.sh/docs/orchestration',
  'https://paseo.sh/docs/security',
  'https://paseo.sh/docs/worktrees',
  'https://t3.codes/',
].sort();

const REQUIRED = [
  'v1.4.274',
  'v0.1.18',
  'v0.1.22',
  'v0.17.4',
  'v0.1.11',
  '2026-11-25',
  'temporarily unavailable',
  'OSC 7501',
  '--dangerously-skip-permissions',
  '--dangerously-bypass-approvals-and-sandbox',
  '--yolo',
  'Full access',
  '127.0.0.1:6767',
  't3 up',
  'Enable Paseo tools',
  'android-v0.0.70',
  '2026-11-24 09:09',
  't3_thread_launch',
  't3_thread_wait',
  't3_thread_read',
  'subagents',
];

test('bilingual orchestrator comparison guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-25');
  assert.equal(a.article_type, 'review');
  assert.equal(a.pillar, 'workflow');
  assert.equal(a.content_status, 'keep');
  assert.equal(a.draft, false);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.deepEqual(a.tags, ['orca', 'herdr', 'paseo', 't3-code', 'comparison']);
  assert.equal(a.faq.length, 4);
  assert.equal(b.faq.length, 4);
  assert.ok(zh.split('\n').length > 80 && en.split('\n').length > 80, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    const other = lang === 'zh' ? 'en' : 'zh';
    assert.ok(!text.includes('](/' + other + '/'), 'internal links keep the reader locale');
    for (const value of REQUIRED) assert.ok(text.includes(value), lang + ': ' + value);
    assert.ok(!text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(text.includes(lang === 'zh' ? '没有安装' : 'did not install'));
    assert.ok(text.includes(lang === 'zh' ? '不能被转写成' : 'cannot be rewritten as'));
  }
});

test('the comparison does not treat a worktree as an OS sandbox or invent unpaid T3 caps', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.match(text, lang === 'zh' ? /worktree 本身就是 sandbox/ : /the worktree itself is the sandbox/);
    assert.match(text, lang === 'zh' ? /操作系统沙箱/ : /operating-system sandbox/);
    assert.match(text, lang === 'zh' ? /自动重启助手/ : /restart an agent or resume/);
    assert.match(text, /T3 Chat/);
    assert.ok(!/500,000|Tolerated by over/.test(text), 'no homepage marketing metrics');
    assert.ok(!/utm_source=/.test(text), 'no promotional query parameters');
    assert.ok(!text.includes(lang === 'zh' ? '同日仍有 Android' : 'existed the same day'));
    assert.ok(!text.includes(lang === 'zh' ? '更偏人来切换' : 'More about a person switching'));
    assert.ok(!text.includes(lang === 'zh' ? '空缺处' : 'A blank in the narrative'));
    assert.ok(text.includes(lang === 'zh' ? '不是同一层开关' : 'not one kind of switch'));
    assert.ok(text.includes(lang === 'zh' ? '没有用同一口径逐项排查' : 'did not do a same-scope review'));
    assert.ok(text.includes(lang === 'zh' ? '会恢复布局并继续会话' : 'brings the layout back and resumes'));
  }
});

test('built guides appear in listings, RSS and sitemap with reciprocal language routes', () => {
  const sitemap = read('dist/sitemap-0.xml');
  const zhUrl = 'https://codepick.dev/zh/guides/' + slug + '/';
  for (const lang of ['zh', 'en']) {
    const metadata = fm(source(lang));
    const html = read('dist/' + lang + '/guides/' + slug + '/index.html');
    const index = read('dist/' + lang + '/guides/index.html');
    const rss = read('dist/' + lang + '/rss.xml');
    const url = 'https://codepick.dev/' + lang + '/guides/' + slug + '/';
    const other = lang === 'zh' ? 'en' : 'zh';
    assert.equal(metadata.draft, false);
    assert.ok(html.includes(metadata.title));
    assert.ok(!html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(html.includes('v1.4.274'));
    assert.ok(index.includes('/' + lang + '/guides/' + slug + '/'), 'published guide appears in the listing');
    assert.ok(rss.includes(url), 'published guide appears in RSS');
    const loc = '<loc>' + url + '</loc>';
    assert.ok(sitemap.includes(loc), 'published guide appears in the sitemap');
    const after = sitemap.split(loc)[1].slice(0, 40);
    assert.ok(after.trimStart().startsWith('<lastmod>'), 'published sitemap entry has lastmod');
    assert.ok(html.includes('<link rel="canonical" href="' + url + '"'));
    assert.ok(html.includes('hreflang="' + lang + '" href="' + url + '"'));
    assert.ok(html.includes('hreflang="' + other + '" href="https://codepick.dev/' + other + '/guides/' + slug + '/"'));
    assert.ok(html.includes('hreflang="x-default" href="' + zhUrl + '"'));
    const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, json]) => JSON.parse(json)).find(v => v['@type'] === 'Article' || v['@type'] === 'TechArticle');
    assert.ok(ld);
    assert.equal(ld.name || ld.headline, metadata.title);
    assert.equal(ld.datePublished, '2026-11-25');
    for (const href of officialLinks(source(lang))) assert.ok(html.includes('href="' + href + '"'), href);
    for (const [, target] of source(lang).matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
      assert.ok(existsSync(new URL('../dist' + target + 'index.html', import.meta.url)), target);
    }
  }
});
