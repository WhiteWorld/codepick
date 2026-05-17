# Homepage 媒体化改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首页从"工具数据库门面"改成"内容驱动的媒体首页"，首屏直接展示最新内容（6 篇），按头条+5 副条布局。

**Architecture:** 单文件改造 `src/page-views/HomePage.astro` + i18n key 扩展 + .gitignore 已更新。新增 20+ i18n key，删除 ScenarioCard 和 Trust Signals 引用，合并三个内容集合作为统一数据源。无新增依赖。

**Tech Stack:** Astro 5 SSG + TailwindCSS + Content Collections（compare/guides/practices）+ js-yaml。

**Workflow:** 走 PR 流程（用户偏好）。在 feature 分支 `feat/homepage-media-redesign` 上完成所有任务，最后推送、创建 PR、等 Vercel preview 验收。

---

### Task 1: 创建 feature 分支

**Files:** 无文件改动，仅 git 操作

- [ ] **Step 1: 创建并切换到 feature 分支**

```bash
git checkout -b feat/homepage-media-redesign
```

- [ ] **Step 2: 验证分支已切换**

```bash
git branch --show-current
```
Expected output: `feat/homepage-media-redesign`

---

### Task 2: 添加 i18n 翻译 key

**Files:**
- Modify: `src/lib/i18n.ts`（在现有 `home.*` 和 `cat.*` 块之后追加，约 285 行附近）

- [ ] **Step 1: 打开 i18n.ts 找到 `'home.moreGuides'` 这一行**

```bash
grep -n "home.moreGuides" src/lib/i18n.ts
```

记下行号。

- [ ] **Step 2: 在 `'home.moreGuides'` 行之后插入新的 i18n key**

具体插入内容（完整，不要省略，注意行尾逗号）：

```typescript
  'home.heroTitleNew':     { zh: 'AI 编程工具选型指南', en: 'AI Coding Tool Guide' },
  'home.dataBadge':        { zh: '工具', en: 'tools' },
  'home.dataBadgePlans':   { zh: '方案', en: 'plans' },
  'home.dataBadgeLang':    { zh: '双语', en: 'bilingual' },
  'home.latestContent':    { zh: '🔥 最新内容', en: '🔥 Latest Content' },
  'home.allArticles':      { zh: '查看全部内容 →', en: 'All articles →' },
  'home.readTimeSuffix':   { zh: '分钟阅读', en: 'min read' },
  'home.quickPickerTitle': { zh: '⚡ 快速选型', en: '⚡ Quick Picker' },
  'home.quickPickerDesc':  { zh: '回答 3 个问题，推荐最适合你的方案', en: 'Answer 3 questions, get a personalized recommendation' },
  'home.toolCategories':   { zh: '📦 工具分类速查', en: '📦 Browse by Category' },
  'home.editorPicks':      { zh: '🔥 编辑推荐方案', en: "🔥 Editor's Picks" },
  'home.editorPicksDesc':  { zh: '综合评分最高的 3 套方案', en: 'Top 3 plans by overall score' },
  'home.viewAll':          { zh: '查看全部 →', en: 'View all →' },
  'cat.allToolsLabel':     { zh: '全部工具', en: 'All Tools' },
  'cat.freeLabel':         { zh: '免费工具', en: 'Free Tools' },
  'cat.chinaLabel':        { zh: '国内能用', en: 'China Access' },
  'cat.agentLabel':        { zh: 'Agent 平台', en: 'Agent Platforms' },
  'cat.toolsCountSuffix':  { zh: '款', en: 'tools' },
  'home.subscribeTitle':   { zh: '📬 订阅更新', en: '📬 Subscribe to updates' },
  'home.subscribeDesc':    { zh: '新文章会自动推送到你的 RSS 阅读器', en: 'New articles delivered to your RSS reader' },
  'home.subscribeCta':     { zh: '订阅 RSS →', en: 'Subscribe RSS →' },
  'home.openSourceTitle':  { zh: '⭐ 支持开源', en: '⭐ Support open source' },
  'home.openSourceDesc':   { zh: '本站完全开源，欢迎 Star / Issue / PR', en: 'Fully open source. Star, issue, or PR welcome.' },
  'home.openSourceCta':    { zh: 'GitHub Star →', en: 'Star on GitHub →' },
  'home.badge.compare':    { zh: '对比', en: 'Compare' },
  'home.badge.guides':     { zh: '指南', en: 'Guide' },
  'home.badge.practices':  { zh: '实践', en: 'Practice' },
```

