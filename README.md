<div align="center">

# CodePick

**AI 编程工具与工作流选型站 · The AI Coding Stack Comparison Site**

[![Website](https://img.shields.io/badge/website-codepick.dev-4B32C3?style=flat-square)](https://codepick.dev)
[![GitHub Stars](https://img.shields.io/github/stars/WhiteWorld/codepick?style=flat-square&logo=github)](https://github.com/WhiteWorld/codepick/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/WhiteWorld/codepick/pr-ci.yml?style=flat-square&label=validate)](https://github.com/WhiteWorld/codepick/actions/workflows/pr-ci.yml)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://codepick.dev)
[![Astro](https://img.shields.io/badge/Astro-7.2-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

A bilingual (中文 / English) static site that helps developers choose the right AI coding tools, plans, workflows, and model APIs — with data-driven comparisons, hands-on guides, and practical practices.

</div>

---

## ✨ Features

- **Bilingual by default** — every article ships in `/zh/` and `/en/`, with mirrored content collections
- **Data-driven** — 39 tools, 8 API/model sources, 16 plans stored as YAML, with freshness and confidence tracking
- **Comparisons, guides & practices** — 100+ articles across `compare`, `guides`, and `practices` collections
- **SEO-ready** — sitemap with `lastmod`, JSON-LD schemas, IndexNow submission, RSS feeds
- **Automated freshness** — weekly monitors check tool versions and pricing pages, and open issues on changes

## 🧱 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro 7.2](https://astro.build) (SSG, Content Collections) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) + Typography |
| Language | [TypeScript 5](https://www.typescriptlang.org) / Node 22+ |
| Data | YAML via `js-yaml`, loaded at build time |
| Images | `sharp` (OG image generation) |
| Analytics | Vercel Analytics + optional Umami |
| Deploy | [Vercel](https://vercel.com) (auto-deploy from `main`), Cloudflare DNS |

## 🚀 Quick Start

```bash
npm ci
npm run dev               # local dev server (http://localhost:4321)
```

**Verify before any PR** (all must pass):

```bash
npm run content:check -- --strict   # content governance & bilingual mirrors
npm run build                       # static build (317+ pages)
npm run check:seo                   # key SEO routes
node --test scripts/check-content.test.mjs
npm audit --audit-level=critical
```

## 📊 Data Maintenance

```bash
npm run update-all-tools            # auto-refresh tool versions & pricing
npm run update-github-tools         # open-source tool data
npm run update-closed-source-tools  # closed-source tool data
npm run monitor                     # detect data changes → open issues
```

Data lives in `data/tools/`, `data/apis/`, `data/plans/` — every entry must keep
`data_sources`, `last_full_review`, `next_review_due`, and `confidence` up to date.
Field specs: [`AGENTS.md`](./AGENTS.md) · Update SOP: [`DATA-UPDATE-SOP.md`](./DATA-UPDATE-SOP.md)

## 📁 Project Structure

```text
data/                  # tools / apis / plans YAML
src/content/           # compare, guides, practices (+ -en mirrors)
src/pages/             # /zh and /en routes (thin wrappers)
src/page-views/        # shared page view components
src/lib/               # data access, i18n helpers
scripts/               # content checks, monitors, generators
.github/workflows/     # CI, freshness, monitor, IndexNow
```

## 🤝 Contributing

- **New tool / plan / API** — add a YAML with official sources and review dates, then `npm run build`
- **New article** — mirror in zh + en, complete governance fields, add internal links
- **Data correction** — edit the YAML and cite the official source
- **Process** — open a Draft PR → CI (`validate`) must be green → independent review GO → merge to `main`

> `main` is protected: the `validate` check and 1 approving review are required before merge.

## 📄 License

[MIT](./LICENSE)

---

## 中文说明

# CodePick

**面向开发者的 AI 编程工具与工作流选型站** — [codepick.dev](https://codepick.dev)

跟踪 AI IDE、CLI、Agent 协作平台、应用构建器、模型 API 与开发工作流，帮助开发者在工具、方案、对比文章、工作流指南和开发实践之间快速做选择。

### 功能特性

- **中英双语**：每篇文章默认 `/zh/` + `/en/` 镜像
- **数据驱动**：39 款工具、8 个 API/模型源、16 个组合方案，YAML 存储并维护新鲜度与置信度
- **内容体系**：对比（compare）、指南（guides）、实践（practices）三大内容集合，100+ 篇
- **SEO 基建**：sitemap + lastmod、JSON-LD、IndexNow、双语 RSS
- **自动化监控**：每周自动核对工具版本与定价页变化并开 issue

### 技术栈

Astro 7.2（SSG + Content Collections）· Tailwind CSS 3.4 · TypeScript · js-yaml · sharp（OG 图）· Vercel 部署 · Cloudflare DNS · Umami/Vercel 双统计

### 本地开发

```bash
npm ci
npm run dev              # 开发服务器
npm run build            # 构建（改动后必须验证）
npm run check:seo        # 关键 SEO 路由
npm run content:check -- --strict   # 内容治理检查
```

### 数据维护

```bash
npm run update-all-tools
npm run update-github-tools
npm run update-closed-source-tools
npm run monitor
```

数据文件位于 `data/tools/`、`data/apis/`、`data/plans/`，每条数据需维护 `data_sources`、`last_full_review`、`next_review_due`、`confidence` 字段。字段规范见 [AGENTS.md](./AGENTS.md)，更新流程见 [DATA-UPDATE-SOP.md](./DATA-UPDATE-SOP.md)。

### 贡献指南

- **新增工具/方案/API**：在对应 `data/` 目录创建 YAML，补齐官方来源与复核日期，运行 `npm run build`
- **新增文章**：在对应 content collection 添加 Markdown，补齐治理字段与中英镜像
- **数据纠错**：直接修改 YAML 并附官方来源
- **提交前**：至少运行 `npm run content:check -- --strict` 和 `npm run build`

> `main` 已开启分支保护：合并前必须通过 `validate` 检查 + 1 个 approving review。

### 许可

[MIT](./LICENSE)
