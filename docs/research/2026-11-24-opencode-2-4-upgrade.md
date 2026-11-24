# OpenCode 2.4 upgrade checklist — 2026-11-24

Official public sources checked on **2026-11-24 (Asia/Shanghai)**. This is a documentary howto: an upgrade checklist for OpenCode 2.4, led by the GitHub Copilot token change, then other documented surprises that can break a setup or change the security boundary. It is not a changelog dump, a feature tour, a live install, or a runtime test.

## Scope

- New bilingual guide: `src/content/guides/opencode-2-4-upgrade.md`
- English mirror: `src/content/guides-en/opencode-2-4-upgrade.md`
- Publication date is 2026-11-24. After dig's review of `a215247ad9ec4385e70955201732aa3703bc8726`, `draft` is set to `false` for publication.
- Cross-link, and do not rewrite: `opencode-2-permission-rules` and the `opencode` tool entry.
- No tool YAML, scores, baselines, workflows, or unrelated files are changed.
- No install, no login, no live Copilot / automation / built-in browser / plugin-update / `opencode service set password` run, no paid API calls, and no runtime security test.

## Evidence

Raw fetches (HTML or markdown bodies, response headers, timestamps, curl metadata, and `Accept: text/markdown` variants) are in `/workspace/codepick-evidence-2026-11-24/`. See `INDEX.md` and `MANIFEST.json` there for HTTP status, the HTTP `Date` header, checksums, and byte sizes.

None of the official responses included a `Last-Modified` header. The HTTP `Date` header on these fetches was 24 Nov 2026 02:11–02:14 GMT (10:11–10:14 Asia/Shanghai). Unless noted, pages returned HTTP 200 with no redirect. The three automations/schedules doc URLs redirected once to `/v1/docs/...` and then returned 404.

