---
title: "把 PDF 需求书交给 DeepSeek，流程图为什么没被读到？"
description: "先检查解析用途，再检查图有没有被裁出。讲清 PDF 上传、file_id 引用、超时对账和两笔费用；不把文档核对写成识图实测。"
date: "2026-11-18"
article_type: howto
tags: [deepseek, api, pdf, workflow]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
---

> 审阅稿。核查日：2026-11-18（北京时间）。本文核对官方文档，并做离线示例检查；没有上传真实文件、调用模型或验证账单。

需求书的正文能复述，审批流程却少了一条「驳回后重新提交」。先别急着换模型，也别靠提示词让它猜。**先确认上传时用的 `purpose`，再确认那张图有没有进入上下文。**

DeepSeek 在 [11 月 13 日更新](https://api-docs.deepseek.com/updates)中开放了文件输入等应用 API。这篇只讲通过 API 上传整份 PDF、Word 或 PPT，不讲网页聊天界面。单张图片的接法见[看图指南](/zh/guides/deepseek-v4-flash-vision-guide/)。

## 第一步：分清「文字被读到」和「图被读到」

[File Parsing](https://api-docs.deepseek.com/guides/document_parsing) 写了两种用途：

| 上传用途 | 模型拿到什么 | 需求书怎么选 |
| --- | --- | --- |
| `text_recognition` | 提取后的文字；图表、照片、示意图被丢弃 | 只查条款、标题、纯文字时可用 |
| `rich_layout_recognition` | 文字，以及自动裁出、插回原文位置的图 | 需要看流程图、架构图时用它 |

第二种也不是「每张图一定完整读到」。官方明确说，自动裁图可能漏掉图片；漏裁的图，模型仍然看不到。图中的文字能被提取，不等于箭头、分支和图例一起保留了。

实用判断：先问「第 3 页的图里有哪些节点和连线」，再让它写实现方案。答不出就标为未确认，不让模型补齐。

## 第二步：上传时就完成解析，不是先拿任务号再轮询

官方流程是：

```text
POST /files（先传 purpose，再传 file）
  → 上传期间解析成功 → 返回可直接引用的 file_id
  → 服务端确认解析失败 → 不保存、不计解析费
  → 客户端中途断线 → 是否成功待对账，不能直接当作失败

拿到 file_id → 在聊天请求中引用 → 模型读取解析内容
```

**没有文档支持的 `processing → completed` 轮询流程，不要自己加一个。** `GET /files` 是列出文件，不是解析任务进度接口。

下面是给读者的调用示例，不是本次运行记录。执行会访问付费 API；先确认预算与数据上传权限。`requirements-demo.pdf` 应是无敏感内容的自制样本；密钥从环境变量传入，不写进文件或仓库。

```bash
curl --fail-with-body --max-time 300 https://api.deepseek.com/files \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -F 'purpose=rich_layout_recognition' \
  -F 'expires_after[anchor]=created_at' \
  -F 'expires_after[seconds]=86400' \
  -F 'file=@requirements-demo.pdf'
```

几个细节别省：

- `purpose` 必须排在 `file` 前面。给 PDF、Word、PPT 用 `user_data` 会返回 400。
- 示例把文件保留时间设为 86400 秒，即 24 小时。两项 `expires_after` 要一起给；官方允许 1 小时至 30 天。不设置则永久保留。
- `--max-time 300` 是本文选的客户端总超时，不是服务端承诺。官方分别限制文档上传 120 秒、提交后解析 120 秒；客户端和中间代理都要留出上传加解析的时间。
- `--fail-with-body` 让 HTTP 错误变成失败退出，同时保留错误正文。不要把错误 JSON 当成上传成功。

文件属于账号，同账号下的 API key 共享这些文件。保留本地原件；官方不支持下载上传的原文档或解析结果。具体格式和存储规则见 [Files API](https://api-docs.deepseek.com/guides/files_api)。

## 第三步：把返回的 ID 放进正确的消息块

保存下面内容为 `request.json`。把占位 ID 换成刚才上传响应中的 `id`，不要填本地文件名或公开 URL。

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
          "text": "请逐页列出流程图中的节点、带标签的连线和驳回路径，并注明页码。分开写明看到的内容与推断；看不清或没看到就标为未确认，不要补画。"
        }
      ]
    }
  ]
}
```

再发送这个文件：

```bash
curl --fail-with-body https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

三套接口的文档块不能混用：

| 接口 | 文档块 |
| --- | --- |
| Chat Completions | `{"type":"file","file_id":"..."}` |
| Responses | `{"type":"input_file","file_id":"..."}` |
| Anthropic Messages | `{"type":"document","source":{"type":"file","file_id":"..."}}` |

