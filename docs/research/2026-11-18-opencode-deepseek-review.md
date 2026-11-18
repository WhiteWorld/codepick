# OpenCode and DeepSeek API — full documentary review, 2026-11-18

Official public sources checked **2026-11-18 (Asia/Shanghai)**. These two records expired after yesterday's work; neither was part of the 42 overdue records reviewed in PR158. This review preserves that work and today's bilingual comparison repair. It is not a hands-on benchmark or privacy audit.

## Review method and scope

Reviewed identity/version, client installation/access, model/provider eligibility, all current price/limit claims, current capabilities, compatibility, recommendations, regional/privacy limitations, source provenance and score provenance in both records. Historical changelog text is retained as dated history, not newly asserted current behavior. Unknowns are removed as positive claims or explicitly visible to readers.

Scores remain historical editorial judgments: no new runtime experience supports changing them or calling them freshly benchmarked. Both records visibly disclose this. `confidence: medium` reflects this limitation and the documented source conflicts. DeepSeek is downgraded from high. The completed documentary review date is Nov18; unchanged 30-day cadence yields Dec18. This does not certify unknown runtime behavior.

## OpenCode

### Version and source priority

- [Official changelog](https://opencode.ai/changelog), [GitHub v2.3.2 release](https://github.com/anomalyco/opencode/releases/tag/v2.3.2) and [official scoped npm package](https://registry.npmjs.org/@opencode%2Fcli) agree on **v2.3.2**, released Nov18. GitHub publication: **09:35:12 Asia/Shanghai**; npm publication: **09:30:57 Asia/Shanghai**.
- v2.3.2 release notes describe sending GPT-6.2 Responses system prompts as a leading developer message for cache reuse from the second step, plus a webfetch structured-result fix. No independently measured token/cost savings are claimed.
- [v2.3.1](https://github.com/anomalyco/opencode/releases/tag/v2.3.1), also Nov18, adds timed-out shell backgrounding and background compaction, including the warning that unused summaries still cost tokens.
- [Legacy v1.19.6](https://github.com/anomalyco/opencode/releases/tag/v1.19.6) and [legacy npm package](https://registry.npmjs.org/opencode-ai) establish that `opencode-ai` is still a separate 1.x line, now 1.19.6. Component tags are not application versions. Existing v2.3.0 and earlier entries remain dated history.

### Capability/access/installation check

- [Intro/download documentation](https://opencode.ai/docs/) and [terminal page](https://opencode.ai/terminal): terminal, desktop and web surfaces; macOS, Linux and Windows binaries; current V2 scoped package and native installers. Windows package-manager installation is explicitly unsupported. No installer ran.
- [MIT license](https://raw.githubusercontent.com/anomalyco/opencode/dev/LICENSE): free open-source client, not unlimited free inference.
- [Providers](https://opencode.ai/docs/providers/) and [models](https://opencode.ai/docs/models/): `/connect`, `/models`, project-specific availability, custom compatible endpoints and local-provider configuration. Replace unsubstantiated fixed “75+” counts with the actual catalog/configuration model. Keep only compatible API IDs supported by the reviewed provider documentation; remove the unchecked Ark promotion/integration recommendation.
- [CLI](https://opencode.ai/docs/cli/), [tools](https://opencode.ai/docs/tools/) and [MCP](https://opencode.ai/docs/mcp-servers/): sessions, agentic file edits, shell tools and MCP support. The tool remains a CLI classification despite desktop/web alternatives. Do not recommend it as IDE Tab completion.
- [V1 migration](https://opencode.ai/docs/migrate-v1/): both versions use the same command/config locations; plugins, server API and terminal config require care. Critically, **V2 preserves `lsp` configuration but does not run language servers, expose LSP tools or produce LSP diagnostics**. Set `lsp_integration: false` and make the limitation visible. The standalone `/docs/lsp/` page identifies itself as V1 and must not override V2 migration guidance.
- [Permissions](https://opencode.ai/docs/permissions/): specific current defaults are broad, including external-directory access; do not infer hardened isolation or universal prompts from general marketing copy. Advise explicit rules and project lint/typecheck/test commands. No security exploit test was attempted.

### Billing/region/privacy check

- [Go pricing](https://opencode.ai/console/go), [Go documentation](https://opencode.ai/docs/console/go/), and [Console intro](https://opencode.ai/docs/console/) establish optional Go **$10/month**, Go Plus **$40/month**, and Go Teams **$20/member/month with a two-member minimum**. The client is usable without Go; direct providers and Console usage credits are separate billing paths.
- Go Teams is represented as **$40/month for two members**, with the $20/member rate and minimum explained in both language limits. This avoids presenting $20 as a complete team subscription in cards/JSON-LD without requiring a renderer rewrite.
- Go allowances are shared across models: five-hour 20% and weekly 50% of monthly allowance. Monday 00:00 UTC reset is **Monday 08:00 Asia/Shanghai**. No fixed request count or unlimited inference promise.
- Extra Usage draws Console credits after limits; Teams enables it by default. [Billing](https://opencode.ai/docs/console/billing/) lists a **4.6% + $0.31 credit-top-up processing fee**. This is not labeled a fee on every direct-provider request or all subscription payments.
- Training/retention vary by model/endpoint; workspace privacy/region settings can restrict models. DeepSeek Go models require Global regions; no guarantee of universal mainland-China access or zero retention. Published DeepSeek Go ZDR terms are service/contract-specific, not a general DeepSeek API guarantee. Removed unverified Ark first-month/renewal prices and VPN-free claims.

## DeepSeek API

### Pricing and model check

- [Canonical pricing page](https://api-docs.deepseek.com/quick_start/pricing) and its [linked official Markdown](https://api-docs.deepseek.com/quick_start/pricing.md) agree in the live public HTML. The fetch provider initially returned mismatched “Your First API Call” text for the HTML URL; direct public HTML retrieval and official Markdown were used instead. No authenticated endpoint was accessed.
- Model rates unchanged, USD per 1M tokens, off-peak / peak:
  - Flash: cache-hit **0.003 / 0.006**, cache-miss **0.15 / 0.30**, output **0.60 / 1.20**.
  - Pro: cache-hit **0.022 / 0.044**, cache-miss **0.66 / 1.32**, output **1.98 / 3.96**.
- Both list **1M context and 384K maximum output**. Flash is **V4.1-Flash-1017** with vision; Pro is **V4-Pro-0813**, without vision. These are documented limits, not measured usable repository sizes.
- Peak hours Monday–Friday 01:00–04:00 and 06:00–10:00 UTC convert to **09:00–12:00 and 14:00–18:00 Asia/Shanghai**. Weekends and Chinese public holidays are off-peak. No CNY conversion or fixed monthly-plan promise.
- Legacy Flash IDs route to current Flash. `deepseek-chat`/`deepseek-reasoner` are not current pricing-table models; actual call availability remains unknown.

### Substantive newly covered changes

- [Nov13 official changelog](https://api-docs.deepseek.com/updates): application APIs add web/deep-thinking search, file input, URL reading and safety parameters for Flash via Messages, Responses and Chat Completions; standalone Search/Fetch/OCR/ASR/TTS also documented. No vendor benchmark figures were republished as our own results.
- [Search & Fetch billing](https://api-docs.deepseek.com/guides/search): **$0.75 per 1,000 successful requests producing results**, including tool-triggered Harness/Claude Code/Codex calls (including Alpha Search), with possible additional token costs. Failed, empty-result or timeout requests are not billed. Remove the old future-tense free-until-Nov1 claim; that period has expired.
- Current pricing: file parsing/OCR **$0.225/1,000 pages**; TTS list **$0.45/10,000 characters**, temporarily **$0.225**; ASR list **$0.116/hour**, temporarily **$0.058**. No promotion end date is stated: disclose that, do not invent one or turn temporary prices into permanent prices.

### Compatibility, conflicting sources and limitations

- [Claude Code integration](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code), [Codex integration](https://api-docs.deepseek.com/quick_start/agent_integrations/codex) and [OpenCode integration](https://api-docs.deepseek.com/quick_start/agent_integrations/opencode) document the retained clients and OpenAI/Anthropic/Responses routes. This is a reviewed subset, not a claim that removed clients are incompatible. No setup script was executed or credentials read.
- OpenCode's DeepSeek guide still names V4-Flash and V1.18.30. Current pricing's Flash ID/alias mapping and OpenCode's own V2 install docs take precedence; do not copy stale client setup details.
- [Sept10 news](https://api-docs.deepseek.com/news/news260910) still says Pro will route to Flash from Sept14; the updated changelog and current pricing retain Pro separately. Preserve the conflict explicitly and use current pricing, without claiming we tested backend routing.
- [Official 1017 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) and [base V4.1 card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) corroborate the model lineage/vision/context scope. Model-weight licensing does not establish hosted API data handling or prices.
- [General privacy policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html) (last updated Feb10, 2026) includes improvement/training purposes, a right to opt out of training, and retention varying by purpose and legal requirements. Its scope excludes developers’ own downstream end-user processing rules. [Terms](https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html) (Mar27, 2026) include APIs and say specific terms prevail in conflicts. These general documents are not proof of API-specific ZDR or a negotiated DPA; account-specific contracts, actual endpoint availability and regional connectivity were not operationally verified. Make those unknowns visible, do not assert ZDR or a privacy certification, and retain scores only as disclosed historical editorial judgments.

## Validation

Run the standard 356-page build, SEO, strict content, unchanged empty baseline, existing regressions, and new source/rendered-output regressions in `scripts/daily-review.test.mjs`. The existing historical-score visibility test now expects 38 reviewed tools rather than 37 because OpenCode newly joins that explicitly caveated set; it is not an exemption or relaxed assertion. No renderer or checking policy changed.

Final local results on Nov18: build **356 pages**, SEO **pass**, strict content **0 errors / 0 warnings**, empty baseline **0 unexpected errors**, regression suite **15/15 pass**, and `git diff --check` **pass**. `npm audit --audit-level=critical` passes with the unchanged dependency tree; 22 high and 2 moderate advisories remain outside this content review. Programmatic comparison with main confirms both score objects, both 30-day cadences and all pre-existing changelog entries are unchanged. Workflow/checker/baseline/renderer code is unchanged.
