# Claude Code Code Mode — 2026-11-22

Official public sources checked on **2026-11-22 (Asia/Shanghai)**. This is a documentary howto: how to turn Claude Code's experimental Code Mode on or off, who can use it, how auto-mode permission checks change, and which limits to accept first. It is not a product comparison, a performance review, a live install, or a Code Mode session we ran ourselves.

## Scope

- New bilingual guide: `src/content/guides/claude-code-code-mode.md`
- English mirror: `src/content/guides-en/claude-code-code-mode.md`
- Publication date is 2026-11-22. `draft` is `true` pending independent content review by dig.
- Cross-link, and do not rewrite: `claude-code-vs-cursor`, `claude-code-vs-codex`, `ai-coding-agent-security-2026`, and the `claude-code` tool entry.
- No tool YAML, scores, or pricing notes are changed.
- No install, no `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` in a live shell, no `claude` / `claude update` / `claude --continue` / `claude --resume`, no auto mode, hooks, sandbox, agent teams, or paid API calls.

## Evidence

Raw fetches (HTML, response headers, timestamps, and markdown Accept responses) are in `/workspace/codepick-evidence-2026-11-22/`. See `INDEX.md` there for HTTP status and fetch times. Unless noted, pages returned HTTP 200. `https://github.com/anthropics/claude-code/releases/latest` redirected once (302) to `/releases/tag/v2.1.330`, then 200.

| Official source | Fetched | Verified statement used in both articles |
| --- | --- | --- |
| [Code Mode (en)](https://code.claude.com/docs/en/code-mode) | 200, last-modified 2026-11-21 20:58:22 GMT | Experimental, off by default; JS tool-call scripts; `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1`; project settings ignored; resume requires the variable; auto mode classifier reviews the script not each call and cannot see runtime values; deny/ask/PreToolUse still apply; sandbox covers shell commands only; 10-minute wait / 2-hour background; feature limits (Remote Control, Claude in Chrome, computer use, Desktop/background move, `/fork`) |
| [Code Mode (zh-CN)](https://code.claude.com/docs/zh-CN/code-mode) | 200, last-modified 2026-11-21 22:20:38 GMT | Same requirements, commands, and limits on the points cited; used as a same-day cross-check, not as a second conflicting source |
| [Permissions](https://code.claude.com/docs/en/permissions) | 200 | Linked for deny/ask rules and Bash-rule limits already summarized on the Code Mode page |
| [Permission modes](https://code.claude.com/docs/en/permission-modes) | 200 | Linked for auto mode and “actions no mode auto-approves” |
| [Hooks](https://code.claude.com/docs/en/hooks) | 200 | Linked for PreToolUse / PostToolUse; hook-failure version notes stay on the Code Mode troubleshooting page |
| [Sandboxing](https://code.claude.com/docs/en/sandboxing) | 200 | Confirms the sandbox covers shell commands only; file tools, MCP servers, and hooks run outside it; Code Mode unsandboxed retries in auto mode are deferred to the Code Mode page |
| [Managed settings](https://code.claude.com/docs/en/managed-settings) | 200 | Linked as the delivery mechanism for the official org-block `env` example on the Code Mode page |
| [Environment variables](https://code.claude.com/docs/en/env-vars) | 200 | Linked for `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` |
| [Changelog](https://code.claude.com/docs/en/changelog) | 200, last-modified 2026-11-21 20:58:33 GMT | Opened to confirm Code Mode is still documented in current notes; not used as a substitute for the Code Mode page |
| [v2.1.323 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.323) | 200 | Minimum version named on the Code Mode page |
| [v2.1.330 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.330) | 200 via /latest | Latest GitHub release seen on 2026-11-22 |

## Not claimed

- Any live Code Mode session, permission prompt, countdown, hook, or sandbox result
- That every changelog fix in v2.1.330 is present on a reader's install
- Speed, cost, reliability, or safety effectiveness
- A recommendation to switch release channels just to get the experiment

## Review status

Draft for dig content review. Do not publish until `draft: false`, review-draft wording is removed, checks pass, and production pages are verified.
