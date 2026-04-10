---
title: "Cloudflare 开发者入门：不只是 CDN，而是你的全栈开发平台"
description: "从零了解 Cloudflare 开发者生态：Workers 无服务器函数、Pages 静态部署、D1 数据库、R2 存储、KV 缓存，帮你用最低成本把 App 跑起来。"
date: "2026-03-21"
article_type: "explainer"
tags: ["cloudflare", "部署", "入门", "全栈", "serverless"]
---

你想写一个 App，代码写完了，然后呢？需要一个地方跑后端、存数据、放文件、绑域名——这些事情加起来，比写代码本身还麻烦。

Cloudflare 就是解决这个问题的。很多人以为它只是"加速网站的 CDN"，但实际上它已经进化成了一个**完整的开发者平台**，提供从计算、存储到数据库的全套服务，而且很多都有慷慨的免费额度。

本文帮你从零了解 Cloudflare 开发者生态的核心产品，搞清楚它能帮你做什么、怎么开始用。

---

## Cloudflare 能帮开发者做什么？

| 你的需求 | Cloudflare 产品 | 免费额度 |
|---------|----------------|---------|
| 跑后端逻辑（API、Webhook） | Workers | 每天 10 万次请求 |
| 部署前端网站 | Pages | 无限站点、无限带宽 |
| 存结构化数据 | D1（SQLite 数据库） | 5 GB 存储 |
| 存文件/图片 | R2（对象存储） | 10 GB 存储、无出口流量费 |
| 缓存键值数据 | KV（键值存储） | 每天 10 万次读取 |
| 跑定时任务 | Cron Triggers | 随 Workers 免费 |
| 实时通信 | Durable Objects | 按用量计费 |

> 💡 **关键卖点**：R2 **没有出口流量费**（egress fee），这是和 AWS S3 最大的区别。对于图片、视频类应用，这能省下一大笔钱。

---

## 核心产品详解

### Workers：你的无服务器后端

Workers 是 Cloudflare 的核心。你写一个 JavaScript/TypeScript 函数，Cloudflare 把它部署到全球 300+ 个边缘节点，用户从最近的节点获得响应。

**适合做什么：**
- REST API / GraphQL 后端
- Webhook 处理（支付回调、GitHub 事件等）
- 请求转发和鉴权代理
- HTML 页面动态渲染

**一个最简单的 Worker：**

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from Cloudflare Workers!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
```

部署后你会得到一个 `https://my-worker.your-name.workers.dev` 的 URL，全球可访问。

**和传统服务器的区别：**
- 不需要买服务器、装 Nginx、配 SSL
- 不需要管理容器或 Kubernetes
- 冷启动时间 < 5ms（比 AWS Lambda 快得多）
- 按请求计费，没有请求就不花钱

### Pages：前端部署的最佳选择之一

Cloudflare Pages 可以部署任何静态网站或前端框架项目（React、Vue、Astro、Next.js 等）。

**核心优势：**
- 连接 GitHub/GitLab，push 代码自动部署
- 每个 PR 自动生成预览链接
- 无限带宽，免费 SSL
- 支持 Functions（Pages 内嵌的 Workers）

**部署流程：**
1. 登录 Cloudflare Dashboard → Pages → 创建项目
2. 连接你的 GitHub 仓库
3. 设置构建命令（如 `npm run build`）和输出目录（如 `dist`）
4. 点击部署，等待 1-2 分钟

之后每次 push 到 main 分支，网站就会自动更新。

### D1：边缘 SQLite 数据库

D1 是跑在 Cloudflare 边缘网络上的 SQLite 数据库。你不需要管理任何数据库服务器，直接写 SQL 就行。

```typescript
export default {
  async fetch(request, env) {
    const { results } = await env.DB.prepare(
      "SELECT name, email FROM users WHERE id = ?"
    ).bind(1).all();

    return Response.json(results);
  },
};
```

**特点：**
- 兼容 SQLite 语法，学习成本低
- 免费 5 GB 存储，够小项目用
- 读取速度极快（边缘就近读取）
- 支持数据库分支和时间点恢复

### R2：没有出口费的对象存储

R2 兼容 S3 API，可以存文件、图片、视频、备份等。最大的特色是**零出口流量费**——用户下载你的文件，你不需要为流量额外付钱。

```typescript
// 上传文件到 R2
await env.MY_BUCKET.put("avatar/user-123.png", imageData);

// 读取文件
const object = await env.MY_BUCKET.get("avatar/user-123.png");
```

**对比 AWS S3：**
| | R2 | S3 |
|---|---|---|
| 存储费 | $0.015/GB/月 | $0.023/GB/月 |
| 出口流量费 | **$0** | $0.09/GB |
| 免费额度 | 10 GB | 5 GB（12 个月） |

如果你的应用涉及大量文件下载（图片站、文件分享），R2 会便宜非常多。

### KV：全球分布式键值存储

KV 适合存配置、缓存、Session 等读多写少的数据：

```typescript
// 写入
await env.MY_KV.put("config:theme", "dark");

// 读取（全球就近，通常 < 10ms）
const theme = await env.MY_KV.get("config:theme");
```

---

## 快速上手：5 分钟部署你的第一个项目

### 前置要求

- Node.js 18+
- 一个 Cloudflare 账号（免费注册）

### 第一步：安装 Wrangler CLI

```bash
npm install -g wrangler
```

Wrangler 是 Cloudflare 的官方 CLI 工具，用来创建、开发、部署项目。

### 第二步：登录

```bash
wrangler login
```

会打开浏览器让你授权。

### 第三步：创建项目

```bash
npm create cloudflare@latest my-app
```

