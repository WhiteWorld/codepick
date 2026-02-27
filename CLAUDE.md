# CodePick — CLAUDE.md

面向开发者的 AI 编程工具选型静态网站。基于 Astro 5 SSG + YAML 数据 + 双语（中/英）+ Vercel 部署。

## 常用命令

```bash
npm run dev                    # 本地开发服务器
npm run build                  # 构建（每次改动后务必验证）
npm run preview                # 预览构建结果
npm run monitor                # Python 数据监控脚本
npm run dashboard              # Python 数据 dashboard
npm run gen-og                 # 重新生成 OG 图片（需要 sharp）
npm run gen-social-post        # 生成社交媒体发帖模板
npm run gen-juejin             # 生成掘金发帖模板
npm run update-github-tools    # 自动更新 GitHub 开源工具数据
npm run update-closed-source-tools  # 自动更新闭源工具数据
npm run update-all-tools       # 同时运行上面两个脚本
```

## 项目结构

```
data/
  tools/*.yaml        # 工具数据（每个工具一个文件，共 15 个）
  apis/*.yaml         # API 源数据（ark, bailian, ollama, openrouter）
  plans/*.yaml        # 方案数据（工具 + API 组合，共 18 个）
  site-changelog.yaml # 站点更新日志

src/
  lib/
    data.ts           # YAML 加载 + 归一化 + TypeScript 接口定义
    i18n.ts           # 双语翻译系统（150+ 翻译 key，t()、localePath() 等）
    faq-data.ts       # FAQ 内容数据

  page-views/         # 页面模板组件（15 个，含所有页面 UI 逻辑）
    HomePage.astro
    ToolDetailPage.astro
    ToolsIndexPage.astro
    ToolsOverviewPage.astro    # 全景图（比分矩阵 + 决策树）
    ToolsFreePage.astro
    ToolsChinaPage.astro
    ToolsTerminalPage.astro
    ToolsVscodePage.astro
    PlanDetailPage.astro
    ChangelogPage.astro
    CompareArticlePage.astro
    CompareIndexPage.astro
    GuidesArticlePage.astro
    GuidesIndexPage.astro
    FaqPage.astro

  pages/
    index.astro              # 根路径语言重定向（JS 检测 navigator.language）
    api/openrouter.json.ts   # OpenRouter API 端点
    zh/                      # 中文路由（薄包装，透传 lang="zh" 给 page-views）
      index.astro / faq.astro / changelog.astro
      tool/[id].astro / plan/[id].astro
      compare/index.astro / compare/[slug].astro
      guides/index.astro / guides/[slug].astro
      tools/index|free|china|vscode|terminal|overview.astro
    en/                      # 英文路由（结构与 zh/ 完全镜像，透传 lang="en"）

  content/
    config.ts         # Content Collections 定义（4 个集合）
    compare/*.md      # 对比文章（中文，Astro Content Collections）
    compare-en/*.md   # 对比文章（英文版本）
    guides/*.md       # 使用指南（中文）
    guides-en/*.md    # 使用指南（英文版本）

  layouts/
    BaseLayout.astro  # 主布局：OG/canonical/JSON-LD/hreflang/语言切换/Analytics

  components/
    ToolCard.astro    # 工具卡片（复用于各分类页）
    PlanCard.astro    # 方案卡片（含组合预览）
    ScenarioCard.astro   # 首页场景速查卡片
    QuickPicker.astro    # 30 秒选型问卷（3 题 → 推荐方案）
    ScoreBar.astro       # 评分可视化条形图
    CompareTable.astro   # 功能对比矩阵
    FilterBar.astro      # 工具筛选控件

  styles/
    global.css        # 全局样式（TailwindCSS 指令）

scripts/
  check-freshness.mjs       # 检测 YAML 数据新鲜度，超期自动创建 GitHub Issue
  gen-og-image.mjs          # 生成 OG 图片（1200×630，需要 sharp）
  gen-social-post.mjs       # 生成社交发帖模板
  gen-juejin-post.mjs       # 生成掘金发帖模板
  monitor.py                # 检测工具版本/定价变化，创建 GitHub Issue
  update-github-tools.mjs   # 自动更新 GitHub 开源工具版本
  update-closed-source-tools.mjs  # 自动更新闭源工具数据

.github/workflows/
  monitor.yml       # 每周一 09:00（北京）运行 monitor.py
  freshness.yml     # 每周一 09:00（北京）运行 check-freshness.mjs
```

## 双语架构（i18n）

### 路由规则

