#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const CONTENT_COLLECTIONS = [
  { key: 'compare', zhDir: 'src/content/compare', enDir: 'src/content/compare-en', strictMetadata: true },
  { key: 'guides', zhDir: 'src/content/guides', enDir: 'src/content/guides-en', strictMetadata: false },
  { key: 'practices', zhDir: 'src/content/practices', enDir: 'src/content/practices-en', strictMetadata: false },
];

const DATA_DIRS = [
  { key: 'tools', dir: 'data/tools' },
  { key: 'apis', dir: 'data/apis' },
  { key: 'plans', dir: 'data/plans' },
];

const PILLARS = new Set(['tools', 'plans', 'compare', 'workflow', 'stack', 'market']);
const CONTENT_STATUSES = new Set(['keep', 'rewrite', 'merge', 'archive']);
const LOCALE_STRATEGIES = new Set(['mirrored', 'zh_only', 'en_only', 'planned_en', 'planned_zh']);
const REQUIRED_META = ['pillar', 'content_status', 'locale_strategy'];

function rel(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function listFiles(root, dir, ext) {
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith(ext))
    .sort()
    .map((file) => path.join(fullDir, file));
}

function parseMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error('missing frontmatter block');
  }
  return yaml.load(match[1]) ?? {};
}

function parseYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8')) ?? {};
}

function add(report, level, file, message, suggestion) {
  report[`${level}s`].push({
    level,
    file,
    message,
    ...(suggestion ? { suggestion } : {}),
  });
}

function inferPillar(collectionKey, entry) {
  const tags = (entry.data.tags ?? []).map((tag) => String(tag).toLowerCase());
  const slug = entry.slug.toLowerCase();

  if (collectionKey === 'compare') return 'compare';
  if (collectionKey === 'practices') return 'stack';
  if (
    tags.some((tag) => ['agent-collaboration', 'mobile-coding', 'voice', 'code-review', 'ai-credits'].includes(tag)) ||
    ['mobile', 'voice', 'codereview', 'code-review', 'agent-collaboration'].some((needle) => slug.includes(needle))
  ) {
    return 'workflow';
  }
  if (
    tags.some((tag) => ['coding-plan', 'token-plan', 'agent-plan', 'billing', 'pricing'].includes(tag)) ||
    ['coding-plan', 'token-plan', 'budget', 'cost'].some((needle) => slug.includes(needle))
  ) {
    return 'plans';
  }
  return 'market';
}

function readContentEntries(root, collection) {
  const readSide = (dir, lang) =>
    listFiles(root, dir, '.md').map((filePath) => {
      const slug = path.basename(filePath, '.md');
      return {
        collection: collection.key,
        lang,
        slug,
        file: rel(root, filePath),
        data: parseMarkdown(filePath),
      };
    });

  return {
    zh: readSide(collection.zhDir, 'zh'),
    en: readSide(collection.enDir, 'en'),
  };
}

function checkMetadata(report, entry, options) {
  const missing = REQUIRED_META.filter((field) => entry.data[field] === undefined);
  if (missing.length > 0) {
    const level = options.strict && entry.collection === 'compare' ? 'error' : 'warning';
    add(
      report,
      level,
      entry.file,
      `missing ${missing.join(', ')}`,
      `suggested pillar: ${inferPillar(entry.collection, entry)}`,
    );
    return;
  }

  if (!PILLARS.has(entry.data.pillar)) {
    add(report, 'error', entry.file, `invalid pillar: ${entry.data.pillar}`);
  }
  if (!CONTENT_STATUSES.has(entry.data.content_status)) {
    add(report, 'error', entry.file, `invalid content_status: ${entry.data.content_status}`);
  }
  if (!LOCALE_STRATEGIES.has(entry.data.locale_strategy)) {
    add(report, 'error', entry.file, `invalid locale_strategy: ${entry.data.locale_strategy}`);
  }
}

function checkMirrorPair(report, collection, zhEntry, enEntry) {
  if (collection.key === 'compare') {
    if (zhEntry && !enEntry) add(report, 'error', zhEntry.file, 'missing English mirror');
    if (enEntry && !zhEntry) add(report, 'error', enEntry.file, 'missing Chinese mirror');
    return;
  }

  const entry = zhEntry ?? enEntry;
  if (!entry) return;

  const strategy = entry.data.locale_strategy;
  if (strategy === 'mirrored') {
    if (zhEntry && !enEntry) add(report, 'error', zhEntry.file, 'missing English mirror');
    if (enEntry && !zhEntry) add(report, 'error', enEntry.file, 'missing Chinese mirror');
  } else if (strategy === 'planned_en' && zhEntry && !enEntry) {
    add(report, 'warning', zhEntry.file, 'planned English mirror is missing');
  } else if (strategy === 'planned_zh' && enEntry && !zhEntry) {
    add(report, 'warning', enEntry.file, 'planned Chinese mirror is missing');
  }
}

function checkNumberPromises(report, entry, summary) {
  const text = `${entry.data.title ?? ''} ${entry.data.description ?? ''}`;
  const match = text.match(/(?:^|\D)(\d{2,})\s*(?:款|个)?\s*(?:AI\s*)?(?:编程)?工具|(\d{2,})\s*Tools/i);
  const promised = match ? Number(match[1] ?? match[2]) : null;
  if (promised && summary.data.tools > promised) {
    add(
      report,
      'warning',
      entry.file,
      `title/description promises ${promised} tools, but data/tools has ${summary.data.tools}`,
    );
  }
}

