import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const DATA_DIR = path.resolve('data');

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  type: string;
  url: string;
  logo: string;
  pricing: {
    model: string;
    currency: string;
    plans: { name: string; price: number | string; limits?: string }[];
  };
  scores: {
    coding_ability: number;
    cost_efficiency: number;
    flexibility: number;
    china_friendly: number;
  };
  features: string[];
  compatible_apis?: string[];
  supported_ides?: string[];
  pros: string[];
  cons: string[];
  best_for: string[];
  changelog: { date: string; version?: string; summary: string }[];
  meta: {
    last_verified: string;
    next_review_due: string;
    confidence: string;
    monitor: Record<string, string>;
  };
}

export interface Api {
  id: string;
  name: string;
  provider: string;
  tagline: string;
  url: string;
  logo: string;
  pricing: {
    model: string;
    currency: string;
    plans?: { name: string; price: number | string; limits?: string }[];
    note?: string;
  };
  models: { name: string; context?: string; speed?: string; note?: string }[];
  compatible_clients: string[];
  protocol: string[];
  scores: {
    model_quality: number;
    cost_efficiency: number;
    china_friendly: number;
    privacy?: number;
  };
  pros: string[];
  cons: string[];
  meta: {
    last_verified: string;
    next_review_due: string;
    confidence: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  client: string;
  api: string;
  environment: string;
  monthly_cost: string;
  currency: string;
  scores: {
    coding_ability: number;
    cost_efficiency: number;
    flexibility: number;
    china_friendly: number;
  };
  setup_difficulty: string;
  tags: string[];
  best_for: string[];
  quick_start: string[];
  pros: string[];
  cons: string[];
}

/** 归一化原始 YAML 为标准 Plan 结构 */
function normalizePlan(raw: any): Plan {
  // 处理 composition 嵌套结构
  const client = raw.client || raw.composition?.client || '';
  const api = raw.api || raw.composition?.api || '';
  const environment = raw.environment || raw.composition?.environment || '';

  // 处理 monthly_cost: 可能是字符串或 {min, typical, max} 对象
  let monthlyCost = '';
  if (typeof raw.monthly_cost === 'string') {
    monthlyCost = raw.monthly_cost;
  } else if (raw.monthly_cost && typeof raw.monthly_cost === 'object') {
    monthlyCost = raw.monthly_cost.typical || `${raw.monthly_cost.min || '?'}-${raw.monthly_cost.max || '?'}`;
  }

  // 推断 currency
  let currency = raw.currency || '';
  if (!currency) {
    if (monthlyCost.includes('¥')) currency = 'CNY';
    else if (monthlyCost.includes('$')) currency = 'USD';
    else currency = 'CNY';
  }

  return {
    id: raw.id || '',
    name: raw.name || raw.id || '',
    badge: raw.badge || '',
    tagline: raw.tagline || raw.description || '',
    client,
    api,
    environment,
    monthly_cost: monthlyCost,
    currency,
    scores: {
      coding_ability: raw.scores?.coding_ability ?? 5,
      cost_efficiency: raw.scores?.cost_efficiency ?? 5,
      flexibility: raw.scores?.flexibility ?? 5,
      china_friendly: raw.scores?.china_friendly ?? 5,
    },
    setup_difficulty: raw.setup_difficulty || '中等',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    best_for: Array.isArray(raw.best_for) ? raw.best_for : [],
    quick_start: Array.isArray(raw.quick_start) ? raw.quick_start : [],
    pros: Array.isArray(raw.pros) ? raw.pros : [],
    cons: Array.isArray(raw.cons) ? raw.cons : [],
  };
}

function loadYamlDir<T extends { id: string }>(subdir: string, normalize?: (raw: any) => T): T[] {
  const dir = path.join(DATA_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const data = yaml.load(raw) as any;
      if (!data.id) data.id = f.replace(/\.ya?ml$/, '');
      return normalize ? normalize(data) : data as T;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getAllTools(): Tool[] {
  return loadYamlDir<Tool>('tools');
}

export function getTool(id: string): Tool | undefined {
  return getAllTools().find(t => t.id === id);
}

export function getAllApis(): Api[] {
  return loadYamlDir<Api>('apis');
}

export function getApi(id: string): Api | undefined {
  return getAllApis().find(a => a.id === id);
}

export function getAllPlans(): Plan[] {
  return loadYamlDir<Plan>('plans', normalizePlan);
}

export function getPlan(id: string): Plan | undefined {
  return getAllPlans().find(p => p.id === id);
}

// 按类型筛选方案
export function getPlansByTag(tag: string): Plan[] {
  return getAllPlans().filter(p => p.tags.includes(tag));
}

// 获取方案的完整信息（含工具和API详情）
export function getPlanWithDetails(id: string) {
  const plan = getPlan(id);
  if (!plan) return undefined;
  return {
    ...plan,
    clientDetail: getTool(plan.client),
    apiDetail: getApi(plan.api),
  };
}

// 计算综合分
export function overallScore(scores: Plan['scores'] | Tool['scores']): number {
  const vals = Object.values(scores).filter(v => typeof v === 'number');
  if (vals.length === 0) return 0;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

// 数据新鲜度检查
export function isFresh(dateStr: string): boolean {
  if (!dateStr) return false;
  const due = new Date(dateStr);
  return due > new Date();
}
