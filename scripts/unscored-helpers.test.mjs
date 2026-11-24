// Runtime-defense unit tests for score helpers.
// Run with: node --experimental-strip-types --test scripts/unscored-helpers.test.mjs
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hasNumericToolScores, hasUnscoredFlag, overallScore, isTerminalCategoryTool, isVscodeCategoryTool, isLocalizationMetaKey, visibleFeatureEntries } from '../src/lib/data.ts';

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

test('terminal and vscode category membership uses canonical ide_base, not translated display text', () => {
  const paseo = {
    type: 'agent_platform',
    features: {
      ide_base: '自托管 Agent daemon（多端客户端）',
      ide_base_en: 'Self-hosted agent daemon (multi-client)',
    },
  };
  assert.equal(isTerminalCategoryTool(paseo), false);
  assert.equal(isVscodeCategoryTool(paseo), false);
  // English display prose must not be used for classification; "client" also must not match "cli".
  assert.equal(isTerminalCategoryTool({
    type: 'agent_platform',
    features: { ide_base: 'Self-hosted agent daemon (multi-client)' },
  }), false);
  assert.equal(isTerminalCategoryTool({ type: 'cli', features: { ide_base: 'anything' } }), true);
  assert.equal(isTerminalCategoryTool({
    type: 'client',
    features: { ide_base: 'VS Code 插件；另有 CLI / macOS、Windows 桌面端' },
  }), true);
  assert.equal(isTerminalCategoryTool({
    type: 'web',
    features: { ide_base: 'iOS App + Web + CLI + REST API + MCP' },
  }), true);
  assert.equal(isTerminalCategoryTool({
    type: 'ide',
    features: { ide_base: 'Antigravity standalone IDE (VS Code-based); App/CLI/extensions are separate surfaces' },
  }), true);
  assert.equal(isTerminalCategoryTool({
    type: 'agent_platform',
    features: { ide_base: 'Agent 并行编排器（终端 / tmux）' },
  }), true);
  assert.equal(isVscodeCategoryTool({ features: { ide_base: 'VS Code Fork', ide_base_en: 'unused' } }), true);
  assert.equal(isVscodeCategoryTool({ features: { ide_base: '插件 (VS Code / JetBrains / Vim / Xcode)' } }), true);
});

test('visible feature entries hide *_en metadata and resolve localized display values', () => {
  const features = {
    ide_base: '自托管 Agent daemon（多端客户端）',
    ide_base_en: 'Self-hosted agent daemon (multi-client)',
    mcp_support: true,
  };
  const zh = visibleFeatureEntries(features, 'zh');
  const en = visibleFeatureEntries(features, 'en');
  assert.equal(zh.some((entry) => isLocalizationMetaKey(entry.key) || entry.key === 'ide_base_en'), false);
  assert.equal(en.some((entry) => isLocalizationMetaKey(entry.key) || entry.key === 'ide_base_en'), false);
  assert.equal(zh.find((entry) => entry.key === 'ide_base')?.value, '自托管 Agent daemon（多端客户端）');
  assert.equal(en.find((entry) => entry.key === 'ide_base')?.value, 'Self-hosted agent daemon (multi-client)');
  assert.equal(isLocalizationMetaKey('ide_base_en'), true);
  assert.equal(isLocalizationMetaKey('name_en'), true);
  assert.equal(isLocalizationMetaKey('ide_base'), false);
});
