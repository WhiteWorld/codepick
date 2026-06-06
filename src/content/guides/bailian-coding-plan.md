---
title: "百炼 Coding Plan 完整攻略：定价、额度、客户端配置"
description: "阿里云百炼 Coding Plan 是面向 AI 编程场景的订阅制 API 套餐。本文拆解 Pro 套餐额度、支持的模型和客户端、以及 VS Code / 终端配置方法。"
date: "2026-05-17"
updated_at: "2026-05-19"
article_type: "explainer"
tags: ["百炼", "coding-plan", "阿里云", "千问", "api", "claude-code", "cline", "opencode", "cursor"]
faq:
  - q: "百炼 Pro ¥200 和方舟 Lite ¥9.9 差距这么大，差在哪？"
    a: |
      百炼额度更大（约 90,000 次/月）、模型更多（8 款含千问全家桶）、按月计算更灵活；
      方舟更便宜但额度按 5h 滑动窗口、模型少（5 款）。日均用量高、想用千问 Coder 选百炼；轻度用户方舟 ¥9.9 就够。
  - q: "Lite 套餐还能买吗？"
    a: |
      不能。百炼 Lite 已于 2026 年 3 月停售、4 月停止续费，现在只能新购 Pro (¥200/月)。
      预算更低请考虑火山方舟 Coding Plan (¥9.9 起) 或 MiniMax Token Plan (¥29 起)。
  - q: "百炼 Coding Plan 用完额度会自动转按量吗？"
    a: |
      **不会**。用完当月配额（约 90,000 次）后服务直接停止，不会按量继续扣费，必须等下月配额重置。
      担心月底掉链子可用方舟做备份（不同公司账号互不影响），或升级企业版加大额度。
  - q: "百炼有没有 Auto 模式自动选模型？"
    a: |
      没有。百炼需手动指定模型 ID。
      日常编程推荐 `qwen3-coder-next`，复杂推理切 `qwen3.6-plus`，备选 `GLM-5` 或 `Kimi-K2.5`。想要 Auto 目前只有火山方舟提供。
pillar: plans
content_status: keep
locale_strategy: mirrored
---

百炼 Coding Plan 是阿里云推出的 AI 编程专属 API 套餐，月付 ¥200（以官网实时价格为准），提供保底额度 + 多款模型，适合想用千问/Qwen 系列模型的国内开发者。无需代理，支付宝/微信支付即可订阅。

## 当前套餐

百炼目前**仅开放 Pro 新购**（Lite 已于 2026 年 3 月停售，4 月停止续费）。

| 项目 | Pro |
|------|-----|
| 月费 | ¥200（以官网实时定价为准） |
| 每 5 小时额度 | 约 6,000 次请求 |
| 每周额度 | 约 45,000 次请求 |
| 每月额度 | 约 90,000 次请求 |
| 支付 | 支付宝 / 微信 |
| 网络 | **无需代理** |
| 子账号 | ❌ 仅主账号可订阅 |

> ⚠️ 额度按模型调用次数扣减（不是 token）。简单任务约 5–10 次，复杂任务 10–30+ 次。用完后**停止服务**，不转按量。

## 支持模型（8 款）

| 模型 | 定位 |
|------|------|
| qwen3.6-plus | 千问旗舰通用（Pro 专属，含图像理解） |
| qwen3.5-plus | 千问通用旗舰 |
| qwen3-max-2026-01-23 | 千问旗舰 Max |
| qwen3-coder-next | 千问编程专属旗舰 |
| qwen3-coder-plus | 千问编程增强版 |
| MiniMax-M2.5 | MiniMax 编程模型 |
| GLM-5 | 智谱最新旗舰 |
| Kimi-K2.5 | Moonshot 编程模型 |

**推荐**：日常编程用 `qwen3-coder-next`（编程专属）；复杂推理切换 `qwen3.6-plus`（旗舰通用）；偶用 `GLM-5` 或 `Kimi-K2.5` 作为备选。

## 支持的客户端

百炼兼容 7 款 AI 编程客户端：

- **Claude Code**（终端 Agent）— 配置最简单，ANTHROPIC_BASE_URL 指向百炼即可
- **Cline**（VS Code 插件）— 最受欢迎的可视化方案
- **Cursor** — 通过 API 接入
- **OpenCode** — 终端开发者首选
- **Qwen Code** — 千问官方客户端，天然适配
- **OpenClaw** — 通用 AI 编程客户端
- **Kilo IDE** — 开源 IDE

## 配置示例：Cline + 百炼

1. **订阅**：访问 [百炼 Coding Plan](https://www.aliyun.com/benefit/scene/codingplan)，开通 Pro
2. **获取 API Key**：登录阿里云控制台 → 模型服务灵积 → API Key 管理
3. **配置 Cline**：
   - API Provider：`OpenAI Compatible`
   - Base URL：`https://coding.dashscope.aliyuncs.com/v1`
   - API Key：粘贴你的 Key
   - Model：`qwen3-coder-next`

详见本站 [Cline + 百炼方案](/zh/plan/cline-bailian)。

## 配置示例：Claude Code + 百炼

```bash
export ANTHROPIC_BASE_URL="https://coding.dashscope.aliyuncs.com/apps/anthropic"
export ANTHROPIC_API_KEY="你的百炼API_Key"
claude
```

百炼的 Anthropic 协议兼容端点让 Claude Code 可以**无需中间代理**直接接入。

## 火山方舟对比速览

| 维度 | 百炼 | 火山方舟 |
|------|------|----------|
| 月费 | ¥200（以官网为准） | ¥9.9 起（活动价以官网为准） |
| 额度机制 | 按月总计 | 按 5 小时滑动窗口 |
| 模型数 | 8 款 | 5 款 |
| Auto 模式 | ❌ | ✅ |
| Anthropic 协议 | ✅ | ✅ |
| 起订门槛 | 较高（¥200） | 较低（¥9.9 起） |

详细对比见本站 [百炼 vs 火山方舟 Coding Plan](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)。

## 适合谁

- ✅ 偏好 Qwen/千问系列模型的开发者
- ✅ 已用阿里云生态、有主账号的国内用户
- ✅ 月度使用量较平稳，不怕月初用完需等到下月
- ❌ 预算有限（¥200 起订门槛偏高，方舟 ¥9.9 更适合）
- ❌ 需要子账号管理（仅主账号可订阅）
- ❌ 短时间内高强度使用（月度机制不如方舟 5 小时窗口灵活）

## 相关文章

- [百炼 vs 火山方舟 Coding Plan 深度对比](/zh/compare/bailian-coding-plan-vs-ark-coding-plan)
- [Cline + 百炼方案](/zh/plan/cline-bailian)
- [火山方舟 Coding Plan 省钱指南](/zh/guides/ark-coding-plan-guide)

> 数据来源：阿里云百炼官方文档（2026-05）。价格、额度、新购状态以官网实时信息为准。
