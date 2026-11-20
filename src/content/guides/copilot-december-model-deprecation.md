---
title: "GitHub Copilot 12 月 14 日要下线 6 个模型，该怎么换？"
description: "核查日 2026-11-20。GitHub 将于 2026-12-14 在所有 Copilot 体验中下线 Claude Fable 5、Claude Haiku 4.5、Gemini 3.8 Flash、Gemini 4 Argon、Grok 4.6、Kimi K3。个人年付订阅可继续使用 Haiku 4.5。Kimi K3 的建议替代尚未公布。本文没有实测 Copilot，也没有调用付费接口。"
date: "2026-11-20"
article_type: howto
tags: [copilot, model-deprecation]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "个人年付是不是这 6 个模型都不用改？"
    a: |
      不是。公告只写了 Claude Haiku 4.5 会留给个人 GitHub Copilot 年付订阅，对这类客户，Haiku 4.5 的下线不适用。其他五个模型没有这条例外。公告也没有把例外写到团队或组织使用，以及 Business 或 Enterprise 里的 Haiku 4.5。
  - q: "Kimi K3 该换成哪个？"
    a: |
      公告里的建议替代写的是 To be announced，也就是尚未公布。本文不推测该换哪个，请以之后的官方说明为准。
  - q: "仓库里该搜哪个模型 ID？"
    a: |
      这则 changelog 没有给模型 ID。只搜显示名。不要自己编一串小写连字符 ID。具体搜法见模型下线自查清单。
  - q: "Business 和 Enterprise 会不会自动启用替代模型？"
    a: |
      公告说：在默认模型启用下，建议替代会自动对 Copilot Enterprise 和 Copilot Business 客户启用，除非管理员关掉了全局默认，或明确禁用了该模型。如果已经关掉全局默认，要通过 Copilot 设置里的模型策略启用替代。启用后，用户会在受支持体验的 Copilot Chat 模型选择器里看到它。工作流或集成如果仍指向旧显示名，仍要在 2026-12-14 前改。本文没有打开管理控制台核对开关。
---

