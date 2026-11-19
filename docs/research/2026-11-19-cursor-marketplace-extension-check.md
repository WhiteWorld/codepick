# Cursor marketplace malicious-extension check — 2026-11-19

Official public sources checked on **2026-11-19 (Asia/Shanghai)**. This is a documentary howto that separates Cursor's data-exposure notifications from the extension-inspection path. It is not a forensic report, a reproduced incident, or a claim that official scripts were executed.

## Scope

- New bilingual guide: `src/content/guides/cursor-marketplace-malicious-extension-check.md`
- English mirror: `src/content/guides-en/cursor-marketplace-malicious-extension-check.md`
- Publication date is 2026-11-19. `draft: true` until dig review has no blockers and the article is enabled for publication.
- No tool YAML, scores, review cadences, strict-check baselines, or renderer behavior are changed.

## Evidence and decisions

| Official source | Verified statement used in both articles |
| --- | --- |
| [Security notice, dated 2026-10-29, updated 2026-10-30 11:30 PT](https://cursor.com/blog/claude-code-extension-security-notice) | Window about 2:27am–1:35pm PT on 2026-10-29 for Anthropic.claude-code 2.1.312 and 2.1.313 on Windows and macOS in Cursor's VS Code extension marketplace. Official quick check looks for the `svc-telemetry` key comment. Uninstalling the extension may not be sufficient. Remediation scripts are `remediate-macos.sh` (affected user, not root) and `remediate-windows.ps1` (Administrator PowerShell). Official fingerprints and the “if the key is found, the machine is impacted” wording are quoted; the quick check is not treated as complete forensics. |
| [Investigation update, 2026-11-13](https://cursor.com/blog/security-incident-update) | Fireworks-exposed vendor key; traces mostly from 2025, not in Privacy Mode; API credentials in traces for less than 0.01% of customers; traces exposed for fewer than 0.05% of users not using Privacy Mode, with direct notification, and no notice meaning data was not in those traces. At most about 5,000 users who requested specific cached versions that day; about 11 hours of availability. Open VSX never had the malware; Anthropic did not publish the copy. Last attacker activity seen November 1 and blocked, per Cursor. Official not-affected list is attributed to Cursor, not re-audited. |

### Time conversion

October 29, 2026 was still US Pacific Daylight Time (UTC-7); DST ended on November 1, 2026. Official 2:27am PT converts to 17:27 Asia/Shanghai on October 29; 1:35pm PT converts to 04:35 Asia/Shanghai on October 30. The articles label this as a conversion, not an official China-time deadline.

### Supersession and uncertainty

- The October 29 notice names Windows and macOS packages. The October 30 IOC update also lists Linux paths. The articles refuse to call Linux officially excluded.
- Official wording that the attacker could not log in through the tunnel on most non-admin hosts is preserved together with the requirement to remediate anyway.
- No independent verification of offline attacker infrastructure, script effectiveness, hash values, account notification lists, or live marketplace state.
- Existing general security guide `ai-coding-agent-security-2026` is cross-linked and not rewritten. This article does not replace it.

## Reproduction after review

Once `draft` is set to `false` and review wording stays absent:

```sh
npm run build
npm run check:seo
npm run content:check -- --strict
npm run content:check:baseline
node --test scripts/guide-drafts.test.mjs scripts/cursor-marketplace-extension-check.test.mjs
git diff --check
```
