---
title: "火山方舟 Coding Plan 完整指南：两档套餐、Agent Plan 区别与最新更正"
description: "基于火山方舟官方导出的 Agent/Coding Plan 文档校正：Coding Plan 是面向个人开发者的两档 Coding 大模型服务套餐，Agent Plan 是在其基础上升级的多模态 + Harness 套餐。本文说明二者区别、模型与活动变更、Base URL/API Key 注意事项，以及 Cline、Claude Code 等工具如何避免配错套餐。"
date: "2026-05-17"
updated_at: "2026-06-27"
article_type: "explainer"
tags: ["火山方舟", "coding-plan", "agent-plan", "字节跳动", "api", "cline", "claude-code", "roo-code", "opencode", "trae", "codex-cli"]
faq:
  - q: "¥9.9 是 Coding Plan Lite 的长期价格吗？"
    a: |
      不是。官方导出的 2026-06 文档里，明确写到 **¥9.9 / ¥49.9 是 Agent Plan Small / Medium 在 2026-06-08 至 2026-08-08 的 2.5 折普惠活动**，且每个用户最多享受前两个月，第三个月起恢复原价。
      Coding Plan 仍是单独的两档 Coding 套餐，价格、库存和活动入口请以 Coding Plan 控制台/活动页实时展示为准，不要把 Agent Plan 活动价直接当成 Coding Plan Lite/Pro 价格。
  - q: "Coding Plan 和 Agent Plan 最大区别是什么？"
    a: |
      Coding Plan 主打 Coding 场景，面向个人开发者，覆盖语言模型和向量化模型，按“预估模型调用次数”理解额度；Agent Plan 是在 Coding Plan 基础上升级的新订阅包，加入视觉/语音模型、豆包搜索、火山引擎 Supabase、Agent 记忆等 Harness，并改用 AFP（Agent Fuel Point）抵扣。
  - q: "现在应该买 Coding Plan 还是 Agent Plan？"
    a: |
      只做文本编程、Cline/Claude Code/OpenCode 日常写代码，优先看 Coding Plan，成本结构更简单。
      需要生图、生视频、语音、联网搜索、记忆或 Supabase Harness，再考虑 Agent Plan；Small 仅适合轻量体验，官方建议视频生成场景选 Medium 及以上。
  - q: "最新模型有哪些需要注意？"
    a: |
      官方 2026-06 活动页把 `deepseek-v4-pro`、`kimi-k2.6`、`kimi-k2.7-code`、`glm-5.2 (glm-latest)` 列为 Agent/Coding Plan 个人版适用模型；`glm-5.1` 标注为即将下线，建议切到 `glm-5.2`。
      实际可用模型、抵扣系数和上下文窗口以开通管理页为准。
  - q: "Claude Code / Cline 配方舟时最容易错在哪？"
    a: |
      最容易把套餐类型的 Base URL 和 API Key 混用。Agent Plan 官方专属地址是 `/api/plan`（Anthropic）和 `/api/plan/v3`（OpenAI Compatible）；Coding Plan 应使用 Coding Plan 控制台获取的专属 Base URL 和方舟 API Key。混用可能无法抵扣套餐额度，甚至产生额外费用。
  - q: "方舟 vs 百炼 vs MiniMax 怎么选？"
    a: |
      预算和国内直连优先，先看方舟 Coding Plan；想用千问/Qwen 全家桶，看百炼；要全模态且包含音频/音乐，看 MiniMax Token Plan。若需要 Harness 工具链，再单独评估方舟 Agent Plan。
pillar: plans
content_status: keep
locale_strategy: mirrored
---

火山方舟 Coding Plan 是字节跳动旗下、面向个人开发者的 AI Coding 大模型服务套餐。根据本次官方导出的《订阅 [Agent/Coding Plan]》文档，最需要更正的一点是：**Coding Plan 和 Agent Plan 已经是两个边界不同的套餐**。Coding Plan 仍主打编程场景；Agent Plan 是在 Coding Plan 基础上升级的新订阅包，覆盖多模态模型和 Harness。

因此，旧攻略里常见的“Lite ¥9.9 / Pro ¥49.9”说法需要谨慎看待：本次官方导出明确写到的 ¥9.9 / ¥49.9 活动，是 **Agent Plan Small / Medium** 的限时 2.5 折活动，不应直接写成 Coding Plan Lite/Pro 的固定价格。

## 先看结论

