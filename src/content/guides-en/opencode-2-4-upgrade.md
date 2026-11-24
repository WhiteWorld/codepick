---
title: "After upgrading to OpenCode 2.4, why did GitHub Copilot stop reading GITHUB_TOKEN?"
description: "Checked on 2026-11-24. Based on the OpenCode 2.4.0 and 2.4.1 changelog, Providers, SDK, and related official pages opened that day: why GitHub Copilot no longer reads GITHUB_TOKEN after the upgrade, and other changes that can break a setup. This article did not install or sign in to OpenCode, and did not run Copilot, automations, or the built-in browser."
date: "2026-11-24"
article_type: howto
tags: [opencode, upgrade, github-copilot]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Copilot stopped working after the upgrade. Can I just set GITHUB_TOKEN again?"
    a: |
      No. The 2.4.0 changelog, opened on 2026-11-24, says GitHub Copilot no longer reads GITHUB_TOKEN. Set COPILOT_GITHUB_TOKEN, or sign in with OAuth. The Providers page only documents the device OAuth flow and does not mention that environment variable. This article did not test either method, so it does not treat the changelog as a guarantee that COPILOT_GITHUB_TOKEN works in every setup, and it does not treat the Providers page as a ban on that variable.
  - q: "Will my plugins update themselves?"
    a: |
      It depends how the plugin source is written. If it is name@latest, a version range (for example name@^1.2.0), a Git branch, or a Git semver: range, OpenCode checks on startup and every 24 hours, installs a newer matching version, and reloads it. A bare name, another tag such as @next, or a Git tag does not update itself; the Plugins page says plugin check still reports their updates and plugin update can still install them. Exact versions and commit hashes are marked pinned on the Plugins page, which also says local plugins and exact package revisions are skipped by plugin check / plugin update. The 2.4.0 changelog groups those with a bare name and says opencode plugin update can still update them by hand. The two pages do not fully agree, and this article did not run a plugin update, so it does not decide the conflict.
  - q: "I do not want automations. How do I turn them off?"
    a: |
      The 2.4.0 changelog says to set "automations": false in your config. Manage them with /automation. On the check date, addresses such as https://opencode.ai/docs/automations/ returned 404; no separate automations docs page was found. This article did not create or turn off automations.
  - q: "Is Desktop's built-in browser the same thing as Browse?"
    a: |
      The official pages describe them separately and do not say they are the same product. The built-in browser in the 2.4.0 changelog belongs to Desktop and uses one persistent desktop profile. The Browse page describes an MCP server plus a Chromium extension that drives the browser you already use. After you import sign-ins, the agent can read and drive signed-in pages in that persistent profile. That is documented behavior, not a result we measured. On Desktop, Clear browsing data now asks first.
---

