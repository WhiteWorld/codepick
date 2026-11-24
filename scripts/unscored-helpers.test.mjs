// Runtime-defense unit tests for score helpers.
// Run with: node --experimental-strip-types --test scripts/unscored-helpers.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hasNumericToolScores, hasUnscoredFlag, overallScore } from '../src/lib/data.ts';

const pillars = {
  coding_ability: 8,
  cost_efficiency: 7,
  flexibility: 6,
  china_friendly: 5,
};

test('unscored flags that are not boolean false do not count as scored', () => {
  assert.equal(hasUnscoredFlag({ unscored: true }), true);
  assert.equal(hasUnscoredFlag({ unscored: 'true' }), true);
  assert.equal(hasUnscoredFlag({ unscored: 'TRUE' }), true);
  assert.equal(hasUnscoredFlag({ unscored: 1 }), true);
  assert.equal(hasUnscoredFlag({ unscored: 'yes' }), true);
  assert.equal(hasUnscoredFlag({ unscored: false }), false);
  assert.equal(hasUnscoredFlag({}), false);
  assert.equal(hasUnscoredFlag({ unscored: null }), false);
  assert.equal(hasNumericToolScores({ unscored: 'true', scores: pillars }), false);
  assert.equal(hasNumericToolScores({ scores: pillars }), true);
  assert.equal(hasNumericToolScores({ unscored: false, scores: pillars }), true);
});

test('overallScore ignores non-finite optional fields such as privacy NaN', () => {
  assert.equal(overallScore(pillars), 6.5);
  assert.equal(overallScore({ ...pillars, privacy: Number.NaN }), 6.5);
  assert.equal(overallScore({ ...pillars, privacy: Infinity }), 6.5);
  assert.equal(overallScore({ coding_ability: 8, cost_efficiency: 8, flexibility: 8, china_friendly: 8 }), 8);
});