| 你要做什么 | 建议 |
|---|---|
| 只用 Cline / Claude Code / OpenCode / Codex CLI 写代码 | 优先看 **Coding Plan** |
| 想要低心智负担、按开发调用次数理解额度 | 优先看 **Coding Plan** |
| 想在 AI 工具里生图、生视频、用语音模型 | 看 **Agent Plan** |
| 需要豆包搜索、Agent 记忆、火山引擎 Supabase 等 Harness | 看 **Agent Plan** |
| 看到 ¥9.9 / ¥49.9 活动价 | 先确认是不是 **Agent Plan Small / Medium** 活动，不要默认是 Coding Plan |

## Coding Plan vs Agent Plan

| 对比项 | Coding Plan | Agent Plan |
|---|---|---|
| 核心定位 | 面向个人开发者的 Coding 大模型服务套餐 | 在 Coding Plan 基础上升级，面向 Agent、多模态和 Harness |
| 模型范围 | 语言模型、向量化模型 | 语言模型、向量化模型、视觉模型、语音模型 |
| Harness | 无 | 豆包搜索、火山引擎 Supabase、Agent 记忆等 |
| 套餐信息 | 2 档套餐 | Small / Medium / Large / Max 4 档 |
| 计费理解 | 预估模型调用次数 | AFP（Agent Fuel Point）抵扣 |
| Base URL / API Key | 在 Coding Plan 控制台获取专属 Base URL 和方舟 API Key | 在 Agent Plan 控制台获取专属 Base URL 和专属 API Key |

**不要混用套餐凭证。** 官方文档多次强调，Agent Plan 的专属 Base URL 和 API Key 不能与 Coding Plan API Key 混用；反过来，使用 Coding Plan 时也应以 Coding Plan 控制台给出的地址和 Key 为准。

## Agent Plan 活动不要误写成 Coding Plan 价格

官方导出的活动页写的是：

| 活动 | 时间 | 档位 | 原价 | 折扣价 | 规则 |
|---|---|---|---|---|---|
| Agent Plan Small & Medium 2.5 折普惠活动 | 2026-06-08 至 2026-08-08 | Small | ¥40 | ¥9.9 | 每个用户最多前两个月可享，第三个月起原价 |
| Agent Plan Small & Medium 2.5 折普惠活动 | 2026-06-08 至 2026-08-08 | Medium | ¥200 | ¥49.9 | 新购、续费、升配共享同一优惠资格 |

这说明：**¥9.9 / ¥49.9 在本次官方导出中属于 Agent Plan 活动价**。如果你是冲着 Coding Plan 来买，请打开 Coding Plan 活动页或控制台核对实时价格、库存和套餐权益。

## 最新模型与活动提示

官方导出的 2026-06 活动页显示，2026-06-10 18:00:00 至 2026-06-30 23:59:59，Agent/Coding Plan 个人版用户使用下列模型时，抵扣系数有阶段性折扣：

| 模型 | 官方提示 |
|---|---|
| `deepseek-v4-pro` | 活动期间抵扣系数 4 折，可用配额约为原用量的 250% |
| `kimi-k2.6` | 活动期间抵扣系数 4 折，可用配额约为原用量的 250% |
| `kimi-k2.7-code` | 活动期间抵扣系数 4 折，可用配额约为原用量的 250% |
| `glm-5.2 (glm-latest)` | 新模型上线，抵扣系数 2.5 折，可用配额约为原用量的 400% |

注意两点：

- `glm-5.1` 已被官方标注为即将下线，建议切换到 `glm-5.2`
- 折扣活动结束后，适用模型的抵扣系数会恢复原规则；模型列表和抵扣系数以控制台为准

## 支持的客户端

官方导出的接入文档覆盖了 Claude Code、OpenCode、OpenClaw、Hermes Agent、TRAE、OpenViking，以及“其他工具”路径下的 Cursor、Roo Code、Kilo Code、Codex CLI 等 OpenAI Compatible 工具。

对 Coding Plan 用户来说，关键不是“客户端能不能连”，而是：

- 你是否使用了 **Coding Plan 控制台**给出的专属 Base URL
- API Key 是否是对应套餐的 Key
- 模型名是否在当前套餐和控制台开通范围内
- 客户端使用的是 Anthropic 协议还是 OpenAI Compatible 协议

## 配置示例：Cline + 方舟

