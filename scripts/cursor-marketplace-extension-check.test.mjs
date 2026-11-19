// Editorial regressions only. No official remediation scripts are executed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const slug = 'cursor-marketplace-malicious-extension-check';
const source = lang => read(`src/content/guides${lang === 'en' ? '-en' : ''}/${slug}.md`);
const fm = text => yaml.load(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const officialLinks = text => [...new Set([...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(([, url]) => url))].sort();

const OFFICIAL = [
  'https://cursor.com/blog/claude-code-extension-security-notice',
  'https://cursor.com/blog/security-incident-update',
];

test('bilingual Cursor extension-check guides share mirrored metadata and official links', () => {
  const zh = source('zh');
  const en = source('en');
  const a = fm(zh);
  const b = fm(en);
  for (const key of ['date', 'article_type', 'pillar', 'content_status', 'locale_strategy', 'draft', 'tags']) {
    assert.deepEqual(a[key], b[key]);
  }
  assert.equal(a.date, '2026-11-19');
  assert.equal(a.article_type, 'howto');
  assert.equal(a.locale_strategy, 'mirrored');
  assert.ok(zh.split('\n').length > 130 && en.split('\n').length > 130, 'complete articles, not outlines');
  assert.deepEqual(officialLinks(zh), officialLinks(en));
  assert.deepEqual(officialLinks(zh), OFFICIAL);
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.ok(!text.includes(`](/${lang === 'zh' ? 'en' : 'zh'}/`), 'internal links keep the reader locale');
    assert.ok(!text.includes(lang === 'zh' ? '审阅稿' : 'Review draft'));
  }
});

test('articles keep the official window, versions and two-track distinction', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    for (const value of [
      '2.1.312', '2.1.313', 'svc-telemetry', 'Open VSX', '0.05%', '0.01%',
      'SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk',
      'SHA256:KOAU57+ZG6u3MG4WwzPzPX2O5YEe9qdOC1Bl+6MVyDQ',
      'remediate-macos.sh', 'remediate-windows.ps1',
    ]) {
      assert.ok(text.includes(value), `${lang}: ${value}`);
    }
    assert.ok(text.includes(lang === 'en' ? '5,000' : '5000'), `${lang}: user cap`);
    assert.match(text, /2:27/);
    assert.match(text, /1:35|13:35/);
    assert.ok(text.includes('17:27'));
    assert.ok(text.includes('04:35'));
    assert.match(text, lang === 'zh' ? /只卸载扩展不够|只卸载扩展可能不够/ : /uninstalling the extension may not be enough|uninstalling is not enough/i);
  }
});

test('evidence boundaries do not claim script execution or independent forensics', () => {
  for (const lang of ['zh', 'en']) {
    const text = source(lang);
    assert.match(text, lang === 'zh' ? /没有在真实电脑上运行官方检查或清理脚本/ : /did not run the official check or remediation scripts on a real computer/);
    assert.match(text, lang === 'zh' ? /没有独立取证/ : /did not perform independent forensics/);
    assert.match(text, lang === 'zh' ? /不能单独当作完整取证结论/ : /not a complete forensic clearance/);
    assert.match(text, lang === 'zh' ? /本文不把 Linux 写成「官方已排除」/ : /does not treat Linux as officially excluded/);
    assert.ok(!/我们(已|已经)?(实测|复现了攻击|验证了脚本)/.test(text));
    assert.ok(!/we (ran|executed|reproduced the attack)/i.test(text));
  }
});

test('failed checks, indicator scope, and host scope stay within the official notice', () => {
  const zh = source('zh');
  const en = source('en');

  assert.match(zh, /权限不足、文件无法读取或其他错误而失败/);
  assert.match(zh, /不等于「没有找到密钥」/);
  assert.match(zh, /不能当成阴性结果/);
  assert.match(zh, /交给管理员核查/);
  assert.match(zh, /没有把它们改写成已验证脚本/);
  assert.match(en, /A permission or read error, or any other failure of the command/);
  assert.match(en, /not the same as “no key found,”/);
  assert.match(en, /must not be treated as a negative result/);
  assert.match(en, /have an administrator investigate/);
  assert.match(en, /does not rewrite them as verified scripts/);

  assert.match(zh, /发现与此次载荷执行、后门安装相符的官方指标/);
  assert.match(zh, /普通的 SSH 活动，或单独出现某个通用文件名，不能直接当成已经确诊、必须清理的依据/);
  assert.match(en, /official indicators consistent with payload execution or backdoor installation from this incident/);
  assert.match(en, /Ordinary SSH activity, or a single generic filename on its own, should not be treated as confirmation that cleanup is required/);

  assert.match(zh, /在窗口内可能从该市场安装或更新过相关扩展的电脑上，先执行公告里的快速检查/);
  assert.match(zh, /窗口内可能从该市场安装或更新过相关扩展的每一台机器都要单独检查/);
  assert.match(zh, /记不清有没有装过，就按官方快速检查处理/);
  assert.match(zh, /不要把范围笼统扩成所有曾经用过 Cursor 的机器/);
  assert.ok(!zh.includes('先在这台曾经运行过 Cursor 的电脑上'));
  assert.ok(!zh.includes('窗口里用过 Cursor 的每一台机器'));
  assert.match(en, /on each computer that may have installed or updated the relevant extension from that marketplace during the window/);
  assert.match(en, /Check each machine that may have installed or updated the relevant extension from that marketplace during the window/);
  assert.match(en, /If you cannot remember, use the official quick check/);
  assert.match(en, /Do not broaden the scope to every machine that has ever run Cursor/);
  assert.ok(!en.includes('on the computer that ran Cursor,'));
  assert.ok(!en.includes('Every machine that ran Cursor during the window'));
});
