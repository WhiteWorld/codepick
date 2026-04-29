---
title: "DeepSeek V4 API 在哪些平台可用？官方、百炼、Together、Fireworks 等接入汇总"
description: "截至 2026-04-29，梳理 DeepSeek-V4 在官方平台、阿里云百炼、Together、Fireworks、Novita、OpenRouter 等平台的可用性，并说明正确模型 ID、接入方式与注意事项。"
date: "2026-04-29"
article_type: "howto"
tags: ["deepseek", "deepseek-v4", "api", "openrouter", "百炼", "together", "fireworks"]
draft: false
---

如果你最近在找“DeepSeek V4 API”，先要注意一件事：**官方确实已经提供 DeepSeek-V4 系列 API，但实际可调用的官方模型 ID 并不叫 `deepseek-v4`，而是 `deepseek-v4-pro` 和 `deepseek-v4-flash`。**

这也是很多人搜索时最容易踩的坑：网页、新闻、第三方平台常写“DeepSeek V4”，但真正接入时，你需要看的是**平台上的模型 ID**、**是否兼容 OpenAI SDK**，以及**这个平台今天到底能不能调**。

本文按 2026-04-29 的公开官方资料整理，帮你回答两个问题：

1. **DeepSeek V4 API 到底在哪些平台能用？**
2. **怎么最快接入并跑通第一条请求？**

---

## 先说结论

- **DeepSeek 官方平台可用**，而且是最推荐的接入方式
- **官方推荐按 OpenAI 兼容方式接入**，`base_url` 为 `https://api.deepseek.com`
- 官方当前建议直接使用：
  - `deepseek-v4-pro`
  - `deepseek-v4-flash`
- 旧别名 `deepseek-chat`、`deepseek-reasoner` 仍可见于文档，但官方已标注将于 **2026-07-24** 废弃
- 截至 2026-04-29，**可明确核到 V4 系列**的平台包括：
  - DeepSeek 官方
  - 阿里云百炼
  - Together AI
  - Fireworks AI
  - Novita AI
- **OpenRouter 有 `deepseek/deepseek-v4` 模型页，但该页面当天明确标注不可用**
- **火山方舟、腾讯云、Replicate** 本次未在公开官方页核到可直接引用的 DeepSeek V4 可用证据，不建议在文章里写成“已支持”

---

## DeepSeek V4 API 可用平台一览

| 平台 | 截至 2026-04-29 是否可用 | 核到的模型名 / ID | OpenAI 兼容 | 备注 |
|------|--------------------------|------------------|-------------|------|
| DeepSeek 官方 | ✅ 可用 | `deepseek-v4-pro`、`deepseek-v4-flash` | ✅ | 官方推荐入口，文档最完整 |
| 阿里云百炼 | ✅ 可用 | `deepseek-v4-pro`、`deepseek-v4-flash` | 平台自有接入方式，需看百炼文档 | 适合国内用户，存在地域/部署范围差异 |
| Together AI | ✅ 可用 | `deepseek-ai/DeepSeek-V4-Pro`、`deepseek-ai/DeepSeek-V4-Flash` | ✅ | 标准 OpenAI SDK 最容易接入 |
| Fireworks AI | ✅ 可用 | `deepseek-v4-pro` | ✅ | 文档明确支持 OpenAI client |
| Novita AI | ✅ 可用 | `Deepseek V4 Pro`、`Deepseek V4 Flash` | ✅ | 模型页可见价格与上下文 |
| OpenRouter | ⚠️ 页面存在，但当日不可用 | `deepseek/deepseek-v4` | ✅ | 模型页明确显示 not available |
| 硅基流动 | ⚠️ 已有多款 DeepSeek 模型，但本次未核到 V4 公共条目 | `DeepSeek-V3.1`、`DeepSeek-V3.2` 等 | ✅ | 不建议直接写成“已支持 V4” |
| 火山方舟 | ❓ 本次未核到公开证据 | — | — | 不建议写成已支持 |
| 腾讯云 | ❓ 本次未核到公开证据 | — | — | 公开页主要是混元文档 |
| Replicate | ❓ 本次未核到官方 DeepSeek V4 条目 | — | 非 OpenAI Chat API 为主 | 不建议写成已支持 |

> 说明：本文只按**能在公开官方文档或官方模型页核到**的口径写。模型页存在，不等于今天能真正调用。

---

## 官方怎么用 DeepSeek V4 API

如果你只是想“先跑起来”，**优先选官方 API**。

### 第一步：创建 API Key

到 DeepSeek 官方平台创建 API Key，然后在本地设置环境变量：

```bash
export DEEPSEEK_API_KEY="你的 DeepSeek API Key"
```

### 第二步：使用 OpenAI 兼容接口

官方 OpenAI 兼容入口：

```bash
https://api.deepseek.com
```

最常用的 Chat Completions 路径：

```bash
https://api.deepseek.com/chat/completions
```

### 第三步：发送第一条请求

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "请用一句话介绍 DeepSeek V4 API。"}
    ],
    "stream": false
  }'
```

如果你更在意速度和成本，可以把模型换成 `deepseek-v4-flash`。

---

## 用 OpenAI SDK 接入 DeepSeek 官方 API

如果你的项目已经在用 `openai` SDK，迁移成本很低，只要换 `base_url` 和模型名即可。

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

resp = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "user", "content": "请解释什么是上下文缓存命中。"}
    ],
)

print(resp.choices[0].message.content)
```

这也是为什么很多第三方平台会强调“OpenAI 兼容”——你几乎不用改业务代码，只需要换 `base_url`、`api_key` 和模型 ID。

---

## 各平台怎么选

### 1. DeepSeek 官方

**最适合**：想第一时间用到官方最新模型、最少踩命名坑的开发者。

