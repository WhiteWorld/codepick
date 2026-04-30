---
title: "Supabase vs Firebase：后端即服务平台深度对比"
description: "从数据库类型、认证系统、实时能力、定价模型、开源程度、国内可用性等维度，全面对比 Supabase 和 Firebase，帮开发者选出最合适的 BaaS 方案。"
date: "2026-03-21"
tags: ["supabase", "firebase", "对比", "后端", "BaaS"]
---

Supabase 和 Firebase 是目前最流行的两个后端即服务（BaaS）平台。Firebase 是 Google 的老牌产品，生态成熟；Supabase 是后起之秀，以"开源的 Firebase 替代品"为定位迅速崛起。

两者都能让你**不写后端代码就搭出完整应用**，但底层架构和设计哲学完全不同。本文帮你搞清楚该选哪个。

## 一句话总结

- **Supabase**：基于 PostgreSQL 的关系型数据库，开源可自部署，SQL 能力强，适合数据关系复杂的应用
- **Firebase**：Google 生态的 NoSQL 方案，实时能力极强，移动端 SDK 最成熟，适合需要极致实时体验的应用

---

## 核心架构对比

| | Supabase | Firebase |
|---|---|---|
| **数据库类型** | PostgreSQL（关系型） | Firestore / RTDB（NoSQL） |
| **查询语言** | SQL | Firebase SDK 方法链 |
| **开源** | ✅ 完全开源（可自部署） | ❌ Google 闭源服务 |
| **厂商锁定** | 低（标准 PostgreSQL） | 高（Google 专有格式） |
| **数据导出** | 标准 pg_dump | 有限（需 Admin SDK） |

这是最根本的差异。Supabase 用的是 **PostgreSQL**——全球最流行的关系型数据库，你的 SQL 知识可以直接用。Firebase 用的是 **Firestore**——Google 自研的文档型 NoSQL 数据库，需要学习特定的查询方式。

---

## 数据库能力对比

### 数据建模

**Supabase（SQL / 关系型）：**

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- 文章表，通过外键关联用户
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 一条 SQL 查出文章和作者信息
SELECT p.title, p.content, u.name AS author
FROM posts p
JOIN users u ON p.author_id = u.id
WHERE p.created_at > '2026-01-01';
```

**Firebase（NoSQL / 文档型）：**

```javascript
// 文章集合中嵌入作者信息（反范式化）
const postRef = doc(db, "posts", postId);
await setDoc(postRef, {
  title: "我的文章",
  content: "...",
  author: {
    id: userId,
    name: "张三",  // 需要手动同步
  },
  createdAt: serverTimestamp(),
});

