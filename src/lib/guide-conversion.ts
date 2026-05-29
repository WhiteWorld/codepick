// 指南页「流量转化」匹配：把指南的 SEO 流量导向可变现的方案（工具 + API 组合）。
//
// 匹配以「强信号」为主——方案的 client（工具 id）与 api 词干是否出现在指南的
// tags / slug 里——而非方案的通用标签（budget/ide 等过宽）。只有强信号命中
// （score >= 2）才会展示，避免在高流量页面推出不相关方案而损害信任与转化。

import type { Plan } from './data';

// API id 通常形如 ark-coding-plan / bailian-coding-plan / minimax-token-plan，
// 去掉套餐后缀得到词干（ark / bailian / minimax），便于与指南 slug/tags 匹配。
const API_SUFFIXES = ['-coding-plan', '-agent-plan', '-token-plan', '-api'];

// 套餐类型：用于把指南意图（coding plan / agent plan / token plan 指南）
// 与同类型的方案对齐，打破强信号同分时的并列（避免按加载顺序随机取舍）。
const PLAN_TYPES = ['coding-plan', 'agent-plan', 'token-plan'];

function apiStem(apiId: string): string {
  for (const s of API_SUFFIXES) {
    if (apiId.endsWith(s)) return apiId.slice(0, -s.length);
  }
  return apiId;
}

interface ScoredPlan {
  plan: Plan;
  score: number;
}

/**
 * 为一篇指南挑选相关方案。
 * @param guideTags  指南 frontmatter tags
 * @param guideSlug  指南 slug
 * @param plans      已本地化的方案列表（getAllPlansLocalized 的返回）
 * @param limit      最多返回几个（默认 2，转化场景宜少而精）
 */
export function relatedPlansForGuide(
  guideTags: string[],
  guideSlug: string,
  plans: Plan[],
  limit = 2,
): Plan[] {
  const tags = (guideTags || []).map(t => t.toLowerCase());
  const slug = guideSlug.toLowerCase();

  // 指南本身的套餐类型意图（如 coding-plan 指南），用于对齐同类型方案。
  const guideType = PLAN_TYPES.find(pt => slug.includes(pt) || tags.some(t => t.includes(pt)));

  const scored: ScoredPlan[] = plans.map(plan => {
    let score = 0;
    const client = (plan.client || '').toLowerCase();
    const api = (plan.api || '').toLowerCase();

    // 客户端工具命中：标签精确等于 client、标签包含 client（如 github-copilot ⊇ copilot）、
    // 或 client 包含某个较长标签（如 claude-code ⊇ claude），均算命中。
    if (client && tags.some(t => t === client || t.includes(client) || (client.includes(t) && t.length >= 4))) {
      score += 2;
    }

    // API 精确出现在标签里。
    if (api && tags.includes(api)) score += 3;

    // API 词干出现在 slug 或标签里（如 ark / bailian）。
    const stem = apiStem(api);
    if (stem && stem.length >= 3 && (slug.includes(stem) || tags.some(t => t.includes(stem)))) {
      score += 3;
    }

    // 套餐类型对齐：coding-plan 指南优先 -coding-plan 组合，而非 -agent-plan，打破并列。
    if (guideType && api.includes(guideType)) score += 1;

    // 通用标签轻量加权（避免过度影响排序）。
    score += (plan.tags || []).filter(t => tags.includes(t.toLowerCase())).length;

    return { plan, score };
  });

  return scored
    .filter(x => x.score >= 2) // 至少命中一个 client/api 强信号
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.plan);
}
