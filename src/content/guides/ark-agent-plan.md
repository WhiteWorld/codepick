---
title: "火山方舟 Agent Plan 全解读：业界首个 Agent 套餐包"
description: "2026-05-11 火山方舟发布 Agent Plan，被官方定义为业界首个 Agent 套餐包。本文详解四档订阅价格、AFP 积分制、多模态模型与 Harness 工具、与 Coding Plan 的差异，以及如何选择。"
date: "2026-05-13"
updated_at: "2026-05-28"
article_type: "explainer"
tags: ["火山方舟", "ark", "agent-plan", "claude-code", "opencode", "trae", "智能体", "订阅", "AFP", "多模态"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Agent Plan 和 Coding Plan 应该买哪个？"
    a: |
      纯文本编程仍建议 Coding Plan（¥9.9 起，单价更低）。
      只有当 Agent 流程要做图像/视频生成、联网搜索、向量化或经常要在多模型间轮换时才升 Agent Plan。纯文本编程优先 Coding Plan，成本更可控。
  - q: "AFP 积分怎么算？按 token 还是按次数？"
    a: |
      按模型、上下文长度、输入/输出 token 和 Harness/多模态能力折算 AFP。长上下文和视觉/视频任务会明显更贵。
      套餐同时有 5 小时、周、月以及视觉模型日额度；额度耗尽后等待对应周期恢复，不会自动消耗其他资源包或账户余额。
  - q: "Agent Plan 支持 Claude Code 吗？"
    a: |
      支持。Agent Plan 沿用 Coding Plan 的 Anthropic 协议端点，把 API Key 配到 Claude Code 即可，只是模型走的是 Doubao/GLM/Kimi 系而不是原生 Claude。
      配置方式见 [Cline + 方舟配置指南](/zh/guides/cline-ark-setup/)。
  - q: "¥40 的 Small 档值得买吗？"
    a: |
      适合先小步试。20,000 AFP 适合轻量文本/Agent 任务验证，但 Small 不支持视频生成。
      如果你要稳定做视频、多模态或使用 ArkClaw 权益，建议从 Medium (¥200) 起看。建议先用 Small 跑真实场景，统计 AFP 消耗再升档。
---

2026 年 5 月 11 日，火山引擎正式发布 **Agent Plan**，被官方定义为「业界首个 Agent 套餐包」。它在原有 [Ark Coding Plan](/zh/coding-plan/) 的基础上，把更多模态模型与 Harness 工具组合进同一份订阅，并引入了全新的 **AFP（Agent Fuel Points）** 积分制度。对国内 [Claude Code](/zh/tool/claude-code) / [OpenCode](/zh/tool/opencode) / [Trae](/zh/tool/trae) / OpenClaw / Hermes Agent 用户而言，这是一个值得重新评估的国内中转方案。

---

## TL;DR

- **发布时间**：2026-05-11
- **定位**：在 Coding Plan 之上拓展为「多模型 + 多模态 + Harness 工具」的 Agent 订阅
- **四档价格**：Small ¥40 / Medium ¥200 / Large ¥500 / Max ¥1000，月付
- **计费单位**：AFP（Agent Fuel Points），按模型、上下文、输入/输出和工具能力折算
- **关键代价**：长上下文、多模态和 Harness 会比纯 Coding Plan 更快消耗额度
- **附加权益**：Medium 及以上更适合多模态/ArkClaw 等权益场景

---

## 套餐与价格

| 套餐 | 月度价格 | AFP/月 | 关键限制/权益 | 适用人群 |
|------|--------|--------|---------|--------|
| Small | ¥40 | 20,000 | 不支持视频生成 | 个人轻度尝鲜、文本 Agent |
| Medium | ¥200 | 100,000 | 支持视频/更多 Harness，适合 ArkClaw 权益 | 日常 Agent 开发主力 |
| Large | ¥500 | 250,000 | 更高多模态/联网搜索额度 | 重度多模态 + 长流程 |
| Max | ¥1000 | 500,000 | 最高个人版额度 | 团队/企业级 |

> Small 套餐常见拆解为 **2,000 AFP / 5h，7,000 AFP / 周，20,000 AFP / 月，并有视觉日额度**；其余档位按比例提升。官方文档会更新具体模型、Harness 和额度，请以下单页/控制台为准。

> 💡 **不要混淆两个概念**：活动页库存可能限量释放；已订阅后的使用额度则按 5 小时、周、月和视觉日额度分别恢复。

---

## 包含哪些模型？

Agent Plan 一次性把字节自研 + 三方主流模型打包进同一订阅：

**字节系列**

- **Doubao-Seed 2.0 / Doubao-Seed-Code** — 编程主力（文本 / 代码）
- **Doubao-Seedance 2.0** — 视频生成
- **Doubao-Seedream 5.0 lite** — 图像生成
- **Doubao-embedding-vision** — 多模态记忆/向量检索

**第三方主流**

- **DeepSeek-V4 / V3.2**（DeepSeek，具体可用型号以控制台为准）
- **GLM-5.1**（智谱）
- **Kimi-K2.6**（Moonshot）
- **MiniMax-M2.7**（MiniMax）

**Auto 模式**：与 Coding Plan 一致，可按任务自动匹配性价比最高的模型，免去手动切换。

---

## 与 Coding Plan 的差异

|  | Ark Coding Plan | Ark Agent Plan |
|---|---|---|
| 主打能力 | 文本/代码 编程模型 | **编程 + 多模态 + Harness 工具** |
| 模态 | 文本 | **文本 / 代码 / 图像 / 视频 / 向量** |
| Harness | 模型层 | **整合联网搜索、记忆、Auto、多模态** |
| 计费 | 按次数（每 5h N 次请求） | **AFP 积分制** |
| Token 单价 | 纯编程更低 | **按 AFP 抵扣表折算，长上下文/多模态更贵** |
| 长上下文 | 按 Coding Plan 规则 | **上下文越长，AFP 消耗越快** |
| 起步价 | ¥9.9（Lite）/ ¥49.9（Pro） | ¥40（Small）|
| 附加权益 | ArkClaw 等以活动为准 | **Medium+ 更适合 ArkClaw / 多模态权益** |

一句话总结：Coding Plan 仍是**纯编程性价比最优解**；Agent Plan 是**需要多模态 + Agent 工具链**时的新选择。

---

## Harness 工具：Agent Plan 的真正卖点

Agent Plan 首次将 Model 与 Harness（即 Agent 工具链）能力深度整合，开箱即用：

1. **联网搜索** — 与豆包同源的实时检索能力，无需自建搜索接口
2. **记忆能力** — 内置 embedding 模型驱动的长期记忆
3. **Auto 模式** — 任务智能调度，自动选最合适的模型
4. **多模态** — 同一 API 内统一调度文本 / 代码 / 图像 / 视频生成与理解

适配客户端：**Claude Code、OpenCode、Trae、OpenClaw、Hermes Agent**。订阅后将 API Key 配置到客户端即可使用。

---

## 谁该买？谁不该买？

### 适合

- 需要在 Agent 流程中频繁穿插**视频 / 图像生成**的开发者
- 想直接调用 Doubao-Seedance / Seedream 等多模态模型的多媒体团队
- 预算到 Medium 档（¥200/月）及以上，想使用 ArkClaw / 视频 / 更完整 Harness 的用户
- 国内 Claude Code / OpenCode / Trae 用户的中转方案选型

### 不适合

- **纯文本编程**：仍建议 Ark Coding Plan（¥9.9 起，单价更低）
- **重度长上下文用户**：上下文越长，AFP 消耗越快，需先做小样本测算
- 只想用 **Claude / GPT 原版模型**的用户（这是国产模型套餐）
- 个位数月度需求的轻度尝鲜用户（按量付费 OpenRouter 可能更划算）

---

## 与同类「Agent / 全模态订阅」横向对比

| 产品 | 起步价 | 主打 | 模态 | 备注 |
|---|---|---|---|---|
| **Ark Agent Plan** | ¥40 | Doubao + GLM + Kimi + Harness | 文本/代码/图像/视频/向量 | 业界首个 Agent 套餐包，AFP 积分制 |
| **MiniMax Token Plan** | ¥29 | M2.7 + Hailuo + Speech + Music | 全模态（含音频/音乐） | 2026-03-23 由 Coding Plan 升级 |
| **百炼 Token Plan 团队版** | ¥198 | Qwen + DeepSeek + Kimi + GLM + Wan | 文本 + 图像 | 多坐席、企业级 |

三家产品形态各有侧重：MiniMax 强在**音频/音乐多模态**，百炼强在**多模型选择 + 团队多坐席**，方舟 Agent Plan 强在**Doubao 系全栈 + Harness 工具链**。

---

## 上手三步

1. 访问 [方舟 Agent Plan 活动页](https://ai.volcengine.com/activity/agentplan)，根据 AFP 估算选择档位
2. 用支付宝/微信支付完成订阅（注意活动库存和结算页价格以实时页面为准）
3. 在 [火山引擎控制台](https://console.volcengine.com/) 创建 API Key，按 Claude Code / OpenCode / Trae 等客户端的方舟 API 教程配置 endpoint

> 配置 Claude Code 等客户端连接方舟的具体步骤，可以参考 [Cline + 方舟配置指南](/zh/guides/cline-ark-setup/)，Agent Plan 的接入方式与 Coding Plan 基本一致，只是替换 API Key 即可。

---

## 写在最后

Agent Plan 是火山方舟把 **Model + Harness** 一起卖的尝试，本质是从「卖模型 token」转向「卖 Agent 燃料」。**对纯编程用户它不是最优解**——单价上去了；**但对真正要做多模态 Agent 的开发者来说，它把过去需要自己拼装的能力（搜索、记忆、视频图像生成）打成了一个订阅包**，省下大量胶水代码与运维成本。

建议先用 Small（¥40）跑一个月真实场景，统计 AFP 消耗与触发的模型/上下文折算，再决定要不要升到 Medium 获取更完整的多模态与 ArkClaw 权益。

---

## 相关阅读

- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)
- [Ark Coding Plan vs Bailian Coding Plan 横评](/zh/compare/bailian-coding-plan-vs-ark-coding-plan/)
- [Cline + 火山方舟配置指南](/zh/guides/cline-ark-setup/)
- [MiniMax Token Plan 全解读](/zh/guides/minimax-token-plan/)
- [国内 AI 编程速率限制对比](/zh/guides/ai-coding-rate-limits/)

> 数据来源：火山方舟 Agent Plan / Coding Plan 官方文档与活动页（核查至 2026-05-28）。模型、AFP 抵扣和权益变化较快，请以下单页和控制台为准。
