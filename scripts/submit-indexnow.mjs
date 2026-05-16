#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'codepick.dev';
const KEY = '96ee7b932e673d479091322950d2ec6a9defd84b77d05f1bf67f60a4d95ab157';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 1000;

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

async function readUrlsFromDist() {
  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found. Run `npm run build` first.');
  }
  const files = fs.readdirSync(distDir).filter(f => f.startsWith('sitemap-') && f.endsWith('.xml'));
  if (files.length === 0) throw new Error('No sitemap files found in dist/.');

  const allUrls = new Set();
  for (const f of files) {
    const xml = fs.readFileSync(path.join(distDir, f), 'utf-8');
    if (f === 'sitemap-index.xml') continue;
    for (const u of extractUrlsFromSitemap(xml)) allUrls.add(u);
  }
  return [...allUrls];
}

async function submitBatch(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

async function main() {
  const urls = await readUrlsFromDist();
  if (urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }
  console.log(`Submitting ${urls.length} URLs to IndexNow (host=${HOST})...`);

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    try {
      const { status, body } = await submitBatch(batch);
      // IndexNow returns: 200 OK, 202 Accepted (queued), 400 Bad Request, 403 Key invalid, 422 URLs invalid, 429 Too Many
      if (status === 200 || status === 202) {
        ok += batch.length;
        console.log(`  batch ${i / BATCH_SIZE + 1}: HTTP ${status} (${batch.length} urls)`);
      } else {
        fail += batch.length;
        console.error(`  batch ${i / BATCH_SIZE + 1}: HTTP ${status} ${body}`);
      }
    } catch (err) {
      fail += batch.length;
      console.error(`  batch ${i / BATCH_SIZE + 1}: error`, err.message);
    }
  }

  console.log(`Done. Submitted: ${ok}, Failed: ${fail}`);
  if (fail > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