| Official source | Fetched | Verified statement used in both articles |
| --- | --- | --- |
| [v2.4.0 changelog](https://opencode.ai/changelog/v2.4.0) | 200 | Dated 2026-11-23. Copilot no longer reads `GITHUB_TOKEN`; set `COPILOT_GITHUB_TOKEN` or sign in with OAuth. Fix note: `GITHUB_TOKEN` is often set by git tooling and GitHub Actions without Copilot access; it now reads `COPILOT_GITHUB_TOKEN`. Plugin auto-update rules; image tool rename and unmapped "always allow"; automations, including shell approval-once-at-creation and `"automations": false`; built-in Desktop browser and persistent profile; MCP newest-protocol / probe / `protocol: "legacy"` upgrade note; `opencode service set password` writing the password to the CLI log; Clear browsing data asks first; TUI theme `opencode` / `opencode-classic`; other upgrade notes cited in the "other changes" section |
| [Changelog index](https://opencode.ai/changelog) | 200 | 2.4.1 is listed above 2.4.0; both dated 2026-11-23 |
| [v2.4.1 changelog](https://opencode.ai/changelog/v2.4.1) | 200 | Dated 2026-11-23. OpenCode can save assistant messages again on the older SQLite version included with macOS 12. `@opencode/plugin` now supports OpenTUI packages from 0.8.0, allowing plugins capped below 0.9 to install again. Other 2.4.1 items were not turned into a patch list |
| [Providers](https://opencode.ai/docs/providers/) | 200 | Copilot section: device OAuth rather than manual API-key entry; `/connect` → GitHub Copilot → Login with GitHub Copilot → `/models`. Troubleshooting: "Copilot has no models" / `failed to sync GitHub Copilot models`. **Does not mention** `COPILOT_GITHUB_TOKEN` |
| [SDK](https://opencode.ai/sdk) | 200 | The experimental-schedules-to-automations migration, including carry-over / drop rules (#64160), appears under the **v2.3.1** (2026-11-18) section, not under v2.4.0. The v2.4.0 SDK excerpt covers automations at a high level and does not repeat that migration paragraph |
| [Config](https://opencode.ai/docs/config/) | 200 | Config file locations. No automations section and no `"automations": false` sample on the check date |
| [Desktop](https://opencode.ai/desktop) | 200 | Mentions the built-in browser, and separately links Browse as a different product line |
| [Browse](https://opencode.ai/product/browse.md) (canonical cite: https://opencode.ai/product/browse) | 200 | MCP server plus a Chromium extension for the user's real browser. Not described as the Desktop built-in browser |
| [Permissions](https://opencode.ai/docs/permissions/) | 200 | Linked for rule mapping / saved approvals; the article defers rule-order questions to the existing in-site permissions guide |
| [MCP servers](https://opencode.ai/docs/mcp-servers/) | 200 | `protocol` field: `legacy` (default), `auto`, or `2026-07-28`. Default is the classic `initialize` handshake; `auto` probes and falls back. With `pool` set, an unset `protocol` means `auto` |
| [Plugins](https://opencode.ai/docs/plugins/) | 200 | Auto-update for `name@latest`, ranges, Git branches, and Git `semver:` ranges agrees with the 2.4.0 changelog, with extra range examples (`~`, `1.x`, `>=...<2`). For sources that do not follow a version, the pages diverge: the changelog lumps a bare name, an exact version, another tag such as `@next`, a Git tag, or a commit hash, and says `plugin update` can still update those by hand. The Plugins page splits them: a bare name / repository / other npm tags such as `name@next` / Git tags stay on the installed version; `plugin check` still reports their updates and `plugin update` installs them; "Exact versions and commit hashes are pinned." The same Manage section also says "Local plugins and exact package revisions are skipped." Rechecked 2026-11-24 10:29 Asia/Shanghai; Accept-markdown SHA-256 identical to the morning capture |
| https://opencode.ai/docs/automations/ | 302 then **404** | No dedicated automations docs page on the check date |
| https://opencode.ai/docs/automation/ | 302 then **404** | Same |
| https://opencode.ai/docs/schedules/ | 302 then **404** | Same |
| [llms.txt](https://opencode.ai/llms.txt) and [docs llms.txt](https://opencode.ai/docs/llms.txt) | 200 | Used to look for an automations docs URL. None was listed |

## Source conflicts left in the article

1. **`COPILOT_GITHUB_TOKEN` vs Providers OAuth.** The 2.4.0 changelog tells readers to set `COPILOT_GITHUB_TOKEN` or sign in with OAuth. The Providers page documents device OAuth and does not mention the environment variable. The article names both pages, does not treat the changelog as an unconditional guarantee that the variable works in every setup, and does not treat the Providers page as a ban on the variable. Neither method was tested.

2. **MCP `protocol` default.** The 2.4.0 changelog says a server without a `protocol` setting is probed on the newest protocol first, then falls back to the legacy handshake, and to set `protocol: "legacy"` if a server misbehaves. The MCP servers page says the default is already `legacy` (classic `initialize`); `auto` is the probing mode; an unset `protocol` means `auto` only when `pool` is set. The article names both pages and does not decide the default.

3. **Schedules-to-automations migration date.** An earlier brief placed this under the SDK page's 2.4.0 notes. The live SDK page on 2026-11-24 puts it in the **v2.3.1** section. The live page wins. The article cites the SDK page and does not pretend the paragraph is on the v2.4.0 changelog page.

4. **TUI plugin OpenTUI floor.** 2.4.0 says `@opencode/plugin` needs OpenTUI 0.9.4 or later. 2.4.1 says support starts at 0.8.0 again, so plugins capped below 0.9 can install. The article names both notes and does not choose a version for a given plugin.

5. **Pinned plugins vs `plugin check` / `plugin update`.** The 2.4.0 changelog groups a bare name, an exact version, another tag such as `@next`, a Git tag, or a commit hash, and says they do not update themselves; it also says `opencode plugin update` still updates those by hand. The Plugins page agrees that those sources do not auto-update, but then splits them: bare name / repository / other tags such as `name@next` / Git tags can still be reported by `plugin check` and installed by `plugin update`; exact versions and commit hashes are pinned; "Local plugins and exact package revisions are skipped." The article presents both wordings and does not decide, with a test, which command result applies to an exact version or commit hash.

## Not claimed

- Any live OpenCode install, login, Copilot OAuth or `COPILOT_GITHUB_TOKEN` result
- That `COPILOT_GITHUB_TOKEN` works in every setup, or that the Providers page forbids it
- Any live automation, plugin auto-update, `plugin check`, `plugin update`, built-in browser, Browse, MCP probe, or `opencode service set password` run
- That `plugin check` or `plugin update` still applies to exact versions or commit hashes, or any verdict between the 2.4.0 changelog and the Plugins page on that point
- That every older install leaked a password, or that anyone's logs were inspected
- That checking logs or rotating a password after the `opencode service set password` fix is an official changelog step; the article labels those as its own recommendations
- A default-behavior verdict on MCP `protocol` when the changelog and the MCP docs disagree
- That readers must be on 2.4.1 for the 2.4.0 notes to apply, except where a 2.4.1 note specifically applies (macOS 12 session save; the OpenTUI 0.8.0 plugin note)
- Speed, cost, reliability, or security effectiveness
- That the built-in Desktop browser and the Browse product are the same thing
- Invented mitigations for imported browser sign-ins beyond what the official pages document ("Clear browsing data asks first")
- A refresh of `data/tools/opencode.yaml`

## Recheck after independent content review

On 2026-11-24 10:29 Asia/Shanghai, the Plugins, Providers, and v2.4.0 changelog pages were fetched again with `Accept: text/markdown`. All three markdown bodies were SHA-256 identical to the morning captures (HTTP 200; HTTP `Date` Tue, 24 Nov 2026 02:29:45 GMT). Evidence: `/workspace/codepick-evidence-2026-11-24/recheck-2026-11-24-1028/`.

Revisions after that recheck, still as a review draft:

- Split exact versions and commit hashes from bare name / `@next` / Git tags, and present the changelog wording next to the Plugins "pinned" / "skipped" wording without adjudicating an untested command result.
- Label "check related logs / consider rotating that password" as this article's recommendations, not official changelog steps.
- Chinese only: add "或域名" to the GitHub Enterprise deployment-address sentence, matching the Providers line "enter the deployment URL or domain when prompted" already used in English.
- Chinese only: render "one persistent desktop profile" as 桌面浏览器配置档案, so it is not read as generic desktop-app settings.
- No added `registerCodeBlockRenderer` scope. No install, login, or live command run. `draft: true` and the review-draft wording stay.

## Publication enablement

dig independently reviewed `a215247ad9ec4385e70955201732aa3703bc8726` with no remaining blockers and no new suggestions. Both language files are set to `draft: false` for publication, and the “审阅稿” / “Review draft” sentences are removed. Reviewed article facts and untested boundaries are unchanged. No install, login, plugin update, or `opencode service set password` run was performed.

## Review status

Publication enablement only. Do not treat this note as a merge authorization; production pages still need verification after merge.
