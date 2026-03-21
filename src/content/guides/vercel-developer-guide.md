---
title: "Vercel 开发者入门：写完代码到上线，只需要 git push"
description: "从零了解 Vercel：前端部署、Serverless Functions、Edge Runtime、AI SDK，帮你把 Next.js 和任何前端项目最快速地推上线。"
date: "2026-03-21"
tags: ["vercel", "部署", "入门", "Next.js", "前端"]
---

你写了一个网站，想让别人能访问到它。传统做法是：买服务器、装 Nginx、配 SSL、设置 CI/CD 流水线、绑域名……光是部署就能折腾一天。

Vercel 把这些全自动化了。你只需要 **git push**，代码就上线了。

如果你在用 Next.js、React、Vue、Astro 或者任何前端框架，Vercel 几乎是最省心的部署方案。本文帮你从零了解 Vercel 能做什么、怎么用。

---

## Vercel 能帮开发者做什么？

| 你的需求 | Vercel 功能 | 免费额度 |
|---------|------------|---------|
| 部署前端网站 | 自动构建 + 全球 CDN | 每月 100 GB 带宽 |
| 跑后端逻辑 | Serverless Functions | 每月 100 GB-小时 |
| 边缘计算 | Edge Runtime | 每月 500K 次执行 |
| 预览每个 PR | Preview Deployments | 无限 |
| 自动 HTTPS | SSL 证书 | 免费 |
| AI 应用开发 | AI SDK + 模型集成 | 按量计费 |
| 数据存储 | KV / Postgres / Blob | 有限免费额度 |

---

## 核心能力详解

### 零配置部署

Vercel 的核心体验是**零配置**。它自动检测你的项目框架（Next.js、Astro、Vite、Nuxt 等），自动选择正确的构建命令和输出目录。

**部署流程就三步：**
1. 把代码推到 GitHub
2. 在 Vercel Dashboard 导入仓库
3. 点击 Deploy

之后每次 push 到 main 分支，网站自动更新。每个 Pull Request 自动生成独立的预览链接，方便团队 Review。

### Serverless Functions：API 不用买服务器

在 Next.js 项目中，你只需要在 `app/api/` 目录下创建文件，Vercel 就会自动把它变成一个 Serverless Function：

```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: "Hello from Vercel!" });
}
```

部署后就能通过 `https://your-app.vercel.app/api/hello` 访问。

**特点：**
- 完整的 Node.js 运行时（支持所有 npm 包）
- 自动扩缩容，不用管并发
- 支持多种语言（Node.js、Python、Go、Ruby）
- 最长执行时间：免费版 10 秒，Pro 版 60 秒

### Edge Runtime：更快的边缘执行

Edge Runtime 把你的代码部署到全球边缘节点，响应速度更快：

```typescript
// app/api/fast/route.ts
export const runtime = "edge";

export async function GET() {
  return Response.json({
    message: "This runs at the edge!",
    region: process.env.VERCEL_REGION,
  });
}
```

加一行 `export const runtime = "edge"` 就行。适合对延迟敏感的场景，如 A/B 测试、地理位置路由、认证检查等。

### Preview Deployments：每个 PR 都有独立预览

这是 Vercel 最受欢迎的功能之一。每次你创建 Pull Request，Vercel 自动构建并部署一个独立的预览版本，生成唯一的 URL。

- 团队成员可以直接在预览链接上测试
- 每个 PR 都有独立环境，互不干扰
- PR 合并后预览自动清理

### Vercel AI SDK：快速构建 AI 应用

Vercel 提供了一套开源的 AI SDK，让你快速构建 AI 聊天、文本生成等应用：

```typescript
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

支持 OpenAI、Anthropic、Google 等多个模型提供商，统一的 API 接口，内置流式输出支持。

---

## 快速上手：3 分钟部署你的第一个项目

### 方式一：从模板开始（最简单）

1. 访问 [vercel.com/templates](https://vercel.com/templates)
2. 选择一个模板（推荐 Next.js Starter）
3. 点击 Deploy，授权 GitHub
4. 等待 1 分钟，网站就上线了

### 方式二：部署现有项目

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目目录下运行
vercel

# 按提示操作，几个回车就部署完了
```

