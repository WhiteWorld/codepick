# VibeKit — full documentary review, 2026-11-21 (Asia/Shanghai)

Official public sources were opened on **2026-11-21 (Asia/Shanghai)**. This is a documentary review of `data/tools/vibekit.yaml`, which had expired at `next_review_due: 2026-11-20` and was failing `content:check -- --strict` / baseline. It is not an installation, login, checkout, China-network test, privacy audit, security test, or a new scoring exercise.

Raw fetches (headers, bodies, extracted text, npm registry JSON, and the public plans API) are in `/workspace/codepick-evidence-2026-11-21/vibekit/`. A redacted copy of the public plans response is committed at `docs/research/fixtures/vibekit-plans-2026-11-21.json`. First HTML/docs fetches returned HTTP 200 at **10:28:24–10:28:25 CST**; later pages and the plans API were fetched **10:28:48–10:29 CST**. Header `date` values are GMT; times below are converted to Asia/Shanghai.

## Method and scope

Reviewed identity/status, public version signals, every current price/limit claim in the record, documented capabilities and platforms, setup, suitability and limitations, privacy, regional caveats, source provenance, and score provenance. Unknowns are left visible. Official marketing copy is not treated as a measured result.

Historical editorial scores are retained exactly (`coding_ability: 7`, `cost_efficiency: 7`, `flexibility: 6`, `china_friendly: 1`, `privacy: 5`). No new runtime experience supports changing them or calling them freshly benchmarked. The pricing notes state this in both languages. `confidence: medium` is unchanged and reflects source conflicts plus the absence of hands-on verification. The completed documentary review date is 2026-11-21; the unchanged 30-day cadence yields 2026-12-21. `review_frequency_days: 30` is now explicit in the record (it was previously omitted and already defaulted to 30 in updater scripts). This does not certify unknown runtime behavior.

