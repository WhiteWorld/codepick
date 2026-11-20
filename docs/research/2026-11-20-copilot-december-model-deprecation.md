# Copilot December 14 model deprecation — 2026-11-20

Official public sources checked on **2026-11-20 (Asia/Shanghai)**. This is a documentary howto for the December 14, 2026 GitHub Copilot model deprecation wave. It is not a live Copilot test, a policy-console walkthrough, or a paid API call.

## Scope

- New bilingual guide: `src/content/guides/copilot-december-model-deprecation.md`
- English mirror: `src/content/guides-en/copilot-december-model-deprecation.md`
- Publication date is 2026-11-20. Keep `draft: true` until dig review has no blockers and the article is enabled for publication.
- The existing guide `model-deprecation-checklist` (last verified 2026-10-22) is cross-linked and is not rewritten. Review dates, tables, and wording on that checklist are left unchanged.
- No tool YAML, scores, review cadences, strict-check baselines, or renderer behavior are changed.

## Evidence

Raw fetches (HTML, response headers, and timestamps) are in `/workspace/codepick-evidence-2026-11-20/`. All three official pages returned HTTP 200 with no redirect.

| Official source | Fetched | Verified statement used in both articles |
| --- | --- | --- |
| [Upcoming deprecation of selected GitHub Copilot models in December](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/) (changelog dated November 13, 2026) | 2026-11-20 10:19:30+0800 | GitHub will deprecate six models across all GitHub Copilot experiences (including Copilot Chat, inline edits, ask and agent modes, and code completions) on December 14, 2026: Claude Fable 5 → Claude Fable 5.2; Claude Haiku 4.5* → Claude Haiku 5.5; Gemini 3.8 Flash → Gemini 4 Hydrogen; Gemini 4 Argon → Gemini 4 Carbon; Grok 4.6 → Grok 4.7; Kimi K3 → To be announced. Footnote: Claude Haiku 4.5 remains available to individual GitHub Copilot subscribers on annual plans; the deprecation does not apply to these customers. Update workflows and integrations before this date. Under default model enablement, suggested alternatives are automatically enabled for Copilot Enterprise and Copilot Business customers unless an administrator has turned off the global default or explicitly disabled the model. If the global default is off, enable alternatives through their model policies in Copilot settings. Once enabled, users see the model in the Copilot Chat model selector in supported experiences. No action is required to remove the models after they have been deprecated. GitHub Enterprise customers with questions are encouraged to contact their account team. The post uses display names only; it does not publish model IDs. The post does not give a time of day or timezone for December 14. |
| [Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models) | 2026-11-20 10:19:31+0800 | All six departing display names were still listed as GA in the current availability table, which is consistent with a future deprecation. The "Model retirement history" table listed the 2026-11-16 wave (Claude Opus 4.8, Claude Opus 5, GPT-5.6 Terra) and earlier retirements, but had **no 2026-12-14 rows**. Older history rows often use generic alternatives such as "Latest Claude Opus model". A footnote on Claude Fable 5 / 5.1 / 5.2 describes default Anthropic data retention for safety classifiers and a time-bound ZDR exemption through the end of 2026; the articles cite this only as a short, attributed caveat and do not claim ZDR eligibility or admin enablement was verified. |
| [Configuring access to AI models in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) | 2026-11-20 10:20:21+0800 | For individual plans, models can be used directly without configuring access or managing policies. Copilot Free and Copilot Student only have access to auto model selection. An enterprise or organization owner can enable or disable access to AI models for members with a Copilot Enterprise or Copilot Business seat. The page does not, by itself, give a click-by-click path; the articles do not invent one. |

### Difference from the pre-fetch brief

Today's re-fetch of the November 13 changelog and the supported-models page matched the brief: same six rows, same dates, same suggested alternatives, same Haiku annual-plan footnote, same "To be announced" wording for Kimi K3, same current-table GA listing, and the same missing December 14 rows in retirement history. No factual correction was required.

The changelog HTML also shows a "Retired" label near the post date. This is treated as a GitHub changelog category, not as a claim that the six models are already gone. The body is an upcoming deprecation on December 14, 2026. The articles do not use the category label.

### Decisions

