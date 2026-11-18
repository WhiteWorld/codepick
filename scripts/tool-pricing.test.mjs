// Integration assertions: run `npm run build && node --test scripts/tool-pricing.test.mjs`.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import yaml from 'js-yaml';
import test from 'node:test';

function page(lang, id) {
  const html = readFileSync(new URL(`../dist/${lang}/tool/${id}/index.html`, import.meta.url), 'utf8');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .flatMap(([, value]) => JSON.parse(value));
  return { html, app: schemas.find(schema => schema['@type'] === 'SoftwareApplication') };
}

test('annual prices retain their billing period and currency in both languages and JSON-LD', () => {
  for (const [lang, suffix] of [['zh', '/年'], ['en', '/year']]) {
    const { html, app } = page(lang, 'n8n');
    assert.ok(html.includes(`€240${suffix}`));
    assert.ok(!html.includes('$240'));
    assert.ok(!html.includes('¥240'));
    assert.ok(!html.includes('240/use'));
    const starter = app.offers.find(offer => offer.price === 240);
    assert.equal(starter.priceCurrency, 'EUR');
    assert.equal(starter.priceSpecification.billingDuration, 'P1Y');
    assert.equal(starter.priceSpecification.price, 240);
    const dify = page(lang, 'dify');
    assert.ok(dify.html.includes(`$590${suffix}`));
  }
});

test('custom/unknown prices do not become free offers', () => {
  const { app } = page('en', 'dify');
  assert.ok(app.offers.length > 0);
  assert.ok(app.offers.every(offer => typeof offer.price === 'number'));
  assert.ok(!app.offers.some(offer => /enterprise/i.test(offer.name)));
});


test('Floatboat uses stated annual totals, not rounded monthly equivalents or unverified monthly contracts', () => {
  for (const [lang, suffix] of [['zh', '/年'], ['en', '/year']]) {
    const { html, app } = page(lang, 'floatboat');
    const paid = app.offers.filter(offer => offer.price > 0);
    assert.deepEqual(paid.map(offer => offer.price), [199, 599.76, 2003.76]);
    for (const offer of paid) {
      assert.equal(offer.priceCurrency, 'USD');
      assert.equal(offer.priceSpecification.billingDuration, 'P1Y');
      assert.ok(html.includes(`$${offer.price}${suffix}`));
    }
    assert.ok(!app.offers.some(offer => [16.58, 49.98, 166.98, 59.98, 199.98, 198.96].includes(offer.price)));
    assert.ok(html.includes('5,000') && html.includes('15,000') && html.includes('50,000'));
    assert.ok(html.includes('1,399'));
    assert.ok(html.includes(lang === 'zh' ? '结转/过期' : 'rollover/expiry'));
    for (const surface of ['overview', 'compare']) {
      const listHtml = readFileSync(new URL(`../dist/${lang}/tools/${surface}/index.html`, import.meta.url), 'utf8');
      assert.ok(listHtml.includes(`€240${suffix}`), `${lang}/${surface} must preserve EUR annual price`);
      assert.ok(listHtml.includes(`$199${suffix}`), `${lang}/${surface} must show Floatboat annual period`);
      assert.ok(!listHtml.includes('€240/mo') && !listHtml.includes('€240/月'));
      assert.ok(listHtml.includes(lang === 'zh' ? '价格待确认' : 'Price not established'));
    }
  }
});


test('review limitations and historical-score caveats are visible, even without numeric price cards', () => {
  let reviewed = 0;
  for (const file of readdirSync(new URL('../data/tools/', import.meta.url)).filter(file => file.endsWith('.yaml'))) {
    const tool = yaml.load(readFileSync(new URL(`../data/tools/${file}`, import.meta.url), 'utf8'));
    if (!tool.pricing?.note_en?.includes('Historical editorial scores retained')) continue;
    reviewed++;
    assert.ok(page('en', tool.id).html.includes('Historical editorial scores retained'), tool.id);
    assert.ok(page('zh', tool.id).html.includes('历史编辑评分沿用'), tool.id);
  }
  // Includes the Nov18 full documentary OpenCode review, in addition to the prior 37.
  assert.equal(reviewed, 38);
  assert.ok(page('en', 'conductor').html.includes('list no subscription amounts'));
});


test('reviewed API pricing and privacy limitations are visible on their consumer pages', () => {
  const plans = readdirSync(new URL('../data/plans/', import.meta.url)).filter(file => file.endsWith('.yaml'))
    .map(file => yaml.load(readFileSync(new URL(`../data/plans/${file}`, import.meta.url), 'utf8')));
  for (const id of ['ark-agent-plan', 'bailian-coding-plan', 'bailian-token-plan', 'minimax-token-plan', 'ollama']) {
    const api = yaml.load(readFileSync(new URL(`../data/apis/${id}.yaml`, import.meta.url), 'utf8'));
    for (const lang of ['zh', 'en']) {
      const html = [readFileSync(new URL(`../dist/${lang}/coding-plan/index.html`, import.meta.url), 'utf8'),
        ...plans.filter(plan => (plan.api || plan.composition?.api) === id)
          .map(plan => readFileSync(new URL(`../dist/${lang}/plan/${plan.id}/index.html`, import.meta.url), 'utf8'))].join(' ');
      const note = lang === 'en' ? api.pricing.note_en : api.pricing.note;
      assert.ok(html.includes(note.slice(0, 35)), `${id}/${lang} must show its actual review caveat`);
    }
  }
});


test('a free software tier does not invent a hosted trial or credit-card exemption', () => {
  for (const lang of ['zh', 'en']) {
    for (const id of ['floatboat', 'multica', 'conductor']) {
      const { html } = page(lang, id);
      for (const unsupported of ['no credit card required', '无需信用卡', 'Paid subscription with free trial period', '支持免费试用期', 'Start for Free']) {
        assert.ok(!html.includes(unsupported), `${id}/${lang} must not invent ${unsupported}`);
      }
    }
  }
});