Cline 走 OpenAI Compatible 配置。旧版 Coding Plan 常见配置如下，但实际下单后请优先复制控制台给出的专属地址：

```text
API Provider: OpenAI Compatible
Base URL: https://ark.cn-beijing.volces.com/api/coding/v3
API Key: 你的方舟 API Key
Model: ark-code-latest 或控制台开通的具体模型
```

如果你实际购买的是 Agent Plan，则不要继续沿用 `/api/coding/v3`，而应使用 Agent Plan 的 OpenAI Compatible 专属地址：

```text
Base URL: https://ark.cn-beijing.volces.com/api/plan/v3
API Key: Agent Plan 专属 API Key
Model: ark-code-latest 或当前套餐支持的模型
```

详见 [Cline + 方舟方案](/zh/plan/cline-ark)。

## 配置示例：Claude Code + 方舟

Claude Code 走 Anthropic 兼容协议。Coding Plan 旧版常见配置如下：

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/coding"
export ANTHROPIC_AUTH_TOKEN="你的方舟API_Key"
export ANTHROPIC_MODEL="ark-code-latest"
claude
```

如果你实际购买的是 Agent Plan，官方导出文档给出的专属地址是：

```bash
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/plan"
export ANTHROPIC_AUTH_TOKEN="你的Agent_Plan专属API_Key"
export ANTHROPIC_MODEL="ark-code-latest"
claude
```

**判断原则很简单：买哪个 Plan，就用哪个 Plan 控制台给出的 Base URL 和 API Key。**

## 省钱建议

1. **先确认套餐类型**：只做 Coding，不需要生图/视频/Harness，优先比较 Coding Plan；不要因为 Agent Plan 有活动价就默认它更适合
2. **把 ¥9.9 看成活动而不是长期价**：本次官方导出明确写的是 Agent Plan Small 前两个月活动价，第三个月起恢复原价
3. **用 `ark-code-latest` 起步**：让方舟按当前开通情况路由，再根据控制台模型表现手动切换
4. **月底前看真实用量**：Coding Plan 看模型调用次数/控制台统计；Agent Plan 看 AFP、5 小时/周/月额度
5. **不要混用 Key 和 Base URL**：混用可能无法抵扣套餐，或进入后付费/额外计费路径

## 百炼对比速览

| 维度 | 火山方舟 Coding Plan | 百炼 Coding Plan |
|---|---|---|
| 定位 | 国内直连 Coding API 套餐 | 千问/Qwen 生态 Coding API 套餐 |
| 套餐结构 | 官方导出显示为 2 档套餐 | 当前以官网实时展示为准 |
| 模型路线 | 豆包/DeepSeek/Kimi/GLM 等组合，控制台为准 | Qwen 系列为核心，兼容其他模型 |
| 额度理解 | 预估模型调用次数 | 月度额度/调用次数 |
| Auto / 模型路由 | 以方舟控制台能力为准 | 以百炼控制台能力为准 |
| 国内可用性 | 国内直连 | 国内直连 |

详细对比：[百炼 vs 火山方舟 Coding Plan](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)。

## 适合谁

- 适合：想要国内直连、主要做 AI 编程、使用 Cline/Claude Code/OpenCode/Codex CLI 的个人开发者
- 适合：不需要多模态，只希望把 API 成本和可用性稳定下来的人
- 适合：已经会配置 OpenAI Compatible 或 Anthropic 兼容端点的人
- 不适合：把 ¥9.9 当成 Coding Plan 长期固定价的人
- 不适合：需要生图、生视频、语音、联网搜索、记忆、Supabase 等 Agent Harness 的人；这类需求应看 Agent Plan
- 不适合：不能接受活动规则、模型列表和抵扣系数频繁变动的人

## 相关文章

- [方舟 Agent Plan 全解读](/zh/guides/ark-agent-plan/)
- [Coding Plan vs Agent Plan vs Token Plan](/zh/compare/coding-plan-vs-agent-plan-vs-token-plan/)
- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)
- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + 方舟方案](/zh/plan/cline-ark)
- [Cline + 方舟配置指南](/zh/guides/cline-ark-setup)
- [百炼 Coding Plan 完整攻略](/zh/guides/bailian-coding-plan)

> 数据来源：用户提供的火山方舟官方导出 PDF《订阅 [Agent/Coding Plan]》（核查至 2026-06-27）。价格、活动、模型、Base URL 和 API Key 以火山方舟官网/控制台实时信息为准。
