---
title: "Orkas 配置指南：本地桌面端的 Commander + Workers Agent 团队（2026）"
description: "Orkas 是 MIT 开源的桌面端 Agent 协作客户端，独特之处是 Commander 自动调度多个 Worker Agent。本文 10 分钟带你跑通：git clone 一键启动 → 配置国内 LLM API → 通过对话指挥 Agent 团队 → 理解 COMPETENCE.md 自演化机制。"
date: "2026-05-19"
updated_at: "2026-05-19"
article_type: "howto"
tags: ["orkas", "agent-platform", "agent-collaboration", "desktop", "local-first", "commander", "setup"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
faq:
  - q: "Orkas 跟 Claude Code 是替代关系吗？"
    a: |
      不是。Orkas 是**桌面端的多 Agent 调度器**，它本身不写代码，而是指挥 Claude Code / Codex / OpenClaw 等底层 Agent 来写。
      用 Orkas 的场景是「我想同时让几个 Agent 各干各的，再有一个总指挥汇总」——单 Agent 单任务 Claude Code 直接用更轻。
  - q: "Commander + Workers 跟 Multi-Agent 框架（CrewAI / AutoGen）有什么区别？"
    a: |
      CrewAI / AutoGen 是**框架**（你写代码定义 Agent 协作流程）；Orkas 是**用户产品**（对话驱动，UI 操作）。
      想编程式控制 Agent 协作 → 用 CrewAI；想像和指挥官聊天一样工作 → 用 Orkas。
  - q: "COMPETENCE.md 自演化是真的有用还是噱头？"
    a: |
      早期产品，效果待长期验证。机制是：每个 Worker Agent 任务完成后会反思「这次哪些做对了/做错了」并更新自己的 `meta/COMPETENCE.md` 和 `meta/LEARNING_STRATEGIES.md`。
      理论上随用时长越久越懂你，实操中能否抗住长期使用还要看。可以当成「Agent 自带 MEMORY.md」用。
  - q: "国内能用吗？"
    a: |
      可以，开源本地运行，git clone 直接用。模型 API 配国内的（DeepSeek / Kimi / GLM / 方舟）即可。
      唯一注意：首次启动要下载嵌入模型（~95MB），如果直拉 Hugging Face 慢，需要走 hf-mirror.com 或镜像源。
---

[Orkas](/zh/tool/orkas) 是 MIT 开源的「桌面端多 Agent 协作客户端」，采用独特的 **Commander + Workers** 架构——一个 Commander LLM 接你的需求、拆解、分派给 Worker Agents，Worker 执行后 Commander 汇总。本文带你 10 分钟跑通。

## 谁该看

- 想要桌面端体验（不喜欢 Web UI / 命令行）
- 单机重度用户（数据完全本地、离线可用除模型调用）
- 想试「自演化 Agent」概念（COMPETENCE.md / LEARNING_STRATEGIES.md）
- 项目早期阶段不介意尝鲜

不适合：要远程团队协作（Orkas 无 Web 端）、要稳定生产环境（项目仍早期）。

## TL;DR

```bash
# 1. clone + 一键启动
git clone https://github.com/Orkas-AI/Orkas
cd Orkas
./run.sh

# 2. 首次自动安装依赖 + 嵌入模型（~95MB）
# 3. 桌面客户端启动后，Settings → AI Providers 填 API Key
# 4. 通过对话告诉 Commander 你的需求，它自动拆解 + 分派给 Workers
```

---

## 前置要求

- macOS / Windows / Linux 桌面
- Python 3.10+（脚本会检查并提示安装）
- 至少一个 LLM API Key（推荐 Claude / GPT，也支持 DeepSeek / Kimi / GLM 等国内）
- ~500MB 磁盘（应用 + 嵌入模型 + 后续生成数据）
- 首次启动稳定的网络（拉依赖和嵌入模型）

---

## 第一步：克隆并启动

```bash
git clone https://github.com/Orkas-AI/Orkas
cd Orkas
./run.sh
```

`run.sh` 自动做这些事：

1. 检查 Python 版本
2. 创建虚拟环境
3. 安装依赖
4. 下载嵌入模型（约 95MB，用于记忆检索）
5. 启动桌面客户端

> 💡 **国内拉嵌入模型慢**：在 `run.sh` 跑之前 `export HF_ENDPOINT=https://hf-mirror.com`，速度可以快 10 倍。

---

## 第二步：配置 LLM API

桌面客户端启动后：

1. **Settings** → **AI Providers**
2. 至少配一个 Provider，常见选择：
   - **Anthropic** Claude Sonnet 4.5（Commander 推荐）
   - **OpenAI** GPT-5 / GPT-5-mini
   - **DeepSeek** V4-Pro（国内 + 75% 折扣）
   - **方舟** Doubao-Seed-Code（国内中转）
3. 区分 Commander 模型和 Worker 模型——Commander 负责拆解和汇总，用旗舰；Worker 可用便宜模型分摊成本

---

## 第三步：和 Commander 对话

主界面的对话框就是 Commander 入口。比如：

```
帮我重构 src/api/handlers/ 下所有 handler 的错误处理逻辑，
统一改成 try/catch + structured logging，最后给我一份变更总结
```

Commander 会自动：

1. 扫描 `src/api/handlers/` 列出所有文件
2. 创建 N 个 Worker（每个 Worker 负责一个文件）
3. 分派任务给 Worker，并行执行
4. Worker 完成后汇报，Commander 汇总变更并产出总结

整个过程你能在 UI 上看到每个 Worker 的实时状态。

---

## 第四步：理解自演化机制（可选）

每个 Worker Agent 在你机器上有自己的元数据文件：

```
~/.orkas/workers/<worker-id>/
  meta/COMPETENCE.md         # 这个 Worker 擅长什么
  meta/LEARNING_STRATEGIES.md # 它从过往任务学到的策略
  meta/SKILLS/               # 成功模式被自动固化为可复用 skill
```

任务结束后 Worker 会反思「这次哪些做对/错」并更新 COMPETENCE.md。理论上越用越懂你的代码风格和偏好。

> ⚠️ **早期机制，效果待长期验证**。可以当成「比 MEMORY.md 更结构化的 Agent 自带笔记」，但别指望它一周就变得很懂你。

---

## 第五步：进阶——让 Commander 调用 Skill

随着你跑的任务多，Orkas 会自动从成功路径中抽出 Skill。比如「跑测试 → 修失败 → 重跑直到通过」可能被固化为一个 `auto-fix-tests` skill。

下次你说「auto-fix-tests on this branch」，Commander 直接调用这个 skill 而不是从零拆解。这是和 Slock / Multica 不同的「自演化」路径。

---

## 常见坑

1. **`./run.sh` 报 Python 版本不够** → 装 Python 3.10+，建议 `pyenv` 管理多版本
2. **嵌入模型下载卡住** → `export HF_ENDPOINT=https://hf-mirror.com` 然后重跑
3. **Commander 拆解太碎，N 个 Worker 同时跑爆 API quota** → Settings 里限制 max_concurrent_workers
4. **想用国内 API 但只能选 OpenAI/Anthropic** → 用 OpenAI 兼容 Provider，Base URL 填方舟 / DeepSeek 的 endpoint
5. **Pro 版功能？** → Orkas 开源版完全免费；社区有提到 Pro 版含团队协作和专家 Agent，但当前以官方 GitHub 实时信息为准

---

## 与其他平台对比

| 对比项 | Orkas | Slock | Multica | LobeHub |
|---|---|---|---|---|
| 形态 | **桌面端** | Web + daemon | Web + daemon | Web + Docker |
| 远程协作 | ❌ | ✅ | ✅ | ✅ |
| 数据位置 | **全本地** | 本地 + 云控制台 | 本地 + 服务器 | 本地或自托管 |
| 调度模式 | **Commander 自动** | 人 @ Agent | 人指派 Issue | Agent Group 自动 |
| 适合 | 单机指挥官 | 实时聊天 | 项目管理 | 通用 + 大生态 |

横评见 [2026 Agent 协作平台选型指南](/zh/guides/agent-collaboration-platforms-2026/)。

---

## 相关阅读

- [Orkas 产品详情页](/zh/tool/orkas)
- [2026 Agent 协作平台横评](/zh/guides/agent-collaboration-platforms-2026/)
- [LobeHub 配置指南](/zh/guides/lobehub-setup/)（如果想 Web 端 + 大生态）
- [Multica 配置指南](/zh/guides/multica-setup/)（如果想 Issue 面板）

> 数据核查截止 2026-05-19。Orkas 项目较新，命令和功能可能快速演进，以 [Orkas GitHub](https://github.com/Orkas-AI/Orkas) 实时信息为准。
