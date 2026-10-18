---
title: "DeepSeek Vision: Use deepseek-flash, the Experimental Vision Model Is Retired"
description: "Rechecked on 2026-10-18 against the official Vision guide and pricing page. Image input goes through deepseek-flash (V4.1-Flash-1017). deepseek-v4-flash-vision-exp is retired. The name is still accepted and served by the latest Flash. V4-Pro has no vision."
date: "2026-10-18"
updated_at: "2026-10-18"
article_type: howto
tags: [deepseek, deepseek-v4, vision, multimodal, api]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

Checked on **2026-10-18**. Pages opened that day:

- [Vision guide](https://api-docs.deepseek.com/guides/vision)
- [Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Changelog](https://api-docs.deepseek.com/updates)
- [News post, 2026-09-10](https://api-docs.deepseek.com/news/news260910)

An older draft treated `deepseek-v4-flash-vision-exp` as the current model, and said the V4 family had three public models and that Flash had been updated to V4-Flash-0731. Those three claims are out of date.

## How image input works now

On the pricing page, `deepseek-flash` has vision checked. The version is **DeepSeek-V4.1-Flash-1017**. `deepseek-v4-pro` (V4-Pro-0813) says **Not supported**.

The vision guide opens with the same fact: `deepseek-flash` accepts images next to text. The old name `deepseek-v4-flash-vision-exp` is still accepted. That model is retired, and those requests are also served by the latest Flash, at the Flash price.

The guide's examples are describing a picture, reading text in a screenshot, and analyzing a chart. Formats: JPEG, PNG, GIF, and WebP. The format is detected from the file bytes, not the file name or the MIME type.

Images are allowed in `user` messages only. An image in `system` or `assistant` returns 400.

Image tokens are billed with text tokens at the Flash peak and off-peak rates. Off-peak / peak, per 1M tokens: cache hit $0.003 / $0.006, cache miss $0.15 / $0.30, output $0.60 / $1.20. Peak hours are in the [API platform guide](/en/guides/deepseek-v4-api-platforms/).

## The experimental model, as history

On 2026-08-21 the changelog released DeepSeek-V4-Flash-Vision-Exp as `deepseek-v4-flash-vision-exp`. That was the first time the V4 series exposed image input on the API. It was a separate model from text Flash.

On 2026-09-10, V4-Flash and V4-Flash-Vision-Exp were retired. `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` were temporarily routed to V4.1-Flash. After the 17 October upgrade, the pricing page says both old names are served by **V4.1-Flash-1017** at the Flash price.

The V4.1-Flash news post calls it the smallest model in the new architecture family, with native visual understanding, not an experimental head added onto a text-only Flash. "First vision model" fits the 21 August experiment. It does not fit today's `deepseek-flash`.

The older draft said the experiment hit 458 points on Hacker News that day. That thread was not reopened on 2026-10-18, so the number is not repeated as a current fact.

## Three ways to send an image

All three use OpenAI Chat Completions, with `content` as an array of blocks. The Responses API uses `input_image`. The Anthropic-compatible base URL is `https://api.deepseek.com/anthropic`, and the image block type is `image`.

1. **Base64.** Put a `data:image/jpeg;base64,...` URL in the request. This is the simple path for a local file. The encoded bytes count toward the 48 MiB body limit.
2. **External URL.** A public http(s) link. The URL may be at most 8192 characters, the file at most 32 MiB, and the download must finish within 60 seconds.
3. **Files API `file_id`.** Use this when the same image is sent many times, or when one image breaks the inline limit. A `file_id` image may be up to 64 MiB and skips the 32 MiB check. A `file` block can also carry `file_data` as base64. `file_id` and `file_data` are mutually exclusive.

`image_url` accepts `detail`. `low` downscales to 512×512. `high` and `original` keep the image. `auto` currently matches `original`. `detail` is ignored for `file_id`.

Before inference, every image is resized and the aspect ratio is kept. Images under roughly 544×544 pixels are scaled up. Larger images are scaled down to about the pixel count of a 1300×1300 image. That caps one image at **1024 tokens**. A 2000×2000 image and a 5000×5000 image cost the same number of tokens after resizing. Multiple images are counted one by one. The token calculator on DeepSeek's Token page was not used here, so no calculator output is quoted.

The older draft said images under about 384×384 were scaled up. The vision guide on 2026-10-18 says roughly **544×544**.

| Limit | Value on the guide |
| --- | --- |
| Formats | JPEG, PNG, GIF, WebP |
| External URL length | 8192 characters |
| Request body | 48 MiB |
| One image (base64 or external URL) | 32 MiB |
| One image (Files API `file_id`) | 64 MiB |
| Images per request | 600 |
| Total image bytes per request | 64 MiB without `file_id` images; up to 200 MiB including `file_id` images |
| Max side | 8192 px; 4096 px when a request has 15 or more images |

```python
import base64
from openai import OpenAI

client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

with open("image.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What is in this image?"},
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{b64}"},
                },
            ],
        }
    ],
)
print(response.choices[0].message.content)
```

If a tool such as Claude Code or OpenCode only needs a new `base_url` and model name, use `deepseek-flash`. The changelog recommends DeepSeek Harness **0.2.1-rc.1** or later. This page does not retest each client's default model ID.
