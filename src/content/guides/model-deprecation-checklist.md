---
title: "模型下线自查清单：写死的旧模型 ID 怎么找、怎么改"
description: "核查日 2026-10-22。Copilot 已于 2026-10-19 下线 Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5 mini、Grok 4.5。2026-11-16 还将下线 Claude Opus 4.8、Claude Opus 5、GPT-5.6 Terra。公告只有显示名。附 rg 命令。"
date: "2026-10-17"
updated_at: "2026-10-22"
article_type: howto
tags: [model-deprecation, copilot, codex, openai, api]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "用 API Key 登录的 Codex 也要删掉 gpt-5.5 吗？"
    a: |
      不用为了 2026-10-14 这次退役去改。当天的 Codex 更新日志写明：受影响的是 ChatGPT 登录的 Codex；OpenAI API，以及用 API Key 登录的 Codex 会话，不受这次退役影响。你自己的后端如果仍把 `gpt-5.5` 传给 API，要看的是 API 关停页，不是这则 Codex 日志。
  - q: "仓库里 rg 没有命中，是不是就安全？"
    a: |
      不是。rg 看不到运行时拼出来的 ID，也看不到只存在于网页控制台里的默认模型。默认还会跳过 gitignore，`.env` 和 `settings.local.json` 经常在里面。命中为零只说明这几条正则没扫到字面量。
  - q: "个人年付的 Copilot 还要改 Opus 4.8 吗？"
    a: |
      公告写了：Claude Opus 4.8 会留给个人年付订阅，让他们还能用一款 Opus。这条例外不覆盖 Claude Opus 5 和 GPT-5.6 Terra，也不覆盖 2026-10-19 已经下线的那六款。仓库或 CI 里写死的 ID 会给同事和自动化用，年付例外帮不上那些调用。
  - q: "10 月 19 日下线的六款，仓库里该搜哪个模型 ID？"
    a: |
      这则 changelog 没有给 ID。只搜显示名：Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5 mini、Grok 4.5。不要自己编一串小写连字符 ID。Copilot 客户端里的 ID 仍是未知。
---

