// 指南需求簇（demand clusters）派生规则。
//
// 流量数据显示 /guides 的访问几乎全部集中在「省钱 / 国产 coding plan、
// 海外工具国内访问、计费解读」等高意图主题上。这里按有序规则把每篇指南
// 归到首个命中的簇，用于把扁平的时间流索引重构成主题集群（利于 SEO 内链
// 与用户浏览）。归类只依赖现有 frontmatter（tags / article_type）与 slug，
// 不需要改动任何内容文件。
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
  };
}

export type ClusterId =
  | 'coding-plan'
  | 'china-billing'
  | 'setup'
  | 'updates'
  | 'agent-collab'
  | 'other';

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
// agent-collab 放在 setup 之前——agent 平台的 setup 指南（slug 以 -setup 结尾）
// 带 agent-collaboration 标签，应归 Agent 协作而非通用接入教程。
export const GUIDE_CLUSTERS: ClusterRule[] = [
  {
    id: 'coding-plan',
    match: g =>
      hasTag(g, 'coding-plan', 'token-plan', 'agent-plan', '省钱', '预算') ||
      slugHas(g, 'coding-plan', 'token-saving', 'cost-saving', 'budget', 'api-platforms', 'api-roundup'),
  },
  {
    id: 'china-billing',
    match: g =>
      hasTag(g, '计费', '定价', 'ai-credits', 'rate-limit', '限速', 'billing', 'pricing') ||
      (hasTag(g, '国内', 'china') && !g.slug.endsWith('-setup')),
  },
  {
    id: 'agent-collab',
    match: g => hasTag(g, 'agent-collaboration') || slugHas(g, 'conductor'),
  },
  {
    id: 'setup',
    match: g =>
      g.slug.endsWith('-setup') ||
      g.data.article_type === 'howto' ||
      hasTag(g, '配置', '插件', 'self-hosted', '本地部署', 'local', 'extension', 'extensions', 'plugin'),
  },
  {
    id: 'updates',
    match: g =>
      hasTag(g, '更新', 'mcp', 'skills', '语音输入', 'voice', 'update') ||
      slugHas(g, 'new-features', 'composer'),
  },
];

// 索引页 / 首页 chip 的展示顺序（不含 other，other 仅作兜底）。
export const CLUSTER_ORDER: ClusterId[] = [
  'coding-plan',
  'china-billing',
  'setup',
  'updates',
  'agent-collab',
];

function clusterOf(g: GuideLike): ClusterId {
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
