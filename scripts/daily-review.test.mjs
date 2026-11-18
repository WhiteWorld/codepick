// Documentary-review regressions; build the site before running.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import yaml from 'js-yaml';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const tool = yaml.load(read('data/tools/opencode.yaml'));
const api = yaml.load(read('data/apis/deepseek-api.yaml'));

test('Nov18 full reviews retain cadence, score caveats and actual source coverage', () => {
  for (const item of [tool, api]) {
    assert.equal(item.last_full_review, '2026-11-18');
    assert.equal(item.review_frequency_days, 30);
    assert.equal(item.next_review_due, '2026-12-18');
    assert.equal(item.confidence, 'medium');
    assert.match(item.pricing.note, /历史编辑评分沿用/);
    assert.match(item.pricing.note_en, /Historical editorial scores retained/);
    for (const type of ['pricing', item === tool ? 'docs' : 'changelog']) {
      assert.ok(item.data_sources.some(s => s.type === type && s.last_checked === '2026-11-18'));
    }
  }
});

test('OpenCode V2 package, LSP and optional plan facts do not regress', () => {
  assert.equal(tool.current_version, 'v2.3.2');
  assert.equal(tool.features.lsp_integration, false);
  assert.deepEqual(tool.pricing.plans.map(p => p.price), [0, 10, 40, 40]);
  const teams = tool.pricing.plans.find(p => p.name.includes('Teams'));
  assert.match(teams.limits_en, /two-member minimum/);
  assert.match(teams.name, /2 members/);
  assert.ok(tool.quick_start_en.some(s => s.includes('@opencode/cli') && s.includes('2.3.2') && s.includes('1.19.6')));
  assert.ok(!/75\+|无需翻墙|¥9\.9|¥40/.test([...tool.quick_start, tool.china_note].join(' ')));
  assert.match(tool.pricing.note_en, /Go Teams starts with it enabled/);
  assert.match(tool.pricing.note_en, /runs no language servers/);
});

test('OpenCode pricing, release and review limitations reach both languages and JSON-LD', () => {
  for (const lang of ['zh', 'en']) {
    const html = read(`dist/${lang}/tool/opencode/index.html`);
    const app = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(([, s]) => JSON.parse(s)).find(s => s['@type'] === 'SoftwareApplication');
    assert.ok(html.includes('v2.3.2'));
    assert.deepEqual(app.offers.map(p => p.price), [0, 10, 40, 40]);
    assert.ok(app.offers.every(p => p.priceCurrency === 'USD'));
    assert.ok(html.includes(lang === 'zh' ? '不运行语言服务器' : 'runs no language servers'));
    assert.ok(html.includes(lang === 'zh' ? '历史编辑评分沿用' : 'Historical editorial scores retained'));
    assert.ok(html.includes(lang === 'zh' ? '默认开启 Extra Usage' : 'Extra Usage starts enabled'));
    assert.ok(html.includes('4.6% + $0.31'));
  }
});

test('DeepSeek retains token rates while disclosing current tool charges and unresolved policies', () => {
  assert.deepEqual(api.pricing.plans.map(p => p.price), ['$0.15 / $0.30', '$0.66 / $1.32']);
  assert.deepEqual(api.features.supported_clients, ['Claude Code', 'OpenCode', 'Codex CLI']);
  for (const lang of ['zh', 'en']) {
    const note = lang === 'zh' ? api.pricing.note : api.pricing.note_en;
    for (const value of ['$0.75', '$0.225', '$0.45', '$0.116', '$0.058', 'Alpha Search']) assert.ok(note.includes(value));
    assert.match(note, lang === 'zh' ? /免费期已过/ : /has expired/);
    assert.match(note, lang === 'zh' ? /未注明限时价格截止日/ : /No end date/);
    assert.match(note, lang === 'zh' ? /未实测后端路由/ : /backend routing was not tested/);
    assert.match(note, lang === 'zh' ? /申请退出训练/ : /opt out of training/);
    const html = read(`dist/${lang}/coding-plan/index.html`);
    assert.ok(html.includes(note.slice(0, 45)), 'review note must reach the reader-facing API comparison');
    assert.ok(html.includes(lang === 'zh' ? '免费期已过' : 'has expired'));
    assert.ok(html.includes(lang === 'zh' ? '未注明限时价格截止日' : 'No end date'));
  }
});
