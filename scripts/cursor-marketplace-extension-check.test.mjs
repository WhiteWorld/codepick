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
