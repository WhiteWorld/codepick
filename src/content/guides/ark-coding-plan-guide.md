---
title: "火山方舟 Coding Plan 完整指南：Lite ¥40/月（首月 ¥9.9）"
description: "火山方舟 Coding Plan 是国内最便宜的 AI 编程 API 套餐之一：Lite 标准月费 ¥40（首月 ¥9.9，叠加邀请券低至 ¥8.9），Pro ¥200/月（首月 ¥49.9）。本文拆解套餐机制、续费规则、Auto 模式、支持的客户端，以及如何用最低成本上手。"
date: "2026-05-17"
updated_at: "2026-05-19"
article_type: "explainer"
tags: ["火山方舟", "coding-plan", "字节跳动", "api", "cline", "claude-code", "roo-code", "opencode", "trae"]
faq:
  - q: "Lite 真的只要 ¥9.9 一个月吗？续费是多少？"
    a: |
      ¥9.9 是 **Lite 首月优惠价**（2.5 折），叠加邀请券可低至 ¥8.9。
      **续费回到 ¥40/月标准价**。Pro 类似——首月 ¥49.9，续费 ¥200。Pro 首购下单三个月一次性可享 5 折，平均 ¥100/月。
  - q: "Lite ¥40 和 Pro ¥200 怎么选？"
    a: |
      日常持续敲代码、不开多个并发 Agent，Lite 够用（5h 滑动窗口约 1,200 次请求）。
      跑长流程 Agent、多文件编辑或同时开多客户端，建议直接 Pro（5h 约 6,000 次，Lite 5×）。建议先用 Lite 首月 ¥9.9 试，跑完一个月看真实消耗再升档。
  - q: "方舟的 Auto 模式比手动选模型好吗？"
    a: |
      多数场景下 Auto 更省额度——按任务复杂度自动选最便宜能完成的模型。
      但如果明确知道任务要旗舰模型（比如复杂重构），手动指定能避免 Auto 误判。日常推荐开 Auto。
  - q: "Claude Code 能用方舟吗？"
    a: |
      能，且配置简单：方舟提供 Anthropic 协议兼容端点，只需设两个环境变量：
      `ANTHROPIC_BASE_URL=https://ark.cn-beijing.volces.com/api/coding/anthropic` 加 API Key 即可，无需任何代理或中间层。模型走 Doubao/GLM/Kimi 系列。
  - q: "方舟 vs 百炼 vs MiniMax 怎么选？"
    a: |
      预算优先选**方舟**（Lite 首月 ¥9.9 / 续费 ¥40 最便宜）；想用千问全家桶选**百炼**（¥200，模型最多）；
      要全模态（含音频/音乐）选 **MiniMax Token Plan**（¥29 起）。重度 >128k 长上下文避开 Agent Plan（7.5× 倍率）。详见 [百炼 vs 方舟](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)。
---

火山方舟 Coding Plan 是字节跳动旗下的 AI 编程 API 套餐，**Lite 标准月费 ¥40，首月低至 ¥9.9**，无需代理，支持支付宝/微信支付。国内开发者接入 AI 编程成本最低的方案之一——但要注意 ¥9.9 是首月优惠价，续费回到 ¥40。

## 套餐详解

| 项目 | Lite | Pro |
|------|------|-----|
| 标准月费 | **¥40** | ¥200 |
| 首月优惠 | **¥9.9**（叠加邀请券低至 ¥8.9） | ¥49.9 |
| 续费 | ¥40/月 | ¥200/月（首购 3 个月套餐 5 折，平均 ¥100/月） |
| 每 5 小时额度 | ~1,200 次请求 | ~6,000 次请求（Lite 5×） |
| Auto 模式 | ✅ | ✅ |
| 入坑门槛 | 极低（首月） | 中等 |

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

1. **选 Lite 起步**（首月 ¥9.9）：日常轻度 Coding 够用，月底统计真实消耗再决定要不要升 Pro
2. **叠加邀请券**：邀请好友双方各享 9 折，Lite 首月可低至 **¥8.9**
3. **利用 Auto 模式**：简单任务自动走轻量模型，省额度
4. **每日 10:30 蹲点**：新用户入口在此时刻开放
5. **首购三个月 Pro 套餐**：一次性下单三个月可享 5 折（平均 ¥100/月，是 Pro 长期最低价路径）

> ⚠️ Lite 续费会回到 **¥40/月**，不再是 ¥9.9——预算时按 ¥40 算更准。

## 百炼对比速览

| 维度 | 火山方舟 | 百炼 |
|------|----------|------|
| 标准月费 | ¥40（Lite）/ ¥200（Pro） | ¥200（Pro） |
| 首月优惠 | ¥9.9 / ¥49.9 | 无 |
| 额度 | 5 小时滑动窗口 | 自然月总计 |
| 模型数 | 5 | 8 |
| Auto | ✅ | ❌ |
| 子账号 | ✅ | ❌ |

详细对比：[百炼 vs 火山方舟 Coding Plan](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)。

## 适合谁

- ✅ 想用 ¥9.9 首月低价试水的开发者
- ✅ 续费后能接受 ¥40/月 的预算
- ✅ 日常持续编码、不喜欢月底额度告急
- ✅ 想用多款国产模型、不想被千问锁死
- ✅ Claude Code 用户的国内中转方案
- ✅ 团队/子账号场景
- ❌ 期望长期 ¥9.9 不变（这是首月福利，月 2 起恢复 ¥40）
- ❌ 需要偶发高强度使用（月计额度更适合，方舟 5 小时窗口会卡）

## 相关文章

- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + 方舟方案](/zh/plan/cline-ark)
- [Cline + 方舟配置指南](/zh/guides/cline-ark-setup)
- [百炼 Coding Plan 完整攻略](/zh/guides/bailian-coding-plan)

> 数据来源：火山方舟官方文档（2026-05）。价格、活动、新用户入口以官网实时信息为准。
