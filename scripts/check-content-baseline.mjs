#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { runContentCheck } from './check-content.mjs';

const root = process.cwd();
const baselinePath = path.join(root, '.github', 'content-check-baseline.json');
const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

if (!Array.isArray(baseline) || baseline.some((entry) => typeof entry !== 'string')) {
  throw new Error(`${path.relative(root, baselinePath)} must be an array of error fingerprint strings`);
}

if (new Set(baseline).size !== baseline.length) {
  throw new Error(`${path.relative(root, baselinePath)} contains duplicate fingerprints`);
}

const report = await runContentCheck({ root, strict: true });
const current = report.errors.map(({ file, message }) => `${file}: ${message}`);
const baselineSet = new Set(baseline);
const currentSet = new Set(current);
const unexpected = current.filter((fingerprint) => !baselineSet.has(fingerprint));
const resolved = baseline.filter((fingerprint) => !currentSet.has(fingerprint));

const summary = [
  'Strict content baseline',
  `- current errors: ${current.length}`,
  `- approved baseline: ${baseline.length}`,
  `- unexpected errors: ${unexpected.length}`,
  `- resolved but still baselined: ${resolved.length}`,
];

console.log(summary.join('\n'));

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### Strict content baseline\n\n${summary.slice(1).join('\n')}\n`,
  );
}

if (unexpected.length > 0) {
  console.error('\nUnexpected strict content errors:\n' + unexpected.map((item) => `- ${item}`).join('\n'));
}

if (resolved.length > 0) {
  console.error('\nResolved errors still present in the baseline; remove them:\n' + resolved.map((item) => `- ${item}`).join('\n'));
}

if (unexpected.length > 0 || resolved.length > 0) {
  process.exit(1);
}

console.log(`Known baseline accepted: ${current.length} explicit errors and no regressions.`);
