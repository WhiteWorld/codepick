---
title: "Cursor 怎么控制花费：定价页改了之后还成立的做法"
description: "Cursor 已没有 Pro $20 和 $20 额度池。本文按 2026-10-16 定价页说明 Plus、Premium 和 API 另计的差别，以及仍然能减少调用的做法。"
date: "2026-04-05"
updated_at: "2026-10-16"
article_type: "review"
tags: ["cursor", "省钱", "token", "效率", "auto模式", "cursorrules"]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

2026-10-16 的 [Cursor 定价页](https://cursor.com/en/pricing) 上，没有 Pro $20，也没有「每月 $20 额度池」或「Auto 无限」。个人档是 Free $0、Plus $8、Premium $30、Super $100、Ultra $200。用量池与 Grok 共享，按周刷新。页面没有写出这个池的美元大小。

Plus 只有 Grok 模型。Premium 及以上的 Claude、GPT、Gemini 等第三方模型按 API 标价另计，不包含在月费里。所以「把 $20 额度用到月底」和「升级到 Pro+ $60 买 $70 额度」都不再成立。先选对档，再减少按 API 标价计费的调用。

---

## 先看清现在怎么计费

| 套餐 | 价格 | 和花费有关的事实 |
|------|------|------------------|
| Free | $0 | 有限 AI 用量 |
| Plus | $8/月 | 周刷新用量池，仅 Grok。美元额度未公布 |
| Premium | $30/月 | Plus 的 4 倍。第三方模型按 API 标价另计 |
| Super | $100/月 | Plus 的 15 倍。第三方模型另计 |
| Ultra | $200/月 | Plus 的 50 倍。第三方模型另计 |

旧文里的这些说法，当前定价页没有：

- 每月 $20 / $70 / $400 的额度池
- Auto 模式无限，或 Auto 九折
- Tab 补全不占额度、可以无限用
- 超出后按每次 $0.04–$0.50 计

没有这些数字，就不能按「第 1–3 周花掉 $12–15」来排一个月的预算。

---

## 方法 1：按模型选档，而不是按旧 Pro 续费

- 只用 Grok：Plus，$8/月。这是当前最便宜的付费个人档
- 需要 Claude、GPT、Gemini，或定价页写明的云端 Agent：至少 Premium，$30/月。第三方模型的 API 账单在月费之外
- Super 和 Ultra 是 Plus 用量的 15 倍和 50 倍。Plus 的美元大小没有公布，不能把倍数换成「多花 3 倍钱买 3.5 倍额度」

如果工作主要不是 Grok，Plus 省下的月费换不来那些模型。

---

## 方法 2：能用 Chat 做完的，不要开 Agent

Agent 会读多个文件、调用工具、拉长上下文。第三方模型按 API 标价计费时，上下文越长，单次越贵。

| 场景 | 更省的做法 |
|------|------------|
| 解释一段代码、查 API | Chat |
| 写一个功能、改多个文件、修 bug 并跑测试 | Agent |

定价页没有给出 Chat 和 Agent 的价差比例。这里只保留机制：少一次多文件 Agent，就少一段按 token 计的输入和输出。

---

## 方法 3：缩短每次请求都要带上的规则

Cursor 会把规则文件附在 Agent / Chat 请求上。规则越长，按 API 标价计费时输入越贵。

把项目说明放到单独文档里，用 `@` 按需引用。任务指令写在当次对话里。不要把几千字的说明放进每次都发送的规则文件。

定价页没有给出「能省百分之几」。能确定的是：这段文字每次都会被发送。

---

## 方法 4：把大任务拆开

一次把很多文件交给 Agent，上下文会变大。第三方模型按 token 计费时，更大的上下文更贵。定价页没有公布「一次做完」和「拆开做」的实测倍数，所以这里不写 2–3 倍。

可以先要一个短计划，再按模块执行。一个阶段结束后新开对话，避免把前面的上下文一直带下去。

---

## 方法 5：不要再把 Tab 当成免费额度

旧 Pro 的说法是 Tab 不占额度池。2026-10-16 的定价页没有写 Tab 是否从周用量池里扣，也没有写 Tab 无限。

小改动仍可以先用补全。这只是少发一次 Chat。不能把它算成「每月省下 10%–15% 的 $20 额度」。

---

## 方法 6：包含用量不够时，不要按旧档升级

定价页没有 Pro+，也没有 $70 额度池。用量池用完之后，第三方模型继续按 API 标价计。提高 Super 或 Ultra 只提高 Plus 用量倍数，美元价值没有公布。

还可以换工具，而不是在 Cursor 里加一档：

- **Cline + 火山方舟**：国内 API，按该方案自己的价格付。配置见 [设置教程](/zh/guides/cline-ark-setup)
- **Windsurf Free**：轻度配额。2026-10-16 的定价页没有再写 25 credits，也没有写具体 credit 数。Pro 是 $20/月，不是 $15
- **GitHub Copilot Pro**：$10/月，合计 1,500 AI Credits。补全不消耗 Credits。适合工作能放进 Copilot 的情况

---

## 还成立的，和不成立的

| 做法 | 现在 |
|------|------|
| 只用 Grok 时选 Plus | 成立。$8/月，模型范围就是 Grok |
| 用 Chat 代替能不做的 Agent | 成立。第三方模型按 token 计费 |
| 缩短规则、拆开大任务 | 成立。减少每次请求的 token。没有官方节省比例 |
| 把 Tab 当成无限免费额度 | 不成立。定价页没写 |
| 用 Auto 九折把 $20 额度撑过一个月 | 不成立。没有这档，也没有这个折扣的记录 |
| 升级到 Pro+ $60 买更大的美元池 | 不成立。该档已不在定价页 |
| 月底改用 Windsurf 的 25 credits | 不成立。credit 数没有公布 |

## 相关

- [Cursor vs Windsurf](/zh/compare/cursor-vs-windsurf)
- [Cline + 火山方舟设置教程](/zh/guides/cline-ark-setup)
- [Claude Code Token 节省指南](/zh/guides/claude-code-token-saving)

> 价格核对：2026-10-16。Cursor 用量池的美元大小未公布。Windsurf 的 credit 数、$15 老用户价和学生折扣，当前定价页没有写，这里不补。
