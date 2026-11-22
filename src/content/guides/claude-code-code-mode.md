---
title: "Claude Code 的 Code Mode 怎么开，自动模式会检查什么"
description: "核查日 2026-11-22。按当天打开的官方 Code Mode、权限和沙箱文档，整理开启方法、恢复会话条件，以及自动模式改为审查每一段即将运行的代码后的权限边界。没有安装或启动 Claude Code，也没有打开 Code Mode 会话。"
date: "2026-11-22"
article_type: howto
tags: [claude-code, code-mode, permissions]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "克隆下来的仓库会不会替我打开 Code Mode？"
    a: |
      不会。2026-11-22 打开的官方 Code Mode 页写明：可以在 shell 或用户设置 ~/.claude/settings.json 里把 CLAUDE_CODE_EXPERIMENTAL_CODE_MODE 设为 1，但项目设置文件里的这个变量会被忽略。因此，你克隆的仓库不能替你打开 Code Mode。本文没有在真实项目里核对这项忽略规则。
  - q: "我走 Bedrock 或网关，能开吗？"
    a: |
      按当天打开的要求清单，Code Mode 需要 Claude 订阅或 Console 账户。不能通过网关、Amazon Bedrock、AWS 上的 Claude Platform、Google Cloud 的 Agent Platform、Microsoft Foundry，或 Google Cloud 上由 Anthropic 管理的 Claude Models 使用。本文没有在这些入口上试过。
  - q: "打开自动模式后，是不是每条命令都不再检查了？"
    a: |
      不是。自动模式的分类器审查的是每一段即将运行的代码，不是每一条工具调用，也看不到运行时才算出来的值，比如从搜索结果里取出的路径。官方仍写明：deny 和 ask 规则，以及 PreToolUse hook，会按工具常用名（如 Bash 或 MCP 工具名）检查代码里的每次调用。必须拦住的调用，要靠规则或 hook，不能只靠分类器。本文没有跑过自动模式。
  - q: "为什么恢复会话被拒绝了？"
    a: |
      官方警告：之后要用 claude --continue 或 claude --resume 恢复 Code Mode 会话时，必须继续把 CLAUDE_CODE_EXPERIMENTAL_CODE_MODE 设为 1。关掉之后，Claude Code 会拒绝恢复。反过来，当初没开 Code Mode 的会话，即使后来设了这个变量，也会在不开 Code Mode 的情况下恢复。本文没有实际恢复过会话。
---

