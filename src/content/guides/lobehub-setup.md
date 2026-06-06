---
title: "LobeHub 配置指南：用 Agent 市场组装你的 AI 团队（2026）"
description: "LobeHub 是体量最大的开源 Agent 协作平台（73K+ stars），核心是 Agent Marketplace + Agent Groups。本文 15 分钟带你跑通：Docker Compose 自部署 → 配置 LLM API Key → 从 273K+ Skills / 51K+ MCP 市场挑选组件 → 用 Agent Group 自动组队完成复杂任务。"
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["lobehub", "agent-platform", "agent-collaboration", "self-hosted", "docker", "mcp", "setup"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "LobeHub 跟 Open WebUI / Chatbot UI 有什么区别？"
    a: |
      Open WebUI / Chatbot UI 是「聊天界面 + 模型切换器」，本质还是单 Agent 对话。
      LobeHub 是「Agent 团队的操作系统」——核心是 **Agent Marketplace + Agent Groups + Skills 市场**（273K+ Skills、51K+ MCP Servers），让多个有不同技能的 Agent 自动组队完成任务。生态体量是关键差异。
  - q: "Cloud 版和自部署版功能一样吗？"
    a: |
      核心 Agent 编排能力一致，但 Cloud 版国内访问较慢（建议自部署）。
      Cloud Pro $20/月送计算额度 + 优先模型访问；自部署版用你自己的 LLM API Key（按真实 token 计费），重度用户长期更便宜。
  - q: "需要 S3 存储吗？"
    a: |
      只有用到「文件上传 + 知识库」功能时才需要 S3 兼容存储（可以是 AWS S3 / Cloudflare R2 / MinIO 自托管）。
      纯 Agent 对话和工具调用不需要——可以先不配，要用知识库时再加。
  - q: "国内能自部署吗？"
    a: |
      可以，Docker Compose 在国内服务器直接跑没问题。
      LLM API 推荐配国内的（DeepSeek / Kimi / GLM / 方舟 Coding Plan），全链路国内闭环。注意拉镜像可以配阿里云 / 腾讯云 GHCR 镜像源加速。
---

[LobeHub](/zh/tool/lobehub) 是开源 Agent 协作平台里体量最大的（GitHub 73K+ stars），定位是「Chief Agent Operator」——通用 AI 工作平台，不只编程。核心是 **Agent Marketplace + Agent Groups 自动组队 + 273K+ Skills / 51K+ MCP Servers** 的庞大生态。本文带你 15 分钟跑通 Docker 自部署。

## 谁该看

- 已经在用 Claude / GPT，想升级到「多 Agent 团队同时干活」
- 需要超越单纯编程的 AI 工作流（写作、研究、设计、数据分析等）
- 想自部署、用自己的 LLM API Key 长期省成本
- 团队场景：希望共享 Agent 配置和 Skills

## TL;DR

```bash
# 推荐：交互式安装脚本
git clone https://github.com/lobehub/lobehub.git
cd lobehub/docker-compose
bash setup.sh    # 支持中英文交互

# Web 界面：http://localhost:3210
# 默认账号系统 + 自部署数据库
```

---

## 部署方式选择

| 方式 | 适合 | 难度 |
|---|---|---|
| **Cloud 免费版** | 想 5 分钟试用 | 极简 |
| **Cloud Pro $20/月** | 重度用户、不想运维 | 极简 |
| **Vercel 部署** | 个人轻量、有 Vercel 账号 | 简单 |
| **Docker Compose 自托管**（本文重点） | 团队、隐私敏感、长期 | 中等 |
| **完整数据库版自托管** | 企业级、需 SSO 和高级特性 | 较高 |

---

## 前置要求（Docker Compose 自部署）

- Docker + Docker Compose
- 至少一个 LLM Provider 的 API Key（OpenAI / Anthropic / Gemini / DeepSeek / 方舟 任一）
- 4GB 以上内存的服务器
- （可选）S3 兼容存储（AWS S3 / Cloudflare R2 / MinIO），仅文件/知识库功能需要

---

## 第一步：克隆并运行 setup 脚本

```bash
git clone https://github.com/lobehub/lobehub.git
cd lobehub/docker-compose
bash setup.sh
```

`setup.sh` 是**交互式向导**，会问你：

- 用 Cloudflare / 直连访问？
- 数据库用 Docker 内置 Postgres 还是外接？
- 邮件验证用 Resend 还是先跳过？
- 是否启用文件上传（需 S3）？

按提示填，脚本自动生成 `.env` 和 `docker-compose.yml`。

> 💡 **不熟悉 Docker 也能跑**：脚本支持中文交互，全程问答式，比手动配 `.env` 友好得多。

---

## 第二步：启动服务

```bash
docker compose up -d

# 查看日志，确认所有服务起来
docker compose logs -f
```

启动后访问 [http://localhost:3210](http://localhost:3210)。

---

## 第三步：配置 LLM API Key

进 Web UI 后：

1. **Settings** → **AI Providers**
2. 选你要用的 Provider（OpenAI / Anthropic / Gemini / 自定义 OpenAI 兼容 endpoint）
3. 填 API Key + Base URL（如果是国内中转，比如方舟，填 `https://ark.cn-beijing.volces.com/api/coding`）
4. 测试连接 → 保存

> ⚠️ **绝不要把 API Key 提交进 git**——`.env` 文件已在 `.gitignore`，但如果手动复制到其他配置文件需要自己检查。

---

## 第四步：从 Marketplace 挑 Agent

LobeHub 的核心优势在于**生态**。访问 **Discover → Agents**：

- 273K+ Skills（截至 2026-05）
- 51K+ MCP Servers
- Agents 涵盖编程、写作、数据分析、设计等

挑一个看上去靠谱的 Agent（比如 "Frontend Developer"），点 **Add to My Workspace**。下次开新对话时它就出现在 Agent 选择器里了。

---

## 第五步：用 Agent Group 自动组队

复杂任务（比如「开发一个登录页」）单个 Agent 搞不定时，用 **Agent Group**：

1. **My Workspace** → **New Group**
2. 描述任务目标（"做一个带表单验证的登录页"）
3. LobeHub 的 CAO（Chief Agent Operator）自动从你的 Workspace 选合适的 Agent 组合（前端 Agent + 测试 Agent + Code Review Agent）
4. Group 内多 Agent 协作，CAO 汇总最终交付

这是 LobeHub 区别于单 Agent 工具的核心能力。

---

## 持久记忆与持续学习

每个 Agent 都有自己的记忆库，自动学习你的偏好。例如：

- 第一次让 Frontend Agent 写组件，它问「用什么 CSS 方案？」你回 Tailwind
- 第二次它直接默认用 Tailwind，不再问
- 跨会话 / 跨设备同步（自部署版用你的 Postgres）

---

## 常见坑

1. **第一次跑 `setup.sh` 慢** → 镜像从 GHCR 拉，国内建议配阿里云加速：`docker pull` 前 `docker login -u <user> -p <token> ghcr.io` 走代理
2. **API Key 配了但 Agent 不回复** → 看 docker logs，常见是 Base URL 写错（OpenAI 兼容 endpoint 必须以 `/v1` 结尾或不带）
3. **多 Agent Group 模型 API 费用爆涨** → 给不同 Agent 配不同档位模型（前端用便宜的 mini，最终 review 用旗舰）
4. **Cloud Pro $20 怎么用得最值** → Pro 包含的计算额度配合官方优化路由，重度用户 ROI 比自部署高；轻度用户自部署 + 自己 BYO API 更便宜

---

## 与其他平台对比

| 对比项 | LobeHub | Slock | Multica | Orkas |
|---|---|---|---|---|
| GitHub stars | **73K+** | (闭源) | 中等 | 早期 |
| 生态 | **273K+ Skills / 51K+ MCP** | 4 runtime | 11 runtime | 4 runtime |
| 定位 | 通用 AI 工作平台 | 编程协作 | 编程协作 | 单机指挥官 |
| 学习曲线 | 较高（功能多） | 中 | 中 | 低 |

横评见 [2026 Agent 协作平台选型指南](/zh/guides/agent-collaboration-platforms-2026/)。

---

## 相关阅读

- [LobeHub 产品详情页](/zh/tool/lobehub)
- [2026 Agent 协作平台横评](/zh/guides/agent-collaboration-platforms-2026/)
- [Multica 配置指南](/zh/guides/multica-setup/)（开源编程协作平台）
- [MCP 入门](/zh/guides/mcp-intro/)（理解 LobeHub 的 51K+ MCP Servers）

> 数据核查截止 2026-05-19。生态数字来源 [LobeHub Marketplace](https://lobehub.com/skills) 与 [lobehub.com/mcp](https://lobehub.com/mcp)。
