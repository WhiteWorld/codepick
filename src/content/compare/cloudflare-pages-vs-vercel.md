---
title: "Cloudflare Pages vs Vercel：前端部署平台终极对比"
description: "从构建速度、免费额度、Serverless 能力、框架支持、国内访问速度等维度，全面对比两大前端部署平台，帮你选出最适合的方案。"
date: "2026-03-21"
tags: ["cloudflare", "vercel", "部署", "对比", "前端"]
---

Cloudflare Pages 和 Vercel 是目前最受开发者欢迎的两个前端部署平台。两者都支持 git push 自动部署、预览链接、免费 SSL，但在定价模型、性能特点、生态集成上有显著差异。

本文从实际使用角度做详细对比，帮你选出最合适的部署方案。

## 一句话总结

- **Cloudflare Pages**：免费额度最大方，带宽无限，R2 零出口费，适合预算敏感或流量大的项目
- **Vercel**：开发者体验最好，Next.js 原生支持最深，AI SDK 生态成熟，适合 Next.js 项目和团队协作

---

## 基础能力对比

| | Cloudflare Pages | Vercel |
|---|---|---|
| **部署方式** | Git 集成 / CLI / Direct Upload | Git 集成 / CLI |
| **支持框架** | 所有 SSG + 部分 SSR | 所有 SSG + 完整 SSR |
| **自动 HTTPS** | ✅ | ✅ |
| **预览部署** | ✅ 每个分支/PR | ✅ 每个分支/PR |
| **自定义域名** | ✅ 免费 | ✅ 免费 |
| **CDN 节点** | 300+ 全球节点 | Vercel Edge Network |
| **构建系统** | v2 构建系统 | Turborepo 集成 |
| **Monorepo 支持** | ✅ | ✅（更完善） |

---

## 价格对比（最关键的差异）

| | Cloudflare Pages Free | Vercel Hobby (Free) | Cloudflare Pages Pro ($25/月) | Vercel Pro ($20/月/人) |
|---|---|---|---|---|
| **带宽** | **无限** | 100 GB/月 | **无限** | 1 TB/月 |
| **构建次数** | 500 次/月 | 6000 次/月 | 5000 次/月 | 6000 次/月 |
| **并发构建** | 1 | 1 | 5 | 1（可加购） |
| **站点数** | 无限 | 无限 | 无限 | 无限 |
| **Serverless 执行** | 10 万次/天（Workers） | 100 GB-小时/月 | 1000 万次/月 | 1000 GB-小时/月 |
| **商业用途** | ✅ | ❌ | ✅ | ✅ |

> 💡 **关键差异**：
> - Cloudflare Pages 免费版**带宽无限**且**允许商业用途**，这是最大优势
> - Vercel Hobby 版**不允许商业用途**，独立开发者做产品必须升级到 Pro（$20/月/人）
> - Vercel Pro **按人收费**，团队越大费用越高；Cloudflare Pro 固定 $25/月

---

## 框架支持对比

### Next.js 支持

| | Cloudflare Pages | Vercel |
|---|---|---|
| SSG（静态生成） | ✅ | ✅ |
| SSR（服务端渲染） | ✅（通过 @cloudflare/next-on-pages） | ✅ **原生支持** |
| App Router | ✅ | ✅ |
| ISR（增量静态再生） | ⚠️ 有限支持 | ✅ 原生支持 |
| Image Optimization | ❌ 需自建 | ✅ 内置 |
| Middleware | ✅ | ✅ |
| Server Actions | ✅ | ✅ |

**结论**：如果你用 Next.js，Vercel 是最省心的选择。Cloudflare Pages 也能跑 Next.js，但需要额外适配，部分高级特性支持不完善。

### 其他框架

| 框架 | Cloudflare Pages | Vercel |
|------|-----------------|--------|
| Astro | ✅ 一流支持 | ✅ |
| React (Vite) | ✅ | ✅ |
| Vue / Nuxt | ✅ | ✅ |
| Svelte / SvelteKit | ✅ | ✅ |
| Hugo | ✅ | ✅ |
| 11ty | ✅ | ✅ |
| Remix | ✅ 原生支持 | ✅ |
| Solid Start | ✅ | ✅ |

对于非 Next.js 的纯静态站点（如 Astro、Hugo），两者体验相当，但 Cloudflare Pages 的免费带宽无限更有吸引力。

---

## Serverless 能力对比

| | Cloudflare Workers (Pages Functions) | Vercel Serverless Functions |
|---|---|---|
| **运行时** | V8 隔离 | Node.js (AWS Lambda) |
| **冷启动** | < 5ms | 100–500ms |
| **最长执行时间（免费）** | 10ms CPU 时间 | 10 秒 |
| **最长执行时间（付费）** | 30 秒 CPU 时间 | 60 秒 |
| **内存限制** | 128 MB | 1024 MB（可调） |
| **完整 Node.js API** | ❌ 部分兼容 | ✅ 完整 |
| **支持语言** | JS/TS + Wasm | JS/TS/Python/Go/Ruby |
| **边缘执行** | ✅ 全部边缘 | Edge Runtime 可选 |

**关键区别：**

- **Cloudflare Workers** 冷启动极快（< 5ms），但不是完整的 Node.js 运行时。一些依赖原生 Node.js API 的 npm 包可能无法运行（如 `fs`、`child_process`）。不过 Cloudflare 在持续增加 Node.js 兼容性。

- **Vercel Functions** 是完整的 Node.js，所有 npm 包都能用，但冷启动明显更慢。Vercel 也提供 Edge Runtime（类似 Workers），但需要手动指定。

