# Homepage 媒体化改版设计

**日期**：2026-05-16
**作者**：claude（与用户协作）
**状态**：已批准，待实施

## 背景

2026-05 访问数据显示 codepick 流量 TOP 10 几乎都是 `/guides/*` 和 `/compare/*` 文章，没有一个工具/方案详情页进入榜单。当前首页第一屏被 Hero 占据，最新文章被压到第 5 屏。用户实际把 codepick 当"AI 编程选型媒体"使用，但页面按"工具数据库"组织。

## 目标

把首页从"工具数据库门面"改成"内容驱动的媒体首页"：
- 首屏直接展示最新内容（6 篇），用户进入即看到能解决问题的文章
- 保留工具/方案的发现路径，但下移到第二屏后
- 整页节奏紧凑，砍掉无明确转化价值的 section

不在本次范围内：
- 文章详情页的样式
- 工具/方案详情页的改动
- 邮件订阅系统
- 移动端布局优化（独立 P1 任务）

## 整页结构

按从上到下顺序：

### 1. Hero（极简）— 约 80px 高

- 一行 H1：`AI 编程工具选型指南` / `AI Coding Tool Guide`
- 一行小字数据徽章：`36 工具 · 14 方案 · 双语`
- 不含 CTA 按钮（下方内容自己引导）
- 不含 Trust Signals（删除）

### 2. 🔥 最新内容（首屏主体）

**数据源**：合并 compare + guides + practices 集合，按 `date` 倒序取最新 6 篇。

**布局**：左 1 大头条 + 右 5 副条（桌面端），移动端头条占满宽 + 副条垂直堆叠。

**大头条**（第 1 篇）：
- 顶部：类型徽章
- 标题（最多 2 行截断）
- 摘要（`description` 字段，最多 2 行截断）
- 底部：日期 + 阅读时长估算

**副条**（第 2–6 篇）：
- 一行：类型徽章 + 标题（单行截断） + 日期
- 紧凑列表样式

**类型徽章**：
- `compare`（对比）：绿色 `#10b981`
- `guides`（指南）：蓝色 `#3b82f6`
- `practices`（实践）：紫色 `#8b5cf6`

**阅读时长估算**：
- 算法：`Math.max(2, Math.round(article.body.length / 600))` 分钟（中文按字符数 / 600，约 200 字/分钟）
- 显示：`5 分钟阅读` / `5 min read`
- 仅在头条显示，副条不显示（节省空间）

**底部链接**：
- 文字："查看全部内容" / "All articles"
- 链接到 `/zh/compare`（默认进入对比页，后续可加 tab 切换）

### 3. ⚡ QuickPicker（30 秒选型问卷）

- 直接使用现有 `<QuickPicker lang={lang} />` 组件，不改组件内部
- 节标题：`快速选型` / `Quick Picker`
- 简短引导文字：`回答 3 个问题，推荐最适合你的方案` / `Answer 3 questions, get a personalized recommendation`

### 4. 📦 工具分类速查 — 4 个分类卡片

桌面端一行 4 列，移动端 2×2。

| 卡片 | 链接 | 计数算法 |
|------|------|---------|
| 全部工具 | `/tools` | `tools.length` |
| 免费工具 | `/tools/free` | `tools.filter(t => t.pricing?.plans?.some(p => p.price === 0)).length` |
| 国内能用 | `/tools/china` | `tools.filter(t => t.scores?.china_friendly >= 7).length` |
| Agent 平台 | `/agents` | `tools.filter(t => t.type === 'agent_platform').length` |

删除：VSCode / 终端 / Builder 三个分类（移到工具列表页内部 filter）。

### 5. 🔥 编辑推荐方案 — 3 个 PlanCard

- 数据：`getAllPlansLocalized(lang).sort(...overallScore desc).slice(0, 3)`
- 直接复用现有 `<PlanCard plan={plan} lang={lang} />`
- 节标题：`编辑推荐方案` / `Editor's Picks`
- 右上角"查看全部 →"链接到 `/zh/plans`

### 6. 📬 RSS / GitHub Star

两列卡片（移动端堆叠）。

**左：RSS 订阅**
- 标题："订阅更新" / "Subscribe to updates"
- 文字："新文章会自动推送到你的 RSS 阅读器" / "New articles delivered to your RSS reader"
- 链接：`/zh/rss.xml` / `/en/rss.xml`（lang-aware）
- 图标：RSS 标志

**右：GitHub Star**
- 标题："支持开源" / "Support open source"
- 文字："本站完全开源，欢迎 Star / 提 Issue / PR" / "Fully open source. Star, issue, or PR welcome."
- 链接：`https://github.com/WhiteWorld/codepick`
- 图标：GitHub logo

不接邮件订阅服务（用户决策）。

## 数据获取改动

### `src/page-views/HomePage.astro` 顶部 frontmatter

**删除**：
- `latestArticles`（旧的，只取 compare）
- `latestGuides`（旧的，只取 guides）
- `categories` 数组中的 vscode / terminal / builder 三项
- Trust Signals section 整段

