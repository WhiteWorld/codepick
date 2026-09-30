---
title: "Cue vs Muse vs Grok Bot vs Dots 2026：四个持续型 Agent 怎么选"
description: "截至 2026-09-30 的 Manus Cue、Meta Muse、Grok Bot 与 OpenAI Dots 对比：买家、协作、身份与电脑、审批、价格和地区。Dots 是 9 月 29 日 DevDay 公布的 ChatGPT 常驻 Agent。Cue 是 Manus 的个人生活应用，不是 heycue.io。"
date: "2026-09-30"
tags: ["cue", "manus", "muse-ai", "grok-bot", "dots", "openai", "ai-agent", "comparison"]
pillar: compare
content_status: keep
locale_strategy: mirrored
draft: false
---

> **核对日期：2026-09-30。** Cue 于 2026-09-28 随 Manus 2.0 公布。OpenAI Dots 于 2026-09-29 的 DevDay 公布。Muse 与 Grok Bot 仍在首发窗口。本文只把各家已经公开的能力写成结论。价格、额度和安全架构没写出来的地方，标成未知，不补数字。

Cue、Meta Muse、Grok Bot 和 OpenAI Dots 都会在你离开之后继续办事。买家和委托方式并不相同：

- **Cue** 和 **Muse** 面向个人生活：预约、出行、购物、家庭杂务。
- **Dots** 更接近 Muse 的「一个长期管家」，但住在 ChatGPT 和 Codex 里。官方例子同时覆盖工作材料和生活安排。
- **Grok Bot** 面向公司里长期存在的岗位：工程、销售、运营，以及需要治理的多人团队。

身份也不一样。Cue 给每个 Agent 一套自己的电话、邮箱、钱包和电脑。Muse 是一个管家，跑在每位用户一台 Muse Secure VM 上，出口和连接器由独立的 Sentinel 把关。Dots 现在从 **一个 primary dot** 开始，它有自己的云电脑和浏览器，用你连接的应用和 Codex 把工作接着做下去；公开材料没有给它配电话、邮箱或钱包。Grok Bot 的差别在岗位、Routine 和企业管控。同一用户名下的 Bot 共享一台云电脑，分开的 Bot 不是安全边界。

一句话：**生活杂务、希望 Agent 对外有自己的联系方式，先看 Cue；要一个审批边界写得比较细的个人管家，先看 Muse；人已经在 ChatGPT / Codex 里、想要一个一直在线的管家，先看 Dots；公司里按岗位持续派活，先看 Grok Bot。** 只比较 Grok Bot 和 Muse 的更细版本，见 [Grok Bot vs Muse AI（2026）](/zh/compare/grok-bot-vs-muse-ai-2026/)。

## 一眼看懂

| 维度 | Cue（Manus） | Meta Muse | OpenAI Dots | Grok Bot |
|---|---|---|---|---|
| 产品定位 | 多个带独立身份的个人生活 Agent | 一个持续了解你的个人管家 | 一个住在 ChatGPT 里的常驻管家 | 一组可长期保留的工作同事 |
| 出品方 | Manus；与 Manus 同一套基础设施 | Meta | OpenAI；模型为 GPT-6 Astra | SpaceXAI / xAI；账号与计费走 Cursor |
| 公布时间 | 2026-09-28，随 Manus 2.0 | 2026-09-08 开始发布 | 2026-09-29，DevDay | 2026-08-11 Beta；09-03 企业能力 |
| 主要对象 | 个人生活事务 | 个人与家庭 | 已经使用 ChatGPT / Codex 的个人与团队 | 开发者、业务团队、企业 |
| Agent 组织 | 多个 Agent，可进同一群聊并交接 | 一个主 Muse，可开侧边聊天和子 Agent | 现在是一个 primary dot；多 Dot 组队是以后的设想 | 按岗位建多个 Bot，可群聊协作 |
| 对外身份 | 每个 Agent 有自己的邮箱、电话、钱包、电脑 | 以用户连接的账号办事；模型看不到真实密码和付款信息 | ChatGPT 句柄（如 @name-dot）；没有公开的独立电话、邮箱、钱包 | 用用户云电脑上的登录和文件；这些凭据对该用户的全部 Bot 可用 |
| 运行环境 | 官方写「每个 Agent 有自己的电脑」；隔离方式和机房位置未公开 | 每位用户一台 Muse Secure VM | 每个 dot 一台云电脑加浏览器；可选再连一台本地电脑 | 每位用户一台 Firecracker 云电脑；该用户的 Bot 共享它 |
| 主要入口 | 网页、桌面、移动端；iOS 等待 App Store 审核 | iOS、Android、muse.ai；也可在 WhatsApp 里对话。眼镜端计划中 | 在桌面应用或桌面浏览器里创建。建好之后：手机 App 要等对应更新，Slack 和 Teams 可以联系。短信还没上。手机网页不支持 | macOS / Windows / Linux、iOS / Android |
| 当前价格 | 邀请制早期体验，凭码免费；之后的月费和额度未公布 | 大部分日常使用免费；订阅价格和额度未在发布稿公布 | 随 Pro 100 / 200 / 500 与 Business Premium 提供。Enterprise 默认关闭，要工作区管理员打开。单独的 Dots 月费未公布 | 不单卖；随付费 Cursor、Teams，或符合条件的 SuperGrok / X Premium+ |
| 地区现实 | 官方博客未写国家清单。国内版本据 Manus 当日说法仍在筹备 | 9 月 8 日发布稿写美国首发；9 月 18 日有报道称加拿大已开放 | Pro 限 18 岁以上，且不含欧洲经济区、英国、瑞士。Business Premium 与 Enterprise 写的是全球陆续开放 | 云电脑目前在美国，未提供本地部署 |

