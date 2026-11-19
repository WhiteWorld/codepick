---
title: "Gemini 4 怎么选：Carbon、Neon、Hydrogen 和 Argon"
description: "按官方文档介绍 Gemini 4 四个型号的入口、价格、上下文和适用场景，并和 Gemini 3.8 Flash、Claude Sonnet 5.5、GPT-6.2 Sol 对照。本文没有付费调用 API，也没有实测速度或代码成绩。"
date: "2026-11-19"
article_type: explainer
tags: [gemini, gemini-4, model-comparison, api, pricing]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: true
---

> 核查日：2026-11-19（北京时间）。依据 Google 官方博客、[Gemini API 模型页](https://aistudio.google.com/docs/models)、[最新模型说明](https://aistudio.google.com/docs/latest-model)、[开发者价格页](https://aistudio.google.com/docs/pricing)、[速率限制](https://aistudio.google.com/docs/rate-limits)、[Gemini 订阅页](https://gemini.google/subscriptions/) 和 [Google AI 套餐页](https://one.google.com/about/google-ai-plans/)。对照型号另打开了 Anthropic 的 [Claude 价格页](https://platform.claude.com/docs/en/about-claude/pricing)、[Sonnet 5.5 说明](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)，以及 OpenAI 的 [API 价格页](https://developers.openai.com/api/docs/pricing) 和 [GPT-6.2 Sol 说明](https://developers.openai.com/api/docs/models/gpt-6.2-sol)。本文只整理公开页面，没有调用 Gemini、Claude 或 OpenAI 的 API，没有使用密钥，也没有独立跑速度、代码或费用测试。

Gemini 4 不是一个型号，而是一组已经公布、可在官方文档里查到调用名的模型。选哪一个，先看任务难度和付钱方式：API 按 token 计费，和 Google AI 订阅不是同一笔账。

Antigravity 里的套餐和模型入口，见 [Antigravity 工具页](/zh/tool/antigravity/) 和 [Antigravity 与 Cursor 对比](/zh/compare/antigravity-vs-cursor/)。替换旧模型 ID 时，可对照 [模型停用检查清单](/zh/guides/model-deprecation-checklist/)。

## 先按任务选

官方 [最新模型页](https://aistudio.google.com/docs/latest-model) 的建议是：日常编码、Agent 和多模态知识工作从 `gemini-4-hydrogen` 起；需要更深的前沿推理时，再用 `gemini-4-carbon` 或 `gemini-4-neon`。Hydrogen 的更新说明也把它写成从 Gemini 3.8 Flash 以及更早 Gemini 3 / 2.5 升级时的推荐默认项。

四个型号可以这样理解：

| 你要解决的问题 | 更适合先看的型号 | 原因（官方怎么写，不是我们实测） |
| --- | --- | --- |
| 日常写代码、跑工具 Agent、要免费层或把单价压低 | Gemini 4 Hydrogen | 文档称为默认通用型号，有免费层，付费价在四个型号里最低，官方速度标签是 Fast。 |
| 复杂工程、知识工作或科学任务，既要强，又希望尽快做完 | Gemini 4 Neon | 定位是前沿能力加更快的端到端完成。官方速度标签是 Moderate，默认思考档是 `high`，还有更高的 `xhigh`。 |
| 最难的架构、根因排查、科学证明、安全核查 | Gemini 4 Carbon | 文档称为最强推理型号。官方速度标签是 Deliberate，默认思考档是 `medium`；官方说它每轮会花更多思考 token。 |
| 同样要前沿推理，但希望每轮比 Carbon 更省、更快 | Gemini 4 Argon | 文档称它是更高效的前沿推理型号，默认思考档是 `medium`，没有文档中的 `xhigh`。下面会单独说明消费订阅页目前怎么写它。 |

这里的 Fast / Moderate / Deliberate 是官方最新模型页上的速度标签，不是我们测到的延迟。

## 四个正式名称和发布时间

调用名要写对，不要只说「Gemini 4」。官方稳定 ID 是：

| 显示名 | 模型 ID | 官方博客时间线（均为 2026 年，原文未标注时区） |
| --- | --- | --- |
| Gemini 4 Argon | `gemini-4-argon` | 9 月 30 日宣布；[10 月 13 日开放](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/)：开发者和企业走 API；Antigravity 写的是 Ultra；Gemini 应用和 Search AI Mode 写的是 Pro 和 Ultra |
| Gemini 4 Carbon | `gemini-4-carbon` | 10 月 28 日宣布；[11 月 10 日对付费开发者、企业和 Ultra 用户开放](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) |
| Gemini 4 Hydrogen | `gemini-4-hydrogen` | [11 月 12 日宣布](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)，面向更广泛的开发者、企业和消费入口 |
| Gemini 4 Neon | `gemini-4-neon` | [11 月 18 日宣布](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) |

四个型号在 [模型总表](https://aistudio.google.com/docs/models) 和价格页里都还在。2026-11-19 打开的 [最新模型页](https://aistudio.google.com/docs/latest-model) 重点卡片写的是 Carbon、Neon、Hydrogen，以及高通量的 Gemini 3.5 Flash-Lite；Argon 没有出现在这组推荐卡片里，但并没有从模型目录或价格页消失。

11 月 10 日的 Carbon 上市说明曾写：多数软件工程和知识工作仍可先看 Argon，Carbon 留给更极限的任务。这和后来把 Hydrogen 当作默认通用型号、把 Neon 和 Carbon 当作旗舰推理的写法并不完全同一套措辞。本文以 11 月 19 日仍在线的最新模型页和各型号更新说明为准，不把其中任何一篇理解成另一篇已经作废。

## 规格怎么对照

四个 Gemini 4 型号共用不少能力，差别主要在定位、思考档位、价格和入口。

| 项目 | Carbon | Neon | Hydrogen | Argon |
| --- | --- | --- | --- | --- |
| 模型 ID | `gemini-4-carbon` | `gemini-4-neon` | `gemini-4-hydrogen` | `gemini-4-argon` |
| 上下文 | 统一窗口 1,048,576 token | 同左 | 同左 | 同左 |
| 默认最大输出 | 65,536；长解码可达剩余窗口，上限 1,048,576 | 同左 | 同左 | 同左 |
| 输入模态 | 文本、图片、音频、视频、PDF | 同左 | 同左 | 同左 |
| 输出模态 | 文本 | 文本 | 文本 | 文本 |
| 思考档位 | `low`、`medium`（默认）、`high` | `low`、`medium`、`high`（默认）、`xhigh` | `low`、`medium`、`high`（默认）、`xhigh` | `low`、`medium`（默认）、`high` |
| 官方速度标签 | Deliberate | Moderate | Fast | 最新模型页推荐卡片未列出；Argon 更新说明写它比 Carbon 更快、每轮 token 更少 |
| 开发者 API 免费层 | 无 | 无 | 有，有速率限制 | 无 |
| 付费输入 / 输出（每 100 万 token，USD） | 至 2026-11-30 为 $2 / $10；2026-12-01 起 $4 / $20 | $3 / $15 | $1.50 / $7.50 | 与 Carbon 相同的引入价和后续价 |
| 隐式缓存输入 | 至 2026-11-30 为 $0.10；之后 $0.20 | $0.15 | $0.075 | 与 Carbon 相同 |

几个需要先解释的词：

- **token**：模型和账单用的基本单位，不等于汉字或英文单词。同一段文字在不同模型上的 token 数可能不同。
- **统一窗口**：输入、思考和输出共用 1,048,576 token，不是「输入 100 万，输出再另给 100 万」。
- **长解码（long decode）**：型号页把默认单次输出（含思考）写成 65,536 token；需要更长结果时，可把总上限提高到剩余窗口。这是整段回答的上限，不是下面说的 hop。长解码会把生成拆成连续的 hop，也就是一次请求能写下的片段；官方说明往往要配合后台执行或续写协议。依据 [长解码文档](https://aistudio.google.com/docs/long-decode) 和 [Hydrogen 更新说明](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen)：后台执行和流式调用时，四个型号每 hop 最多 65,536。非流式且走 REST、或关闭自动续写时，Hydrogen 和 Neon 每 hop 仍最多 65,536，Carbon 和 Argon 每 hop 最多 32,768，要用 `continuation_token` 循环才能达到设定的总上限。Hydrogen 文把 Carbon / Argon 的 32,768 写成「非流式 REST hop」，长解码页总述写成「非流式 hop」，表格则写成 `automatic_continuation: false` 或 REST。不要把所有接口的 hop 大小理解成完全相同，也不要把 32,768 理解成 Carbon / Argon 的总输出上限。
- **思考档位**：控制模型花多少内部推理。思考 token 官方按输出计价。档位越高，通常越慢、越贵，但本文没有实测这一关系。

四个型号都支持代码执行、函数调用、计算机使用、结构化输出、Google 搜索 / 地图接地，以及 URL 上下文。官方模型页写明：它们不支持图像生成、音频生成和 Live API。要生成图、语音或做实时语音，需要官方目录里的其他专用型号，不在这篇的四个文本推理型号里。

从 2026 年 6 月起，官方把 Interactions API 当作默认接口，`generateContent` 仍可用，但已称为旧接口。新项目应按当前文档选用接口，本文不展开迁移步骤。

## API 价格：单位、涨价日和容易漏算的费用

下面只讨论 [Gemini 开发者 API 价格页](https://aistudio.google.com/docs/pricing) 上的付费层，单位都是每 100 万 token、美元。这和后面的 Google AI 月费不是一回事。

价格页还写了这些边界：

- **思考和工具说明也计费。** 模型处理过的 token 都会算，包括思考 token，以及使用接地时的内部工具系统说明和函数声明。
- **Gemini 4 只写了隐式缓存。** 缓存命中按对应输入价的 95% 折扣计。官方写明这些型号不支持显式缓存（`cachedContents` / `caches.create`）。价格页没有为 Gemini 4 再列出按小时收取的缓存存储费。
- **四个型号的付费标价是整段 1M 窗口一口价。** Hydrogen 的更新说明写明，付费标准价在整个 100 万 token 窗口内是平坦的。Carbon、Neon、Argon 的价格表也没有按提示长度再加一档。这和仍列出「提示超过 200k 另计价」的 [Gemini 3.1 Pro Preview](https://aistudio.google.com/docs/pricing) 不同。
- **Batch API 官方写了 50% 费用减免。** 四个型号都支持 Batch。速率限制页给出的批量排队 token 上限是：Carbon、Argon、Neon 各 5,000,000，Hydrogen 为 3,000,000。
- **搜索接地单独计。** Gemini 3 及更新型号共用每月 5,000 次免费搜索请求，超出后每 1,000 次 $14，开发者 API 还有每项目每天 1,500 次的默认上限。一次用户请求可能触发多次搜索，按实际搜索次数计。
- **免费层会用来改进产品，付费层不会。** 这一点写在价格表的「Used to improve our products」一行。Hydrogen 和 Gemini 3.8 Flash 有免费层；Carbon、Neon、Argon 没有。

Carbon 和 Argon 的引入价写到 2026 年 11 月 30 日，12 月 1 日起改为 $4 / $20。官方页面没有写这个日期按哪个时区截止，本文不自行换算成北京时间的某一分钟。Carbon 上市说明还加了一句：该后续价格适用于面向公开访问的 Carbon 型号。

价格页列出 Flex inference 和 Priority inference 为支持项，但本文没有把这两档的美元倍率写成确定数字，因为本次打开的价格表主栏没有给出可直接引用的完整倍率。Priority 的速率限制页只写了默认额度是对应型号和档位标准限制的 0.3 倍。

标准交互的每分钟请求数、每分钟 token 数，官方说以 Google AI Studio 里当前项目显示的限额为准，并随用量档变化；本次打开的速率限制页没有给出 Gemini 4 四个型号的固定 RPM / TPM 表。页上能直接引用的还有：按 10 分钟窗口计算的花费限制（付费 Tier 1 为 $10，Tier 2 和 Tier 3 为 $200），以及上面的 Batch 排队上限。

本次核对的是 Gemini Developer API（Google AI Studio）公开页，没有打开 Vertex AI 价目，因此不把同一套单价写成在 Google Cloud 上一定成立。

## 消费订阅是另一套入口

API 按 token 付费。Gemini 应用、Search 的 AI Mode、Antigravity 等消费和产品入口，走的是 Google AI 套餐和用量限额，不能用上面的 $1.50 / $7.50 去换算「一个月能聊多少轮」。

2026-11-19 打开的美国官方套餐页和订阅页，可以这样归纳：

| 套餐（美国官方标价） | 月费 | 订阅页写明的 Gemini 4 模型 | 和用量有关的公开说法 |
| --- | --- | --- | --- |
| 免费（Google 账号） | $0 | 包含 Gemini 4 Hydrogen | Hydrogen 宣布文说，免费用户会在系统认为合适时通过自动选模型用到它；不要默认免费档有完整的手动选单。 |
| Google AI Plus | $4.99 | Gemini 4 Hydrogen | 用量限额为免费档的 2 倍。 |
| Google AI Pro | $19.99 | Gemini 应用：Neon、Hydrogen。套餐页还写：部分国家的 Search AI Mode 可用 Carbon，额度低于 Ultra | 用量限额为免费档的 4 倍；订阅页写明包含 Google Antigravity。 |
| Google AI Ultra 5x / 20x | $99.99 / $199.99 | 最高档使用 Gemini 4 Carbon、Neon、Hydrogen；Search AI Mode 里的 Carbon 额度高于 Pro | 用量限额相对 Pro 分别为 5 倍和 20 倍；Antigravity 的 Agent 速率限制也按 5x / 20x 区分。 |

这些美元价格来自 [Google AI 套餐页](https://one.google.com/about/google-ai-plans/) 的对照表；Ultra 的 $99.99 / $199.99 在 [订阅页](https://gemini.google/subscriptions/) 上也有。官方写明套餐因国家/地区而异，还有年龄和其他限制。本文没有核对其他地区的标价，也不把旧文案里的 $20 或 $249.99 当作当前价格。

订阅页对 Gemini 应用用量的注释是：限额会考虑提示复杂度、使用的功能和对话长度；每 5 小时恢复一次，直到用完当周限额；可以用 AI credits 扩展。页面没有给出固定的「每天多少次」。[套餐页](https://one.google.com/about/google-ai-plans/) 和 [订阅页](https://gemini.google/subscriptions/) 的脚注 4 写明：Gemini 4 Carbon 和 Nano Banana Pro 在 Search 的 AI Mode 仅限部分国家。套餐说明里，Pro 写的是在 AI Mode 中可以使用 Carbon，Ultra 写的是更高额度。不要把 Pro 的 Carbon 入口理解成和 Ultra 相同，也不要默认所有国家的 Search AI Mode 都有 Carbon。

关于 Argon：10 月 13 日的 [上市说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) 把入口分开写。开发者和企业走 API；Google Antigravity 写的是 Google AI Ultra 订阅用户；Gemini 应用和 Search 的 AI Mode 写的是 Google AI Pro 和 Ultra 订阅用户。不要把当时的 Antigravity 入口理解成 Pro 也可用。2026-11-19 打开的订阅页和套餐页，在当前套餐权益里写的是 Hydrogen、Neon 和 Carbon，没有列出 Argon。本文没有打开真实应用或 Antigravity 的模型列表，所以不判断 Argon 是否仍出现在某个已登录账号的下拉菜单里。做消费选型时，以当前套餐页和产品内实际可选型号为准；做 API 选型时，`gemini-4-argon` 仍是价格页上的付费型号。

## 和上一代 Gemini 比什么

官方仍把 [Gemini 3.8 Flash](https://aistudio.google.com/docs/models/gemini-3.8-flash)（`gemini-3.8-flash`）称为上一代 Flash，用于软件工程、自主 Agent 和复杂企业流程。Hydrogen 的更新说明把它当作日常场景升级时的主要对照。

关键差别不在「有没有 100 万上下文」，而在窗口怎么用、输出能有多长、以及付费单价：

| 项目 | Gemini 4（四个型号） | Gemini 3.8 Flash |
| --- | --- | --- |
| 上下文 | 输入、思考、输出共用 1,048,576 | 输入上限 1,048,576，输出上限 65,536 |
| 长解码到 1M 输出 | 官方支持（受剩余窗口限制） | 模型页只写了 65,536 的输出上限，没有同样的统一长解码说明 |
| 付费输入 / 输出 | 见上表；Hydrogen 为 $1.50 / $7.50 | 至 2026-12-31 为 $0.75 / $3.75；2027-01-01 起 $1.50 / $7.50 |
| 开发者 API 免费层 | 仅 Hydrogen 有 | 有 |
| 缓存 | 只要隐式缓存，折扣 95% | 价格表仍列出缓存存储费；不要把它和 Gemini 4 的写法混成同一套规则 |

如果主要是高通量、短延迟的分类或路由，官方最新模型页仍把 `gemini-3.5-flash-lite` 列为高通量和低成本选项，而不是让所有旧工作都改走 Gemini 4。

价格页上还有 Gemini 3.1 Pro Preview（`gemini-3.1-pro-preview`）：没有免费层，提示不超过 200k token 时为 $2 / $12，超过 200k 时为 $4 / $18。它是仍在目录里的 3.x Pro 预览型号，不是 Gemini 4 的一员，也不宜当成已经退出的「上一代旗舰」来排座次。本文不以它作为主对照。

Gemini 2.5 Pro 在价格页上写明：已在 Google AI Studio 中不再可选；自 2026-12-01 起，对 `gemini-2.5-pro` 的 API 请求会自动转到 `gemini-3.8-flash`，并按 3.8 Flash 的价格计费。不要把仍写着 2.5 Pro 的旧调用名，理解成还在提供原来的 2.5 Pro 能力和价格。

## 和当前同定位的 Claude、OpenAI 型号

为了避免做成大榜单，这里只保留两个当前仍在官方价格页上、列表价接近 Gemini 4 中档的对照：Claude Sonnet 5.5（`claude-sonnet-5-5`）和 GPT-6.2 Sol（`gpt-6.2-sol`）。它们都是各家文档里偏日常编码和 Agent 的主力档，标价都是短上下文 $2 / $10（每 100 万 token，USD）。这不能理解成三个模型能力相同。

| 项目 | Gemini 4 Hydrogen | Gemini 4 Neon | Gemini 3.8 Flash | Claude Sonnet 5.5 | GPT-6.2 Sol |
| --- | --- | --- | --- | --- | --- |
| 模型 ID | `gemini-4-hydrogen` | `gemini-4-neon` | `gemini-3.8-flash` | `claude-sonnet-5-5` | `gpt-6.2-sol` |
| 上下文 | 统一 1,048,576 | 同左 | 输入 1,048,576 / 输出 65,536 | 1M | 1,050,000（最大输入 922,000） |
| 默认 / 最大输出 | 65,536 / 最长可达剩余窗口 | 同左 | 65,536 | 128K（同步 Messages API） | 128,000 |
| 付费输入 / 输出 | $1.50 / $7.50，全窗口平坦 | $3 / $15，全窗口平坦 | $0.75 / $3.75（至 2026-12-31） | $2 / $10 | 短上下文 $2 / $10；输入超过 272K token 时，整次请求按 $4 / $15 等长上下文价 |
| 缓存 | 隐式命中 $0.075 | 隐式命中 $0.15 | 价格表另有存储费，规则不同 | 写入和命中分开计价，命中 $0.10 | 短上下文命中 $0.10，另有 30 分钟 / 12 小时写入价 |
| 输入模态 | 文本、图片、音频、视频、PDF | 同左 | 同左 | 文本和图片 | 文本和图片；官方写明不支持音频、视频 |
| 免费 API 层 | 有（有速率限制） | 无 | 有 | 新用户可有试用额度，不是与 Gemini 免费层对等的长期免费模型档 | 本次打开的型号页没有对等的长期免费层说明 |

补充两个价格锚点，但不放进主表：Claude Opus 5.5 是 $4 / $20，和 Carbon、Argon 在 2026-12-01 之后的标价相同；GPT-6.2 Astra 短上下文是 $8 / $40，属于更高标价的 OpenAI 旗舰档。列表价接近，只说明账单单位可以对照，不能用来宣布谁更强。

Google 的发布博客引用了 Artificial Analysis、Vals Index 等第三方榜单，以及内部 Antigravity 测试。这些数字是厂商转述或自家评测，测试条件和是否使用 Antigravity 等运行框架并不总是可比。例如 Neon 宣布文同时给出了 SWE-sweep 在 mini-SWE harness 上的 12.8%，以及在 Google Antigravity 中的 39.0%。本文不根据这些数字排出绝对第一，也不把它们写成我们复现过的成绩。

## 限制，以及本文没有核实的事

- 四个文本推理型号不生成图像、不生成音频、不走 Live API。
- Carbon、Neon、Argon 没有开发者 API 免费层；只有 Hydrogen 有，且免费层有速率限制，内容可用于改进产品。
- 消费套餐里的「最高使用」「4 倍限额」不是无限量，也不能直接换算成 API token。
- 网络安全方向另有 Fairwind 等受限项目，例如 Neon 宣布文说面向受信任防御者滚动开放。这不是普通 API 或普通订阅的默认能力，本文没有核实申请条件。
- 终端里的 Gemini CLI 是否已经接上这四个型号，要以当前 CLI 说明为准，不要默认这些 API 名称在 CLI 里都能用。
- 标准 RPM / TPM、Flex / Priority 的完整美元倍率、隐式缓存是否对所有 Gemini 4 都有同一套最小提示长度、以及已登录产品里的真实模型列表，本次都没有实测。
- 没有付费或免费调用 API，没有跑基准，没有测量延迟，也没有核对某一地区的套餐页是否与美国标价相同。

## 资料

- [Gemini API 模型目录](https://aistudio.google.com/docs/models)
- [最新 Gemini 模型](https://aistudio.google.com/docs/latest-model)
- [开发者 API 价格](https://aistudio.google.com/docs/pricing)
- [速率限制](https://aistudio.google.com/docs/rate-limits)
- [长解码](https://aistudio.google.com/docs/long-decode)
- [Gemini 4 Carbon 型号页](https://aistudio.google.com/docs/models/gemini-4-carbon) · [更新说明](https://aistudio.google.com/docs/whats-new-gemini-4-carbon)
- [Gemini 4 Neon 型号页](https://aistudio.google.com/docs/models/gemini-4-neon) · [更新说明](https://aistudio.google.com/docs/whats-new-gemini-4-neon) · [发布博客](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)
- [Gemini 4 Hydrogen 型号页](https://aistudio.google.com/docs/models/gemini-4-hydrogen) · [更新说明](https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen) · [发布博客](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [Gemini 4 Argon 型号页](https://aistudio.google.com/docs/models/gemini-4-argon) · [更新说明](https://aistudio.google.com/docs/whats-new-gemini-4-argon) · [10 月 13 日上市说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/)
- [Gemini 4 Carbon 11 月 10 日上市说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)
- [Gemini 3.8 Flash 型号页](https://aistudio.google.com/docs/models/gemini-3.8-flash)
- [Gemini 订阅](https://gemini.google/subscriptions/) · [Google AI 套餐](https://one.google.com/about/google-ai-plans/)
- [Claude 价格](https://platform.claude.com/docs/en/about-claude/pricing) · [Claude Sonnet 5.5](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)
- [OpenAI API 价格](https://developers.openai.com/api/docs/pricing) · [GPT-6.2 Sol](https://developers.openai.com/api/docs/models/gpt-6.2-sol)