- 所有页面都有 `/zh/...` 和 `/en/...` 两个版本
- Astro 5 i18n 配置：`defaultLocale: 'zh'`，`prefixDefaultLocale: true`
- 根路径 `/index.astro` 用 JS 检测 `navigator.language`，自动跳转 `/zh/` 或 `/en/`
- `vercel.json` 中配置了 16 条 301 重定向，将旧路径（如 `/tools`）重定向到 `/zh/tools`

### page-views 模式

路由文件（`src/pages/zh/` 和 `src/pages/en/`）只是薄包装：

```astro
---
import ToolDetailPage from '../../../page-views/ToolDetailPage.astro';
import { getToolLocalized } from '../../../lib/data';
// ...
---
<ToolDetailPage tool={tool} lang="zh" />
```

**所有 UI 逻辑都在 `src/page-views/` 中**，路由文件仅负责传入 `lang` 属性和获取数据。

### 翻译系统

使用 `src/lib/i18n.ts` 中的 `t(key, lang)` 函数：

```typescript
import { t, localePath, getLocaleFromUrl } from '../lib/i18n';

// 翻译
t('nav.tools', lang)        // zh: "工具库"，en: "Tools"
t('score.coding', lang)     // zh: "编程"，en: "Coding"

// 带 locale 前缀的路径
localePath('/tools/free', lang)  // "/zh/tools/free" 或 "/en/tools/free"

// 获取当前语言
const lang = getLocaleFromUrl(Astro.url)  // 'zh' 或 'en'
```

### 内容集合（Content Collections）

4 个集合定义在 `src/content/config.ts`：
- `compare` — 中文对比文章
- `guides` — 中文使用指南
- `compare-en` — 英文对比文章
- `guides-en` — 英文使用指南

获取集合时使用 `getCollectionName(base, lang)` 工具函数：

```typescript
import { getCollectionName } from '../lib/i18n';
const collection = getCollectionName('compare', lang);  // 'compare' 或 'compare-en'
```

## 工作流偏好

- **写完改动后不要自动 `git add/commit`**，等用户确认后再提交
- **提交前先运行 `npm run build` 验证构建无报错**

## 新增工具流程

1. 在 `data/tools/` 创建 `<tool-id>.yaml`（参考下方字段规范）
2. 如需新增 API 源，在 `data/apis/` 创建对应 YAML
3. 如需新增方案，在 `data/plans/` 创建对应 YAML
4. 运行 `npm run build` 确认 `/zh/tool/<id>` 和 `/en/tool/<id>` 页面正常生成
5. 等用户确认后提交

## 工具 YAML 完整字段规范

```yaml
id: tool-id              # URL slug，唯一，英文小写+连字符
name: "工具名"
type: ide|cli|plugin|client|web|app|cloud_agent
logo: /images/tool-id.png
url: https://example.com
repo: https://github.com/org/repo   # 开源工具填写；闭源为 null
current_version: '1.0'
version_tracked_at: 'YYYY-MM-DD'

pricing:
  model: subscription|pay_as_you_go|free|open_source
  currency: USD|CNY
  plans:
    - name: Free
      price: 0           # 数字 0 = 免费工具落地页收录
      limits: 有限额度    # 中文
      limits_en: Limited quota  # 英文（可选）
    - name: Pro
      price: 20
      period: month
      per_user: false    # true = 按用户计费
      limits: 无限额度
      limits_en: Unlimited
  price_updated_at: 'YYYY-MM-DD'
  note: 备注（中文）
  note_en: Note (English)

scores:
  coding_ability: 0-10
  cost_efficiency: 0-10
  flexibility: 0-10
  china_friendly: 0-10   # 国内可用性评分
  privacy: 0-10

features:
  code_completion: true|false
  chat: true|false
  agent_mode: true|false
  multi_file_edit: true|false
  mcp_support: true|false
  ide_base: "VS Code Fork"   # 分类落地页过滤依据
  supported_models:
    - Claude Sonnet 4.5
    - GPT-5
  supported_os: [macOS, Windows, Linux]

best_for:
  - 全栈开发者（中文）
best_for_en:
  - Full-stack developers (English)

not_for:
  - JetBrains 用户
not_for_en:
  - JetBrains users

changelog:
  - date: 'YYYY-MM-DD'
    type: feature|pricing|model|fix|announcement
    summary: 更新内容（中文）
    summary_en: Update description (English)

data_sources:
  - url: https://example.com/pricing
    type: pricing|changelog|docs
    last_checked: 'YYYY-MM-DD'

last_full_review: 'YYYY-MM-DD'     # 最后完整核查日期（用于 sitemap lastmod）
next_review_due: 'YYYY-MM-DD'      # 下次核查截止日期
review_frequency_days: 30          # 核查频率（天）
confidence: high|medium|low
```