This entry is **VibeKit at vibekit.bot**, not the unrelated `superagent-ai` npm package also named `vibekit`. Official [llms-full.txt](https://vibekit.bot/llms-full.txt) already makes that disambiguation.

## Sources opened

| Official source | Fetched / last-modified | What was used |
| --- | --- | --- |
| [Pricing](https://vibekit.bot/pricing) | 2026-11-21 10:28:24 CST | Plan limits, FAQ, add-ons, session/credit rules. Paid cards show “Loading price…” in static HTML. Visible amounts include $0, $0.50, $3, $8, $9.99, $20, $24.99, $25, $49.99. |
| [GET /api/v1/plans](https://vibekit.bot/api/v1/plans) (also on `app.vibekit.bot`) | 2026-11-21 10:29 CST; vendor `checkedAt` 2026-11-21 10:26:11 CST | Public unauthenticated JSON: Starter $9.99, Builder $24.99, Pro $49.99, plus included credits, workspace counts, top-up and session packs, Boost $8. Documented in SKILL.md as `GET /plans`. |
| [checkout-prices.js](https://vibekit.bot/public/checkout-prices.js) | 2026-11-21 10:29 CST | Pricing/home cards fetch `/api/v1/plans` and write `checkoutPricing.displayPrice`. If unavailable, the script falls back to “See price at checkout”. |
| [Homepage](https://vibekit.bot/) | 2026-11-21 10:28:24 CST | Product identity, iOS/Web/CLI/MCP surfaces, JSON-LD. SoftwareApplication offers omit paid `price` fields. Organization foundingDate 2026-01-19; support/privacy email info@vibekit.bot. App Store id 6760206636. |
| [SKILL.md](https://vibekit.bot/SKILL.md) / [docs](https://docs.vibekit.bot/) | 2026-11-21 10:28:24 CST; `Last-Modified` 2026-11-13 04:04:54 CST | Canonical API/docs, including the plans table, BYOK, CLI (`npm install -g vibekit-cli`), MCP, schedules, logs, badge, always-on, add-ons, and “no formal SLA”. Docs HTML is rendered from the same SKILL.md (byte-identical markdown). |
| [llms.txt](https://vibekit.bot/llms.txt) and [llms-full.txt](https://vibekit.bot/llms-full.txt) | 2026-11-21 10:28 CST | Pricing summary “accurate as of 2026-11”, surfaces, model-routing overview, and the npm name-collision warning. llms.txt still says `npm install -g vibekit`. |
| [Privacy](https://vibekit.bot/privacy) | 2026-11-21 10:28:24 CST; `Last-Modified` 2026-11-17 05:05:50 CST; effective date November 16, 2026 | BYOK credentials stored encrypted on vendor servers and in the agent runtime; Remote messages stored; GitHub-org fallback repo; US processing (us-east-2); OpenRouter data-discount; free-pool training exception; Analytics, Stripe, Apple, Twilio, Deepgram, etc. |
| [Terms](https://vibekit.bot/terms) | 2026-11-21 10:28:25 CST; `Last-Modified` 2026-11-10 02:13:15 CST; effective date November 3, 2026 | 20% platform markup on non-BYOK OpenRouter calls; paid tools via Composio still billed to VibeKit credits with the same markup; credit refund rules; auto-renewal; Apple vs Stripe cancellation; US export/sanctions; subdomain still described as `.vibekit.bot`. |
| [BYOK](https://vibekit.bot/byok-ai-agent), [Remote](https://vibekit.bot/claude-code-remote), [iOS agent](https://vibekit.bot/ios-ai-agent), [Deploy from phone](https://vibekit.bot/deploy-from-phone) | 2026-11-21 10:28:48–10:29 CST | Setup and marketing pages that repeat the current plan amounts and Remote pairing (`npx vibekit-agent link claude` / `codex`). |
| [US App Store listing](https://apps.apple.com/us/app/vibekit-ai-app-builder/id6760206636) | 2026-11-21 10:29 CST | “VibeKit - AI App Builder”; iOS 17+; iPhone/iPad/iPod touch; Version **1.5.3**, release timestamp 2026-11-17 15:56:40 UTC (2026-11-17 23:56:40 Asia/Shanghai). Description lists Starter $9.99 / Builder $24.99 / Pro $49.99 as auto-renewing Apple ID subscriptions. Schema.org offer price is 0 (free app). Other storefronts were not opened. |
| npm registry: [vibekit-cli](https://registry.npmjs.org/vibekit-cli), [vibekit-mcp](https://registry.npmjs.org/vibekit-mcp), [vibekit-agent](https://registry.npmjs.org/vibekit-agent), [vibekit](https://registry.npmjs.org/vibekit) | 2026-11-21 10:28:50–10:29 CST | Official packages homepage https://vibekit.bot, repos under `VibeKit-Bot`, MIT. Latest: cli **0.4.7** (2026-10-29 17:47:43 UTC), mcp **0.8.2** (2026-11-16 16:33:31 UTC), agent **1.8.4** (2026-11-03 20:10:14 UTC). Unrelated `vibekit` **0.0.4** (2025-10-01) is a sandbox SDK, also exposing a `vibekit` bin. npmjs.com HTML pages returned 403 from this fetch host; the registry JSON was used. |
| [GitHub org VibeKit-Bot](https://api.github.com/orgs/VibeKit-Bot) | 2026-11-21 10:29 CST | Org exists. The org repo list API returned 403 on this fetch (rate/auth), so individual repositories were not enumerated here; npm `repository` fields already name `vibekit-cli`, `vibekit-mcp`, and `vibekit-agent`. |
| [Status](https://vibekit.bot/status), [About](https://vibekit.bot/about), [Support](https://vibekit.bot/support), sitemap, llms-related well-known files | 2026-11-21 10:28:48–10:29 CST | Support and identity context. `/changelog` and `/security` returned 404. |

No account was created (`POST /auth/register` was documented but not called). No checkout, Apple IAP purchase, or authenticated dashboard was opened.

## Pricing and exclusions

The 2026-08-20 record is stale in several material ways: Builder was $19.99 with 3 hosted apps, 3 remote agents, 1 custom domain and 3 scheduled tasks; Pro included $20 credit; Free/Builder log retention was 1 hour / 24 hours; there was no Starter plan; workspaces were not a single shared cap.

Current public USD list prices, agreed by SKILL.md, llms docs, marketing pages, the US App Store description, and `GET /api/v1/plans`:

- Free $0; Starter $9.99/mo ($3 included credit, 3 workspaces, 1 always-on); Builder $24.99/mo ($20 credit, 5 workspaces, 2 always-on); Pro $49.99/mo ($25 credit, 10 workspaces, 3 always-on, 1GB + 0.5 vCPU, phone line included).
- Workspaces count hosted apps, agent chats, and Remote-paired computers together.
- Logs are 7 days on every plan. Schedules run on every plan: minimum interval 15 minutes, or 6 hours on Free.
- Free shows a platform-served “Built with VibeKit” badge; paid plans remove it.
- Add-ons and credit packs are recorded in the YAML note, including the leftover $14.99 always-on add-on limitation from SKILL.md.

Source conflicts kept visible rather than resolved by invention:

1. **Included credit expiry.** Pricing FAQ and SKILL.md: included credit resets monthly with no rollover. Terms (2026-11-03): it does not roll into a larger grant, but once granted it stays and does not expire while the account is active. In-account behavior was not checked.
2. **Top-up SKUs.** Pricing page / SKILL.md advertise $10 / $25 / $50. The public plans API also returns `sessionPacks` at $5 / $15 / $50. SKILL.md `POST /credits` still documents `sessions_10|sessions_30|sessions_100`.
3. **Paid plan amounts in JSON-LD / static cards.** Cards hydrate from the public plans API; schema.org paid offers have no `price`.
4. **Hostname.** Newer product docs: new apps at `.vibekit.page`, pre-November 2026 apps at `.vibekit.bot`. Terms still say `.vibekit.bot`.
5. **CLI package name.** SKILL.md: `vibekit-cli`. llms.txt / llms-full.txt: `npm install -g vibekit`, which would install the unrelated sandbox SDK.

Non-BYOK platform-credit inference has a documented **20% platform markup** via OpenRouter. BYOK is documented as zero markup and as bypassing OpenRouter. Optional paid tools are billed to VibeKit credits even with BYOK, default on when the account has credits, and also carry the current 20% markup. Consumed credits are generally non-refundable; unused purchased credits may be refundable within 30 days; promotional credits are not. Apple refunds and cancellation follow Apple’s terms. No formal SLA is published.

## Capabilities, setup, and limitations

Documented surfaces remain iOS app, web dashboard, CLI, REST API, and MCP. There is still no official native Android app. US App Store compatibility text lists iPhone, iPad, and iPod touch, and requires iOS 17 or later; that listing was not a device test.

The agent is a hosted persistent coding/ops agent per app (edit, logs, schedules, deploy), not IDE tab-completion. Model support is broader than the old “Claude (BYOK) / GPT (BYOK)” pair: official docs also describe Claude/ChatGPT subscription OAuth, platform-credit models via OpenRouter, and a free-model pool. Those lists were not inventory-tested, so the record does not pin unverified model IDs.

Setup guidance in the record now tells readers to install `vibekit-cli`, not `npm install -g vibekit`. Remote pairing uses `vibekit-agent`. BYOK keys are connected in the iOS/web app, not from the CLI, per SKILL.md. No installer or `vibekit auth` command was run.

Suitability emphasizes phone/web-driven hosted agents, the shared workspace cap, and BYOK or platform credits. Limitations now state clearly: no official Android app; US-region hosting; keys, app data, and Remote messages are processed or stored on vendor servers; Remote pairing is not a sandbox or zero-egress guarantee; free-pool and OpenRouter terms vary; no published SLA. Repo ownership marketing (“the repo lives on your GitHub account”) is narrower in the privacy policy: that is true if the user connected GitHub, otherwise the code can live in a private repository in VibeKit’s GitHub organization.

## Privacy and regional caveats

Privacy policy effective 2026-11-16 and terms effective 2026-11-03 were read in full enough to cover the claims in the record. Material points written into notes / `not_for` / `china_note`:

- Infrastructure is AWS Fargate **us-east-2**; access from outside the US involves transfer to and processing in the United States.
- BYOK credentials are stored encrypted in the vendor database and in the agent runtime credential store.
- Desktop/Remote messages pass through VibeKit servers and are stored; starting a new conversation hides earlier messages in the app but does not delete them; account deletion does.
- Anthropic and OpenAI are described as not training on API data for BYOK and platform-credit routes. OpenRouter may use non-BYOK prompts/responses to improve its product under a data-discount setting, and is said not to use that for model training. Free-pool operators set their own practices and may train. This is vendor documentation, not an independent certification.
- Google Analytics runs on marketing pages and the dashboard. Phone-line calls use Twilio and Deepgram transcription.
- Mainland China reachability and Stripe/Apple payment were not tested. Terms include US export-control and sanctions representations. The phone-line add-on is a US number.

`china_friendly: 1` and `privacy: 5` stay historical editorial values, not a new rating of these documents.

## Version

`current_version` stays `null`. There is no single public product version covering iOS, web, CLI, and MCP. The review records the US App Store 1.5.3 listing and the three official npm latest versions, with UTC publication times converted in this note, and does not promote any of them as a unified version. `version_tracked_at` is updated to 2026-11-21 to mark that this check happened.

## Score and confidence decision

Scores are unchanged and disclosed as historical editorial judgments. Confidence stays **medium**: official public prices and current limits were corroborated across several first-party sources, but Apple storefronts outside the US listing were not checked, several official documents disagree on included-credit rollover, top-up SKUs, the CLI package name, and the default hostname, and no hands-on run was performed. This is not a claim that every commercial path or runtime behavior was verified.

## What changed in the record

- Replaced the stale Free/Builder/Pro limits and added the Starter plan at $9.99.
- Corrected Builder to $24.99 and Pro included credit to $25; unified the workspace cap; updated log retention, schedules, always-on, add-ons, and email caps.
- Added bilingual notes, `not_for`, `quick_start`, `china_note`, changelog, explicit 30-day cadence, and official sources with `last_checked: 2026-11-21`.
- Advanced `last_full_review` to 2026-11-21 and `next_review_due` to 2026-12-21 only after this review.

Checker thresholds, baseline, and workflows were not changed as part of this data review. Test logic was not changed; only the historical-score disclosure set count was increased.

## Validation

Local checks on 2026-11-21 (Asia/Shanghai): `npm run build` **368 pages**, SEO **pass**, `content:check -- --strict` **0 errors / 0 warnings**, `content:check:baseline` **0 unexpected errors** (baseline still empty), related regression tests **pass**, `git diff --check` **pass**. Workflow, checker, and baseline files are unchanged.

`scripts/tool-pricing.test.mjs` already requires every tool whose pricing note contains “Historical editorial scores retained” to show that caveat on both language pages. VibeKit newly joins that set, so the expected count moves from 38 to 39. This follows the Nov18 OpenCode precedent and is not a relaxed assertion, exemption, or checker-policy change.