---

## 先把名字分开

这一组最容易被同名产品带偏。

- **本文的 Cue** 是 Manus 在 2026-09-28 随 Manus 2.0 公布的独立应用，用来跑个人生活 Agent。主来源是 [Manus 2.0 公告](https://manus.im/blog/introducing-manus-2-0) 里的 “Cue: A new app from Manus”。桌面语音助手 heycue.io、规划工具 cueai.app、客服机器人 Cuedesk、Muse Wearables 的 Cue 手环，以及 App Store 上的约会应用 MeetCue，都是别的产品。邀请码 MEETCUE 也和 MeetCue 无关。
- **Manus 本体** 仍站在研究、办公和创作那一侧：Studio、文档、代码、视频、游戏，以及可购买的 Cloud Computer。Cue 是另一款应用，官方说建在同一套基础设施上。Manus 2.0 的视频编辑器和游戏联机服务器属于 Manus，不计入 Cue 的功能表。
- **本文的 Dots** 是 OpenAI 在 2026-09-29 DevDay 公布的 ChatGPT 常驻 Agent。产品页是 [chatgpt.com/features/dots](https://chatgpt.com/features/dots/)。[TechCrunch](https://techcrunch.com/2026/09/29/the-internet-is-convinced-elon-musks-xai-trolled-openais-dots-launch/) 写过，dot.com 会跳到 Grok 的下载页，那不是这个产品。
- **Grok Bot** 是能操作浏览器、文件、终端和已连接应用的持续型 Agent。X 里的 Grok 聊天、终端编程工具 Grok Build，是另外的入口。
- **本文的 Muse** 是 Meta 在 9 月 8 日推出的个人 Agent。Muse Spark 是模型，Muse Code 是编程工具。

比较的是委托方式：生活杂务交给带独立身份的 Agent，交给一个个人管家，交给 ChatGPT 里的那一个 dot，还是交给一支按岗位分工的工作同事。

## 产品逻辑

### Cue：每个 Agent 自己对外办事

Cue 是独立应用，手机和桌面都能用，官方写明与 Manus 共用基础设施。官方的用法说明是：给它一个 cue，它就开始做。

公开的产品模型有三块。

第一，每个 Agent 有自己的邮箱、电话号码、钱包和电脑。它可以发消息，在你设定的预算内付款，在自己的电脑上把任务做完。它也可以接你的电话，再在 Cue 里留下摘要。

第二，多个 Agent 可以放进同一个群聊，围绕一个目标交接。官方例子是纽约发布会：一个去查场地，一个做短名单，一个起草演示文稿。方向和最后决定仍由你来。

第三，它会对接身边的服务。官方例子是在餐厅扫二维码，Agent 可以帮你点餐，或帮你排队占位。

Manus 主产品继续覆盖研究、办公和开发。Cue 放在个人生活这一侧。预约、出行、购物、家庭杂务符合这个定位。官方博客没有把代码仓库、CI 或企业审计写成 Cue 的场景。

参考：[Introducing Manus 2.0](https://manus.im/blog/introducing-manus-2-0)。中文报道见 [AIHub](https://www.aihub.cn/news/manus-cue/) 与 [IT之家](https://www.ithome.com/1/008/064.htm)。媒体里出现、但没有写进英文官方博客 Cue 小节的能力，下文单独标出。

### Muse：一个人，一个长期管家

Muse 把关系收在一个主 Agent 上。它有一条长期主对话，复杂项目可以开 side chat。它维护目标、记忆和活动记录，并在日程或外部变化之后继续推进。你可以给它起名、改形象，也可以调低或关掉主动消息。

官方例子偏个人生活：读学校邮件并写入家庭日历；整理采购清单、装好购物车，付款前等你批准；订餐厅、规划旅行、填表；盯账单、尝试谈降价或卖车；按训练和作息变化调整长期计划。它也能写代码、用终端、启动子 Agent。产品重心仍是一个 Agent 越来越了解一个人。

参考：[Muse 发布公告](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)、[产品设计](https://introducing.muse.ai/)。和 Grok Bot 的岗位模型对照，见文末那篇双产品对比，这里不把那篇再写一遍。

### Dots：ChatGPT 里的一个常驻管家

Dots 跑在 GPT-6 Astra 上。官方文档的说法是：它住在云端，有自己的电脑和浏览器；你的电脑关掉之后，它还可以继续做。它会用过往对话和偏好里的相关上下文，做研究、分析、准备文档、写软件。

现在先有一个 primary dot。你可以给它起名、改外形。名字会变成一个句柄，例如把 dot 命名为 Alfred 之后，句柄可以是 @tibo-alfred。文档写的是「你联系的是同一个 dot」：ChatGPT、Slack、Teams 或一通电话，换入口不会新开一个 dot，也不会把记忆清掉。[TechCrunch](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/) 引述 OpenAI：今天从 primary dot 开始；以后设想一组 Dots 一起干活。同一篇还写，OpenAI 设想 specialist dots，并说单个 dot 可以通过现有系统获得身份、凭据和工具。核对日的 Learn 文档没有写电话、邮箱或钱包，也没有把 specialist dots 或一组 Dots 写成可以打开的功能。这里记成报道中的设想，不是当前功能。

它从 ChatGPT memory 起步，再用 Codex 和你连接的工具接任务。对话之间它会自己看进度、决定下一步。你也可以让它在指定时区做一段时间的定时检查。后台可以用 background agents 并行做几件事。和 Codex 的关系是：它可以新建 Work 或 Codex 任务、接着做已有的本地 Codex 任务，也可以用你已经建好的 Codex 云环境。这些任务会计入 Work / Codex 自己的用量；和 dot 聊天本身不计入 ChatGPT 用量上限。

官方例子横跨工作和生活：发布会邮件还在承诺已经砍掉的功能，它准备修改稿等你看；财务会和孩子的演出撞期，它找到都能出席的时间，你点头之后再改会议；根据反馈改一版演示文稿；把反复出现的客户需求做成改动并测完，等工程 review；晚饭给出送达时间和总价，你批准之后才下单。

创建要在 ChatGPT 桌面应用或桌面浏览器里完成。手机 App 要等对应更新；手机网页不支持。之后可以在 ChatGPT 里发消息或打电话。Slack、Teams 也能联系它。短信是「接下来才上」，核对日还没有。

参考：[Dots 产品页](https://chatgpt.com/features/dots/)、[Meet dots](https://learn.chatgpt.com/docs/dots)、[TechCrunch 发布报道](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/)。

### Grok Bot：先定岗位，再持续派活

Grok Bot 的主界面是 Bot 名册。销售助理、采购分析、Bug 排查、研究助理可以各建一个。每个 Bot 有自己的名字、角色、对话和长期上下文。设计说明里的实用上限大约是每账号 50 个 Bot、每个群聊 6 个 Bot。

核心对象是 Bot、Chat、Prompt / Skill / Routine、Tool 和 Artifact。一次性指令可以收成 Skill，或收成按时间、Webhook、Git、Slack 启动的 Routine。人离开之后任务继续，需要决定时再回来找人。

这套模型适合责任长期存在的工作：每天看客户健康度并起草跟进；Webinar 之后把问答整理给销售；盯供应商续费；听 PR、失败的检查和安全告警，推到人工 Review；几个专业 Bot 在群聊里接力。

参考：[Grok Bot 发布公告](https://x.ai/news/introducing-grok-bot)、[设计说明](https://x.ai/news/designing-grok-bot)、[企业版](https://x.ai/news/grok-bot-for-enterprise)。

## 自动化与协作

四家都能在应用关掉之后继续做事。组织方式不同。

**Cue** 公开的协作是群聊交接，外加餐厅扫码后点餐或占位。官方博客没有为 Cue 写出定时任务、Webhook 或 Git 事件。Manus 2.0 的 Automations（新邮件、广告数据、日历、Slack、Notion）写在 Manus 本体那一节，不能直接记成 Cue 已经具备的触发器。中文媒体还提到把重复步骤收成例行流程，以及连接 Gmail、Trip.com 等服务。这些没有出现在英文官方博客的 Cue 小节，本文记为未经主公告核实。

**Muse** 的连续性在一个人身上。一个主 Agent 记住家庭、偏好和目标，不用先选岗位。它可以因为目标进展或环境变化主动回来，而不只跑一条预先写好的流程。邮件、日历、浏览、表单和购买被收成一条路径。入口是消息界面，也可以直接在 WhatsApp 里说。

**Dots** 的连续性也在一个人身上，但工作面在 ChatGPT 生态里。它会在对话之间接着做，并用 background agents 并行推进。主动研究（proactive research）只用已连接应用的只读工具：不能发消息、不能改应用内容、不能控制浏览器或电脑。真正往下做，还要过权限。你可以规定更新发到 ChatGPT 还是 Slack。定时检查要你写明时区和结束时间，它才会确认日程。文档没有把 Webhook、Git 事件或 Bot 名册写成 Dots 的触发器。

**Grok Bot** 的连续性在岗位上。研究、工程、销售各用一个 Bot，记忆不堆在同一条聊天里。Routine 可以由时间、Webhook、Issue、PR、CI 或 Slack 启动。Bot 之间可以群聊交接。Teams 与 Enterprise 有团队规则和模板分享策略；Enterprise 还有网络控制、SCIM、审计日志和 Action Recording。

「别漏掉孩子的活动报名」更接近 Cue、Muse，以及 Dots 文档里改日程、点晚饭那类例子。「谁负责每周供应商审计，并把结果交给工程 Bot」更接近 Grok Bot。Cue 和另外三者之间，再看你要的是多个对外身份，还是一个管家。

## 身份与运行环境

四家都给 Agent 一台云端电脑。电脑归谁、对外是谁，公开材料差得很远。

**Cue** 把身份写进产品：每个 Agent 自己的邮箱、电话、钱包和电脑。它可以发消息、在你设的预算里付款、接电话并留下摘要。官方没有说明这些电脑是不是彼此隔离的虚拟机，也没有说明它们和 Manus 2.0 里可购买的 Cloud Computer 是不是同一件商品。Cloud Computer 在公告里是给游戏服务器和长期自动化买的环境。Cue 的「电脑」写在每个 Agent 的身份配置里。在 Manus 把两者的关系写清楚之前，它们是公告里的两段不同描述。

**Muse** 是每位用户一台 Muse Secure VM。Agent、浏览器和这个人连上的数据放在这台机器上。安全服务和凭据存储与主 Agent 的运行单元分开。对外动作要经过 Sentinel。一个用户对应一个主管家，公开材料里没有给这个管家配独立电话号码。

**Dots** 是每个 dot 一台云电脑和自己的浏览器。云端浏览器的登录会话和你自己电脑上的浏览器是分开的。登录时，凭据进到对话外面的浏览器；你也可以 Take over，自己登完再把控制权还回去。保存的登录若要再次使用，需要你确认。可选再连一台个人电脑：同一时间只能连一台，ChatGPT 应用得开着、电脑得在线，dot 才能用上面的文件和应用。这和「把电脑连给 Codex」或打开 Work Sync 是分开的许可。连接 Slack 或 Teams 只是多一条说话的渠道，不会顺便连上邮箱或本地电脑。句柄是联系名，文档没有写独立电话号码、邮箱或钱包。

**Grok Bot** 是每位用户一台 Firecracker microVM，用户之间隔离。同一用户创建的全部 Bot 共享这台电脑上的文件、浏览器登录和命令行凭据。官方文档写明，不同 Bot 不是权限隔离。需要另一套电脑和凭据时，要用另一个 Cursor 用户。

## 安全、审批与隐私

让 Agent 同时读私有数据、看不受信任的网页，还能对外发消息或付款，提示注入和数据外泄都在。四家都没有声称风险已经消失。能比较的是公开材料把边界写到了哪一步。

### Cue：预算和最终决定已公开，安全架构还没有

官方博客写了两处人仍在环上：付款不超过你设定的预算；群聊里的方向和最后决定由你来做。它没有公布与 Muse Sentinel 或 Grok Bot 安全文档同级的说明。Agent 之间是否隔离、凭据存在哪里、对话是否默认用于训练、数据放在哪个国家、提示注入怎么拦，目前都是未知。

「每个 Agent 有自己的电脑」还不能据此认为它们互不可见，也不能据此认为 Manus 员工访问不到这些邮箱和钱包。中文媒体写过用户可设定访问范围，以及哪些操作必须本人审批。那是二级报道，不是英文官方博客里的架构说明。在 Manus 发布安全文档之前，这些点保持未知。

### Muse：审批和凭据边界写得更细

每位用户一台 Secure VM。主模型看不到真实密码和付款信息。连接器动作和网络出口由独立的 Sentinel 决定。需要确认时，审批出现在客户端，而不是让 Muse 在聊天里自己问自己。

公开的防护还包括运行容器隔离、最小权限连接器、凭据替换、提示注入分类器、数据流污染追踪、浏览器接管时暂停 Agent，以及付款时绑定商户和金额的单次卡号。Link（Stripe）被写成购买保护的路径。Shop Pay 和 1Password 在发布时仍是即将支持。

边界也要一起看：

- Meta 承认 Muse 仍会出错，提示注入仍是未解决问题。
- 当前靠政策限制内部访问。支持、安全或运营需要时，Meta 仍可能访问数据。
- 去掉关键个人信息后的对话和 Agent 轨迹，默认可以用于训练。可以在设置里退出。
- 发布稿单独写明：Muse 对话和 VM 里的数据不进入 Meta 广告系统。
- 「连 Meta 也无法访问」的 Muse Confidential VM 计划在今年晚些时候推出，不是当前默认。

参考：[Muse 安全架构](https://security.muse.ai/)、[发布公告](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)。

### Dots：Custom Rules 和自动复查，密码仍要你自己改

产品页写：可能影响账号或对外分享信息的动作，会经过 Auto-review，对照你的指令、Custom Rules 和安全要求。有的要你批准。改密码这种步骤留在你手里。[控制文档](https://learn.chatgpt.com/docs/dots/controls)用的说法是自动复查（automatic review），对照指令、权限、Custom Rules 和内置安全要求，决定放行、请你批准，或把某一步交给你做。两页描述的是同一类检查；文档没有把它写成和 Muse Sentinel 同级的独立安全服务。

Custom Rules 在 Settings → Personalization 的 Permissions 一节里，是可选的持续边界。四种处理方式：

- 不问就做；
- 只有你明确要求时才做，否则先问；
- 做之前先问；
- 交给你本人做。

规则管的是「何时可以做这个动作」。文风、更新方式仍放在对话指令里。规则不能凭空打开一个应用或电脑，不能压过内置安全要求，也不能取消「使用已保存登录需要确认」。工作区可以关掉 Custom Rules。规则是 dot 会去遵守的说明，官方写明它仍会犯错。

数据方面：ChatGPT 的数据控制也覆盖符合条件的 dot 对话和它做的工作。OpenAI 写明，不会直接用 proactive research 或其私人笔记训练模型。若这些内容进了符合条件的对话或任务，就改走你的 ChatGPT 数据设置。用户之间的云电脑是否硬件隔离、数据放在哪个国家，控制文档没有写，这里标为未知。停掉任务不会撤销已经发生的动作；删掉 dot 也不会收回已经发出的消息或已经改过的外部数据。

### Grok Bot：企业治理更完整，Bot 不是安全边界

不同用户的 Firecracker microVM 互相隔离。同一用户的 Bot 共享电脑，文件和登录不按 Bot 切开。

安全评审里还有四条：

1. Grok Bot 需要云端数据存储，不支持 Cursor 的 Legacy Privacy Mode。
2. 隐私和训练退出跟随 Cursor 账号设置。
3. 目的地址白名单要 Enterprise 的 Network Controls。自助 Teams 没有这项。没有策略时，网络默认 allow-all。
4. 云电脑目前在美国。本地部署、自带镜像和 On-premise 都不支持。

企业版提供身份、网络、审批、日志和 SIEM 衔接。愿意购买 Enterprise 并认真配置的团队，治理路径比普通消费级 Agent 更完整。参考：[审批、安全与隐私](https://docs.x.ai/grok-bot/approvals-security-and-privacy)、[安全 FAQ](https://docs.x.ai/grok-bot/security-faq)、[团队与企业](https://docs.x.ai/grok-bot/teams-and-enterprises)。

## 价格与可用性

### Cue

早期体验，凭邀请码免费。官方起步码是 MEETCUE，限量、先到先得。拿到资格的人还会再拿到可以转给别人的邀请码。英文官方博客没有写具体名额。IT之家同日把名额写成前 1000 位。这个数字没有出现在英文主公告里，本文不把它当成已确认上限。

早期体验结束之后的月费、额度和分档：**未知**。官方没有公布。

入口方面，公告写网页、桌面和移动端已经可用，iOS 在 App Store 审核通过后推出。公告没有单独确认 Android 商店是否已经上架，只写了 mobile。

### Muse

发布稿的说法是：大部分日常所需免费，想做更多的人会有订阅。**截至 2026-09-30，9 月 8 日的发布稿仍没有公布月费、额度或各档差异。** 社区和二手报道里的美元价格、每周 token 数，本文不采用。

9 月 8 日的发布范围是美国，入口为 iOS、Android 和 muse.ai，对话也可以走 WhatsApp。AI 眼镜仍是 coming soon。9 月 18 日，[iPhone in Canada](https://www.iphoneincanada.ca/2026/09/18/metas-muse-ai-agent-is-now-available-in-canada/) 引述 Meta 的公开帖，称加拿大已经开放。官方帮助中心没有在核对日给出完整国家列表。能打开 muse.ai，不等于账号已经在发布批次里。

### Dots

[可用性说明](https://learn.chatgpt.com/docs/dots)把入口写成现有套餐，没有另列一份 Dots 价目：

- Pro 100、Pro 200、Pro 500：18 岁以上，且人在欧洲经济区、英国、瑞士之外；
- Business Premium：全球陆续开放；
- Enterprise：全球陆续开放，默认关闭，要工作区管理员打开。

套餐符合条件也不保证马上看得到，文档写的是逐步开放。和 dot 的对话不计入 ChatGPT 用量上限。它在 Work 或 Codex 里启动、管理的任务，按那两个产品自己的额度计。文档还写套餐包含一份「更深工作」的额度，上线后第一个月有放宽的上限。具体数字没有公布，这里标为**未知**。第二只 dot、或一组 Dots 的价格，同样未公布。Pro 100 / 200 / 500 这几个名字本身不是本文要换算成美元的依据；核对日没有在定价页上逐项复核它们的月费。

### Grok Bot

Grok Bot 没有单独订阅。入口是下面之一：

- Cursor Pro / Pro+ / Ultra；
- Cursor Teams。自助方案里每个成员都有，不需要另加 Premium 席位；
- Cursor Enterprise，需由客户经理开通；
- 关联个人 SuperGrok、SuperGrok Plus、SuperGrok Heavy，或 X Premium+；
- 一次性试用额度。试用按用量扣，同时还有 7 天窗口。用完不恢复。

2026-09-29 核对的 [Cursor 定价页](https://cursor.com/pricing) 公开起价：个人 Pro **$20/月**，Teams **$40/人/月**，Enterprise 为定制。本文核对日没有重抓该页。包含用量按周重置。用完之后，若打开 on-demand，通过 Cursor 继续计费。Cursor 套餐和 SuperGrok / X Premium+ 的额度不叠加。各档每周的具体步数或 token 上限，计划页只用 “weekly / generous / highest” 描述，没有给出可引用的固定数字，这里标为未公布。

参考：[Grok Bot 计划与计费](https://cursor.com/help/grok-bot/plans)。

## 中国大陆怎么看

四款都还不能写成国内开箱即用。

- **Cue。** 英文官方博客没有国家清单，也没有写大陆网络、支付和电话号码是否可用。IT之家 2026-09-28 报道，Manus 表示正在组建面向国内市场的团队，与国产模型厂商的合作在进行；Manus 2.0 面向海外用户发布，国内版本仍在筹备。在国内产品上线之前，Cue 还不能当成大陆可稳定使用的方案。
- **Muse。** 发布稿写的是美国。加拿大来自之后引述 Meta 帖子的报道，不是发布稿原文。大陆不在已公开范围内。
- **Dots。** Pro 的已写明范围是欧洲经济区、英国、瑞士之外的 18 岁以上用户。Business Premium 和 Enterprise 写「全球陆续开放」，但可用性页没有点名中国大陆。ChatGPT 账号和网络在大陆能不能用，是另一层条件。文档也没有写本地部署。
- **Grok Bot。** 云电脑在美国，没有本地部署。账号、订阅、网络和第三方登录都会影响能不能用。

四者都会碰到邮箱、日历、文件或付款。企业数据出境要看合同和实际路径。尝鲜时用无关紧要的整理和草稿。主邮箱、生产环境和支付方式留到权限边界看清楚之后。

## 怎么选

### 选 Cue，如果你：

- 要处理预约、出行、购物、排队和家庭杂务，而不是公司里的岗位流程；
- 在意 Agent 自己有邮箱、电话、钱包和电脑，能对外发消息、接电话、在预算内付款；
- 愿意用多个 Agent 的群聊来分工，自己做最后决定；
- 接受邀请制早期体验，并接受安全架构、额度和大陆可用性仍未公开。

### 选 Muse，如果你：

- 要一个长期了解你的管家，而不是管理一组各自对外联络的 Agent；
- 主要任务是邮件、日历、出行、购物、家庭和长期目标；
- 在意凭据隔离、Sentinel 审批和可读的活动记录；
- 想从免费的日常额度开始，并且人在美国，或已确认自己在加拿大等后续开放地区。

### 选 Dots，如果你：

- 已经在用 ChatGPT，并希望同一个管家接着用 Codex 和已连接的应用；
- 要一个 primary dot，而不是现在就组一支有电话号码的 Agent 团队；
- 接受用 Custom Rules 和自动复查来卡住发信、改账号、对外分享；
- 人在 Pro 的开放地区，或所在的 Business Premium / Enterprise 工作区已经打开 Dots。

### 选 Grok Bot，如果你：

- 要给销售、运营、工程分别配 Agent；
- 需要定时、Webhook、Git 或 Slack 驱动的长期任务；
- 已经订阅 Cursor、符合条件的 SuperGrok 或 X Premium+；
- 需要团队、SSO、网络限制和审计；
- 接受任务跑在 Cursor 托管的美国云电脑上，并记得同一账号的 Bot 共享这台电脑。

### 四个都不该选，如果你：

- 必须本地或私有化部署；
- 不能让第三方云环境处理敏感数据；
- 需要已经确定的中国大陆可用性；
- 无法接受首发产品的变化和误操作。

## 结论

Cue 和 Muse 都在做个人生活 Agent。Cue 公开的差异是 Agent 自己的电话、邮箱、钱包和电脑。Muse 公开的差异是一个管家，加上写得比较细的 Secure VM 和 Sentinel。Dots 站在 Muse 这一侧：一个长期管家，但是 ChatGPT / Codex 里的 primary dot，电脑和浏览器是它自己的，审批走 Custom Rules 和自动复查。Grok Bot 仍是另一类产品：按岗位保留的工作同事，Routine 和企业治理更完整，同一用户的 Bot 共享一台云电脑。

**生活杂务、要独立对外身份，优先看 Cue 的邀请体验。个人事务、要看清审批和凭据边界，优先 Muse。人已经在 ChatGPT 里，优先看 Dots 能不能在你的套餐和地区打开。公司工作流和多岗位分工，优先 Grok Bot。** Cue 的月费和隔离方式、Dots 的单独价格和更深工作额度、Muse 的订阅价，官方都还没写清。没写的部分保持未知。

只比较 Grok Bot 和 Muse 的更细版本：[Grok Bot vs Muse AI（2026）](/zh/compare/grok-bot-vs-muse-ai-2026/)。

---

*最后核对：2026-09-30。Cue 的主来源是 Manus 2.0 官方博客；国内市场表述来自 IT之家对 Manus 当日说明的报道。Muse 来自 Meta 发布、安全和设计页；加拿大开放来自引述 Meta 公开帖的报道。Dots 来自 ChatGPT 产品页、Learn 文档和 TechCrunch 的 DevDay 报道。Grok Bot 来自 xAI / Cursor 文档；Cursor 公开起价沿用 2026-09-29 的定价页核对。未公布的价格和额度保持未知。*