> Checked on 2026-11-24 (Beijing time). This article is based on the official [v2.4.0 changelog](https://opencode.ai/changelog/v2.4.0), the [changelog index](https://opencode.ai/changelog), the [v2.4.1 changelog](https://opencode.ai/changelog/v2.4.1), [Providers](https://opencode.ai/docs/providers/), the [SDK](https://opencode.ai/sdk), [Config](https://opencode.ai/docs/config/), [Desktop](https://opencode.ai/desktop), [Browse](https://opencode.ai/product/browse), [Permissions](https://opencode.ai/docs/permissions/), [MCP servers](https://opencode.ai/docs/mcp-servers/), and [Plugins](https://opencode.ai/docs/plugins/), all opened that day. This article did not install or start OpenCode, did not sign in to any account, did not run GitHub Copilot, automations, the built-in browser, plugin auto-update, or `opencode service set password`, did not call a paid API, and did not run a runtime security test. Commands, variable names, and limits are taken only from the official pages opened that day. This article does not invent config keys those pages do not show.

After you upgrade to OpenCode 2.4, GitHub Copilot may stop working if you have been using the `GITHUB_TOKEN` environment variable. That is not accidental: the 2.4.0 changelog says GitHub Copilot no longer reads `GITHUB_TOKEN`.

This article is an upgrade checklist, not a feature tour, and it does not copy the changelog item by item. It starts with the Copilot token, then covers other changes that can break an existing setup or change the security boundary. For the tool's models and plans, see the [OpenCode tool page](/en/tool/opencode/). For permission rule order and how saved approvals interact, see the existing guide [Why are your OpenCode 2 permission rules not taking effect?](/en/guides/opencode-2-permission-rules/). This article does not repeat that one.

v2.4.0 is dated 2026-11-23. v2.4.1 is from the same day. On the check date, the [changelog index](https://opencode.ai/changelog) listed 2.4.1 as the newer release. Except where this article calls out a 2.4.1-only fix (for example, saving sessions on macOS 12), the 2.4.0 notes below do not require you to be on 2.4.1 first.

## Start with the GitHub Copilot token

The [v2.4.0 changelog](https://opencode.ai/changelog/v2.4.0) says: "GitHub Copilot no longer reads `GITHUB_TOKEN`. Set `COPILOT_GITHUB_TOKEN` or sign in with OAuth." A fix note on the same page adds that `GITHUB_TOKEN` is often set by git tooling and GitHub Actions without Copilot access. It now reads `COPILOT_GITHUB_TOKEN`.

The [Providers](https://opencode.ai/docs/providers/) page, opened the same day, documents device OAuth for Copilot rather than manual API-key entry. The flow is: run `/connect`, select GitHub Copilot, choose Login with GitHub Copilot, then open `/models`. For GitHub Enterprise, enter the deployment URL or domain when prompted. In the troubleshooting table, "Copilot has no models" means you should confirm the active OAuth account has Copilot Chat access. A failed model sync is logged as `failed to sync GitHub Copilot models`.

These two pages conflict, and this article does not decide the conflict:

- The changelog lists `COPILOT_GITHUB_TOKEN` and OAuth sign-in side by side.
- The Providers page documents device OAuth in detail and **does not mention** `COPILOT_GITHUB_TOKEN`.

Do not treat the changelog as a guarantee that `COPILOT_GITHUB_TOKEN` works in every setup. Do not treat the Providers page as a ban on that variable. The Providers page does not reject the variable; it simply does not mention it. This article did not test either method.

If Copilot has no models after the upgrade, start with the Providers troubleshooting: confirm the signed-in account has Copilot Chat access, and look for the model-sync failure log above. Do not assume the only problem is the token name, and do not assume you must reinstall.

## Plugins that follow a version now update themselves

This is also a 2.4.0 upgrade note. The [Plugins](https://opencode.ai/docs/plugins/) page is more detailed. The two pages agree on which sources update themselves. They do not fully agree on whether exact versions and commit hashes can be handled by `plugin check` / `plugin update`, and this article does not decide that conflict.

If a plugin is written as `name@latest`, a version range (the changelog example is `name@^1.2.0`; the Plugins page also lists `name@~1.2.0`, `name@1.x`, and `name@>=1.2.0 <2`), a Git branch, or a Git `semver:` range, OpenCode checks it on startup and every 24 hours, installs a newer match, and reloads it. Ranges never leave their range. If a new version fails to load, the previous one keeps running and stays installed.

The 2.4.0 changelog groups a bare name, an exact version, another tag such as `@next`, a Git tag, or a commit hash, and says they do **not** update themselves; it also says `opencode plugin update` can still update those by hand.

The Plugins page splits them. A bare name (`name`), a repository such as `github:acme/plugin`, another tag such as `name@next`, or a Git tag does not update itself, but `plugin check` still reports their updates and `plugin update` can still install them. Exact versions and commit hashes are marked pinned. The same page also says local plugins and exact package revisions are skipped by `plugin check` / `plugin update`.

Look at your plugin list before you upgrade. If a source uses `@latest`, a range, or a branch, it may move to a newer version without a separate action from you. That is documented behavior, not advice to pin every plugin, and not a judgment about any plugin's safety. This article did not run `plugin check` or `plugin update`.

## After the image tool rename, "always allow" is asked again

`experimental_image_generate` is now `generate_image`. The 2.4.0 changelog says permission rules with the old name are mapped automatically, but saved "always allow" approvals are not, so it asks again once.

That only means it asks again once, not that every rule stops working. For rule order, subagents, and how saved approvals interact, stay with [Why are your OpenCode 2 permission rules not taking effect?](/en/guides/opencode-2-permission-rules/) and [Permissions](https://opencode.ai/docs/permissions/). This article did not verify that re-prompt in a running OpenCode session.

## New automations: decide whether you want them

The 2.4.0 changelog presents automations as a new capability: the agent can run a prompt, a script, or a shell command on a timer, on a cron schedule, or when an MCP server sends an event. Manage them with `/automation`. A longer note on the same page says a shell action asks for approval once, when it is created, and records each run's exit code and output.

That changes the security boundary: after one approval, the command can keep running on a schedule. If you do not want this, the changelog says to turn it off in your config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "automations": false
}
```

This field comes from the changelog, not from a sample on the [Config](https://opencode.ai/docs/config/) page. On the check date, the Config page had no automations section, and `https://opencode.ai/docs/automations/`, `https://opencode.ai/docs/automation/`, and `https://opencode.ai/docs/schedules/` all returned 404. No separate automations docs page was found. This article did not create, approve, or turn off automations, and did not verify how this field merges across every config source.

Separately, the [SDK](https://opencode.ai/sdk) page, in its **v2.3.1** notes (2026-11-18), says experimental schedules are now automations, behind the `automations` flag (the old `schedules` flag still works). Active or paused plain prompt schedules carry over; schedules with a condition or run limit, and finished ones, are dropped. That note is **not** on the v2.4.0 changelog page. If you are jumping to 2.4 from a version before 2.3.1, this migration may already have applied in 2.3.1. This article did not inspect which older schedules a given install still has.

## The built-in browser keeps imported sign-ins

The lead item in the 2.4.0 changelog is Desktop's built-in browser: you can import sign-ins and browsing history from Chrome, Edge, Firefox, or Safari, and add extensions from Chromium browsers or the Chrome and Edge stores. Everything stays in **one persistent desktop profile**: chat links open signed in, tabs survive restarts, and the agent can read and drive the same pages without you switching apps.

That is documented behavior, not a scare piece. Importing sign-ins means the agent can read and drive signed-in pages in that persistent profile. The official pages do not add a separate mitigation list, and this article does not invent one. The same 2.4.0 notes also say Clear browsing data on Desktop now asks first, instead of clearing everything on the first click.

Do not treat the built-in browser and [Browse](https://opencode.ai/product/browse) as the same product. The [Desktop](https://opencode.ai/desktop) page mentions the built-in browser and, separately, links Browse: "Let your agent use your real browser, with your logins and tabs." The Browse page describes itself as an MCP server plus a Chromium extension that lets agents use the browser you already run (it lists Chrome, Edge, Brave, Arc, and others). The two pages do not say they are the same thing. This article did not open the Desktop built-in browser, and did not install or use Browse.

## MCP protocol probing: the two official pages disagree

The 2.4.0 changelog says MCP servers are tried on the newest protocol first. A server without a `protocol` setting is probed before falling back to the legacy handshake. Set `protocol: "legacy"` on a server that misbehaves.

The [MCP servers](https://opencode.ai/docs/mcp-servers/) page, opened the same day, says something different. Its field table lists `protocol` as `legacy` (default), `auto`, or `2026-07-28`. The body says OpenCode opens every server with the classic `initialize` handshake by default, and you set `protocol` to talk to a server built on the 2026-07-28 revision. In the table, `legacy` is the default and sends `initialize`; `auto` is what probes, then falls back to `legacy` when the server does not support the newer revision. There is one documented exception: with `pool` set, an unset `protocol` means `auto`.

Both pages need to be named:

- Do not treat the 2.4.0 changelog as an unconditional statement that every server without `protocol` is now probed first.
- Do not treat the MCP documentation default as proof that the 2.4.0 upgrade note is wrong.
- The changelog's suggested response, if a server misbehaves after the upgrade, is to set `protocol: "legacy"` on that server. The MCP documentation confirms that field and value exist. It does not settle the default-behavior conflict.

This article did not connect to or probe any MCP server.

## If you used `opencode service set password`, check logs and consider rotating it

One 2.4.0 fix is that `opencode service set password` had been writing the password to the CLI log. If you used that command on an older version, the fix is one reason to upgrade. Checking the related logs, and considering rotating that password, are this article's recommendations, not steps given in the official changelog.

This article did not inspect anyone's logs, and it does not claim that every older install leaked a password. It only records that the changelog describes this write-to-log problem, and that it has been fixed.

## Other changes you may hit during the upgrade

These will not affect everyone, but they can make the upgrade feel different from what you had before. They are restated from the docs. This article did not walk through each one in a live session.

- The new TUI designs are on by default, and the new theme name is `opencode`. To keep the previous colors, pick `opencode-classic` in Theme. This is optional and does not change features.
- Desktop shortcut: `Cmd+Shift+S` (`Ctrl+Shift+S` on Windows and Linux) now archives the open session. If you used that combination for something else, the behavior has changed.
- If you call session tools in Code Mode: `tools.opencode.session_rename` and `session_move` are now `tools.opencode.session.rename` and `.move`. The changelog says direct tool names and permission actions are unchanged.
- If you write TUI plugins: 2.4.0 says `@opencode/plugin` requires `@opentui/core` and `@opentui/solid` 0.9.4 or later. 2.4.1 then says `@opencode/plugin` now supports those packages from version 0.8.0, allowing plugins capped below OpenTUI 0.9 to install again. Read both notes. This article does not choose a version for a given plugin.
- If you embed OpenCode with the SDK: 2.4.0 says plugins load in the background again, and the server never waits for them. Right after startup, a model or plugin list can be empty or partial. Long-lived clients should refresh on the matching `*.updated` event; one-shot scripts should wait on their side.
- If you use Desktop voice: the app reads each voice model's engine, which older servers do not report, so voice shows as unavailable against a server from before this release. You need a matching newer server.

Also, if you are on macOS 12 and assistant messages would not save after 2.4.0: the lead 2.4.1 note is that OpenCode can save assistant messages again on the older SQLite version included with macOS 12. That fix is specific to 2.4.1. It does not rewrite every 2.4.0 note as something that requires 2.4.1 first.

### Official sources (checked on 2026-11-24, Beijing time)

- [v2.4.0 changelog](https://opencode.ai/changelog/v2.4.0): the Copilot token change, plugin auto-update, the image-tool rename, automations, the built-in browser, the MCP protocol upgrade note, and the password-in-CLI-log fix.
- The [changelog index](https://opencode.ai/changelog) and the [v2.4.1 changelog](https://opencode.ai/changelog/v2.4.1): the newer same-day release; the macOS 12 session-save fix, and the TUI plugin note about OpenTUI 0.8.0.
- [Providers](https://opencode.ai/docs/providers/): the GitHub Copilot device OAuth flow and the "no models" troubleshooting row. The page did not mention `COPILOT_GITHUB_TOKEN` on the check date.
- [SDK](https://opencode.ai/sdk): the schedules-to-automations migration appears in the v2.3.1 section, not on the v2.4.0 changelog page.
- [Config](https://opencode.ai/docs/config/): where the config file lives. The page had no automations section on the check date.
- [Desktop](https://opencode.ai/desktop) and [Browse](https://opencode.ai/product/browse): the built-in browser and Browse are described separately.
- [Permissions](https://opencode.ai/docs/permissions/): permission rules and saved approvals. Rule-order questions stay with the in-site troubleshooting guide.
- [MCP servers](https://opencode.ai/docs/mcp-servers/): the `protocol` field, its values, and the documented default, which conflict with the 2.4.0 changelog.
- [Plugins](https://opencode.ai/docs/plugins/): which plugin sources update themselves, and which do not.
