---
title: "5 大国产 AI 编程订阅横评：2026 年 8 月选型指南"
description: "按 2026 年 8 月官网现状，横评火山方舟 Coding Plan、百炼 Token Plan、MiniMax Token Plan、GLM Coding Plan 与 Kimi Code：价格、额度、模型、协议与适用场景。"
date: "2026-03-03"
updated_at: "2026-08-26"
tags: ["百炼", "火山方舟", "minimax", "智谱", "kimi", "coding-plan", "token-plan", "国内", "对比", "api"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

如果你还把国产 AI 编程订阅理解成「固定月费 + 5 小时 prompt 次数」，这套认知已经过期了。

截至 2026 年 8 月 26 日，五家产品已经分化成五种不同形态：方舟仍是多模型 Coding Plan；百炼和 MiniMax 升级为 Token Plan；GLM 改用周积分；Kimi Code 则并入美元计价的 Kimi 会员。它们的额度单位不能直接换算，真正该比较的是：**你用什么工具、需要什么模型、工作流会不会长时间连续运行，以及额度触顶后会发生什么。**

## 先看结论

| 需求 | 优先看 | 原因 |
|---|---|---|
| 最低成本试用、多模型切换 | **火山方舟 Coding Plan Lite** | 官网仍显示限时 ¥9.9 起，支持 Auto 与多家模型 |
| ¥50 左右的个人日常主力 | **MiniMax Token Plan Plus** | ¥49/月，M2.7 每 5 小时 1,500 次请求，另含多模态额度 |
| 想同时用 Qwen、DeepSeek、GLM 等多模态模型 | **百炼 Token Plan** | 个人/团队版齐全，OpenAI + Anthropic 双协议，Harness 能力完整 |
| 只想用最新 GLM，重视 MCP 与 1M 上下文 | **GLM Coding Plan** | GLM-5.3、20+ 工具、4 类 MCP，但新价格明显上移 |
| 想用 Kimi K2.7 Code 与 Kimi 全家桶 | **Kimi 会员** | Code、Agent、Claw、研究与办公共用额度池，适合 Kimi 生态用户 |

没有「所有人都最划算」的一档。预算敏感用户优先试方舟或 MiniMax；多模型与团队治理看百炼；模型偏好比价格更重要时，再看 GLM 或 Kimi。

---

## 五家当前产品形态

| 平台 | 当前产品 | 月付起价 | 核心额度机制 | 编程主力模型 |
|---|---|---:|---|---|
| 火山方舟 | Coding Plan | 限时 ¥9.9；常规 Lite ¥40 | 5 小时 + 周/月多周期限额 | Doubao-Seed-2.1、GLM-5.3、Kimi-K2.7、MiniMax-M3、DeepSeek-V4 系列 |
| 阿里云百炼 | Token Plan 个人版 | 限时 ¥39；原价 ¥60 | Credits，7 天固定窗口 | Qwen3.8、DeepSeek-V4、GLM 等 17 款多模态模型 |
| MiniMax | Token Plan | ¥29 | 文本 5 小时 request；其他模态按日 | MiniMax-M2.7 / M2.7-highspeed |
| 智谱 | GLM Coding Plan | ¥118 | 周积分 + 并发/公平使用限制 | GLM-5.3 |
| Kimi | Kimi 会员内含 Kimi Code | $19 | 共享月度额度池 + Code 5 小时/周限额 | Kimi K2.7 Code |

> 价格均为 2026-08-26 官网页面所示。活动价、库存、区域和续费规则可能变化；方舟的 ¥9.9 是限时入口价，百炼的 ¥39 是限时价，不能当成永久续费价。

---

## 价格与额度：不要再只看「每次多少钱」

### 火山方舟 Coding Plan

方舟保留 Lite / Pro 两档。官网当前显示「限时 ¥9.9 起」，公开活动资料给出的常规定价为 Lite ¥40、Pro ¥200；活动期间常见 ¥9.9 / ¥49.9，但资格和持续月份以结算页为准。

| 套餐 | 常规定价 | 活动入口 | 公开的 5 小时额度 |
|---|---:|---:|---:|
| Lite | ¥40/月 | 限时 ¥9.9 起 | 最多约 1,200 次请求 |
| Pro | ¥200/月 | 常见活动价 ¥49.9 | Lite 的 5 倍，最多约 6,000 次请求 |

需要注意，方舟现在不只有 5 小时窗口，控制台还会展示周/月周期限制。单个复杂 Agent 任务会产生多次底层请求，所以「1,200 次请求」不等于 1,200 次用户提问。

### 百炼 Token Plan

百炼旧 Coding Plan 已进入收尾：Lite 已于 3 月 20 日停止新购，Pro 售罄后不再补货。新用户应比较的是 Token Plan，而不是旧版的 18,000 / 90,000 次月度请求。

| 个人版 | 当前限时价 | 原价 | 每 7 天 Credits | Agent 并发建议 |
|---|---:|---:|---:|---:|
| Lite | ¥39 | ¥60 | 2,500 | 1–2 |
| Standard | ¥139 | ¥180 | 10,000 | 3–4 |
| Pro | ¥499 | ¥600 | 40,000 | 6–8 |

Credits 会按模型、Token 和 Harness 工具的系数扣减；窗口触顶后停止服务，可等 7 天重置或购买用量包。团队版则改为按订阅月发放总 Credits，没有 7 天窗口，并提供席位、用量分析和数据不入训承诺。

### MiniMax Token Plan

MiniMax 的单位最直观：文本模型按 request 计数，每 5 小时滚动恢复；图像、语音、视频和音乐按日额度单独计算。

| 标准版 | 月付 | M2.7 请求额度 |
|---|---:|---:|
| Starter | ¥29 | 600 次 / 5 小时 |
| Plus | ¥49 | 1,500 次 / 5 小时 |
| Max | ¥119 | 4,500 次 / 5 小时 |

另有 M2.7-highspeed 极速版：Plus ¥98、Max ¥199、Ultra ¥899，对应 1,500 / 4,500 / 30,000 次请求每 5 小时。对大多数个人开发者，先从 Plus 开始比直接买极速版更稳妥。

### GLM Coding Plan

GLM 官网当前的月付价格和 3 月版文章已完全不同：

| 套餐 | 月付 | 官网当前额度描述 |
|---|---:|---|
| Lite | ¥118 | 每周 10,000 积分；适合小型 Repo |
| Pro | ¥538 | Lite 的 6 倍；更快生成与精选 MCP |
| Max | ¥1,078 | Lite 的 14 倍；高峰期优先保障 |

连续包季与包年有折扣，实际月均价以页面选择的周期为准。GLM 的重点已经从「约多少 prompt」转向积分和服务等级；不要继续引用旧的 ¥49 / ¥149 / ¥469 或 80 / 400 / 1,600 prompts 作为当前购买依据。

### Kimi Code

Kimi Code 不再是独立的人民币 Coding Plan，而是 Kimi 会员权益之一。所有会员功能共用一个按 Token 消耗的月度额度池，Kimi Code 另有独立的 5 小时和每周速率限制。

| 会员 | 月付 | 年付折合月价 | Agent 额度估算 |
|---|---:|---:|---:|
| Moderato | $19 | $15 | 60 |
| Allegretto | $39 | $31 | 150 |
| Allegro | $99 | $79 | 360 |
| Vivace | $199 | $159 | 720 |

表中的 Agent 额度是官方按典型任务估算的等效值，不是固定的 Code 请求次数。Kimi Code、Agent、Claw、Deep Research、PPT 等会争用同一额度池；如果你只需要第三方 API，Kimi 开放平台按量计费是另一套产品。

---

## 模型与协议：旧版最容易写错的部分

| 平台 | 模型策略 | OpenAI 兼容 | Anthropic 兼容 | 关键限制 |
|---|---|:---:|:---:|---|
| 方舟 | Doubao + GLM + Kimi + MiniMax + DeepSeek，支持 Auto | ✅ | ✅ | 套餐 Key / Base URL 与按量 API 不同 |
| 百炼 | Qwen 为主，聚合 DeepSeek、GLM 等多模态模型 | ✅ | ✅ | 个人版仅华北 2（北京）；Credits 加权扣减 |
| MiniMax | M2.7 单一主力，极速版可用 highspeed | ✅ | ✅ | Token Plan Key 与按量 API Key 不互通 |
| GLM | 聚焦 GLM-5.3 | ✅ | ✅ | 仅限官方支持工具；不同档位并发和优先级不同 |
| Kimi | Kimi Code 默认 K2.7 Code | — | — | 会员权益面向官方 Code CLI / IDE 插件；通用 API 另计费 |

三个重要纠错：

1. **方舟已不是唯一支持 Anthropic 协议的平台。**百炼、MiniMax 和 GLM 也提供 Anthropic 兼容接入。
2. **百炼和 MiniMax 已不是旧 Coding Plan。**继续比较「月请求次数」或 M2.5 已经失真。
3. **Kimi 会员不等于通用 API 套餐。**会员内的 Kimi Code 与开放平台按 Token API 需要分开看。

---

## 场景选型建议

### 预算不超过 ¥50/月

- 想切换多家模型、常用 Claude Code / Cursor：先试方舟 Lite。
- 主要使用 MiniMax、希望额度规则简单：MiniMax Plus ¥49 比 Starter 更适合作为日常主力。
- 想用 Qwen3.8 与多模态 Harness：百炼 Lite 当前限时 ¥39，但要接受 7 天 Credits 窗口。

### 长时间连续跑 Agent

- 先排除「额度单位看起来大」的错觉，分别压测上下文增长、缓存命中和工具调用次数。
- MiniMax 的 request 口径最易理解；方舟请求数较大，但仍有多周期限制。
- 百炼与 GLM 的 Credits / 积分会随模型和上下文复杂度变化；Kimi 还会与其他会员功能共享额度。

### 需要多模型与团队管理

- 个人多模型：方舟或百炼。
- 团队席位、统一用量与数据治理：百炼 Token Plan 团队版更完整。
- 需要 Doubao、Auto 调度和双协议：方舟更直接。

### 只追某一家最新模型

- MiniMax-M2.7：MiniMax Token Plan。
- GLM-5.3：GLM Coding Plan。
- Kimi K2.7 Code：Kimi 会员 / Kimi Code。

---

## 下单前的 5 项检查

1. **确认购买页名称**：Coding Plan、Token Plan、Agent Plan 和会员不是同一产品。
2. **确认专属 Key 与 Base URL**：套餐凭证通常不能和按量 API Key 混用。
3. **确认所有限额周期**：除了 5 小时，还可能有周、月、并发与高峰期限制。
4. **确认工具是否在官方支持列表**：部分厂商禁止把套餐用于自建 SaaS、转售或非支持工具。
5. **先用入门档跑一周真实仓库**：记录每天触顶次数、单任务耗时与上下文增长，再决定年付。

---

## 官方来源与核查时间

- [火山方舟 Coding Plan](https://www.volcengine.com/activity/codingplan)
- [百炼 Token Plan 概述](https://help.aliyun.com/zh/model-studio/token-plan-overview)
- [MiniMax Token Plan 定价](https://platform.minimaxi.com/docs/guides/pricing-token-plan)
- [GLM Coding Plan](https://bigmodel.cn/glm-coding)
- [Kimi 会员价格](https://www.kimi.ai/zh-hans/help/membership/membership-pricing)
- [Kimi K2.7 Code](https://www.kimi.ai/zh-hans/resources/kimi-k2-7-code)

> 最后核查：2026-08-26。本文只比较公开个人订阅的购买决策，不把企业合同价、按量 API 单价或短期赠券混入月费排名。活动价与支持模型仍可能随时变化，下单前请再次打开对应官网确认。
