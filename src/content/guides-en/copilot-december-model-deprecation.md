---
title: "GitHub Copilot is retiring 6 models on December 14. What should you switch to?"
description: "Checked 2026-11-20. GitHub will deprecate Claude Fable 5, Claude Haiku 4.5, Gemini 3.8 Flash, Gemini 4 Argon, Grok 4.6, and Kimi K3 across all Copilot experiences on 2026-12-14. Individual annual subscribers keep Claude Haiku 4.5. Kimi K3's suggested alternative has not been announced. This article did not test Copilot or call paid APIs."
date: "2026-11-20"
article_type: howto
tags: [copilot, model-deprecation]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "If I pay annually as an individual, can I ignore all six models?"
    a: |
      No. The changelog only says Claude Haiku 4.5 will remain available to individual GitHub Copilot subscribers on annual plans, and that this deprecation does not apply to those customers. The other five models have no such exception. The post also does not extend the exception to team or organization use, or to Business or Enterprise use of Haiku 4.5.
  - q: "What should I switch Kimi K3 to?"
    a: |
      The changelog lists the suggested alternative as “To be announced.” This article does not guess a replacement. Wait for a later official update.
  - q: "Which model ID should a repository search use?"
    a: |
      That changelog does not publish a model ID. Search the display names. Do not invent a lowercase hyphenated ID. The search method is in the model deprecation checklist.
  - q: "Will Business and Enterprise customers get the alternatives automatically?"
    a: |
      The changelog says that under default model enablement, the suggested alternatives are automatically enabled for Copilot Enterprise and Copilot Business customers unless an administrator has turned off the global default or explicitly disabled the model. If the global default is off, enable the alternatives through their model policies in Copilot settings. Once enabled, users will see the model in the Copilot Chat model selector in supported experiences. Workflows or integrations that still point at an old display name still need to be updated before 2026-12-14. This article did not open an admin console to verify those switches.
---

> Checked November 20, 2026 (Asia/Shanghai), against that day's GitHub [December model deprecation changelog](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/) and the [supported Copilot models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) page. Admin configuration is taken only from the wording on [Configuring access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models). We did not open an organization or enterprise console. This article did not sign in to Copilot, test a model picker or policy switch, or call paid APIs.

If a workflow, integration, or model selector still points at the six display names below, it will need a change by **2026-12-14**. The exception is Claude Haiku 4.5 for individual annual subscribers: the changelog says it will remain available to individual GitHub Copilot subscribers on annual plans, and that this deprecation does not apply to those customers. The other five models have no such exception. The changelog says GitHub will deprecate these models across all GitHub Copilot experiences, including Copilot Chat, inline edits, ask and agent modes, and code completions. The post does not give a time of day or a timezone for that date, and this article does not invent a cutoff minute in China time.

