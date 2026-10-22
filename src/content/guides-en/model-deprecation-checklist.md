---
title: "Model Deprecation Checklist: Find and Replace Pinned Model IDs"
description: "Checked 2026-10-17. Copilot retires Claude Opus 4.8, Claude Opus 5, and GPT-5.6 Terra on 2026-11-16. GPT-5.5 left ChatGPT-signed-in Codex on 2026-10-14. Ark Coding Plan: minimax-m3 shuts down 2026-11-02 14:00 UTC+8; kimi-k2.7-code shuts down 2026-10-28 14:00 UTC+8."
date: "2026-10-17"
updated_at: "2026-10-22"
article_type: howto
tags: [model-deprecation, copilot, codex, openai, api, ark]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Do API-key Codex sessions also need gpt-5.5 removed?"
    a: |
      Not for the 2026-10-14 retirement. That Codex changelog entry says ChatGPT sign-in is what changed. The OpenAI API, and Codex sessions authenticated with an API key, are not affected. If your own backend still sends `gpt-5.5` to the API, use the API deprecations page, not this Codex note.
  - q: "If rg finds nothing, is the repo safe?"
    a: |
      No. rg cannot see an ID built at runtime, and it cannot see a default model that exists only in a web console. By default it also skips gitignored files, which is where `.env` and `settings.local.json` often live. Zero hits only means these patterns did not match a literal string.
  - q: "Do individual annual Copilot subscribers still change Opus 4.8?"
    a: |
      The changelog says Claude Opus 4.8 stays available to individual subscribers on annual plans so they keep an Opus model. That exception does not cover Claude Opus 5 or GPT-5.6 Terra. An ID pinned in a repo or in CI is used by teammates and automation. The annual exception does not cover those calls.
---

