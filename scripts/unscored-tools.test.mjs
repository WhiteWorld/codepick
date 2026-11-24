// Integration assertions: run `npm run build && node --test scripts/unscored-tools.test.mjs`.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { describe, test } from 'node:test';
import yaml from 'js-yaml';

const UNSCORED_IDS = ['t3-code', 'happy', 'paseo', 'nimbalyst', 'orca'];
const PILLARS = ['coding_ability', 'cost_efficiency', 'flexibility', 'china_friendly'];
const toolsDir = new URL('../data/tools/', import.meta.url);

function loadTool(id) {
  return yaml.load(readFileSync(new URL(`./${id}.yaml`, toolsDir), 'utf8'));
}

function allToolFiles() {
  return readdirSync(toolsDir).filter((file) => file.endsWith('.yaml'));
}

function page(lang, id) {
  const html = readFileSync(new URL(`../dist/${lang}/tool/${id}/index.html`, import.meta.url), 'utf8');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .flatMap(([, value]) => JSON.parse(value));
  return { html, schemas, app: schemas.find((schema) => schema['@type'] === 'SoftwareApplication') };
}

function listPage(lang, path) {
  return readFileSync(new URL(`../dist/${lang}/${path}/index.html`, import.meta.url), 'utf8');
}

function extractCompareTools(html) {
  const assignment = html.match(/const toolsJson = ((?:"(?:\\.|[^"\\])*")|(?:'([^'\\]|\\.)*'));/);
  if (assignment) {
    return JSON.parse(JSON.parse(assignment[1]));
  }
  // Astro define:vars may in-line the string without a second JSON.parse wrapper being visible.
  const parsedCall = html.match(/JSON\.parse\((toolsJson|"\[(?:\\.|[^"\\])*\]")\)/);
  if (parsedCall && parsedCall[1].startsWith('"')) {
    return JSON.parse(JSON.parse(parsedCall[1]));
  }
  const idBlocks = [];
  for (const id of UNSCORED_IDS.concat(['crystal'])) {
    const re = new RegExp(`\\{[^{}]*"id"\\s*:\\s*"${id}"[^{}]*\\}`);
    const match = html.match(re);
    if (match) {
      try {
        idBlocks.push(JSON.parse(match[0].replace(/&quot;/g, '"')));
      } catch {
        // fall through to a looser search below
      }
    }
  }
  if (idBlocks.length) return idBlocks;
  throw new Error('Unable to extract compare-page tool payload');
}

describe('documentary unscored tool entries', () => {
  test('the five new entries are explicitly unscored and do not invent pillar scores or future review dates', () => {
    for (const id of UNSCORED_IDS) {
      const tool = loadTool(id);
      assert.equal(tool.id, id);
      assert.equal(tool.unscored, true);
      assert.equal(tool.scores, undefined);
      for (const key of PILLARS) {
        assert.equal(tool[key], undefined);
      }
      assert.equal(tool.next_review_due, undefined);
      assert.doesNotMatch(String(tool.pricing?.note_en || ''), /Historical editorial scores retained/);
      assert.doesNotMatch(String(tool.pricing?.note || ''), /历史编辑评分沿用/);
      assert.match(String(tool.unscored_reason), /2026-11-24/);
      assert.match(String(tool.unscored_reason_en), /2026-11-24/);
      assert.match(String(tool.unscored_reason), /不给出评分/);
      assert.match(String(tool.unscored_reason_en), /no scores/i);
      assert.ok((tool.tagline || '').length > 20, id);
      assert.ok((tool.tagline_en || '').length > 20, id);
      assert.ok(Array.isArray(tool.best_for) && tool.best_for.length > 0, id);
      assert.ok(Array.isArray(tool.best_for_en) && tool.best_for_en.length > 0, id);
      assert.ok(Array.isArray(tool.pros) && tool.pros.length > 0, id);
      assert.ok(Array.isArray(tool.cons) && tool.cons.length > 0, id);
    }
  });

  test('previously scored tools still have four numeric pillar scores', () => {
    let scored = 0;
    for (const file of allToolFiles()) {
      const tool = yaml.load(readFileSync(new URL(`./${file}`, toolsDir), 'utf8'));
      if (UNSCORED_IDS.includes(tool.id) || tool.unscored === true) continue;
      scored += 1;
      for (const key of PILLARS) {
        assert.equal(typeof tool.scores?.[key], 'number', `${file} ${key}`);
        assert.ok(Number.isFinite(tool.scores[key]), `${file} ${key}`);
      }
    }
    assert.equal(scored, 43);
  });

  test('Paseo current license is dated Apache-2.0 and does not present AGPL as the current license', () => {
    const tool = loadTool('paseo');
    assert.match(tool.pricing.note, /Apache License, Version 2\.0|Apache-2\.0/);
    assert.match(tool.pricing.note, /2026-11-24/);
    assert.match(tool.pricing.note, /AGPL-3\.0/);
    assert.match(tool.pricing.note_en, /Apache License, Version 2\.0|Apache-2\.0/);
    const zhGuide = readFileSync(new URL('../src/content/guides/paseo-remote-agent-orchestrator.md', import.meta.url), 'utf8');
    const enGuide = readFileSync(new URL('../src/content/guides-en/paseo-remote-agent-orchestrator.md', import.meta.url), 'utf8');
    assert.match(zhGuide, /许可资料更正（2026-11-24/);
    assert.match(enGuide, /License correction \(2026-11-24/);
    assert.doesNotMatch(zhGuide, /（GitHub：\[getpaseo\/paseo\]\([^)]+\)，AGPL-3\.0）/);
    assert.doesNotMatch(enGuide, /\(GitHub: \[getpaseo\/paseo\]\([^)]+\), AGPL-3\.0\)/);
  });

  test('Crystal historical scores stay in place and only gain a dated Nimbalyst cross-reference', () => {
    const crystal = loadTool('crystal');
    assert.equal(crystal.scores.coding_ability, 8.5);
    assert.equal(crystal.scores.cost_efficiency, 9);
    assert.match(crystal.pricing.note, /历史编辑评分沿用/);
    assert.match(crystal.pricing.note_en, /Historical editorial scores retained/);
    assert.match(crystal.pricing.note, /2026-11-24/);
    assert.match(crystal.pricing.note, /\/zh\/tool\/nimbalyst\//);
    assert.match(crystal.pricing.note_en, /\/en\/tool\/nimbalyst\//);
    assert.equal(crystal.current_version, 'v0.3.5');
  });
});

describe('built pages hide fake scores for unscored tools and keep scored tools unchanged', () => {
  for (const id of UNSCORED_IDS) {
    for (const lang of ['zh', 'en']) {
      test(`${lang}/tool/${id}/ has no aggregateRating and shows an explicit unscored state`, () => {
        assert.ok(existsSync(new URL(`../dist/${lang}/tool/${id}/index.html`, import.meta.url)), `${lang}/${id} missing`);
        const { html, app } = page(lang, id);
        assert.ok(app, `${lang}/${id} missing SoftwareApplication schema`);
        assert.equal(app.aggregateRating, undefined, `${lang}/${id} must not emit aggregateRating`);
        assert.ok(html.includes('data-score-state="unscored"'), `${lang}/${id} missing unscored marker`);
        if (lang === 'zh') {
          assert.ok(html.includes('未评分'), id);
          assert.ok(html.includes('待实测'), id);
        } else {
          assert.ok(html.includes('Unscored'), id);
          assert.ok(html.includes('Not yet tested'), id);
        }
        const section = html.match(/<section[^>]*data-score-state="unscored"[\s\S]*?<\/section>/);
        assert.ok(section, `${lang}/${id} missing unscored section`);
        assert.ok(!section[0].includes('score-bar-fill'), `${lang}/${id} unscored section must not render score bars`);
        assert.doesNotMatch(section[0], />\s*5(?:\.0)?\s*</);
      });
    }
  }

  test('a scored tool still emits aggregateRating and numeric score bars', () => {
    const { html, app } = page('en', 'crystal');
    assert.ok(app.aggregateRating);
    assert.equal(typeof app.aggregateRating.ratingValue, 'number');
    assert.ok(Number.isFinite(app.aggregateRating.ratingValue));
    assert.ok(html.includes('score-bar-fill'));
    assert.ok(html.includes('Historical editorial scores retained'));
    assert.ok(!html.includes('data-score-state="unscored"'));
    const zh = page('zh', 'crystal');
    assert.ok(zh.html.includes('历史编辑评分沿用'));
    assert.ok(zh.app.aggregateRating);
  });

  test('overview tables mark unscored tools and do not treat them as 0 or 5', () => {
    for (const lang of ['zh', 'en']) {
      const html = listPage(lang, 'tools/overview');
      const label = lang === 'zh' ? '未评分' : 'Unscored';
      for (const id of UNSCORED_IDS) {
        const rows = html.split(/<tr(?=[\s>])/).filter((chunk) => chunk.includes(`/tool/${id}/`) && chunk.includes("<td"));
        assert.equal(rows.length, 1, `${lang} overview should have exactly one row for ${id}`);
        const row = `<tr${rows[0].split('</tr>')[0]}</tr>`;
        assert.ok(row.includes('data-score-state="unscored"'), `${lang} overview ${id} should be marked unscored`);
        assert.ok(row.includes(label), `${lang} overview ${id} should show ${label}`);
        // Astro omits =" " for empty data attributes, leaving boolean `data-coding`.
        assert.match(row, /data-coding(?:=""|(?=[\s>]))/);
        assert.match(row, /data-cost(?:=""|(?=[\s>]))/);
        assert.match(row, /data-flex(?:=""|(?=[\s>]))/);
        assert.match(row, /data-china(?:=""|(?=[\s>]))/);
        assert.doesNotMatch(row, /data-coding="\d/);
        assert.doesNotMatch(row, /data-cost="\d/);
      }
    }
  });

  test('china-access listings exclude unscored tools', () => {
    for (const lang of ['zh', 'en']) {
      const html = listPage(lang, 'tools/china');
      for (const id of UNSCORED_IDS) {
        assert.ok(!html.includes(`/tool/${id}/`), `${lang} china page must not list unscored tool ${id}`);
      }
    }
  });

  test('compare payload keeps null scores for unscored tools and numeric scores for scored Crystal', () => {
    const html = listPage('en', 'tools/compare');
    const tools = extractCompareTools(html);
    const byId = new Map((Array.isArray(tools) ? tools : []).map((tool) => [tool.id, tool]));
    for (const id of UNSCORED_IDS) {
      const tool = byId.get(id);
      assert.ok(tool, `compare payload missing ${id}`);
      assert.equal(tool.scored, false, id);
      assert.equal(tool.scores, null, id);
    }
    const crystal = byId.get('crystal');
    if (crystal) {
      assert.notEqual(crystal.scored, false);
      assert.equal(typeof crystal.scores?.coding_ability, 'number');
      assert.ok(Number.isFinite(crystal.scores.coding_ability));
    }
  });

  test('agent platform cards for the five tools show the unscored label instead of 5.0 bars', () => {
    for (const lang of ['zh', 'en']) {
      const html = listPage(lang, 'agents');
      const label = lang === 'zh' ? '未评分' : 'Unscored';
      for (const id of UNSCORED_IDS) {
        assert.ok(html.includes(`/tool/${id}/`), `${lang} agents page should include ${id}`);
      }
      // Count 5.0 score bars would be too loose because scored peers still render bars.
      // Instead, each new card should carry the unscored marker.
      const markers = [...html.matchAll(/data-score-state="unscored"/g)];
      assert.ok(markers.length >= UNSCORED_IDS.length, `${lang} agents page should mark the new unscored tools`);
      assert.ok(html.includes(label));
    }
  });
});
