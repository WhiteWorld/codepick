---
title: "Why did DeepSeek miss the flowchart in your PDF requirements?"
description: "Check the parsing purpose and figure extraction before changing models. A documented workflow for PDF uploads, file references, timeout recovery and separate parsing/inference charges."
date: "2026-11-18"
article_type: howto
tags: [deepseek, api, pdf, workflow]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

> Sources checked on November 18, 2026 (Asia/Shanghai). We checked official documentation and examples offline. We did not upload real files, call a model or verify a bill.

The model can repeat the requirements text, but misses the arrow from “rejected” back to “resubmit.” Before changing models or asking it to guess, **check the upload's `purpose`, then whether that figure reached the context at all.**

DeepSeek's [November 13 update](https://api-docs.deepseek.com/updates) opened file input and other application APIs. This guide covers whole PDF, Word and PowerPoint documents through the API, not the web chat interface. For individual images, see our [vision guide](/en/guides/deepseek-v4-flash-vision-guide/).

## 1. Text extraction is not figure extraction

[File Parsing](https://api-docs.deepseek.com/guides/document_parsing) documents two purposes:

| Upload purpose | What reaches the model | Requirements use case |
| --- | --- | --- |
| `text_recognition` | Extracted text; charts, photos and diagrams are dropped | Clauses, headings and text-only questions |
| `rich_layout_recognition` | Text plus automatically cropped figures inserted at their original positions | Flowcharts and architecture diagrams |

The second option does not guarantee every figure is included. The documentation explicitly warns that automatic cropping can miss figures. An undetected figure remains invisible to the model. Extracted labels alone do not prove that arrows, branches and legends survived.

A useful first question is “Which nodes and edges are in the diagram on page 3?” Ask for an implementation only after checking the answer. Treat missing details as unresolved, not as an invitation to invent them.

## 2. The same upload request waits for parsing to finish before returning

The documented sequence is:

```text
POST /files (purpose before file)
  → same request waits for parsing to finish → ready-to-reference file_id returned only on success
  → server-confirmed parsing failure → not stored, no parsing charge
  → client disconnect → reconcile outcome; do not assume failure

file_id → chat request reference → model receives parsed content
```

**Do not invent a `processing → completed` polling loop.** `GET /files` lists stored files; it is not a parsing-job progress endpoint.

The following is an example for readers, not an execution transcript. Running it uses a paid API: confirm your budget and permission to upload the data first. Use a synthetic, non-sensitive `requirements-demo.pdf`. Pass the key through an environment variable, not a file committed to the repository.

```bash
curl --fail-with-body --max-time 300 https://api.deepseek.com/files \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -F 'purpose=rich_layout_recognition' \
  -F 'expires_after[anchor]=created_at' \
  -F 'expires_after[seconds]=86400' \
  -F 'file=@requirements-demo.pdf'
```

Keep these details:

- `purpose` must precede `file`. Sending PDF, Word or PowerPoint with `user_data` returns 400.
- This example retains the file for 86400 seconds, or 24 hours. Supply both `expires_after` fields together. The documented range is one hour to 30 days; omitting both retains the file permanently.
- `--max-time 300` is this example's chosen total client timeout, not a service guarantee. The documented document-upload limit is 120 seconds, plus up to 120 seconds of parsing after submission. Both the client and intermediate proxies need to allow for upload and parsing.
- `--fail-with-body` makes HTTP errors fail while keeping the error body. Do not treat an error JSON response as a successful upload.

Files belong to the account and are shared by API keys under that account. Keep your local original: neither the uploaded original document nor its parsing result can be downloaded. This retention setting is not a guarantee about training use, backup erasure or compliance. See [Files API](https://api-docs.deepseek.com/guides/files_api) for formats and storage rules.

## 3. Reference the returned ID in the right message block

Save this as `request.json`. Replace the placeholder with the upload response's `id`, not a local filename or public URL.

```json
{
  "model": "deepseek-flash",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "file",
          "file_id": "file-api-REPLACE_WITH_RETURNED_ID"
        },
        {
          "type": "text",
          "text": "List the flowchart nodes, labeled edges and rejection paths page by page, with page numbers. Separate observed content from inferences. Mark anything unreadable or unseen as unconfirmed; do not invent missing edges."
        }
      ]
    }
  ]
}
```

Then send the file:

```bash
curl --fail-with-body https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

Do not mix the document blocks used by different APIs:

| API | Document block |
| --- | --- |
| Chat Completions | `{"type":"file","file_id":"..."}` |
| Responses | `{"type":"input_file","file_id":"..."}` |
| Anthropic Messages | `{"type":"document","source":{"type":"file","file_id":"..."}}` |

Anthropic Messages also requires `anthropic-beta: files-api-2025-04-14`. Parsed documents cannot go in an image block. These documents support `file_id` references only, not inline document contents or document URLs.

Asking for page numbers helps manual checking. **It is not an API guarantee of accurate page citations.** Check even a confident “page 3” against the original PDF.

## A timeout calls for reconciliation, not an unconditional retry loop

A disconnected client does not cancel parsing. According to the documentation, parsing continues; if it succeeds, the file is stored, billed and appears in `GET /files`. Failed uploads are not stored and incur no parsing charge.

A cautious recovery sequence:

1. Record the purpose, filename, size and start time. Do not log sensitive document contents.
2. While the original request may still be processing, wait rather than re-upload immediately. The documented upload and parsing limits help investigation, but a fixed waiting period cannot prove that the original request failed.
3. After waiting, reconcile stored files using the [Files API listing](https://api-docs.deepseek.com/guides/files_api#list-files). It is paginated; do not inspect only the first page. **An empty list or missing file does not prove the original request failed**: parsing may still be in progress, and the file appears only after success.
4. Reconcile against your recorded metadata. A matching filename does not establish matching contents or provide an official idempotency guarantee. Ask a person to resolve ambiguous matches.
5. If the original outcome is still unresolved, do not automatically re-upload. If another upload is necessary, a person must explicitly accept the duplicate-upload and possible duplicate parsing-charge risk before deciding to proceed.

This risk is inferred from the documented behavior that disconnects do not cancel parsing and files enter the stored-file list only after success. It is not an observed duplicate charge here, and it does not imply another job-progress endpoint.

| Response | First checks |
| --- | --- |
| 400 | Purpose, form order, format and password protection; changing the model is not a fix |
| 408 / 504 | Upload timeout / parsing timeout respectively; follow the actual error details |
| 413 | File-size limit |
| 429 | Document-upload concurrency: 15 per account, separate from chat concurrency |
| 500 / 503 | Incomplete parsing / busy service; keep the error details before deciding when to retry |

## Successful upload does not mean the document fits every conversation

As checked, parsed documents have a **100 MiB, 1000-page** per-document limit. A chat request can contain at most **20 documents**, with up to **8 MiB of total parsed text**. Repeated references to the same ID count separately toward the document count.

Cropped figures also count toward image limits and input tokens. Full parsed content remains in context across conversation turns; it does not automatically become a free summary. Exceeding the context limit returns 400 rather than silently truncating the document.

For large requirements, consider splitting locally by feature or chapter and sending only relevant sections. This is our workflow suggestion, not a claim of automatic provider chunking. Check whether splitting separates cross-page arrows from their legends.

## Separate the two charges

On November 18, 2026, the [pricing page](https://api-docs.deepseek.com/quick_start/pricing) lists **file parsing / OCR at $0.225 per 1000 pages, in USD**.

- Parsing: one page-based charge per successful upload. Re-uploading is a new upload, not reuse.
- Inference: parsed text and cropped figures are charged as model input tokens when referenced; output costs extra. Reusing a `file_id` avoids another parsing charge, not that request's model charges. Check the pricing page for cache and peak/off-peak rates.

An arithmetic example only: 100 pages × $0.225 / 1000 = **$0.0225 in parsing charges**. This is not a measured bill and excludes tokens for any conversations.

Text files such as TXT, source code, CSV and JSON use `user_data` and have no parsing charge. See File Parsing for spreadsheets and ebooks. This does not make inference free, and renaming a PDF does not turn it into a text file.

## Run a small acceptance check before handing requirements to a coding agent

Make a synthetic two-page PDF. Put three fields on page 1, and a flowchart with “approved / rejected” branches and an easy-to-miss return arrow on page 2.

- Upload it with each purpose and record the IDs and parsing charges. This is a proposed future acceptance check, not one we performed.
- Ask the same questions: what are the three fields, which nodes exist, where does rejection return, and what is unreadable?
- Check each answer against the original. Investigate purpose and cropping limits first when a figure is missing. The model saying “I read everything” is not acceptance evidence.
- If needed, export a key page or figure locally as a supported image and submit it separately using the [vision guide](/en/guides/deepseek-v4-flash-vision-guide/). Re-check the result; this adds calls and token costs.
- Give the coding agent only rules a person has confirmed. Keep unresolved branches as questions rather than guessed business logic.

Our offline checks cover request JSON, curl syntax, field order and example consistency. **They do not establish figure extraction quality, page-reference accuracy, timeout recovery outcomes or actual charges.** Those require an authorized small-sample API test.

### Official sources (checked November 18, 2026, Asia/Shanghai)

- [November 13 application API update](https://api-docs.deepseek.com/updates): release context for file input.
- [File Parsing](https://api-docs.deepseek.com/guides/document_parsing): purposes, synchronous parsing, message blocks, limits, errors and billing mechanics.
- [Files API](https://api-docs.deepseek.com/guides/files_api): upload fields, expiration, pagination, account sharing and download limitations.
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing): USD parsing and model-token charges. Prices may change.
