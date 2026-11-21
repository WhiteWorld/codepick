---
title: "从 Gemini CLI 迁到 Antigravity，哪些配置能带走？"
description: "核查日 2026-11-21。对照当天打开的官方迁移页、MCP 页和 2026-05-19 公告，整理规则、Skills、扩展和 MCP 的备份、迁移与回滚边界。没有安装 Antigravity CLI 或 Gemini CLI，也没有执行迁移命令。"
date: "2026-11-21"
article_type: howto
tags: [gemini-cli, antigravity, migration]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
faq:
  - q: "GEMINI.md 和 AGENTS.md 要不要改写？"
    a: |
      按 2026-11-21 打开的官方迁移页，工作区里的 GEMINI.md、AGENTS.md，以及全局的 ~/.gemini/GEMINI.md，不必改内容。自定义发现页还写了 ~/.gemini/AGENTS.md，迁移页没写这一项。本文没有在真实环境里核对文件是否会被读到。
  - q: "工作区 skills 为什么可能不会变成斜杠命令？"
    a: |
      迁移页写明：工作区路径已经从 .gemini/skills/ 改成 .agents/skills/，需要手动改名或搬迁，否则不会被识别为斜杠命令。全局 ~/.gemini/skills/ 仍可使用，另外还写了 ~/.gemini/antigravity-cli/skills/。Skills 文档还多写了 ~/.gemini/config/skills/，不要和迁移页的表混成一张“官方统一表”。
  - q: "把 url 或 httpUrl 改成 serverUrl 就一定能连上吗？"
    a: |
      不能这样推断。迁移页要求手动迁移远程 WebSocket 或 SSE 定义时，把 url 或 httpUrl 改成 serverUrl。MCP 页则另有一句：远程必须用 Streamable HTTP，serverUrl（并写 url also works），旧的 HTTP+SSE 和 httpUrl 不受支持。两页说法不完全相同，本文没有测过只改字段名能不能连通。
  - q: "官方有没有一键回滚？第一次运行 agy 会不会改掉旧文件？"
    a: |
      官方迁移页没有给出一键回滚命令。第一次 onboarding 会不会就地改写原来的 Gemini 配置，文档也没有写清，因此先复制备份再启动。不要把设置页里 settings.json 出现无效 JSON、类型错误或无法识别的值时的“用默认值覆盖”，或 CLI 参考里回退对话的 /rewind，当成配置迁移的回滚办法。
---