> 核查日：2026-11-22（北京时间）。依据当天打开的 Anthropic 官方 [Code Mode 英文页](https://code.claude.com/docs/en/code-mode)、[Code Mode 中文页](https://code.claude.com/docs/zh-CN/code-mode)，以及 [权限](https://code.claude.com/docs/en/permissions)、[权限模式](https://code.claude.com/docs/en/permission-modes)、[Hooks](https://code.claude.com/docs/en/hooks)、[沙箱](https://code.claude.com/docs/en/sandboxing)、[托管设置](https://code.claude.com/docs/en/managed-settings)、[环境变量](https://code.claude.com/docs/en/env-vars) 和 [changelog](https://code.claude.com/docs/en/changelog)。版本信息对照 GitHub 上的 [v2.1.323](https://github.com/anthropics/claude-code/releases/tag/v2.1.323) 和当天看到的最新发布 [v2.1.330](https://github.com/anthropics/claude-code/releases/tag/v2.1.330)。本文没有安装或启动 Claude Code，没有打开 Code Mode 会话，没有跑自动模式、hook 或沙箱，也没有调用付费接口。命令、变量名和限制只引用官方文档，不编造未出现的旗标。

Code Mode 会改变 Claude 使用工具的方式。平常是一次请求一个工具，看完结果再决定下一步。打开之后，Claude 会先写一段 JavaScript，由 Claude Code 在当前会话里执行；一段代码里可以连续或并行调用多个工具，再把需要的结果交回给 Claude。

对话里你看到的是工具调用，比如一次编辑的 diff，而不是这段 JavaScript。官方说明：按 `Ctrl+O` 打开会话记录查看器，展开折叠的 Code 行，才能看到代码。

官方写明：这是实验功能，默认关闭，任何版本都可能改或拿掉。要反馈，文档让你运行 `/feedback`。

这不是性能评测，也不比较该不该换别的工具。产品对比见 [Claude Code vs Cursor](/zh/compare/claude-code-vs-cursor/) 和 [Claude Code vs Codex](/zh/compare/claude-code-vs-codex/)。和权限、隔离有关的通识见 [AI 编程 Agent 安全](/zh/guides/ai-coding-agent-security-2026/)。工具简介见 [Claude Code](/zh/tool/claude-code/)。本文不改这些旧文。

## 先确认你能不能开

2026-11-22 打开的 [Code Mode 页](https://code.claude.com/docs/en/code-mode) 把门槛写得很具体。旧版本会在不开 Code Mode 的情况下启动，可能附带、也可能不附带原因 `it isn't open to your account yet`。同一页的故障表还把 `it isn't open to your account yet` 和 `it isn't open to your account in this version` 列为单独原因：若版本低于 v2.1.323，先更新；若已是 v2.1.323 或更高仍出现这两句，官方让你检查网络并重新启动，若原因仍在，改日再试。因此，看到这两句并不必然表示版本过旧。本文没有遇到过这些提示。

按文档，至少要同时满足这些条件：

- 版本是 Claude Code v2.1.323 或更高。若还要和 agent teams 一起用，需要 v2.1.326 或更高。当天看到的最新发布是 v2.1.330，changelog 里仍有 Code Mode 相关修复，但不能据此推断所有修复都已在你的安装里生效。
- 账户是 Claude 订阅或 Console 账户。不能通过网关、Amazon Bedrock、AWS 上的 Claude Platform、Google Cloud 的 Agent Platform、Microsoft Foundry，或 Google Cloud 上由 Anthropic 管理的 Claude Models 使用。
- 组织没有启用 HIPAA 配置，也没有启用零数据保留（zero data retention）。
- 模型是 Claude Opus 5.5、Sonnet 5.5、Haiku 5.5 或 Fable 5.2。
- 入口是终端里的交互式 `claude` 会话。文档写明：VS Code 面板、Desktop 应用或云端会话不能用 Code Mode。安装必须是官方说的原生构建。Windows 还需要已安装 Git for Windows。
- 某些设置开启时，Code Mode 页仍写启动不了，点名的包括 API 密钥助手（api key helper）、OpenTelemetry 导出和 `DISABLE_TELEMETRY`；[无法启动对照表](https://code.claude.com/docs/en/code-mode#code-mode-doesnt-start)里还有 `it doesn't yet work with an installed mod`（检查工具调用的已安装 mod）。本文不逐条复述该表，也没有按表排查过真实环境。

同一天打开的 [changelog](https://code.claude.com/docs/en/changelog) 并不把上述清单写成 v2.1.329 及以上的无条件禁令。v2.1.329 写：OpenTelemetry 的 events 和 metrics 开启时也可以打开 Code Mode（代码里的每次工具调用会发送这些事件），但 tracing 仍会阻止启动；关掉 telemetry、非必要流量或 feature flags 时也可以启动，管理员仍可在托管设置里保持关闭。v2.1.327 写：已安装的 mod 挂钩工具调用时不再拒绝启动，管理员同样可在托管设置里禁用。两页说法不一致。本文没有实测哪一页最终生效，因此不替文档冲突做裁决。

agent teams 还有一条显示方式限制：文档写，默认的进程内显示模式下，队友以 Code Mode 运行；分屏窗格里的队友则在不开 Code Mode 的情况下启动。本文没有观察过这两种显示。

## 怎么打开，怎么关上

先跑 `claude --version`。若低于 v2.1.323，官方让你执行 `claude update`。若你在 `stable` 频道，更新后仍不到这个版本，文档的办法是等待 `stable` 跟进，或改到 `latest` 频道。本文没有执行更新，也不推荐为了赶实验功能随便改频道。

打开的方式是把环境变量 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` 设为 `1`。想先试一次，就在当前 shell 里设置；想以后每个新会话都开，就写进用户设置。

macOS、Linux 和 WSL 上，官方给出的启动方式是：

```bash
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 claude
```

Windows PowerShell 上是：

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_CODE_MODE = "1"
claude
```

要写进用户设置，官方示例是把下面这段放到 `~/.claude/settings.json`，再启动 `claude`：

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "1"
  }
}
```

同一页还写：Claude Code 会忽略项目设置文件里的这个变量，所以你克隆的仓库不能替你打开 Code Mode。

第一次使用前，官方说会先请你确认。选择 **Yes, turn on Code Mode** 后，Claude Code 会重新启动，并在会话顶部附近显示：

```text
Code Mode (experimental) is on · this session can be resumed only with Code Mode on
```

如果看到的是别的一行，或根本没有这行，对照官方故障排除，不要把“启动成功”理解成 Code Mode 一定已经打开。

之后若要用 `claude --continue` 或 `claude --resume` 接着上次的 Code Mode 会话，必须继续把这个变量保持为 `1`。关掉后再恢复，官方写明会被拒绝。当初没开 Code Mode 的会话，即使后来设了变量，也会在不开 Code Mode 的情况下恢复。

要关闭：从 shell 和 `~/.claude/settings.json` 里去掉这个变量，然后开一个新会话。也可以留着变量，把其中任何一处改成 `0`。官方写明：只要有一处是 `0`，即使另一处是 `1`，Code Mode 也会保持关闭。

如果要在整个组织里禁用，把值为 `0` 的同一变量写进[托管设置](https://code.claude.com/docs/en/managed-settings)：

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "0"
  }
}
```

文档还补了两点：已经在 Code Mode 会话里的人会继续留到退出或重启；此后不能恢复这些会话，直到这个 `0` 被拿掉。托管设置不能反过来帮用户打开 Code Mode。

## 自动模式检查的是每一段即将运行的代码，不是每一条调用

这是打开之前最需要看清的变化。

按 [Code Mode 页](https://code.claude.com/docs/en/code-mode)：在自动模式和 `bypassPermissions` 模式下，代码可以从头到尾运行而不弹出权限提示。但仍有例外，例如[任何模式都不会自动批准的操作](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves)。

代码里的每次工具调用，仍会以该工具的常用名（如 `Bash`，或 MCP 工具名）走过你的 `deny`、`ask` [权限规则](https://code.claude.com/docs/en/permissions) 和 `PreToolUse` [hook](https://code.claude.com/docs/en/hooks)。

除此之外，自动模式的分类器审查的是每一段即将运行的代码，而不是每一条工具调用。它看不到运行时才算出来的值，比如从搜索输出里取出的路径。所以，必须控制的调用，要靠规则或 hook，不能只交给分类器。

官方还提示：如果你用 hook 去允许或阻止 shell 命令，应检查命令的每个部分。在 Code Mode 里，在名为 `app` 的文件夹中执行的 `git push`，可能会以 `cd 'app' && git push` 的形式到达 hook。Bash 规则匹配的是命令文本，无论开不开 Code Mode，Claude 都可能把被拒绝的命令写成规则匹配不到的形式。不依赖命令文本的限制，文档指向[沙箱](https://code.claude.com/docs/en/sandboxing)。这些都是文档里的规则说明，不是本文在真实 hook 里看到的请求。

若想在代码开始前先看一眼再批准，官方办法是给运行这段代码的工具 `REPL` 加一条 `ask` 规则，写在 `~/.claude/settings.json`：

```json
{
  "permissions": {
    "ask": ["REPL"]
  }
}
```

提示里默认不带代码正文。官方说要先按 `Ctrl+O` 展开 Code 行再回答。它还写：在自动模式里如果你批准了，代码就会开始，即使分类器本来会拦住；而且这次引起的项目编辑和只读命令不再另行提示。如果 Claude 报告这段代码无法启动子代理，文档的办法是去掉这条规则。本文没有验证这条规则的实际提示界面。

代码已经跑起来后，若某次调用弹出权限提示，官方对“不是来自子代理”的提示这样写：选 **No** 或按 `Esc`、且不附加说明，代码会停下来，已经完成的调用造成的改动还在；如果拒绝时附带说明，这次调用被拒绝，其余调用可以继续。同样，这是文档说法，不是一次我们点过的会话。

自动模式还有一种带倒计时的提示。文档写：在分类器多次阻止后由你亲自批准的代码里，你可能被问到这段代码以及仍在运行的更早代码中的调用。若没有连接 IDE，提示可能出现倒计时，超时则拒绝该调用，并且后面本来也会倒计时的调用会直接被拒绝、不再提示。要再次看到提示，需要再给 Claude 发一条消息。v2.1.327 之前，即使新代码已被分类器放行，你也可能被问到仍在运行的旧代码里剩下的调用。这些倒计时文案我们没有在屏幕上见过。

## 沙箱罩不住这段 JavaScript

[Code Mode 页](https://code.claude.com/docs/en/code-mode)写：你的[沙箱](https://code.claude.com/docs/en/sandboxing)设置适用于代码里运行的 shell 命令。JavaScript 本身，以及它发起的文件、网页和 MCP 工具调用，在沙箱外运行。要把这些也隔离开，文档的办法是把 Claude Code 放到容器或虚拟机里。本文没有做过这种隔离测试。

同一页还写：若希望代码请求“在沙箱外运行某条命令”时，命令仍留在沙箱内，需打开严格沙箱模式。在自动模式里，分类器审查的是发出该请求的那一段代码，这条命令没有单独再审一次。

[沙箱页](https://code.claude.com/docs/en/sandboxing)本身也写：沙箱只覆盖 shell 命令；文件工具、MCP 服务器和 hook 在沙箱外。这和 Code Mode 页的边界是一致的，不要把“已经开了沙箱”理解成这段 JavaScript 都在沙箱里。该页还写明：沙箱可在 macOS、Linux 和 WSL2 上运行；原生 Windows 上的命令没有沙箱。若要在 Windows 机器上使用沙箱，官方办法是在 WSL2 发行版里运行 Claude Code。

## 还要接受这些限制

打开之前，官方让你先确认能接受这些限制：

- 只能在终端里、并且 Code Mode 仍开启时恢复该会话。
- 自动模式的分类器审查的是每一段即将运行的代码，不是每一条工具调用。
- 除非代码可以在后台运行，否则你要等它跑完，并且会在 10 分钟后停止。
- `PreToolUse` hook 如果没完成，例如超时，你可能会看到工具调用被拒绝。hook 失败后的默认行为在不同版本里有过调整，以官方故障排除为准。
- 不能使用 Remote Control、Claude in Chrome，或 computer use（计算机使用）。
- 不能把会话移到 Desktop 应用，也不能把它变成后台会话；`/fork` 也无法启动后台副本。

关于等待和后台：文档写，后台代码需要你一开始就处于自动模式或 `bypassPermissions` 模式，最长可以跑两小时；若 Claude 仍在等待，要检查当前模式、启动方式，以及是否向 `--tools` 传过工具名。v2.1.328 起，在 Manual 和 `acceptEdits` 模式下，你在权限提示上花的时间不再计入这 10 分钟；更早版本会计入。本文没有测过这些时限。

要中途停下：Claude 仍在回复或等待时按 `Esc`。若代码已转到后台、Claude 已经说完，官方让你在会话里运行 `/tasks`，选中还在跑的任务，再按 `x`。停下之后，还要再看 `/tasks` 里是否还有这段代码拉起、仍在运行的子代理、shell 命令或 MCP 调用。

## 本文没有做哪些核验

我们只打开了上面列出的官方页面和发布说明，没有安装 Claude Code，没有设置 `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE`，没有执行 `claude`、`claude update`、`claude --continue` 或 `claude --resume`，也没有在自动模式、`bypassPermissions`、沙箱、hook 或 agent teams 里跑过真实任务。因此，文中的命令和限制都是文档核对，不能当成一次实测结果。若官方页在你阅读时已经改了，以当时的页面为准。
