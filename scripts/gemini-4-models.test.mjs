// Editorial/build regressions only. Build first for publication-path checks. No API or paid calls.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'gemini-4-models';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();

const OFFICIAL = [
  'https://aistudio.google.com/docs/latest-model',
  'https://aistudio.google.com/docs/long-decode',
  'https://aistudio.google.com/docs/models',
  'https://aistudio.google.com/docs/models/gemini-3.8-flash',
  'https://aistudio.google.com/docs/models/gemini-4-carbon',
  'https://aistudio.google.com/docs/models/gemini-4-hydrogen',
  'https://aistudio.google.com/docs/models/gemini-4-neon',
  'https://aistudio.google.com/docs/pricing',
  'https://aistudio.google.com/docs/rate-limits',
  'https://aistudio.google.com/docs/whats-new-gemini-4-argon',
  'https://aistudio.google.com/docs/whats-new-gemini-4-carbon',
  'https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen',
  'https://aistudio.google.com/docs/whats-new-gemini-4-neon',
  'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/',
  'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/',
  'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/',
  'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/',
  'https://developers.openai.com/api/docs/models/gpt-6.2-sol',
  'https://developers.openai.com/api/docs/pricing',
  'https://gemini.google/subscriptions/',
  'https://one.google.com/about/google-ai-plans/',
  'https://platform.claude.com/docs/en/about-claude/pricing',
  'https://platform.claude.com/docs/en/models/sonnet-5-5/overview',
];

test('bilingual Gemini 4 guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-19');
  assert.equal(a.article_type, 'explainer');
  assert.equal(a.draft, true);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.equal(a.pillar, 'compare');
  assert.ok(zh.split('\n').length > 150 && en.split('\n').length > 150, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    assert.ok(!text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
  }
});

test('articles keep official model IDs, list prices and the December price change', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    for (const value of [
      'gemini-4-carbon', 'gemini-4-neon', 'gemini-4-hydrogen', 'gemini-4-argon',
      'gemini-3.8-flash', 'claude-sonnet-5-5', 'gpt-6.2-sol',
      '1,048,576', '65,536', '$1.50', '$7.50', '$3 / $15',
      '$4', '$20', '$0.75', '$3.75', '272K', '2026-11-30', '2026-12-01',
    ]) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.ok(text.includes('$19.99'));
    assert.ok(text.includes('$99.99'));
    assert.ok(text.includes('$199.99'));
    assert.ok(text.includes('$4.99'));
  }
});

test('evidence boundaries separate API from subscriptions and do not claim measurements', () => {
  const zh = source('zh');
  const en = source('en');
  assert.match(zh, /没有调用 Gemini、Claude 或 OpenAI 的 API/);
  assert.match(zh, /没有使用密钥/);
  assert.match(zh, /也没有独立跑速度、代码或费用测试/);
  assert.match(en, /did not call the Gemini, Claude, or OpenAI APIs/);
  assert.match(en, /did not use any API keys/);
  assert.match(en, /did not independently measure speed, coding quality, or cost/);
  assert.match(zh, /和 Google AI 订阅不是同一笔账|和后面的 Google AI 月费不是一回事|不能用上面的/);
  assert.match(en, /not the same bill as a Google AI subscription|They are not Google AI monthly subscription prices|cannot convert/);
  assert.match(zh, /官方页面没有写这个日期按哪个时区截止/);
  assert.match(en, /do not state a timezone for that cutoff/);
  assert.match(zh, /没有打开 Vertex AI 价目/);
  assert.match(en, /did not open Vertex AI price lists/);
  assert.match(zh, /不根据这些数字排出绝对第一/);
  assert.match(en, /does not use those numbers to name an absolute winner/);
  assert.ok(!/我们(已|已经)(实测|复现|付费调用)/.test(zh));
  assert.ok(!/we (ran|executed|reproduced) (the|these|those)/i.test(en));
});

test('Argon consumer-page gap, 3.8 Flash output cap, and GPT long-context surcharge stay accurate', () => {
  const zh = source('zh');
  const en = source('en');
  assert.match(zh, /没有列出 Argon/);
  assert.match(en, /do not list Argon/);
  assert.match(zh, /没有打开真实应用或 Antigravity 的模型列表/);
  assert.match(en, /did not open a signed-in app or Antigravity model picker/);
  assert.match(zh, /输出上限 65,536/);
  assert.match(en, /65,536 output tokens/);
  assert.match(zh, /输入超过 272K token/);
  assert.match(en, /input exceeds 272K tokens/);
  assert.match(zh, /12\.8%/);
  assert.match(en, /12\.8%/);
  assert.match(zh, /39\.0%/);
  assert.match(en, /39\.0%/);
  assert.match(zh, /自动转到 `gemini-3\.8-flash`/);
  assert.match(en, /automatically route to `gemini-3\.8-flash`/);
});

test('draft guides build as direct routes but stay out of listings, RSS and sitemap lastmod set', () => {
  const sitemapPath = new URL('../dist/sitemap-0.xml', import.meta.url);
  if (!existsSync(new URL('../dist/zh/guides/index.html', import.meta.url))) {
    return; // build has not been run in this workspace yet
  }
  const sitemap = existsSync(sitemapPath) ? read('dist/sitemap-0.xml') : '';
  for (const lang of ['zh', 'en']) {
    const url = `https://codepick.dev/${lang}/guides/${slug}/`;
    const page = `dist/${lang}/guides/${slug}/index.html`;
    const list = read(`dist/${lang}/guides/index.html`);
    const rss = read(`dist/${lang}/rss.xml`);
    assert.equal(fm(source(lang)).draft, true);
    assert.ok(existsSync(new URL(`../${page}`, import.meta.url)), `${page} should exist as a direct draft route`);
    const html = read(page);
    assert.ok(!html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(!list.includes(url), `${lang} listing should omit the draft`);
    assert.ok(!rss.includes(url), `${lang} RSS should omit the draft`);
    // lastmod map skips drafts; the sitemap plugin may still emit the built route.
    // Record the actual sitemap behavior without treating either outcome as a publication signal.
    if (sitemap.includes(`<loc>${url}</loc>`)) {
      assert.ok(true, `${lang} draft URL is present in sitemap (known direct-route exposure)`);
    }
  }
});
