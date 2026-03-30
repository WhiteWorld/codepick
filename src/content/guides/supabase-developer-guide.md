---
title: "Supabase 开发者入门：开源的 Firebase 替代品，你的后端即服务平台"
description: "从零了解 Supabase：PostgreSQL 数据库、认证系统、文件存储、实时订阅、Edge Functions，帮独立开发者快速搭建完整后端。"
date: "2026-03-21"
tags: ["supabase", "后端", "入门", "数据库", "BaaS"]
---

你想做一个 App，前端用 React 或 Next.js 写好了，但后端呢？用户登录、数据存储、文件上传、实时通知——每一个都是一个独立的系统，从零搭建要花大量时间。

Supabase 帮你解决这些问题。它是一个**开源的后端即服务（BaaS）平台**，提供数据库、认证、存储、实时订阅等开箱即用的功能。你只需要调 API，后端就有了。

很多人拿它和 Firebase 对比，但 Supabase 有一个关键区别：它底层用的是 **PostgreSQL**——一个真正的关系型数据库，而不是 Firebase 的 NoSQL。这意味着你可以写 SQL、做 JOIN 查询、用外键约束，数据建模更自然。

---

## Supabase 能帮开发者做什么？

| 你的需求 | Supabase 功能 | 免费额度 |
|---------|-------------|---------|
| 存数据 | PostgreSQL 数据库 | 500 MB 存储 |
| 用户登录注册 | Auth（认证系统） | 5 万月活用户 |
| 存文件/图片 | Storage（对象存储） | 1 GB |
| 实时数据同步 | Realtime（WebSocket） | 200 并发连接 |
| 跑后端逻辑 | Edge Functions（Deno） | 500K 次调用/月 |
| 自动生成 API | PostgREST | 随数据库免费 |
| 向量搜索 | pgvector 扩展 | 随数据库免费 |

> 💡 **关键卖点**：Supabase 是**完全开源**的。如果不想用他们的托管服务，你可以自己部署一套——数据完全在自己手里。

---

## 核心功能详解

### PostgreSQL 数据库：真正的关系型数据库

Supabase 给你一个完整的 PostgreSQL 数据库实例，不是阉割版，支持所有 PostgreSQL 特性：

```sql
-- 创建表
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用行级安全策略（RLS）
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 只有作者能编辑自己的文章
CREATE POLICY "Users can edit own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);
```

**特点：**
- 完整的 SQL 支持，JOIN、子查询、窗口函数都能用
- 内置行级安全（RLS），直接在数据库层控制权限
- 支持 40+ PostgreSQL 扩展（pgvector、PostGIS、pg_cron 等）
- 可视化 Table Editor，不写代码也能管理数据

**在前端直接操作数据库：**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 查询
const { data: posts } = await supabase
  .from("posts")
  .select("*, author:auth.users(email)")
  .order("created_at", { ascending: false })
  .limit(10);

// 插入
await supabase.from("posts").insert({
  title: "我的第一篇文章",
  content: "Hello Supabase!",
});
```

注意：前端直连数据库听起来不安全，但 Supabase 通过**行级安全策略（RLS）**保护数据——只有符合策略的操作才能执行。

### Auth：开箱即用的认证系统

Supabase Auth 支持多种登录方式，几行代码就能搞定：

```typescript
// 邮箱密码注册
await supabase.auth.signUp({
  email: "user@example.com",
  password: "securepassword",
});

// 邮箱密码登录
await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "securepassword",
});

// GitHub OAuth 登录
await supabase.auth.signInWithOAuth({
  provider: "github",
});

// 获取当前用户
const { data: { user } } = await supabase.auth.getUser();
```

**支持的登录方式：**
- 邮箱 + 密码
- 魔法链接（Magic Link）
- OAuth（GitHub、Google、Apple、微信等 20+ 提供商）
- 手机号 + 验证码（需配置 SMS 服务）

### Storage：文件存储

Supabase Storage 用来存文件、图片、视频等，支持权限控制：

```typescript
// 上传文件
await supabase.storage
  .from("avatars")
  .upload("user-123/avatar.png", file);

// 获取公开 URL
const { data } = supabase.storage
  .from("avatars")
  .getPublicUrl("user-123/avatar.png");

// 生成带签名的私有链接（1 小时有效）
const { data } = await supabase.storage
  .from("documents")
  .createSignedUrl("secret.pdf", 3600);
```

可以设置 Bucket 为公开或私有，私有文件需要通过签名 URL 访问。

### Realtime：实时数据同步

Supabase 提供基于 WebSocket 的实时订阅，数据库变化会实时推送给前端：

```typescript
// 监听 posts 表的所有变化
const channel = supabase
  .channel("posts-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => {
      console.log("数据变化：", payload);
    }
  )
  .subscribe();
```

适合做聊天应用、协作编辑、实时仪表盘等场景。

### Edge Functions：自定义后端逻辑

当你需要的逻辑无法通过数据库查询实现时（比如调用第三方 API、发送邮件、处理支付），可以用 Edge Functions：

```typescript
// supabase/functions/send-welcome-email/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { email, name } = await req.json();

  // 调用邮件服务 API
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "hello@myapp.com",
      to: email,
      subject: `欢迎加入，${name}！`,
      html: `<p>感谢注册我们的服务。</p>`,
    }),
  });

  return new Response(JSON.stringify({ success: true }));
});
```

Edge Functions 基于 Deno 运行时，部署在全球边缘节点。

---

## 快速上手：10 分钟搭建一个待办事项 App 的后端

### 第一步：创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)，注册账号
2. 点击 New Project，选择地区（推荐选离用户近的）
3. 设置数据库密码，等待 1-2 分钟创建完成

### 第二步：创建数据表

在 Supabase Dashboard 的 Table Editor 中，创建 `todos` 表：

```sql
CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  is_done BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 用户只能看自己的待办
CREATE POLICY "Users see own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

