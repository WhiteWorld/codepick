// 指南内容支柱（content pillars）派生规则。
//
// CodePick 的内容定位已收敛为「AI 开发者工具与工作流选型站」。
// 因此 /guides 优先读取 frontmatter.pillar，把扁平时间流组织成
// tools / plans / workflow / stack / market 几个稳定入口。
// 旧文章或临时内容若缺少 pillar，再用标签与 slug 做兼容兜底。
//
// 显示标签走 i18n 的 `cluster.<id>` key，本文件只负责归类，不含文案。

// 与 getCollection('guides') 返回项结构对齐的最小子集，避免引入 astro:content 类型依赖。
export interface GuideLike {
  slug: string;
  data: {
    date: string;
    tags?: string[];
    article_type?: string;
    draft?: boolean;
    pillar?: ContentPillar;
  };
}

export type ContentPillar = 'tools' | 'plans' | 'compare' | 'workflow' | 'stack' | 'market';
export type ClusterId = Exclude<ContentPillar, 'compare'> | 'other';

interface ClusterRule {
  id: ClusterId;
  match: (g: GuideLike) => boolean;
}

// 大小写不敏感的标签命中（标签可能是中文或英文）。
const hasTag = (g: GuideLike, ...needles: string[]) => {
  const tags = (g.data.tags ?? []).map(t => t.toLowerCase());
  return needles.some(n => tags.includes(n.toLowerCase()));
};

const slugHas = (g: GuideLike, ...needles: string[]) =>
  needles.some(n => g.slug.includes(n));

// 顺序即优先级：首个命中的规则决定归属（与展示顺序 CLUSTER_ORDER 无关）。
// Agent 协作类规则放在通用 setup 之前，避免 slock-setup 之类文章被归到工具上手。
export const GUIDE_CLUSTERS: ClusterRule[] = [
  {
    id: 'plans',
    match: g =>
      hasTag(g, 'coding-plan', 'token-plan', 'agent-plan', '省钱', '预算') ||
      slugHas(g, 'coding-plan', 'token-saving', 'cost-saving', 'budget', 'api-platforms', 'api-roundup'),
  },
  {
    id: 'plans',
    match: g =>
      hasTag(g, '计费', '定价', 'ai-credits', 'rate-limit', '限速', 'billing', 'pricing') ||
      (hasTag(g, '国内', 'china') && !g.slug.endsWith('-setup')),
  },
  {
    id: 'workflow',
    match: g =>
      hasTag(g, 'agent-collaboration', 'agent-runtime', 'agent-infrastructure', 'durable-execution') ||
      slugHas(g, 'conductor'),
  },
  {
    id: 'tools',
    match: g =>
      g.slug.endsWith('-setup') ||
      g.data.article_type === 'howto' ||
      hasTag(g, '配置', '插件', 'self-hosted', '本地部署', 'local', 'extension', 'extensions', 'plugin'),
  },
  {
    id: 'workflow',
    match: g =>
      hasTag(g, '更新', 'mcp', 'skills', '语音输入', 'voice', 'update') ||
      slugHas(g, 'new-features', 'composer'),
  },
];

// 索引页 / 首页 chip 的展示顺序（不含 other，other 仅作兜底）。
export const CLUSTER_ORDER: ClusterId[] = [
  'plans',
  'workflow',
  'tools',
  'stack',
  'market',
];

function clusterOf(g: GuideLike): ClusterId {
  if (g.data.pillar && g.data.pillar !== 'compare') {
    return g.data.pillar;
  }

  for (const rule of GUIDE_CLUSTERS) {
    if (rule.match(g)) return rule.id;
  }
  return 'other';
}

export interface ClusteredGuides<T extends GuideLike> {
  id: ClusterId;
  guides: T[];
}

/**
 * 把指南列表按簇分组。返回按 CLUSTER_ORDER 排序的非空簇，每簇内按 date 倒序。
 * 若有文章落入 other（理论上不应发生），在构建日志里 warn 以便补规则。
 */
export function clusterGuides<T extends GuideLike>(guides: T[]): ClusteredGuides<T>[] {
  const buckets = new Map<ClusterId, T[]>();
  for (const g of guides) {
    const id = clusterOf(g);
    if (!buckets.has(id)) buckets.set(id, []);
    buckets.get(id)!.push(g);
  }

  const other = buckets.get('other');
  if (other && other.length) {
    console.warn(
      `[guide-clusters] ${other.length} 篇指南落入 "other"，请补充规则：` +
        other.map(g => g.slug).join(', '),
    );
  }

  const order: ClusterId[] = [...CLUSTER_ORDER, 'other'];
  return order
    .map(id => ({
      id,
      guides: (buckets.get(id) ?? []).sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
      ),
    }))
    .filter(c => c.guides.length > 0);
}
