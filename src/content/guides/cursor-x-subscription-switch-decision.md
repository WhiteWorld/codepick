---
title: "Cursor 老用户要不要切到 The X Subscription？保留、迁移、改用 API 的决策表"
description: "给已经在用 Cursor 的人：按主力模型决定留旧计划、切到 The X Subscription，还是把第三方用量改去 Copilot 或 Claude。2026-10-20 论坛回复：切换是 opt-in，不切则旧计划不变，切换永久。"
date: "2026-10-17"
updated_at: "2026-10-22"
article_type: review
tags: [cursor, 老用户, 切换, x-subscription, 迁移]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

## 先说结论

2026-10-22 打开了论坛 [第 408 楼](https://forum.cursor.com/t/introducing-the-x-subscription/174450/408)。帮助页、公告和模型文档仍是 2026-10-17 的核对，这次没有重开。@Colin 在 2026-10-20 写明：切到 The X Subscription 是 opt-in。不切，现在的 Cursor 计划照旧，包括第三方模型用量。切换永久。老用户的默认动作仍是先别切。例外是：主力模型已经是 Grok 或 Composer，而且你接受切换永久、不能撤销。

| 你的情况 | 动作 |
|----------|------|
| 每天主要开 Claude、GPT 或 Gemini，旧计划里这些模型还算包含用量 | 留在旧计划 |
| 每天主要开 Grok 或 Composer，也愿意把 Grok、Cursor、X 放在同一张账单 | 可以切。先看账单设置里有没有入口 |
| 第三方模型还要用，但不想赌旧计划能留多久 | 先用下面的公式算月成本，再决定预充值，还是改 Copilot Pro+ / Max、Claude Max |

档位价格不在这里展开。Free、Plus $8、Premium $30、Super $100、Ultra $200，以及 Premium 为 Plus 的 4 倍、Super 15 倍、Ultra 50 倍，写在 [Cursor 怎么控制花费](/zh/guides/cursor-cost-saving/) 里，原始页面是 [cursor.com/pricing](https://cursor.com/pricing)。这篇只回答要不要从旧计划挪走。

## 和切换有关的官方事实

2026-10-12，[xAI 公告](https://x.ai/news/x-subscription) 发布 The X Subscription。同一天论坛开帖：[Introducing The X Subscription](https://forum.cursor.com/t/introducing-the-x-subscription/174450)。

帮助页、公告、模型文档是 2026-10-17 打开的，这次没有重开。下面是那次核对里和「动不动」有关的句子。2026-10-20 的论坛原话在「留下旧计划」一节，2026-10-22 打开的是第 408 楼。

付费档有一份 Grok 模型用量，Grok 和 Cursor 共用，按周刷新。[帮助页](https://cursor.com/help/the-x-subscription/overview) 写的是 shared weekly included pool。[模型与定价](https://cursor.com/docs/models-and-pricing) 写这个池覆盖 Grok 4.7、Grok 4.6、Grok 4.5 和 Composer 2.5，编辑器、CLI、Cloud Agents、Grok Bot 和 Grok 应用一起扣。各产品扣多少不一样。Grok API 另计，不扣这个池。池子的美元大小，公告、定价页、帮助页、模型文档都没写。这里不估 Plus 或 Premium 能跑多少次。

第三方模型从 Premium 起才能用。模型文档点名 Claude、GPT、Gemini，并写：不在包含池里，按该模型的 API 标价，从第一个请求起，用预充值付。帮助页举例只写了 Claude、GPT。定价页和公告写 third-party models，没有点名 Gemini。Plus 不能用这些模型。模型文档还写 Plus 不能开 Auto、Cloud Agents、Automations、Bugbot、Origin，也不能填自己的 API key。要用后面这些，从 Premium 起。

公告和帮助页都写：现有用户可以留在现在的计划、价格和功能上。帮助页的原意是，除非你自己改或取消，当前计划继续。现有的个人客户仍可以在旧 Cursor 档之间升降级，不用先切到新计划；通过 Apple App Store 扣费的除外，那种要先切。团队也可以继续加席位、改席位档，不用先切。

帮助页写明切换永久。原句：The switch is permanent. It can't be undone, and Support can't undo it for you.

结账时，你勾选的 Cursor、SuperGrok 和付费 X Premium 会被取消，未使用时间自动按比例退款。通过 Apple 付的 Cursor，官方不能取消也不能退，要自己在 iPhone 或 iPad 的设置里取消，否则 Apple 继续扣。帮助页说切换后会发邮件提醒。

个人计划的第三方请求不加 Cursor Token Rate。Teams 和 Enterprise 要加，模型文档写每百万 token $0.25，加在 API 标价上，从团队预充值扣。输入、输出、缓存 token 都算。

公告写：每个新档用自家模型写代码的用量，至少是「可比的 Cursor 计划」的 2 倍。论坛 @Colin 在 2026-10-13 把 Premium 的比较对象说成 Cursor Pro，比的是 Grok 模型的编程用量。这是相对倍数，不是美元，也不包含第三方模型。

模型文档另有年付标价：Plus $80、Premium $300、Super $1,000、Ultra $2,000，不含税。这只是年付价格，不是额度。

## 按主力模型分流

先看你这周实际选中的模型名。

主力是 Grok 或 Composer。新计划的周池覆盖这条路。官方说，Grok 编程用量相对可比的旧 Cursor 计划至少 2 倍，而且按周刷新，所以一天用得多，不会把整月吃掉。够不够你自己的量，页上没有绝对数字。切之前看旧账单里的用量，切之后看 grok.com/dashboard 的 Usage。Grok 聊天、Imagine、Voice、Grok Bot 和 Cursor 共用这一池。

主力是 Claude、GPT 或 Gemini。新计划的月费不包含这些请求。Premium、Super、Ultra 都从第一个请求起按 API 标价走预充值。升到 Super 或 Ultra，只是把 Grok 池放到 Plus 的 15 倍或 50 倍，第三方单价不变。几乎不用 Grok 的人，多出来的月费换不来这批请求。

同一个人两边都用，就拆开。Grok / Composer 看周池够不够，美元大小未公布。第三方那部分从第一请求加进预充值，用下一节的公式。

旧的 Pro+（$60）没有一一对应的新档。@Colin 同一天写了：不必现在切，有变化会提前通知；Premium 面向新的 AI 用户，Super 面向每天用 Agent 的人。这是推荐口径，不是用量换算。

## 先别切

中了任何一条，这周留在旧计划：

- 第三方模型仍是主力，而且你还在旧的 Pro、Pro+ 或 Ultra 上。模型文档写这些 legacy 档对现有客户继续有效，有两份额度池，超出走 on-demand。
- 还没从账单里找出近一个月各模型的 token。没有这个数，公式算的是别人的账。
- Cursor 通过 Apple App Store 扣款。切完官方退不了那一笔，你不自己取消就会两头扣。
- 你还想保留「切错了可以回来」。帮助页写了不能撤销。2026-10-20 @Colin 又写了 Switching is permanent，以及旧计划结束后不能再买回。
- 你是 Enterprise。帮助页写：没有活跃 Grok 账号的 Cursor Enterprise 要找客户团队才能切；其他 Enterprise 还不能切。
- 只是因为 Plus $8 比旧 Pro $20 低。Plus 没有 Claude、GPT、Gemini。

入口不是人手一份。公告和论坛开帖都说，接下来几天出现在账单设置里。我没有登录任何账号，所以「你今天能不能切」是未知，以你自己的 billing settings 为准。公告还写切换带限时优惠，内容也在账单设置里。优惠是什么，未知。

## 留下旧计划，风险在哪

帮助页：[切换是可选的](https://cursor.com/help/the-x-subscription/overview)。不改、不取消，当前计划、价格、功能继续。[公告](https://x.ai/news/x-subscription) 写 Nothing changes，现有 SuperGrok、Cursor、X Premium 用户可以保留当前计划、价格和功能。

论坛官方回复比这两页多了一句期限。@Colin 在 2026-10-13 回复「现在的 $20 计划会怎样」：

> Nothing happens to your Pro plan automatically. You can keep it at the same price with the same features for now. Users who don’t choose to migrate will, sometime in the future, be migrated with advance notice.

for now 出现在这句里。帮助页和公告没有这四个词，也没有截止日期。

同一天，他回复「留在现有 Ultra、不切，包含的第三方用量还在不在」：

> If you stay on your current Ultra plan, your included third-party usage continues as it is today.

下一句不是 for now：

> On how long the current plan lasts: it isn’t going away today, and there’s no timeline for moving remaining customers. If that changes, you’ll get advance notice first.

按 10 月 13 日这两段：今天不会被强制迁，也没有公布日期。将来迁不迁、迁到哪一档、通知提前多久，这三件当时是未知。

2026-10-20，@Colin 在 [第 408 楼](https://forum.cursor.com/t/introducing-the-x-subscription/174450/408) 又写了一段。2026-10-22 打开核对的是这一楼。

> To be clear: for existing subscribers, switching is opt-in. If you’re on a current Cursor plan, it keeps working exactly as it does today, including its third-party model usage, unless you choose to switch. You can also keep moving between legacy plans (Pro → Ultra, Ultra → Pro+, etc.). There’s no timeline for migrating existing plans, and we’ll give advance notice before anything changes.

opt-in 就是自己选了才切。不切，现在的 Cursor 计划照旧，第三方模型用量也照旧。旧档之间仍可以升降，他举的例子是 Pro 到 Ultra、Ultra 到 Pro+。没有迁移时间表。有变化会提前通知。

这楼没有再写 10 月 13 日那句 “will be migrated”。10 月 13 日的回复还在帖里。两段都算他说过的话。日期仍然没有。

同一楼后面写切换当时会发生什么：

> Before checkout, you’ll confirm that third-party models aren’t included in the plan price and are billed separately based on usage. Switching is permanent, and legacy plans can’t be repurchased once they end. If third-party models or a monthly usage pool matter most to you, staying on your current plan is a perfectly good choice.

结账前要确认：第三方模型不在档位月费里，按用量另算。切换永久。旧计划一旦结束，不能再买回来。这句写在切换流程里。自己取消、但没有走切换，这一楼没有单独说。第三方模型或按月的用量池更要紧的话，他写留下当前计划完全可以。

同一楼后半在看已经切过去的人，额度是不是掉得比预期快。那不是「不切则旧计划不变」的条件，这里不展开。

自己取消旧计划、但没有切到新计划，之后还能不能再订 Pro、Pro+ 或 Ultra，第 408 楼没有单独写，仍是未知。切换之后不能再买回，上面那句已经写了。Colin 在更早的回复里写以前的 Cursor Ultra 已经不对新用户开放。模型文档把 Pro、Pro+、Ultra、Start，以及 Teams 的 Standard 和 Premium，称为 legacy，并写它们对现有客户继续有效。没写「只取消、不切换」之后能否重新订阅。

## 同一份第三方用量怎么复算

只算第三方模型。Grok 周池不抵这笔。个人计划：

**新计划月成本 = 档位月费 + 按 API 标价算出的预充值**

预充值 = 输入百万 token × 输入标价 + 输出百万 token × 输出标价 + 缓存写入和缓存读取。标价用当天的 [模型与定价](https://cursor.com/docs/models-and-pricing)。升 Super 或 Ultra 不改变这一段。

团队在个人公式之外，再加上 Cursor Token Rate：每百万 token $0.25，输入、输出、缓存都算。

预充值是先付钱再扣，不是月底补账单。[用量页](https://cursor.com/help/account-and-billing/overages) 写：手动充或打开 Auto Top-up 时扣款。Auto Top-up 默认关。已买的 credit 用完或过期前都在，页上写目前是购买后 365 天。还可以设每月额外用量上限，到顶就停，即使账上还有余额。

**Copilot Pro+ / Max 月成本 = 套餐价 + max(0, 用掉的 credits − 包含 credits) × $0.01**

2026-10-17 的 [计划页](https://docs.github.com/en/copilot/get-started/plans)：Pro+ 每月 $39，合计 7,000 credits（base 3,900 + flex 3,100）；Max 每月 $100，合计 20,000 credits（base 10,000 + flex 10,000）。[模型定价](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) 写 1 credit = $0.01，超出同价。credits = 该页的美元标价 ÷ 0.01。flex 是页面上的赠额，以后改不改，页上没承诺。补全不扣 credits，这笔只算会扣 credits 的调用。额度机制见 [Copilot AI Credits](/zh/guides/copilot-ai-credits-billing/)。

**Claude Max 月成本 = 订阅价 + 超出窗口后、打开 usage credits 的那一段 API 价**

2026-10-17 的 [帮助中心](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)（页眉为 Updated this week）：Max 5x 每月 $100，Max 20x 每月 $200，网页订阅、仅月付。窗口是 Pro 的 5 倍或 20 倍，每 5 小时重置，另有周上限。窗口里有多少 token，页上没写，不能把 $100 当成 $100 的 API。放不放得下，看 Claude 的 Settings → Usage，这里是未知。

[定价页](https://www.anthropic.com/pricing) 另写 Max 含每月 $100 到 $200 的 Claude Platform API credits。帮助中心只说含 monthly API credits，没写这些 credits 能不能抵 Claude Code 窗口里的同一批用量。算例不把它们当折扣。抵扣方式未知。窗口机制见 [Claude Max 性价比](/zh/guides/claude-max-plan-value-analysis/)，那篇核对日更早，订阅价以本节为准。

三笔账不在同一个产品里。预充值发生在 Cursor。credits 发生在 Copilot。Max 的窗口发生在 Claude 和 Claude Code。模型可以选同一个，编辑器不是同一个。

### 示例数字

下面的 token 数是为了把公式算通。页上没有这组数，也不是测量出来的月用量。

假设某月只用 Claude Sonnet 5.5：2,000 万输入 token，200 万输出 token。不计缓存，不计美国专属端点加价，不计长上下文加价。

2026-10-17，Cursor 模型页和 Copilot 模型页对这款的输入/输出都是每百万 token $2 / $10。

API 标价 = 20 × $2 + 2 × $10 = **$60**。

Copilot credits = 20 × 200 + 2 × 1,000 = **6,000**。输入 $2/M 等于 200 credits/M，输出 $10/M 等于 1,000 credits/M。

| 算法 | 这笔示例的月成本 | 这个数从哪来 |
|------|------------------|--------------|
| Premium | $90 | $30 月费 + $60 预充值 |
| Super | $160 | $100 月费 + $60。第三方单价没变 |
| Ultra | $260 | $200 月费 + $60。第三方单价没变 |
| Copilot Pro+ | $39 | 6,000 credits，低于包含的 7,000 |
| Copilot Max | $100 | 6,000 credits，低于包含的 20,000 |
| Claude Max 5x | $100，外加未知 | 窗口若装得下就停在订阅价。装不装得下，未公布 |
| Claude Max 20x | $200，外加未知 | 同上 |

在这组示例数字里，同样的 Sonnet 用量，Pro+ 是 $39，Premium 是 $90。6,000 credits 落在 Pro+ 的包含额度里。Premium 的月费不包含这 $60。如果你根本不用 Sonnet、只用 Grok 或 Composer，这 $60 不该出现，这张表也不能用来选 Plus 还是 Premium。

缓存一加上，数会变。Sonnet 5.5 在 Cursor 模型页上，缓存写入 $2.50/M，缓存读取 $0.10/M。一次 Agent 里缓存占多少，取决于会话，这里不代填。

## 动手之前的三步

1. 打开账单设置，看有没有切换入口。没有就还没轮到你。
2. 看扣款是不是 Apple。是的话，先读帮助页里「不能代取消、不能代退款」那句。
3. 把上个月的第三方 token 代进公式。算完仍要切，再接受永久、不能撤销。

切换当天开始新的计费周期。按比例退款怎么逐项算，帮助页指向 Invoices & Refunds。这次没有打开那一页的计算公式，所以退款公式写未知。能确认的是帮助 overview 写了会自动按比例退，Apple 除外。

## 相关

- [Cursor 怎么控制花费](/zh/guides/cursor-cost-saving/)：档位，以及少发请求的做法
- [AI 编程工具月成本对比 2026](/zh/compare/ai-coding-cost-comparison-2026/)
- [Copilot AI Credits 计费](/zh/guides/copilot-ai-credits-billing/)
- [Rate limit 怎么处理](/zh/guides/ai-coding-rate-limits/)
- [Claude Max 性价比](/zh/guides/claude-max-plan-value-analysis/)

## 写成未知的

- 周池的美元大小，以及 Plus、Premium 能跑多少次请求：未公布
- 旧计划何时迁、迁到哪一档、提前多久通知：10 月 20 日仍写没有时间表，有变化会提前通知。日期未知
- 只取消、不切换之后能否重新订阅：未知。切换之后不能再买回，第 408 楼写了
- 你的账号今天能否看到切换入口，以及限时优惠的内容：未知
- 按比例退款的分项公式：未知
- Claude Max 附带的 Platform API credits 能否抵同一批编码用量：未知
- 上一节的 token 数：示例数字
