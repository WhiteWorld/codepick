# Two bilingual guide drafts — 2026-11-18

Sources checked on **2026-11-18 (Asia/Shanghai)**. These are complete editorial drafts for the requested dig review, not articles approved for production publication. They are documentary explanations with bounded offline checks, **not hands-on provider or OpenCode enforcement reviews**.

## Scope and publication boundary

- Chinese/English pair `deepseek-pdf-flowchart-parsing` explains whole-document ingestion. It complements `deepseek-v4-flash-vision-guide`, which covers individual images; it does not repeat the API-platform comparison.
- Chinese/English pair `opencode-2-permission-rules` explains config resolution and permission failures. It links the existing OpenCode tool record rather than duplicating subscription/model data.
- All four files have `draft: true`, mirrored metadata, an explicit review-draft notice and the same evidence/limitations in both languages.
- No existing article, tool/API/plan data, score, review date, cadence, baseline, renderer, workflow or dependency manifest is changed.
- **Existing repository behavior:** draft guides are excluded from guide listings and RSS, but `src/pages/{zh,en}/guides/[slug].astro` still generates their direct routes. The sitemap plugin also includes generated routes. The draft flag is therefore not access control or a production publication gate. Keep this branch unmerged until editorial approval; a preview build exposes the four direct review URLs. We did not change routing or deploy anything. A stronger global draft-publishing rule would be a separate change.

## DeepSeek evidence and decisions

| Official page | Facts used and boundaries |
| --- | --- |
| https://api-docs.deepseek.com/updates | November 13, 2026 application API release includes file input. This supplies timing, not measured accuracy. |
| https://api-docs.deepseek.com/guides/document_parsing | `text_recognition` drops figures; `rich_layout_recognition` adds automatically cropped figures at their original positions. Missing detections remain invisible. No guarantee of complete diagrams or reliable model-generated page citations is invented. |
| Same File Parsing page | Parsing occurs during upload; the file ID is returned after success. No documented async parsing-job polling/status flow. A client disconnect does not cancel parsing; successful results are stored, billed and appear in `GET /files`. Do not equate a disconnected client with a server-confirmed failed parse. |
| Same File Parsing page | `purpose` before `file`; parsed documents are referenced by ID only, using `file`, `input_file` or `document` blocks depending on API. Messages requires the Files beta header. Do not insert parsed documents into image blocks. |
| Same File Parsing page | 100 MiB / 1000 pages per parsed document; 120s upload, 120s parsing after submission; 15 concurrent document uploads/account, separate from OCR. Chat: 20 documents, 8 MiB parsed text; duplicate references count separately. Cropped figures count as images/input tokens. Full parsed content remains in multi-turn context; overlength returns 400, not silent truncation. Error meanings are copied without inventing retry success. |
| https://api-docs.deepseek.com/guides/files_api | Expiration fields are paired; `created_at` anchor, 3600–2592000 seconds. Omission retains permanently. Example intentionally chooses 86400 seconds. Account keys share account files; originals and parsing results cannot be downloaded. Listing supports pagination, not a parsing-job lifecycle. Filename/size/time reconciliation is our cautious workflow suggestion, not an idempotency guarantee. |
| https://api-docs.deepseek.com/quick_start/pricing | USD $0.225 / 1000 pages for parsing/OCR as checked. Successful uploads incur page charges; chat input/output have separate token charges. $0.0225 for 100 pages is arithmetic, not a receipt or total task budget. No full token-rate table or future price promise is added. |

The chosen client timeout `--max-time 300` is illustrative, not a vendor SLA. The sample acceptance document and manual page checks are a proposed future evaluation, not executed API tests. No real file was uploaded, list endpoint called, account inspected, model queried, bill observed or secret read. The fake `file-api-REPLACE_WITH_RETURNED_ID` must be replaced by readers. Prompts ask for page numbers only to aid human checking, not to claim reliable provider citations.

## OpenCode evidence and decisions