> 核查日：2026-11-21（北京时间）。依据当天打开的 Google [从 Gemini CLI 迁移](https://antigravity.google/docs/cli/gcli-migration/)、[MCP](https://antigravity.google/docs/mcp/)、[插件](https://antigravity.google/docs/plugins/)、[Skills](https://antigravity.google/docs/skills/)、[自定义发现](https://antigravity.google/docs/customization-discovery?tab=cli) 和 2026-05-19 的 [Antigravity CLI 介绍](https://antigravity.google/blog/introducing-google-antigravity-cli/)、[迁移公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)。本文没有安装 Antigravity CLI 或 Gemini CLI，没有执行 `agy` 或 `agy plugin import gemini`，没有登录，没有迁移真实配置，也没有测试 MCP 能否连通、主题或实验性 overlay 是否真的会丢。命令、路径和字段名只引用官方文档，不编造未出现的旗标或回滚命令。

这是一份配置迁移清单，不是产品选型，也不重写价格表。个人入口何时停用、计费和登录资格，见已有对比文 [Gemini CLI vs Claude Code vs Codex CLI](/zh/compare/gemini-cli-vs-claude-code-vs-codex-cli/)；产品对比和定价核对见 [Antigravity vs Cursor](/zh/compare/antigravity-vs-cursor/)。工具简介见 [Gemini CLI](/zh/tool/gemini-cli/) 和 [Antigravity](/zh/tool/antigravity/)。本文不改这些旧文正文。

2026-11-21 再次打开 2026-05-19 的[迁移公告](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)，页上仍写：2026-06-18 起，Gemini CLI 以及 Gemini Code Assist IDE 扩展停止为 Google AI Pro、Ultra，以及免费的 Gemini Code Assist for individuals 服务请求；并写明一开始不会有 1:1 功能对等。企业侧入口和付费 API Key 的说明，请看那篇对比文，这里不重复。Code Assist 订阅停售和续费日期，见官方 [Code Assist 停售说明](https://docs.cloud.google.com/gemini/docs/codeassist/sunset)，本文也不展开。

介绍博客把 Antigravity CLI 写成 Antigravity 2.0 的终端界面补充：同一套 agent 运行框架（官方称 agent harness），设置可共享；默认会话不跨产品共享，但 2.0 可以用 `@conversation` 拉取 CLI 会话。下面只讨论 CLI 配置迁移，不把 CLI、2.0、IDE 和 App 混成同一个产品。

安装请看官方 [下载页](https://antigravity.google/download) 和 [入门页](https://antigravity.google/docs/getting-started/)。本文不另写一套安装步骤。

## 先备份，再谈第一次运行 `agy`

官方迁移页没有写清：第一次 onboarding 会不会就地改写原来的 Gemini 配置。这一点按未知处理。所以先复制备份，再启动第一次 `agy`。

迁移前应先复制的位置至少包括迁移页、插件页点名的路径，以及工作区 `.agents/`（它不在 `.gemini/` 下）：

- 全局设置：`~/.gemini/settings.json`（迁移页写，旧的 MCP 就写在这个文件里）
- 全局规则：`~/.gemini/GEMINI.md`（迁移页）。自定义发现页另外写了 `~/.gemini/AGENTS.md`，迁移页没写这一项
- 全局 skills：`~/.gemini/skills/`
- 扩展目录：`~/.gemini/extensions/`（见[插件页](https://antigravity.google/docs/plugins/)，作为 `agy plugin import gemini` 的来源）
- 工作区规则：项目里的 `GEMINI.md`、`AGENTS.md`
- 工作区 skills：`.gemini/skills/`
- 工作区 `.agents/`（自定义发现页把工作区自定义放在这个目录，Skills 页和 Hooks 页也写了其中的子路径；它不在 `.gemini/` 下。迁移页点名的是其中的 `.agents/skills/`）

如果你在 `~/.gemini/`、项目 `.gemini/` 或工作区 `.agents/` 下还有其他文件，也一并备份。本文没有对着一台真实安装做过完整盘点，所以不会假装这就是全部。

备份完成后再谈两件事，都只是文档里的步骤，不是我们跑过的结果：

1. 迁移页写：第一次在含有旧配置的环境里执行 `agy`，如果检测到旧配置，会给出交互式清单。你可以选择要转换的扩展和全局配置；活跃的 session tokens 会迁到系统 keyring；视觉和渲染的默认参数会映射到新的设置配置。恢复备份文件并不等于撤销 keyring 侧的变化；官方迁移页没有给出撤销这些变化的命令，本文也不编造回滚命令。
2. 若要手动把扩展转成插件，官方命令是 `agy plugin import gemini`。

设置页把 Antigravity CLI 自己的配置写在 `~/.gemini/antigravity-cli/settings.json`，快捷键在 `~/.gemini/antigravity-cli/keybindings.json`。这两条路径出现在[设置页](https://antigravity.google/docs/settings?tab=cli)，不是迁移页原文。迁移页只说会映射到“新的 settings profile”，没有写出这个文件名。

## 规则文件：按迁移页，不必改内容

[迁移页](https://antigravity.google/docs/cli/gcli-migration/)写：两边使用相同的工作区上下文规则，现有规则文件无需修改。

- 工作区：agent 会继续读取并执行当前目录里的 `GEMINI.md` 和 `AGENTS.md`
- 全局：自动读取 `~/.gemini/GEMINI.md`

[自定义发现页](https://antigravity.google/docs/customization-discovery?tab=cli)还写了个人目录里的 `~/.gemini/AGENTS.md`，以及工作区 `.agents/` 下的规则文件。迁移页没有把这些写进“无需修改”那一份清单。两页分开看，不要合成一张表。本文没有实测这些文件是否都会被读到。

## Skills：全局可以留下，工作区要手搬

迁移页的路径对照是：

- 全局：Gemini CLI 为 `~/.gemini/skills/`；Antigravity CLI 为 `~/.gemini/skills/`，或 `~/.gemini/antigravity-cli/skills/`
- 工作区：从 `.gemini/skills/` 改为 `.agents/skills/`

迁移页还加了一句必须动手的说明：如果项目里的自定义工作区 skills 仍在 `.gemini/skills/`，必须手动改名或搬到 `.agents/skills/`，否则不会被识别为可用的斜杠命令。

[Skills 页](https://antigravity.google/docs/skills/)里，Antigravity CLI 的位置表并不完全相同。它把这些写成 CLI 的主要位置：

- 工作区：`<workspace-root>/.agents/skills/`
- 全局（与 App 共用）：`~/.gemini/config/skills/`
- 插件提供：`~/.gemini/config/plugins/<plugin-folder>/skills/`

同一页接着写：CLI 还会从 `~/.gemini/antigravity-cli/skills/` 和 `~/.gemini/skills/` 加载 skills，App 不会读这两个位置。自定义发现页重复了这两条额外路径。`~/.gemini/config/skills/` 出现在 Skills 页，没有出现在迁移页那张对照表里，不要合并成一句“官方统一路径”。

Skills 页另有一句总述：Antigravity 默认用 `.agents/skills`，但仍兼容 `.agent/skills`（单数）。这说的不是 Gemini CLI 的 `.gemini/skills/`，不能拿来代替上面那句“必须手搬”。

## 扩展如何变成插件

迁移页说，行业已普遍改称 plugins，可用下面这条命令手动转换旧的 Gemini 扩展：

```bash
agy plugin import gemini
```

官方说明是：这个工具会搜索旧的本地目录，解析扩展清单，并转换成原生布局。本文没有运行过它。

[插件页](https://antigravity.google/docs/plugins/)写得更具体：`agy plugin import gemini` 会从 `~/.gemini/extensions/` 迁移已有扩展（也可以指定目录）。同页还列出 `agy plugin import` 和 `agy plugin import claude`。本文只处理 Gemini CLI，不讨论 Claude 侧。转换后的 CLI 插件目录，插件页写的是 `~/.gemini/config/plugins/<plugin_name>/`。

迁移页给了一段“预期导入输出”示例：

```
[ok] conductor-tools
- skills : skipped (none detected)
- agents : skipped (none detected)
✔ commands : 4 legacy commands converted to skills
- mcpServers : skipped (none detected)
[ok] google-workspace
✔ skills : 5 skills processed
- agents : skipped (none detected)
✔ commands : 2 legacy commands converted to skills
✔ mcpServers : 1 server definition migrated to mcp_config.json
```

这段示例能说明的是：文档里，导入过程可能把旧的 commands 转成 skills，也可能把 MCP 写进 `mcp_config.json`，也可能跳过没有检测到的部分。它不能说明你的扩展会得到同样的结果，也不能当作我们已经验证转换成功。

## MCP：文件位置和字段，按页面分开写

迁移页写：Antigravity CLI 不再把 MCP 服务器嵌在主设置里，而是放到单独的 JSON 文件。

- 旧：写在 `~/.gemini/settings.json` 里
- 新的全局配置：`~/.gemini/config/mcp_config.json`
- 新的工作区配置：`.agents/mcp_config.json`

迁移页对字段的要求是：手动迁移远程 WebSocket 或 SSE 定义时，把原来的 `url` 或 `httpUrl` 改成 `serverUrl`。官方示例如下，字段和取值保持原样：

```json
{
  "mcpServers": {
    "remote-indexer": {
      "serverUrl": "https://mcp.internal.enterprise.com/sse",
      "env": {
        "AUTH_TOKEN": "secure_alpha_token"
      }
    }
  }
}
```

[MCP 页](https://antigravity.google/docs/mcp/)确认了同样的两个文件位置（工作区写成 `<workspace>/.agents/mcp_config.json`），并补充：已启用的插件也可以在 `<plugin-root>/mcp_config.json` 里带上服务器定义。CLI 里可在提示框输入 `/mcp`，打开交互式 MCP 管理面板。这些是文档里的入口，不是我们实测过的操作。

MCP 页对远程字段另有一句，和迁移页不完全相同，这里单独保留原文意思：远程 MCP 必须使用 Streamable HTTP；把服务端点写在 `serverUrl`（并写 `url` also works）；旧的 HTTP+SSE 传输和 `httpUrl` 字段不受支持。

不要把这两页合成一句“官方统一规定”。尤其不要据此断定：只要把旧的 SSE 地址改成 `serverUrl` 就能连通。迁移页示例里的地址仍带 `/sse`，但 MCP 页明确写了旧的 HTTP+SSE 不受支持。本文没有测试改字段后的连通结果。

MCP 页里还有 App、IDE 的点击路径。那是给对应界面看的，不是本文已经做过的步骤。

## 不能自动带走、或只是部分对等的项

迁移页用 “Partial parity” 说明：Antigravity CLI 保留工作区 skills、规则和 MCP 服务器；Gemini CLI 里某些自定义终端主题，或实验性的视觉 overlay，可能不受支持。

这是文档里的限制说明，不是我们核对过“主题确实丢了”。视觉默认参数会被映射，不表示你的自定义主题一定还能用。

2026-05-19 公告还把 Hooks、Subagents 列为仍保留的能力。但官方迁移页没有给出 Hooks 的转换步骤。[Hooks 页](https://antigravity.google/docs/hooks/)把 CLI 的 hooks 文件放在 `.agents/hooks.json` 和 `~/.gemini/config/hooks.json`。旧的 Gemini CLI hooks 会不会被自动拿走，文档没有在迁移页写清，本文按未知处理，不编转换命令。

## 验收清单（只核对文档里的路径和命令，不是已实测）

下面只能用来对照官方文档，检查你备份和搬迁时有没有漏路径。它不是一份我们跑通的验收记录。

- 工作区 `GEMINI.md`、`AGENTS.md` 和全局 `~/.gemini/GEMINI.md` 已备份；按迁移页，内容无需改写
- 若有工作区 `.gemini/skills/`，已手动搬到 `.agents/skills/`
- 全局 skills 仍可放在迁移页写的 `~/.gemini/skills/` 或 `~/.gemini/antigravity-cli/skills/`；若要按 Skills 页与 App 共用，还需另看 `~/.gemini/config/skills/`
- 扩展目录 `~/.gemini/extensions/` 已备份；如需手动转换，文档中的命令是 `agy plugin import gemini`
- MCP 已从 `~/.gemini/settings.json` 的旧写法，对照迁到 `~/.gemini/config/mcp_config.json` 或 `.agents/mcp_config.json`；远程字段按迁移页和 MCP 页分别核对，不要只改一个名字就结束
- 自定义主题和实验性 overlay，按迁移页视为可能无法对等，需要你自己回头看，本文没有测
- 官方文档里可以找到 `agy`、`agy plugin import gemini`、`/mcp` 这些入口；找到它们不等于迁移已经成功

## 回滚和保留旧配置的边界

官方迁移页没有给出一键回滚命令。设置页里“用默认值覆盖文件”，针对的是 Antigravity `settings.json` 出现无效 JSON、类型错误或无法识别的值：确认后会另存 `settings.json.corrupted.<timestamp>`，再重置为默认值。CLI 参考里的 `/rewind` 是回退对话历史。这两项都不是把配置迁回 Gemini CLI 的办法。

因此，能做的是：先保留完整备份，再启动第一次 onboarding。如果迁移结果不符合预期，用备份里的原文件恢复，而不是寻找一条我们编出来的卸载或回滚命令。本文没有测试卸载，也没有测试回滚。

第一次 onboarding 会不会就地改写原 Gemini 配置，官方文档没有写清，保持未知。这也是必须先备份的原因。不要把“文档说会转换”写成“我们已经验证转换成功”。本文也没有冒称效果、费用或运行时安全方面的实测。

## 资料

- [Migrating from Gemini CLI](https://antigravity.google/docs/cli/gcli-migration/)
- [Google Antigravity CLI](https://antigravity.google/blog/introducing-google-antigravity-cli/)（2026-05-19）
- [An important update: Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)（2026-05-19 公告；2026-11-21 复查）
- [Model Context Protocol (MCP)](https://antigravity.google/docs/mcp/)
- [Plugins](https://antigravity.google/docs/plugins/)
- [Agent skills](https://antigravity.google/docs/skills/)
- [Customization discovery](https://antigravity.google/docs/customization-discovery?tab=cli)
- [Settings](https://antigravity.google/docs/settings?tab=cli)（迁移页的 Settings 链接会转到这里）
- [Troubleshooting](https://antigravity.google/docs/cli/troubleshooting/)
- [CLI reference](https://antigravity.google/docs/cli/reference/)
- [Get started](https://antigravity.google/docs/getting-started/)
- [Download](https://antigravity.google/download)
- [Hooks](https://antigravity.google/docs/hooks/)
- [Gemini Code Assist Standard and Enterprise subscriptions](https://docs.cloud.google.com/gemini/docs/codeassist/sunset)
- 站内：[Gemini CLI vs Claude Code vs Codex CLI](/zh/compare/gemini-cli-vs-claude-code-vs-codex-cli/)、[Antigravity vs Cursor](/zh/compare/antigravity-vs-cursor/)、[Gemini CLI](/zh/tool/gemini-cli/)、[Antigravity](/zh/tool/antigravity/)
