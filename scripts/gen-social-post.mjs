import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
const sinceArg = args.find(a => a.startsWith('--since='));
const allMode = args.includes('--all');
const daysArg = args.find(a => a.startsWith('--days='));

const now = new Date();
const days = daysArg ? Number(daysArg.split('=')[1]) : 30;
const sinceDate = sinceArg ? new Date(sinceArg.split('=')[1]) : new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

function loadYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf-8'));
}

function monthKey(dateStr) {
  return String(dateStr).slice(0, 7);
}

function loadToolEntries(subdir, kind) {
  const dir = path.resolve(`data/${subdir}`);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
    .flatMap(f => {
      const raw = loadYaml(path.join(dir, f)) || {};
      const entries = raw.changelog || [];
      return entries.map(e => ({
        date: String(e.date),
        type: e.type || 'update',
        summary: e.summary || '',
        sourceName: raw.name || f.replace(/\.ya?ml$/, ''),
        sourceId: raw.id || f.replace(/\.ya?ml$/, ''),
        sourceKind: kind,
      }));
    });
}

function filterByDate(entries) {
  if (allMode) return entries;
  return entries.filter(e => {
    const d = new Date(String(e.date));
    return !Number.isNaN(d.getTime()) && d >= sinceDate;
  });
}

const siteLog = loadYaml(path.resolve('data/site-changelog.yaml')) || { entries: [] };
const siteEntries = filterByDate(siteLog.entries || []).sort((a, b) => b.date.localeCompare(a.date));
const toolEntries = filterByDate([
  ...loadToolEntries('tools', 'tool'),
  ...loadToolEntries('apis', 'api'),
]).sort((a, b) => b.date.localeCompare(a.date));

const allMonths = [...new Set([
  ...siteEntries.map(e => monthKey(e.date)),
  ...toolEntries.map(e => monthKey(e.date)),
])].sort((a, b) => b.localeCompare(a));

const dateRangeLabel = allMode
  ? '全量'
  : `${sinceDate.toISOString().slice(0, 10)} ~ ${now.toISOString().slice(0, 10)}`;

function renderSiteSection() {
  if (siteEntries.length === 0) return '无站点级更新。';
  return siteEntries.map(entry => {
    const items = (entry.items || []).map(i => `- ${i}`).join('\n');
    return `**${entry.date} · ${entry.title}**\n${items}`;
  }).join('\n\n');
}

function renderToolSection(limit = 30) {
  if (toolEntries.length === 0) return '无工具动态。';
  const list = toolEntries.slice(0, limit).map(e => {
    return `- ${e.date} ${e.sourceName}：${e.summary}`;
  }).join('\n');
  return list;
}

function renderMonthlyHighlights(limitPerMonth = 8) {
  if (allMonths.length === 0) return '无更新记录。';
  return allMonths.map(month => {
    const site = siteEntries.filter(e => monthKey(e.date) === month);
    const tools = toolEntries.filter(e => monthKey(e.date) === month).slice(0, limitPerMonth);
    const siteText = site.length
      ? site.map(e => `- ${e.date} ${e.title}`).join('\n')
      : '- 无';
    const toolText = tools.length
      ? tools.map(e => `- ${e.date} ${e.sourceName}：${e.summary}`).join('\n')
      : '- 无';
    return `### ${month}\n站点更新：\n${siteText}\n工具动态：\n${toolText}`;
  }).join('\n\n');
}

const zhihu = `# CodePick 更新日志（${dateRangeLabel}）\n\n## 站点更新\n${renderSiteSection()}\n\n## 工具动态\n${renderToolSection()}\n\n## 按月摘要\n${renderMonthlyHighlights()}\n\n---\n如果你发现信息有误或希望新增工具，欢迎反馈。`;

const v2ex = `# CodePick 更新日志（${dateRangeLabel}）\n\n## 站点更新\n${renderSiteSection()}\n\n## 工具动态\n${renderToolSection(20)}\n\n更多内容：https://codepick.dev/changelog`;

const juejin = `# CodePick 更新日志（${dateRangeLabel}）\n\n## 站点更新\n${renderSiteSection()}\n\n## 工具动态\n${renderToolSection()}\n\n## 按月摘要\n${renderMonthlyHighlights()}\n\n> 反馈与建议欢迎提 Issue： https://github.com/WhiteWorld/codepick/issues/new`;

const output = [
  '--- Zhihu ---',
  zhihu,
  '',
  '--- V2EX ---',
  v2ex,
  '',
  '--- Juejin ---',
  juejin,
].join('\n');

process.stdout.write(output);