function toSlugMap(entries) {
  return new Map(entries.map((entry) => [entry.slug, entry]));
}

function checkContent(root, report, options) {
  const allEntries = [];

  for (const collection of CONTENT_COLLECTIONS) {
    let entries;
    try {
      entries = readContentEntries(root, collection);
    } catch (error) {
      add(report, 'error', collection.zhDir, error.message);
      continue;
    }

    report.summary.content[collection.key] = {
      zh: entries.zh.length,
      en: entries.en.length,
    };

    allEntries.push(...entries.zh, ...entries.en);

    for (const entry of [...entries.zh, ...entries.en]) {
      try {
        checkMetadata(report, entry, options);
      } catch (error) {
        add(report, 'error', entry.file, error.message);
      }
    }

    const zhBySlug = toSlugMap(entries.zh);
    const enBySlug = toSlugMap(entries.en);
    const slugs = [...new Set([...zhBySlug.keys(), ...enBySlug.keys()])].sort();
    for (const slug of slugs) {
      checkMirrorPair(report, collection, zhBySlug.get(slug), enBySlug.get(slug));
    }
  }

  return allEntries;
}

function isExpired(dateStr, now) {
  if (!dateStr) return false;
  const date = new Date(`${dateStr}T23:59:59Z`);
  return Number.isFinite(date.getTime()) && date < now;
}

function getPlanRef(plan, field) {
  return plan[field] ?? plan.composition?.[field] ?? null;
}

function isBuiltinApiRef(api) {
  return api === null || (typeof api === 'string' && api.endsWith('-builtin'));
}

function checkData(root, report, options) {
  const parsed = {};

  for (const dataDir of DATA_DIRS) {
    parsed[dataDir.key] = [];
    for (const filePath of listFiles(root, dataDir.dir, '.yaml')) {
      const file = rel(root, filePath);
      try {
        const data = parseYaml(filePath);
        parsed[dataDir.key].push({ file, data });
        if (data.next_review_due && isExpired(data.next_review_due, options.now)) {
          add(report, 'error', file, `next_review_due expired at ${data.next_review_due}`);
        }
      } catch (error) {
        add(report, 'error', file, `YAML parse failed: ${error.message}`);
      }
    }
    report.summary.data[dataDir.key] = parsed[dataDir.key].length;
  }

  const toolIds = new Set(parsed.tools.map((item) => item.data.id).filter(Boolean));
  const apiIds = new Set(parsed.apis.map((item) => item.data.id).filter(Boolean));

  for (const item of parsed.plans) {
    const client = getPlanRef(item.data, 'client');
    const api = getPlanRef(item.data, 'api');
    if (client && !toolIds.has(client)) {
      add(report, 'error', item.file, `plan client references unknown tool: ${client}`);
    }
    if (api && !isBuiltinApiRef(api) && !apiIds.has(api)) {
      add(report, 'error', item.file, `plan api references unknown api: ${api}`);
    }
  }
}

export async function runContentCheck({
  root = process.cwd(),
  strict = false,
  now = new Date(),
} = {}) {
  const report = {
    ok: true,
    strict,
    generatedAt: now.toISOString(),
    errors: [],
    warnings: [],
    infos: [],
    summary: {
      content: {},
      data: {
        tools: 0,
        apis: 0,
        plans: 0,
      },
    },
  };

  const entries = checkContent(root, report, { strict, now });
  checkData(root, report, { strict, now });

  for (const entry of entries) {
    checkNumberPromises(report, entry, report.summary);
  }

  add(report, 'info', '.', `tools: ${report.summary.data.tools}`);
  add(report, 'info', '.', `apis: ${report.summary.data.apis}`);
  add(report, 'info', '.', `plans: ${report.summary.data.plans}`);

  report.ok = report.errors.length === 0;
  return report;
}

export function formatJsonReport(report) {
  return `${JSON.stringify(report, null, 2)}\n`;
}

function formatSection(title, items) {
  if (items.length === 0) return `${title}\n- none\n`;
  return `${title}\n${items.map((item) => `- ${item.file}: ${item.message}${item.suggestion ? ` (${item.suggestion})` : ''}`).join('\n')}\n`;
}

export function formatTextReport(report) {
  const lines = [
    'CodePick Content Check',
    '',
    `ERROR  ${report.errors.length}`,
    `WARN   ${report.warnings.length}`,
    `INFO   ${report.infos.length}`,
    '',
    formatSection('Errors', report.errors),
    formatSection('Warnings', report.warnings),
    'Summary',
    `- tools: ${report.summary.data.tools}`,
    `- apis: ${report.summary.data.apis}`,
    `- plans: ${report.summary.data.plans}`,
  ];

  for (const collection of CONTENT_COLLECTIONS) {
    const count = report.summary.content[collection.key] ?? { zh: 0, en: 0 };
    lines.push(`- ${collection.key} zh/en: ${count.zh}/${count.en}`);
  }

  return `${lines.join('\n')}\n`;
}

function parseArgs(argv) {
  return {
    strict: argv.includes('--strict'),
    json: argv.includes('--json'),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = await runContentCheck({ strict: args.strict });
  process.stdout.write(args.json ? formatJsonReport(report) : formatTextReport(report));
  if (report.errors.length > 0) process.exit(1);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
