// Editorial/build regressions only. Build first for page, listing and sitemap checks.
// Do not install or start Claude Code, do not set CLAUDE_CODE_EXPERIMENTAL_CODE_MODE,
// do not run claude commands, and do not call paid APIs.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'claude-code-code-mode';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();
const jsonBlocks = text => [...text.matchAll(/^\`\`\`json\n([\s\S]*?)^\`\`\`/gm)].map(([, code]) => JSON.parse(code));

const OFFICIAL = [
  'https://code.claude.com/docs/en/changelog',
  'https://code.claude.com/docs/en/code-mode',
  'https://code.claude.com/docs/en/code-mode#code-mode-doesnt-start',
  'https://code.claude.com/docs/en/env-vars',
  'https://code.claude.com/docs/en/hooks',
  'https://code.claude.com/docs/en/managed-settings',
  'https://code.claude.com/docs/en/permission-modes',
  'https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves',
  'https://code.claude.com/docs/en/permissions',
  'https://code.claude.com/docs/en/sandboxing',
  'https://code.claude.com/docs/zh-CN/code-mode',
  'https://github.com/anthropics/claude-code/releases/tag/v2.1.323',
  'https://github.com/anthropics/claude-code/releases/tag/v2.1.330',
].sort();

const REQUIRED = [
  'CLAUDE_CODE_EXPERIMENTAL_CODE_MODE',
  'v2.1.323',
  'v2.1.326',
  'v2.1.327',
  'v2.1.328',
  'v2.1.329',
  'v2.1.330',
  'Opus 5.5',
  'Sonnet 5.5',
  'Haiku 5.5',
  'Fable 5.2',
  'Amazon Bedrock',
  'zero data retention',
  'DISABLE_TELEMETRY',
  '~/.claude/settings.json',
  'Yes, turn on Code Mode',
  'Code Mode (experimental) is on · this session can be resumed only with Code Mode on',
  'bypassPermissions',
  'Remote Control',
  'Claude in Chrome',
  'computer use',
  'Ctrl+O',
  '/tasks',
  '/fork',
  '/feedback',
  "cd 'app' && git push",
  'it isn\'t open to your account yet',
  'it isn\'t open to your account in this version',
  'it doesn\'t yet work with an installed mod',
];

test('bilingual Claude Code Code Mode guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-22');
  assert.equal(a.article_type, 'howto');
  assert.equal(a.pillar, 'workflow');
  assert.equal(a.content_status, 'keep');
  assert.equal(a.draft, true);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.deepEqual(a.tags, ['claude-code', 'code-mode', 'permissions']);
  assert.equal(a.faq.length, 4);
  assert.equal(b.faq.length, 4);
  assert.ok(zh.split('\n').length > 80 && en.split('\n').length > 80, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    assert.ok(text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    for (const route of [
      `/${lang}/compare/claude-code-vs-cursor/`,
      `/${lang}/compare/claude-code-vs-codex/`,
      `/${lang}/guides/ai-coding-agent-security-2026/`,
      `/${lang}/tool/claude-code/`,
    ]) {
      assert.ok(text.includes(`](${route})`), `${lang} should link ${route}`);
    }
  }
});

test('articles lock official versions, variables, limits, and evidence boundaries', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(text.includes('2026-11-22'));
    for (const value of REQUIRED) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.match(
      text,
      lang === 'zh'
        ? /没有安装或启动 Claude Code/
        : /did not install or start Claude Code/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有打开 Code Mode 会话/
        : /did not open a Code Mode session/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /克隆的仓库不能替你打开/
        : /cannot turn Code Mode on for you/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /审查的是每一段即将运行的代码，而不是每一条工具调用/
        : /reviews each piece of code before it runs, not each tool call/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /看不到运行时才算出来的值/
        : /does not see values computed at run time/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /JavaScript 本身.*在沙箱外|在沙箱外运行/
        : /JavaScript itself[\s\S]*run outside the sandbox/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /托管设置不能反过来帮用户打开/
        : /cannot turn Code Mode on for your users/,
    );
    assert.match(
      text,
      lang === 'zh' ? /10 分钟/ : /ten minutes/,
    );
    assert.match(
      text,
      lang === 'zh' ? /两小时/ : /two hours/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /并不把上述清单写成 v2\.1\.329 及以上的无条件禁令/
        : /does not treat that list as an unconditional ban on v2\.1\.329 or later/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /tracing 仍会阻止启动/
        : /tracing still keeps it off/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /关掉 telemetry、非必要流量或 feature flags 时也可以启动/
        : /telemetry, nonessential traffic, or feature flags are turned off/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /已安装的 mod 挂钩工具调用时不再拒绝启动/
        : /no longer refuses to start when an installed mod hooks tool calls/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不替文档冲突做裁决/
        : /does not decide the conflict/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /并不必然表示版本过旧/
        : /not, by itself, proof that the install is too old/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /检查网络并重新启动，若原因仍在，改日再试/
        : /check your network connection and start again, and if the reason stays, try again another day/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /沙箱可在 macOS、Linux 和 WSL2 上运行/
        : /the sandbox runs on macOS, Linux, and WSL2/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /原生 Windows 上的命令没有沙箱/
        : /on native Windows, Claude Code runs commands unsandboxed/,
    );
  }
});

test('JSON examples are identical and match the official settings samples', () => {
  const zh = jsonBlocks(source('zh'));
  const en = jsonBlocks(source('en'));
  assert.equal(zh.length, 3);
  assert.deepEqual(zh, en);
  assert.deepEqual(zh[0], {
    env: {
      CLAUDE_CODE_EXPERIMENTAL_CODE_MODE: '1',
    },
  });
  assert.deepEqual(zh[1], {
    env: {
      CLAUDE_CODE_EXPERIMENTAL_CODE_MODE: '0',
    },
  });
  assert.deepEqual(zh[2], {
    permissions: {
      ask: ['REPL'],
    },
  });
});

test('built draft pages keep official facts, HowTo metadata and language alternates, and stay out of listings', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    const metadata = fm(text);
    const html = read(`dist/${lang}/guides/${slug}/index.html`);
    assert.ok(html.includes(metadata.title));
    assert.ok(html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(html.includes(lang === 'zh' ? '核查日' : 'Checked on 2026-11-22'));
    assert.ok(html.includes('CLAUDE_CODE_EXPERIMENTAL_CODE_MODE'));
    const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, json]) => JSON.parse(json)).find(v => v['@type'] === 'HowTo');
    assert.ok(ld);
    assert.equal(ld.name, metadata.title);
    assert.equal(ld.datePublished, '2026-11-22');
    assert.equal(ld.inLanguage, lang === 'zh' ? 'zh-CN' : 'en');
    for (const url of officialLinks(text)) assert.ok(html.includes(`href="${url}"`));
    const pageUrl = `https://codepick.dev/${lang}/guides/${slug}/`;
    assert.ok(html.includes(`<link rel="canonical" href="${pageUrl}"`));
    const other = lang === 'zh' ? 'en' : 'zh';
    if (metadata.draft) {
      assert.ok(html.includes(`hreflang="${lang}" href="${pageUrl}"`));
    } else {
      assert.ok(html.includes(`hreflang="${other}" href="https://codepick.dev/${other}/guides/${slug}/"`));
    }
    for (const [, target] of text.matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
      assert.ok(existsSync(new URL(`../dist${target}index.html`, import.meta.url)), target);
    }
    const index = read(`dist/${lang}/guides/index.html`);
    const rss = read(`dist/${lang}/rss.xml`);
    assert.ok(!index.includes(`/${lang}/guides/${slug}/`), 'draft stays off the guides index');
    assert.ok(!rss.includes(pageUrl), 'draft stays out of RSS');
  }
});
