---
title: "Antigravity vs Cursor 2026：Google 的 Agent IDE 与 Cursor"
description: "2026-10-16：Antigravity 已正式可用，个人版 $0。Google AI Pro/Ultra 没有公布美元价格。Cursor Plus $8 仅 Grok，Premium $30 起第三方模型另计。"
date: "2026-02-17"
updated_at: "2026-10-16"
tags: ["antigravity", "cursor", "对比", "ide", "google"]
pillar: compare
content_status: keep
locale_strategy: mirrored
---

2025 年 11 月，Google 随 Gemini 3 发布了 Antigravity 的公开预览。2026-10-16 的定价页已把它标为 Generally Available。它和 Cursor 都基于 VS Code，设计重点仍然不同。价格不能再写成「预览免费 vs Cursor Pro $20」。

## 一眼看懂

| 维度 | Antigravity | Cursor |
|------|-------------|--------|
| 出品方 | Google | Anysphere |
| 状态 | Generally Available | 在售 |
| 个人价格 | Individual $0/月 | Free $0；Plus $8；Premium $30 |
| 更高档 | Google AI Pro / Ultra：更高限额，美元价格未公布。Gemini Enterprise 起价 $30/席/月 | Super $100；Ultra $200。Teams 起价 $30/用户/月 |
| 核心模型 | 个人版写「多种 Agent 模型」。Gemini 4 Argon 面向 Google AI Pro 与 Ultra | Plus 仅 Grok。第三方模型从 Premium 起按 API 标价另计 |
| Agent 架构 | Agent-First（多 Agent 并行） | Composer，可派子 Agent |
| 浏览器控制 | 内置 | 需 MCP |
| 产出物 | Artifacts | 无同等内置产物 |
| 国内可用 | 需代理 | 需代理 |

