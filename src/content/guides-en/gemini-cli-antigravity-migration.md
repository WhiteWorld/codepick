---
title: "Which Gemini CLI configuration can you take with you to Antigravity?"
description: "Checked on 2026-11-21. A documentary checklist of which Gemini CLI rules, skills, extensions, and MCP configs the official Antigravity migration pages say you can keep, move, or must edit by hand. We did not install Antigravity CLI or Gemini CLI, and we did not run a migration."
date: "2026-11-21"
article_type: howto
tags: [gemini-cli, antigravity, migration]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Do GEMINI.md and AGENTS.md need to be rewritten?"
    a: |
      On the official migration page opened on 2026-11-21, workspace GEMINI.md and AGENTS.md, and global ~/.gemini/GEMINI.md, do not need content changes. The customization-discovery page also names ~/.gemini/AGENTS.md, which the migration page does not list. This article did not check on a live install whether those files are actually read.
  - q: "Why might workspace skills not show up as slash commands?"
    a: |
      The migration page says the workspace path changed from .gemini/skills/ to .agents/skills/. You must rename or move the folder yourself, or the skills will not be recognized as slash commands. Global ~/.gemini/skills/ can still be used, and the page also lists ~/.gemini/antigravity-cli/skills/. The skills documentation adds ~/.gemini/config/skills/. Do not merge those tables into one official map.
  - q: "If I rename url or httpUrl to serverUrl, will the server connect?"
    a: |
      Do not assume that. The migration page says that when you manually migrate remote WebSocket or SSE definitions, change url or httpUrl to serverUrl. The MCP page says something different: remote servers must use Streamable HTTP; set the endpoint in serverUrl (url also works); the legacy HTTP+SSE transport and the httpUrl field are not supported. This article did not test whether renaming the field alone is enough.
  - q: "Is there a one-click rollback? Will the first agy run overwrite my old files?"
    a: |
      The official migration page does not give a one-click rollback command. It also does not say clearly whether first-launch onboarding rewrites the original Gemini files in place, so back them up first. Do not treat “overwrite the file with defaults” when settings.json isn’t valid JSON, or when a key has the wrong type or an unrecognized value, or /rewind for conversation history in the CLI reference, as a migration rollback.
---

