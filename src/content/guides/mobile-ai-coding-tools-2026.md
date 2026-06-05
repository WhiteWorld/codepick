---
title: "手机编程工具 2026：用手机控制 Claude Code、Codex、OpenCode 的几种路线"
description: "截至 2026 年 6 月，手机编程不再只是 SSH 到服务器，而是围绕 Claude Code、Codex、OpenCode 等 coding agent 形成了本地遥控、云端/设备端运行环境和手机 GUI agent 三类路线。"
date: "2026-06-04"
updated_at: "2026-06-05"
article_type: explainer
tags: ["mobile-coding", "ai-coding", "claude-code", "codex", "opencode", "paseo", "mcp", "phone-agent"]
draft: false
---

## 先说结论

“手机编程”在 2026 年变成了一个真实赛道，但它的核心不是让你在 6 英寸屏幕上敲代码，而是让手机成为 **coding agent 的控制台**。

更准确地说，这个赛道至少分成三类：

1. **手机遥控本地电脑或 VPS 上的 coding agent**：Codex Remote connections、Claude Code Remote Control、Paseo、Happy、CC Pocket、MobileCLI、Termly、OpenACP、Nimbalyst 等。
2. **手机打开一个云端或设备端开发环境**：Cosyra、Codem、Open Minis、Termux + Tailscale/SSH 等。
3. **让 AI agent 操作手机界面**：Open-AutoGLM、Open-AutoGLM-Hybrid、MaaMCP、Appium MCP、Coze 云手机等。

如果你是开发者，最值得先关注的是第一类和第二类。第三类很有想象力，但它解决的是“AI 如何操作手机 App / 云手机 / 自动化测试”，不是“我如何在通勤路上继续让 Codex 或 Claude Code 改仓库”。

> 核查时间：2026-06-05。本文只使用官方文档、官网、GitHub README 能直接确认的信息；GitHub star、定价、App Store/Google Play 状态变化很快，本文不把它们作为核心判断依据。

---

## 为什么现在值得关注

过去在手机上写代码，常见方案是 Termius、Blink Shell、Termux、iSH、GitHub Codespaces、Replit 这类终端或云 IDE。它们能用，但对手机很不友好：键盘小、上下文切换频繁、长任务容易断、权限确认也不及时。

coding agent 改变了这个问题。Claude Code、Codex CLI、OpenCode、Gemini CLI 这类工具把大量键盘输入变成了“描述任务、等它执行、审 diff、批权限、补一句上下文”。这些动作天然适合手机：

- 在路上看到 agent 卡在权限确认，手机点一下继续。
- agent 做完重构后，手机粗看 diff，把明显方向错的地方打回。
- 突发线上问题时，用手机进入已有终端或云容器，让 agent 帮你看日志、改配置、跑命令。
- 晚上离开电脑后，继续给本地机器上的 agent 排下一个任务。

所以这波“手机编程工具”真正卖的不是移动 IDE，而是 **离开桌面后的 agent 续航能力**。

---

## 第一类：手机遥控本地电脑上的 coding agent

这类工具的共同架构是：你的 Mac、Windows、Linux、VPS 或局域网机器负责运行真实的 agent 和仓库；手机只是连接、显示、输入、审批和通知层。

优点是保留本地开发环境、SSH key、MCP、数据库、测试脚本和已有配置。缺点也明显：机器必须在线；远程访问、加密、端口暴露、推送通知都要认真配置。

