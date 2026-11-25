# Orca / Herdr / Paseo / T3 Code comparison — 2026-11-25

Official public sources checked on **2026-11-25 (Asia/Shanghai)**. This is a documentary comparison of four coding-agent workspaces / control planes, answering who assigns work, where a task keeps running, and how changes are reviewed. It is not an install review, a performance ranking, a live pairing test, or a runtime security test.

## Scope

- New bilingual guide: `src/content/guides/choose-orca-herdr-paseo-t3-code.md`
- English mirror: `src/content/guides-en/choose-orca-herdr-paseo-t3-code.md`
- Publication date is 2026-11-25. The files stay `draft: true` with review-draft wording until independent content review is complete.
- Cross-link, and do not rewrite: `paseo-remote-agent-orchestrator`, `agent-collaboration-platform-types`, and the unscored tool entries `orca`, `paseo`, and `t3-code`.
- Herdr had no in-site tool page on the check date; the articles cite only official Herdr pages and repositories.
- No tool YAML, scores, baselines, workflows, or unrelated files are changed.
- No install, login, paid call, relay, T3 Connect, SSH, Cloud VM, phone pairing, or runtime security test.

## Evidence

Raw fetches (HTML or markdown bodies, response headers, curl metadata, GitHub API payloads, and extracted text) are in `/workspace/codepick-evidence-2026-11-25/`. See `INDEX.md` there for HTTP status, the HTTP `Date` header, and checksums.

Unless noted, official pages returned HTTP 200 with no redirect. HTTP `Date` on the main page fetches was 25 Nov 2026 02:13:13–02:13:20 GMT (10:13–10:13 Asia/Shanghai). Canonical Orca URLs are on `https://orca.dev/`; `www.onorca.dev` and `www.orca.dev` redirected once to `orca.dev`. These URLs were checked and then not used as citations:

- `https://orca.dev/pricing` → 404
- `https://orca.dev/docs/llms.txt` and `https://paseo.sh/docs/llms.txt` → 404 / not found
- `https://t3.codes/docs` → 404 (T3 docs used in the article are the GitHub markdown pages)