> Checked on 2026-11-21 (Beijing time). This article follows the Google pages opened that day: [Migrating from Gemini CLI](https://antigravity.google/docs/cli/gcli-migration/), [MCP](https://antigravity.google/docs/mcp/), [Plugins](https://antigravity.google/docs/plugins/), [Skills](https://antigravity.google/docs/skills/), [Customization discovery](https://antigravity.google/docs/customization-discovery?tab=cli), the 2026-05-19 [Antigravity CLI introduction](https://antigravity.google/blog/introducing-google-antigravity-cli/), and the [transition announcement](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/). We did not install Antigravity CLI or Gemini CLI, did not run `agy` or `agy plugin import gemini`, did not sign in, did not migrate a real profile, and did not test whether an MCP server connects or whether a theme or experimental overlay is actually dropped. Commands, paths, and field names are taken only from the official docs. This article does not invent flags or rollback commands that those pages do not show.

This is a configuration checklist, not a product comparison, and it does not rewrite a pricing table. For personal-access cutover, billing, and sign-in eligibility, see the existing comparison [Gemini CLI vs Claude Code vs Codex CLI](/en/compare/gemini-cli-vs-claude-code-vs-codex-cli/). For the product comparison and pricing check, see [Antigravity vs Cursor](/en/compare/antigravity-vs-cursor/). Tool overviews are at [Gemini CLI](/en/tool/gemini-cli/) and [Antigravity](/en/tool/antigravity/). This article does not change those older pages.

On 2026-11-21 we reopened the 2026-05-19 [transition announcement](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/). It still says that on 2026-06-18, Gemini CLI and the Gemini Code Assist IDE extensions stop serving requests for Google AI Pro and Ultra, and for free Gemini Code Assist for individuals. It also still says there will not be 1:1 feature parity right out of the gate. Enterprise access and paid API keys are covered in the comparison article and are not repeated here. For Code Assist subscription close and renewal dates, see the official [Code Assist sunset page](https://docs.cloud.google.com/gemini/docs/codeassist/sunset); this article does not retell that table.

The introduction blog describes Antigravity CLI as a terminal-UI complement to Antigravity 2.0: they use the same agent harness and can share settings. Conversations are not shared across the two products by default, but 2.0 can pull CLI conversations with the `@conversation` dropdown. The rest of this article is only about CLI configuration. It does not treat the CLI, 2.0, the IDE, and the App as one product.

For installation, use the official [download page](https://antigravity.google/download) and [getting started](https://antigravity.google/docs/getting-started/) guide. This article does not invent a separate install walkthrough.

## Back up first, then consider the first `agy` run

The official migration page does not say clearly whether first-launch onboarding rewrites the original Gemini files in place. Treat that as unknown. Copy a backup first, then start `agy` for the first time.

At minimum, copy the locations named on the migration and plugins pages, plus workspace `.agents/` (which is not under `.gemini/`):

- Global settings: `~/.gemini/settings.json` (the migration page says legacy MCP entries lived in this file)
- Global rules: `~/.gemini/GEMINI.md` (migration page). The customization-discovery page also names `~/.gemini/AGENTS.md`, which the migration page does not list
- Global skills: `~/.gemini/skills/`
- Extensions directory: `~/.gemini/extensions/` (on the [plugins page](https://antigravity.google/docs/plugins/), this is the source for `agy plugin import gemini`)
- Workspace rules: `GEMINI.md` and `AGENTS.md` in the project
- Workspace skills: `.gemini/skills/`
- Workspace `.agents/` (the customization-discovery page puts workspace customizations in this directory, and the skills and hooks pages also name paths under it; it is not inside `.gemini/`. The migration page names `.agents/skills/` inside it)

If you have other files under `~/.gemini/`, the project `.gemini/` directory, or workspace `.agents/`, back those up too. This article did not inventory a live install, so it does not claim this list is complete.

Only after that backup should you look at the two official steps below. They are procedures from the docs, not results we ran:

1. The migration page says that the first time you run `agy` in an environment that still has legacy configuration, the CLI detects those profiles and shows an interactive checklist. You can choose which extensions and global configurations to convert. Active session tokens are migrated into the operating system’s keyring. Restoring backup files is not the same as undoing those keyring-side changes; the official migration page does not give a command to reverse them, and this article does not invent one. Default visual parameters and rendering buffers are mapped onto the new settings profile.
2. To convert extensions to plugins by hand, the official command is `agy plugin import gemini`.

The settings page puts Antigravity CLI’s own preferences at `~/.gemini/antigravity-cli/settings.json` and keybindings at `~/.gemini/antigravity-cli/keybindings.json`. Those paths come from the [settings page](https://antigravity.google/docs/settings?tab=cli), not from the migration page wording. The migration page only says the values are mapped to “your new settings profile” and does not name that file.

## Rules: according to the migration page, leave the files as they are

The [migration page](https://antigravity.google/docs/cli/gcli-migration/) says both CLIs use the same workspace context rules, and that existing rule documents need no modifications.

- Workspace: the agent continues to read and enforce `GEMINI.md` and `AGENTS.md` in the active directory
- Global: the agent automatically reads `~/.gemini/GEMINI.md`

The [customization-discovery page](https://antigravity.google/docs/customization-discovery?tab=cli) also names a personal `~/.gemini/AGENTS.md`, plus rule files under workspace `.agents/`. The migration page does not put those on its “no modifications needed” list. Keep the two pages separate. This article did not test which of those files are actually read.

## Skills: some global paths stay; workspace skills must be moved by hand

The migration page’s path table is:

- Global: Gemini CLI uses `~/.gemini/skills/`; Antigravity CLI uses `~/.gemini/skills/` or `~/.gemini/antigravity-cli/skills/`
- Workspace: the path changes from `.gemini/skills/` to `.agents/skills/`

The same page adds a required action: if your project keeps custom workspace skills in `.gemini/skills/`, you must rename or move the folder to `.agents/skills/`, or the Antigravity agent will not recognize them as slash commands.

The [skills page](https://antigravity.google/docs/skills/) uses a different primary table for the Antigravity CLI:

- Workspace: `<workspace-root>/.agents/skills/`
- Global (shared with the App): `~/.gemini/config/skills/`
- Plugin-provided: `~/.gemini/config/plugins/<plugin-folder>/skills/`

That page then says the CLI also loads skills from `~/.gemini/antigravity-cli/skills/` and `~/.gemini/skills/`, which the App does not read. The customization-discovery page repeats those extra CLI paths. `~/.gemini/config/skills/` appears on the skills page, not in the migration-page table. Do not merge them into one official path list.

The skills page also has a general note: Antigravity defaults to `.agents/skills` and still keeps backward compatibility for `.agent/skills` (singular). That is not a statement about Gemini CLI’s `.gemini/skills/`, and it does not replace the “move it by hand” requirement above.

## How extensions become plugins

The migration page says the industry has standardized on the term plugins, and that you can convert legacy Gemini extensions with:

```bash
agy plugin import gemini
```

The official description is that this utility searches legacy local directories, parses extension manifests, and converts the files into native layout blocks. This article did not run it.

The [plugins page](https://antigravity.google/docs/plugins/) is more specific: `agy plugin import gemini` migrates existing extensions from `~/.gemini/extensions/` (or from a directory you pass in). The same page also lists `agy plugin import` and `agy plugin import claude`. This article only covers Gemini CLI and does not discuss the Claude path. After conversion, the plugins page puts CLI plugins in `~/.gemini/config/plugins/<plugin_name>/`.

The migration page includes this “expected import output” sample:

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

What the sample can show is that, in the docs, import may convert legacy commands into skills, may write an MCP server into `mcp_config.json`, and may skip components that were not detected. It cannot show what will happen to your extensions, and it is not evidence that we verified a successful conversion.

## MCP: keep file locations and field changes on their own pages

The migration page says Antigravity CLI keeps Model Context Protocol servers in standalone JSON files instead of nesting them in the main preferences file.

- Legacy: declared inline in `~/.gemini/settings.json`
- New global file: `~/.gemini/config/mcp_config.json`
- New workspace file: `.agents/mcp_config.json`

For fields, the migration page says: when you manually migrate remote WebSocket or SSE server definitions, change the legacy keys `url` or `httpUrl` to `serverUrl`. The official example, with the same keys and values, is:

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

The [MCP page](https://antigravity.google/docs/mcp/) confirms the same two file locations (the workspace file is written as `<workspace>/.agents/mcp_config.json`) and adds that enabled plugins may also ship servers in `<plugin-root>/mcp_config.json`. In the CLI, you can type `/mcp` in the prompt panel to open the interactive MCP manager. Those are documented entry points, not steps we ran.

The MCP page has a separate statement that does not match the migration page word for word, so it is kept separate here: remote MCP servers must use the Streamable HTTP transport; set the endpoint in `serverUrl` (`url` also works); the legacy HTTP+SSE transport and the `httpUrl` field are not supported.

Do not merge the two pages into one official rule. In particular, do not conclude that renaming an old SSE URL to `serverUrl` is enough for the server to connect. The migration-page example still uses a `/sse` URL, while the MCP page says legacy HTTP+SSE is not supported. This article did not test connectivity after a field rename.

The MCP page also includes App and IDE click paths. Those belong to those surfaces. They are not steps this article performed.

## What is not carried over automatically, or is only partial parity

The migration page describes “Partial parity”: Antigravity CLI preserves support for workspace skills, rules, and MCP servers, but certain customized terminal themes or experimental visual overlays from Gemini CLI might not be supported.

That is a limitation in the docs, not a finding that we confirmed a theme was lost. Default visual parameters being mapped does not mean your custom theme will still work.

The 2026-05-19 announcement also lists Hooks and Subagents among capabilities that are kept. The official migration page does not give a hooks conversion procedure. The [hooks page](https://antigravity.google/docs/hooks/) places CLI hook files at `.agents/hooks.json` and `~/.gemini/config/hooks.json`. Whether old Gemini CLI hook files are taken along automatically is not spelled out on the migration page, so this article leaves that unknown and does not invent a conversion command.

## Acceptance checklist (paths and commands from the docs, not a live test)

Use the following only to compare your backups and moves against the official pages. It is not a checklist we executed successfully.

- Workspace `GEMINI.md` and `AGENTS.md`, and global `~/.gemini/GEMINI.md`, are backed up; the migration page says their contents do not need to be rewritten
- If you have workspace `.gemini/skills/`, it has been moved by hand to `.agents/skills/`
- Global skills may still live at the migration-page paths `~/.gemini/skills/` or `~/.gemini/antigravity-cli/skills/`; if you want the skills-page path shared with the App, also look at `~/.gemini/config/skills/`
- The extensions directory `~/.gemini/extensions/` is backed up; the documented command for a manual conversion is `agy plugin import gemini`
- MCP entries have been moved out of the legacy `~/.gemini/settings.json` form into `~/.gemini/config/mcp_config.json` or `.agents/mcp_config.json`; check remote fields against the migration page and the MCP page separately, and do not stop after renaming a single key
- Custom themes and experimental overlays should be treated, per the migration page, as possibly not equivalent; you will need to check them yourself. This article did not
- The official docs mention `agy`, `agy plugin import gemini`, and `/mcp`. Finding those commands is not the same as a successful migration

## Rollback and how far you can keep the old config

The official migration page does not give a one-click rollback command. On the settings page, “Overwrite the file with defaults” is a recovery action when an Antigravity `settings.json` isn’t valid JSON, or a key has the wrong type or an unrecognized value: after confirmation, the CLI saves a copy as `settings.json.corrupted.<timestamp>` and resets every setting to its default. In the CLI reference, `/rewind` rolls back conversation history. Neither is a way to move configuration back to Gemini CLI.

What you can do is keep a complete backup, then start first-launch onboarding. If the result is not what you wanted, restore the original files from that backup. Do not look for an uninstall or rollback command this article invented. We did not test uninstall, and we did not test rollback.

Whether first-launch onboarding rewrites the original Gemini files in place is not stated clearly in the official docs, so it remains unknown. That is why the backup comes first. Do not turn “the docs say it will convert” into “we have verified that the conversion works.” This article also does not claim a live test of effectiveness, cost, or runtime safety.

## Sources

- [Migrating from Gemini CLI](https://antigravity.google/docs/cli/gcli-migration/)
- [Google Antigravity CLI](https://antigravity.google/blog/introducing-google-antigravity-cli/) (2026-05-19)
- [An important update: Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) (2026-05-19 announcement; rechecked 2026-11-21)
- [Model Context Protocol (MCP)](https://antigravity.google/docs/mcp/)
- [Plugins](https://antigravity.google/docs/plugins/)
- [Agent skills](https://antigravity.google/docs/skills/)
- [Customization discovery](https://antigravity.google/docs/customization-discovery?tab=cli)
- [Settings](https://antigravity.google/docs/settings?tab=cli) (the migration page’s Settings link leads here)
- [Troubleshooting](https://antigravity.google/docs/cli/troubleshooting/)
- [CLI reference](https://antigravity.google/docs/cli/reference/)
- [Get started](https://antigravity.google/docs/getting-started/)
- [Download](https://antigravity.google/download)
- [Hooks](https://antigravity.google/docs/hooks/)
- [Gemini Code Assist Standard and Enterprise subscriptions](https://docs.cloud.google.com/gemini/docs/codeassist/sunset)
- On this site: [Gemini CLI vs Claude Code vs Codex CLI](/en/compare/gemini-cli-vs-claude-code-vs-codex-cli/), [Antigravity vs Cursor](/en/compare/antigravity-vs-cursor/), [Gemini CLI](/en/tool/gemini-cli/), [Antigravity](/en/tool/antigravity/)
