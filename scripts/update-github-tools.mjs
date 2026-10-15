#!/usr/bin/env node
/**
 * CodePick GitHub 工具自动更新脚本
 * 用法: node scripts/update-github-tools.mjs [--dry-run] [tool-id]
 *
 * 自动检查并更新有 GitHub repo 的工具数据：
 * - 获取最新 release 版本
 * - 更新 current_version 和 version_tracked_at
 * - 更新 last_full_review 和 next_review_due
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data', 'tools');
const DRY_RUN = process.argv.includes('--dry-run');
const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const SPECIFIC_TOOL = args.length > 0 ? args[0] : null;

const GITHUB_TOOLS = {
  'aider': { repo: 'Aider-AI/aider' },
  // cline 发布多条产品线（desktop-/cli-/sdk/ 与 VS Code 扩展 v4.x），只取 v 开头的扩展版本
  'cline': { repo: 'cline/cline', tag_pattern: '^v\\d' },
  // opencode-ai/opencode 已归档，项目已迁移至 anomalyco/opencode
  'opencode': { repo: 'anomalyco/opencode' },
  'roo-code': { repo: 'RooVetGit/Roo-Code' },
  'gemini-cli': { repo: 'google-gemini/gemini-cli' },
};

/**
 * 版本号转数字元组，用于比较大小。
 * 兼容 v0.86.2 / 1.14.4 / rust-v0.162.1 / v2026.10.1 等格式。
 * 无法解析（如 'GA'）返回 null。
 */
function versionTuple(v) {
  if (v == null) return null;
  const nums = String(v).match(/\d+/g);
  return nums ? nums.map(Number) : null;
}

/** latest 是否严格新于 current；current 未知（null）时视为可更新 */
function isNewer(latest, current) {
  const l = versionTuple(latest);
  if (!l) return false;
  const c = versionTuple(current);
  if (!c) return true;
  const n = Math.max(l.length, c.length);
  for (let i = 0; i < n; i++) {
    const a = l[i] ?? 0, b = c[i] ?? 0;
    if (a !== b) return a > b;
  }
  return false;
}

async function fetchLatestRelease(repo, tagPattern) {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    // 指定了 tag_pattern 时拉取 release 列表做过滤（如 cline 的多产品线 tags）
    const url = tagPattern
      ? `https://api.github.com/repos/${repo}/releases?per_page=30`
      : `https://api.github.com/repos/${repo}/releases/latest`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    let data = await response.json();
    if (tagPattern) {
      const re = new RegExp(tagPattern);
      data = data.find(r => !r.prerelease && !r.draft && re.test(r.tag_name));
      if (!data) throw new Error(`no release matches ${tagPattern}`);
    }
    return {
      tag_name: data.tag_name,
      name: data.name,
      published_at: data.published_at,
      html_url: data.html_url,
    };
  } catch (error) {
    console.error(`  ❌ 获取 ${repo} release 失败: ${error.message}`);
    return null;
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
  const currentVersion = data.current_version;
  const today = new Date();

  console.log(`  当前版本: ${currentVersion || 'N/A'}`);

  const release = await fetchLatestRelease(config.repo, config.tag_pattern);
  if (!release) {
    return false;
  }

  const latestVersion = release.tag_name;
  console.log(`  最新版本: ${latestVersion}`);

  // 防倒退：latest 不比 current 新时只滚动复核日期，不改版本号
  //（如 aider 的 GitHub release 停留在 v0.86.0，而 PyPI 已到 v0.86.2）
  const needsUpdate = isNewer(latestVersion, currentVersion);
  if (latestVersion !== currentVersion && !needsUpdate) {
    console.log(`  ⚠ 远端版本 ${latestVersion} 不新于当前 ${currentVersion}，跳过版本更新`);
  }
  const changes = [];

  if (needsUpdate) {
    changes.push(`version: ${currentVersion || 'N/A'} → ${latestVersion}`);
    data.current_version = latestVersion;
    data.version_tracked_at = formatDate(today);

    if (!data.changelog) {
      data.changelog = [];
    }
    const newChangelog = {
      date: formatDate(today),
      type: 'release',
      summary: `${latestVersion}: ${release.name || '版本更新'}`,
    };
    data.changelog.unshift(newChangelog);
    changes.push(`changelog: 添加 ${latestVersion} 更新记录`);
  }

  changes.push(`last_full_review: ${data.last_full_review} → ${formatDate(today)}`);
  data.last_full_review = formatDate(today);

  const reviewFreq = data.review_frequency_days || 30;
  const nextReview = addDays(today, reviewFreq);
  changes.push(`next_review_due: ${data.next_review_due} → ${formatDate(nextReview)}`);
  data.next_review_due = formatDate(nextReview);

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
  console.log('║       CodePick GitHub 工具自动更新                      ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  if (DRY_RUN) {
    console.log('\n⚠️  预览模式 (--dry-run) - 不会实际修改文件\n');
  }

  let toolsToUpdate = Object.entries(GITHUB_TOOLS);

  if (SPECIFIC_TOOL) {
    if (!GITHUB_TOOLS[SPECIFIC_TOOL]) {
      console.log(`❌ 未知工具: ${SPECIFIC_TOOL}`);
      console.log(`可用工具: ${Object.keys(GITHUB_TOOLS).join(', ')}`);
      process.exit(1);
    }
    toolsToUpdate = [[SPECIFIC_TOOL, GITHUB_TOOLS[SPECIFIC_TOOL]]];
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
