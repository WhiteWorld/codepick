---
title: "Grok Bot 架构解析：共享云电脑、任务循环与安全边界"
description: "从一次具体任务出发，说明 Grok Bot 如何在每位用户的持久云电脑上工作，多个 Bot 为何共享这台电脑，以及插件、computer use、Routine 和 Auto Review 各自管什么。附架构图与证据边界。"
date: "2026-09-28"
article_type: explainer
tags: [grok-bot, cursor, spacexai, agent, agent-runtime, computer-use, sandbox]
pillar: stack
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "同一个账号下的多个 Bot，是互相隔离的吗？"
    a: "不是。每位 Cursor 用户一台持久云电脑，该用户的全部 Bot 共享文件、浏览器登录和命令行凭证。每个 Bot 有自己的 screen，那只是工作面，不是安全边界。需要独立电脑和凭证时，应使用另一个 Cursor 用户。"
  - q: "Webhook 返回 200，是不是说明任务已经做完？"
    a: "不是。帮助中心写明，200 表示这次调用已被受理并开始运行，不表示指令已经做完。结果要看该 Bot 的对话；手机上还可以看 Run history。其它响应表示这次没有启动。"
  - q: "Grok Bot 就是 IDE 里的那个编码 Agent 吗？"
    a: "不是。公开叙事把 Grok Bot 放在外环：它在自己的云电脑上收集上下文、起草任务，再委派给独立的 Cursor Cloud Agent。IDE 里的 Agent 是另一条编码环。团队还可以关掉 Cloud Agent 委派。Grok Build 的产品边界公开文档没有写死。"
---

## 先建立一张心智地图

**Grok Bot 是跑在持久云电脑上的一组助手。你在手机或电脑上发消息、看过程、做批准；活是在 Cursor 托管的那台电脑上干的。关掉笔记本，这台电脑上的任务不会因此停。**

读的时候抓住三件事：

1. **电脑属于用户，不属于某一个 Bot。** 同一账号下的 Bot 共享文件、浏览器登录和命令行凭证。
2. **工具有先后。** 有插件或远程 MCP，就优先走那条结构化路径；没有，再用 computer use 去点页面。
3. **「说了」「获准」「做完」是三件事。** Auto Review 和你的批准管的是即将发生的动作，不把已经发生的副作用撤销。

Grok Bot 不是 X 里的 Grok 聊天，也不是 IDE 里那条编码环。它和 Muse 的差别在使用场景，不在本文展开；若要按场景比较，见 [Grok Bot vs Muse AI 2026](/zh/compare/grok-bot-vs-muse-ai-2026/)。Muse 自己的运行结构见 [Muse 架构解析](/zh/guides/muse-architecture/)。