- [ ] **Step 3: 验证 i18n 文件无语法错误**

```bash
npx tsc --noEmit src/lib/i18n.ts 2>&1 | head -20
```
Expected: 无错误输出（或仅有未导入相关的、与本次新增 key 无关的报错）。

如果只是因为 `tsc` 单文件解析问题报错（找不到 module），可改用 build 验证：

```bash
npm run build 2>&1 | tail -3
```
Expected: `Complete!` 字样，261 页全过。

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n.ts
git commit -m "feat: 添加首页改版所需的 i18n 翻译 key"
```

---

### Task 3: 重写 HomePage frontmatter（数据获取层）

**Files:**
- Modify: `src/page-views/HomePage.astro:1-66`（整个 frontmatter 部分）

- [ ] **Step 1: 用以下完整内容替换 `HomePage.astro` 的 frontmatter（即 `---` 之间的部分）**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import PlanCard from '../components/PlanCard.astro';
import QuickPicker from '../components/QuickPicker.astro';
import { getAllPlansLocalized, getAllToolsLocalized, overallScore } from '../lib/data';
import { t, localePath, getCollectionName, type Locale } from '../lib/i18n';
import { getCollection } from 'astro:content';

interface Props { lang: Locale }
const { lang } = Astro.props;

const plans = getAllPlansLocalized(lang).sort((a, b) => overallScore(b.scores) - overallScore(a.scores));
const tools = getAllToolsLocalized(lang);

const featuredPlans = plans.slice(0, 3);

// Merge compare + guides + practices, sort by date desc, take 6
const compareCollectionName = getCollectionName('compare', lang) as 'compare' | 'compare-en';
const guidesCollectionName = getCollectionName('guides', lang) as 'guides' | 'guides-en';
const practicesCollectionName = getCollectionName('practices', lang) as 'practices' | 'practices-en';

const [compareItems, guidesItems, practicesItems] = await Promise.all([
  getCollection(compareCollectionName),
  getCollection(guidesCollectionName),
  getCollection(practicesCollectionName).catch(() => [] as any[]),
]);

type ContentType = 'compare' | 'guides' | 'practices';
interface FeedItem {
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  date: string;
  bodyLength: number;
}

function toFeedItem(type: ContentType) {
  return (entry: any): FeedItem => ({
    type,
    slug: entry.slug,
    title: entry.data.title,
    description: entry.data.description || '',
    date: entry.data.date,
    bodyLength: (entry.body || '').length,
  });
}

const allLatest: FeedItem[] = [
  ...compareItems.filter((a: any) => !a.data.draft).map(toFeedItem('compare')),
  ...guidesItems.filter((a: any) => !a.data.draft).map(toFeedItem('guides')),
  ...practicesItems.filter((a: any) => !a.data.draft).map(toFeedItem('practices')),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const featured = allLatest[0];
const secondary = allLatest.slice(1, 6);

function readingMinutes(charCount: number): number {
  return Math.max(2, Math.round(charCount / 600));
}

function feedItemUrl(item: FeedItem): string {
  return localePath(`/${item.type}/${item.slug}`, lang);
}

const typeBadgeClass: Record<ContentType, string> = {
  compare:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  guides:    'bg-blue-500/10 text-blue-400 border-blue-500/30',
  practices: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

const typeBadgeLabel: Record<ContentType, string> = {
  compare:   t('home.badge.compare', lang),
  guides:    t('home.badge.guides', lang),
  practices: t('home.badge.practices', lang),
};

// 4 simplified category cards
const categories = [
  { label: t('cat.allToolsLabel', lang), href: '/tools',  count: tools.length },
  { label: t('cat.freeLabel', lang),     href: '/tools/free',  count: tools.filter((tool: any) => tool.pricing?.plans?.some((p: any) => p.price === 0)).length },
  { label: t('cat.chinaLabel', lang),    href: '/tools/china', count: tools.filter((tool: any) => tool.scores?.china_friendly >= 7).length },
  { label: t('cat.agentLabel', lang),    href: '/agents',      count: tools.filter((tool: any) => tool.type === 'agent_platform').length },
];

const seoTitle = lang === 'zh'
  ? `CodePick - AI 编程工具选型指南 | 找到最适合你的 AI 编程方案`
  : `CodePick - AI Coding Tool Guide | Find Your Perfect AI Coding Solution`;

const siteUrl = 'https://codepick.dev';

// ItemList JSON-LD: featured latest content (helps SERP rich results)
const itemListSchema = allLatest.length > 0 ? {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: lang === 'zh' ? 'CodePick 最新内容' : 'CodePick latest content',
  itemListElement: allLatest.slice(0, 6).map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.title,
    url: `${siteUrl}${feedItemUrl(item)}`,
  })),
} : null;

const homeJsonLd = itemListSchema ? [itemListSchema] : [];

const rssPath = lang === 'zh' ? '/zh/rss.xml' : '/en/rss.xml';
const githubUrl = 'https://github.com/WhiteWorld/codepick';
---
```