## 方案 YAML 字段规范

```yaml
id: plan-id
name: "方案名（中文）"
name_en: "Plan Name (English)"
badge: "性价比之王"         # 徽章标签（中文）
badge_en: "Best Value"     # 徽章标签（英文）
type: ide|plugin|diy|cli

composition:              # 或直接用 client/api 顶级字段
  client: tool-id         # 引用 data/tools/ 的 id
  api: api-id             # 引用 data/apis/ 的 id（内置模型填 null）
  environment: VS Code

monthly_cost: "$20"       # 字符串；或对象：
monthly_cost:
  min: "¥9.9"
  typical: "¥9.9"
  max: "¥49.9"

currency: CNY|USD

scores:
  coding_ability: 8.2
  cost_efficiency: 9.6
  flexibility: 9.5
  china_friendly: 9.0

tags: [diy, budget, china, agent, vscode, ide, cli, privacy, power]

best_for:
  - 预算有限的国内开发者
best_for_en:
  - Budget-conscious developers in China

quick_start:
  - 步骤一（中文）
quick_start_en:
  - Step 1 (English)

pros:
  - 优点（中文）
pros_en:
  - Pros (English)

cons:
  - 缺点（中文）
cons_en:
  - Cons (English)

setup_difficulty: 简单|中等|复杂
```

## 分类落地页过滤逻辑

- `/tools/free`：`pricing.plans[].price === 0`（数字零）
- `/tools/china`：`scores.china_friendly >= 7`
- `/tools/vscode`：`features.ide_base` 含 "vs code" 或 "vscode"（大小写不敏感）
- `/tools/terminal`：`type === 'cli'` 或 `features.ide_base` 含 "终端/tui/cli"

## 内容文章规范

`src/content/compare/*.md`、`src/content/guides/*.md`（及对应 `-en/` 目录）frontmatter：

```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
tags: [cursor, copilot, comparison]
draft: false   # true 则不显示
---
```

新增文章时需同时创建中英文版本（`compare/slug.md` + `compare-en/slug.md`）。

## 数据工具函数（src/lib/data.ts）

```typescript
// 基础 CRUD（不带 locale）
getAllTools() → Tool[]
getTool(id) → Tool | undefined
getAllPlans() → Plan[]
getPlan(id) → Plan | undefined
getAllApis() → Api[]
getApi(id) → Api | undefined

// 带 locale 的版本（自动解析 _en 字段）
getAllToolsLocalized(lang) → Tool[]
getToolLocalized(id, lang) → Tool | undefined
getAllPlansLocalized(lang) → Plan[]
getPlanLocalized(id, lang) → Plan | undefined
getAllApisLocalized(lang) → Api[]

// 组合查询
getPlanWithDetailsLocalized(id, lang) → { ...plan, clientDetail, apiDetail }

// 工具函数
overallScore(scores) → number   # 计算综合分（各维度均值）
isFresh(dateStr) → boolean      # 检查 next_review_due 是否未过期
```

## 技术栈

- **Astro 5** SSG，i18n 双语路由（`/zh/` + `/en/`），`vite.ssr.noExternal: ['js-yaml']`
- **TailwindCSS v3** + `@tailwindcss/typography`（对比文章 prose 样式）
- **@astrojs/sitemap**（自动生成 sitemap，带 lastmod；site: `https://codepick.dev`）
- **@vercel/analytics**（Vercel 分析，嵌入 BaseLayout）
- **js-yaml** — 在 Astro 构建时加载 YAML 数据
- **sharp** — OG 图片生成
- **Vercel** 部署，push main 分支自动触发；`vercel.json` 定义重定向规则
- **GitHub Actions** — 每周一自动运行数据监控（`monitor.yml`）和新鲜度检查（`freshness.yml`）

## 当前工具库

15 个工具（`data/tools/`）：
`aider`, `antigravity`, `claude-code`, `cline`, `codex`, `codex-cli`, `copilot`, `cursor`, `gemini-cli`, `kiro`, `opencode`, `roo-code`, `trae`, `trae-cn`, `windsurf`

4 个 API 源（`data/apis/`）：
`ark-coding-plan`, `bailian-coding-plan`, `ollama`, `openrouter`

18 个方案（`data/plans/`）：
`aider-ollama`, `antigravity`, `claude-code-max`, `cline-ark`, `cline-bailian`, `copilot-pro`, `cursor-pro`, `gemini-cli`, `kiro-pro`, `opencode-ark`, `opencode-bailian`, `trae-ark`, `trae-cn`, `windsurf-pro` 等