交互式菜单会让你选择模板，推荐新手选 **Hello World (TypeScript)**。

### 第四步：本地开发

```bash
cd my-app
wrangler dev
```

打开 `http://localhost:8787`，就能看到你的 Worker 在本地运行了。修改代码实时生效。

### 第五步：部署

```bash
wrangler deploy
```

几秒钟后你的应用就跑在全球 300+ 个节点上了。终端会输出你的线上 URL。

---

## 一个实际的例子：API + 数据库 + 文件存储

假设你要做一个简单的"图片分享"应用，架构可以这样搭：

```
前端（React）→ Cloudflare Pages 部署
    ↓
API（Workers）→ 处理上传、查询
    ↓
图片 → R2 存储
元数据 → D1 数据库
```

Workers 代码示例：

```typescript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("image");
      const id = crypto.randomUUID();

      // 存图片到 R2
      await env.IMAGES.put(id, file.stream());

      // 存元数据到 D1
      await env.DB.prepare(
        "INSERT INTO images (id, name, created_at) VALUES (?, ?, ?)"
      ).bind(id, file.name, new Date().toISOString()).run();

      return Response.json({ id, url: `/images/${id}` });
    }

    if (url.pathname.startsWith("/images/")) {
      const id = url.pathname.split("/")[2];
      const object = await env.IMAGES.get(id);
      if (!object) return new Response("Not found", { status: 404 });
      return new Response(object.body);
    }

    return new Response("Image Share API", { status: 200 });
  },
};
```

这就是一个完整的后端——没有服务器、没有 Nginx、没有 Docker，代码推上去就跑。

---

## 适合什么场景？

**非常适合：**
- 个人项目、Side Project、MVP 验证
- 静态网站 + 少量 API 的全栈应用
- 需要全球访问速度的应用（博客、文档站、SaaS 官网）
- 文件密集型应用（利用 R2 零出口费）
- Webhook 处理、定时任务、API 网关

**不太适合：**
- 需要长时间运行的任务（Workers 有执行时间限制，免费版 10ms CPU 时间，付费版 30s）
- 需要复杂关系型数据库的应用（D1 是 SQLite，不是 PostgreSQL）
- 需要 WebSocket 长连接的应用（需要用 Durable Objects，架构更复杂）
- 需要跑 Python/Java 后端的项目（Workers 主要支持 JavaScript/TypeScript）

---

## 价格参考

| 产品 | 免费版 | 付费版（$5/月起） |
|------|-------|-----------------|
| Workers | 10 万次/天 | 1000 万次/月 |
| Pages | 无限站点 | 无限 |
| D1 | 5 GB 存储 | 按用量 |
| R2 | 10 GB 存储 | $0.015/GB/月 |
| KV | 10 万次读/天 | 按用量 |

对于个人开发者和小项目，免费额度通常完全够用。Workers 付费版 $5/月起（Paid Plan），解锁更高配额和更长的 CPU 执行时间。

---

## 国内可用性

Cloudflare 的服务在国内**可以直接使用**，但有几点需要注意：

- **Workers/Pages 域名**：`*.workers.dev` 和 `*.pages.dev` 在国内访问速度一般，建议绑定自己的域名并启用 Cloudflare 代理
- **Dashboard**：管理后台访问正常，偶尔有网络波动
- **Wrangler CLI**：部署时需要连接 Cloudflare API，网络通常没问题
- **域名备案**：如果绑定 `.cn` 域名或使用国内服务器，需要备案；使用 Cloudflare 自有节点则不需要

> 💡 **建议**：绑定一个自己的域名（在 Cloudflare 注册域名还免费，不收额外费用），通过 Cloudflare 的全球网络加速，国内访问体验会好很多。

---

## 和 AI 编程工具搭配使用

Cloudflare 和 AI 编程工具是天然搭档：

- **用 [Cursor](/zh/tool/cursor)、[Windsurf](/zh/tool/windsurf) 写代码** → 用 Pages 一键部署前端
- **用 [Claude Code](/zh/tool/claude-code) 生成 Worker** → `wrangler deploy` 一行命令上线
- **用 [Cline](/zh/tool/cline) 搭建全栈项目** → Workers + D1 + R2 组成完整后端

AI 帮你写代码，Cloudflare 帮你跑代码——从想法到上线，整个链路可以非常短。

---

## 常见问题

### Q：Cloudflare Workers 和 Vercel Serverless Functions 有什么区别？

Workers 使用 V8 隔离（不是容器），冷启动极快（< 5ms）。Vercel Functions 基于 AWS Lambda，功能更全但冷启动更慢。Workers 的免费额度更大（10 万次/天 vs Vercel 的受限额度），但运行环境不是完整的 Node.js，部分 Node.js API 不可用。

### Q：我已经在用 Vercel 部署前端了，还需要 Cloudflare 吗？

可以搭配使用。比如前端用 Vercel 部署，但用 Cloudflare R2 存文件（省流量费），用 Cloudflare 做 DNS 和 CDN 加速。

### Q：Workers 支持什么语言？

主要是 JavaScript 和 TypeScript。也支持通过 WebAssembly 运行 Rust、C、C++ 等编译型语言。不直接支持 Python 或 Java。

### Q：D1 数据库靠谱吗？能用在生产环境吗？

D1 已经 GA（正式发布），适合中小型项目。但它本质是 SQLite，不支持复杂的事务和并发写入场景。如果需要 PostgreSQL 级别的能力，可以考虑 Supabase 或 Neon。

### Q：免费额度用完了会怎样？

不会自动扣费。请求会返回错误，你需要升级到付费版才能恢复服务。可以在 Dashboard 设置用量告警。
