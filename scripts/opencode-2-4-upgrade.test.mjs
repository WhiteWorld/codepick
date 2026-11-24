// Editorial/build regressions only. Build first for page, listing and sitemap checks.
// Do not install or start OpenCode, do not sign in, do not set COPILOT_GITHUB_TOKEN
// or GITHUB_TOKEN for a live Copilot run, and do not call paid APIs.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'opencode-2-4-upgrade';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();
const jsonBlocks = text => [...text.matchAll(/^```json\n([\s\S]*?)^```/gm)].map(([, code]) => JSON.parse(code));

const OFFICIAL = [
  'https://opencode.ai/changelog',
  'https://opencode.ai/changelog/v2.4.0',
  'https://opencode.ai/changelog/v2.4.1',
  'https://opencode.ai/desktop',
  'https://opencode.ai/docs/config/',
  'https://opencode.ai/docs/mcp-servers/',
  'https://opencode.ai/docs/permissions/',
  'https://opencode.ai/docs/plugins/',
  'https://opencode.ai/docs/providers/',
  'https://opencode.ai/product/browse',
  'https://opencode.ai/sdk',
].sort();

const REQUIRED = [
  'GITHUB_TOKEN',
  'COPILOT_GITHUB_TOKEN',
  '2.4.0',
  '2.4.1',
  '2026-11-23',
  '2026-11-24',
  '/connect',
  '/models',
  'Login with GitHub Copilot',
  'Copilot has no models',
  'failed to sync GitHub Copilot models',
  'name@latest',
  'name@^1.2.0',
  'opencode plugin update',
  'experimental_image_generate',
  'generate_image',
  'always allow',
  '/automation',
  'automations',
  'https://opencode.ai/docs/automations/',
  'protocol',
  'legacy',
  'opencode service set password',
  'opencode-classic',
  'macOS 12',
  'Cmd+Shift+S',
];

test('bilingual OpenCode 2.4 upgrade guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-24');
  assert.equal(a.article_type, 'howto');
  assert.equal(a.pillar, 'workflow');
  assert.equal(a.content_status, 'keep');
  assert.equal(a.draft, false);
  assert.equal(a.locale_strategy, 'mirrored');
  assert.deepEqual(a.tags, ['opencode', 'upgrade', 'github-copilot']);
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
      `/${lang}/guides/opencode-2-permission-rules/`,
      `/${lang}/tool/opencode/`,
    ]) {
      assert.ok(text.includes(`](${route})`), `${lang} should link ${route}`);
    }
  }
});

