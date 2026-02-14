#!/usr/bin/env node
/**
 * CodePick 数据新鲜度检查脚本
 * 用法: node scripts/check-freshness.mjs
 * 
 * 检查所有 YAML 数据文件的 last_updated 字段，
 * 标记超过 30 天未更新的文件。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data');

const STALE_DAYS = 30;  // 超过多少天算过时
const WARNING_DAYS = 14; // 超过多少天发出警告

function checkDir(subdir) {
  const dir = path.join(dataDir, subdir);
  if (!fs.existsSync(dir)) return [];
  
  const results = [];
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 提取 last_updated 或 last_verified 字段
    const match = content.match(/(?:last_updated|last_verified|updated_at):\s*['"]?(\d{4}-\d{2}(?:-\d{2})?)/);
    const dateStr = match ? match[1] : null;
    
    let daysSince = null;
    let status = '❓ 无日期';
    
    if (dateStr) {
      const d = new Date(dateStr.length === 7 ? dateStr + '-01' : dateStr);
      daysSince = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSince > STALE_DAYS) {
        status = `🔴 过时 (${daysSince}天)`;
      } else if (daysSince > WARNING_DAYS) {
        status = `🟡 即将过时 (${daysSince}天)`;
      } else {
        status = `🟢 新鲜 (${daysSince}天)`;
      }
    }
    
    results.push({
      file: `${subdir}/${file}`,
      date: dateStr || 'N/A',
      daysSince,
      status
    });
  }
  return results;
}

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║       CodePick 数据新鲜度检查                          ║');
console.log('║       Stale > 30d | Warning > 14d                     ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const allResults = [
  ...checkDir('tools'),
  ...checkDir('apis'),
  ...checkDir('plans'),
];

// 按状态排序: 过时 > 无日期 > 即将过时 > 新鲜
allResults.sort((a, b) => {
  const order = s => s.startsWith('🔴') ? 0 : s.startsWith('❓') ? 1 : s.startsWith('🟡') ? 2 : 3;
  return order(a.status) - order(b.status);
});

console.log('文件'.padEnd(35) + '日期'.padEnd(15) + '状态');
console.log('─'.repeat(70));
for (const r of allResults) {
  console.log(r.file.padEnd(35) + r.date.padEnd(15) + r.status);
}

const stale = allResults.filter(r => r.status.startsWith('🔴'));
const noDate = allResults.filter(r => r.status.startsWith('❓'));

console.log(`\n总计: ${allResults.length} 个文件`);
console.log(`  🔴 过时: ${stale.length}`);
console.log(`  🟡 即将过时: ${allResults.filter(r => r.status.startsWith('🟡')).length}`);
console.log(`  🟢 新鲜: ${allResults.filter(r => r.status.startsWith('🟢')).length}`);
console.log(`  ❓ 无日期: ${noDate.length}`);

if (stale.length + noDate.length > 0) {
  console.log('\n⚠️  有数据需要更新！请检查以上标记为 🔴 或 ❓ 的文件。');
  process.exit(1);
}

console.log('\n✅ 所有数据均为最新。');
