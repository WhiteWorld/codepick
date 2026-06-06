---
title: "火山方舟 Coding Plan 完整指南：Lite ¥40/月（首月 ¥9.9）"
description: "火山方舟 Coding Plan 是国内最便宜的 AI 编程 API 套餐之一：Lite 标准月费 ¥40（首月 ¥9.9，叠加邀请券低至 ¥8.9），Pro ¥200/月（首月 ¥49.9）。本文拆解套餐机制、续费规则、Auto 模式、支持的客户端，以及如何用最低成本上手。"
date: "2026-05-17"
updated_at: "2026-05-28"
article_type: "explainer"
tags: ["火山方舟", "coding-plan", "字节跳动", "api", "cline", "claude-code", "roo-code", "opencode", "trae"]
faq:
  - q: "Lite 真的只要 ¥9.9 一个月吗？续费是多少？"
    a: |
      ¥9.9 是 **Lite 首月优惠价**（2.5 折），叠加邀请券可低至 ¥8.9。
      **续费回到 ¥40/月标准价**。Pro 类似——首月 ¥49.9，续费 ¥200。Pro 首购下单三个月一次性可享 5 折，平均 ¥100/月。
  - q: "Lite ¥40 和 Pro ¥200 怎么选？"
    a: |
      日常持续敲代码、不开多个并发 Agent，Lite 通常够用（5h 窗口约 1,200 次请求）。
      跑长流程 Agent、多文件编辑或同时开多客户端，建议直接 Pro（5h 约 6,000 次，Lite 5×）。但长上下文/高 token 单次调用可能折算消耗更多，不要把“1 次请求”理解成绝对固定成本。
  - q: "方舟的 Auto 模式比手动选模型好吗？"
    a: |
      多数场景下 Auto 更省额度——按任务复杂度自动选最便宜能完成的模型。
      但如果明确知道任务要旗舰模型（比如复杂重构），手动指定能避免 Auto 误判。日常推荐开 Auto。
  - q: "Claude Code 能用方舟吗？"
    a: |
      能，且配置简单：方舟提供 Anthropic 协议兼容端点，只需设两个环境变量：
      `ANTHROPIC_BASE_URL=https://ark.cn-beijing.volces.com/api/coding` 加 `ANTHROPIC_AUTH_TOKEN` 即可，无需任何代理或中间层。
      如果是 OpenAI Compatible 工具，Base URL 使用 `https://ark.cn-beijing.volces.com/api/coding/v3`。
  - q: "方舟 vs 百炼 vs MiniMax 怎么选？"
    a: |
      预算优先选**方舟**（Lite 首月 ¥9.9 / 续费 ¥40 最便宜）；想用千问全家桶选**百炼**（¥200，模型最多）；
      要全模态（含音频/音乐）选 **MiniMax Token Plan**（¥29 起）。重度长上下文或多模态 Agent 再考虑 Agent Plan，并先看最新 AFP 抵扣规则。详见 [百炼 vs 方舟](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)。
pillar: plans
content_status: keep
locale_strategy: mirrored
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

- 额度按 5 小时窗口计算（不是自然月），适合日常持续使用
- 用完当前窗口即停止，等时间滑过自动恢复
- 活动价、库存和开售时间变化较快，下单前以活动页/控制台展示为准
- 推荐好友双方各享折扣；推荐人获订单 10% 优惠券（无上限）

> ⚠️ 活动价和原价以官网实时页面为准，价格变化很快。

## 支持模型（官方文档当前列出 11 款）

| 模型 | 来源 |
|------|------|
| doubao-seed-2.0-code / pro / lite | 字节自研模型 |
| doubao-seed-code | 字节自研编程模型 |
| minimax-m2.7 / minimax-m2.5 | MiniMax |
| GLM-5.1 | 智谱 AI |
| GLM-4.7 | 智谱 AI |
| DeepSeek-V3.2 | DeepSeek |
| Kimi-K2.6 | Moonshot |
| Kimi-K2.5 | Moonshot |

**Auto 模式**可根据任务复杂度自动匹配模型——简单任务走轻量模型省额度，复杂任务切旗舰模型。

## 支持的客户端

官方文档明确给出了 Claude Code、OpenCode、OpenClaw、Hermes Agent、TRAE、OpenViking 等接入教程；Cursor / Cline / Roo Code 等 OpenAI Compatible 工具可按“其他工具”路径配置。

火山方舟兼容 **OpenAI + Anthropic 双协议**。关键区别是端点不同：Anthropic 协议用 `/api/coding`，OpenAI Compatible 用 `/api/coding/v3`。不要混用，否则可能无法消耗 Coding Plan 套餐额度。

## 配置示例：Cline + 方舟（最推荐）

1. **订阅套餐**：访问 [火山方舟 Coding Plan](https://www.volcengine.com/L/s3lNTNYxaEc/)，以页面实时价格和库存为准
2. **获取 API Key**：火山引擎控制台 → API 密钥管理
3. **配置 Cline**：
   - API Provider：`OpenAI Compatible`
   - Base URL：`https://ark.cn-beijing.volces.com/api/coding/v3`
   - API Key：你的方舟 Key
   - Model：`doubao-seed-code-preview-latest` 或开启 Auto 模式

详见 [Cline + 方舟方案](/zh/plan/cline-ark)。

## 配置示例：Claude Code + 方舟

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding"
export ANTHROPIC_AUTH_TOKEN="你的方舟API_Key"
claude
```

方舟支持 Anthropic 协议，Claude Code 配置只需两个环境变量。

## 省钱技巧

1. **选 Lite 起步**（首月 ¥9.9）：日常轻度 Coding 够用，月底统计真实消耗再决定要不要升 Pro
2. **叠加邀请券**：邀请好友双方各享 9 折，Lite 首月可低至 **¥8.9**
3. **利用 Auto 模式**：简单任务自动走轻量模型，省额度
4. **下单前看活动页**：首购、邀请券、库存和开售时间会变，不要只按旧攻略的时间蹲点
5. **首购三个月 Pro 套餐**：若活动仍在，一次性下单三个月可享更低均价；以结算页为准

> ⚠️ Lite 续费会回到 **¥40/月**，不再是 ¥9.9——预算时按 ¥40 算更准。

## 百炼对比速览

| 维度 | 火山方舟 | 百炼 |
|------|----------|------|
| 标准月费 | ¥40（Lite）/ ¥200（Pro） | ¥200（Pro） |
| 首月优惠 | ¥9.9 / ¥49.9 | 无 |
| 额度 | 5 小时滑动窗口 | 自然月总计 |
| 模型数 | 11（以控制台为准） | 8 |
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

- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)
- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + 方舟方案](/zh/plan/cline-ark)
- [Cline + 方舟配置指南](/zh/guides/cline-ark-setup)
- [百炼 Coding Plan 完整攻略](/zh/guides/bailian-coding-plan)

> 数据来源：火山方舟官方文档（核查至 2026-05-28）。价格、活动、新用户入口和模型列表以官网/控制台实时信息为准。
