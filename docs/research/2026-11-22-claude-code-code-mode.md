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
| [Sandboxing](https://code.claude.com/docs/en/sandboxing) | 200 | Confirms the sandbox covers shell commands only; file tools, MCP servers, and hooks run outside it; Code Mode unsandboxed retries in auto mode are deferred to the Code Mode page. Recheck also uses the platform limit: macOS, Linux, and WSL2; native Windows commands run unsandboxed |
| [Managed settings](https://code.claude.com/docs/en/managed-settings) | 200 | Linked as the delivery mechanism for the official org-block `env` example on the Code Mode page |
| [Environment variables](https://code.claude.com/docs/en/env-vars) | 200 | Linked for `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` |
| [Changelog](https://code.claude.com/docs/en/changelog) | 200, last-modified 2026-11-21 20:58:33 GMT | Morning capture confirmed Code Mode is still in current notes. The post-review recheck also uses 2.1.329 and 2.1.327 start-condition bullets, placed beside the Code Mode page rather than as a substitute |
| [v2.1.323 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.323) | 200 | Minimum version named on the Code Mode page |
| [v2.1.330 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.330) | 200 via /latest | Latest GitHub release seen on 2026-11-22 |

## Not claimed

- Any live Code Mode session, permission prompt, countdown, hook, or sandbox result
- That every changelog fix in v2.1.330 is present on a reader's install
- Speed, cost, reliability, or safety effectiveness
- A recommendation to switch release channels just to get the experiment


## Recheck after dig review (2026-11-22)

dig's independent content review of `22e734387c5e1c92b60aa71a23992a6be3424e9e` reported no blockers and four non-blocking suggestions. Official sources were re-opened on **2026-11-22 10:27 (Asia/Shanghai)** and saved under `/workspace/codepick-evidence-2026-11-22/recheck-2026-11-22-1027/`. Markdown bodies for Code Mode (en, zh-CN), changelog, sandboxing, and env-vars were byte-identical to the morning captures (SHA-256 unchanged). HTTP 200. Code Mode English HTML last-modified 2026-11-21 20:58:22 GMT; changelog HTML 2026-11-21 20:58:33 GMT; sandbox HTML 2026-11-21 20:58:23 GMT.

The bilingual draft was revised only on those four points. `draft: true` and the review-draft wording stay. Untested boundaries stay: no install, no `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE` in a live shell, no `claude` session, and no live auto mode, hook, or sandbox run. Checker thresholds, baseline, and workflows were not changed. Test logic was not relaxed; assertions were added for the new documentary facts, and the Chinese classifier wording was updated to match the revised prose.

| Point | Official source, as re-opened | Change in both articles |
| --- | --- | --- |
| Startup settings vs changelog | The Code Mode requirements sentence still says you can't start with an API key helper, OpenTelemetry export, or `DISABLE_TELEMETRY`, and the [doesn't-start table](https://code.claude.com/docs/en/code-mode#code-mode-doesnt-start) still lists `it doesn't yet work with an installed mod`. Changelog **2.1.329** (19 Nov 2026) says: "Added support for turning on Code Mode while OpenTelemetry events and metrics are enabled; each tool call the code makes sends its events; tracing still keeps it off" and "Changed Code Mode to also start when telemetry, nonessential traffic or feature flags are turned off; an administrator can keep it off in managed settings." Changelog **2.1.327** (17 Nov 2026) says: "Changed Code Mode to no longer refuse to start when an installed mod hooks tool calls; an administrator can still keep Code Mode off in managed settings." | Name both pages. Do not treat the Code Mode list as an unconditional ban on v2.1.329 or later. Do not decide which page wins. |
| Account-not-open message | Version bullet: "An older version starts without Code Mode, with or without the reason `it isn't open to your account yet`." Table: if you see `it isn't open to your account in this version` or `it isn't open to your account yet`, update if older than v2.1.323; otherwise check the network and start again; if the reason stays, try again another day. | Split the older-version silent start from those two reason strings. On v2.1.323 or later, the messages are not by themselves proof the install is too old. |
| Sandbox platforms | [Sandboxing](https://code.claude.com/docs/en/sandboxing): "The sandbox runs on macOS, Linux, and WSL2. On native Windows, Claude Code runs commands unsandboxed. To use the sandbox on a Windows machine, run Claude Code inside a WSL2 distribution." | Add this platform limit next to the existing "sandbox covers shell commands only" note. |
| Chinese classifier wording | The official Chinese limits line still says the classifier "审查的是代码，而不是每个工具调用". "整段" is our wording and can be read as the whole session. | In the Chinese FAQ, heading, body, description, and limits list, say "每一段即将运行的代码". English already said "each piece of code before it runs" and was left unchanged. |

## Publication enablement

dig independently reviewed `c42a9b86974ba0c77c65d929f623e76ee25b1258` with no remaining blockers. Both language files are set to `draft: false` for publication, and the “审阅稿” / “Review draft” sentences are removed. Reviewed article facts and untested boundaries are unchanged. No install, login, or Code Mode session was performed.

## Review status

Publication enablement only. Do not treat this note as a merge authorization; production pages still need verification after merge.
