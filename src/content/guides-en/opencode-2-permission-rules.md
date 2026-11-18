---
title: "Why are your OpenCode 2 permission rules not taking effect?"
description: "Troubleshoot configuration sources, rule order, subagents and policies with schema-checked V2 examples. Includes external-directory defaults and why policies do not sandbox plugin processes."
date: "2026-11-18"
article_type: howto
tags: [opencode, permissions, security, workflow]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
---

> Review draft. Checked November 18, 2026 (Asia/Shanghai), against that day's V2 documentation and public JSON Schema. We checked structure offline; we did not start OpenCode, call a model or test runtime enforcement.

You asked for confirmation before pushing, but saw no prompt. Your primary agent cannot edit, yet a subagent still can. Before adding duplicate rules, **identify the loaded configurations, the last matching rule, and the agent actually taking the action.**

This is a permission-troubleshooting guide, not an operating-system sandbox tutorial. For models and subscriptions, see the [OpenCode tool page](/en/tool/opencode/).

## Separate three different ordering rules

Do not compress [Config](https://opencode.ai/docs/config/), [Permissions](https://opencode.ai/docs/permissions/) and [Policies](https://opencode.ai/docs/policies/) into “project configuration wins.”

| Question | Documented rule | Common mistake |
| --- | --- | --- |
| Ordinary setting values | User-global and project files merge; system settings rank higher, macOS managed settings highest | Assuming the closest project file always overrides system settings |
| `permissions` | Ordered matching; last match wins, with agent rules appended after shared rules | Assuming specificity wins, or subagents inherit the primary agent's restrictions |
| `policies` | Last match within a file; broader administrative sources outrank narrower sources | Expecting a repository allow to lift a global or organization restriction |

### 1. Find all sources, not just the current directory

For ordinary settings, OpenCode searches from the current directory to the filesystem root. It merges direct `opencode.json(c)` files from farthest to closest, then `.opencode/opencode.json(c)` files in that same order. Discovered `.opencode` configurations therefore override ordinary matching settings in direct files; this is more than “the nearest file wins.” User-global configuration is `~/.config/opencode/opencode.json(c)`; the Linux system directory is `/etc/opencode`.

This does not let projects override system or managed settings. Nor should this ordinary-settings loading order be reused as the policy order.

For `policies`, authority runs highest to lowest: **macOS MDM → system → connected Console workspace → user-global → direct project configurations → `.opencode` configurations**. Within each of the last two categories, outer directories outrank inner ones. Console policy changes apply on the next fetch, usually about a minute later. Disconnecting clears that connection's policies; a temporarily unreachable Console retains its last policies.

Record the actual launch directory, system/global/ancestor configurations and connected Console workspace. Do not publish whole configuration files containing credentials.

### 2. Look for the last match, not the most specific pattern

Native V2 uses `permissions`, `shell` and `subagent`. Do not casually mix those examples with V1's `permission`, `bash` and `task`. The [migration guide](https://opencode.ai/docs/migrate-v1/) says supported V1 configuration is still normalized and loaded: not every old field needs immediate deletion. When both forms set the same canonical value, a valid native V2 value takes precedence.

Each permission rule requires three strings: `action`, `resource` and `effect`. Effects are `allow`, `deny` or `ask`.

- The last matching rule wins, with no specificity ranking. Put broad rules first and exceptions later.
- `*` can match slashes, and `?` matches one character. These are not Git pathspec rules.
- A shell pattern ending in ` *` also matches the command without arguments: `git push *` covers `git push`.
- When an operation checks multiple resources, any deny denies it; otherwise any ask prompts; only all-allow proceeds.
- “Ask if no rule matches” does not mean “ask by default for everything.” Every agent starts with an allow-`*` base rule, followed by ask rules for reading `.env` and `.env.*`, with `.env.example` allowed.

## An explainable starting configuration, not a complete security policy

Place this in the project's `opencode.json`, or merge it into an existing `opencode.jsonc`. Back up first; do not replace unrelated settings:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git status --short", "effect": "allow" },
    { "action": "shell", "resource": "git --no-pager diff --no-ext-diff --no-textconv", "effect": "allow" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ],
  "agents": {
    "reviewer": {
      "description": "Review without edit or shell tools",
      "mode": "subagent",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

The intent is: ask for shell commands generally; allow two exact Git inspection commands without prompting; deny matching `git push` commands; ask for external directories; append edit and shell denials for the `reviewer` subagent.

We deliberately avoid automatically allowing arbitrary `git diff *` arguments. Git's `--output` can write a file, and external diff/textconv can run programs. The exact diff command uses `--no-ext-diff --no-textconv` to narrow the allowance. **It still does not guarantee that host Git configuration or the whole process is read-only.** Other argument forms fall back to asking; do not answer “Allow always” just to save time. See the official [git diff documentation](https://git-scm.com/docs/git-diff).

This is not a guarantee that pushing is impossible. An absolute Git path, wrapper script, another tool or another network route may not match `git push *`. Such commands may fall back to asking; do not approve commands you do not understand. Enforced network or filesystem isolation needs separate operating-system/container controls.

### 3. Check external directories and subagents separately

Paths outside both the active Location and its non-root project worktree are checked against `external_directory` before `read` or `edit`. **External directories are allowed by default**, not prompted by default. The example explicitly adds an ask rule.

For `read`, `edit` and `external_directory`, `~` and `$HOME` prefixes expand at configuration load. Shell resources remain raw command text and do not get that expansion. Shell directory inference is best-effort, not a filesystem boundary.

Agent-specific rules append after shared rules. A custom subagent has its own permissions, not a subset of its parent's. Consequently:

- Denying edits for the primary agent does not automatically give `reviewer` the same denial.
- The example explicitly denies both `edit` and `shell` for `reviewer`, rather than changing only the primary agent.
- This is still not proof that every write path is blocked. Audit MCP tools, plugins and other actions separately; an `edit` rule does not represent every side effect.

## Use policies for enforced restrictions, but never give them ask

This is a separate configuration fragment. For organization-level restrictions, deploy the relevant policy through an appropriate higher-authority source instead of expecting a repository file to constrain everyone:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "policies": [
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" }
  ]
}
```

Its `tool.use` resource is `action:resource`. It is checked after ordinary permissions and saved approvals. A matching denial blocks rather than prompts, with an error such as `Blocked by configuration policy`; Console denials name the workspace.

Policy effects are **only `allow` or `deny`, never `ask`**. An allow lifts an earlier broader policy denial but still leaves the agent's ordinary permission checks in place; it does not grant access directly. With no matching policy, existing checks continue.

Saved “Allow always” approvals are durable project-scoped allows and do not override configured denials. If a restriction appears bypassed, check for a non-match, a later overriding rule, or a different agent/action actually performing the operation.

### 4. Valid JSON does not prove a policy loaded

Policies explicitly documents that **invalid statements are dropped with a server-log warning, while the rest of the list remains active**. After editing a deny, inspect logs rather than merely balancing braces.

On the check date, the Permissions page's Scanner section also contained an example nesting `permissions` inside `policies`. That disagrees with the public schema and the Policies page's three-field statement shape. We do not use that nested shape, and did not verify whether the runtime has a compatibility path. Resolve such conflicts against the version in use, the [public schema](https://opencode.ai/config.json) and server logs; a webpage example is not an execution result.

Check version compatibility before relying on new policy actions:

- Clients older than **2.2.3** ignore `integration.connect`, the new meaning of `integration.use`, `mcp.use`, `skill.use` and `plugin.use`.
- Clients older than **2.2.6** ignore `websearch.use`.
- Old `integration.use` statements with `mcp:`, `skill:` or `plugin:` prefixes convert to the respective new actions. A bare `integration.use: *` now controls integration sources, not all MCP servers, skills and plugins.

To disable those three categories, the currently documented native shape is:

```json
{
  "policies": [
    { "action": "mcp.use", "resource": "*", "effect": "deny" },
    { "action": "skill.use", "resource": "*", "effect": "deny" },
    { "action": "plugin.use", "resource": "*", "effect": "deny" }
  ]
}
```

This is a separate restrictive example that disables every corresponding capability. Do not add it to every project indiscriminately; first decide whether those capabilities are needed.

## These settings do not sandbox plugin processes

The documentation explicitly says policies **do not sandbox plugin code**. Denying a provider blocks the normal provider/model path; it does not remove a plugin's ability to make network requests. Shell also retains the host user's filesystem, process and network authority.

Load only trusted plugins and MCP servers. Inspect configuration and launch commands in unfamiliar repositories; a JSON snippet is not a reason to run untrusted code. We did not test any particular plugin or MCP server.

## An acceptance checklist that does not require a real push

Prepare a fake repository and synthetic files in an isolated directory. Do not test with real `.env`, SSH material or production directories.

| Check | Documented expectation, not an observed result here |
| --- | --- |
| The primary agent's two exact Git commands | Match explicit allows; extra arguments may not match |
| Canonical `git push` and `git push origin main` | Match the example denial; do not initiate a real push as a test |
| An external synthetic directory | Check `external_directory` first and inspect later overrides |
| `reviewer` edit/shell actions | Match its own denials, not just the primary agent's |
| A configured deny after a saved approval | The old approval must not lift a configured denial |
| Invalid policy fields or `ask` | Check schema errors and server warnings, not assumed enforcement |

Our local checks cover the public schema, JSON example consistency and Git arguments in an isolated fake repository. We did not start OpenCode or test actual enforcement, scanner parsing, Console synchronization or plugin isolation. If runtime checks require inference, paid requests or real accounts, obtain that authorization first. Offline checks are not “tested security.”

### Official sources (checked November 18, 2026, Asia/Shanghai)

- [Config](https://opencode.ai/docs/config/): locations, ordinary setting merge order, system and managed settings.
- [Permissions](https://opencode.ai/docs/permissions/): matching, defaults, directories, subagents, saved approvals and host authority.
- [Policies](https://opencode.ai/docs/policies/): administrative precedence, invalid-statement warnings, version gates and plugin limits.
- [Public JSON Schema](https://opencode.ai/config.json): offline field/shape validation, not runtime proof.
- [Migrate from V1](https://opencode.ai/docs/migrate-v1/): legacy compatibility and valid native V2 values taking precedence.
- [git diff](https://git-scm.com/docs/git-diff): `--output`, `--no-ext-diff` and `--no-textconv`.