-- 用户只能创建自己的待办
CREATE POLICY "Users create own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户只能更新自己的待办
CREATE POLICY "Users update own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);
```

### 第三步：在前端使用

```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xxx.supabase.co",
  "your-anon-key"
);

// 获取待办列表
const { data: todos } = await supabase
  .from("todos")
  .select("*")
  .order("created_at", { ascending: false });

// 添加待办
await supabase.from("todos").insert({ title: "学习 Supabase" });

// 标记完成
await supabase
  .from("todos")
  .update({ is_done: true })
  .eq("id", todoId);
```

从创建项目到前端能增删改查数据，整个过程不超过 10 分钟，不需要写任何后端代码。

---

## 适合什么场景？

**非常适合：**
- 独立开发者的全栈项目（一个人搞定前后端）
- 需要用户系统的应用（Auth 开箱即用）
- 需要实时功能的应用（聊天、协作、通知）
- MVP 快速验证（几小时就能搭出完整后端）
- 需要关系型数据库但不想管服务器

**不太适合：**
- 超大规模应用（免费版有连接数和存储限制）
- 需要复杂后端逻辑的项目（Edge Functions 功能有限，不如自建后端灵活）
- 对数据库有极致性能要求的场景（托管服务有网络延迟）
- 已有成熟后端架构的团队（迁移成本高）

---

## 价格参考

| 项目 | Free | Pro（$25/月） |
|------|------|-------------|
| 数据库存储 | 500 MB | 8 GB |
| 文件存储 | 1 GB | 100 GB |
| 带宽 | 5 GB | 250 GB |
| Edge Functions | 500K 次/月 | 2M 次/月 |
| 月活用户 | 50,000 | 100,000 |
| 实时并发连接 | 200 | 500 |
| 数据库数量 | 2 个项目 | 无限 |

> 💡 **提示**：免费版的 500 MB 数据库和 50K 月活用户对于 MVP 和小项目完全够用。Pro 版 $25/月解锁更大的容量和每日自动备份。

---

## 国内可用性

- **Dashboard**：管理后台在国内可正常访问
- **API 访问**：Supabase 的 API 端点在国内可以连通，但延迟较高（服务器在海外）
- **SDK 安装**：npm 安装正常
- **数据库直连**：可以通过 PostgreSQL 连接串直连，但受网络影响

> 💡 **建议**：如果你的用户主要在国内，可以考虑在应用层做缓存减少 API 调用次数。对于延迟敏感的场景，也可以考虑国内的替代方案（如阿里云 RDS + 自建 Auth），但开发效率会低很多。

---

## 和 AI 编程工具搭配使用

Supabase 和 AI 编程工具搭配效果特别好，因为 Supabase 的 API 非常规范，AI 工具生成的代码质量很高：

- **用 [Cursor](/zh/tool/cursor) 写全栈应用** → Supabase 提供完整后端，Cursor 自动补全 Supabase SDK 调用
- **用 [Claude Code](/zh/tool/claude-code) 设计数据库** → 让 AI 帮你写 SQL Schema、RLS 策略
- **用 [Cline](/zh/tool/cline) 搭建项目** → 从数据库设计到前端 CRUD 一气呵成

AI 帮你写代码，Supabase 帮你搞定后端——独立开发者的效率倍增器。

---

## 常见问题

### Q：Supabase 和 Firebase 怎么选？

最大的区别是数据库：Supabase 用 PostgreSQL（关系型），Firebase 用 Firestore（NoSQL）。如果你的数据有复杂的关系（用户 → 文章 → 评论），Supabase 更合适；如果是简单的文档型数据且需要极致的实时性，Firebase 也不错。另外 Supabase 是开源的，Firebase 是 Google 闭源服务。

### Q：Supabase 是免费的吗？

免费版可以创建 2 个项目，包含 500 MB 数据库、1 GB 文件存储、50K 月活用户。对于学习和 MVP 完全够用。需要更多资源时升级到 Pro（$25/月）。

### Q：我可以自己部署 Supabase 吗？

可以。Supabase 完全开源，你可以用 Docker 在自己的服务器上部署。官方提供了 [docker-compose 模板](https://github.com/supabase/supabase/tree/master/docker)。不过自部署需要自己管理数据库备份、更新等运维工作。

### Q：Row Level Security（RLS）难学吗？

RLS 的概念很简单：给每张表设置规则，控制谁能读、写、改、删。写法就是标准的 SQL WHERE 条件。初学者建议先用 Supabase 的 RLS 编辑器（可视化界面），熟悉后再写 SQL 策略。

### Q：Supabase 和 Vercel 能搭配用吗？

非常适合搭配。Next.js 部署在 Vercel，后端用 Supabase，是独立开发者最流行的全栈技术组合之一。Vercel 也提供了官方的 Supabase 集成模板。
