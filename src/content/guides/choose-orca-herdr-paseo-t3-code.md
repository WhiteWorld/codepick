---
title: "Orca、Herdr、Paseo 和 T3 Code 怎么选？"
description: "核查日 2026-11-25。按当天打开的官方网站、文档、许可和 GitHub 正式版本，比较这四款编程助手工作区：谁来分工、任务在哪台机器继续跑、改完怎么审，以及默认权限和费用边界。没有安装、登录或实测这些产品。"
date: "2026-11-25"
article_type: review
tags: [orca, herdr, paseo, t3-code, comparison]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
faq:
  - q: "独立工作区或 git worktree，是不是系统安全沙箱？"
    a: |
      不是。Orca 的工作区文档把独立 checkout 写成并行时「不会互相踩文件」；Agents / Sessions 页又把 worktree 本身说成 sandbox，用来解释为什么默认带上跳过审批的启动参数。Paseo 把 Isolation 设为 New worktree 时，也是另开目录和分支。T3 Code 的说明是每个线程可以在自己的 worktree 里工作。这些都是仓库文件隔离，不能据此认定助手碰不到你的其他文件、密钥或网络。本文没有做运行时安全测试。
  - q: "Herdr 和原来的终端版是一回事吗？会不会和 HerdOS、T3 Stack 搞混？"
    a: |
      不是同一产品。Herdr 官网 FAQ 写明：Herdr TUI 是原先的终端应用，有自己的 server；现在的桌面应用建立在 herdr-core 上，两边不共享 agents。手机应用只连 herdr-core，不支持 TUI。HerdOS 是另一套围绕 GitHub Actions 的编排工具，不是 Herdr。T3 Code 是 T3 Tools Inc. 的编程助手控制平面，官网和仓库都不把它写成 T3 Stack。
  - q: "这些工具本身收费吗？模型费用算进去了吗？"
    a: |
      就当天打开的官方说明，这四款控制面或工作区客户端本身都是开源免费：Orca 和 T3 Code 为 MIT，Herdr 为 Apache-2.0，Paseo 除第三方组件外为 Apache-2.0。它们都写明使用你已有的助手订阅或账号，不把底层模型费用算进「免费」。T3 Code 文档另外写了 T3 Connect 默认最多关联 3 台机器，付费的 T3 Chat 方案可以把上限提高到 10 或 100 台；这是账号额度说明，不是模型价格，本文没有注册或付费验证。
  - q: "关上手电脑窗口，任务还会继续跑吗？"
    a: |
      要看你用的是哪一种运行方式，不能一概而论。Herdr 官方写：助手跑在本机的 herdr-core 里，退出或更新窗口不会停掉它们；但机器重启或 herdr-core 停止后，它不会自动把进行中的助手恢复起来。Paseo 的 daemon 才是真正跑助手的进程，客户端只是连上去。Orca 若只用本机桌面，文档把本地写成默认路径；若要在笔记本休眠后继续，文档指向 Remote Orca Server 或 SSH 主机。T3 Code 的远程文档写：对端机器必须保持运行且可访问；只保存登录状态并不会自动启动服务。以上都是文档中的行为说明，不是实测。
---