| Official source | Fetched | Verified statement used in both articles |
| --- | --- | --- |
| [Orca](https://orca.dev/) and [llms.txt](https://orca.dev/llms.txt) | 200 | Desktop app for macOS, Windows, and Linux; MIT; agents run on your own subscriptions; free and open source |
| [Supported agents](https://orca.dev/docs/agents/supported) | 200 | New launches pre-fill permission-bypass flags (`--dangerously-skip-permissions`, `--dangerously-bypass-approvals-and-sandbox`, `--yolo`, and equivalents). Reason: worktrees are disposable. Settings can switch Yolo / Manual |
| [Agents and sessions](https://orca.dev/docs/model/agents-sessions) | 200 | "The intent is that the worktree itself is the sandbox." Same launch-flag defaults |
| [Worktrees](https://orca.dev/docs/model/worktrees) | 200 | Each task gets its own on-disk git worktree and branch; "they never step on each other's files." No OS-sandbox claim on this page |
| [Ways to run](https://orca.dev/docs/ways-to-run) | 200 | Local, SSH, Remote Orca Server, and experimental Cloud VM / per-workspace environments. "Orca does not sell managed VPS hosting." |
| [Orchestration](https://orca.dev/docs/cli/orchestration) | 200 | Experimental Run / Task / Dispatch model. "The experimental Orchestration panel and its switch are temporarily unavailable." |
| [Mobile companion](https://orca.dev/docs/mobile) | 200 | Beta. Paired desktop owns sessions. "intentionally not a full editor." |
| [Bot security](https://orca.dev/docs/bots/security) | 200 | Default chat permission is Full access; a new bot starts there unless changed |
| [Herdr](https://herdr.dev/) | 200 | Agents run in herdr-core, not in the window. FAQ: TUI is a separate product and does not share agents; reboot does not auto-resume an agent; free and open source; platforms include macOS (Apple silicon), Linux, Windows, and phone apps |
| [herdr-core](https://herdr.dev/core/) | 200 | An agent can start helpers, wait, and read results. Status comes from OSC 7501, not screen scraping |
| [Herdr Mobile](https://herdr.dev/mobile/) | 200 | Phone talks to herdr-core over SSH; no Herdr account and no Herdr server in the middle; does not work with TUI |
| [Download](https://herdr.dev/download/) and [Privacy](https://herdr.dev/privacy/) | 200 | Distribution via releases.herdr.dev. Desktop sends one anonymous daily usage report by default; can be turned off |
| [security.md](https://github.com/herdrdev/herdr-app/blob/master/docs/security.md) | 200 | Mods are trusted JavaScript; "That is not a security boundary." Telemetry on by default |
| [Paseo Security](https://paseo.sh/docs/security) | 200 | Daemon/clients. Relay off on new installs; relay untrusted by design and end-to-end encrypted. Password auth does not encrypt traffic. Default listen `127.0.0.1:6767` |
| [Paseo worktrees](https://paseo.sh/docs/worktrees) | 200 | Isolation: New worktree creates a separate directory and branch |
| [Paseo orchestration](https://paseo.sh/docs/orchestration) | 200 | Delegation and parallelism documented. Enable Paseo tools is off by default |
| [Paseo README](https://github.com/getpaseo/paseo) / LICENSE | 200 | Apache-2.0 except third-party components. "Paseo doesn't have any telemetry, tracking, or forced log-ins." Mobile app described as the full app |
| [T3 Code](https://t3.codes/), [README](https://github.com/pingdotgg/t3code/blob/main/README.md) | 200 | "Open-source control plane." "T3 Code does not resell tokens." Each thread can work in its own worktree |
| [Remote access](https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md) | 200 | Host must stay running. T3 Connect requires sign-in. Saving a sign-in does not start a server. Default cap 3 machines; paid T3 Chat can raise it |
| [Permission modes](https://github.com/pingdotgg/t3code/blob/main/docs/user/permission-modes.md) | 200 | Initial default for new threads is Full access |
| GitHub stable releases / tags | API 200 | Orca v1.4.274 (2026-11-25 06:52 Asia/Shanghai). Herdr app tag v0.1.18 (2026-11-24 20:05). herdr-core v0.1.22. Paseo v0.17.4. T3 Code stable still v0.1.11; v0.1.12 nightlies are prerelease |

## Source wording left in the article without a verdict

1. **Orca "worktree itself is the sandbox."** The Agents and sessions page uses that phrase to explain pre-filled bypass flags. The Worktrees page only claims agents will not overwrite each other's files. The article presents both, and does not treat the wording as an operating-system sandbox result. The official Codex flag name includes bypass sandbox.

2. **Orca orchestration panel "temporarily unavailable."** The page still documents the CLI flow and says the feature is experimental. The article does not treat the panel note as a removal or as a live UI test.

3. **Herdr status reporting.** Only agents that speak OSC 7501 show working / done / needs-you status. The article does not decide which third-party agents implement it.

4. **T3 Connect machine caps.** Documented as 3 by default, 10 or 100 with paid T3 Chat plans. Not registered or paid-verified.

## Not claimed

- Any live install, login, pairing, SSH, relay, T3 Connect, Cloud VM, or phone session
- Speed, reliability, actual cost, or security effectiveness
- That a git worktree or "Isolation: New worktree" is a system sandbox
- That Herdr desktop has the same first-class worktree workflow as Orca or Paseo
- That Herdr TUI, HerdOS, or T3 Stack is the same product as the tools compared here
- A refresh of `data/tools/*.yaml` versions or scores
- Coverage of Happy, Nimbalyst, or Conductor beyond a short "not in this comparison" note
