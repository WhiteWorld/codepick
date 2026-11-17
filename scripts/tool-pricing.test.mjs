// Integration assertions: run `npm run build && node --test scripts/tool-pricing.test.mjs`.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
    assert.ok(!/<td[^>]*>\$240(?:\/|<)/.test(html));
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
