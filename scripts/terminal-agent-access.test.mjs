// Content integration tests: run `npm run build` first.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const slug = 'gemini-cli-vs-claude-code-vs-codex-cli';
const lifecycleDates = ['2026-06-18', '2026-10-09', '2027-01-31', '2027-03-31', '2027-12-31'];
const citations = [
  'https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli',
  'https://docs.cloud.google.com/gemini/docs/codeassist/sunset',
  'https://code.claude.com/docs/en/authentication',
  'https://code.claude.com/docs/en/overview',
  'https://developers.openai.com/codex/auth/',
  'https://developers.openai.com/codex/pricing/',
  'https://developers.openai.com/codex/cli/',
  'https://github.com/anthropics/claude-code/blob/main/LICENSE.md',
  'https://github.com/openai/codex/blob/main/LICENSE',
];

for (const [lang, collection] of [['zh', 'compare'], ['en', 'compare-en']]) {
  const markdown = readFileSync(new URL(`../src/content/${collection}/${slug}.md`, import.meta.url), 'utf8');
  const [, frontmatter, body] = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = yaml.load(frontmatter);

  test(`${lang}: mirrored access guidance retains evidence and revision semantics`, () => {
    assert.equal(meta.date, '2026-02-17', 'preserve original publication date');
    assert.equal(meta.updated_at, '2026-11-18');
    assert.equal(meta.locale_strategy, 'mirrored');
    assert.ok(!/Three Free|三款免费|三个免费/i.test(meta.title));
    for (const date of lifecycleDates) assert.ok(body.includes(date), date);
    for (const url of citations) assert.ok(body.includes(`](${url})`), url);
    assert.ok(body.includes('desktop app') && body.includes('subject to rollout'));
    assert.ok(body.includes('Free / Go'));
    assert.match(body, /API [Kk]ey/);
    assert.ok(body.includes('Apache-2.0'));
    assert.match(body, lang === 'zh' ? /独立 API 账单/ : /separate API bill/);
    assert.match(body, lang === 'zh' ? /不是本文已执行的评测结果/ : /not a benchmark we performed/);
    assert.match(body, lang === 'zh' ? /不是所有账号同一天停机/ : /not one universal shutdown day/);
    assert.ok(!/volcengine|1,000|30[–-]150|o3\/o4-mini/.test(body));
  });

  test(`${lang}: published comparison retains its URL and renders current claims and metadata`, () => {
    const html = readFileSync(new URL(`../dist/${lang}/compare/${slug}/index.html`, import.meta.url), 'utf8');
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, value]) => JSON.parse(value));
    const article = schemas.find(schema => schema['@type'] === 'TechArticle');
    assert.ok(article);
    assert.equal(article.headline, meta.title);
    assert.equal(article.datePublished, '2026-02-17');
    assert.equal(article.dateModified, '2026-11-18');
    assert.equal(article.url, `https://codepick.dev/${lang}/compare/${slug}/`);
    for (const date of lifecycleDates) assert.ok(html.includes(date), date);
    for (const url of citations) assert.ok(html.includes(`href="${url}"`), url);
    assert.ok(html.includes(`/${lang === 'zh' ? 'en' : 'zh'}/compare/${slug}`));
    assert.ok(html.includes(lang === 'zh' ? '不是本文已执行的评测结果' : 'not a benchmark we performed'));
  });
}