> 资料范围：本文整理于 2026-09-28。依据 Cursor 与 xAI 的公开文档、[Grok Bot 101](https://x.ai/bot/guides/grok-bot-101) 这篇官方 Guide，以及产品侧可以公开写的口径。没有登录内部系统，没有把社区故障帖写成架构，也没有把未公开的实现说成事实。

## 架构总览：一台电脑，多名 Bot

[![Grok Bot 架构：每位用户一台 Firecracker 云电脑，名下 Bot 共享文件与登录；插件、computer use、Auto Review 和 Cloud Agent 委派按职责分开](/images/guides/grok-bot-architecture-overview-zh.svg)](/images/guides/grok-bot-architecture-overview-zh.svg)

点击图可放大。图里的框按职责摆放，箭头表示工作关系，不代表精确调用顺序，也不是机房拓扑。

[Teams 文档](https://cursor.com/docs/grok-bot/teams)把桌面和手机 App 写成薄客户端：聊天、查看和审批在你的设备上，工作在托管电脑里。每位用户一台云电脑，实现是 **Firecracker microVM**，有自己的内核、内存和虚拟设备，用户之间是硬件级隔离。一个人到不了另一个人的电脑。

同一用户里面，边界换了。官方写的是：Bot 隔离的是个性和工作方式，不是计算。 [电脑与应用](https://docs.x.ai/grok-bot/computer-and-apps) 补充了操作细节：每个 Bot 有自己的 screen，所以多个 Bot 可以同时操作桌面；**同一个 Bot 同时只能跑一条 computer use**。这些 screen 是工作面。

为了读图，可以按职责看，不要把每块都想成一台机器：

| 对象 | 学习时关注什么 |
|---|---|
| 你的设备 | 发任务、看桌面、批准或拒绝、在敏感步骤接管 |
| 共享云电脑 | 文件、浏览器登录、命令行凭证；关笔记本仍继续 |
| 某个 Bot 的 screen | 这个 Bot 的桌面操作；同时只有一条 computer use |
| 插件 / 远程 MCP | 账号级的结构化工具；OAuth token 不发给 Bot |
| Auto Review | 独立审阅模型，决定放行、要求审批或拒绝 |
| Cloud Agent | 另一套编码电脑；Grok Bot 可以委派，团队可以关掉 |

模型不在这张图里占一个固定机柜。[安全文档](https://cursor.com/docs/grok-bot/security)写明：Cursor 管理选型，没有面向客户的模型选择器，服务组合会变，也不保证固定的供应商名单。用量分析里能看到实际服务了某次请求的模型，包括故障转移。这是公开约束，不是一张路由表。

## 跟着一次任务看职责怎么交接

假设用户对一个 Bot 说：「把这周要跟进的五家客户整理成草稿，放在对话里等我批准。不要发邮件，也不要改 CRM。」下面是教学走查，不是某次生产日志。

[![一次 Grok Bot 任务：目标与停止线进入共享云电脑，有插件走插件，否则占用该 Bot 的 screen；风险动作经过 Auto Review，敏感输入交还用户](/images/guides/grok-bot-architecture-loop-zh.svg)](/images/guides/grok-bot-architecture-loop-zh.svg)

点击图可放大。顺序用来对照职责，不表示每个任务都经过六个独立服务。

### 第一步：目标和停止线写在同一句话里

运行需要知道做什么，也需要知道哪里必须停。上面那句把产物（五份草稿）、交付位置（对话）和禁区（不发信、不改 CRM）放在一起。

文档把这种边界放在请求里，而不是指望事后补救。批准控制的是**这一次提议**，不会把已经改过的 CRM 改回去。

### 第二步：有插件就走插件

CRM 如果已经接了插件，Bot 应走插件，而不是在网页上把同样的字段点一遍。插件按账号安装，这个用户的每个 Bot 都能用。OAuth token 留在 Cursor 的连接器后端，Bot 调用工具时拿不到 token，token 也不写在云电脑上。

没有插件，或者插件不覆盖「看某一张看板」这种视觉步骤，才轮到 computer use，占用**这个 Bot 自己的 screen**。另一个 Bot 仍可以用它自己的 screen 并行干活。

公开文档没有写 computer use 的浏览器内核、自动化库或截图管线。图里只保留职责，不补一套未公开的技术栈。

### 第三步：敏感输入交还人

密码、通行密钥、两步验证、人机验证、支付或身份核验，Bot 把电脑交还用户。用户只完成卡住的那一步，再说继续。

支持的连接如果弹出安全的 secret 请求，值是遮罩的，不进对话，也不给模型看。普通聊天里不要贴密码或一次性验证码。登录成功后的浏览器会话会留下来，并且对该用户的其他 Bot 也可用。

### 第四步：风险动作先经过 Auto Review

Auto Review 是审批提示后面的审阅层：一个**独立的审阅模型**，在动作执行前看它。覆盖范围包括 shell、插件调用、computer use、automation 写入（对 Routine 和事件触发器的修改），以及委派，例如启动 Cloud Agent 或 subagent。它可以对这一次放行、要求你批准，或拒绝。

它不审一切副作用。记忆写入和多数设置变更就是文档举出的例子。本机执行是另一套开关，见下一节。

### 第五步：回到对话里核对

```text
目标与停止线
    ↓
共享云电脑上的这个 Bot
    ├─ 有插件 → 结构化调用
    └─ 无插件 → 该 Bot 的 screen（一条 computer use）
           ↓
       敏感输入？ → 交还用户接管
           ↓
       风险动作？ → Auto Review → 放行 / 要求批准 / 拒绝
           ↓
       对话中的结果（已做完、等待批准，或失败）
```

关掉 App 或笔记本，不会停掉云端这一轮，也不会停掉已经在跑的 Routine。直接发一句「停」可以打断当前回合，但停不掉已经完成的动作。

一条路径稳定之后，再把它存成 Skill。Skill 记录怎么做，可以给这个账号下的 Bot 使用；私人 Skill 有时还要为当前 Bot 打开。Teach a task 则是把一次浏览器演示收成草稿 Skill，录制最长约十分钟，功能在逐步放开。草稿仍要补上失败时怎么办、哪里必须批准，并用无害输入试过，再考虑定时或事件。

## 几个名字不要叠在同一层

### Skill、Routine，以及隐藏和删除

- **Skill** 描述怎么做：步骤、判断、产出和哪里必须停。
- **Routine** 把一件工作交给某一个 Bot，并说明何时跑：时刻表，或文档支持的事件。
- 关着笔记本，Routine 仍在云端跑。
- **隐藏** Bot 只是把它从列表里拿掉，不删除工作，也不暂停它的 Routine。
- **删除** Bot 会去掉它的资料、对话和 Routine。共享电脑上的文件和登录还在，要另外清理。

先把一次性任务做稳，再存 Skill，最后才自动化。测试运行会真的去改文件、开网页、调已连接的工具。

### Webhook：受理并开始，不是做完

Routine 也可以由 webhook 调用启动。帮助中心 [Routines](https://cursor.com/help/grok-bot/routines) 写明：向保存之后给出的地址发 POST，带上当前的 `Authorization: Bearer` 密钥，可以附上 JSON。Bot 收到的是这段正文加上 Routine 的指令。

**返回 200，表示 Grok Bot 受理了这次调用，并且开始了一次运行。它不表示指令已经做完。** 结果看该 Bot 的对话。其它响应表示这次没有启动；要确认 Routine 没被暂停，且用的是当前密钥。

帮助页没有把重试、去重，以及非 200 时调用方该不该自动重试，写成完整契约。本文只采用上面这句已经写明的差别。Webhook 也不是「用 HTTP 调用某一个 Bot」的通用公开 API，那条 API 没有文档。

### 插件、远程 MCP，和本机 stdio

公开说明把 Marketplace 插件放在前面。远程 MCP 按服务器地址接入；Enterprise 另外有 MCP allowlist。团队的连接器策略对 Grok Bot 同样有效，被禁用的插件会显示为管理员禁用。拦住插件并不会拦住那个服务的网站，网站路径要靠网络策略，而网络策略是 Enterprise 能力。

**不要把这理解成「本机 stdio MCP 一律不支持」。** 产品侧可以公开说的是：实现上也可以在云电脑里用命令把 stdio 服务拉起来。这和「用户笔记本上的 Cursor stdio 配置会不会自动同步到云电脑」不是同一句话。后面这件事，公开材料没有写。

### 外环、内环，以及不要写死的 Grok Build

编码分工在 [Grok Bot 101](https://x.ai/bot/guides/grok-bot-101) 里讲得很直白：外环的 Grok Bot 从 Slack、文档和仓库里收集上下文，写出任务；内环交给 Cursor Cloud Agent，在**另一套电脑**上做实现。Guide 写的是，Grok Bot 并不自己把那段代码写完，而是交出一份人也会写的 prompt，交给 Cursor 里的编码环境。这是官方 Guide 的用法说明，不是一份接口规范。

对应到 [Teams 文档](https://cursor.com/docs/grok-bot/teams)：委派受现有 Cloud Agent 管控，开关默认开着，管理员可以关掉。关掉之后，Grok Bot 不能再把编码任务派出去。

三层不要并成一层：

- **Grok Bot**：持久云电脑上的助手，负责聊天、审批、插件和桌面操作。
- **Cursor Cloud Agent**：独立编码沙箱。Grok Bot 可以委派，团队可以禁止。
- **Cursor IDE Agent**：IDE 里面的编码环。不要把它写成 Grok Bot 本体。

**Grok Build** 在公开文档里没有一条可以放进上图的独立产品边界。本文不把它画成确定组件，也不推测它和 Grok Bot 的内部关系。

## 安全边界：Bot 不是那条线

[![Grok Bot 的安全边界：用户之间是 Firecracker 隔离；同一用户的 Bot 共享电脑；Auto Review 与本机执行是动作控制，不是隔离](/images/guides/grok-bot-architecture-security-zh.svg)](/images/guides/grok-bot-architecture-security-zh.svg)

点击图可放大。这张图区分「隔离」和「动作控制」。两者经常被说成同一件事。

[审批与隐私](https://docs.x.ai/grok-bot/approvals-security-and-privacy) 写了直接的句子：不要把不同的 Bot 当作安全边界。电脑属于 Cursor 用户。不想被另一个 Bot 用到的凭证或文件，就不要放上去。某个登录不再需要，就在这台电脑的浏览器里退出；临时敏感文件用完就删。分享 Bot 的公开链接复制的是配置，对方拿不到你的电脑、登录或对话，但链接里的配置仍不应包含密钥、客户数据或内部地址。

| 说法 | 本文采用的边界 |
|---|---|
| 不同的 Bot | 不是安全边界 |
| 不同的 screen | 不是安全边界，只是各自的桌面 |
| 不同的 Cursor 用户 | 各自一台 Firecracker microVM，硬件级隔离 |
| 隐藏 Bot | 不暂停 Routine，也不制造隔离 |
| 删除 Bot | 删除它的对话和 Routine；不删除共享文件和浏览器登录 |
| Auto Review 放行 | 这一次提议可以继续；记忆写入等副作用不在审阅范围内 |
| 本机执行 | 管你面前的电脑；与云电脑分开，也与云端 Auto Review 分开 |
| 拦住某个插件 | 不拦住该服务的网站 |

本机执行的默认是每次询问。团队管理员可以给全体成员设更严的上限。把它关掉，只是让 Bot 不能在你的笔记本上跑命令，云电脑照常可用。

Auto Review 的个人规则，安全页和审批页的存储说法不完全一致：一处写当前桌面再同步到它的云电脑，另一处写跟随账号、每台登录的桌面都生效。规则如何冲突（Ask first 优先）是清楚的；规则文件到底存在哪，本文不定论。Enterprise 还可以强制打开 Auto Review，并下发团队规则。自助 Teams 没有这组开关。

## 哪些结论还不能画成确定的架构

| 观察或说法 | 本文采用的结论 |
|---|---|
| 页面上能看到点击和输入 | 有桌面操控；不能据此确定浏览器内核或自动化栈 |
| 多个 Bot 同时出现在不同 screen | 工作面分开；不是 per-Bot 的强隔离 |
| 存在 webhook 地址 | 可以启动一条已保存的 Routine；不是调用任意 Bot 的公开 API |
| 帮助中心定义了 HTTP 200 | 受理并开始运行，不是做完；重试与去重契约未写 |
| 用量里出现某个模型名 | 那次请求由该模型服务；不能还原成固定路由表 |
| 云电脑上可以用命令启动 stdio | 不能写成「stdio 不支持」；笔记本配置是否自动同步，未文档化 |
| 团队模型 allowlist | Enterprise 能力；文档写明默认遵守，同时写明不保证强制执行 |
| Grok Build | 未见可绘图的独立产品边界 |

另外仍未文档化的还有：subagent 跑在哪、和主 Bot 共享多少状态，接入与推送的具体拓扑，以及单台电脑的客户自管时间点恢复。云电脑目前在美国运行；这和 Cursor 的 US-only 数据驻留计划不是同一项承诺。

## 对开发者的启示

拿来看自己的 Agent 系统，这四个问题就够了：

1. **隔离单位写清楚了吗？** 名字、会话和 screen 可以分开，凭证和文件系统不一定跟着分开。
2. **提议、批准、做完能对上号吗？** 模型的一句话不能同时充当申请、批准和完成凭证。
3. **两条路径会不会到达同一个系统？** 插件被禁用之后，浏览器仍可能打开那个网站。网络策略是另一层。
4. **受理、运行、用户看见，分开了吗？** Webhook 的 200、Routine 的运行记录、对话里的结果，要能分别核对。

用这四个问题回看总图：Grok Bot 是一台属于用户的持久电脑，上面跑着多名助手；编码可以委派出去，但委派进的是另一套电脑；真正隔开两个人的，是 Firecracker，不是 Bot 的名字。

## 资料与阅读范围

- [Grok Bot 概述](https://cursor.com/docs/grok-bot)：持久云电脑、共享关系，以及一个 Bot 同时一条 computer use。
- [Use the computer and apps](https://docs.x.ai/grok-bot/computer-and-apps)：screen、接管、插件优先于点击、本机电脑与云电脑分开。
- [Grok Bot for Teams and Enterprise](https://cursor.com/docs/grok-bot/teams)：Firecracker、Cloud Agent 开关、连接器策略。
- [Grok Bot security](https://cursor.com/docs/grok-bot/security)：Auto Review 的覆盖与缺口、本机执行、模型选型、数据位置。
- [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)：Bot 不是安全边界；secret 不要贴进聊天。
- [Grok Bot 101](https://x.ai/bot/guides/grok-bot-101)：外环 Grok Bot、内环 Cloud Agent 的官方 Guide。作者是 SpaceXAI 的 DevRel，不是接口规范。
- [Routines 帮助中心](https://cursor.com/help/grok-bot/routines)：webhook 的 200 表示受理并开始，不表示做完。
- [Security FAQ](https://cursor.com/docs/grok-bot/security-faq)：插件策略与网站路径、Auto Review 范围的简表。

继续阅读：[Muse 架构解析](/zh/guides/muse-architecture/)、[Grok Bot vs Muse AI 2026](/zh/compare/grok-bot-vs-muse-ai-2026/)。