For the product and plan overview, see the [Copilot tool page](/en/tool/copilot/). This guide covers only the December 14 wave. For earlier waves, and for how to search a repository for pinned names or IDs, see the [model deprecation checklist](/en/guides/model-deprecation-checklist/). That checklist was last checked on 2026-10-22, earlier than this article. For Grok 4.5, follow the [supported-models page](https://docs.github.com/en/copilot/reference/ai-models/supported-models) opened on 2026-11-20. This article does not replace that checklist.

## The official table

The source is the [changelog dated November 13, 2026](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/). The date and the suggested alternatives follow that post. On the supported-models page opened the same day, the "Model retirement history" table had not yet added the 2026-12-14 wave, so that history table is not used here to confirm the replacements.

| Display name in the post | Deprecation date | Suggested alternative |
| --- | --- | --- |
| Claude Fable 5 | 2026-12-14 | Claude Fable 5.2 |
| Claude Haiku 4.5* | 2026-12-14 | Claude Haiku 5.5 |
| Gemini 3.8 Flash | 2026-12-14 | Gemini 4 Hydrogen |
| Gemini 4 Argon | 2026-12-14 | Gemini 4 Carbon |
| Grok 4.6 | 2026-12-14 | Grok 4.7 |
| Kimi K3 | 2026-12-14 | To be announced |

\*The changelog footnote: Claude Haiku 4.5 will remain available to individual GitHub Copilot subscribers on annual plans. The deprecation of Claude Haiku 4.5 does not apply to these customers.

That exception covers only Claude Haiku 4.5 for individual subscribers on annual plans. It does not cover the other five models. The post also does not extend it to team or organization use, or to Business or Enterprise use of Haiku 4.5.

For Kimi K3, the official suggested alternative is “To be announced.” This article does not guess a substitute.

Gemini 4 Hydrogen and Gemini 4 Carbon are official Gemini 4 names. For background, see [How to choose a Gemini 4 model](/en/guides/gemini-4-models/). This article does not repeat that comparison.

The changelog gives display names only. It does not publish a model ID. The ID is unknown. Do not invent a lowercase hyphenated ID in a repository or config file. If you need to search, search these display names. The method is in the [model deprecation checklist](/en/guides/model-deprecation-checklist/).

On the supported-models page opened on 2026-11-20, all six display names were still listed in the current availability table as GA. That is consistent with a deprecation that has not happened yet. Do not read this article as saying they are already gone.

## What individuals should change

The changelog asks you to update workflows and integrations to use the supported models before this date.

[Configuring access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) says that for individual Copilot plans, you can use AI models directly in Copilot without configuring access or managing policies. The same page says Copilot Free and Copilot Student only have access to auto model selection. This article did not check how those plans will reselect a model on the deprecation date, and “no policy setup is required” is not the same as “a workflow that still pins an old display name can stay unchanged.”

If you are an individual annual subscriber, the changelog says you can keep using Claude Haiku 4.5. The other five models still need a change where you use them; Kimi K3 still has no announced replacement.

After the models have been deprecated, the changelog says no action is required to remove them.

## What Business and Enterprise admins should check

Copilot Business and Copilot Enterprise cannot rely on the individual-plan path alone. The changelog describes default model enablement: the suggested alternatives are automatically enabled for those customers unless an administrator has turned off the global default or explicitly disabled the model. If the global default is off, enable the alternatives through their model policies in Copilot settings.

Once enabled, users will see the model in the Copilot Chat model selector in supported GitHub Copilot experiences.

[Configuring access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) also says that an enterprise or organization owner can enable or restrict access to specific models for members with a Copilot Enterprise or Copilot Business seat. Follow that documentation, and the pages it points to, for the actual steps. This article did not open an admin console and does not invent a click path.

The changelog encourages GitHub Enterprise customers with questions or concerns to contact their account team.

## Where the two official pages disagree

Keep the two pages separate. Do not merge them into one table.

- The December 14 date, the six display names, and the specific suggested alternatives (for example Gemini 4 Hydrogen, not a generic “latest Gemini” label) come from the [changelog](https://github.blog/changelog/2026-11-13-upcoming-deprecation-of-selected-github-copilot-models-in-december/).
- On the [supported-models page](https://docs.github.com/en/copilot/reference/ai-models/supported-models) opened on 2026-11-20, the current availability table still lists all six as GA. The Model retirement history on the same page includes the 2026-11-16 wave and earlier retirements, but it does not yet have rows for 2026-12-14. That history table often uses wording such as “Latest … model” for older waves. Do not substitute that generic wording for the changelog’s named alternatives.

The 2026-11-16 wave has already passed. For that wave and the earlier 2026-10-19 batch, see the [model deprecation checklist](/en/guides/model-deprecation-checklist/). That checklist was last checked on 2026-10-22, earlier than this article. The supported-models page opened on 2026-11-20 still lists Grok 4.5 as GA in the current availability table, and the retirement history has no Grok 4.5 row; for Grok 4.5, follow that page. This article does not change the checklist’s wording, does not repeat those tables, and did not reopen those older changelog posts.

## A short note if you switch to Fable 5.2

The supported-models page adds a footnote for Claude Fable 5, Claude Fable 5.1, and Claude Fable 5.2: by default, Anthropic retains data, including prompts and outputs, to operate safety classifiers that detect harmful use. The same footnote describes a time-bound exemption for requesting zero data retention (ZDR) through the end of 2026, and it says an administrator must still enable each model. This article did not verify who is eligible, and it did not check whether an administrator has enabled these models. Read the official footnote if that matters for you. This is not a privacy or compliance review.

## What this article did not verify

- It did not sign in to GitHub or Copilot, change an account or policy, or inspect a live model picker.
- It did not call paid APIs, and it did not run a live switchover test.
- It did not invent Copilot model IDs.
- It did not verify Fable ZDR eligibility or admin enablement.
- The supported-models retirement history, checked on 2026-11-20, had not yet listed the 2026-12-14 wave. If the documentation is updated later, follow the page as it stands then.