核查日：**2026-10-22** 重开了 [Copilot 10 月 19 日已下线公告](https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026/)。显示名以这则为准。它没有模型 ID，下面不编。2026-11-16 的 Copilot 公告、Codex 日志仍是 **2026-10-17** 打开的，这次没有重开。DeepSeek 别名这一节是 **2026-10-18** 重开 [价格页](https://api-docs.deepseek.com/quick_start/pricing) 和 [changelog](https://api-docs.deepseek.com/updates) 之后补的。OpenAI [关停页](https://platform.openai.com/docs/deprecations) 上 2026-10-23 那张表是 **2026-10-17** 抄的，核查日已过。**2026-10-22** 又打开了关停页，这批仍列在未来关停里。关没关以关停页为准。页上没有的，写未知。

计费单价不在这里重复，见 [Copilot 改为 AI Credits 计费](/zh/guides/copilot-ai-credits-billing/)。DeepSeek 的价格和 ID 见 [DeepSeek API 平台现状](/zh/guides/deepseek-v4-api-platforms/)。

## 先说结论

四件事不要合成一张表。

1. **GitHub Copilot** 分两批。
   - **已下线，2026-10-19**：Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5 mini、Grok 4.5。各自的建议替代在下面的表里。公告只有显示名，没有模型 ID。
   - **即将下线，2026-11-16**：Claude Opus 4.8、Claude Opus 5、GPT-5.6 Terra。公告给的替代是 Claude Opus 5.5，以及 GPT-6.1 Sol 或 GPT-6 Luna。个人年付订阅仍保留 Claude Opus 4.8。这则也是显示名，没有可搜索的模型 ID。
2. **Codex** 已在 **2026-10-14 12:00 PDT（19:00 UTC）** 让 GPT-5.5 从 ChatGPT 登录的 Codex 里退役。OpenAI API 和 API Key 会话不受影响。日志建议在套餐和客户端还提供时改用 `gpt-6.1-sol`。CLI **0.161.0**（发布于 2026-10-07）把内置目录和 Amazon Bedrock 目录的默认模型改成了 GPT-6.1 Sol。你自己在 `config.toml` 里写的 `model = "gpt-5.5"` 优先级更高，升级 CLI 不会替你改掉这一行。Copilot 公告里的显示名 GPT-5.5 是另一个产品，不代替这行 ID。
3. **OpenAI API** 的 [关停页](https://platform.openai.com/docs/deprecations) 在 2026-10-17 能打开，没有被 Cloudflare 拦住。上面写了 **2027-01-14** 关闭若干 GPT-4o / GPT-4.1 **快照**。更近的一档是 **2026-10-23**。下面那张表的核查日是 2026-10-17，已经过了。关没关、替代有没有变，以关停页为准。不带日期的别名 `gpt-4o`、`gpt-4.1` 没有单独一行，是否同一天关闭：**未知**。
4. **DeepSeek**：`deepseek-v4-flash` 和 `deepseek-v4-flash-vision-exp` 现在是兼容别名。价格页写明对应模型已退役，请求由 DeepSeek-V4.1-Flash-1017 按 Flash 价处理。新代码写 `deepseek-flash`。`deepseek-chat` / `deepseek-reasoner` 原定 2026-07-24 停用，当前价格页未列出，是否还能调用：**未知**。

Copilot 不是每个团队的主入口。用 Codex、或者在服务端把模型 ID 写进请求的人，按第 2、3 条做完搜索即可。仓库里如果还写着 `deepseek-v4-flash` 或 `deepseek-v4-flash-vision-exp`，按第 4 条改成 `deepseek-flash`，除非你就是要留兼容别名。本文不写访问是否顺畅。

## 页面上的原句

### Copilot：2026-10-19 已下线

来源：[GitHub Copilot models deprecated on October 19, 2026](https://github.blog/changelog/2026-10-19-github-copilot-models-deprecated-on-october-19-2026/)（文首日期 October 19, 2026）。2026-10-22 打开。

原句是 “As of today, October 19, 2026, we have deprecated the following models”。这批已经下线。同一则写，这些下线曾在 2026-09-18 宣布。9 月 18 日那篇这次没打开。

| 公告中的模型 | 下线日 | 建议替代 |
| --- | --- | --- |
| Gemini 3.7 Flash | 2026-10-19 | Gemini 3.8 Flash |
| GPT-5.5 | 2026-10-19 | GPT-6.1 Sol |
| GPT-5.4 | 2026-10-19 | GPT-6.1 Sol |
| GPT-5.4 mini | 2026-10-19 | GPT-6 Luna |
| GPT-5 mini | 2026-10-19 | GPT-6 Luna |
| Grok 4.5 | 2026-10-19 | Grok 4.7 |

范围用的词是 most GitHub Copilot experiences。公告点名了 Copilot Chat、inline edits、ask、agent，以及代码补全。没点名的体验，未知。

这六款在 Copilot 里的模型 ID，公告没写。**未知**。不要自己编一串小写连字符 ID。表里的 GPT-5.5 是显示名。Codex 日志里的 `gpt-5.5` 是另一个产品的 ID。

Copilot Enterprise 管理员可能要在 Copilot settings 的模型策略里打开替代模型。公告写：策略打开之后，VS Code 和 github.com 的 Copilot Chat 模型选择器里能看到。已经下线的模型，公告写不用再手动从策略里删。工作流和集成仍点着旧显示名的，改成表里那一格的替代。

这批和下面 2026-11-16 的三款不是同一天。11 月 16 日还没到。

### Copilot：2026-11-16 即将下线

来源：[Upcoming deprecation of selected GitHub Copilot models in mid-November](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/)（文首日期 October 15, 2026）。这则仍是 2026-10-17 打开的，这次没有重开。这三款还在下线日之前。

| 公告中的模型 | 下线日 | 建议替代 |
| --- | --- | --- |
| Claude Opus 4.8 | 2026-11-16 | Claude Opus 5.5 |
| Claude Opus 5 | 2026-11-16 | Claude Opus 5.5 |
| GPT-5.6 Terra | 2026-11-16 | GPT-6.1 Sol 或 GPT-6 Luna |

范围是所有 Copilot 体验，公告点名了 Copilot Chat、inline edits、ask、agent，以及代码补全。

例外只有一句：Claude Opus 4.8 会留给 **个人年付** 订阅，让他们还能用一款 Opus。Claude Opus 5 和 GPT-5.6 Terra 没有同样的句子。

Enterprise / Business 在默认开启模型的策略下，会自动打开这些替代模型，除非管理员关掉了全局默认，或明确禁用了该模型。模型下线之后，公告写不用再手动把它从策略里删掉。仍在工作流里点名旧模型的，要在这一天之前改掉。

这三款在 Copilot 客户端里的字符串 ID，公告页没写。**未知**。不要把 Anthropic API 的 `claude-opus-4-8` 当成 Copilot 的 ID。

### Codex：GPT-5.5 已经退了

来源：[ChatGPT Learn changelog](https://learn.chatgpt.com/docs/changelog)，条目 “GPT-5.5 retirement in Codex”，日期 2026-10-14。

生效时间是 2026-10-14 中午 PDT，也就是 19:00 UTC。退役范围是 **用 ChatGPT 登录的 Codex**。OpenAI API，以及 **用 API Key 认证的 Codex 会话**，不受影响。

同一则写：套餐和客户端还提供的话，用 GPT-6.1 Sol，ID 是 `gpt-6.1-sol`。要改的包括工作区默认、保存的模型设置、托管配置、自定义 agent、定时任务，以及仍在选择 `gpt-5.5` 的脚本。后三类的文件路径，这则日志没有给。路径 **未知**，用下面的搜索去找字面量。

同页更早还有一则 “GPT-5.5 retires from ChatGPT, ChatGPT Work, and Codex on October 14”，写的是所有套餐（含个人、Business、Enterprise、Edu），并写明不适用于 OpenAI API。以 10 月 14 日那则「已经生效」的段落为准：它把 API Key 会话单独摘了出去。

CLI 默认模型另有一条。[changelog 的 Codex CLI 0.161.0](https://learn.chatgpt.com/docs/changelog) 和 [GitHub release rust-v0.161.0](https://github.com/openai/codex/releases/tag/rust-v0.161.0) 都写：GPT-6.1 Sol 成为内置目录和 Amazon Bedrock 目录的默认模型。Release 发布时间是 2026-10-07T15:58:45Z。这是目录默认值，不是一次配置迁移。

### API：关停页当天开着

来源：[Deprecations](https://platform.openai.com/docs/deprecations)。下面的表是 2026-10-17 打开的 markdown。2026-10-22 只复查了 2026-10-23 这批还在不在未来关停里，没有整页重抄。

页首写：可以调 `GET /v1/models`，看每个模型可选的 `shutdown_date`。有日期就是 `YYYY-MM-DD`，没有公布则为 `null`。Retrieve a model 也有这个字段。这比在博客里搜「下线」可靠。

和写代码的仓库最相关的几行如下。语音、图像、Evals 还有更多行，以原页为准，这里不整页抄。

**2026-10-23**（这张表抄于 2026-10-17，核查日已过）。2026-10-22 又打开了关停页：这批仍写在未来关停一节，日期是 October 23, 2026，还没进 Past deprecations。关停日当天及之后，以关停页为准，不要把下面的抄录当成已经关掉。同一次打开，微调表里还有 `ft-davinci-002`，替代写的是 `gpt-5.6-terra`。10 月 17 日的抄录没有这一行。其余格子这次没有逐格重抄。

| 关停日 | 页上同一格里的 ID | 替代 |
| --- | --- | --- |
| 2026-10-23 | `gpt-3.5-turbo-0125`、`gpt-3.5-turbo`、`gpt-3.5-turbo-completions` | `gpt-5.6-terra` |
| 2026-10-23 | `gpt-4-0613`、`gpt-4`、`gpt-4-0613-completions`、`gpt-4-completions` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4-1106-preview` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4-turbo`、`gpt-4-turbo-2024-04-09`、`gpt-4-turbo-completions` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4.1-nano`、`gpt-4.1-nano-2025-04-14` | `gpt-5.6-luna` |
| 2026-10-23 | `gpt-4o-2024-05-13` | `gpt-5.6-sol` |
| 2026-10-23 | `o1-2024-12-17`、`o1` | `gpt-5.6-sol` |
| 2026-10-23 | `o1-pro-2025-03-19`、`o1-pro` | `gpt-5.6-sol`（`reasoning.mode: pro`） |
| 2026-10-23 | `o3-mini-2025-01-31`、`o3-mini` | `gpt-5.6-sol` |
| 2026-10-23 | `ft-o4-mini-2025-04-16` | `gpt-5.6-terra` |
| 2026-10-23 | `o4-mini-2025-04-16`、`o4-mini` | `gpt-5.6-terra` |

同日还有微调模型 `ft-gpt-3.5-turbo`、`ft-gpt-4`、`ft-gpt-4.1-nano-2025-04-14`、`ft-babbage-002`，以及图像模型 `gpt-image-1`。原表把 `gpt-image-1` 的替代写成 `gpt-image-2.5-sunburst` 或 `gpt-image-2.5-flare`。

**2026-12-11**：`gpt-5-2025-08-07`、`o3-2025-04-16` 的替代是 `gpt-5.6-sol`。`o3-pro-2025-06-10`、`gpt-5-pro-2025-10-06` 的替代也是 `gpt-5.6-sol`，并要加 `reasoning.mode: pro`。`gpt-5-mini-2025-08-07` 的替代是 `gpt-5.6-terra`。`gpt-5-nano-2025-08-07` 的替代是 `gpt-5.6-luna`。

**2027-01-14**（2026-10-14 通知的）：

| 关停日 | 页上的写法 | 替代 |
| --- | --- | --- |
| 2027-01-14 | GPT-4o（`gpt-4o-2024-08-06`、`gpt-4o-2024-11-20`） | `gpt-6-luna` |
| 2027-01-14 | GPT-4o mini（`gpt-4o-mini-2024-07-18`） | `gpt-6-luna` |
| 2027-01-14 | GPT-4.1（`gpt-4.1-2025-04-14`） | `gpt-6-luna` |
| 2027-01-14 | GPT-4.1 mini（`gpt-4.1-mini-2025-04-14`） | `gpt-6-luna` |

这些模型的微调版本跟基础模型同一天关。

**2027-04-01**：`gpt-5.3-codex` 和 `gpt-5.1` 的替代是 `gpt-6-sol`；`gpt-5.4-nano` 的替代是 `gpt-6-luna`。

两件容易混的事：

- 关停表**没有**单独列出不带日期的 `gpt-4o`、`gpt-4.1`。2026-10-17 打开的 [Responses create](https://platform.openai.com/docs/api-reference/responses/create) 枚举里，这两个别名以及 `gpt-5.5` 还在。这次没有重开那一页。枚举还在，只说明当时参考页没删。别名何时关：**未知**。
- API 页把 `gpt-5.6-terra` 写成一部分旧快照的替代。Copilot 公告则把 GPT-5.6 Terra 列为 2026-11-16 下线。这是两个产品。API 迁移跟着 API 页，Copilot 迁移跟着 Copilot 公告。

## 在仓库里搜

下面的命令用 [ripgrep](https://github.com/BurntSushi/ripgrep)（`rg`）。在仓库根目录执行。

默认的 `rg` **会跳过 gitignore**。`.env`、`.env.local`、`.claude/settings.local.json`、`.github/copilot/settings.local.json` 经常因此漏掉。所以搜两次：一次默认，一次 `--no-ignore`，并用 `--glob` 排除依赖目录。

字面量也有坑。`Claude Opus 5` 会命中替代模型 `Claude Opus 5.5`。`claude-opus-5` 会命中 `claude-opus-5-5`。默认的 `rg` 没有前瞻，所以下面要求「5 后面不能再跟 `.`、`-` 或数字」，这样不用加 `--pcre2`。

10 月 19 日那六款只有显示名。下面只搜显示名，不加公告里没有的 ID。`GPT-5.4` 会命中 `GPT-5.4 mini`，两条都在已下线名单里。`Grok 4.5` 也会出现在 Cursor 的周池文档里，那是另一个产品，看路径。`GPT-5.5` 是 Copilot 显示名；仓库里的 `gpt-5.5` 还要对照 Codex 那一节。

```bash
rg -n --hidden \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  --glob '!dist/**' \
  --glob '!.next/**' \
  -e 'Gemini 3\.7 Flash' \
  -e 'GPT-5\.4 mini' \
  -e 'GPT-5\.4' \
  -e 'GPT-5 mini' \
  -e 'GPT-5\.5' \
  -e 'Grok 4\.5' \
  .
```

gitignore 那次把这六个显示名也带上。仍然不要加自己编的 ID。

```bash
rg -n --hidden \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  --glob '!dist/**' \
  --glob '!.next/**' \
  -e 'gpt-5\.5' \
  -e 'GPT-5\.6 Terra' \
  -e 'gpt-5\.6-terra' \
  -e 'Claude Opus 4\.8' \
  -e 'claude-opus-4-8' \
  -e 'claude-opus-4\.8' \
  -e 'Claude Opus 5([^.]|$)' \
  -e 'claude-opus-5([^-.0-9]|$)' \
  -e 'gpt-4o-2024-' \
  -e 'gpt-4o-mini-2024-07-18' \
  -e 'gpt-4\.1-2025-04-14' \
  -e 'gpt-4\.1-mini-2025-04-14' \
  -e 'gpt-4\.1-nano' \
  -e 'gpt-4-turbo' \
  -e 'gpt-4-0613' \
  -e 'gpt-5\.3-codex' \
  -e 'gpt-5-2025-08-07' \
  -e 'o3-2025-04-16' \
  -e 'o3-mini' \
  .
```

gitignore 里的配置再搜一次：

```bash
rg -n --hidden --no-ignore \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  --glob '!dist/**' \
  --glob '!.next/**' \
  -e 'gpt-5\.5' \
  -e 'gpt-5\.6-terra' \
  -e 'claude-opus-4-8' \
  -e 'Claude Opus 4\.8' \
  -e 'Claude Opus 5([^.]|$)' \
  -e 'gpt-4o-2024-' \
  -e 'gpt-4\.1-2025-04-14' \
  -e 'gpt-5\.3-codex' \
  .
```

本机配置不在仓库里。文件不存在就跳过：

```bash
for f in \
  "$HOME/.codex/config.toml" \
  "$HOME/.copilot/settings.json" \
  "$HOME/.claude/settings.json" \
  "$HOME/.cursor/cli-config.json"
do
  if [ -f "$f" ]; then
    rg -n \
      -e 'gpt-5\.5' \
      -e 'gpt-5\.6-terra' \
      -e 'claude-opus-4-8' \
      -e 'Claude Opus 4\.8' \
      -e 'Claude Opus 5([^.]|$)' \
      -e 'gpt-4o-2024-' \
      -e 'gpt-4\.1-2025-04-14' \
      -e 'gpt-5\.3-codex' \
      "$f"
  fi
done
```

项目级覆盖也看一眼，路径相对当前仓库：

```bash
for f in \
  .codex/config.toml \
  .claude/settings.json \
  .claude/settings.local.json \
  .github/copilot/settings.json \
  .github/copilot/settings.local.json \
  .github/allowed_models.txt \
  .env \
  .env.example \
  .env.local
do
  if [ -f "$f" ]; then
    rg -n -e 'gpt-5\.5' -e 'claude-opus-4-8' -e 'gpt-4o-' -e 'gpt-4\.1-' -e 'gpt-5\.3-codex' "$f"
  fi
done
```

CI 通常在 `.github/workflows/`。第一条仓库搜索已经覆盖 yaml。再专门看脚本和示例环境变量：

```bash
rg -n --hidden --no-ignore \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  -g '*.{yml,yaml,sh,py,js,mjs,ts,toml,json,env}' \
  -e 'gpt-5\.5' \
  -e 'gpt-4o-2024-' \
  -e 'gpt-5\.3-codex' \
  .github scripts .env.example
```

局限，搜完仍要知道：

- 运行时拼接看不到最终 ID。例如模型名是字符串 `gpt-4o-` 再接一个日期变量。可以再搜前缀 `gpt-4o-`。
- `model: process.env.OPENAI_MODEL` 只把 ID 留在部署平台的环境变量里。仓库搜不到。去 CI 的 Variables、主机的环境、密钥管理里看。变量名叫什么，官方没有统一规定，本文不猜。
- 聊天记录、IDE 的界面选择、云端控制台里的默认模型，不在这几个文件里。
- `rg` 扫整个 `~/.cursor` 会打进缓存和历史会话。命中多，不代表有一份启动配置写死了该 ID。上面的循环只点了 `cli-config.json`。

不带日期的 `gpt-4o` 太容易误伤 `gpt-4o-2024-08-06` 和 `gpt-4o-mini`。要单查别名再用：

```bash
rg -n -e '(^|[^A-Za-z0-9-])gpt-4o([^A-Za-z0-9-]|$)' -e 'gpt-4\.1([^0-9-]|$)' .
```

这一步的命中，关停日仍是**未知**。先对照上面的快照表，别名不要直接改掉，除非你确认请求发出去的就是这个不带日期的字符串。

## 模型 ID 写在哪

「已核实」表示 2026-10-17 打开的官方文档写了这个位置。没打开到的写未核实。

| 工具 | 位置 | 状态 |
| --- | --- | --- |
| Copilot Chat | VS Code、Visual Studio、JetBrains、Eclipse、Xcode 的聊天模型下拉。VS Code 在聊天视图底部的 CURRENT-MODEL。换聊天模型不影响 inline suggestions。Copilot Extensions 可能覆盖你选的模型 | 已核实：[Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model) |
| Copilot CLI 用户配置 | `~/.copilot/settings.json` 的 `model`。`"auto"` 表示让 Copilot 选。`/model` 和 `copilot config` 会改它。可用 `COPILOT_HOME` 换目录 | 已核实：[CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) |
| Copilot CLI 仓库配置 | `.github/copilot/settings.json` 的 `model`，受信工作区才生效。个人覆盖是 `.github/copilot/settings.local.json`（应进 gitignore） | 已核实，同上 |
| Copilot CLI 子代理 | `settings.json` 里 `subagents.agents.<名字>.model` | 已核实，同上 |
| Copilot CLI 允许列表 | `.github/allowed_models.txt`。一行一个 ID 或 glob，`fallback:` 指定不允许时用哪个模型。这是允许列表，不是默认模型 | 已核实，同上。文档示例写了 `gpt-6-astra`、`claude-sonnet-*`。10 月 19 日和 11 月 16 日两则公告都没给 Copilot 模型 ID |
| Copilot 企业托管 | 企业的 `.github-private` 仓库：`copilot/managed-settings.json`，以及 `copilot/teams/*.json`。键是顶层 `model`。旧的 `permissions.model` 在没有顶层键时仍会被读 | 已核实：[Getting started](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started)、[Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) |
| Copilot 本机托管文件 | macOS `/Library/Application Support/GitHubCopilot/managed-settings.json`；Windows `%ProgramFiles%\GitHubCopilot\managed-settings.json`；Linux `/etc/github-copilot/managed-settings.json` | 已核实：[Choosing how to deploy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) |
| Copilot 组织策略界面 | 组织或企业后台里启用/禁用模型。不在你的应用仓库里，rg 找不到 | 已核实有这个界面：[Configuring access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models)。具体点哪一个下拉，以该页步骤为准 |
| VS Code 的 `settings.json` 里 Copilot 当前模型键名 | 本次打开的 Copilot 文档没有给出类似 `github.copilot.chat.*` 的键 | 未核实 |
| Codex CLI / IDE | `model = "..."`。用户文件 `~/.codex/config.toml`，项目 `.codex/config.toml`（项目需被信任），profile 是 `~/.codex/<名字>.config.toml`，Unix 系统文件 `/etc/codex/config.toml`。优先级：CLI 的 `--model` / `--config`，然后项目配置，然后 profile，然后用户配置，然后云端下发的默认，然后系统配置，然后内置默认 | 已核实：[Config basics](https://developers.openai.com/codex/config-file/config-basic)。当天示例是 `model = "gpt-6.1-sol"` |
| Codex 单次覆盖 | `codex --model <id>`，或 `codex --config model='"<id>"'`（值是 TOML 字符串） | 已核实：[Advanced Config](https://developers.openai.com/codex/config-advanced) |
| Codex 会话里看当前模型 | `/model` 切换，`/status` 确认当前模型 | 已核实：[CLI reference](https://developers.openai.com/codex/cli/reference)。参考页举例仍写着 `gpt-5.4-mini` 和 `gpt-5.5`，那是文档例句，不是 10 月 14 日之后的可用名单 |
| Codex 自定义 agent、定时任务的文件路径 | 退役日志点了名，没有给路径 | 未核实 |
| Claude Code | `model` 字段。优先级从高到低：会话中的 `/model`，启动参数 `claude --model`，环境变量 `ANTHROPIC_MODEL`，设置文件里的 `model`，以及给新会话用的 `ANTHROPIC_DEFAULT_MODEL`。`/model` 回车会把选择写进用户设置 | 已核实：[Model configuration](https://code.claude.com/docs/en/model-config) |
| Claude Code 设置文件 | 用户 `~/.claude/settings.json`；项目 `.claude/settings.json`；本机项目 `.claude/settings.local.json`；组织下发的 `managed-settings.json`（还有 MDM 和 claude.ai 的服务端托管） | 已核实：[Settings](https://code.claude.com/docs/en/settings) |
| Claude Code 别名 | `opus`、`sonnet`、`haiku` 会跟着版本变。要钉住版本，用完整 ID，例如文档里的 `claude-opus-5-5`，或 `ANTHROPIC_DEFAULT_OPUS_MODEL` 这类变量 | 已核实，模型配置页 |
| Claude Code 子代理 | 子代理 frontmatter 里的 `model` 会参与退役检查。定义文件放在哪个目录 | 字段已核实；目录未核实 |
| Cursor 编辑器 | 聊天输入框上方的模型选择。默认模型在 Cursor Settings > Models | 已核实：[Prompting agents](https://cursor.com/docs/agent/prompting)。编辑器把这个选择存到哪个磁盘文件：未核实 |
| Cursor CLI | `--model <id>`。持久化在 `~/.cursor/cli-config.json`（Windows 是 `%USERPROFILE%\.cursor\cli-config.json`）的 `model` 字段，类型是 object。项目级 `.cursor/cli.json` 文档写明只能配权限，不能配模型。`/model` 在会话里选 | 已核实：[CLI configuration](https://cursor.com/docs/cli/reference/configuration)、[parameters](https://cursor.com/docs/cli/reference/parameters)。`model` 对象里面有哪些键：未核实，文档没有示例 JSON |
| Cursor Cloud Agents | 控制台 Default model：某次运行没指定模型时用它 | 已核实：[Cloud Agents settings](https://cursor.com/docs/cloud-agent/settings) |
| OpenAI API | Responses 的请求体字段 `model`。当天枚举里仍包含 `gpt-5.5`、`gpt-4o`、`gpt-4.1` 和带日期的快照 | 已核实：[Create a response](https://platform.openai.com/docs/api-reference/responses/create) |
| OpenAI Chat Completions 参考页 | 2026-10-17 请求该页返回 403 | 未核实 |
| Anthropic Messages API | 请求字段 `model`。当天枚举含 `claude-opus-4-8`、`claude-opus-5`、`claude-opus-5-5` | 已核实：[Messages](https://docs.anthropic.com/en/api/messages)。这是 Anthropic API 的拼写，不是 Copilot 公告里的 ID |

官方 SDK 就是把这个 `model` 字段放进请求。搜索时看赋值，不要只搜某一种客户端方法名。Chat Completions 的方法名本次没核对。

一个具体例子。Codex 升级到 0.161.0 之后，内置默认已经是 GPT-6.1 Sol。如果 `~/.codex/config.toml` 里还有：

```toml
model = "gpt-5.5"
```

ChatGPT 登录的会话仍会去要这个已退役的 ID。删掉这一行才会落到新的目录默认；或者改成你的套餐仍提供的 ID，例如配置文档当天的示例 `gpt-6.1-sol`。套餐里没有的模型，日志写的是 “when available”，不要假设每个人都能选它。

## 改完怎么查

按产品分开，不要用「生成一段自我介绍」当唯一回归。

1. 再跑上面的 `rg`。配置和脚本里的旧 ID 应该没了。文章、changelog、锁文件里的历史字符串可以留着，看路径再判断。
2. **Codex（ChatGPT 登录）**：启动后输入 `/status`，看当前模型是不是你刚写进配置的那个。再发一个你平时会跑的小任务，例如「只跑已有的单元测试，不要改代码」。`/model` 列表里如果还出现 GPT-5.5，以你屏幕为准，把日志日期和客户端版本记下来。本文核查时没有在客户端里点开模型列表。
3. **API**：用新 ID 打一次你真正在用的端点。Responses 可以是一条最短请求，模型字段换成关停页给的替代，例如 `gpt-6-luna` 或 `gpt-6-sol`。失败时读错误正文里的模型名。本文没有核对当前的错误码字符串，不要背某个 `error.code`。然后跑这条调用所在的测试或 CI job。对比的是测试是否仍通过，不是两段散文是否相似。
4. **Copilot**：10 月 19 日那六款已经下线。打开聊天模型下拉，看 Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5 mini、Grok 4.5 还在不在。Enterprise 要先确认替代模型的策略已经打开，公告写打开后才会出现在 VS Code 和 github.com 的选择器里。11 月 16 日那三款还没到下线日。能做的是确认工作流和托管配置里的名字已经换成那则公告中的替代，并确认 Enterprise / Business 没有把这些替代模型禁用。11 月 16 日之后再看那三个显示名。个人年付用户仍看到 Claude Opus 4.8，和 11 月公告一致，不是漏改。本文核查时没有在客户端里点开模型列表。
5. **Cursor Cloud Agent 和 Copilot 组织策略** 在网页控制台里。改完发一次不指定模型的运行，看任务记录里实际用的模型名。rg 代替不了这一步。

`GET /v1/models` 里目标模型的 `shutdown_date` 如果已经是一个日期，就把它记到你们自己的日历，不要等请求在关停日当天失败。