优点：
- 模型命名最权威
- 文档最完整
- 明确支持 OpenAI 兼容方式
- 旧别名和迁移关系写得最清楚

你应该优先用：
- `deepseek-v4-pro`：更适合高质量复杂任务
- `deepseek-v4-flash`：更适合追求速度和成本

### 2. 阿里云百炼

**最适合**：国内团队、已有阿里云账号、希望走国内云资源体系的用户。

本次核到的信息：
- 官方模型页明确列出了 `deepseek-v4-pro` 和 `deepseek-v4-flash`
- 中国内地与全球部署范围不同
- 中国内地支持地域可见为 **华北 2（北京）**
- 全球部署可见为 **美国（弗吉尼亚）**

如果你面向国内业务或公司合规环境，百炼通常比海外平台更容易采购和管理。

### 3. Together AI / Fireworks / Novita

**最适合**：已经在海外模型聚合平台上开发，希望继续复用 OpenAI SDK 的团队。

这几个平台的共同点：
- 都能在公开官方页核到 V4 系列模型
- 都主打 OpenAI 兼容接入
- 更适合已有多模型网关、统一模型层的团队

区别主要在：
- 模型 ID 写法不同
- 价格不同
- 上下文和缓存计费细节不同
- 某些平台只先上线了 `V4 Pro`，并不是 Pro / Flash 同时都开放

### 4. OpenRouter

**结论很简单：别被模型页骗了。**

截至 2026-04-29，OpenRouter 上能看到 `deepseek/deepseek-v4` 模型页，但页面明确写着：

> The model "deepseek/deepseek-v4" is not available

所以这类平台要注意：**有页面，不代表今天就能调。**

---

## 常见命名坑：DeepSeek V4、deepseek-v4-pro、deepseek-chat 到底是什么关系？

这是最值得单独说清楚的地方。

### 1. `DeepSeek-V4` 是产品/系列名

你在官网、媒体、第三方模型页看到的“DeepSeek V4”，通常是**系列名**或展示名。

### 2. 官方实际 API 模型 ID 是：

- `deepseek-v4-pro`
- `deepseek-v4-flash`

### 3. 旧别名仍然存在，但不是新项目首选

官方文档里仍能看到：

- `deepseek-chat`
- `deepseek-reasoner`

但它们属于兼容保留名，官方已经注明未来将废弃。新项目最好直接用 V4 的正式模型 ID。

---

## 价格和限制怎么看

如果你准备正式接入，不要只看“这个平台有没有 DeepSeek V4”，还要看下面四件事：

1. **输入 / 输出价格**是否和你预期一致
2. **缓存命中 / 未命中价格**怎么计算
3. **上下文窗口**有多大
4. **最大输出 token** 有没有限制

根据官方 pricing 页，DeepSeek V4 已经把缓存计费、上下文和输出上限写得比较明确；但第三方平台往往会改写模型 ID、价格策略或缓存计费方式。

所以最稳妥的做法是：

- 先按官方文档理解模型定位
- 真正上线前，再逐个平台核对最终价格页和模型页

---

## 第三方平台接入时的 4 个注意事项

### 1. 模型名可能完全不同

例如：
- 官方：`deepseek-v4-pro`
- Together：`deepseek-ai/DeepSeek-V4-Pro`
- OpenRouter：`deepseek/deepseek-v4`

不要把一个平台的模型名直接复制到另一个平台。

### 2. OpenAI 兼容不等于 100% 无差异

很多平台都会说自己“兼容 OpenAI SDK”，但：
- 支持的参数可能不同
- reasoning / thinking 模式可能不同
- function calling、JSON mode、流式输出支持程度可能不同

所以“能跑”不等于“完全等价”。

### 3. 国内平台通常会有账号、地域或合规门槛

例如阿里云百炼就明确存在地域/部署范围差异。你在公司环境里接入时，还要提前确认：

- 是否需要实名认证
- 是否需要企业账号
- 是否必须指定可用地域
- 是否需要额外开通模型服务

### 4. 价格变动很快

大模型价格更新非常频繁。文章里看到的价格，只能作为**检索当天的参考**，上线前一定要再看一次官方价格页。

---

## 如果你只想要一个最稳妥方案

我的建议很简单：

- **个人开发者 / 想最快跑通**：优先用 DeepSeek 官方 API
- **国内企业或团队**：优先看阿里云百炼这类国内平台
- **已经在海外聚合平台开发**：看 Together、Fireworks、Novita 是否已有你要的模型和价格
- **看到 OpenRouter 模型页就想直接上**：先确认它当天是不是可用

---

## 总结

截至 2026-04-29，**DeepSeek V4 API 不是“只有一个官方入口”，而是已经出现在多个平台上**。但真正接入时，最关键的不是搜索词“DeepSeek V4”，而是三件事：

1. 这个平台上**真实可调的模型 ID**是什么
2. 它是否真的**当前可用**
3. 它是否支持你现有的 **OpenAI SDK / 网关接入方式**

如果你想少踩坑，最简单的路径仍然是：**从 DeepSeek 官方 API 开始，优先使用 `deepseek-v4-pro` 或 `deepseek-v4-flash`。** 等你需要多模型路由、云资源整合或更复杂的成本控制时，再切到百炼、Together、Fireworks 或其他第三方平台。

官方参考：
- [DeepSeek API 文档](https://api-docs.deepseek.com/)
- [DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [阿里云百炼模型列表](https://help.aliyun.com/zh/model-studio/getting-started/models)
- [OpenRouter DeepSeek V4 页面](https://openrouter.ai/deepseek/deepseek-v4)
- [Together Models](https://www.together.ai/models)
- [Fireworks Models](https://fireworks.ai/models)
- [Novita Models](https://novita.ai/models)