| Official page | Facts used and boundaries |
| --- | --- |
| https://opencode.ai/docs/config/ | Ordinary config searches cwd to root, merges direct files farthest-to-closest then `.opencode` files likewise; system and macOS managed values outrank user/project values. This ordinary-value order is not falsely reused as policy authority order. |
| https://opencode.ai/docs/permissions/ | Native V2 uses ordered `permissions` rules with `action/resource/effect`; allow/deny/ask; last match, not specificity; `*` includes slash, `?` one character; trailing shell ` *` also matches the argument-free command. Multi-resource deny/ask aggregation, default broad allow with `.env` exceptions, default external-directory allow, own subagent permissions and saved-approval limitations are documented. |
| Same Permissions page | `~`/`$HOME` expansion applies to path-oriented actions, not raw shell text. Shell retains host filesystem/process/network authority; directory inference is best-effort. A `git push *` rule is not a complete exfiltration/network barrier. Reviewer edit/shell denials do not certify all MCP/plugin side effects are blocked. |
| https://opencode.ai/docs/policies/ | Policies are binary and only tighten ordinary checks. Invalid statements are dropped with a server-log warning. Last match within a file; authority order is MDM, system, connected Console, global, direct configs, `.opencode` configs; outer directories outrank inner within the latter categories. Console refresh/disconnect/unreachable behavior is documentary, not observed. |
| Same Policies page | A final matching tool policy allow can override earlier matching policy denials after authority/order, but does not grant ordinary permission. Actions added in 2.2.3 and `websearch.use` in 2.2.6 need sufficiently recent clients. Legacy prefixed `integration.use` converts; bare `*` no longer means deny all MCP/skills/plugins. Policies do **not** sandbox plugin code. |
| https://opencode.ai/docs/migrate-v1/ | Supported legacy configuration remains supported; valid native V2 canonical values take precedence when both forms coexist. The guide does not tell readers to delete all V1 fields. |
| https://opencode.ai/config.json | Public Draft 2020-12 schema validates the three native configuration examples in each language. Only relevant unmodified properties/transitive definitions are retained in the fixture; root scope is intentionally restricted to the properties demonstrated. This is shape validation, not the CLI runtime loader. |
| https://git-scm.com/docs/git-diff | `--output` writes a file; external diff and textconv can run programs. Example uses an exact diff command with `--no-ext-diff --no-textconv`, not a claim that `git diff *` is read-only. Even exact commands do not establish host-process isolation. |

### Explicit official-document ambiguity

On the check date, Permissions → Scanner displayed a configuration shaped like `{"policies":[{"permissions":[...]}]}`. The same day's public schema and Policies page require policy statements with `action`, `resource`, `effect`; offline Draft 2020-12 validation rejects the nested example. The guide discloses this discrepancy and uses only the schema-valid native form. **We did not run OpenCode to determine whether it accepts some legacy/compatibility form, nor observe an actual server warning.** The documented invalid-statement warning is not passed off as a local log observation.

This is a dated V2 documentary snapshot, not a compatibility guarantee for a particular installed binary, shell scanner, Console account or plugin. No OpenCode package was installed or run; no inference/key was needed. The shell allowlist's two Git commands were run only in an isolated synthetic repository with global/system Git config disabled, no remote, no commit and no push.

### Schema provenance

- File: `docs/research/fixtures/opencode-permissions-schema-2026-11-18.json`.
- Source: https://opencode.ai/config.json fetched as public JSON using the public-page fetch tool after direct urllib received HTTP 403. No account/session was used.
- Complete source JSON canonical hash: `f21924d8d9b01003c18fe41f2c717b93445bea37ba140b36b0d753f4775d80e2` (SHA-256 of UTF-8 `json.dumps(source, sort_keys=True, separators=(',', ':'))`; **not** an HTTP byte hash).
- Extracted properties: `$schema`, `permissions`, `policies`, `agents`. Transitive definitions: `Permission.Ruleset`, `Permission.Rule`, `Permission.Effect`, `Config.AgentEncoded`. Property/definition contents are unchanged; root is narrowed and an attribution comment added. Local validation has no remote `$ref` resolution.

## Reproduction

The Python validator is isolated tooling, not a new application dependency. Install it in a temporary virtual environment; after installation the tests make **no network requests**:

```sh
python3 -m venv /tmp/codepick-guide-check
/tmp/codepick-guide-check/bin/pip install 'jsonschema==4.25.1'
/tmp/codepick-guide-check/bin/python scripts/check-guide-examples.py
npm run build
npm run check:seo
npm run content:check -- --strict
npm run content:check:baseline
node --test scripts/check-content.test.mjs scripts/tool-pricing.test.mjs scripts/terminal-agent-access.test.mjs scripts/daily-review.test.mjs scripts/guide-drafts.test.mjs
git diff --check
```

Python's six tests check all six OpenCode examples against the schema extract, reject policy `ask` and the ambiguous nested Scanner shape, inspect DeepSeek request fixtures, syntax-check/sample curl arguments through a **fake curl executable only**, and verify exact Git flags in a disposable fake repository. These are not tests of either vendor's server, model, permission matcher, scanner, context billing or recovery.