> 核查日：2026-11-25（北京时间）。依据当天打开的 [Orca](https://orca.dev/)、[Supported agents](https://orca.dev/docs/agents/supported)、[Agents and sessions](https://orca.dev/docs/model/agents-sessions)、[Worktrees](https://orca.dev/docs/model/worktrees)、[Ways to run Orca](https://orca.dev/docs/ways-to-run)、[Orchestration](https://orca.dev/docs/cli/orchestration)、[Mobile companion](https://orca.dev/docs/mobile)、[Bot security](https://orca.dev/docs/bots/security)、[Herdr](https://herdr.dev/)、[herdr-core](https://herdr.dev/core/)、[Herdr Mobile](https://herdr.dev/mobile/)、[Download](https://herdr.dev/download/)、[Privacy](https://herdr.dev/privacy/)、[Herdr TUI](https://herdr.dev/tui/)、[Herdr 安全说明](https://github.com/herdrdev/herdr-app/blob/master/docs/security.md)、[Paseo](https://paseo.sh/)、[Security](https://paseo.sh/docs/security)、[Git worktrees](https://paseo.sh/docs/worktrees)、[Orchestration](https://paseo.sh/docs/orchestration)、[T3 Code](https://t3.codes/)、[T3 Code README](https://github.com/pingdotgg/t3code/blob/main/README.md)、[Remote access](https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md)、[Permission modes](https://github.com/pingdotgg/t3code/blob/main/docs/user/permission-modes.md)、[Source control](https://github.com/pingdotgg/t3code/blob/main/docs/user/source-control.md)，以及对应仓库的 LICENSE 与当天的 GitHub 正式版本。本稿是待独立内容审阅的审阅稿，尚未正式发布。本文没有安装或启动这些产品，没有登录任何账号，没有付费调用，也没有做功能或运行时安全实测。版本号只采用当天看到的正式版本，预发布和 nightly 不当正式版。

这四款工具看起来很像：都可以在你自己的订阅上，同时跑 Claude Code、Codex、OpenCode 这类编程助手。真正要先分清的是三件事：谁来分工、任务在哪台机器上继续跑、改完的代码怎么审。

这不是性能排名，也不是安装评测。站内已有偏操作说明的 [Paseo 远程 Agent 编排器指南](/zh/guides/paseo-remote-agent-orchestrator/)，本文只做横向对照，不重复那一篇。更早的 [Agent 协作平台类型](/zh/guides/agent-collaboration-platform-types/) 讲的是 Slock、Multica 这类协作产品，和这里的编程助手工作区不是同一类。Orca、Paseo 和 T3 Code 的工具页目前是未评分的资料收录，见 [Orca](/zh/tool/orca/)、[Paseo](/zh/tool/paseo/)、[T3 Code](/zh/tool/t3-code/)。Herdr 当天还没有站内工具页，只引用它的官方网站和仓库。

## 当天核对到的正式版本

这些版本只用来标明核对时点，不是质量评分。

| 产品 | 当天看到的最新正式版 | 许可 |
| --- | --- | --- |
| Orca | GitHub 正式版 [v1.4.274](https://github.com/stablyai/orca/releases)，发布于 2026-11-25 06:52（北京时间）。同日仍有 Android 预发布，不能当桌面正式版。 | MIT，Copyright Lovecast Inc. |
| Herdr 桌面应用 | 仓库标签 [v0.1.18](https://github.com/herdrdev/herdr-app)，提交时间 2026-11-24 20:05（北京时间）。分发走 [releases.herdr.dev](https://herdr.dev/download/)，GitHub Releases 列表当天为空。运行时 [herdr-core](https://github.com/herdrdev/herdr-core) 标签仍为 v0.1.22（提交时间 2026-11-23 03:10，北京时间）。原终端版 Herdr TUI 最新正式版仍是 [v0.9.5](https://github.com/herdrdev/herdr/releases)（2026-10-15）。 | Apache-2.0 |
| Paseo | 官网与 GitHub 最新正式版 [v0.17.4](https://github.com/getpaseo/paseo/releases)，发布于 2026-11-24 06:34（北京时间）。 | 除第三方组件外为 Apache-2.0，见仓库 [LICENSE](https://github.com/getpaseo/paseo) |
| T3 Code | 最新正式版仍为 [v0.1.11](https://github.com/pingdotgg/t3code/releases)，发布于 2026-11-20 15:38（北京时间）。当天另有 v0.1.12 的 nightly，官方标为预发布，不能当正式版。 | MIT，Copyright T3 Tools Inc. |

## 先看一张对照表

下面只整理当天官方文档里能对上的差别。空缺处是本文没有在官方页核到同等表述，不是实测失败。

| 问题 | Orca | Herdr | Paseo | T3 Code |
| --- | --- | --- | --- | --- |
| 主要定位 | 围绕独立 git worktree 的开发环境，带终端、差异审阅和内置浏览器 | 窗口关掉后，任务仍在本机 herdr-core 里跑 | 自托管 daemon；桌面、网页、手机和 CLI 都是客户端 | 开源控制平面，统一管理多种助手的会话、审批和提交 |
| 谁来分工 | 多任务可并行；另有实验性编排（Run / Task / Dispatch）。当天文档写编排面板和开关暂时不可用 | 明确支持一个助手再派助手、等待并收回报告；不是所有助手都能正确上报状态 | 可委派、并行，也可跨机器；内置 Paseo tools 默认关闭，需在设置里打开 | 更偏人来切换和交接助手；README 把它写成控制平面，而不是自动团队 |
| 任务在哪继续跑 | 本地桌面是默认路径；SSH 主机、Remote Orca Server、实验性 Cloud VM / 按工作区环境可选 | 跑在 herdr-core；也可经 SSH 把其他机器加进同一侧栏 | daemon 在你指定的机器上跑；客户端连上去 | 对端机器必须保持运行且可访问；T3 Connect 或局域网配对 |
| 远程和手机 | 桌面支持 macOS / Windows / Linux。手机 companion 为 beta，由已配对的桌面拥有会话，官方写它不是完整编辑器 | 手机经 SSH 直连你的 herdr-core，官方写没有 Herdr 账号、也没有他们的服务器夹在中间；不支持 TUI 里的会话 | 官方把手机端写成完整应用。新安装默认关闭中继；启用后走端到端加密中继 | 桌面、网页和手机。T3 Connect 需要登录；默认最多关联 3 台机器 |
| 默认权限 | 新启动会预填各助手的跳过审批参数，可在设置里改成手动。Bot 的默认聊天权限是 Full access | 模组是受信任的 JavaScript，没有逐条程序或网络请求提示；官方写这不是安全边界 | 密码认证默认不加密流量。绑定到网络地址时需另设密码；官方建议中继或 VPN 来加密 | 新线程的初始默认是 Full access，可在设置里改 |
| 费用 | 客户端 MIT，官方写免费开源；助手走你自己的订阅和账号。官方写它不出售托管 VPS，Cloud VM 用你自己的云账号 | 官方 FAQ 写免费，Apache-2.0。桌面遥测默认开启，可在设置关闭 | 控制面开源免费；README 写没有遥测、跟踪或强制登录。底层订阅另计 | 不转售 token，使用你已登录的助手。T3 Connect 机器数量上限与是否联动付费 T3 Chat 有关 |

按需求选：**要在独立分支里写代码并审改动，看 Orca；要关掉窗口任务还继续跑、并且需要助手再派助手，看 Herdr；要桌面、网页和手机都用同一套自托管环境，看 Paseo；要把多种已登录助手放在同一个控制面里管理，看 T3 Code。** 这是根据官方定位做的对照，不是性能或安全性排名。

## 谁来分工，并不一样

「能同时开好几个助手」只说明可以并行，不说明软件会替你分配任务、等待依赖或汇总结果。

[Herdr core](https://herdr.dev/core/) 写得最直白：一个助手可以启动帮手、给它们工作、等待并读取结果；帮手从属于启动它的助手，完成会回报，启动者停止时帮手也停止。官网同时写：只有支持开放状态协议 OSC 7501 的助手，才会在列表里准确显示「正在工作、做完了、还是在等你」；不会说这种协议的助手仍能运行，只是没有状态。文章没有验证某个具体助手是否已经实现该协议。

[Paseo 的编排文档](https://paseo.sh/docs/orchestration) 也写了委派、并行、互相发送提示词，以及跨机器启动。内置的 Paseo tools（MCP）默认关闭，要在「Settings → 你的主机 → Agents」里打开「Enable Paseo tools」，新开或重新加载助手后才会注入这些工具。用 CLI 启动工人则不一定要打开工具注入。这是文档里的默认值，不是对效果的判断。

Orca 可以并行跑多个 worktree 里的助手，这是它的常规用法。另外还有一层实验性编排：[Orchestration](https://orca.dev/docs/cli/orchestration) 写明包含 Run、Task、Dispatch、受监督的 worker 和决策门；使用前要在 Settings → Experimental 打开。同一页写：实验性 Orchestration 面板及其开关暂时不可用（temporarily unavailable）。CLI 仍可与正在运行的 Orca 运行时通信。不要把「面板暂时不可用」写成功能已经取消，也不要写成当天已经在界面里用过。

[T3 Code README](https://github.com/pingdotgg/t3code/blob/main/README.md) 把它定义为开源控制平面：在一个界面里编排多种助手，使用你已有的订阅。它强调权限模式、差异审阅、提交和开 PR，而不是自动把工作拆给一个「团队」并保证汇总。本文没有把它理解成成熟的自动协作系统。

## 任务在哪台机器上继续跑

如果只在笔记本的图形窗口里开助手，窗口一关或电脑一休眠，结果可能完全不同。

Herdr 的重点就在这里。[官网](https://herdr.dev/) 写：助手跑在 herdr-core 这个本机小服务里，不在窗口里；退出、更新或让应用崩溃，终端仍停在原处。但同一页 FAQ 也写了边界：机器重启或 herdr-core 停止后，程序会停掉；窗格会在同一目录里回到一个 shell，Herdr **不会**自动重启助手或恢复进行中的工作，需要你再启动一次。其他机器可通过 SSH 加进同一侧栏。

Paseo 把架构写成类似 Docker 的客户端-服务器：[Security](https://paseo.sh/docs/security) 写，daemon 才是管理助手生命周期的进程，手机、CLI 或网页都是连上它的客户端。新安装默认关闭中继；配对时会先询问。官方中继被写成「设计上不可信」，流量在手机和 daemon 之间端到端加密。直接连接默认只监听 `127.0.0.1:6767`。若绑定到局域网或 `0.0.0.0`，应设置密码；文档明确写：密码认证防止未授权客户端控制助手，**并不加密流量**。在不信任的网络上，文档建议改用中继或 Tailscale 这类 VPN。

Orca 的 [Ways to run](https://orca.dev/docs/ways-to-run) 把路径分成四种：本地桌面、SSH 目标、Remote Orca Server，以及按工作区启动的 Cloud VM / 环境（在设置里标为 Experimental）。官方写它不出售托管 VPS，远程模式用的是你控制的机器和云账号。本地是大多数人的默认路径；若希望笔记本休眠后助手继续跑，或让手机连回同一批会话，文档指向 Remote Orca Server。手机 [companion](https://orca.dev/docs/mobile) 当天仍标为 beta，由已配对的桌面拥有会话，并写明它有意不是完整编辑器。

T3 Code 的 [Remote access](https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md) 写：要连到另一台机器上的 T3 Code，那台机器必须保持运行且可访问。T3 Connect 可免做路由器转发，但要在主机上登录并启用；命令行则是 `t3 up`。只保存登录状态，并不会自动启动服务器。关闭桌面应用的最后一个窗口，会停掉它的本地服务器。T3 Connect 默认每个账号最多关联 3 台机器（手机和浏览器不计入）；文档写，付费的 T3 Chat 方案可把上限提高到 Pro 的 10 台或 Premier 的 100 台。本文没有注册 T3 Connect，也没有验证这些额度。

## 改完怎么审，以及 worktree 不是系统沙箱

四款都把「看 diff、再决定合不合」写成工作流的一部分，但隔离的含义容易被说大。

Orca 的 [Worktrees](https://orca.dev/docs/model/worktrees) 写：每个任务有自己的磁盘副本和分支，「并行助手才安全——它们不会互相踩文件」。同一套产品在 [Agents and sessions](https://orca.dev/docs/model/agents-sessions) 里把用意写成：「worktree 本身就是 sandbox」，因此默认给每个受支持的助手预填跳过审批的启动参数，例如 Claude 的 `--dangerously-skip-permissions`、Codex 的 `--dangerously-bypass-approvals-and-sandbox`、Gemini 等的 `--yolo`。[Supported agents](https://orca.dev/docs/agents/supported) 给出的理由是：worktree 可丢弃，助手可以在自己的 checkout 里试验，而不必你确认每一条 shell 命令，你仍然可以在合并前挑选或丢弃 diff。可在 Settings → Agents → Agent Permissions 把未自定义的启动在 Yolo 和 Manual 之间切换。这是文档对默认行为的说明。它不能被转写成「这是操作系统沙箱，助手碰不到工作区以外的文件或凭证」。Codex 那条官方参数名称里甚至带有 bypass sandbox。本文没有验证这些参数在真实机器上的实际隔离范围。

Paseo 的 [Git worktrees](https://paseo.sh/docs/worktrees) 把 Isolation 设为 New worktree 时，写成另开目录和分支，让并行助手不会互相覆盖。这同样是 git 工作区隔离。Docker 自托管说明还写：容器用户隔离不能代替谨慎的挂载，助手仍能访问你挂进容器的代码和凭证。

T3 Code 的 README 写：每个线程可以在自己的 worktree 里工作，先看 diff，再用一个按钮提交、推送并打开 PR。[Source control](https://github.com/pingdotgg/t3code/blob/main/docs/user/source-control.md) 补充了按回合查看变更，以及连接 GitHub、GitLab 等托管平台的方式。这是审阅和发布流程，不是沙箱测试结论。

Herdr 当天打开的桌面和 core 文档，没有把「一等的 worktree 工作流」写成与 Orca 或 Paseo 同等的产品能力。原 [TUI](https://herdr.dev/tui/) 是另一套产品。不能把终端版里的工作区命令，自动算到新桌面应用头上。

## 默认权限里，有几处需要先看见

除了 Orca 预填跳过审批的启动参数，还有几处默认值容易忽略。

T3 Code 的 [Permission modes](https://github.com/pingdotgg/t3code/blob/main/docs/user/permission-modes.md) 写：权限作用在线程上；新线程的初始默认是 **Full access**，可在 Settings → Threads → New threads → Permissions 更改。Full access 允许命令和编辑而不再弹出批准。各助手对同一模式的执行并不完全相同，文档按提供方分别说明。本文没有切换这些模式做对照实验。

Orca 的 [Bot security](https://orca.dev/docs/bots/security) 写：Orca 的默认聊天权限是 Full access，因此新 bot 除非另设，也会从这里开始；在 Full access 下，助手运行命令或编辑文件前不会停下来询问。若 bot 要被其他人询问，或会读取外部的邮件、议题或消息，文档建议改成 Ask for approval。

Herdr 的 [安全说明](https://github.com/herdrdev/herdr-app/blob/master/docs/security.md) 写：模组是运行在应用内的受信任 JavaScript，可以按你的环境运行程序、请求网址、读文件；没有针对每个程序或网络请求的许可提示。官方写「这不是安全边界」，安装前应像阅读自己会执行的脚本一样阅读模组。桌面遥测默认开启，每天发送一份匿名用量报告，不含终端内容、文件名或提示词，可在 Settings → Privacy 关闭，或在 `settings.json` 里设置 `"telemetry": false`。

Paseo 的密码认证和绑定地址已经在上一节说明。另外，README 写它没有遥测、跟踪或强制登录；这是仓库当天的说明，不是对你这台机器的检查结果。

## 不要认错名字

- **Herdr 桌面应用和 Herdr TUI 不是同一个产品。** 官网 FAQ 写：TUI 是原来的终端应用，有自己的 server；新应用基于 herdr-core，两边不共享 agents。手机只连 herdr-core，连不上 TUI 里的会话。
- **HerdOS 不是 Herdr。** 前者是另一套产品，不要因为名字接近就当成同一款。
- **T3 Code 不是 T3 Stack。** 它是 T3 Tools Inc. 的编程助手控制平面，源代码 MIT 许可；仓库还写明，MIT 只覆盖源代码，不包括 T3 Code 名称和标识。
- **「免费」只指控制面或客户端本身。** 底层 Claude、Codex、Gemini 等订阅或接口费用要另外计算。Orca 的 Cloud VM 也要用你自己的云账号付费。

站内 2026-11-24 还收录了 Happy、Nimbalyst 等相近工具页，同样是未评分资料。它们不在本次四款对照里，本文没有展开。

## 本文没有做的事

没有安装、登录或启动 Orca、Herdr、Paseo 或 T3 Code，没有在真实机器上跑助手、中继、T3 Connect、SSH、Cloud VM 或手机配对，没有付费，也没有做运行时安全测试。因此：

- 不评价速度、稳定性、实际费用或隔离是否有效；
- 不裁决某个助手是否已经实现 Herdr 的 OSC 7501 状态上报；
- 不把 Orca 文档里「worktree 就是 sandbox」的措辞，写成系统沙箱结论；
- 不把实验性编排面板「暂时不可用」写成功能已移除，或写成界面里已经用过；
- 不更新这些工具页里的版本或评分，也不把未评分条目写成已实测。

若你要看 Paseo 的安装和远程连接步骤，仍以 [Paseo 远程 Agent 编排器指南](/zh/guides/paseo-remote-agent-orchestrator/) 为准；其中关于当前许可的说明已在 2026-11-24 按 Apache-2.0 更正过，本文与之一致。