**新增**：
```typescript
// 合并三个集合，统一排序
const allLatest = [
  ...compareArticles.filter(a => !a.data.draft).map(a => ({
    type: 'compare' as const,
    slug: a.slug,
    title: a.data.title,
    description: a.data.description,
    date: a.data.date,
    body: a.body,
  })),
  ...guidesArticles.filter(a => !a.data.draft).map(a => ({
    type: 'guides' as const,
    slug: a.slug,
    title: a.data.title,
    description: a.data.description,
    date: a.data.date,
    body: a.body,
  })),
  ...practicesArticles.filter(a => !a.data.draft).map(a => ({
    type: 'practices' as const,
    slug: a.slug,
    title: a.data.title,
    description: a.data.description,
    date: a.data.date,
    body: a.body,
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const featured = allLatest[0];
const secondary = allLatest.slice(1, 6);

function readingMinutes(body: string): number {
  return Math.max(2, Math.round(body.length / 600));
}
```

### 类型徽章配色映射

```typescript
const typeMeta = {
  compare:   { label: { zh: '对比', en: 'Compare' },   color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  guides:    { label: { zh: '指南', en: 'Guide' },     color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  practices: { label: { zh: '实践', en: 'Practice' },  color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
};
```

### 内容 URL 构造

```typescript
function articleUrl(item: { type: string; slug: string }, lang: Locale): string {
  return localePath(`/${item.type}/${item.slug}`, lang);
}
```

## i18n 新增 key

在 `src/lib/i18n.ts` 加：

| key | zh | en |
|-----|-----|-----|
| `home.heroTitleNew` | `AI 编程工具选型指南` | `AI Coding Tool Guide` |
| `home.dataBadge` | `{n} 工具 · {m} 方案 · 双语` | `{n} tools · {m} plans · bilingual` |
| `home.latestContent` | `最新内容` | `Latest Content` |
| `home.allArticles` | `查看全部内容 →` | `All articles →` |
| `home.readTime` | `{n} 分钟阅读` | `{n} min read` |
| `home.quickPickerTitle` | `快速选型` | `Quick Picker` |
| `home.quickPickerDesc` | `回答 3 个问题，推荐最适合你的方案` | `Answer 3 questions, get a personalized recommendation` |
| `home.toolCategories` | `工具分类速查` | `Browse by Category` |
| `home.editorPicks` | `编辑推荐方案` | `Editor's Picks` |
| `home.editorPicksDesc` | `综合评分最高的 3 套方案` | `Top 3 plans by overall score` |
| `home.viewAll` | `查看全部 →` | `View all →` |
| `cat.allToolsLabel` | `全部工具` | `All Tools` |
| `cat.freeLabel` | `免费工具` | `Free Tools` |
| `cat.chinaLabel` | `国内能用` | `China Access` |
| `cat.agentLabel` | `Agent 平台` | `Agent Platforms` |
| `home.subscribeTitle` | `订阅更新` | `Subscribe to updates` |
| `home.subscribeDesc` | `新文章会自动推送到你的 RSS 阅读器` | `New articles delivered to your RSS reader` |
| `home.subscribeRss` | `订阅 RSS →` | `Subscribe RSS →` |
| `home.openSourceTitle` | `支持开源` | `Support open source` |
| `home.openSourceDesc` | `本站完全开源，欢迎 Star / Issue / PR` | `Fully open source. Star, issue, or PR welcome.` |
| `home.openSourceCta` | `GitHub Star →` | `Star on GitHub →` |

## SEO 影响

- HomePage 现有 `ItemList` schema 自动受益（合并后 6 个 item 含 type 多样化）
- `latestArticles + latestGuides` 字段名变化要同步更新 `homeJsonLd` 生成逻辑
- 不影响其他页面

## 移动端

本次改版**不专门处理移动端布局**（5% 流量），但要求：
- 头条不溢出
- 5 副条垂直堆叠
- 4 个分类卡片 2×2
- 不引入移动端 bug

详细移动端优化作为独立 P1 任务。

## 测试与验证

1. **本地构建**：`npm run build` 必须通过，261 页全部生成成功
2. **本地预览**：`npm run preview`，肉眼检查 `/zh/` 和 `/en/`
3. **Preview 部署**：通过 PR 触发 Vercel preview，用户在 preview URL 上验收
4. **生产合并**：preview OK 后合并 PR，触发生产部署 + IndexNow 推送

## 风险与备选

| 风险 | 缓解 |
|------|------|
| `practices` 集合可能为空（暂未启用） | 数据合并时安全处理空集合，不影响排序 |
| 阅读时长算法对全英文文章不准（600 字符 ≠ 200 中文字） | 头条才显示，影响小；后续可改进 |
| 砍掉的 VSCode/终端/Builder 入口可能让现有用户找不到 | 这三个分类页仍存在，导航栏未变；只是首页不再露出 |
| ScenarioCard 组件被删后是否还有别处用 | 检查 `grep -r ScenarioCard src/`，确认无其他引用后可安全删除导入 |

## 实施清单（高层）

1. 改 `src/page-views/HomePage.astro`：删旧 section，写新结构
2. 改 `src/lib/i18n.ts`：加 20+ 新 key
3. 验证：build / preview / hreflang / JSON-LD 结构未坏
4. 提交 PR，preview 验收
5. 合并到 main

详细步骤交给 `writing-plans` skill。