- [ ] **Step 2: 验证文件仍能解析（运行 build）**

```bash
npm run build 2>&1 | tail -10
```

Expected: 构建成功，261 页全过。如果失败，看错误信息修复后再继续。

注意：此时页面 HTML 部分还未改写，可能因引用了删除的旧变量（如 `latestArticles`、`latestGuides`、`categories[i].key`、`categories[i].icon`）报错。**这是预期的**，下一个 task 会修复。如果只有这类错误，可以**先跳过 build 验证**，进入 Task 4。

- [ ] **Step 3: 不要 commit**（HTML 部分还没改，提交会破坏构建）

---

### Task 4: 重写 HomePage HTML 模板

**Files:**
- Modify: `src/page-views/HomePage.astro`（替换 `<BaseLayout>` 内的所有内容）

- [ ] **Step 1: 把 `<BaseLayout ...>` 到 `</BaseLayout>` 之间的全部内容（约 68 行到 196 行）替换为：**

```astro
<BaseLayout title={seoTitle} lang={lang} jsonLd={homeJsonLd}>
  <!-- Hero (compact, ~80px) -->
  <section class="container pt-12 pb-6 text-center">
    <h1 class="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 leading-tight">
      {t('home.heroTitleNew', lang)}
    </h1>
    <p class="text-sm text-[var(--text-muted)]">
      {tools.length} {t('home.dataBadge', lang)} · {plans.length} {t('home.dataBadgePlans', lang)} · {t('home.dataBadgeLang', lang)}
    </p>
  </section>

  <!-- Latest Content: 1 featured + 5 secondary -->
  {featured && (
    <section class="container mb-16 reveal">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-[var(--text-primary)] m-0">
          {t('home.latestContent', lang)}
        </h2>
        <a href={localePath('/compare', lang)} class="text-sm text-[var(--brand-400)] no-underline hover:underline">
          {t('home.allArticles', lang)}
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Featured (large) -->
        <a
          href={feedItemUrl(featured)}
          class="md:col-span-2 card p-6 block no-underline group hover:border-[var(--brand-500)] transition-colors flex flex-col"
        >
          <div class="mb-3">
            <span class={`inline-block text-xs px-2 py-0.5 rounded-full border ${typeBadgeClass[featured.type]}`}>
              {typeBadgeLabel[featured.type]}
            </span>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] m-0 mb-3 line-clamp-2 leading-tight">
            {featured.title}
          </h3>
          <p class="text-sm text-[var(--text-secondary)] m-0 mb-4 line-clamp-2 leading-relaxed flex-1">
            {featured.description}
          </p>
          <div class="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{readingMinutes(featured.bodyLength)} {t('home.readTimeSuffix', lang)}</span>
          </div>
        </a>

        <!-- Secondary (compact list) -->
        <div class="flex flex-col gap-2">
          {secondary.map(item => (
            <a
              href={feedItemUrl(item)}
              class="card p-3 block no-underline group hover:border-[var(--brand-500)] transition-colors"
            >
              <div class="flex items-start gap-2">
                <span class={`shrink-0 inline-block text-xs px-1.5 py-0.5 rounded border ${typeBadgeClass[item.type]} mt-0.5`}>
                  {typeBadgeLabel[item.type]}
                </span>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] m-0 line-clamp-1">
                    {item.title}
                  </h3>
                  <span class="text-xs text-[var(--text-muted)] block mt-0.5">{item.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )}

  <!-- Quick Picker -->
  <hr class="section-divider my-12" />
  <section class="container mb-16 reveal">
    <div class="mb-5">
      <h2 class="text-xl font-bold text-[var(--text-primary)] m-0">
        {t('home.quickPickerTitle', lang)}
      </h2>
      <p class="text-xs text-[var(--text-muted)] mt-1 mb-0">
        {t('home.quickPickerDesc', lang)}
      </p>
    </div>
    <QuickPicker lang={lang} />
  </section>

  <!-- Tool Categories (4 simplified) -->
  <hr class="section-divider my-12" />
  <section class="container mb-16 reveal">
    <h2 class="text-xl font-bold text-[var(--text-primary)] mb-5">
      {t('home.toolCategories', lang)}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map(cat => (
        <a href={localePath(cat.href, lang)} class="card p-4 no-underline group block text-center hover:border-[var(--brand-500)] transition-colors">
          <div class="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] transition-colors mb-1">
            {cat.label}
          </div>
          <div class="text-xs text-[var(--text-muted)]">{cat.count} {t('cat.toolsCountSuffix', lang)}</div>
        </a>
      ))}
    </div>
  </section>

  <!-- Editor's Picks (3 plans) -->
  <hr class="section-divider my-12" />
  <section class="container mb-16 reveal">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-[var(--text-primary)] m-0">
          {t('home.editorPicks', lang)}
        </h2>
        <p class="text-xs text-[var(--text-muted)] mt-1 mb-0">
          {t('home.editorPicksDesc', lang)}
        </p>
      </div>
      <a href={localePath('/plans', lang)} class="text-sm text-[var(--brand-400)] no-underline hover:underline">
        {t('home.viewAll', lang)}
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      {featuredPlans.map(plan => (
        <div data-plan-id={plan.id}>
          <PlanCard plan={plan} lang={lang} />
        </div>
      ))}
    </div>
  </section>

  <!-- RSS / GitHub -->
  <hr class="section-divider my-12" />
  <section class="container mb-20 reveal">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <a href={rssPath} class="card p-6 no-underline group hover:border-[var(--brand-500)] transition-colors block">
        <h3 class="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] m-0 mb-2">
          {t('home.subscribeTitle', lang)}
        </h3>
        <p class="text-sm text-[var(--text-secondary)] m-0 mb-3 leading-relaxed">
          {t('home.subscribeDesc', lang)}
        </p>
        <span class="text-sm text-[var(--brand-400)]">{t('home.subscribeCta', lang)}</span>
      </a>
      <a href={githubUrl} target="_blank" rel="noopener" class="card p-6 no-underline group hover:border-[var(--brand-500)] transition-colors block">
        <h3 class="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-400)] m-0 mb-2">
          {t('home.openSourceTitle', lang)}
        </h3>
        <p class="text-sm text-[var(--text-secondary)] m-0 mb-3 leading-relaxed">
          {t('home.openSourceDesc', lang)}
        </p>
        <span class="text-sm text-[var(--brand-400)]">{t('home.openSourceCta', lang)}</span>
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: 运行 build 验证**

```bash
npm run build 2>&1 | tail -10
```

Expected: `Complete!`，261 页全部生成。

如果失败：
- "Cannot find name 'foo'" → 检查 frontmatter 是否完整复制了 Task 3 的代码
- 模板里某个变量未定义 → 在 Task 3 的 frontmatter 里搜该变量，确认是否拼写错误

- [ ] **Step 3: 抽查生成的 HTML**

```bash
grep -c "home.latestContent\|🔥 最新内容" dist/zh/index.html
```
Expected: 至少 1（说明"最新内容"section 有渲染）。

```bash
grep -oE '"@type":"[^"]+"' dist/zh/index.html | sort -u
```
Expected: 包含 `"@type":"ItemList"`、`"@type":"WebSite"`、`"@type":"Organization"`、`"@type":"SearchAction"`、`"@type":"ListItem"`。

- [ ] **Step 4: 本地预览（可选但推荐）**

```bash
npm run preview &
sleep 2
open http://localhost:4321/zh/
```

肉眼检查：
- 首屏看到 1 大头条 + 5 副条
- 类型徽章颜色正确（对比 = 绿，指南 = 蓝）
- QuickPicker、4 个分类卡片、推荐方案、RSS/GitHub 块都在
- 没有空白区域或缺失内容

检查完后停止：`pkill -f "astro preview"`

- [ ] **Step 5: Commit**

```bash
git add src/page-views/HomePage.astro
git commit -m "feat: 首页改版为媒体化布局（头条+5副条 + QuickPicker + 4分类 + 推荐方案 + RSS）"
```

---

### Task 5: 推送分支并创建 PR

**Files:** 无文件改动

- [ ] **Step 1: 推送 feature 分支**

```bash
git push -u origin feat/homepage-media-redesign
```

Expected: GitHub 返回 PR 创建链接（可忽略，下一步用 gh 创建）。

- [ ] **Step 2: 创建 PR**

```bash
gh pr create --title "feat: 首页媒体化改版（头条 + 5 副条）" --body "$(cat <<'EOF'
## Summary