Copilot, Codex, and the OpenAI deprecations page were opened on **2026-10-17** and were not reopened. The DeepSeek alias note was added on **2026-10-18** after reopening the [pricing page](https://api-docs.deepseek.com/quick_start/pricing) and the [changelog](https://api-docs.deepseek.com/updates). The Ark rows were added on **2026-10-22** after opening the [feature release](https://ark.volcengine.com/region:cn-beijing/docs/coding-plan-personal-feature-release) and the [model deprecation](https://ark.volcengine.com/region:cn-beijing/docs/coding-plan-personal-model-deprecation) pages. If a page does not say it, this guide says unknown.

Copilot prices are not repeated here. See [Copilot AI Credits billing](/en/guides/copilot-ai-credits-billing/). DeepSeek prices and IDs are in [DeepSeek API model IDs](/en/guides/deepseek-v4-api-platforms/).

## Bottom line

Keep the lists separate.

1. **GitHub Copilot** retires Claude Opus 4.8, Claude Opus 5, and GPT-5.6 Terra on **2026-11-16**. The suggested replacements are Claude Opus 5.5, and GPT-6.1 Sol or GPT-6 Luna. Individual annual subscribers keep Claude Opus 4.8. The post uses display names. It does not publish a model ID you can search for.
2. **Codex** already removed GPT-5.5 on **2026-10-14 at noon PDT (19:00 UTC)** for users signed in with ChatGPT. The OpenAI API and API-key sessions are not affected. The note says to use `gpt-6.1-sol` when your plan and client still offer it. CLI **0.161.0** (published 2026-10-07) made GPT-6.1 Sol the default in the bundled catalog and the Amazon Bedrock catalogs. A line you wrote yourself, `model = "gpt-5.5"` in `config.toml`, wins over that default. Upgrading the CLI does not rewrite it.
3. The **OpenAI API** [deprecations page](https://platform.openai.com/docs/deprecations) loaded on that date. Cloudflare did not block it. It schedules **2027-01-14** shutdowns for specific GPT-4o and GPT-4.1 **snapshots**. A nearer batch is **2026-10-23**. Undated aliases `gpt-4o` and `gpt-4.1` do not have their own rows. Whether they shut down the same day is **unknown**.
4. **DeepSeek**: `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` are now compatibility aliases. The pricing page says those models are retired and that requests are served by DeepSeek-V4.1-Flash-1017 at the Flash price. New code should send `deepseek-flash`. `deepseek-chat` and `deepseek-reasoner` were scheduled to stop on 2026-07-24 and are not on the current pricing page. Whether they still respond is **unknown**.
5. **Volcengine Ark Coding Plan**: `minimax-m3` shuts down at **2026-11-02 14:00:00 (UTC+8)**. The page suggests `doubao-seed-evolving` or `kimi-k3`. `kimi-k2.7-code` shuts down at **2026-10-28 14:00:00 (UTC+8)**. The page suggests `kimi-k3`. On the same page, `minimax-latest` and `kimi-latest` still point at those old IDs.

Copilot is not the main door for every team. If you use Codex, or you send a model ID from your own service, the second and third items are the ones to search for. If the repo still says `deepseek-v4-flash` or `deepseek-v4-flash-vision-exp`, item 4 is the one to change to `deepseek-flash`, unless you mean to keep the compatibility alias. If an Ark config still has an ID from item 5, use that section. This guide does not say anything about network access.

## What the pages actually say

### Copilot: 2026-11-16

Source: [Upcoming deprecation of selected GitHub Copilot models in mid-November](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/) (dated October 15, 2026).

| Model in the post | Deprecation date | Suggested alternative |
| --- | --- | --- |
| Claude Opus 4.8 | 2026-11-16 | Claude Opus 5.5 |
| Claude Opus 5 | 2026-11-16 | Claude Opus 5.5 |
| GPT-5.6 Terra | 2026-11-16 | GPT-6.1 Sol or GPT-6 Luna |

The scope is all GitHub Copilot experiences. The post names Copilot Chat, inline edits, ask mode, agent mode, and code completions.

One exception: Claude Opus 4.8 remains available to **individual subscribers on annual plans** so they keep an Opus model. Claude Opus 5 and GPT-5.6 Terra do not get that sentence.

For Copilot Enterprise and Copilot Business, under default model enablement, the suggested alternatives are turned on automatically unless an admin has turned off the global default or explicitly disabled the model. After deprecation, the post says you do not have to remove the old models from policy yourself. Workflows that still select them need to move before that date.

The string IDs these three use inside Copilot clients are not on the changelog page. **Unknown.** Do not treat Anthropic's `claude-opus-4-8` as a Copilot ID.

### Codex: GPT-5.5 is already gone

Source: [ChatGPT Learn changelog](https://learn.chatgpt.com/docs/changelog), entry "GPT-5.5 retirement in Codex", dated 2026-10-14.

It took effect at noon PDT on 2026-10-14, which is 19:00 UTC. The retirement applies to **Codex for users signed in with ChatGPT**. The OpenAI API, and **Codex sessions authenticated with an API key**, are not affected.

The same entry says to use GPT-6.1 Sol, ID `gpt-6.1-sol`, when your plan and client offer it. Update workspace defaults, saved model settings, managed configurations, custom agents, scheduled tasks, and scripts that still select `gpt-5.5`. That entry does not give file paths for the last three. Those paths are **unknown**. Search for the literal string instead.

An earlier entry on the same page, "GPT-5.5 retires from ChatGPT, ChatGPT Work, and Codex on October 14", says all plans, including consumer, Business, Enterprise, and Edu, and says the OpenAI API is not included. Use the 2026-10-14 "effective" paragraph when they differ: it pulls API-key sessions out of the retirement.

The CLI default is a separate line. Both the [0.161.0 changelog entry](https://learn.chatgpt.com/docs/changelog) and the [GitHub release rust-v0.161.0](https://github.com/openai/codex/releases/tag/rust-v0.161.0) say GPT-6.1 Sol is now the default model in the bundled and Amazon Bedrock catalogs. The release was published at 2026-10-07T15:58:45Z. That is a catalog default, not a migration of your config file.

### API: the deprecations page loaded

Source: [Deprecations](https://platform.openai.com/docs/deprecations), markdown opened on 2026-10-17.

The page says you can call `GET /v1/models` and read each model's optional `shutdown_date`. A date is `YYYY-MM-DD`. If none has been announced, the field is `null`. Retrieve a model exposes it too. That is more reliable than searching blog posts for the word "deprecation".

Rows that show up most often in coding repos are below. Speech, image, and Evals have more rows. Use the source page for those. This guide does not copy the whole page.

**2026-10-23** (sooner than Copilot's November 16 date):

| Shutdown | IDs in that cell | Replacement |
| --- | --- | --- |
| 2026-10-23 | `gpt-3.5-turbo-0125`, `gpt-3.5-turbo`, `gpt-3.5-turbo-completions` | `gpt-5.6-terra` |
| 2026-10-23 | `gpt-4-0613`, `gpt-4`, `gpt-4-0613-completions`, `gpt-4-completions` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4-1106-preview` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4-turbo-completions` | `gpt-5.6-sol` |
| 2026-10-23 | `gpt-4.1-nano`, `gpt-4.1-nano-2025-04-14` | `gpt-5.6-luna` |
| 2026-10-23 | `gpt-4o-2024-05-13` | `gpt-5.6-sol` |
| 2026-10-23 | `o1-2024-12-17`, `o1` | `gpt-5.6-sol` |
| 2026-10-23 | `o1-pro-2025-03-19`, `o1-pro` | `gpt-5.6-sol` (`reasoning.mode: pro`) |
| 2026-10-23 | `o3-mini-2025-01-31`, `o3-mini` | `gpt-5.6-sol` |
| 2026-10-23 | `ft-o4-mini-2025-04-16` | `gpt-5.6-terra` |
| 2026-10-23 | `o4-mini-2025-04-16`, `o4-mini` | `gpt-5.6-terra` |

The same day also shuts down fine-tunes `ft-gpt-3.5-turbo`, `ft-gpt-4`, `ft-gpt-4.1-nano-2025-04-14`, and `ft-babbage-002`, plus the image model `gpt-image-1`. The page's replacement for `gpt-image-1` is `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare`.

**2026-12-11:** the replacement for `gpt-5-2025-08-07` and `o3-2025-04-16` is `gpt-5.6-sol`. The replacement for `o3-pro-2025-06-10` and `gpt-5-pro-2025-10-06` is also `gpt-5.6-sol`, with `reasoning.mode: pro`. The replacement for `gpt-5-mini-2025-08-07` is `gpt-5.6-terra`. The replacement for `gpt-5-nano-2025-08-07` is `gpt-5.6-luna`.

**2027-01-14** (announced 2026-10-14):

| Shutdown | Wording on the page | Replacement |
| --- | --- | --- |
| 2027-01-14 | GPT-4o (`gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`) | `gpt-6-luna` |
| 2027-01-14 | GPT-4o mini (`gpt-4o-mini-2024-07-18`) | `gpt-6-luna` |
| 2027-01-14 | GPT-4.1 (`gpt-4.1-2025-04-14`) | `gpt-6-luna` |
| 2027-01-14 | GPT-4.1 mini (`gpt-4.1-mini-2025-04-14`) | `gpt-6-luna` |

Fine-tuned versions of these models follow the same shutdown date as the base model.

**2027-04-01:** the replacement for `gpt-5.3-codex` and `gpt-5.1` is `gpt-6-sol`. The replacement for `gpt-5.4-nano` is `gpt-6-luna`.

Two easy mix-ups:

- The shutdown table does **not** list undated `gpt-4o` or `gpt-4.1` as their own rows. The [Responses create](https://platform.openai.com/docs/api-reference/responses/create) enum, opened the same day, still includes those aliases and `gpt-5.5`. An ID still listed in the enum only means the reference page has not removed it. It does not mean the ID stays up. When the aliases shut down: **unknown**.
- The API page lists `gpt-5.6-terra` as a replacement for some older snapshots. The Copilot post lists GPT-5.6 Terra as retiring on 2026-11-16. Those are different products. Follow the API page for API calls. Follow the Copilot post for Copilot.

### Volcengine Ark Coding Plan: two shutdowns that have not arrived

Source: [model deprecation](https://ark.volcengine.com/region:cn-beijing/docs/coding-plan-personal-model-deprecation), opened 2026-10-22. The feature-release page opened the same day matches the start dates: `minimax-m3` on 10.19, `kimi-k2.7-code` on 10.13.

| Model | Shutdown | Suggested move |
| --- | --- | --- |
| `minimax-m3` | 2026-11-02 14:00:00 (UTC+8) | `doubao-seed-evolving` or `kimi-k3` |
| `kimi-k2.7-code` | 2026-10-28 14:00:00 (UTC+8) | `kimi-k3` |

Both rows stop new users at 10:00:00 (UTC+8) on the start day. A new user is someone who bought Coding Plan and has not used that model.

The same page's "method one" table still says `minimax-latest` → `minimax-m3` and `kimi-latest` → `kimi-k2.7-code`. That is not the same sentence as the migration advice. Search the latest aliases too.

```bash
rg -n -e 'minimax-m3' -e 'kimi-k2\.7-code' -e 'minimax-latest' -e 'kimi-latest' .
```

The console was not opened. Whether the dropdown still lists them is unknown. The longer note is in the [Ark Coding Plan guide](/en/guides/ark-coding-plan-guide/).

## Search the repo

The commands use [ripgrep](https://github.com/BurntSushi/ripgrep) (`rg`). Run them from the repository root.

Default `rg` **skips gitignored files**. That hides `.env`, `.env.local`, `.claude/settings.local.json`, and `.github/copilot/settings.local.json` often enough to matter. Search twice: once with defaults, once with `--no-ignore`, and exclude dependency directories with `--glob`.

Literals have their own trap. `Claude Opus 5` also matches the replacement `Claude Opus 5.5`. `claude-opus-5` also matches `claude-opus-5-5`. Default `rg` has no lookahead, so the patterns below say "5 is not followed by `.`, `-`, or a digit". That runs without `--pcre2`.

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

Then the gitignored config files:

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

Machine-local config is outside the repo. Skip files that are not there:

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

Project overrides, paths relative to the repo:

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

CI is usually under `.github/workflows/`. The first repo search already covers YAML. This one is only scripts and the example env file:

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

What a clean search still misses:

- An ID built at runtime. A string prefix `gpt-4o-` plus a date variable never appears as the final ID. Search for the prefix `gpt-4o-` as a second pass.
- `model` set from an environment variable keeps the ID in the deploy platform, not in git. Check CI variables, host environments, and the secret store. There is no single official variable name. This guide does not guess one.
- Chat history, a model picked in an IDE window, and a default set in a cloud console are not in these files.
- Pointing `rg` at all of `~/.cursor` also searches caches and old sessions. A hit there is not a startup config. The loop above only opens `cli-config.json`.

Bare `gpt-4o` also matches `gpt-4o-2024-08-06` and `gpt-4o-mini`. To look for the alias only:

```bash
rg -n -e '(^|[^A-Za-z0-9-])gpt-4o([^A-Za-z0-9-]|$)' -e 'gpt-4\.1([^0-9-]|$)' .
```

Hits from that command still have an **unknown** shutdown date. Match them against the snapshot table first. Do not rewrite an alias unless you know the request really sends the undated string.

## Where the model ID is stored

"Verified" means an official doc opened on 2026-10-17 names that location. Otherwise the cell says not verified.

| Tool | Location | Status |
| --- | --- | --- |
| Copilot Chat | Model dropdown in VS Code, Visual Studio, JetBrains, Eclipse, and Xcode. In VS Code it is the CURRENT-MODEL menu at the bottom of the chat view. Changing the chat model does not change inline suggestions. Copilot Extensions may override the model you pick | Verified: [Changing the AI model for GitHub Copilot Chat](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model) |
| Copilot CLI, user | `model` in `~/.copilot/settings.json`. `"auto"` lets Copilot choose. `/model` and `copilot config` write it. `COPILOT_HOME` moves the directory | Verified: [CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) |
| Copilot CLI, repo | `model` in `.github/copilot/settings.json`, only in a trusted working directory. Personal override: `.github/copilot/settings.local.json` (keep it gitignored) | Verified, same page |
| Copilot CLI subagents | `subagents.agents.<name>.model` in `settings.json` | Verified, same page |
| Copilot CLI allowlist | `.github/allowed_models.txt`. One ID or glob per line. `fallback:` names the model used when the requested one is not allowed. This is an allowlist, not the default model | Verified, same page. The documented example uses `gpt-6-astra` and `claude-sonnet-*`, not the three models in the November retirement |
| Copilot enterprise managed settings | In the enterprise `.github-private` repo: `copilot/managed-settings.json` and `copilot/teams/*.json`. The key is top-level `model`. Older `permissions.model` is still read when the top-level key is absent | Verified: [Getting started](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started), [Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) |
| Copilot managed file on the machine | macOS `/Library/Application Support/GitHubCopilot/managed-settings.json`; Windows `%ProgramFiles%\GitHubCopilot\managed-settings.json`; Linux `/etc/github-copilot/managed-settings.json` | Verified: [Choosing how to deploy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) |
| Copilot org policy UI | Enable or disable models in the organization or enterprise settings. Not in your app repo, so rg will not see it | Verified that the UI exists: [Configuring access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models). Follow that page for which control to click |
| Copilot key name inside VS Code `settings.json` | The Copilot docs opened for this check do not name a `github.copilot.chat.*` key | Not verified |
| Codex CLI / IDE | `model = "..."`. User file `~/.codex/config.toml`, project `.codex/config.toml` (the project must be trusted), profile `~/.codex/<name>.config.toml`, Unix system file `/etc/codex/config.toml`. Precedence: CLI `--model` / `--config`, then project config, then profile, then user config, then cloud-delivered defaults, then system config, then built-in defaults | Verified: [Config basics](https://developers.openai.com/codex/config-file/config-basic). The example on that page that day was `model = "gpt-6.1-sol"` |
| Codex one-off override | `codex --model <id>`, or `codex --config model='"<id>"'` (the value is a TOML string) | Verified: [Advanced Config](https://developers.openai.com/codex/config-advanced) |
| Codex, see the active model | `/model` switches. `/status` shows the active model | Verified: [CLI reference](https://developers.openai.com/codex/cli/reference). The examples on that page still say `gpt-5.4-mini` and `gpt-5.5`. Those are sample names, not the post-October-14 availability list |
| Codex custom agents and scheduled tasks, file path | Named in the retirement note, no path given | Not verified |
| Claude Code | `model` field. Highest precedence first: `/model` during the session, `claude --model` at startup, `ANTHROPIC_MODEL`, the `model` field in a settings file, then `ANTHROPIC_DEFAULT_MODEL` for new sessions. Pressing Enter in `/model` writes the choice into user settings | Verified: [Model configuration](https://code.claude.com/docs/en/model-config) |
| Claude Code settings files | User `~/.claude/settings.json`; project `.claude/settings.json`; local project `.claude/settings.local.json`; organization `managed-settings.json` (also MDM and server-managed settings from claude.ai) | Verified: [Settings](https://code.claude.com/docs/en/settings) |
| Claude Code aliases | `opus`, `sonnet`, and `haiku` move as versions change. To pin a version, use a full ID such as `claude-opus-5-5` from that page, or a variable such as `ANTHROPIC_DEFAULT_OPUS_MODEL` | Verified, model configuration page |
| Claude Code subagents | A `model` key in subagent frontmatter is included in the retirement check. Which directory holds that file | The field is verified. The directory is not |
| Cursor editor | Model picker at the top of the chat input. Default model: Cursor Settings > Models | Verified: [Prompting agents](https://cursor.com/docs/agent/prompting). Which file stores that IDE choice: not verified |
| Cursor CLI | `--model <id>`. Persisted in the `model` field of `~/.cursor/cli-config.json` (Windows: `%USERPROFILE%\.cursor\cli-config.json`). The field type is object. Project file `.cursor/cli.json` is documented as permissions only. `/model` selects inside a session | Verified: [CLI configuration](https://cursor.com/docs/cli/reference/configuration), [parameters](https://cursor.com/docs/cli/reference/parameters). Keys inside the `model` object: not verified. The page has no sample JSON for it |
| Cursor Cloud Agents | Dashboard setting Default model, used when a run does not specify one | Verified: [Cloud Agents settings](https://cursor.com/docs/cloud-agent/settings) |
| OpenAI API | Request body field `model` on Responses. The enum that day still included `gpt-5.5`, `gpt-4o`, `gpt-4.1`, and dated snapshots | Verified: [Create a response](https://platform.openai.com/docs/api-reference/responses/create) |
| OpenAI Chat Completions reference | Requesting that page on 2026-10-17 returned 403 | Not verified |
| Anthropic Messages API | Request field `model`. The enum that day included `claude-opus-4-8`, `claude-opus-5`, and `claude-opus-5-5` | Verified: [Messages](https://docs.anthropic.com/en/api/messages). That spelling is the Anthropic API, not an ID from the Copilot post |

Official SDKs put that `model` field on the request. Search for the assignment. Do not search for only one client method name. Chat Completions method names were not checked.

One concrete case. After Codex 0.161.0, the built-in default is GPT-6.1 Sol. If `~/.codex/config.toml` still has:

```toml
model = "gpt-5.5"
```

a ChatGPT-signed-in session still asks for the retired ID. Delete the line to fall through to the new catalog default, or set an ID your plan still offers. The config page's example that day was `gpt-6.1-sol`. The retirement note says "when available". Do not assume every plan can select it.

## Check after you change it

Split the check by product. A "write a short bio" prompt is not the regression.

1. Run the `rg` commands again. Old IDs should be gone from config and scripts. Strings left in articles, changelogs, or lockfiles need a look at the path before you delete them.
2. **Codex (ChatGPT sign-in):** start it and run `/status`. The active model should be the one you just wrote. Then run a small task you already trust, such as "run the existing unit tests, do not edit code". If `/model` still lists GPT-5.5, trust the screen and write down the client version. This guide was not checked by opening a model picker in the app.
3. **API:** send one request to the endpoint you actually use, with the replacement ID from the deprecations page, such as `gpt-6-luna` or `gpt-6-sol`. On failure, read the model name in the error body. This guide did not verify the current error code string. Do not memorize an `error.code`. Then run the test or CI job that owns that call. The check is whether the test still passes, not whether two paragraphs match.
4. **Copilot:** before November 16 the removal has not happened. What you can check is that workflows and managed settings already name the posted replacements, and that Enterprise or Business has not disabled those replacements. After November 16, open the chat model menu and see whether the old display names are still there. An individual annual subscriber who still sees Claude Opus 4.8 matches the post. That is not a missed edit.
5. **Cursor Cloud Agents and Copilot org policy** live in a web console. After the change, start one run that does not pin a model and read the model name on the task. rg does not cover that.

If `GET /v1/models` already shows a `shutdown_date` for the model you care about, put that date on your own calendar. Do not wait for the request to fail on the shutdown day.
