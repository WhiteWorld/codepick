---
title: "Gemini CLI vs Claude Code vs Codex CLI：先核对登录与计费，再选终端 Agent"
description: "Gemini CLI 个人入口已变更，Claude Code 不只支持 API Key，Codex CLI 也不只绑定 Plus。按当前官方文档比较访问资格、账单、迁移与执行权限，避免用旧免费额度做选择。"
date: "2026-02-17"
updated_at: "2026-11-18"
tags: ["gemini-cli", "claude-code", "codex-cli", "终端", "cli", "对比"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

同样在终端运行，不代表登录方式、额度和账单相同。选工具之前，先确认你的账号今天还能用哪个入口，再看它是否适合你的工作流。

**核对日期：2026-11-18（Asia/Shanghai）。** 本文核对官方公告、认证、计费与安装文档，不是性能实测。没有执行安装命令、登录账号或测试中国大陆连通性，也不据此评选“代码能力最强”。

## 先看访问资格，而不是旧免费额度

| 要核对什么 | Gemini CLI | Claude Code | Codex CLI |
| --- | --- | --- | --- |
| 个人账号入口 | 原免费、Google AI Pro / Ultra 的个人入口已于 2026-06-18 停止服务请求；查看 Antigravity CLI 迁移说明 | 支持符合资格的 Claude 订阅、Console 或组织配置的云提供商，不是必须自备 API Key | 本地 CLI 支持 ChatGPT 登录或 API Key；能否使用 CLI 要看套餐的具体界面资格 |
| 账单与额度 | 付费 Gemini / Agent Platform API Key 入口仍保留；旧 Code Assist 组织订阅另有生命周期 | 订阅、Console 和第三方提供商是不同计费路径；不要把订阅额度当作 API 余额 | API Key 使用单独的 API 账单，不消耗 ChatGPT 套餐额度；订阅额度也不等于无限任务 |
| 新项目怎么选 | 个人新项目先评估迁移路线；组织项目先查合同和到期规则 | 先确认登录路径，再配置项目指令、MCP 和工具授权 | 先确认 CLI 资格与账单，再检查权限、模型和审查流程 |

“客户端可安装”和“账号可以调用模型”是两件事。开源许可证也不等于免费推理：Codex 仓库使用 Apache-2.0，而 Claude Code 仓库的 LICENSE 指向商业条款，不能把三者一律标成开源免费。

## Gemini CLI：区分个人迁移、组织合同和 API Key

Google 的 [2026-05-19 公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli) 明确：个人免费 Code Assist、Google AI Pro 和 Ultra 的 Gemini CLI 请求在 **2026-06-18** 停止服务。因此，不应再把旧的个人免费请求数当作今天的入门方案。

公告保留付费 Gemini 和 Gemini Enterprise Agent Platform API Key 入口，也说明 Antigravity CLI 刚推出时**不是功能一比一替代**。迁移前检查项目指令、扩展、MCP、Hooks 和自动化脚本，不要只替换可执行文件名。

组织用户还需要看较新的 [Code Assist 停售与迁移说明](https://docs.cloud.google.com/gemini/docs/codeassist/sunset)：

- **2026-10-09** 起不再新售 Code Assist Standard / Enterprise；新 Gemini Enterprise Standard / Plus 也不再自动包含这项权益。
- 已有 Code Assist 订阅支持到合同结束。年付自动续订可持续到 **2027-01-31**，月付可持续到 **2027-12-31**；这些是续订边界，不是所有账号同一天停机。
- 已有 Gemini Enterprise 订阅中的 Code Assist 权益保留至 **2027-03-31**；已有 Code Assist 订阅增加席位的边界为 **2027-01-31**。
- Code Assist 的模型支持限制在 Gemini 3.x 系列，不能沿用旧文中的 Gemini 2.5 Pro 推荐。

这些官方日期未标明具体时区，本文不把它们改写成某个中国时间截止时刻。五月公告中“企业访问不变”的说法，也不能覆盖后来公布的停售、续订和权益规则。

## Claude Code：订阅登录和 API 计费是两条路

[认证文档](https://code.claude.com/docs/en/authentication) 列出 Claude Pro / Max / Ultra、团队或企业账号、Console，以及组织配置的云提供商。运行 `claude` 后可以走官方登录流程；API Key 不是所有人的必需条件。

先选择你实际要用的计费路径。不要仅因机器上已有订阅登录，就假定 Console / API 请求免费；也不要把付费订阅写成高用量或无额度上限的保证。团队账号还受管理员配置和席位资格影响。

[官方安装概览](https://code.claude.com/docs/en/overview) 推荐原生安装，也提供 Homebrew、WinGet 等方式。按你的系统选择安装方法，再检查版本和登录状态。例如，使用 Homebrew 的 macOS 用户可按官方文档安装：

```bash
brew install --cask claude-code
claude --version
claude
```

这只是文档中的安装路径，不是本文完成的安装测试。项目可以用 `CLAUDE.md` 记录约束，通过 MCP 接工具；这些能力并不保证生成代码正确，也不能替代权限审查。

## Codex CLI：不要把桌面 Free 资格当作 CLI 资格

[Codex 认证文档](https://developers.openai.com/codex/auth/) 区分 ChatGPT 订阅登录和 API Key 按量计费，本地 CLI 支持两者。不是每个用户都必须购买 Plus，也不是所有 API Key 功能都与订阅或云端功能相同。

[当前计费页](https://developers.openai.com/codex/pricing/) 的总说明提到 Free / Go，但具体条目把这两档的相关入口描述为 **desktop app，subject to rollout**；Plus 条目才明确列出 CLI 等界面。因此，不能仅凭页面总标题就承诺任意 Free / Go 账号可用 CLI。

套餐用量还取决于模型、任务复杂度、上下文和本地或云端执行方式。旧文中的固定五小时任务数，不宜当作当前合同额度；查账号用量页和当前套餐说明。API Key 请求走独立 API 账单，不包含在 ChatGPT 订阅中。

[官方 CLI 文档](https://developers.openai.com/codex/cli/) 和 [仓库 README](https://github.com/openai/codex) 提供原生安装、npm 与 Homebrew 等入口。已满足 npm 环境要求的用户可按官方说明选择：

```bash
npm install -g @openai/codex
codex
```

启动后确认登录方式，并检查 `/status`、`/model` 和 `/permissions`。不要因为任务在本地执行，就以为模型请求不出设备；认证方式也会影响适用的数据条款。

## 用同一个小任务做自己的比较

不要用固定上下文数字推导“能一次读完整个仓库”，也不要把某个厂商模型名永久绑定到客户端。实际可选模型、工具权限和额度会随账号、版本与组织配置变化。

可以在独立测试仓库里比较同一个有限任务，例如“解释一个函数，并为它补两个边界条件测试”：

1. 先留 Git 检查点，不放真实凭据或生产数据。
2. 记录登录路径、所选模型、授权的目录/命令和实际费用来源。
3. 人工审查 diff，再运行项目已有测试；记录失败，而不是只看回答是否流畅。
4. 比较完成质量、用量和操作成本，不预设某个工具一定最强或零成本。

上面是建议的验证方法，**不是本文已执行的评测结果**。中国大陆访问、账号资格和支付需要分别核实，本文不作一刀切的可用/不可用判断，也不推荐通过转售账号或非官方中转绕过地区规则。

## 选择建议

- **个人原 Gemini CLI 用户**：先读官方迁移公告，检查替代入口和未对齐功能；不要继续依赖历史个人免费额度。
- **已有 Claude 订阅或组织环境**：先确认 CLI 登录与计费配置，再评估项目指令、MCP 和权限工作流。
- **已有符合资格的 ChatGPT 套餐，或需要 API 方式自动化**：分别核对 Codex CLI 的界面资格和独立账单；不要把本地 CLI 等同云端功能全包。

需要更多按工具整理的来源与限制，可查看 [Gemini CLI](/zh/tool/gemini-cli)、[Claude Code](/zh/tool/claude-code) 和 [Codex CLI](/zh/tool/codex-cli)。[Claude Code LICENSE](https://github.com/anthropics/claude-code/blob/main/LICENSE.md) 与 [Codex LICENSE](https://github.com/openai/codex/blob/main/LICENSE) 也应与服务访问资格分开阅读。
