/**
 * gen-juejin-post.mjs
 *
 * 将 src/content/{compare,guides}/*.md 转换为掘金发布格式。
 *
 * 用法：
 *   node scripts/gen-juejin-post.mjs                    # 列出所有可用文章
 *   node scripts/gen-juejin-post.mjs cursor-vs-copilot   # 生成指定文章
 *   node scripts/gen-juejin-post.mjs --all               # 批量生成全部
 *   node scripts/gen-juejin-post.mjs --list              # 仅列出文章列表
 */

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://codepick.dev';

// 掘金标签映射：文章 tag → 掘金推荐标签
const TAG_MAP = {
  'cursor': 'AI',
  'github-copilot': 'GitHub',
  'windsurf': 'AI',
  'kiro': 'AI',
  'cline': 'AI',
  'roo-code': 'AI',
  'trae-cn': 'AI',
  'claude-code': 'AI',
  'gemini-cli': 'Google',
  'codex-cli': 'AI',
  '对比': '前端',
  'ide': 'IDE',
  '免费': '程序员',
  '入门': '程序员',
  '字节跳动': '字节跳动',
  'terminal': '命令行工具',
  'cli': '命令行工具',
  'spec-driven': '软件工程',
  'AWS': 'AWS',
  'vscode': 'VS Code',
  '国内': '程序员',
};

// 所有文章固定追加的掘金标签
const BASE_TAGS = ['AI', '前端', '效率工具'];

// 文章来源目录
const CONTENT_DIRS = [
  { dir: 'src/content/compare', type: 'compare', urlPrefix: '/compare' },
  { dir: 'src/content/guides', type: 'guides', urlPrefix: '/guides' },
];

// ── 解析 frontmatter ──────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const metaBlock = match[1];
  const body = match[2];
  const meta = {};

  for (const line of metaBlock.split('\n')) {
    const m = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (m) {
      const [, key, val] = m;
      meta[key] = val;
    }
    // 解析 tags 数组
    const tagMatch = line.match(/^tags:\s*\[(.*)\]/);
    if (tagMatch) {
      meta.tags = tagMatch[1]
        .split(',')
        .map(t => t.trim().replace(/^["']|["']$/g, ''));
    }
  }

  return { meta, body };
}

// ── 扫描全部文章 ──────────────────────────────────────────

function scanArticles() {
  const articles = [];

  for (const { dir, type, urlPrefix } of CONTENT_DIRS) {
    const fullDir = path.resolve(dir);
    if (!fs.existsSync(fullDir)) continue;

    for (const file of fs.readdirSync(fullDir).filter(f => f.endsWith('.md'))) {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf-8');
      const { meta, body } = parseFrontmatter(raw);

      if (meta.draft === 'true') continue;

      articles.push({
        slug,
        file,
        type,
        urlPrefix,
        title: meta.title || slug,
        description: meta.description || '',
        date: meta.date || '',
        tags: meta.tags || [],
        body,
      });
    }
  }

  // 按日期降序
  articles.sort((a, b) => b.date.localeCompare(a.date));
  return articles;
}

// ── 站内链接 → 绝对链接 ──────────────────────────────────

function convertInternalLinks(body) {
  // [文字](/path) → [文字](https://codepick.dev/path)
  return body.replace(/\]\(\/([\w\-\/]+)\)/g, `](${SITE_URL}/$1)`);
}

// ── 生成掘金推荐标签 ─────────────────────────────────────

function suggestJuejinTags(articleTags) {
  const tagSet = new Set(BASE_TAGS);
  for (const t of articleTags) {
    const mapped = TAG_MAP[t.toLowerCase()] || TAG_MAP[t];
    if (mapped) tagSet.add(mapped);
  }
  // 掘金限制最多选 3-4 个标签
  return [...tagSet].slice(0, 4);
}

// ── 生成掘金格式正文 ─────────────────────────────────────

function generateJuejinPost(article) {
  const canonicalUrl = `${SITE_URL}${article.urlPrefix}/${article.slug}`;
  const juejinTags = suggestJuejinTags(article.tags);

  let body = article.body.trim();

  // 转换站内链接为绝对链接
  body = convertInternalLinks(body);

  // 组装最终内容
  const lines = [];

  // 掘金发布元信息（注释形式，方便复制时参考）
  lines.push(`<!-- 掘金发布参考 -->`);
  lines.push(`<!-- 标题：${article.title} -->`);
  lines.push(`<!-- 标签：${juejinTags.join('、')} -->`);
  lines.push(`<!-- 分类：前端 -->`);
  lines.push(`<!-- 封面：建议使用 codepick.dev OG 图或自制封面 -->`);
  lines.push('');

  // 开头引言（description 做 TL;DR）
  if (article.description) {
    lines.push(`> ${article.description}`);
    lines.push('');
  }

  // 正文
  lines.push(body);

  // 尾部引流
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`> 本文首发于 [CodePick](${SITE_URL}) — 面向中国开发者的 AI 编程工具选型站`);
  lines.push(`>`);
  lines.push(`> 原文链接：[${article.title}](${canonicalUrl})`);
  lines.push(`>`);
  lines.push(`> 站内收录了 ${getToolCount()}+ 款 AI 编程工具的详细评测与对比，欢迎访问 [codepick.dev](${SITE_URL})`);

  return lines.join('\n');
}

