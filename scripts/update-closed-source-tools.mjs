#!/usr/bin/env node
/**
 * CodePick 闭源工具更新脚本
 * 用法: node scripts/update-closed-source-tools.mjs [--dry-run] [tool-id]
 *
 * 更新闭源工具数据：
 * - 更新 last_full_review 和 next_review_due
 * - 检测页面内容变化（通过 hash）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'tools');
const CACHE_DIR = path.join(__dirname, '.cache');
const DRY_RUN = process.argv.includes('--dry-run');
const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const SPECIFIC_TOOL = args.length > 0 ? args[0] : null;

fs.mkdirSync(CACHE_DIR, { recursive: true });

const CLOSED_SOURCE_TOOLS = {
  'cursor': {
    pages: [
      { name: 'pricing', url: 'https://cursor.com/pricing' },
      { name: 'changelog', url: 'https://cursor.com/changelog' },
    ],
  },
  'claude-code': {
    pages: [
      { name: 'pricing', url: 'https://claude.ai/pricing' },
      { name: 'docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
    ],
  },
  'copilot': {
    pages: [
      { name: 'pricing', url: 'https://github.com/features/copilot/plans' },
      { name: 'docs', url: 'https://docs.github.com/en/copilot' },
    ],
  },
  'trae': {
    pages: [
      { name: 'pricing', url: 'https://www.trae.ai/pricing' },
      { name: 'docs', url: 'https://docs.trae.ai/ide/billing' },
    ],
  },
};

async function fetchPageHash(name, url) {
  const cacheFile = path.join(CACHE_DIR, `${name}.hash`);
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CodePick-Monitor/1.0',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const content = await response.arrayBuffer();
    const newHash = crypto.createHash('md5').update(Buffer.from(content)).digest('hex');

    let changed = false;
    if (fs.existsSync(cacheFile)) {
      const oldHash = fs.readFileSync(cacheFile, 'utf8').trim();
      changed = oldHash !== newHash;
    }
    if (!DRY_RUN) {
      fs.writeFileSync(cacheFile, newHash);
    }
    return { changed, hash: newHash };
  } catch (error) {
    console.error(`  ⚠ 检查 ${name} 页面失败: ${error.message}`);
    return { changed: null, hash: null };
  }
}

function readYAML(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

function writeYAML(filePath, data) {
  const content = yaml.dump(data, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
  });
  fs.writeFileSync(filePath, content, 'utf8');
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function updateTool(toolId, config) {
  const filePath = path.join(DATA_DIR, `${toolId}.yaml`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ❌ 文件不存在: ${toolId}.yaml`);
    return false;
  }

  console.log(`\n🔧 处理工具: ${toolId}`);
  const data = readYAML(filePath);
  const today = new Date();
  const changes = [];
  const pageChanges = [];

  for (const page of config.pages) {
    console.log(`  检查页面: ${page.name}`);
    const result = await fetchPageHash(`${toolId}-${page.name}`, page.url);
    if (result.changed === true) {
      pageChanges.push(page.name);
      console.log(`    🔄 内容已变化!`);
    } else if (result.changed === false) {
      console.log(`    ✅ 无变化`);
    }
  }

  changes.push(`last_full_review: ${data.last_full_review} → ${formatDate(today)}`);
  data.last_full_review = formatDate(today);

  const reviewFreq = data.review_frequency_days || 30;
  const nextReview = addDays(today, reviewFreq);
  changes.push(`next_review_due: ${data.next_review_due} → ${formatDate(nextReview)}`);
  data.next_review_due = formatDate(nextReview);

  if (data.data_sources) {
    for (const source of data.data_sources) {
      source.last_checked = formatDate(today);
    }
    changes.push(`data_sources.last_checked: 更新为 ${formatDate(today)}`);
  }

  if (pageChanges.length > 0) {
    console.log(`  ⚠️  以下页面内容有变化，请手动检查: ${pageChanges.join(', ')}`);
  }

  if (DRY_RUN) {
    console.log(`  📋 变更预览 (--dry-run):`);
    changes.forEach(c => console.log(`    - ${c}`));
  } else {
    writeYAML(filePath, data);
    console.log(`  ✅ 已更新:`);
    changes.forEach(c => console.log(`    - ${c}`));
  }

  return true;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║       CodePick 闭源工具更新                              ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  if (DRY_RUN) {
    console.log('\n⚠️  预览模式 (--dry-run) - 不会实际修改文件\n');
  }

  let toolsToUpdate = Object.entries(CLOSED_SOURCE_TOOLS);

  if (SPECIFIC_TOOL) {
    if (!CLOSED_SOURCE_TOOLS[SPECIFIC_TOOL]) {
      console.log(`❌ 未知工具: ${SPECIFIC_TOOL}`);
      console.log(`可用工具: ${Object.keys(CLOSED_SOURCE_TOOLS).join(', ')}`);
      process.exit(1);
    }
    toolsToUpdate = [[SPECIFIC_TOOL, CLOSED_SOURCE_TOOLS[SPECIFIC_TOOL]]];
    console.log(`\n🎯 指定更新: ${SPECIFIC_TOOL}`);
  }

  let updated = 0;
  for (const [toolId, config] of toolsToUpdate) {
    const success = await updateTool(toolId, config);
    if (success) updated++;
  }

  console.log(`\n═══════════════════════════════════════════════════════════`);
  console.log(`📊 总结: 处理 ${toolsToUpdate.length} 个工具`);
  if (DRY_RUN) {
    console.log(`   运行不带 --dry-run 参数以应用变更`);
  }
}

main().catch(console.error);