或者直接在 [vercel.com/new](https://vercel.com/new) 导入你的 GitHub 仓库。

### 方式三：使用 Next.js 创建新项目

```bash
npx create-next-app@latest my-app
cd my-app
vercel
```

---

## 一个实际的例子：AI 聊天应用

用 Next.js + Vercel AI SDK，几十行代码就能做一个 AI 聊天应用：

**后端 API（`app/api/chat/route.ts`）：**

```typescript
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250514"),
    system: "你是一个友好的 AI 助手。",
    messages,
  });

  return result.toDataStreamResponse();
}
```

**前端页面（`app/page.tsx`）：**

```tsx
"use client";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">发送</button>
      </form>
    </div>
  );
}
```

`git push` 就上线了。整个过程不需要配置任何服务器。

---

## 适合什么场景？

**非常适合：**
- Next.js 项目（Vercel 是 Next.js 的创建者，支持最好）
- 前端项目快速部署（React、Vue、Astro、Svelte 等）
- 需要预览部署的团队协作
- AI 应用开发（内置 AI SDK 生态）
- 个人项目、作品集、博客

**不太适合：**
- 纯后端服务（没有前端的 API 项目，Workers 或传统云更合适）
- 长时间运行的任务（Serverless Functions 有执行时间限制）
- 需要精细控制基础设施的企业（Vercel 是全托管，自定义程度有限）
- 高流量且预算敏感的项目（免费版带宽有限，Pro 版 $20/月/人）

---

## 价格参考

| 项目 | Hobby（免费） | Pro（$20/月/人） |
|------|-------------|-----------------|
| 带宽 | 100 GB/月 | 1 TB/月 |
| Serverless 执行 | 100 GB-小时 | 1000 GB-小时 |
| 构建时间 | 100 小时/月 | 400 小时/月 |
| 团队成员 | 仅个人 | 无限 |
| 商业用途 | ❌ | ✅ |
| Preview 部署 | 无限 | 无限 |

> 💡 **注意**：Hobby 版仅限个人非商业用途。如果你的项目有盈利性质（哪怕是独立开发者的小产品），需要升级到 Pro。

---

## 国内可用性

- **部署和访问**：Vercel 在国内可以访问，但速度不如直连 CDN，部分地区可能偶尔不稳定
- **自定义域名**：绑定自己的域名后访问体验会好很多
- **Dashboard**：管理后台正常可用
- **CLI 部署**：`vercel` 命令在国内网络环境下通常没问题

> 💡 **加速技巧**：可以在 Cloudflare 注册域名并设置 DNS，把 Vercel 部署的站点通过 Cloudflare CDN 加速，结合两者优势。

---

## 和 AI 编程工具搭配使用

Vercel 和 AI 编程工具的组合非常高效：

- **用 [Cursor](/zh/tool/cursor) 写 Next.js** → `git push` 自动部署到 Vercel
- **用 [Claude Code](/zh/tool/claude-code) 生成全栈应用** → Vercel 一键上线
- **用 [Windsurf](/zh/tool/windsurf) 迭代 UI** → 每个 PR 都有预览链接，即时查看效果

AI 帮你写代码，Vercel 帮你发布代码——开发者体验的黄金组合。

---

## 常见问题

### Q：Vercel 和 Netlify 有什么区别？

两者定位类似，都是前端部署平台。Vercel 对 Next.js 的支持最好（毕竟是自家框架），Serverless Functions 和 Edge Runtime 也更成熟。Netlify 的优势在于表单处理和 CMS 集成。如果你用 Next.js，选 Vercel；用其他框架，两者都不错。

### Q：Vercel 只能部署 Next.js 吗？

不是。Vercel 支持 30+ 种框架，包括 React、Vue、Astro、Svelte、Nuxt、Hugo、Jekyll 等。只是对 Next.js 的支持最深度和完善。

### Q：免费版够个人项目用吗？

大多数情况下够用。100 GB 带宽对于个人博客或小型应用绑绑有余。但注意 Hobby 版不允许商业用途，如果你的项目产生收入，需要升级到 Pro（$20/月）。

### Q：我的项目需要数据库，Vercel 有方案吗？

Vercel 提供 Vercel Postgres（基于 Neon）、Vercel KV（基于 Upstash Redis）和 Vercel Blob（文件存储）。但免费额度较小，如果需要更完整的后端即服务，推荐搭配 Supabase。

### Q：环境变量怎么管理？

在 Vercel Dashboard → Project Settings → Environment Variables 中添加。支持按环境区分（Production / Preview / Development），在代码中通过 `process.env.XXX` 读取。