| 工具 | 已确认定位 | 适合谁 | 注意点 |
|---|---|---|---|
| [Codex Remote connections](https://developers.openai.com/codex/remote-connections) | OpenAI 官方能力：用 ChatGPT iOS/Android App 连接 Mac/Windows 上的 Codex App host，继续线程、发指令、批权限、看 diff/终端/截图 | 已经用 Codex App，并希望手机接管本机或远程主机项目的人 | 手机接入从 Codex App 设置，不能从 Codex CLI 或 IDE Extension 直接设置；host 需要在线、醒着、同账号/同 workspace |
| [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control) | 官方能力：把 Claude 手机 App 或 `claude.ai/code` 连接到本机 Claude Code 会话 | 只用 Claude Code、想要官方方案的人 | 仅 Claude Code；会话仍跑在你的电脑上；需要订阅账号登录，不支持 API key |
| [Paseo](https://github.com/getpaseo/paseo) | 一个界面管理 Claude Code、Codex、Copilot、OpenCode、Pi；支持 iOS、Android、桌面、Web、CLI | 想同时跑多个 agent、跨设备管理的人 | 需要在自己的机器上跑 daemon；更像 agent 控制平面 |
| [Happy](https://github.com/slopus/happy) | Claude Code / Codex 的移动端和 Web 客户端，通过 `happy claude` / `happy codex` 包装启动 | 想用手机接管 Claude Code 或 Codex，并重视推送和加密的人 | 依赖 Happy 的 CLI/同步组件；不是通用终端 |
| [CC Pocket](https://github.com/K9i-0/ccpocket) | Codex 和 Claude 的移动/桌面客户端，通过自托管 Bridge Server 连接 | Codex + Claude 双修，想在手机上看 diff、批权限、管理 worktree 的人 | 需要 Node.js 和 bridge；远程访问官方建议用 Tailscale |
| [MobileCLI](https://github.com/MobileCLI/mobilecli) | Rust daemon + React Native App，把 Claude Code、Codex、Gemini CLI 或普通终端流到手机 | 喜欢“真实终端流”的人 | 终端流自托管，推送经 Expo；不要把端口裸露到公网 |
| [Termly](https://termly.dev/) | 免费 CLI，把终端 AI 工具镜像到 iOS/Android；官网称支持 Claude Code、Gemini CLI、OpenCode、Qwen Code 等 | 想 60 秒扫码接入、偏轻量的人 | 官网称零知识中继和端到端加密；适合先小范围验证 |
| [OpenACP](https://openacp.ai/) | 把 coding agent 接到 Telegram、Discord、Slack；基于 Agent Client Protocol | 习惯从聊天工具发任务、团队协作的人 | 当前重点是聊天平台，官网路线图里移动 App 仍是 upcoming |
| [Nimbalyst](https://github.com/nimbalyst/nimbalyst) | 可视化 workspace 和 session manager，支持 Codex、Claude Code、OpenCode alpha、Copilot alpha；有移动 App 能回复、看 diff、收通知 | 想把 agent 会话、任务、文件和 diff 管在一个桌面工作台里的人 | 它不是纯手机工具，手机是完整工作台的延伸 |

如果只选一个入口先试，个人开发者可以从 **Paseo 或 CC Pocket** 开始：一个偏多 agent 控制平面，一个偏 Codex/Claude 手机接管。团队或社区场景可以看 **OpenACP**，因为 Telegram/Discord/Slack 入口比单独装 App 更容易扩散。

---

## 第二类：手机直接打开开发环境

如果你的电脑不常开，或者你希望手机本身就能打开一个“可跑 agent 的环境”，就会进入第二类。

[Cosyra](https://cosyra.com/) 是目前定位最清晰的代表：它是 iPhone/Android 上的 mobile cloud terminal，官网说明每个用户会拿到独立 Ubuntu 24.04 x86_64 容器，预装 Claude Code、Codex CLI、OpenCode、Gemini CLI，并提供 30GB 持久存储、BYOK、会话休眠等能力。它的好处是你不需要维护 VPS 或让笔记本常亮；代价是私有代码和运行环境进入第三方云容器，需要认真评估信任、成本和数据边界。

[Codem](https://codemapp.com/) 走相似但更偏 iPhone VM terminal 的路线：官网描述为 “stateful VM terminal for iPhone”，强调每个项目独立 VM、状态保持、快照、后台运行，并支持 Codex、Claude Code、Gemini CLI、Cursor workflows。它当前更像早期访问产品，适合关注但不要默认当成成熟生产环境。

[Open Minis](https://openminis.app/) 则不是纯 coding agent 工具，更像设备端通用 agent。官网描述它在设备上运行 Alpine Linux shell，支持多模型、浏览器、iOS 原生能力和 `SKILL.md` 风格技能。它可以覆盖一部分轻量脚本和自动化需求，但受 iOS 沙盒、移动硬件和 App 生命周期约束，不应简单等同于“手机上的完整开发机”。

还有老路线仍然有效：Android 上的 **Termux + Tailscale + tmux**，或者手机 SSH 到你自己的 VPS / Mac mini / 家庭服务器。它们没有新 App 那么漂亮，但可控性最高。真正的取舍是：你想要低维护，还是完全掌控运行环境。

---

## 第三类：AI 操作手机，不是手机操作 coding agent

用户经常会把 Open-AutoGLM、MaaMCP、Coze 云手机也放进“手机编程”讨论里。它们很重要，但不是同一个问题。

[Open-AutoGLM](https://github.com/zai-org/Open-AutoGLM) 的 README 把它定义为 Phone Agent：通过 ADB/HDC/WebDriverAgent 等方式连接手机，用视觉语言模型理解屏幕，再规划点击、滑动、输入等动作。它适合研究手机 GUI agent、App 自动化、中文 App 操作流程，不适合拿来管理你的代码仓库。

[Open-AutoGLM-Hybrid](https://github.com/xietao778899-rgb/Open-AutoGLM-Hybrid) 是一个社区混合方案，目标是在 Android 手机上通过 Termux、Open-AutoGLM、GRS AI、无障碍服务 / LADB 等组合实现无需电脑的手机自动化。仓库很早期，README 自称两次提交，里面的成功率和成本数字应当当作项目方声明，而不是稳定基准。

[MaaMCP](https://github.com/MAA-AI/MaaMCP) 则是把 MaaFramework 的 Android / Windows 自动化能力封装成 MCP server，让 AI 助手可以通过 ADB 控制 Android 设备/模拟器，做 OCR、截图、点击、滑动、输入、Pipeline 生成等。对移动 App 测试、黑盒自动化、游戏/桌面操作自动化很有价值，但它是 **agent 的工具接口**，不是手机端 coding agent 客户端。

Coze / 扣子这类平台的 [Agent World](https://space.coze.cn/space-intro) 方向也值得关注：官方页面已把云电脑、云手机、跨 IM、7x24 执行任务作为能力叙事的一部分。这类产品更像“给 agent 配一个云端工作环境和数字身份”，适合电商运营、内容分发、办公自动化等场景。它可以和编程相交，但不是传统意义上的开发者手机 coding 工具。

---

## 怎么选

如果你的目标是“我离开电脑后，Claude Code 或 Codex 不要干等我”，优先看 **Codex Remote connections、Claude Code Remote Control、Paseo、Happy、CC Pocket、MobileCLI、Termly**。

如果你的目标是“我没有电脑在身边，也想打开一个能跑 git/npm/python/agent 的环境”，优先看 **Cosyra、Codem、SSH 到 VPS、Termux + Tailscale**。

如果你的目标是“让 agent 帮我操作 Android/iOS App，做测试、截图、自动化流程”，看 **Open-AutoGLM、MaaMCP、Appium MCP**。

如果你的目标是“让 AI 拥有云电脑、云手机、邮箱、IM 身份，像数字员工一样跑任务”，看 **Coze 和各类云端 agent workspace**，但这已经超出纯编程工具范畴。

---

## 选型时最该问的 6 个问题

### 1. 代码到底在哪里运行？

本地遥控方案通常让代码留在你的电脑/VPS 上；云终端方案会把仓库 clone 到供应商容器；设备端 agent 则可能受手机文件系统和沙盒限制。私有仓库、客户代码、生产密钥都要先过这一关。

### 2. 手机只是看输出，还是能审批权限？

真正有用的移动端不是只看日志，而是能处理 agent 的阻塞点：tool approval、命令确认、MCP 请求、问题追问、diff 审阅。否则手机端只是“漂亮的 tail -f”。

### 3. 是否支持你实际使用的 agent？

Claude Code、Codex CLI、OpenCode、Gemini CLI、Copilot、Cursor agent 的接入方式完全不同。不要只看官网写“any terminal AI”，要确认它是否能正确处理你常用工具的交互界面、权限提示和退出状态。

### 4. 远程连接怎么保证安全？

优先选择 Tailscale、WireGuard、受保护的反向代理、端到端加密或厂商清晰说明的中继架构。不要为了手机方便，把本地 daemon 的 WebSocket 端口直接暴露到公网。

### 5. 手机锁屏、网络切换、App 后台后会怎样？

移动端最大的问题不是首屏体验，而是中途断开。要看 session 是否能恢复，消息是否排队，推送是否可靠，长任务是否继续跑。

### 6. 它是工具、控制台，还是运行环境？

Paseo/CC Pocket/MobileCLI 是控制台；Cosyra/Codem 是运行环境；MaaMCP/Open-AutoGLM 是手机自动化工具；Coze 云手机是云端 agent 基础设施。不要拿不同层级的产品硬比。

---

## CodePick 推荐的第一篇实测路线

如果你想最小成本理解这个赛道，我建议按这个顺序试：

1. **Codex Remote connections**：如果你已经用 Codex App，先体验官方 “ChatGPT mobile + Codex host” 路线。
2. **Claude Code Remote Control**：如果你主要用 Claude Code，体验 Anthropic 官方“本地会话 + 手机接管”的基准。
3. **Paseo**：看多 agent、多端、多 provider 控制平面是否真的提升日常工作流。
4. **CC Pocket 或 Happy**：重点看 Codex + Claude 的移动审批、diff 审阅和推送体验。
5. **Cosyra**：验证云终端方案是否能替代“带着笔记本出门”。
6. **MaaMCP / Open-AutoGLM**：另开一条线测试手机 GUI agent，不和前面混为一谈。

这个领域还早，很多产品会快速迭代甚至改名。真正长期成立的需求不是“在手机上写完整项目”，而是：**当 agent 在等你时，你能不能立刻看到、理解、决定，并让它继续工作。**

## 资料来源

- [Codex Remote connections 文档](https://developers.openai.com/codex/remote-connections)
- [Claude Code Remote Control 文档](https://code.claude.com/docs/en/remote-control)
- [OpenAI Codex CLI 文档](https://developers.openai.com/codex/cli)
- [Paseo GitHub README](https://github.com/getpaseo/paseo)
- [Happy GitHub README](https://github.com/slopus/happy)
- [CC Pocket GitHub README](https://github.com/K9i-0/ccpocket)
- [MobileCLI GitHub README](https://github.com/MobileCLI/mobilecli)
- [Termly 官网](https://termly.dev/)
- [OpenACP 官网](https://openacp.ai/)
- [Nimbalyst GitHub README](https://github.com/nimbalyst/nimbalyst)
- [Cosyra 官网](https://cosyra.com/)
- [Codem 官网](https://codemapp.com/)
- [Open Minis 官网](https://openminis.app/)
- [Open-AutoGLM GitHub README](https://github.com/zai-org/Open-AutoGLM)
- [Open-AutoGLM-Hybrid GitHub README](https://github.com/xietao778899-rgb/Open-AutoGLM-Hybrid)
- [MaaMCP GitHub README](https://github.com/MAA-AI/MaaMCP)
- [扣子 / Coze Agent World 页面](https://space.coze.cn/space-intro)