把首页从"工具数据库门面"改成"内容驱动的媒体首页"，首屏直接展示最新内容（1 大头条 + 5 副条），符合数据洞察（TOP 10 全是 guides/compare 文章）。

整页 6 个 section：
1. Hero 极简（约 80px，标题 + 数据徽章）
2. 🔥 最新内容（合并 compare/guides/practices，按日期取 6 篇）
3. ⚡ QuickPicker
4. 📦 工具分类速查（简化为 4 个：全部/免费/国内/Agent）
5. 🔥 编辑推荐方案
6. 📬 RSS / GitHub Star

## Changes

- 重写 `src/page-views/HomePage.astro`（frontmatter 数据合并 + HTML 模板重排）
- 新增 28 个 i18n key（zh/en）
- 删除 Trust Signals 和 ScenarioCard 引用
- 详细设计见 `docs/superpowers/specs/2026-05-16-homepage-redesign-design.md`

## Test plan

- [ ] Vercel preview URL 打开 `/zh/` 看首屏布局
- [ ] 头条卡片：徽章颜色正确、标题/摘要/日期/阅读时长齐全
- [ ] 副条 5 个：紧凑列表、点击可跳转
- [ ] QuickPicker 可交互
- [ ] 4 个分类卡片：计数正确
- [ ] 3 个 PlanCard 展示
- [ ] RSS / GitHub 链接可跳转
- [ ] 切换到 `/en/` 检查英文文案
- [ ] DevTools 检查 JSON-LD（应有 WebSite + Organization + ItemList）
- [ ] 移动端宽度（DevTools 模拟）布局不溢出

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: 返回 PR URL，类似 `https://github.com/WhiteWorld/codepick/pull/63`。