The Node regressions check mirror metadata/examples/sources, important caveats, built review copies, local cross-links, and absence from guide listings/RSS. They do not claim to automatically prove translation quality or every editorial fact. dig should review both full language versions and the source interpretation.

## Reviewer checklist for dig

1. Does the Chinese read plainly, without turning documented limits into tested outcomes? Does English preserve every limitation and the same practical advice?
2. DeepSeek: distinguish lost figures, failed figure detection and model mistakes; no invented status polling. Check multipart order, account retention, timeout reconciliation and separate parsing/token charges.
3. OpenCode: ordinary settings, permission order and policy authority remain distinct. Check subagent independence, default external-directory allowance, approval behavior and version gates.
4. Inspect the Scanner/schema conflict directly before approving wording. Do not infer runtime rejection merely from schema rejection.
5. The `git push *` denial is intentionally not advertised as a complete push/network block; exact Git inspection examples are not a process sandbox.
6. No benchmark, hands-on model accuracy, bill, regional connectivity, privacy compliance or runtime security guarantee is claimed. No promotional links, score changes, fake review dates or softened gates.
7. Leave drafts unmerged/unpublished until the requested review is accepted; `draft: true` alone does not hide direct routes in the current renderer.

## Initial draft validation results (2698280)

Completed on 2026-11-18 (Asia/Shanghai), using Node v22.20.0, Python 3.13.5, Git 2.47.3:

- `npm run build`: passed, **360 pages** (four added direct draft review routes; production branch remains unchanged).
- `npm run check:seo`: passed.
- `npm run content:check -- --strict`: **0 errors, 0 warnings**.
- `npm run content:check:baseline`: **0 current / 0 approved / 0 unexpected errors**.
- Existing plus new Node regressions: **21/21 passed**.
- `scripts/check-guide-examples.py` with isolated `jsonschema==4.25.1`: **6/6 passed**.
- Additional one-time validation against the **complete** captured upstream schema (not just the committed extract): all **6/6 configuration examples** passed.
- `npm audit --audit-level=critical`: passed (exit 0); existing **22 high / 2 moderate** advisories remain, with no dependency changes. No audit fixes or upgrades were applied.
- `git diff --check` / staged diff whitespace check: passed. Unchanged `data/`, checker scripts, baseline, existing content, rendering/routes, dependency manifests and CI workflow verified against live `origin/main` at `40f335e2f065cb5e08825eb31726fe960817532f`.

No live API call, upload, provider account, OpenCode runtime or push-as-test was involved. The eventual normal branch push transports these requested drafts only; it is not an enforcement test or a production merge.

## dig review follow-up — 2026-11-18 (Asia/Shanghai)

Independent review of head `2698280` identified an ambiguous timeout-recovery step. Reopened official [File Parsing](https://api-docs.deepseek.com/guides/document_parsing), [Files API](https://api-docs.deepseek.com/guides/files_api), [Policies](https://opencode.ai/docs/policies/) and [Permissions](https://opencode.ai/docs/permissions/) for this correction.

- Both DeepSeek drafts now require waiting while the disconnected request may still be processing, then reconciling the paginated stored-file list. An empty list or missing file does not prove failure; no fixed delay establishes failure either. Unresolved retries require a person's explicit acceptance of duplicate-upload/possible duplicate parsing charges. This is a **documentation-derived risk**, not an observed duplicate bill. No invented async task or progress API was added.
- The same upload request waits for parsing completion before returning; the heading/sequence now says so directly.
- Retention configuration is not a guarantee about training use, backup erasure or compliance. No deletion procedure or untested cleanup guarantee was added.
- Both OpenCode drafts now state that policy `allow` overrides earlier matching denials only when it is the final match after source authority and statement ordering, not based on specificity. The ask fallback is qualified by other overriding rules and applicable saved approvals.
- Two content/build regression tests guard these qualifications. Existing request/configuration examples and schema fixture are unchanged. No vendor API, permission runtime, lifecycle/deletion operation or billing test was run.

Follow-up validation: `npm run build` passed (360 pages); SEO passed; strict content check **0 errors / 0 warnings**, unchanged baseline **0**; all Node regressions **23/23 passed** (including the two new guards); Python offline examples **6/6 passed**; `git diff --check` passed. No dependency or CI/gate changes. The original limitations and unmerged publication boundary still apply.
