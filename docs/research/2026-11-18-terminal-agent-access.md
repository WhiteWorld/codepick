# Terminal-agent comparison repair — 2026-11-18

Official public sources checked on **2026-11-18 (Asia/Shanghai)**. This is a documentary correction of one bilingual comparison, not a vendor release announcement, new benchmark, or another full tool-data review.

## Scope

- `src/content/compare/gemini-cli-vs-claude-code-vs-codex-cli.md`
- `src/content/compare-en/gemini-cli-vs-claude-code-vs-codex-cli.md`
- Existing article slugs and the original publication date (2026-02-17) remain. `updated_at` records this substantive revision.
- No tool YAML, scores, review cadences, strict-check baselines or renderer behavior changed.

## Evidence and decisions

| Official source | Verified statement used in both articles |
| --- | --- |
| [Google transition announcement, 2026-05-19](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli) | Individual free Code Assist and Google AI Pro / Ultra Gemini CLI requests stop on June 18, 2026. Paid Gemini and Gemini Enterprise Agent Platform API keys remain. Antigravity CLI initially lacks one-to-one feature parity. Do not continue recommending the obsolete personal free quota. |
| [Google Cloud Code Assist sunset](https://docs.cloud.google.com/gemini/docs/codeassist/sunset) | New Standard / Enterprise sales end October 9, 2026; new Gemini Enterprise Standard / Plus omit the entitlement. Existing Code Assist is supported through contract end. Annual renewal cutoff January 31, 2027; monthly December 31, 2027; existing Gemini Enterprise inclusion through March 31, 2027; additional licenses through January 31, 2027. Code Assist models limited to Gemini 3.x. |
| [Claude Code authentication](https://code.claude.com/docs/en/authentication) | Eligible Pro / Max / Ultra, organization accounts, Console and managed cloud-provider routes exist. API-key-only and subscription-impossible claims are false. Subscription access does not make Console/API usage free. |
| [Claude Code overview](https://code.claude.com/docs/en/overview) | Native installation recommended; Homebrew command `brew install --cask claude-code` remains documented. Project instructions and MCP are supported. Commands are examples, not installs we executed. |
| [Claude Code LICENSE](https://raw.githubusercontent.com/anthropics/claude-code/main/LICENSE.md) | All rights reserved; use subject to commercial terms. A public repository is not evidence of an open-source license. |
| [Codex authentication](https://developers.openai.com/codex/auth/) | Local CLI supports ChatGPT sign-in and API-key billing. API usage is billed separately from ChatGPT allowances; cloud and local feature eligibility differ. Authentication affects applicable organization/data-handling policy. |
| [Codex pricing](https://developers.openai.com/codex/pricing/) | Intro mentions Free / Go, but their specific cards describe desktop-app access subject to rollout; Plus explicitly lists CLI. Do not infer blanket Free / Go CLI eligibility from the headline. Allowances depend on model, context and task; avoid stale fixed five-hour task counts. |
| [Codex CLI](https://developers.openai.com/codex/cli/) | Local inspect/edit/run and `/status`, `/model`, `/permissions` are documented. Git checkpoints and permission inspection are appropriate workflow advice. |
| [Codex README](https://raw.githubusercontent.com/openai/codex/main/README.md) | npm and Homebrew installation remain documented; recommends eligible ChatGPT plans or an API key. |
| [Codex LICENSE](https://raw.githubusercontent.com/openai/codex/main/LICENSE) | Apache-2.0 client license, not an entitlement to free model inference. |

### Supersession and uncertainty

- The later Google Cloud sunset guidance qualifies the May announcement's enterprise-access statement. Renewal cutoffs are not universal service shutdown dates. Official dates do not specify an exact timezone; no time-of-day or China-time deadline is invented.
- Antigravity migration parity was not independently tested. Readers must check project-specific extensions, MCP, Hooks and scripts. No claim of present complete parity is made.
- Codex Free / Go CLI availability remains account/surface dependent and is not promised or categorically denied. The article explicitly identifies the headline/card ambiguity rather than manufacturing a plan entitlement.
- No actual accounts, payments, runtime performance, regional connectivity, privacy compliance or provider-installed behavior were tested. No installer commands were executed. No scores or numeric model-context comparisons were added.
- Removed unsupported “best/unmatched” performance conclusions, universal mainland-China blocking statements, historical fixed quotas/context assumptions and the unrelated promotional link. A suggested small-repository evaluation is clearly separated from executed results.
- This narrow article repair does not certify every other guide on the site as current. Yesterday's structured data and pricing changes are preserved unchanged.

## Reproduction

```sh
npm run build
npm run check:seo
npm run content:check -- --strict
npm run content:check:baseline
node --test scripts/check-content.test.mjs scripts/tool-pricing.test.mjs scripts/terminal-agent-access.test.mjs
git diff --check
```

The new regression tests cover the mirrored article's lifecycle dates, billing/surface qualifications, official citations, unchanged publication date, and built article metadata/body. They are content regressions, not product runtime tests.

## Local validation result

- Build passed: 356 pages. SEO checks passed. Existing content/pricing regressions plus four new article regressions passed: 11/11.
- Strict content and the zero-error baseline both fail on two **unchanged main-branch records**: `data/tools/opencode.yaml` and `data/apis/deepseek-api.yaml`, each due 2026-11-17. No record, cadence, checker or baseline was changed to hide these failures. A new substantive review of those records is separate from this article repair and is needed before CI can be green.
- `git diff --exit-code origin/main -- data scripts/check-content.mjs scripts/check-content-baseline.mjs` confirmed the data and gates remain identical to main.