来源：[antigravity.google/pricing](https://antigravity.google/pricing)、[cursor.com/en/pricing](https://cursor.com/en/pricing)。`antigravity.dev` 现在是 nginx 默认页，不是产品站。

---

## 定价

**Antigravity** 不再是公开预览，也没有「预计 Pro 约 $20/月」这一条。

| 套餐 | 价格 | 定价页写了什么 |
|------|------|----------------|
| Individual | $0/月 | 多种 Agent 模型，无限 Tab 与 Command，基础的每周速率限制 |
| Google AI Pro | 未标美元价 | 更高速率限制和 AI credit 池。首页写 Gemini 4 Argon 面向 Pro 与 Ultra |
| Google AI Ultra | 未标美元价 | 比 Pro 更高的限额和 AI credit 池 |
| Gemini Enterprise | $30 起/席/月 | Standard/Plus。另有 $0 席位费的按量方案 |

旧记录里的 AI Pro $20、Ultra $249.99、每天约 20 次、$25/2,500 credits，都不在当前定价页上。这里不把它们当成现价。

**Cursor**：

| 套餐 | 价格 | 定价页写了什么 |
|------|------|----------------|
| Free | $0 | 有限 AI 用量 |
| Plus | $8/月 | 周刷新用量池，仅 Grok。美元额度未公布 |
| Premium | $30/月 | Plus 的 4 倍。第三方模型按 API 标价另计 |
| Ultra | $200/月 | Plus 的 50 倍。不是「Claude Opus 必须买 Ultra」 |

> **结论**：两边都有 $0 个人档。Antigravity Individual 写了多种 Agent 模型和基础每周限额，没有写每个具名模型是否都在这一档里。Cursor Free 是有限用量；要 Claude / GPT / Gemini，至少 Premium $30，并且这些模型另计。不能再说「Antigravity 免费用 Opus，Cursor 要 $20」。

---

## Agent 架构

这是两者的产品差异，不是价格差异。

### Cursor

任务从对话开始，按步骤执行，中间可以确认。Sub-agent 可以并行处理子任务，主流程仍由这一轮对话带动。

### Antigravity

Agent 同时使用编辑器、终端和浏览器：

- **Artifacts**：任务列表、实现说明、截图、浏览器录制，可以在改代码前看
- **浏览器**：Agent 可以打开页面、点击、截图
- **并行**：多个 Agent 推进不同任务

定价页没有因为 GA 改写这套架构说明。上面是产品形态，不是 2026-10-16 新测的一次跑分。

---

## 模型

| 问题 | Antigravity | Cursor |
|------|-------------|--------|
| 个人版 $0 包含什么 | 多种 Agent 模型。具名清单没有逐项写进免费限额 | 有限用量。不是第三方模型的包含额度 |
| Gemini 4 Argon | 首页写给 Google AI Pro 与 Ultra | 工具数据未把它列为 Cursor 模型 |
| Claude / GPT | 工具数据里有 Claude Sonnet 4.5、Opus 4.5 Thinking、GPT-OSS。是否在 Individual 的每周限额内，定价页没写 | Premium 起按 API 标价另计。不要求必须买 Ultra |

---

## 代码补全

- **Cursor Tab**：补全速度仍是选它的功能理由。定价页没有写 Tab 无限或不计费
- **Antigravity**：Individual 写明无限 Tab 与 Command。补全质量相对 Cursor 谁更好，这次定价核对没有重测

> 如果判断标准是补全手感，需要自己试用。价格页只能说明 Antigravity 的 $0 档写了无限 Tab，Cursor 的定价页没有同等句子。

---

## 成熟度

Cursor 已销售多年，Teams 档写了集中账单和 SSO。

Antigravity 在 2025-11-18 以公开预览发布。2026-10-16 的定价页标为 Generally Available。预览发布后不久，社区报告过安全问题。这次没有重核那些问题是否已修复，GA 标记也不等于合规认证已经公布。

生产环境要不要用，看你的安全审查，不看「它还在预览所以先别用」或「它已经 GA 所以可以放心」。

---

## 国内可用性

两者都需要代理。国内可用方案见 [Trae CN](/tool/trae-cn) 或 [Cline + 火山方舟](https://www.volcengine.com/L/s3lNTNYxaEc/)（[配置指南](/guides/cline-ark-setup)）。

---

## 谁应该选哪个

**选 Antigravity Individual，如果你：**

- 要先用 $0 档，并接受基础每周速率限制
- 需要内置浏览器和 Artifacts
- 已经在 GCP / Firebase 里

**不要因为「预览期免费的 Opus」来选。** 那条已经不能从当前定价页推出。Google AI Pro / Ultra 的美元价格也没有公布。

**选 Cursor，如果你：**

- 只需要 Grok：Plus $8
- 需要 Cursor 里的第三方模型和云端 Agent：Premium $30 起，第三方模型另计
- 团队要从 $30/用户/月的 Teams 档看 SSO 和集中账单

---

## 两个一起用

可以。理由不是「一个免费、一个 $20」。

Antigravity Individual 是 $0，带基础每周限额。Cursor Free 也是 $0，用量有限。Cursor 里的非 Grok 模型从 Premium 起另计 API。两个都用时，Cursor 侧的账单按实际调用的模型算，不是按一份 $20 订阅封顶。

---

## 总结

| | Antigravity | Cursor |
|---|-------------|--------|
| 个人版 $0 | 有。多种 Agent 模型，基础每周限额 | 有。有限用量 |
| 已公布的下一档美元价 | 没有。Pro/Ultra 未标价。Enterprise 从 $30/席起 | Plus $8（仅 Grok），Premium $30（第三方另计） |
| 状态 | Generally Available | 在售 |
| 更适合 | 浏览器内 Agent、Google 生态 | Grok 低价档，或接受 API 另计的 IDE Agent |

> 价格核对：2026-10-16。Google AI Pro / Ultra 的美元价格、Antigravity 旧的「每天约 20 次」和 $25/2,500 credits、Cursor 用量池的美元大小，当前页面都没有公布。