// 查询需要手动组合数据
const postsSnapshot = await getDocs(
  query(collection(db, "posts"), where("createdAt", ">", startDate))
);
// 如果需要最新的作者信息，还需要额外查一次 users 集合
```

**关键区别：**

| | Supabase | Firebase |
|---|---|---|
| JOIN 查询 | ✅ 原生 SQL JOIN | ❌ 需要多次查询或反范式化 |
| 外键约束 | ✅ | ❌ 需要应用层保证 |
| 事务 | ✅ 完整 ACID | ⚠️ 有限（批量写入） |
| 聚合查询 | ✅ SUM/AVG/COUNT 等 | ⚠️ 有限，需额外索引 |
| 全文搜索 | ✅ tsvector | ❌ 需要 Algolia 等第三方 |
| 数据迁移 | 标准 SQL 迁移 | 手动脚本 |

> 💡 **选择建议**：如果你的数据有复杂的关系（用户 → 文章 → 评论 → 点赞），Supabase 的 SQL JOIN 会让你的开发效率高很多。如果数据是扁平的文档结构（如聊天消息、日志），Firebase 更直观。

---

## 认证系统对比

| | Supabase Auth | Firebase Auth |
|---|---|---|
| 邮箱 + 密码 | ✅ | ✅ |
| Magic Link | ✅ | ❌（需自建） |
| OAuth 提供商 | 20+ | 10+ |
| 手机号登录 | ✅（需配 SMS） | ✅ 内置 |
| 匿名登录 | ✅ | ✅ |
| 多因子认证 | ✅ | ✅ |
| 自定义 Claims | ✅ | ✅ |
| 用户管理 UI | ✅ Dashboard | ✅ Console |

两者的认证系统都足够好用。Firebase Auth 的手机号登录体验更开箱即用（内置 reCAPTCHA），Supabase 需要自己配置 SMS 服务（如 Twilio 或阿里云短信）。

---

## 实时能力对比

| | Supabase Realtime | Firebase Realtime |
|---|---|---|
| **技术** | WebSocket + PostgreSQL CDC | WebSocket（原生） |
| **实时粒度** | 表级/行级变更监听 | 文档级/集合级监听 |
| **离线支持** | ❌ 需自行实现 | ✅ **内置离线缓存** |
| **乐观更新** | 需手动实现 | ✅ SDK 内置 |
| **延迟** | 低（WebSocket） | 极低（专门优化） |
| **适合场景** | 数据库变更通知 | 实时协作、聊天 |

**Firebase 的实时能力是其最大优势。** Firestore 的离线缓存和乐观更新是杀手锏——用户断网后 App 仍然可用，恢复网络后自动同步。这对移动端应用（尤其是网络不稳定的场景）极其重要。

Supabase 的 Realtime 基于 PostgreSQL 的 Change Data Capture（CDC），功能上够用，但没有内置离线支持，需要开发者自行处理。

---

## Serverless Functions 对比

| | Supabase Edge Functions | Firebase Cloud Functions |
|---|---|---|
| **运行时** | Deno | Node.js |
| **部署位置** | 全球边缘 | 指定区域 |
| **冷启动** | 50–200ms | 500ms–2s |
| **语言** | TypeScript/JavaScript | JavaScript/TypeScript/Python |
| **触发方式** | HTTP 请求 | HTTP / Firestore 触发器 / Pub/Sub / Auth 触发器 |
| **免费额度** | 500K 次/月 | 200 万次/月 |

Firebase Cloud Functions 支持更丰富的**事件触发器**——当文档创建、用户注册、文件上传时自动执行。这在很多场景下非常方便（如注册后自动发欢迎邮件）。

Supabase Edge Functions 的优势在于边缘部署和更快的冷启动，但触发方式只有 HTTP 请求，数据库触发需要通过 PostgreSQL 的触发器 + Webhook 实现。

---

## 文件存储对比

| | Supabase Storage | Firebase Storage (Cloud Storage) |
|---|---|---|
| **底层** | S3 兼容 | Google Cloud Storage |
| **免费额度** | 1 GB | 5 GB |
| **访问控制** | Bucket 策略 + RLS | Security Rules |
| **图片处理** | ✅ 内置变换（缩放、裁剪） | ❌ 需要 Firebase Extensions |
| **CDN** | 需搭配 Cloudflare 等 | ✅ 内置 CDN |
| **客户端上传** | ✅ | ✅ |

Firebase Storage 的免费额度更大（5 GB vs 1 GB），且内置 CDN。Supabase Storage 胜在内置图片变换能力。

---

## 定价模型对比

| | Supabase Free | Firebase Spark (Free) |
|---|---|---|
| **数据库** | 500 MB | 1 GB (Firestore) |
| **文件存储** | 1 GB | 5 GB |
| **认证用户** | 50K 月活 | 无限（大部分方法） |
| **Serverless** | 500K 次/月 | 200 万次/月 |
| **实时连接** | 200 并发 | 100 并发（RTDB） |
| **项目数** | 2 个 | 无限 |

| | Supabase Pro ($25/月) | Firebase Blaze (按用量) |
|---|---|---|
| **数据库** | 8 GB | 按用量计费 |
| **文件存储** | 100 GB | 按用量计费 |
| **计费模型** | 固定月费 + 超量按用量 | 纯按用量 |
| **可预测性** | ⭐⭐⭐⭐ 容易预算 | ⭐⭐ 可能有惊喜账单 |

> 💡 **定价陷阱**：Firebase 的 Blaze 计划是纯按用量计费，如果你的应用突然流量暴涨（比如上了热搜），账单可能吓你一跳。Supabase Pro 是固定 $25/月基础费 + 超量部分按用量，费用更可预测。Firebase 有预算告警功能，建议一定要设置。

---

## SDK 和客户端支持

| | Supabase | Firebase |
|---|---|---|
| **Web (JS/TS)** | ✅ | ✅ |
| **React Native** | ✅ | ✅ |
| **Flutter** | ✅ | ✅ **最完善** |
| **Swift (iOS)** | ✅ | ✅ **最完善** |
| **Kotlin (Android)** | ✅ | ✅ **最完善** |
| **Unity** | 社区库 | ✅ 官方支持 |
| **后端 Admin SDK** | ✅（或直连 PostgreSQL） | ✅ |

Firebase 在**移动端 SDK** 方面更成熟——毕竟它最初就是为移动开发设计的。iOS、Android、Flutter 的 Firebase SDK 文档和社区都更丰富。

Supabase 的 SDK 近年进步很快，Web 端体验已经非常好，但移动端的生态成熟度还不及 Firebase。

---

## 开发者体验对比

### 管理后台

- **Supabase Dashboard**：可视化 Table Editor（像 Excel 一样编辑数据）、SQL 编辑器、实时日志、RLS 策略编辑器。对 SQL 开发者非常友好。
- **Firebase Console**：Firestore 数据浏览器、Analytics 仪表盘、Crashlytics 集成、A/B Testing。移动端开发者的一站式后台。

### 本地开发

- **Supabase**：`supabase start` 启动本地完整环境（PostgreSQL + Auth + Storage + Edge Functions），Docker 驱动
- **Firebase**：`firebase emulators:start` 启动本地模拟器（Firestore + Auth + Functions + Storage）

两者的本地开发体验都不错。

---

## 国内可用性对比

| | Supabase | Firebase |
|---|---|---|
| **Dashboard 访问** | ✅ 正常 | ⚠️ 需要代理 |
| **SDK API 调用** | ✅ 可用（有延迟） | ❌ 大部分服务被屏蔽 |
| **CLI 工具** | ✅ 正常 | ⚠️ 部分受限 |
| **推送通知** | 非内置 | ❌ FCM 不可用 |

> ⚠️ **Firebase 在国内基本不可用。** Firebase 大部分服务（Firestore、Auth、Cloud Functions、FCM 推送）依赖 Google Cloud 基础设施，在国内无法直接使用。如果你的用户主要在国内，Firebase 不是一个现实的选择。

**Supabase 在国内虽然有延迟，但可以正常使用。** 这是很多国内开发者选择 Supabase 而非 Firebase 的重要原因。

---

## 生态和扩展对比

### Firebase 独有的服务

Firebase 不只是 BaaS，它是一个完整的移动开发平台：

- **Analytics**：应用分析（免费）
- **Crashlytics**：崩溃报告
- **Performance Monitoring**：性能监控
- **Remote Config**：远程配置（A/B 测试）
- **App Distribution**：测试版分发
- **Cloud Messaging (FCM)**：推送通知
- **Dynamic Links**：智能链接

如果你做的是移动 App，Firebase 的这些配套服务非常有价值。

### Supabase 独有的能力

- **pgvector**：向量搜索（AI 应用的语义搜索）
- **PostGIS**：地理空间查询
- **pg_cron**：定时任务
- **完全可自部署**：Docker 一键部署到自己的服务器
- **数据库分支**：开发环境独立数据库
- **标准 SQL 迁移**：与任何 PostgreSQL 工具兼容

---

## 迁移难度

| 方向 | 难度 | 说明 |
|------|------|------|
| Firebase → Supabase | ⭐⭐⭐ 中等 | 数据模型需要从 NoSQL 重构为关系型；认证可迁移；Supabase 提供了迁移指南 |
| Supabase → Firebase | ⭐⭐⭐ 中等 | 数据模型需要反范式化；SQL 查询需要重写为 SDK 调用 |
| Supabase → 自建 PostgreSQL | ⭐ 简单 | 标准 pg_dump / pg_restore，几乎零成本 |
| Firebase → 其他 | ⭐⭐⭐⭐ 困难 | 厂商锁定较深，数据导出格式受限 |

> 💡 **厂商锁定**是选择时要重点考虑的因素。Supabase 底层是标准 PostgreSQL，任何时候都能迁移到其他 PostgreSQL 服务（如 Neon、Railway、自建）。Firebase 的数据格式是 Google 专有的，迁出成本高。

---

## 和 AI 编程工具搭配

| | Supabase | Firebase |
|---|---|---|
| AI 生成代码质量 | ⭐⭐⭐⭐⭐ SQL 标准化，生成质量高 | ⭐⭐⭐⭐ SDK 特有语法，偶尔出错 |
| AI 工具支持 | [Cursor](/zh/tool/cursor)、[Claude Code](/zh/tool/claude-code) 等都很擅长生成 Supabase 代码 | AI 工具也能生成 Firebase 代码，但版本迁移（v8 → v9）时容易混淆 |

Supabase 使用标准 SQL，AI 工具对 SQL 的理解最为准确，生成的 Schema、RLS 策略、查询语句质量很高。Firebase 的 SDK 有版本差异（模块化 v9 vs 传统 v8），AI 工具偶尔会生成过时语法。

---

## 总结：怎么选？

| 你的情况 | 推荐 |
|---------|------|
| Web 应用，数据关系复杂 | **Supabase** |
| 移动 App（iOS/Android） | **Firebase**（SDK 更成熟） |
| 需要实时 + 离线支持 | **Firebase**（内置离线缓存） |
| 国内用户 | **Supabase**（Firebase 不可用） |
| 在意厂商锁定 | **Supabase**（标准 PostgreSQL） |
| 想要可预测的账单 | **Supabase**（固定月费） |
| 需要 Analytics + 推送 | **Firebase**（配套服务完善） |
| 想要开源可自部署 | **Supabase** |
| 团队已经用 Google Cloud | **Firebase** |
| 需要向量搜索/AI 应用 | **Supabase**（pgvector） |

**最终建议**：如果你主要做 Web 应用、用户在国内、或者在意数据主权和厂商锁定，选 **Supabase**。如果你做移动 App、需要极致的实时和离线体验、团队在 Google 生态中，选 **Firebase**。
