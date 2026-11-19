# Gemini 4 model-compare research record

Checked: 2026-11-19 (Asia/Shanghai).

Scope: bilingual draft guides introducing the official Gemini 4 family and comparing it with one previous Gemini model and two current peer models. No paid or free API calls, no API keys, no CloudAgent, no PR.

## Site coverage

No existing CodePick guide or compare article is dedicated to the Gemini 4 model family. Mentions appear in:

- `data/tools/antigravity.yaml` and the Antigravity tool/compare pages (plan-dependent Carbon, Argon, Hydrogen; some pricing text may predate the 2026-11-19 plan pages).
- `data/tools/gemini-cli.yaml` (earlier note that Gemini CLI was not optimized for Gemini 4; not re-verified in this pass).

This article does not rewrite those entries. Placement: `guides` / `guides-en` (`gemini-4-models.md`), `article_type: explainer`, `draft: true`.

## Official Gemini 4 evidence

Gemini 4 is a published family, not a rumor. Official stable IDs:

- `gemini-4-argon` — announced 2026-09-30; developer/enterprise availability 2026-10-13
- `gemini-4-carbon` — announced 2026-10-28; broader paid/Ultra availability 2026-11-10
- `gemini-4-hydrogen` — announced 2026-11-12 (blog last updated 2026-11-16 in search snippets)
- `gemini-4-neon` — announced 2026-11-18

Primary sources opened or substantially read on 2026-11-19:

- https://aistudio.google.com/docs/models
- https://aistudio.google.com/docs/latest-model
- https://aistudio.google.com/docs/pricing
- https://aistudio.google.com/docs/rate-limits
- https://aistudio.google.com/docs/long-decode (from search + earlier fetch excerpts)
- https://aistudio.google.com/docs/models/gemini-4-hydrogen
- https://aistudio.google.com/docs/models/gemini-4-neon
- https://aistudio.google.com/docs/models/gemini-4-carbon
- https://aistudio.google.com/docs/models/gemini-3.8-flash
- https://aistudio.google.com/docs/whats-new-gemini-4-hydrogen
- https://aistudio.google.com/docs/whats-new-gemini-4-neon
- https://aistudio.google.com/docs/whats-new-gemini-4-carbon
- https://aistudio.google.com/docs/whats-new-gemini-4-argon
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
- https://gemini.google/subscriptions/
- https://one.google.com/about/google-ai-plans/

## Pricing notes

Developer API paid-tier USD / 1M tokens, 2026-11-19 pricing page:

- Hydrogen: $1.50 / $7.50, cached $0.075, free tier yes
- Neon: $3 / $15, cached $0.15, no free tier
- Carbon and Argon: $2 / $10 through 2026-11-30, $4 / $20 from 2026-12-01; cached $0.10 then $0.20; no free tier
- Output price includes thinking tokens
- Gemini 4: implicit cache only, 95% off; no explicit cache
- Batch: official 50% reduction; enqueued caps Carbon/Argon/Neon 5,000,000, Hydrogen 3,000,000
- Search grounding: 5,000 free/month shared across Gemini 3+, then $14 / 1,000, default 1,500 RPD on Developer API
- 3.8 Flash: $0.75 / $3.75 through 2026-12-31, $1.50 / $7.50 from 2027-01-01; 1,048,576 input / 65,536 output
- 3.1 Pro Preview: $2 / $12 <=200k, $4 / $18 >200k
- 2.5 Pro: unselectable in AI Studio; from 2026-12-01 requests to `gemini-2.5-pro` route to `gemini-3.8-flash` at 3.8 Flash rates

US consumer list prices from the Google AI plans comparison table:

- Plus $4.99, Pro $19.99, Ultra 5x $99.99, Ultra 20x $199.99
- Free and Plus: Hydrogen; Pro: Neon + Hydrogen; Ultra: highest Carbon, Neon, Hydrogen
- Current plan pages opened on 2026-11-19 do not name Argon; the 2026-10-13 Argon blog did for Pro/Ultra. Live menus were not opened.

## Peer models

- Claude Sonnet 5.5 (`claude-sonnet-5-5`): $2 / $10, 1M context, 128K max output, text+image input; cache hit $0.10. https://platform.claude.com/docs/en/models/sonnet-5-5/overview and pricing page.
- GPT-6.2 Sol (`gpt-6.2-sol`): short-context $2 / $10, cached $0.10; long-context (>272K input) $4 / $15 etc.; 1,050,000 context, 922,000 max input, 128,000 max output; text+image, no audio/video. https://developers.openai.com/api/docs/models/gpt-6.2-sol and pricing page.
- Mentioned only as anchors: Claude Opus 5.5 $4 / $20; GPT-6.2 Astra short-context $8 / $40.

## Unknown / not verified

- Vertex AI availability and prices
- Fixed Gemini 4 RPM/TPM tables (official page says check AI Studio)
- Flex/Priority dollar multipliers
- Implicit-cache minimum prompt length for every Gemini 4 ID
- Signed-in Gemini app / Antigravity model pickers (including whether Argon still appears)
- Regional non-US subscription prices
- Timezone of the Nov 30 / Dec 1 and Dec 31 / Jan 1 price changes
- Current Gemini CLI support for Gemini 4
- Fairwind eligibility
- Any independent benchmark, latency, or cost run
- Model card body text (cards are linked from model pages but were not opened as standalone documents)

## Benchmarks policy used in the article

Vendor-cited scores from Google blogs are described as vendor-reported or vendor-cited, with the Neon SWE-sweep 12.8% vs 39.0% Antigravity split as an example of non-comparable conditions. The article does not rank an absolute first.

## Local verification (2026-11-19 Asia/Shanghai)

Worktree: `/workspace/codepick-daily-2026-11-19/gemini4-work`
Branch: `docs/gemini-4-model-compare-2026-11-19` from `origin/main` `f27ed717`.
The earlier checkout at `/workspace/codepick-daily-2026-11-19/repo` was left on `docs/cursor-marketplace-extension-check-2026-11-19`.

Commands:

- `npm run build` — PASS, 364 pages
- `npm run check:seo` — PASS
- `npm run content:check -- --strict` — 0 errors, 0 warnings
- `npm run content:check:baseline` — PASS, 0 unexpected
- `node --test scripts/gemini-4-models.test.mjs scripts/guide-drafts.test.mjs scripts/cursor-marketplace-extension-check.test.mjs scripts/check-content.test.mjs scripts/daily-review.test.mjs` — PASS
- `git diff --check` — PASS

Draft behavior after build (unchanged site rules, not modified in this change):

- Direct routes exist: `/zh/guides/gemini-4-models/` and `/en/guides/gemini-4-models/`
- Omitted from guide listings and RSS
- Present in `dist/sitemap-0.xml` (known draft exposure; do not merge before review)
