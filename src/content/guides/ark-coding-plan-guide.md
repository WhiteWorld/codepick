---
title: "火山方舟 Coding Plan 省钱指南：¥9.9 用上国产编程 API"
description: "火山方舟 Coding Plan 是目前国内最便宜的 AI 编程 API 套餐（¥9.9/月起）。本文拆解 Lite/Pro 套餐、Auto 模式、支持的客户端，以及如何用最低成本上手。"
date: "2026-05-17"
article_type: "explainer"
tags: ["火山方舟", "coding-plan", "ark", "字节跳动", "api", "cline", "claude code"]
---

火山方舟 Coding Plan 是字节跳动旗下的 AI 编程 API 套餐，**¥9.9/月起，无需代理**，支持支付宝/微信支付。国内开发者接入 AI 编程成本最低的方案之一。

## 套餐详解

| 项目 | Lite | Pro |
|------|------|-----|
| 月费 | **¥9.9**（原价 ¥40） | ¥49.9（原价 ¥200） |
| 每 5 小时额度 | ~1,200 次请求 | ~6,000 次请求 |
| Auto 模式 | ✅ | ✅ |
| 入坑门槛 | 极低 | 中等 |

- 额度按 5 小时**滑动窗口**计算（不是自然月），适合日常持续使用
- 用完当前窗口即停止，等时间滑过自动恢复
- **新用户订阅每日 10:30 限量开放**（2026-03-13 起），建议准时蹲点
- 推荐好友双方各享折扣；推荐人获订单 10% 优惠券（无上限）

> ⚠️ 活动价和原价以官网实时页面为准，价格变化很快。

## 支持模型（5 款）

| 模型 | 来源 |
|------|------|
| Doubao-Seed-Code | 字节自研编程模型 |
| GLM-4.7 | 智谱 AI |
| DeepSeek-V3.2 | DeepSeek |
| Kimi-K2.5 | Moonshot |
| Kimi-K2-Thinking | Moonshot（推理模型） |

**Auto 模式**可根据任务复杂度自动匹配模型——简单任务走轻量模型省额度，复杂任务切旗舰模型。

## 支持的客户端（11 款）

Claude Code、Cursor、Cline、Codex CLI、Kilo Code、Roo Code、OpenCode、Trae、Kilo CLI、OpenClaw、Moltbot。

火山方舟兼容 **OpenAI + Anthropic 双协议**，覆盖市面上几乎所有主流 AI 编程客户端。Claude Code 用户可直接通过 Anthropic 协议原生接入。

## 配置示例：Cline + 方舟（最推荐）

1. **蹲点订阅**：访问 [火山方舟 Coding Plan](https://www.volcengine.com/L/s3lNTNYxaEc/)，每日 10:30 开放新用户入口
2. **获取 API Key**：火山引擎控制台 → API 密钥管理
3. **配置 Cline**：
   - API Provider：`OpenAI Compatible`
   - Base URL：`https://ark.cn-beijing.volces.com/api/coding`
   - API Key：你的方舟 Key
   - Model：`doubao-seed-code-preview-latest` 或开启 Auto 模式

详见 [Cline + 方舟方案](/zh/plan/cline-ark)。

## 配置示例：Claude Code + 方舟

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding/anthropic"
export ANTHROPIC_API_KEY="你的方舟API_Key"
claude
```

方舟支持 Anthropic 协议，Claude Code 配置只需两个环境变量。

## 省钱技巧

1. **选 Lite 起步**（¥9.9）：日常轻度 Coding 够用，不够再升 Pro
2. **利用 Auto 模式**：简单任务自动走轻量模型，省额度
3. **推荐好友**：双方各得优惠，推荐越多省越多
4. **每日 10:30 蹲点**：新用户入口在此时刻开放
5. **首购三个月 Pro**：一次性下单三个月可享 5 折

## 百炼对比速览

| 维度 | 火山方舟 | 百炼 |
|------|----------|------|
| 起订价 | ¥9.9/月 | ¥200/月 |
| 额度 | 5 小时滑动窗口 | 自然月总计 |
| 模型数 | 5 | 8 |
| Auto | ✅ | ❌ |
| 子账号 | ✅ | ❌ |

详细对比：[百炼 vs 火山方舟 Coding Plan](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)。

## 适合谁

- ✅ 预算有限的个人开发者（¥9.9 起）
- ✅ 日常持续编码、不喜欢月底额度告急
- ✅ 想用多款国产模型、不想被千问锁死
- ✅ Claude Code 用户的国内中转方案
- ✅ 团队/子账号场景
- ❌ 需要偶发高强度使用（月计额度更适合，方舟 5 小时窗口会卡）

## 相关文章

- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + 方舟方案](/zh/plan/cline-ark)
- [Cline + 方舟配置指南](/zh/guides/cline-ark-setup)
- [百炼 Coding Plan 完整攻略](/zh/guides/bailian-coding-plan)

> 数据来源：火山方舟官方文档（2026-05）。价格、活动、新用户入口以官网实时信息为准。
