---
title: "让 AI 反过来拷问你：8 个有意思的 Agent Skill"
description: "盘点 Claude Code / Codex 生态里好玩又实用的 Agent Skills——grill-me 让 AI 拷问你的设计、caveman 省 75% token、handoff 一键交接、zoom-out 看懂陌生代码…附 30 秒安装方法。"
date: "2026-06-08"
article_type: "explainer"
tags: ["skills", "claude-code", "agent-skills", "grill-me", "工作流", "效率"]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: false
---

大多数人对 AI 编程工具的想象还停留在"帮我写代码"。但 **Agent Skills**（智能体技能）这套机制出现后，玩法完全变了——你可以给 AI 装上一身"人格"和"工作流"：让它反过来拷问你的方案、用电报体说话省 token、一句话生成交接文档、把当前对话直接变成 PRD……

这篇文章不讲原理（想看机制原理戳文末的《[Skills 与扩展系统完全指南](/zh/guides/ai-tool-skills-extensions)》），只盘点一批**真的有意思、装上就能用**的 skill。案例主要来自 [Matt Pocock 的开源 skill 库](https://github.com/mattpocock/skills)（可装在 Claude Code、Codex 等多个 agent 上）。

## 先搞懂：skill 为什么"有意思"

和你手动敲的斜杠命令不同，现代 Agent Skill 是一个带 `SKILL.md` 的文件夹，开头写一段 `description`，**AI 会自己根据上下文判断该不该用它**。这意味着：

- 你不用记命令——说一句"grill me"，对应 skill 自动触发
- 一个 skill 能彻底改变 AI 的**说话方式和工作流程**，而不只是补全代码
- 装好后跨项目通用，还能分享给团队

下面这 8 个，挑的就是那种"原来还能这么使唤 AI"的。

---

## 1. 🔥 grill-me —— 让 AI 反过来拷问你

**最反直觉的一个。** 平时是你问 AI，这个 skill 让 AI 一条一条**拷问你的方案**。

你说"grill me"，它就会把你的设计拆成一棵决策树，**一次只问一个问题**，逼你把每个分支都想清楚；而且每个问题它都会**先给出自己的推荐答案**，能在代码库里查到的就自己去查，不烦你。

> 适合：写方案/写 PRD 之前先被"压力测试"一遍，把自己没想透的地方提前暴露出来。比自己闷头想可靠得多。

同作者还有个变体 **grill-with-docs**：拷问时会对照你项目的术语表和已有文档，边问边帮你更新 `CONTEXT.md` 和架构决策记录（ADR）。

## 2. 🪨 caveman —— "山顶洞人模式"，省 75% token

一句话：让 AI **说话像发电报**。砍掉所有客套、冠词、铺垫，只留干货，token 消耗大约**降低 75%**。

触发也很随意——"caveman mode""说简短点"或 `/caveman` 都行，说"normal mode"就恢复正常。贴心的是，遇到**安全警告、危险操作确认、多步骤操作说明**时它会自动切回正常表达，不会因为省字把关键信息说漏。

> 适合：长会话、反复迭代的场景，按量计费的工具上能实打实省钱。

## 3. 🤝 handoff —— 一句话生成交接文档

上下文快满了，或者要换个 session / 换个人接着干？敲一句 `handoff`，它会把当前对话整理成一份**交接文档**——干了什么、走到哪、下一步该focus什么，让一个全新的 agent 能无缝接上。

细节做得很到位：文档存到系统临时目录（不污染你的工作区）、**已有产物只引用路径不重复粘贴**、还会自动**脱敏**。

> 适合：长任务跨天进行、团队协作交接、上下文窗口被塞满前的"存档"。

## 4. 🔭 zoom-out —— 拉高一层，看懂陌生代码

接手一个陌生项目，最痛的是"只见树木不见森林"。`zoom-out` 会**主动上升一个抽象层**，用项目自己的领域术语，帮你梳理相关模块和调用关系——这块代码到底在整个系统里扮演什么角色。

> 适合：onboard 新项目、读别人写的模块、改动前先建立全局认知。

## 5. 🐛 diagnose —— 治"玄学 bug"的结构化方法论

碰到那种"时好时坏、看不出原因"的 bug，最忌讳乱试。`diagnose` 把 debug 拆成**六个阶段**的闭环：先建一个可靠的"过/不过"信号 → 稳定复现 → 提假设 → 加观测 → 修复并补回归测试 → 收尾复盘。

核心理念是：**一个快速、确定的 pass/fail 反馈回路，才是高效排错的根本**。

> 适合：性能回退、偶发性故障、查了半天没头绪的硬骨头。

## 6. 🧪 prototype —— 造完即弃，但把结论留下来

想验证一个数据模型、状态机，或者纠结几个 UI 方案哪个好？`prototype` 帮你快速搭一个**用完就扔**的原型：要么是个能跑的终端小程序来验证逻辑，要么在同一个路由上生成几个**可切换的 UI 变体**让你对比。

最妙的是——在代码被删掉之前，它会先把"**结论**"沉淀下来（哪个方案对、为什么），不让你白试一场。

> 适合：技术选型、交互方案对比、"我先试试看行不行"的探索阶段。

## 7. 📋 to-prd / to-issues —— 对话直接变成需求文档

聊着聊着把需求聊清楚了，怎么落成文档？`to-prd` 把**当前对话**直接合成一份 PRD：它不会再回头采访你，而是自己去翻代码库、定义测试边界，套模板写出来，最后打上"ready-for-agent"标签发到你的 issue 跟踪器。

配套的 **to-issues**（以及 **triage**）能把对话拆成一条条 issue、走完"待处理 → 待补充 → 可交给 agent / 待人工"的流水线。

> 适合：把一次脑暴沉淀成可执行的任务，或者给"放养型" AFK agent 准备好可领取的活儿。

## 8. 🪆 write-a-skill —— 用 skill 来写 skill

有点套娃，但非常实用。当你想把某个重复劳动固化成自己的 skill 时，`write-a-skill` 会帮你**走完整个流程**：问清需求 → 起草 `SKILL.md` → 按"渐进式披露""触发词友好的 description"等最佳实践帮你打磨 → 和你一起 review。

> 适合：第一次写 skill 不知从何下手，或者想把团队的最佳实践编码成可分享的能力。

---

## 30 秒装上它们

这套 skill 用 `skills.sh` 安装器分发，**不限于 Claude Code**（Codex 等也能装）：

```bash
# 1. 运行安装器，按提示勾选你想要的 skill 和目标 agent
npx skills@latest add mattpocock/skills

# 2. 记得勾上 setup 这个 skill，装完在 agent 里跑一次：
/setup-matt-pocock-skills
```

setup 步骤会问你用哪个 issue 跟踪器（GitHub / Linear / 本地文件）、triage 用什么标签、文档存哪。配置完，上面的 `/grill-me`、`/caveman`、`/diagnose` 这些就都能用了。

> 想自己写一个？参考上面的 **write-a-skill**，或者读官方的 [Agent Skills 文档](https://code.claude.com/docs/en/skills)。SKILL.md 遵循的是跨工具的开放标准，写一次多个工具都能识别。

---

## 小结

| Skill | 一句话 | 什么时候用 |
|-------|--------|-----------|
| **grill-me** | AI 拷问你的方案 | 定方案前压力测试 |
| **caveman** | 电报体省 75% token | 长会话、省钱 |
| **handoff** | 一键交接文档 | 换 session / 换人接力 |
| **zoom-out** | 拉高一层看全局 | onboard 陌生代码 |
| **diagnose** | 六阶段结构化 debug | 玄学 bug、性能回退 |
| **prototype** | 造完即弃留结论 | 技术选型、UI 对比 |
| **to-prd** | 对话变 PRD/issue | 脑暴落地成任务 |
| **write-a-skill** | 用 skill 写 skill | 固化自己的工作流 |

Agent Skill 真正有意思的地方，是它让你意识到：AI 不只是个"更快的打字员"，你可以给它**设计角色、流程和约束**。想系统了解这套机制（CLAUDE.md / Skills / Hooks / Plugins / AGENTS.md），接着读 [《AI 编程工具的 Skills 与扩展系统》](/zh/guides/ai-tool-skills-extensions)。

---

*本文 skill 来源：[mattpocock/skills](https://github.com/mattpocock/skills)（MIT）。skill 内容更新频繁，安装前建议查阅仓库最新说明。整理于 2026-06-08。*
