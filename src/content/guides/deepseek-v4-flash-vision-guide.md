---
title: "DeepSeek 看图：现在用 deepseek-flash，实验视觉模型已退役"
description: "2026-10-18 重开官方 Vision 指南和价格页。看图走 deepseek-flash（V4.1-Flash-1017）。deepseek-v4-flash-vision-exp 已退役，名字还能填，请求由最新 Flash 处理。V4-Pro 不支持视觉。"
date: "2026-10-18"
updated_at: "2026-10-18"
article_type: howto
tags: [deepseek, deepseek-v4, vision, 视觉模型, api]
pillar: plans
content_status: keep
locale_strategy: mirrored
draft: false
---

核查日 **2026-10-18**。当天重新打开：

- [Vision 指南](https://api-docs.deepseek.com/guides/vision)
- [价格页](https://api-docs.deepseek.com/quick_start/pricing)
- [changelog](https://api-docs.deepseek.com/updates)
- [2026-09-10 新闻](https://api-docs.deepseek.com/news/news260910)

旧稿把 `deepseek-v4-flash-vision-exp` 写成现役主角，并写「V4 家族现有三个公开模型」「Flash 已更新到 V4-Flash-0731」。这三句都过时了。

## 现在怎么看图

价格页上，`deepseek-flash` 的视觉一栏是支持，版本是 **DeepSeek-V4.1-Flash-1017**。`deepseek-v4-pro`（V4-Pro-0813）写的是 **Not supported**。

Vision 指南的第一句也是：`deepseek-flash` 可以在文字旁边收图片。旧名字 `deepseek-v4-flash-vision-exp` 仍接受，模型已退役，请求同样由最新 Flash 处理，按 Flash 价计。

能做的事，指南写的是：描述图片、读截图里的文字、分析图表。支持 JPEG、PNG、GIF、WebP。格式按文件内容认，不按文件名或 MIME。

图片只能放在 `user` 消息里。放进 `system` 或 `assistant` 会回 400。

单价就是 Flash 的峰谷价，图片 token 和文字 token 一起算。非高峰 / 高峰：缓存命中 $0.003 / $0.006，未命中 $0.15 / $0.30，输出 $0.60 / $1.20（USD / 100 万 token）。高峰时段见 [API 平台现状](/zh/guides/deepseek-v4-api-platforms/)。

## 早期实验版

2026-08-21，changelog 发布实验模型 DeepSeek-V4-Flash-Vision-Exp，调用名 `deepseek-v4-flash-vision-exp`。那是 V4 系列第一次把看图开放到 API。它当时和文本 Flash 分开。

2026-09-10，V4-Flash 和 V4-Flash-Vision-Exp 退役。`deepseek-v4-flash` 与 `deepseek-v4-flash-vision-exp` 暂时路由到 V4.1-Flash。10 月 17 日 Flash 再升级到 V4.1-Flash-1017 之后，价格页写明这两个旧名由 **V4.1-Flash-1017** 按 Flash 价处理。

V4.1-Flash 的新闻称它是新架构家族里最小的一款，视觉理解是原生的，不是在纯文本 Flash 上后补的实验头。所以「首个视觉模型」只适合讲 8 月 21 日那次实验发布，不适合讲现在的 `deepseek-flash`。

旧稿写过实验版发布当天 Hacker News 458 分。2026-10-18 没有重开那个帖子，这个数字不再当作当前事实。

## 三种传图

都走 OpenAI Chat Completions，`content` 是块数组，不是纯字符串。Responses API 用 `input_image`。Anthropic 兼容端点是 `https://api.deepseek.com/anthropic`，图片用 `image` 块。

1. **Base64**。`data:image/jpeg;base64,...` 塞进请求。适合本地文件。编码后的体积计入 48 MiB 请求体上限。
2. **外链**。公开的 http(s) URL。URL 最长 8192 字符，单图最大 32 MiB，60 秒内要下完。
3. **Files API 的 file_id**。同一张图多次用，或单图超过内联上限时用。`file_id` 引用的单图可以到 64 MiB，不走 32 MiB 那条检查。也可以在 `file` 块里用 `file_data` 放 base64，和 `file_id` 互斥。

`image_url` 可以带 `detail`：`low` 先缩到 512×512；`high` 与 `original` 保留原图；`auto` 目前等于 `original`。`file_id` 会忽略 `detail`。

推理前会自动缩放，并保持宽高比：总像素大约低于 544×544 的会放大；更大的会缩小到大约 1300×1300 的像素量。单图因此有 **1024 token** 上限。一张 2000×2000 和一张 5000×5000，缩放后 token 数相同。多图按张分别算。具体尺寸可以到官方 Token 页的计算器，本文不引用没打开的计算器结果。

旧稿写「低于约 384×384 会放大」。2026-10-18 的 Vision 指南写的是大约 **544×544**。以指南为准。

| 限制 | 指南上的值 |
| --- | --- |
| 格式 | JPEG、PNG、GIF、WebP |
| 外链长度 | 8192 字符 |
| 请求体 | 48 MiB |
| 单图（base64 或外链） | 32 MiB |
| 单图（Files API `file_id`） | 64 MiB |
| 每请求图片数 | 600 |
| 每请求图片总体积 | 不含 `file_id` 时 64 MiB；算上 `file_id` 最多 200 MiB |
| 单边像素 | 8192；一次请求 15 张及以上时降到 4096 |

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
                {"type": "text", "text": "这张图里有什么？"},
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

Claude Code、OpenCode 这类工具如果只是改 `base_url` 和模型名，模型名用 `deepseek-flash`。官方 changelog 建议 DeepSeek Harness 用 **0.2.1-rc.1** 或更高。各家客户端是否已经改默认 ID，这篇没有逐个重测。