- [ ] **Step 3: 把 PR URL 输出给用户**

把 PR URL 复制出来告诉用户，让他打开 PR 页面等 Vercel preview 部署完成，访问 preview URL 验收。

```bash
gh pr view --json url --jq .url
```

---

### Task 6: 等待 Vercel preview 并交付给用户验收

**Files:** 无文件改动

- [ ] **Step 1: 用 Monitor 跟踪 PR 上的 Vercel preview 部署状态**

```bash
gh pr checks --watch 2>&1 | tail -5
```
或简单等待：让用户去 PR 页面看 Vercel bot 评论的 preview URL。

- [ ] **Step 2: 提示用户验收**

输出类似的提示：

> Preview URL 已生成（见 PR 页面 Vercel bot 评论）。请打开并验证：
> 1. `/zh/` 首屏布局符合 spec
> 2. `/en/` 英文文案显示正常
> 3. 移动端宽度不溢出
> 4. 点击头条/副条能跳转到对应文章
>
> 验收 OK 后告诉我，我帮你合并 PR；如果要改，把要改的地方列出来。

- [ ] **Step 3: 不自动合并 PR**

合并由用户确认后另行操作（用户偏好：每次改动前等确认）。

---

## Self-Review

### 1. Spec coverage 对照

| Spec section | 实现位置 |
|---|---|
| Hero 极简 | Task 4 模板 `<!-- Hero (compact, ~80px) -->` |
| 最新内容 1+5 布局 | Task 4 模板 `<!-- Latest Content -->`，Task 3 frontmatter 数据合并 |
| 类型徽章配色 | Task 3 `typeBadgeClass` + Task 4 模板内联使用 |
| 阅读时长算法 | Task 3 `readingMinutes()` + Task 4 头条模板调用 |
| QuickPicker section | Task 4 `<QuickPicker lang={lang} />` |
| 4 个分类卡片（删 VSCode/终端/Builder） | Task 3 `categories` 数组 + Task 4 模板循环 |
| 编辑推荐方案 3 个 | Task 4 模板 `featuredPlans.map` |
| RSS + GitHub 两列卡片 | Task 4 模板最后一个 section |
| i18n 新 key（20+） | Task 2 完整列出 28 个 key |
| 删除 ScenarioCard 导入 | Task 3 frontmatter 不再 import ScenarioCard |
| Trust Signals 删除 | Task 4 模板未包含 |
| `latestArticles + latestGuides` 字段名变化 → JSON-LD 更新 | Task 3 `itemListSchema` 改用 `allLatest.slice(0, 6)` |

✅ 所有 spec 要点都有对应 task。

### 2. Placeholder 扫描

无 TBD/TODO/"appropriate"/"similar to"。所有代码块完整可粘贴。

### 3. Type 一致性

- `FeedItem` 接口在 Task 3 定义，Task 4 模板使用 `featured.type`、`item.type`、`item.title` 等均与接口字段对齐
- `ContentType = 'compare' | 'guides' | 'practices'`，`typeBadgeClass` 和 `typeBadgeLabel` 都按这三个 key 索引 ✓
- `feedItemUrl(item)` 接收 `FeedItem`，构造路径 `/{type}/{slug}`，模板内调用一致 ✓
- `readingMinutes(charCount: number)` 在 Task 3 定义、Task 4 用 `featured.bodyLength` 传入 ✓
- i18n key 命名风格统一（dot.notation），与现有 `home.*` `cat.*` 对齐 ✓

无类型不一致问题。