- Write a new focused guide instead of updating `model-deprecation-checklist`. Updating the old checklist alone would not count as today's new article, and the task forbids moving that checklist's review dates.
- Use changelog display names and suggested alternatives verbatim. Do not replace them with the supported-models history table's generic "Latest … model" wording.
- Leave Copilot model IDs as 未知 / unknown. Readers are told to search the display names, and are sent to the existing checklist for the search method.
- State the Haiku 4.5 exception as individual annual subscribers only. The changelog does not extend it to the other five models, or to team / Business / Enterprise use of Haiku 4.5.
- Leave Kimi K3's alternative unknown. Do not suggest a substitute.
- Cross-link the checklist, the Gemini 4 guide (only as context that Hydrogen and Carbon are official Gemini 4 names), and `/tool/copilot/`. The billing guide is not linked, because this article does not discuss prices or credits.
- Mention briefly that the 2026-11-16 wave has already passed, then send readers to the checklist. Those older tables are not copied. The October 15 and October 19 changelogs were not reopened for this article.
- Include a short Fable data-retention caveat, clearly attributed to the supported-models footnote, so readers switching to Fable 5.2 are not surprised. The article is not a Fable privacy essay.

### Observed but unused

The 2026-11-20 supported-models availability table still lists Grok 4.5 as GA, and the retirement history on that page does not include a Grok 4.5 row. The existing checklist, last verified 2026-10-22, attributes a 2026-10-19 Copilot deprecation of Grok 4.5 to a changelog that was not reopened today. This was not used in the new articles, and the old checklist was not edited.

## Unknowns and evidence boundaries

- No live Copilot, model-picker, or policy-console test. No GitHub or Copilot sign-in, and no account or policy changes.
- No paid API calls.
- No invented Copilot model IDs.
- No verification of Fable ZDR eligibility or administrator enablement.
- The official December 14 date has no published hour or timezone; the articles do not invent a China-time cutoff.
- How Copilot Free / Student auto model selection will behave on the deprecation date is unknown.
- The supported-models retirement history, checked on 2026-11-20, had not yet listed the December 14 wave.


## Dig follow-up (f6f1219)

dig independently reviewed `f6f1219660efa1af04177367412a47338ec27b3c` and found no content blockers, with three non-blocking suggestions. The three official pages were opened again on **2026-11-20 (Asia/Shanghai)** before the wording was changed. The changelog footnote still limits the Claude Haiku 4.5 exception to individual GitHub Copilot subscribers on annual plans. The configure-access page still talks about an organization or enterprise and Copilot Business / Copilot Enterprise seats; it does not use a plan name equivalent to a bare “团队 / team.” The supported-models page still lists Grok 4.5 as GA in the current availability table, and the Model retirement history still has no Grok 4.5 row (the 2026-10-19 history rows are Gemini 3.7 Flash, GPT-5 mini, GPT-5.4, GPT-5.4 mini, and GPT-5.5). The existing checklist was not edited.

Changes in the new bilingual guide only:

1. The lead now states the individual annual Haiku 4.5 exception, and that the other five models have no such exception.
2. “团队 / team” in the exception-scope sentences is now “团队或组织使用 / team or organization use,” so it is not read as an official plan name. “客户团队 / account team” is unchanged.
3. Cross-links to the 2026-10-22 checklist now say that check date is earlier than this article, and that Grok 4.5 follows the supported-models page opened on 2026-11-20. The articles do not rewrite the checklist and do not reopen the older changelogs.

`draft: true` is unchanged.

## Local check commands

These are valid while the guides remain `draft: true`. Listings and RSS correctly omit the draft. The current site still builds draft guide HTML (getStaticPaths does not filter `draft`) and the sitemap plugin therefore emits those URLs; the lastmod helper skips drafts, but that does not drop the URL. This existing build behavior was not changed. Do not treat sitemap presence as publication, and do not weaken the SEO check to hide it.

```sh
npm run build
npm run content:check -- --strict
npm run content:check:baseline
# SEO: run only after build. If it fails only because drafts are unpublished, record that and do not weaken the check.
npm run check:seo
node --test scripts/copilot-december-model-deprecation.test.mjs
git diff --check
```