// ── 工具数量（用于引流文案） ─────────────────────────────

function getToolCount() {
  const dir = path.resolve('data/tools');
  if (!fs.existsSync(dir)) return '30';
  return String(fs.readdirSync(dir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml')).length);
}

// ── 输出目录 ─────────────────────────────────────────────

function ensureOutputDir() {
  const dir = path.resolve('dist/juejin');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ── 主流程 ───────────────────────────────────────────────

const args = process.argv.slice(2);
const listMode = args.includes('--list');
const allMode = args.includes('--all');
const slugArgs = args.filter(a => !a.startsWith('--'));

const articles = scanArticles();

if (articles.length === 0) {
  console.log('未找到任何文章。');
  process.exit(0);
}

// --list 或无参数：列出文章清单
if (listMode || (slugArgs.length === 0 && !allMode)) {
  console.log('可用文章：\n');
  for (const a of articles) {
    const typeLabel = a.type === 'compare' ? '对比' : '指南';
    console.log(`  ${a.slug}`);
    console.log(`    [${typeLabel}] ${a.title}  (${a.date})`);
  }
  console.log(`\n共 ${articles.length} 篇。用法：`);
  console.log('  node scripts/gen-juejin-post.mjs <slug>     生成单篇');
  console.log('  node scripts/gen-juejin-post.mjs --all       批量生成全部');
  process.exit(0);
}

// 确定要生成的文章
const targets = allMode
  ? articles
  : articles.filter(a => slugArgs.includes(a.slug));

if (targets.length === 0) {
  console.error(`未找到匹配的文章：${slugArgs.join(', ')}`);
  console.error('运行 node scripts/gen-juejin-post.mjs --list 查看可用文章');
  process.exit(1);
}

const outDir = ensureOutputDir();

for (const article of targets) {
  const content = generateJuejinPost(article);
  const outFile = path.join(outDir, `${article.slug}.md`);
  fs.writeFileSync(outFile, content, 'utf-8');

  const juejinTags = suggestJuejinTags(article.tags);
  console.log(`✓ ${article.slug}`);
  console.log(`  标题：${article.title}`);
  console.log(`  标签：${juejinTags.join('、')}`);
  console.log(`  输出：${path.relative(process.cwd(), outFile)}`);
  console.log('');
}

console.log(`共生成 ${targets.length} 篇，输出目录：dist/juejin/`);
console.log('');
console.log('发布步骤：');
console.log('  1. 打开掘金编辑器 https://juejin.cn/editor/drafts/new');
console.log('  2. 复制生成的 .md 文件内容粘贴到编辑器');
console.log('  3. 按文件顶部注释设置标题、标签、分类');
console.log('  4. 上传封面图（可用 npm run gen-og 生成）');
console.log('  5. 发布前预览检查链接和格式');
