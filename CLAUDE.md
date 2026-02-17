# CodePick — CLAUDE.md

面向中国开发者的 AI 编程工具选型静态网站。基于 Astro 5 SSG + YAML 数据 + Vercel 部署。

## 常用命令

```bash
npm run dev          # 本地开发服务器
npm run build        # 构建（每次改动后验证）
npm run preview      # 预览构建结果
npm run monitor      # Python 数据监控脚本
npm run gen-og       # 重新生成 OG 图片
npm run gen-social-post  # 生成社交媒体发帖模板
```

## 项目结构

```
data/
  tools/*.yaml       # 工具数据（每个工具一个文件）
  apis/*.yaml        # API 源数据
  plans/*.yaml       # 方案数据（工具 + API 的组合）
  site-changelog.yaml  # 站点更新日志

src/
  content/
    compare/*.md     # 对比文章（Astro Content Collections）
    guides/*.md      # 使用指南
  pages/
    tool/[id].astro  # 工具详情页（动态路由）
    plan/[id].astro  # 方案详情页
    compare/[slug].astro  # 对比文章详情
    guides/[slug].astro   # 指南详情
    tools/           # 分类落地页（free/china/vscode/terminal）
    faq.astro        # FAQ 页面
    changelog.astro  # 更新日志（动态聚合所有 YAML changelog）
  layouts/BaseLayout.astro  # 含 OG/canonical/JSON-LD
  components/
    ToolCard.astro   # 工具卡片（复用于各分类页）
    PlanCard.astro   # 方案卡片
    ScenarioCard.astro  # 首页场景速查卡片

scripts/
  monitor.py         # 检测工具版本/定价变化
  gen-og-image.mjs   # 生成 OG 图片（需要 sharp）
  gen-social-post.mjs  # 生成社交发帖模板
  update-github-tools.mjs   # 自动更新 GitHub 开源工具数据
  update-closed-source-tools.mjs  # 自动更新闭源工具数据
```

## 工作流偏好

- **写完改动后不要自动 git add/commit**，等用户确认后再提交
- 提交前先运行 `npm run build` 验证构建无报错
- HTTP 代理：`100.120.246.75:1081`，无法访问的站点用 `curl -x http://100.120.246.75:1081 <URL>`

## 新增工具流程

1. 在 `data/tools/` 创建 `<tool-id>.yaml`（参考已有文件结构）
2. 运行 `npm run build` 确认 `/tool/<id>` 页面正常生成
3. 等用户确认后提交

## 工具 YAML 关键字段

```yaml
id: tool-id          # URL slug，唯一
name: "工具名"
type: ide|cli|plugin|client|web|app|cloud_agent
scores:
  coding_ability: 0-10
  cost_efficiency: 0-10
  flexibility: 0-10
  china_friendly: 0-10   # 国内可用性评分
  privacy: 0-10
features:
  ide_base: "VS Code Fork"  # 分类落地页过滤依据
pricing:
  plans:
    - name: Free
      price: 0           # 数字 0 = 免费工具落地页会收录
confidence: high|medium|low
```

## 分类落地页过滤逻辑

- `/tools/free`：`pricing.plans[].price === 0`
- `/tools/terminal`：`type === 'cli'` 或 `features.ide_base` 含"终端/tui/cli"
- `/tools/vscode`：`features.ide_base` 含"vs code/vscode"（大小写不敏感）
- `/tools/china`：`scores.china_friendly >= 7`

## 内容文件规范

`src/content/compare/*.md` 和 `src/content/guides/*.md` frontmatter：

```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
tags: [...]
draft: false   # true 则不显示
---
```

## 技术栈

- **Astro 5** SSG，`vite.ssr.noExternal: ['js-yaml']`（YAML 在构建时加载）
- **TailwindCSS** + `@tailwindcss/typography`（文章 prose 样式）
- **@astrojs/sitemap**（自动生成 sitemap，site: `https://codepick.dev`）
- **Vercel** 部署，push main 分支自动触发
- **js-yaml** 在 Astro frontmatter 中读取 YAML 数据