> 核查日：2026-11-20（北京时间）。依据当天打开的 GitHub [12 月模型下线公告](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/) 和 [Copilot 支持的模型](https://docs.github.com/en/copilot/reference/ai-models/supported-models)。管理员侧的配置说明，只对照 [配置模型访问](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) 页上的原文，没有打开组织或企业控制台。本文没有登录 Copilot、没有实测模型选择器或策略开关，也没有调用付费接口。

工作流、集成或模型选择器如果还指着下面这 6 个显示名，到 **2026-12-14** 就需要改。例外是个人年付订阅里的 Claude Haiku 4.5：公告写明，它会留给个人 GitHub Copilot 年付订阅，这次下线不适用于这些客户。其他五个模型没有这条例外。公告写的是：将在所有 GitHub Copilot 体验中下线这些模型，范围包括 Copilot Chat、inline edits、ask 和 agent 模式，以及 code completions。页上没有写当天几点、按哪个时区截止，本文不自行换算成北京时间的某一分钟。

Copilot 的产品和订阅说明见 [Copilot 工具页](/zh/tool/copilot/)。这篇文章只覆盖 12 月 14 日这一批。更早的批次，以及仓库里怎么搜写死的名字或 ID，见 [模型下线自查清单](/zh/guides/model-deprecation-checklist/)。那份清单的核查日是 2026-10-22，比本文早；Grok 4.5 以 2026-11-20 打开的 [支持模型页](https://docs.github.com/en/copilot/reference/ai-models/supported-models) 为准。本文不替代那份清单。

## 官方下线表

来源是 2026-11-13 的 [changelog](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/)。日期和建议替代都以这则为准。当天打开的支持模型页里，「Model retirement history」还没有补上 2026-12-14 这一批，因此不以那张历史表来确认替代型号。

| 公告中的显示名 | 下线日期 | 建议替代 |
| --- | --- | --- |
| Claude Fable 5 | 2026-12-14 | Claude Fable 5.2 |
| Claude Haiku 4.5* | 2026-12-14 | Claude Haiku 5.5 |
| Gemini 3.8 Flash | 2026-12-14 | Gemini 4 Hydrogen |
| Gemini 4 Argon | 2026-12-14 | Gemini 4 Carbon |
| Grok 4.6 | 2026-12-14 | Grok 4.7 |
| Kimi K3 | 2026-12-14 | To be announced |

\*公告脚注：Claude Haiku 4.5 会留给个人 GitHub Copilot 年付订阅。Claude Haiku 4.5 的下线不适用于这些客户。

这条例外只覆盖个人年付订阅里的 Claude Haiku 4.5。其他五个模型没有这条例外。公告也没有把例外写到团队或组织使用，以及 Business 或 Enterprise 里的 Haiku 4.5。

Kimi K3 的建议替代，官方写的是 To be announced。本文不猜测该换哪个。

Gemini 4 Hydrogen 和 Gemini 4 Carbon 是官方的 Gemini 4 型号名，背景见 [Gemini 4 怎么选](/zh/guides/gemini-4-models/)，这里不重复那篇的对比。

这则 changelog 只有显示名，没有模型 ID。ID 未知。仓库或配置里不要自己编一串小写连字符 ID；要搜，就搜这些显示名。具体搜法见 [模型下线自查清单](/zh/guides/model-deprecation-checklist/)。

2026-11-20 打开的支持模型页上，这六个显示名仍列在当前可用表里，状态是 GA。这和「还没到下线日」是一致的，不要写成它们已经下线。

## 个人用户要改什么

公告要求：请在此日期前，把工作流和集成改到仍受支持的模型。

[配置模型访问](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) 对个人计划的说法是：可以直接在 Copilot 里使用 AI 模型，不用单独配置访问或管理策略。同页还写了：Copilot Free 和 Copilot Student 只能使用 auto model selection。本文没有核对这些计划在下线日会怎样改选，也不把「不用配置策略」理解成「写死旧显示名的工作流不用改」。

如果你是个人年付订阅，按公告可以继续使用 Claude Haiku 4.5。其他五个该换的还是要换；Kimi K3 的替代尚未公布。

下线之后，公告写明：不必再动手去移除这些模型。

## Business 和 Enterprise 管理员要核对什么

Copilot Business 和 Copilot Enterprise 不能只看个人侧。公告写了默认模型启用（default model enablement）：建议替代会自动对这些客户启用，除非管理员关掉了全局默认，或明确禁用了该模型。如果已经关掉全局默认，要通过 Copilot 设置里的模型策略，启用这些替代模型。

启用之后，用户会在受支持的 GitHub Copilot 体验里，于 Copilot Chat 模型选择器中看到该模型。

[配置模型访问](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) 还写了：企业或组织所有者，可以为持有 Copilot Enterprise 或 Copilot Business 席位的成员启用或限制特定模型。详细步骤以那篇文档及其指向的页面为准。本文没有打开管理控制台，也不编点击路径。

有疑问的 GitHub Enterprise 客户，公告建议联系自己的客户团队。

## 两份官方页面不一致的地方

请把两页分开看，不要合成一张表。

- 12 月 14 日的日期、六行显示名，以及具体的建议替代（例如 Gemini 4 Hydrogen，而不是「最新 Gemini」这种泛称），以 [changelog](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/) 为准。
- 2026-11-20 打开的 [支持模型页](https://docs.github.com/en/copilot/reference/ai-models/supported-models) 里，当前可用表仍把这六个列为 GA；但同页的 Model retirement history 只列到了 2026-11-16 那一批，以及更早的下线，还没有 2026-12-14 的行。历史表里对旧批次常用 “Latest … model” 这种写法，不能拿来替换 changelog 里的具体替代名。

11 月 16 日那一批已经过了下线日。细节和更早的 10 月 19 日批次，见 [模型下线自查清单](/zh/guides/model-deprecation-checklist/)。该清单核查日是 2026-10-22，早于本文。2026-11-20 打开的支持模型页仍把 Grok 4.5 列在当前可用表里，状态是 GA，下线历史里也没有 Grok 4.5 这一行；Grok 4.5 以这页为准。本文不改那份清单的正文，也不再抄那两张表，也没有为写这篇文章重新打开那两则旧公告。

## 换到 Fable 5.2 时要知道的一句说明

支持模型页给 Claude Fable 5、Claude Fable 5.1、Claude Fable 5.2 加了脚注：默认情况下，Anthropic 会保留数据（包括提示和输出），用于运行检测有害使用的安全分类器。页上还写了在 2026 年底前申请 zero data retention（ZDR）的时限例外，以及企业仍须由管理员启用模型等条件。本文没有核验谁有资格，也没有核验管理员是否已开启。需要的话请直接读官方脚注，不要把这篇文章当成隐私或合规审查。

## 本文没有核实的事

- 没有登录 GitHub 或 Copilot，没有改账号或策略，没有看过真实的模型选择器。
- 没有调用付费接口，也没有做现场切换测试。
- 没有编造 Copilot 模型 ID。
- 没有核验 Fable 的 ZDR 资格或启用状态。
- 支持模型页的下线历史在核查日尚未收录 2026-12-14 这一批；若之后官方文档补上，以当时页面为准。