Anthropic Messages 还要求 `anthropic-beta: files-api-2025-04-14` 请求头。解析后的文档不能塞进图片块；该类文档只支持 `file_id` 引用，不支持内联文档内容或文档 URL。

提示词要求页码，只是方便人工核对，**不是 API 保证返回可靠页码引用**。即使模型说「第 3 页」，也要回到原 PDF 检查。

## 超时后先对账，别直接循环重传

客户端断开不等于取消。官方说明：解析仍会跑完；若成功，文件会保存、计费，并出现在 `GET /files` 中。失败的上传不保存、不计解析费。

建议按这个顺序处理：

1. 记录本次用途、文件名、大小和开始时间。敏感文档不要把正文写进日志。
2. 超时后先按 [Files API 的列表接口](https://api-docs.deepseek.com/guides/files_api#list-files)查已存文件；列表有分页，别只看第一页。
3. 用自己记录的元数据排查。文件名相同不能证明内容相同，也不是官方幂等保证；无法可靠匹配时人工确认。
4. 确认没有可复用文件后，再决定是否重传。不要写「超时就无条件重试」的自动循环。

| 返回码 | 先查什么 |
| --- | --- |
| 400 | 用途、表单顺序、格式、密码保护；不要改模型名碰运气 |
| 408 / 504 | 分别检查上传超时 / 解析超时，按官方错误信息处理 |
| 413 | 文件是否超上限 |
| 429 | 文档上传并发；账号上限是 15，不是聊天并发额度 |
| 500 / 503 | 解析不完整 / 服务繁忙；保存错误信息，再决定何时重试 |

## 上传成功，不等于整份需求能放进每次对话

截至核查日，官方限制包括：单份解析文档最多 **100 MiB、1000 页**；每次聊天最多 **20 份文档**，解析文字合计最多 **8 MiB**。重复引用同一 ID 也重复占文档数量。

裁出的图还会占图片数量限制和输入 token。多轮对话里，文档完整解析内容会继续留在上下文，不是自动变成免费摘要。超过上下文会返回 400，不会悄悄截断。

大需求书可先在本地按功能或章节拆分，再按问题只发相关部分。这是本文的组织建议，不是官方自动分块能力。拆分后仍要人工检查跨页箭头和图例是否被分开。

## 两笔钱分开算

[价格页](https://api-docs.deepseek.com/quick_start/pricing)在 2026-11-18 标的是 **文件解析 / OCR 每 1000 页 $0.225，美元**。

- 解析：每次成功上传按页收一次。重传是新的一次上传，别当成复用。
- 推理：聊天引用时，解析文字和裁图按模型输入 token 计费；模型输出另算。以后再引用同一 `file_id` 不重复收解析费，但不免当次模型费用。具体缓存与峰谷价格以价格页为准。

纯算术例子：100 页 × $0.225 / 1000 = **$0.0225 解析费**。这不是实测账单，也不包含一次或多次对话的 token 费。

TXT、源码、CSV、JSON 等文字文件用 `user_data`，不收解析费；表格、电子书的支持方式另见 File Parsing。这不代表聊天推理免费，也不能把 PDF 改后缀伪装成文字来绕过解析。

## 接进编码工作流前，做一次小样本验收

自己做一份不含隐私的两页 PDF：第 1 页写三个字段，第 2 页放一张有「通过 / 驳回」分支的流程图，再加一条容易漏掉的返回箭头。

- 用两种 `purpose` 分别上传，记录 ID 和解析费用；这是后续可执行的验收方案，本文没有跑过。
- 问同一组问题：三个字段是什么？有哪些节点？驳回后回哪里？哪些内容看不清？
- 对照原件逐项勾选。看图失败先检查用途和裁图限制，不能用模型自述「已读完」当验收证据。
- 漏图时，可在本地把关键页或关键图单独导出为受支持的图片，按[看图指南](/zh/guides/deepseek-v4-flash-vision-guide/)另行提交；仍需重新核对，也会增加调用和 token 成本。
- 只有人工确认过的规则才交给编码代理。没确认的分支作为问题保留，不让代理根据猜测写业务逻辑。

本文的离线检查覆盖请求 JSON、curl 语法、字段顺序和示例一致性；**不覆盖真实裁图效果、分页正确率、超时恢复结果或实际收费**。这些需要获得授权后用真实 API 小样本验证。

### 官方依据（均于 2026-11-18，北京时间核对）

- [11 月 13 日应用 API 更新](https://api-docs.deepseek.com/updates)：此次文件输入的发布背景。
- [File Parsing](https://api-docs.deepseek.com/guides/document_parsing)：两种用途、同步解析、消息块、限制、错误与计费机制。
- [Files API](https://api-docs.deepseek.com/guides/files_api)：上传字段、保留时间、列表分页、账号共享与不可下载限制。
- [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)：美元解析费与模型 token 费。价格可能变化。
