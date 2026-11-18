---
title: "Gemini CLI vs Claude Code vs Codex CLI: Check Access and Billing First"
description: "Gemini CLI consumer access has changed, Claude Code is not API-key-only, and Codex CLI is not Plus-only. Compare current access, billing, migration and permissions without relying on obsolete free quotas."
date: "2026-02-17"
updated_at: "2026-11-18"
tags: ["gemini-cli", "claude-code", "codex-cli", "terminal", "cli", "comparison"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

Running in the same terminal does not mean using the same login, allowance or bill. Before choosing an agent, establish which access route your account can use today, then evaluate the workflow.

**Sources checked: 2026-11-18 (Asia/Shanghai).** This is an official-documentation comparison, not a performance benchmark. We did not run the installers, sign in to accounts or test connectivity from mainland China. It does not identify a “best coding model.”

## Check eligibility before comparing old free quotas

| What to check | Gemini CLI | Claude Code | Codex CLI |
| --- | --- | --- | --- |
| Consumer access | Requests through the former free individual, Google AI Pro and Ultra routes stopped on 2026-06-18; review Antigravity CLI migration | Eligible Claude subscriptions, Console or organization-configured cloud providers; an API key is not universally required | Local CLI supports ChatGPT sign-in or API keys; check the plan's specific CLI surface eligibility |
| Billing and allowances | Paid Gemini / Agent Platform API-key access remains; legacy Code Assist subscriptions have separate lifecycle rules | Subscription, Console and third-party provider billing are different routes; subscription allowances are not API balances | API-key sessions have separate API bills, not ChatGPT allowances; subscription access is not unlimited tasks |
| Starting a project | Individuals should assess migration first; organizations should check contracts and renewal rules | Establish login and billing, then configure project instructions, MCP and tool permissions | Establish CLI eligibility and billing, then review permissions, models and the review workflow |

An installable client does not establish permission to call a model. A source license is not free inference either: Codex uses Apache-2.0, while the Claude Code repository's LICENSE points to commercial terms. Do not label all three as free open-source services.

## Gemini CLI: consumer migration, organizational contracts and API keys differ

Google's [2026-05-19 announcement](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli) states that Gemini CLI stopped serving requests for individual free Code Assist, Google AI Pro and Ultra users on **2026-06-18**. Historical individual request allowances are therefore not a current onboarding offer.

The announcement retains paid Gemini and Gemini Enterprise Agent Platform API-key access. It also says Antigravity CLI initially does **not have one-to-one feature parity**. Check project instructions, extensions, MCP, Hooks and automation before migrating; replacing an executable name is not a migration test.

Organizations also need the later [Code Assist sunset and transition guidance](https://docs.cloud.google.com/gemini/docs/codeassist/sunset):

- New Code Assist Standard / Enterprise sales ended on **2026-10-09**. New Gemini Enterprise Standard / Plus subscriptions also no longer include that entitlement.
- Existing Code Assist subscriptions are supported through their contractual term. Annual auto-renewals can continue until **2027-01-31**; monthly auto-renewals until **2027-12-31**. These are renewal boundaries, not one universal shutdown day.
- Existing Gemini Enterprise subscriptions retain their Code Assist entitlement until **2027-03-31**. Additional licenses for existing Code Assist subscriptions can be added until **2027-01-31**.
- Code Assist model support is limited to Gemini 3.x, so the old Gemini 2.5 Pro recommendation is not current guidance for that route.

The official dates do not specify an exact timezone; we do not invent a China-time cutoff. The May announcement's enterprise-access statement does not override the later sales, renewal and entitlement rules.

## Claude Code: subscription sign-in and API billing are different routes

The [authentication documentation](https://code.claude.com/docs/en/authentication) lists Claude Pro / Max / Ultra, team or enterprise accounts, Console and organization-configured cloud providers. Running `claude` can start the official sign-in flow; not every user needs an API key.

Choose the billing route you intend to use. An existing subscription login does not make Console / API requests free, and a paid subscription does not guarantee unlimited or uniformly high usage. Team access also depends on administrator configuration and seat eligibility.

The [official installation overview](https://code.claude.com/docs/en/overview) recommends native installation and also offers Homebrew, WinGet and other methods. Choose the instructions for your system, then check the version and login state. For example, macOS Homebrew users can follow:

```bash
brew install --cask claude-code
claude --version
claude
```

This is a documented installation path, not an installation we tested. Projects can use `CLAUDE.md` for instructions and MCP for tools; neither feature guarantees correct code or replaces permission review.

## Codex CLI: desktop Free access is not a blanket CLI entitlement

The [Codex authentication documentation](https://developers.openai.com/codex/auth/) separates ChatGPT subscription sign-in from usage-based API keys. The local CLI supports both. Plus is not the only possible access route, and API-key features are not identical to subscription or cloud features.

The [current pricing page](https://developers.openai.com/codex/pricing/) mentions Free / Go in its introduction, but the specific entries describe the relevant access as **desktop app, subject to rollout**. The Plus entry explicitly lists the CLI and other surfaces. The page headline alone is not evidence that every Free / Go account can use the CLI.

Usage depends on model, task complexity, context and local versus cloud execution. The old article's fixed five-hour task estimate is not a current contractual allowance; check account usage and current plan terms. API-key requests have a separate API bill, not inclusion in a ChatGPT subscription.

The [official CLI documentation](https://developers.openai.com/codex/cli/) and [repository README](https://github.com/openai/codex) offer native installers, npm and Homebrew. Users who already meet the npm environment requirements can choose the documented path:

```bash
npm install -g @openai/codex
codex
```

After starting, confirm the sign-in method and inspect `/status`, `/model` and `/permissions`. Local execution does not mean model requests stay on the device; authentication also affects the applicable data-handling terms.

## Compare one small task yourself

Do not infer “reads the entire repository at once” from a fixed context-window number or permanently bind a client to one model name. Models, permissions and allowances vary with account, version and organizational configuration.

Use a separate test repository and one bounded task, such as “explain this function and add two boundary-condition tests”:

1. Create a Git checkpoint and exclude real credentials and production data.
2. Record the login route, selected model, permitted directories/commands and actual billing source.
3. Inspect the diff yourself and run the project's existing tests; record failures rather than judging response fluency.
4. Compare completion quality, usage and operating cost without assuming one tool must be strongest or free.

This is a suggested procedure, **not a benchmark we performed**. Mainland China connectivity, account eligibility and payment require separate verification. We make no blanket reachable/unreachable claim and do not recommend resold accounts or unofficial relays to bypass regional rules.

## Choosing a route

- **Former individual Gemini CLI user:** read the migration announcement and check replacement access and feature gaps rather than relying on historical free allowances.
- **Existing Claude subscription or managed organization:** establish CLI login and billing, then evaluate project instructions, MCP and permissions.
- **Eligible ChatGPT subscription or API automation:** check Codex CLI surface eligibility and separate billing; local CLI access does not include every cloud feature.

For tool-specific evidence and limits, see [Gemini CLI](/en/tool/gemini-cli), [Claude Code](/en/tool/claude-code) and [Codex CLI](/en/tool/codex-cli). Read the [Claude Code LICENSE](https://github.com/anthropics/claude-code/blob/main/LICENSE.md) and [Codex LICENSE](https://github.com/openai/codex/blob/main/LICENSE) separately from service entitlements.