> 💡 **选择建议**：
> - 需要快速响应的轻量 API → Cloudflare Workers
> - 需要运行复杂 npm 包的后端逻辑 → Vercel Functions
> - 需要多语言支持（Python、Go）→ Vercel Functions

---

## 存储生态对比

| | Cloudflare | Vercel |
|---|---|---|
| **键值存储** | KV（免费 10 万读/天） | KV（基于 Upstash，有限免费） |
| **对象存储** | R2（10 GB 免费，**零出口费**） | Blob（有限免费） |
| **数据库** | D1 SQLite（5 GB 免费） | Postgres（基于 Neon，256 MB 免费） |
| **向量数据库** | Vectorize | ❌（需第三方） |
| **消息队列** | Queues | ❌（需第三方） |

Cloudflare 的存储生态更丰富，且免费额度更大。特别是 R2 的**零出口流量费**，对于图片和文件密集型应用是巨大优势。

Vercel 的存储产品都基于第三方（Neon、Upstash），免费额度较小，但好处是与 Vercel 部署深度集成。

---

## 构建速度对比

| | Cloudflare Pages | Vercel |
|---|---|---|
| **平均构建时间** | 较快 | 快（Turborepo 缓存） |
| **增量构建** | ✅ | ✅（更智能） |
| **构建缓存** | 有 | Remote Caching（更高效） |
| **并行构建（免费）** | 1 | 1 |

Vercel 的构建系统更成熟，特别是 Turborepo 的远程缓存功能，对于大型 Monorepo 项目可以显著加速构建。

---

## 开发者体验对比

### 部署体验

两者都支持连接 GitHub 后 `git push` 自动部署。主要差异：

- **Vercel**：Dashboard UI 更精美，部署日志更清晰，集成 Vercel CLI 支持本地预览（`vercel dev`）
- **Cloudflare Pages**：Dashboard 功能全面但 UI 稍显朴素，`wrangler pages dev` 本地预览

### 团队协作

- **Vercel**：PR 预览链接带评论功能，可直接在预览页面留反馈
- **Cloudflare Pages**：PR 预览链接，但无内置评论功能

### 监控和分析

- **Vercel**：内置 Web Analytics 和 Speed Insights（付费功能更完整）
- **Cloudflare Pages**：可搭配 Cloudflare Web Analytics（免费且无 Cookie）

---

## 国内访问速度对比

| | Cloudflare Pages | Vercel |
|---|---|---|
| **默认域名速度** | ⭐⭐⭐（`*.pages.dev`） | ⭐⭐⭐（`*.vercel.app`） |
| **自定义域名 + CDN** | ⭐⭐⭐⭐（自带 Cloudflare CDN） | ⭐⭐⭐（需额外配 CDN） |
| **DNS 管理** | 内置（Cloudflare DNS） | 需第三方 |

Cloudflare Pages 在国内的优势是：**自定义域名后自动走 Cloudflare CDN**，不需要额外配置。Vercel 如果想在国内加速，通常需要在 Cloudflare 配 DNS 代理——相当于还是要用 Cloudflare。

---

## 安全对比

| | Cloudflare Pages | Vercel |
|---|---|---|
| **DDoS 防护** | ✅ 免费（Cloudflare 核心能力） | ✅ 基础防护 |
| **WAF（Web 应用防火墙）** | ✅ 可选 | ✅ 基础 |
| **Bot 管理** | ✅ 可选 | ❌ |
| **Rate Limiting** | ✅ | ✅ |
| **访问控制** | Cloudflare Access | Vercel Authentication |

安全是 Cloudflare 的核心业务，这方面 Cloudflare Pages 有天然优势。

---

## 典型用户画像

### 选 Cloudflare Pages 的人

- 预算有限的独立开发者（免费带宽无限 + 商业可用）
- 需要 R2 存储大量文件的项目
- 对国内访问速度有要求（自带 CDN）
- 安全要求高（内置 DDoS 防护）
- 非 Next.js 项目（Astro、Hugo、Remix 等）

### 选 Vercel 的人

- Next.js 项目（原生支持最好）
- 需要完整 Node.js Serverless Functions
- 重视团队协作体验（PR 评论、Speed Insights）
- AI 应用开发（Vercel AI SDK）
- 追求极致的开发者体验

---

## 迁移难度

两者之间迁移相对容易：

- **Vercel → Cloudflare Pages**：纯静态站点几乎零成本迁移。Next.js SSR 项目需要适配 `@cloudflare/next-on-pages`，可能遇到兼容性问题。
- **Cloudflare Pages → Vercel**：通常很顺利，Vercel 对大多数框架的支持更完整。

---

## 总结：怎么选？

| 你的情况 | 推荐 |
|---------|------|
| 用 Next.js，追求省心 | **Vercel** |
| 用 Astro/Hugo/其他 SSG | **Cloudflare Pages**（免费带宽无限） |
| 独立开发者做商业产品 | **Cloudflare Pages**（免费版可商用） |
| 团队协作，重视 PR 预览 | **Vercel** |
| 需要存大量文件 | **Cloudflare Pages**（R2 零出口费） |
| 做 AI 应用 | **Vercel**（AI SDK 生态） |
| 国内访问速度优先 | **Cloudflare Pages**（自带 CDN） |
| 需要完整 Node.js 后端 | **Vercel** |
| 预算极度有限 | **Cloudflare Pages** |

**最后一个建议**：两者并不互斥。很多开发者的做法是——前端部署在 Vercel（享受 Next.js 原生支持），但 DNS 和 CDN 用 Cloudflare（加速 + 安全），文件存储用 R2（省钱）。组合使用，取各自所长。