test('articles lock official versions, conflicts, and evidence boundaries', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(text.includes('2026-11-24'));
    for (const value of REQUIRED) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.match(
      text,
      lang === 'zh'
        ? /没有安装或启动 OpenCode/
        : /did not install or start OpenCode/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有登录任何账号/
        : /did not sign in to any account/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有实测 GitHub Copilot/
        : /did not run GitHub Copilot/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不要把更新说明理解成.*COPILOT_GITHUB_TOKEN.*保证/
        : /Do not treat the changelog as a guarantee that `COPILOT_GITHUB_TOKEN` works in every setup/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /也不要把 Providers 页理解成禁止使用该变量/
        : /Do not treat the Providers page as a ban on that variable/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有提到.*COPILOT_GITHUB_TOKEN|未提及 `COPILOT_GITHUB_TOKEN`/
        : /does not mention.*COPILOT_GITHUB_TOKEN|did not mention `COPILOT_GITHUB_TOKEN`/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /出现在 v2\.3\.1 小节，不在 2\.4\.0 更新说明页/
        : /appears in the v2\.3\.1 section, not on the v2\.4\.0 changelog page/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /带条件或运行次数限制的，以及已经结束的，会被丢弃/
        : /schedules with a condition or run limit, and finished ones, are dropped/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /两页没有把它们说成同一件事/
        : /The two pages do not say they are the same thing/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /代理可以读取并操作这些页面|代理能够读取并操作这份持久配置档案里已经登录的页面/
        : /the agent can read and drive signed-in pages in that persistent profile/,
    );
    assert.match(
      text,
      lang === 'zh' ? /桌面浏览器配置档案/ : /one persistent desktop profile/,
    );
    assert.match(
      text,
      lang === 'zh' ? /部署地址或域名/ : /deployment URL or domain/,
    );
    assert.match(
      text,
      lang === 'zh' ? /本文的建议/ : /this article's recommendations/,
    );
    assert.match(
      text,
      lang === 'zh' ? /被标为 pinned/ : /are marked pinned/,
    );
    assert.match(
      text,
      lang === 'zh' ? /会被跳过（skipped）|会被跳过/ : /are skipped/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /两边表述并不完全相同，本文不做裁决|两边表述不完全相同，本文没有跑过插件更新，也不做裁决/
        : /do not fully agree/,
    );
    assert.ok(
      !text.includes(
        lang === 'zh'
          ? '只写名称、钉死精确版本、其他标签（例如 `@next`）、Git 标签或提交哈希，**不会**自己更新。`opencode plugin update` 仍可手动更新这类来源。Plugins 页还写：`plugin check` 仍会报告它们的更新。'
          : 'A bare name, an exact version, another tag such as `@next`, a Git tag, or a commit hash does **not** update itself. `opencode plugin update` can still update those by hand. The Plugins page also says `plugin check` still reports updates for them.',
      ),
      `${lang} must not lump exact versions and commit hashes into the plugin check / plugin update claim`,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /现在会先询问/
        : /now asks first/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不能把 2\.4\.0 更新说明理解成「所有未设置 `protocol` 的服务现在都一定会先探测」/
        : /Do not treat the 2\.4\.0 changelog as an unconditional statement that every server without `protocol` is now probed first/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /没有查看任何人的日志/
        : /did not inspect anyone's logs/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /不能据此说「每一个旧安装都泄露过密码」/
        : /does not claim that every older install leaked a password/,
    );
    assert.match(
      text,
      lang === 'zh'
        ? /并不要求你必须先装上 2\.4\.1/
        : /do not require you to be on 2\.4\.1 first/,
    );
    assert.ok(!text.includes('data/tools/opencode.yaml'));
  }
});

test('JSON examples are identical and only disable automations with the documented field', () => {
  const zh = jsonBlocks(source('zh'));
  const en = jsonBlocks(source('en'));
  assert.equal(zh.length, 1);
  assert.deepEqual(zh, en);
  assert.deepEqual(zh[0], {
    $schema: 'https://opencode.ai/config.json',
    automations: false,
  });
});

test('built guides appear in listings, RSS and sitemap with reciprocal language routes', () => {
  const sitemap = read('dist/sitemap-0.xml');
  const zhUrl = `https://codepick.dev/zh/guides/${slug}/`;
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    const metadata = fm(text);
    const html = read(`dist/${lang}/guides/${slug}/index.html`);
    const url = `https://codepick.dev/${lang}/guides/${slug}/`;
    const other = lang === 'zh' ? 'en' : 'zh';
    const index = read(`dist/${lang}/guides/index.html`);
    const rss = read(`dist/${lang}/rss.xml`);

    assert.equal(metadata.draft, false);
    assert.ok(html.includes(metadata.title));
    assert.ok(!html.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
    assert.ok(html.includes(lang === 'zh' ? '核查日' : 'Checked on 2026-11-24'));
    assert.ok(html.includes('COPILOT_GITHUB_TOKEN'));
    assert.ok(index.includes(`/${lang}/guides/${slug}/`));
    assert.ok(rss.includes(url));
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.ok(html.includes(`hreflang="${lang}" href="${url}"`));
    assert.ok(html.includes(`hreflang="${other}" href="https://codepick.dev/${other}/guides/${slug}/"`));
    assert.ok(html.includes(`hreflang="x-default" href="${zhUrl}"`));

    const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, json]) => JSON.parse(json)).find(v => v['@type'] === 'HowTo');
    assert.ok(ld);
    assert.equal(ld.name, metadata.title);
    assert.equal(ld.datePublished, '2026-11-24');
    assert.equal(ld.inLanguage, lang === 'zh' ? 'zh-CN' : 'en');

    for (const official of officialLinks(text)) assert.ok(html.includes(`href="${official}"`), `${lang} html missing ${official}`);
    for (const [, target] of text.matchAll(/\]\((\/(?:zh|en)\/[^)#]+)\)/g)) {
      assert.ok(existsSync(new URL(`../dist${target}index.html`, import.meta.url)), target);
    }
  }
});
