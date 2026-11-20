// Editorial/build regressions only. Build first for publication checks. No Copilot or paid API calls.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'copilot-december-model-deprecation';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();

const OFFICIAL = [
  'https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models',
  'https://docs.github.com/en/copilot/reference/ai-models/supported-models',
  'https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/',
].sort();

const MODELS = [
  ['Claude Fable 5', 'Claude Fable 5.2'],
  ['Claude Haiku 4.5', 'Claude Haiku 5.5'],
  ['Gemini 3.8 Flash', 'Gemini 4 Hydrogen'],
  ['Gemini 4 Argon', 'Gemini 4 Carbon'],
  ['Grok 4.6', 'Grok 4.7'],
];

test('bilingual Copilot December deprecation guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-20');
  assert.equal(a.article_type, 'howto');
  assert.equal(a.draft, false);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.deepEqual(a.tags, ['copilot', 'model-deprecation']);
  assert.ok(zh.split('\n').length > 80 && en.split('\n').length > 80, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    assert.ok(!text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    for (const route of [
      `/${lang}/guides/model-deprecation-checklist/`,
      `/${lang}/guides/gemini-4-models/`,
      `/${lang}/tool/copilot/`,
    ]) {
      assert.ok(text.includes(`](${route})`), `${lang} should link ${route}`);
    }
  }
});

test('articles keep the six official display names, dates, alternatives, and Haiku exception', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(text.includes('2026-12-14'));
    assert.ok(text.includes('2026-11-20'));
    for (const [name, alternative] of MODELS) {
      assert.ok(text.includes(name), `${lang}: ${name}`);
      assert.ok(text.includes(alternative), `${lang}: ${alternative}`);
    }
    assert.ok(text.includes('Kimi K3'), `${lang}: Kimi K3`);
    assert.ok(text.includes('To be announced'), `${lang}: official Kimi alternative`);
    assert.ok(text.includes('Claude Haiku 4.5'));
    assert.match(
      text,
      lang === 'zh'
        ? /个人.*年付|年付.*个人/
        : /individual GitHub Copilot subscribers on annual plans/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /其他五个模型没有这条例外/
        : /does not cover the other five models/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有把例外写到团队或组织使用，以及 Business 或 Enterprise/
        : /does not extend (it|the exception) to team or organization use, or to Business or Enterprise/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不猜测该换哪个/
        : /does not guess a substitute/,
    );
  }
});


test('intro states the individual annual Haiku 4.5 exception, and checklist links note the earlier check date and Grok 4.5 source', () => {
  const zh = source('zh');
  const en = source('en');
  assert.match(zh, /例外是个人年付订阅里的 Claude Haiku 4.5/);
  assert.match(zh, /其他五个模型没有这条例外/);
  assert.match(en, /The exception is Claude Haiku 4.5 for individual annual subscribers/);
  assert.match(en, /The other five models have no such exception/);
  assert.ok(zh.includes('团队或组织使用'));
  assert.ok(!zh.includes('写到团队、Business'));
  assert.ok(en.includes('team or organization use'));
  assert.ok(!en.includes('to team, Business, or Enterprise'));
  assert.match(zh, /那份清单的核查日是 2026-10-22，比本文早|该清单核查日是 2026-10-22，早于本文/);
  assert.match(en, /That checklist was last checked on 2026-10-22, earlier than this article/);
  assert.match(zh, /Grok 4.5 以 2026-11-20 打开的 .*支持模型页.* 为准/);
  assert.match(zh, /仍把 Grok 4.5 列在当前可用表里，状态是 GA，下线历史里也没有 Grok 4.5 这一行/);
  assert.match(en, /For Grok 4.5, follow the .*supported-models page.* opened on 2026-11-20/);
  assert.match(en, /still lists Grok 4.5 as GA in the current availability table, and the retirement history has no Grok 4.5 row/);
  assert.match(zh, /本文不改那份清单的正文/);
  assert.match(en, /does not change the checklist/);
  assert.ok(!zh.includes('审阅稿') && !en.includes('Review draft'));
});

test('evidence boundaries do not invent model IDs or claim a live Copilot or paid API test', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.match(text, lang === 'zh' ? /没有模型 ID|ID 未知/ : /does not publish a model ID|The ID is unknown/);
    assert.match(text, lang === 'zh' ? /不要自己编一串小写连字符 ID/ : /Do not invent a lowercase hyphenated ID/);
    assert.match(text, lang === 'zh' ? /没有登录 Copilot|没有登录 GitHub 或 Copilot/ : /did not sign in to Copilot|did not sign in to GitHub or Copilot/);
    assert.match(text, lang === 'zh' ? /没有调用付费接口/ : /did not call paid APIs|did not .* paid APIs/);
    assert.match(text, lang === 'zh' ? /没有实测模型选择器|没有看过真实的模型选择器/ : /did not .* test a model picker|did not .* inspect a live model picker/);
    assert.match(text, lang === 'zh' ? /也不编点击路径/ : /does not invent a click path/);
    assert.ok(!/我们(已|已经)?(实测|登录了 Copilot|调用了付费)/.test(text));
    assert.ok(!/we (tested Copilot|signed in to Copilot|called paid APIs)/i.test(text));
  }
});

test('articles disclose that the supported-models retirement history checked on 2026-11-20 omitted the December 14 wave', () => {
  const zh = source('zh');
  const en = source('en');
  assert.match(zh, /Model retirement history/);
  assert.match(zh, /还没有 2026-12-14 的行|尚未收录 2026-12-14/);
  assert.match(zh, /不能拿来替换 changelog 里的具体替代名/);
  assert.match(en, /Model retirement history/);
  assert.match(en, /had not yet added the 2026-12-14 wave|had not yet listed the 2026-12-14 wave|does not yet have rows for 2026-12-14/);
  assert.match(en, /Do not substitute that generic wording for the changelog/);
  assert.ok(zh.includes('GA') && en.includes('GA'));
});

test('built guides appear in listings, RSS and sitemap with reciprocal language routes', () => {
  const sitemap = read('dist/sitemap-0.xml');
  for (const lang of ['zh', 'en']) {
    const index = read(`dist/${lang}/guides/index.html`);
    const rss = read(`dist/${lang}/rss.xml`);
    const html = read(`dist/${lang}/guides/${slug}/index.html`);
    const metadata = fm(source(lang));
    const url = `https://codepick.dev/${lang}/guides/${slug}/`;
    const other = lang === 'zh' ? 'en' : 'zh';

    assert.equal(metadata.draft, false);
    assert.ok(html.includes(metadata.title));
    assert.ok(!html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(index.includes(`/${lang}/guides/${slug}/`));
    assert.ok(rss.includes(url));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.ok(html.includes(`hreflang="${other}" href="https://codepick.dev/${other}/guides/${slug}/"`));
    assert.ok(html.includes(`hreflang="${lang}" href="${url}"`));

    const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, json]) => JSON.parse(json)).find(v => v['@type'] === 'HowTo');
    assert.ok(ld);
    assert.equal(ld.name, metadata.title);
    assert.equal(ld.datePublished, '2026-11-20');
    assert.equal(ld.inLanguage, lang === 'zh' ? 'zh-CN' : 'en');

    for (const urlOfficial of officialLinks(source(lang))) assert.ok(html.includes(`href="${urlOfficial}"`));
    for (const [, target] of source(lang).matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
      assert.ok(existsSync(new URL(`../dist${target}index.html`, import.meta.url)), target);
    }
  }
});
