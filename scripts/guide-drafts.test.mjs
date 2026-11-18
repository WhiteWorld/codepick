// Editorial/build regressions only. Build first. No provider or permission-engine calls.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slugs = ['deepseek-pdf-flowchart-parsing', 'opencode-2-permission-rules'];
const source = (lang, slug) => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const jsonBlocks = text => [...text.matchAll(/^```json\n([\s\S]*?)^```/gm)].map(([, code]) => JSON.parse(code));
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();

test('both complete bilingual guides remain marked as dated mirrored review drafts', () => {
  for (const slug of slugs) {
    const zh = source('zh', slug), en = source('en', slug);
    const a = fm(zh), b = fm(en);
    for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
      assert.deepEqual(a[key], b[key]);
    }
    assert.equal(a.date, '2026-11-18');
    assert.equal(a.draft, true);
    assert.equal(a.locale_strategy, 'mirrored');
    assert.ok(zh.split('\n').length > 130 && en.split('\n').length > 130, 'complete articles, not outlines');
    assert.deepEqual(officialLinks(zh), officialLinks(en));
    for (const lang of ['zh', 'en']) {
      const text = source(lang, slug);
      assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    }
  }
});

test('OpenCode examples are identical and preserve narrow allowances and explicit subagent restrictions', () => {
  const zh = jsonBlocks(source('zh', slugs[1]));
  assert.deepEqual(zh, jsonBlocks(source('en', slugs[1])));
  assert.equal(zh.length, 3);
  const shared = zh[0].permissions;
  assert.deepEqual(shared.filter(r => r.effect === 'allow').map(r => r.resource), [
    'git status --short', 'git --no-pager diff --no-ext-diff --no-textconv',
  ]);
  assert.ok(shared.some(r => r.action === 'external_directory' && r.effect === 'ask'));
  assert.ok(shared.some(r => r.resource === 'git push *' && r.effect === 'deny'));
  assert.deepEqual(zh[0].agents.reviewer.permissions.map(r => [r.action, r.effect]), [['edit', 'deny'], ['shell', 'deny']]);
  assert.deepEqual(zh[2].policies.map(r => r.action), ['mcp.use', 'skill.use', 'plugin.use']);
});

test('DeepSeek request structure is mirrored without inventing asynchronous status polling', () => {
  const a = jsonBlocks(source('zh', slugs[0]))[0];
  const b = jsonBlocks(source('en', slugs[0]))[0];
  a.messages[0].content[1].text = b.messages[0].content[1].text = 'translated prompt';
  assert.deepEqual(a, b);
  for (const lang of ['zh', 'en']) {
    const text = source(lang, slugs[0]);
    for (const value of ['text_recognition', 'rich_layout_recognition', '$0.225', '$0.0225', '86400', '8 MiB', '100 MiB']) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.ok(!/\/files\/[^\s]+\/status|"status":\s*"processing"/.test(text));
    assert.match(text, lang === 'zh' ? /不等于 API 保证|不是 API 保证/ : /not an API guarantee/);
    assert.match(text, lang === 'zh' ? /没有上传真实文件/ : /did not upload real files/);
  }
});

test('permission caveats include policy validation conflict, version gates and no plugin sandbox claim', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang, slugs[1]);
    for (const value of ['2.2.3', '2.2.6', 'Scanner', 'external_directory', 'Allow always', 'Console']) assert.ok(text.includes(value));
    assert.match(text, lang === 'zh' ? /不对插件代码做沙箱隔离/ : /do not sandbox plugin code/);
    assert.match(text, lang === 'zh' ? /没有启动 OpenCode/ : /did not start OpenCode/);
    assert.match(text, lang === 'zh' ? /没有验证运行时是否有兼容处理/ : /did not verify whether the runtime has a compatibility path/);
  }
});

test('built review copies keep their bodies, official links and structured article metadata', () => {
  for (const lang of ['zh', 'en']) for (const slug of slugs) {
    const html = read(`dist/${lang}/guides/${slug}/index.html`);
    const metadata = fm(source(lang, slug));
    assert.ok(html.includes(metadata.title));
    assert.ok(html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(html.includes(slug.startsWith('deepseek') ? 'rich_layout_recognition' : 'external_directory'));
    const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, json]) => JSON.parse(json)).find(v => v['@type'] === 'HowTo');
    assert.ok(ld);
    assert.equal(ld.name, metadata.title);
    assert.equal(ld.datePublished, '2026-11-18');
    assert.equal(ld.inLanguage, lang === 'zh' ? 'zh-CN' : 'en');
    for (const url of officialLinks(source(lang, slug))) assert.ok(html.includes(`href="${url}"`));
  }
});

test('drafts stay out of guide listings and RSS; related local links resolve', () => {
  // Existing guide routes still render drafts directly: do not merge/publish before approval.
  for (const lang of ['zh', 'en']) {
    const index = read(`dist/${lang}/guides/index.html`);
    const rss = read(`dist/${lang}/rss.xml`);
    for (const slug of slugs) {
      assert.ok(!index.includes(`/guides/${slug}/`));
      assert.ok(!rss.includes(`/guides/${slug}/`));
      for (const [, target] of source(lang, slug).matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
        assert.ok(existsSync(new URL(`../dist${target}index.html`, import.meta.url)), target);
      }
    }
  }
});
