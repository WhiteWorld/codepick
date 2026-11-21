// Editorial/build regressions only. Build first for listing/sitemap checks.
// Do not install Antigravity CLI or Gemini CLI, do not run agy or migration
// commands, and do not call paid APIs.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'gemini-cli-antigravity-migration';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();
const jsonBlocks = text => [...text.matchAll(/^```json\n([\s\S]*?)^```/gm)].map(([, code]) => JSON.parse(code));

const OFFICIAL = [
  'https://antigravity.google/blog/introducing-google-antigravity-cli/',
  'https://antigravity.google/docs/cli/gcli-migration/',
  'https://antigravity.google/docs/cli/reference/',
  'https://antigravity.google/docs/cli/troubleshooting/',
  'https://antigravity.google/docs/customization-discovery?tab=cli',
  'https://antigravity.google/docs/getting-started/',
  'https://antigravity.google/docs/hooks/',
  'https://antigravity.google/docs/mcp/',
  'https://antigravity.google/docs/plugins/',
  'https://antigravity.google/docs/settings?tab=cli',
  'https://antigravity.google/docs/skills/',
  'https://antigravity.google/download',
  'https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/',
  'https://docs.cloud.google.com/gemini/docs/codeassist/sunset',
].sort();

const PATHS = [
  '~/.gemini/settings.json',
  '~/.gemini/GEMINI.md',
  '~/.gemini/AGENTS.md',
  '~/.gemini/skills/',
  '~/.gemini/antigravity-cli/skills/',
  '~/.gemini/config/skills/',
  '~/.gemini/extensions/',
  '.gemini/skills/',
  '.agents/skills/',
  '~/.gemini/config/mcp_config.json',
  '.agents/mcp_config.json',
  '~/.gemini/config/plugins/',
  '~/.gemini/antigravity-cli/settings.json',
  'settings.json.corrupted.',
  '.agents/hooks.json',
  '~/.gemini/config/hooks.json',
];

const COMMANDS = ['agy plugin import gemini', '/mcp', '/rewind'];

test('bilingual Gemini CLI to Antigravity migration guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-21');
  assert.equal(a.article_type, 'howto');
  assert.equal(a.pillar, 'workflow');
  assert.equal(a.content_status, 'keep');
  assert.equal(a.draft, false);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.deepEqual(a.tags, ['gemini-cli', 'antigravity', 'migration']);
  assert.equal(a.faq.length, 4);
  assert.equal(b.faq.length, 4);
  assert.ok(zh.split('\n').length > 80 && en.split('\n').length > 80, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    assert.ok(!text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    for (const route of [
      `/${lang}/compare/gemini-cli-vs-claude-code-vs-codex-cli/`,
      `/${lang}/compare/antigravity-vs-cursor/`,
      `/${lang}/tool/gemini-cli/`,
      `/${lang}/tool/antigravity/`,
    ]) {
      assert.ok(text.includes(`](${route})`), `${lang} should link ${route}`);
    }
  }
});

test('articles lock official paths, commands, field names, and partial parity wording', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(text.includes('2026-11-21'));
    assert.ok(text.includes('2026-05-19'));
    assert.ok(text.includes('2026-06-18'));
    for (const value of PATHS) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    for (const value of COMMANDS) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.ok(text.includes('url') && text.includes('httpUrl') && text.includes('serverUrl'));
    assert.ok(text.includes('Streamable HTTP'));
    assert.ok(text.includes('HTTP+SSE') || text.includes('HTTP+SSE'));
    assert.match(text, lang === 'zh' ? /部分对等|Partial parity/ : /Partial parity/);
    assert.match(
      text,
      lang === 'zh'
        ? /自定义终端主题.*实验性.*overlay|实验性的视觉 overlay/
        : /customized terminal themes or experimental visual overlays/,
    );
    assert.ok(text.includes('agy plugin import claude'));
    assert.ok(text.includes('@conversation'));
  }
});

test('JSON examples are identical and match the official migration-page sample', () => {
  const zh = jsonBlocks(source('zh'));
  const en = jsonBlocks(source('en'));
  assert.equal(zh.length, 1);
  assert.deepEqual(zh, en);
  assert.deepEqual(zh[0], {
    mcpServers: {
      'remote-indexer': {
        serverUrl: 'https://mcp.internal.enterprise.com/sse',
        env: { AUTH_TOKEN: 'secure_alpha_token' },
      },
    },
  });
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(text.includes('conductor-tools'));
    assert.ok(text.includes('google-workspace'));
    assert.ok(text.includes('1 server definition migrated to mcp_config.json'));
    assert.match(
      text,
      lang === 'zh'
        ? /不能说明你的扩展会得到同样的结果|不能当作我们已经验证转换成功/
        : /cannot show what will happen to your extensions|not evidence that we verified a successful conversion/,
    );
  }
});

test('MCP field rules and skill path tables stay on separate official pages', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.match(
      text,
      lang === 'zh'
        ? /不要把这两页合成一句|不要.*官方统一/
        : /Do not merge the two pages into one official rule|Do not merge them into one official path list/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /url also works|并写 `url` also works|并写 url also works/
        : /url also works/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /旧的 HTTP\+SSE 传输和 `httpUrl` 字段不受支持/
        : /legacy HTTP\+SSE transport and the `httpUrl` field are not supported/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有测过只改字段名能不能连通|没有测试改字段后的连通结果/
        : /did not test whether renaming the field alone is enough|did not test connectivity after a field rename/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不是 Gemini CLI 的 `\.gemini\/skills\/`/
        : /not a statement about Gemini CLI’s `\.gemini\/skills\/`/,
    );
  }
});

test('evidence boundaries do not claim a live install, migration, or invented rollback', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.match(
      text,
      lang === 'zh'
        ? /没有安装 Antigravity CLI 或 Gemini CLI/
        : /did not install Antigravity CLI or Gemini CLI/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有执行 `agy` 或 `agy plugin import gemini`/
        : /did not run `agy` or `agy plugin import gemini`/,
    );
    assert.match(
      text,
      lang === 'zh' ? /没有登录/ : /did not sign in/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /官方迁移页没有给出一键回滚命令/
        : /does not give a one-click rollback command/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /会不会就地改写原来的 Gemini 配置.*未知|没有写清/
        : /rewrites the original Gemini files in place.*unknown|does not say clearly whether first-launch onboarding rewrites/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不要把“文档说会转换”写成“我们已经验证转换成功”/
        : /Do not turn “the docs say it will convert” into “we have verified that the conversion works.”/,
    );
    assert.ok(
      text.includes('不能当作我们已经验证转换成功')
      || text.includes('not evidence that we verified a successful conversion')
      || text.includes('Do not turn “the docs say it will convert”'),
    );
    assert.ok(!text.includes('most lightweight'));
    assert.ok(!text.includes('seamless upgrade'));
  }
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
    assert.equal(ld.datePublished, '2026-11-21');
    assert.equal(ld.inLanguage, lang === 'zh' ? 'zh-CN' : 'en');

    for (const urlOfficial of officialLinks(source(lang))) {
      assert.ok(html.includes(`href="${urlOfficial}"`), `${lang} html missing ${urlOfficial}`);
    }
    for (const [, target] of source(lang).matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
      assert.ok(existsSync(new URL(`../dist${target}index.html`, import.meta.url)), target);
    }
  }
});
