import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { formatJsonReport, runContentCheck } from './check-content.mjs';

function writeFile(root, file, content) {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trimStart(), 'utf8');
}

function markdown(frontmatter, body = '# Body') {
  return `---\n${frontmatter.trim()}\n---\n\n${body}\n`;
}

function yaml(content) {
  return `${content.trim()}\n`;
}

async function withFixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'codepick-content-check-'));
  try {
    return await callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

await withFixture(async (root) => {
  writeFile(root, 'src/content/compare/foo.md', markdown(`
title: Foo
description: Foo zh
date: "2026-06-01"
tags: [foo]
pillar: compare
content_status: keep
locale_strategy: mirrored
`));
  writeFile(root, 'src/content/compare-en/foo.md', markdown(`
title: Foo
description: Foo en
date: "2026-06-01"
tags: [foo]
pillar: compare
content_status: keep
locale_strategy: mirrored
`));
  writeFile(root, 'src/content/guides/mobile.md', markdown(`
title: Mobile
description: Mobile guide
date: "2026-06-01"
article_type: explainer
tags: [mobile-coding]
`));
  writeFile(root, 'src/content/practices/sms.md', markdown(`
title: SMS
description: SMS practice
date: "2026-06-01"
tags: [supabase]
`));
  writeFile(root, 'data/tools/fresh.yaml', yaml(`
id: fresh
name: Fresh
next_review_due: "2026-07-01"
`));
  writeFile(root, 'data/plans/builtin.yaml', yaml(`
id: builtin
name: Builtin
client: fresh
api: claude-builtin
`));

  const report = await runContentCheck({ root, strict: true, now: new Date('2026-06-06T00:00:00Z') });
  assert.equal(report.errors.length, 0);
  assert.equal(report.warnings.length, 2);
  assert(report.warnings.some((item) => item.message.includes('missing pillar')));
  assert.equal(report.summary.content.compare.zh, 1);
  assert.equal(report.summary.content.compare.en, 1);
  assert.equal(report.summary.data.tools, 1);
});

await withFixture(async (root) => {
  writeFile(root, 'src/content/compare/foo.md', markdown(`
title: Foo
description: Foo zh
date: "2026-06-01"
tags: [foo]
pillar: compare
content_status: keep
locale_strategy: mirrored
`));
  writeFile(root, 'data/apis/stale.yaml', yaml(`
id: stale
name: Stale
next_review_due: "2026-06-01"
`));

  const report = await runContentCheck({ root, strict: true, now: new Date('2026-06-06T00:00:00Z') });
  assert(report.errors.some((item) => item.file === 'src/content/compare/foo.md' && item.message.includes('missing English mirror')));
  assert(report.errors.some((item) => item.file === 'data/apis/stale.yaml' && item.message.includes('next_review_due expired')));

  const json = JSON.parse(formatJsonReport(report));
  assert.equal(json.errors.length, 2);
  assert.equal(json.ok, false);
});

console.log('check-content tests passed.');
