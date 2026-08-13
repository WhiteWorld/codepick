---
title: "Paseo 是什么？自托管远程 Agent 编排入门：手机/桌面/Web 统一管理 Claude Code、Codex 等 39 种 agent"
description: "Paseo 是自托管开源 daemon：把 Claude Code、Codex、Copilot、OpenCode、Pi 等 39 种 coding agent 统一到一个界面，agent 跑在你本机的完整开发环境里，用 iOS、Android、桌面、Web、CLI 全端接管。本文讲清它是什么、和 Conductor / Superset / OpenChamber / Happy Coder / Codex App 等怎么选、怎么上手、安全注意什么。"
date: "2026-08-12"
article_type: explainer
tags: [paseo, self-hosted, agent-orchestrator, claude-code, codex, opencode, mobile-coding, remote-agent]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

## Paseo 是什么

[Paseo](https://paseo.sh/)（GitHub：[getpaseo/paseo](https://github.com/getpaseo/paseo)，AGPL-3.0）是一款**自托管、开源的 coding agent 编排工具**。它在你自己的机器上跑一个本地服务（daemon），把 Claude Code、Codex、GitHub Copilot、OpenCode、Pi 等 **39 种 agent CLI** 统一管理起来，然后通过 **iOS / Android / 桌面（macOS、Windows、Linux）/ Web / CLI** 全端接入。

和 Conductor 这类“Mac 桌面编排器”不同，Paseo 的核心是 **daemon + 多端 client** 架构：

- agent 仍然跑在你本机的完整开发环境里（保留你的配置、skills、MCP、SSH key、数据库）；
- 你可以电脑上发起任务，出门后手机看 diff、批权限、审 PR、合并；
- 也可以在服务器或 Docker 里跑 daemon，从任何地方连过去。

它不是又一个 AI 编程工具，而是架在官方 agent CLI 之上的**控制平面**：底层还是你订阅/使用的 Claude Code、Codex、Copilot 等官方工具。

> 核查时间：2026-08-12。本文事实来自 paseo.sh 官网、官方文档与 GitHub README；GitHub star、版本号、App Store 状态变化很快，不作为核心判断依据。

## 为什么值得关注

1. **开源 + 无遥测**：AGPL-3.0 开源，官方明确不采集遥测、不强制登录。对在意代码和数据留在自己机器的开发者很友好。
2. **多 agent 并行 + 隔离**：每个 workspace 一个独立 git worktree 和分支，agent 互不干扰；每个 worktree 还有独立的本地 dev server 地址，并行任务不抢端口。
3. **全端 + 移动端对等**：手机端与桌面端功能一致，这在同类工具里很少见。
4. **生态与自动化**：支持定时任务（cron）、skills、MCP、浏览器窗格、TypeScript SDK、CLI 脚本化、Hub、Docker 部署。

## 核心概念与特性

### daemon + clients

Paseo 的本地服务叫 **daemon**，是唯一真正运行 agent 的进程。桌面、Web、手机、CLI 都只是它的客户端，可以同时连着同一个 daemon。

### Workspace / Git worktree

一个 workspace 对应一个独立 worktree + 分支 + 环境。一个 feature 一个 workspace，agent 并行干活互不串味，任务完成直接在 App 里 review diff、发 PR、合并。

### 支持的 agent

官方列表支持 **39 种 coding agent CLI**，原生支持 Claude Code、Codex、OpenCode、Pi、GitHub Copilot 等；另外可通过内置 catalog 用 ACP 接入更多，以及任意自定义 CLI agent。

### 语音、定时任务、Skills / MCP

- **语音**：语音输入/输出在本地设备处理，适合通勤时口头排任务；
- **定时任务**：`paseo schedule create --cron "..."` 让 agent 定时干活（比如每周一审计代码库）；
- **Skills / MCP**：复用你已有的 skills 与 MCP server 配置，agent 能力和你本机一致。

### CLI

`paseo run --provider codex "实现 OAuth"`、`paseo ls`、`paseo send <agent-id> "补测试"`、`paseo schedule …`、`paseo run --host <devbox>:6767`（连接远程 daemon）。

## 和同类工具怎么选

下面这组工具都属于“并行 / 远程管理 coding agent”赛道。表格定位以各官方页面为准（2026-08-12 核查）：

| 工具 | 定位 | 代码在哪跑 | 平台 | 开源/许可 | 手机端 | 定价 |
|---|---|---|---|---|---|---|
| **Paseo** | 自托管远程编排 daemon | 本机 / 自托管 / Docker | macOS、Windows、Linux + iOS/Android/Web/CLI | AGPL-3.0 | 原生 iOS+Android | 免费（赞助） |
| [Conductor](https://www.conductor.build/) | Mac 并行编排桌面 App | 本机 Mac | macOS | 闭源 | 无 | 免费（底层 Agent 自付） |
| [Superset](https://superset.sh/) | agentic IDE，并行跑 100+ CLI agent | 本机 + 远程 host | macOS 桌面（远程经 CLI/SDK/MCP） | Elastic License 2.0 | 无原生 App | 免费单席位/local |
| [OpenChamber](https://github.com/openchamber/openchamber) | 开源 workspace：桌面/浏览器/移动 PWA | 本机 / 远端 | 桌面 + Web + VS Code 扩展 + 移动 PWA | MIT | PWA | 开源免费 |
| [Happy Coder](https://github.com/slopus/happy) | Claude Code / Codex 移动 + Web 客户端 | 本机（包装启动） | iOS、Android、Web | MIT | 原生 | 开源免费 |
| [Codex App（ChatGPT 桌面端）](https://learn.chatgpt.com/docs/app) | OpenAI 官方 Codex 桌面 | 本机 / 云端 | macOS、Windows | 闭源（官方） | 经 Codex Remote connections（ChatGPT App） | 需 ChatGPT 订阅 |
| [Claude Desktop](https://code.claude.com/docs/en/desktop) | Anthropic 官方桌面（Chat + Cowork + Claude Code） | 本机 | macOS、Windows | 闭源（官方） | 经 Remote Control（Claude App） | 需 Claude 订阅 / API |
| [OpenCode Desktop](https://opencode.ai/) | OpenCode 官方桌面端（beta） | 本机 | macOS、Windows、Linux | MIT | 无 | 开源免费 |

怎么挑：

- 想要**手机原生 App + 多 agent + 开源**，先看 **Paseo**；
- 已在 Mac 上重度使用 Claude Code / Codex、习惯桌面工作流，**Conductor / Superset** 更贴近；
- 以 OpenCode 为主，**OpenChamber / OpenCode Desktop** 更省心；
- 只想让手机接管已有 Claude Code / Codex 会话，**Happy Coder 或官方 Remote 能力**更轻。

> 本站另有 [Conductor 入门指南](/zh/guides/conductor-build-intro) 与 [手机编程工具 2026](/zh/guides/mobile-ai-coding-tools-2026) 可配合阅读。

## 适合谁 / 不适合谁

**适合**：

- 重度使用多 agent、想突破单 agent 串行瓶颈的开发者；
- 需要“电脑发起、手机看 diff / 批权限 / 收通知”远程工作流的人；
- 在意代码留在自己机器、不想把上下文交给第三方 SaaS 的团队与个人；
- 想用定时任务、CLI 脚本化控制 agent 的自动化玩家。

**不适合**：

- 只是偶尔用 agent 改小问题的新手——先把单个 agent 用熟再上编排；
- 无法接受“机器必须在线 / 需要自托管维护”的场景；
- 对自建 daemon 的安全运维没有把握的团队（见下）。

## 上手 5 步

1. 安装 daemon 与任意客户端（桌面 / Web / 手机均可），从 [paseo.sh/download](https://paseo.sh/download) 获取；
2. 确认本机至少有一个可用的 agent CLI 并已登录（Claude Code / Codex / OpenCode / Copilot 等）；
3. 连接 daemon，新建 workspace（自动建分支 + worktree）；
4. 在 workspace 里描述任务，启动 agent；
5. 用手机 / Web 跟踪进度、审 diff、批权限、合并——离开电脑也能继续。

## 安全注意（重要）

- **不要**把 daemon 的端口 / WebSocket 直接暴露到公网；跨网络访问优先 Tailscale / WireGuard / 受保护的反向代理。
- daemon 跑在你自己机器上，agent 凭据（Claude / Codex 登录、MCP 密钥）留在本机——**机器安全 = 凭据安全**。
- 远程审批权限按需最小化：别给 agent 全局 shell 权限，高危命令走人工确认。
- 自托管没有厂商兜底：定期升级版本、关注 [changelog](https://paseo.sh/changelog)。

## 国内使用注意

Paseo 本身自托管、不依赖海外 SaaS，**daemon 与客户端之间**可自己走 Tailscale 或内网，不涉及 API 中转。但底层 Claude Code / Codex 在国内访问仍受网络与支付限制，需要按官方方式接入或使用国内中转（如火山方舟）——这与直接在电脑上用 Claude Code / Codex 的限制一致，可参考本站 [Claude Code 国内使用指南](/zh/guides/claude-code-china-usage)。
