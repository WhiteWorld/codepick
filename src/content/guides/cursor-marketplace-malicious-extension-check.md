---
title: "Cursor 市场里出现过恶意 Claude Code 扩展，我该怎么查？"
description: "把数据泄露通知和扩展排查分开。按官方窗口判断要不要查机器，说明只卸载扩展不够，并指向官方检查与清理步骤。本文没有在真实电脑上执行这些脚本。"
date: "2026-11-19"
article_type: howto
tags: [cursor, security, claude-code, marketplace]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
---

> 核查日：2026-11-19（北京时间）。依据 Cursor 在 2026-10-29 发布、2026-10-30 更新的[安全公告](https://cursor.com/blog/claude-code-extension-security-notice)，以及 2026-11-13 的[调查更新](https://cursor.com/blog/security-incident-update)。本文只整理公开说明，没有在真实电脑上运行官方检查或清理脚本，也没有独立取证。

没收到 Cursor 的通知，先别下结论说「我没事」。**数据有没有被取走，和这台电脑有没有装过被篡改的扩展，是两条线。**

官方说：若你的会话数据出现在被拷走的记录里，他们会直接通知；没收到这类通知，就表示你的数据不在那些记录里。这回答的是「训练用痕迹有没有被取走」，不是「要不要查这台机器上的扩展」。

扩展这条线，要看你有没有在官方给出的时间窗口里，从 Cursor 的 VS Code 扩展市场安装或更新到被篡改的版本。没收到数据通知，也不能自动跳过这一步。

Cursor 的订阅和国内使用说明见 [Cursor 工具页](/zh/tool/cursor/) 和 [国内使用指南](/zh/guides/cursor-china-usage/)。更一般的 Agent 权限问题见 [AI 编程 Agent 安全指南](/zh/guides/ai-coding-agent-security-2026/)。

## 先分清两条线

| 你在担心什么 | 官方怎么说 | 你现在该做什么 |
| --- | --- | --- |
| 提示词、代码、账号数据有没有被拷走 | 11 月 13 日更新：Privacy Mode 下的提示词和代码未受影响；未开 Privacy Mode 时，编码 Agent 痕迹被暴露的用户不到 0.05%，官方称已逐一通知。若没收到通知，你的数据不在这些痕迹里。API 凭证出现在痕迹中的客户不到 0.01%。客服资料、商务联系信息等如被涉及，也会直接通知。 | 先查邮件和产品内通知。不要把「没收到通知」理解成扩展也一定没问题。 |
| 这台电脑有没有装过被篡改的扩展 | 10 月 29 日约 2:27–13:35 太平洋时间（当年此时为夏令时，UTC-7；换算成北京时间约为 10 月 29 日 17:27 至 10 月 30 日 04:35），Cursor 的 VS Code 扩展市场缓存里出现过未授权的 `Anthropic.claude-code` 2.1.312 和 2.1.313，面向 Windows 和 macOS。官方后来说，当天请求过这些缓存版本的用户最多约 5000 人，扩展大约存在 11 小时。来源市场 Open VSX 从未包含该恶意包，也不是 Anthropic 发布的版本。 | 若窗口内从该市场安装或更新过这两个版本，按官方公告检查和清理。只卸载扩展不够。 |

北京时间是按官方太平洋时间换算的，公告原文没有写中国时区截止时刻。

## 什么情况需要查机器

官方公告把检查对象写成：在上述窗口内，于 macOS 或 Windows 上，从 Cursor 的 VS Code 扩展市场安装或更新到 `Anthropic.claude-code` 2.1.312 或 2.1.313。

不在这个范围内，也不等于已经做完取证。还要注意：

- 「最多约 5000 人」指当天请求过特定缓存版本的上限，不是已确认中招人数。
- 官方点名的被篡改安装包是 Windows 和 macOS 版本；但 10 月 30 日更新后的指标里，也列了 Linux 路径和计划任务。本文不把 Linux 写成「官方已排除」。若你在 Linux 上用过 Cursor 的扩展市场，仍应对照官方指标，不要只根据「安装包写的是 Windows / macOS」直接跳过。
- 官方写明：Cursor 应用本身的正式更新、当前发往 Cursor 的实时流量、客户代码仓库、市场里的其他扩展，以及从 Cursor Marketplace 下载的插件，都不在这次被篡改扩展的范围内。这是官方结论，不是我们复查市场后的背书。


## 记不清有没有在窗口里装过，也可以先做官方快速检查

很多人对「当时装的是不是 2.1.312 / 2.1.313、是不是从 Cursor 的 VS Code 扩展市场来的」已经没有把握。官方把重点检查对象写成窗口内的这两个版本，但快速检查本身并不要求你再装一遍扩展，也不要求你先找回安装记录。

若你不确定，更稳妥的做法是：先在这台曾经运行过 Cursor 的电脑上，执行公告里的快速检查，再决定要不要进入清理步骤。记得装过其他版本、或记得是从 Open VSX、Anthropic 自己的分发渠道装的，都不能代替对照官方条件；但也不要把回忆写成已经排除。

如果这是公司或别人也会登录的电脑，要在实际运行 Cursor 的那个用户账户下检查。官方的 macOS 命令看的是该用户的 `~/.ssh/authorized_keys`；Windows 命令还会看 `C:\ProgramData\ssh\administrators_authorized_keys`。只在自己的笔记本上查过，不等于办公室那台已经查过。

若你只用 Cursor，从未安装 Claude Code 扩展，你就不在官方描述的扩展检查对象里。数据通知那条线仍然要单独看。

## 官方怎么检查

不要从转载页或聊天记录里复制清理脚本。到 [官方安全公告](https://cursor.com/blog/claude-code-extension-security-notice) 查看最新步骤、完整指标和脚本。

官方给的快速检查，是在授权密钥文件里找注释为 `svc-telemetry` 的公钥。公告原文是：

macOS：

```bash
grep -qs svc-telemetry ~/.ssh/authorized_keys && echo "svc-telemetry key found" || echo "No key found; machine not impacted"
```

Windows（PowerShell）：

```powershell
$files = "$HOME\.ssh\authorized_keys", "C:\ProgramData\ssh\administrators_authorized_keys" | Where-Object { Test-Path $_ }
if ($files -and (Select-String svc-telemetry $files)) { "svc-telemetry key found" } else { "No key found; machine not impacted" }
```

官方说：如果找到这把密钥，机器已受影响。请注意，这条命令只查上述授权密钥文件里的 `svc-telemetry`。公告还列出了其他文件、持久化项、进程和网络指标。没找到这把密钥，是这条快速检查的结果，不能单独当作完整取证结论。本文没有在真实电脑上执行这些命令。

官方还公布了未授权公钥指纹 `SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk`，以及反向隧道密钥指纹 `SHA256:KOAU57+ZG6u3MG4WwzPzPX2O5YEe9qdOC1Bl+6MVyDQ`。完整公钥、安装包哈希和网络指标以公告为准。

## 如果查到了，只卸载扩展不够

官方写得很清楚：恶意代码会留下可独立运行的持久化项，只卸载扩展可能不够。

若快速检查找到密钥，或出现其他官方指标，按公告处理：

1. 隔离这台机器。
2. 对照官方指标，检查终端、网络和扩展安装记录。
3. 用官方清理脚本处理受影响系统：macOS 下载 `remediate-macos.sh`，以受影响用户（不要用 root）在保存目录执行 `bash remediate-macos.sh`；Windows 下载 `remediate-windows.ps1`，用「以管理员身份运行」的 PowerShell 在保存目录执行 `powershell -ExecutionPolicy Bypass -File .\remediate-windows.ps1`。官方说脚本会移除被篡改扩展、持久化项、隧道进程和攻击者 SSH 密钥，若仍有残留会以非零状态退出。
4. 从一台可信设备，轮换这台机器能访问的凭证和会话。官方提醒：扩展收集的环境变量名字是有限的，但不能排除后门后续又拿到了别的凭证。
5. 评估这台机器是否需要重装。

本文没有运行这些清理脚本，也没有验证它们在当前系统上的效果。有疑问可写给官方给出的 security@cursor.com。

## 官方如何描述这串事件

把排查做完后，再看背景，避免先被细节带着跑。

11 月 13 日的调查更新说，起因是 Cursor 签发给推理供应商 Fireworks 的访问密钥被 Fireworks 暴露。攻击者用它拷走了一个只读存储桶里的有限编码 Agent 痕迹，主要是 2025 年、且未开 Privacy Mode、Cursor 称可用于模型训练的会话。少量痕迹里有未被脱敏的凭证。攻击者再进入 Cursor 使用的部分 SaaS 工具，访问了部分已归档的非生产代码库、有限客服与邮件、用量与联系信息、部分编码会话摘要，以及用户发给 Cursor 支持团队的部分凭证。

官方监控发现异常后，停用了该供应商密钥，并开始轮换凭证、切断后续访问。出于谨慎，他们一度关闭了超出证据范围的内部和产品服务，部分 Cursor 功能因此中断，随后再恢复。

10 月 29 日，攻击者用从内部系统暴露数据中拿到的凭证，把未授权的 Claude Code 扩展放到 Cursor VS Code 扩展市场使用的缓存上。官方强调：这不是 Anthropic 产品的漏洞，Open VSX 源站从未包含该恶意包。

针对扩展，官方说它会尝试收集主机和用户信息，把攻击者的 SSH 公钥写入 `authorized_keys`，并尝试打开反向 SSH 隧道和持久化。官方同时写了两条限制：攻击者服务器已被云厂商下线，反向 shell 和主机信息上报已不可用；在大多数未以管理员权限启动 Cursor 的 macOS / Windows 机器上，打开本机 SSH 服务这一步会失败，攻击者无法通过隧道登录。但官方仍要求：扩展可能已经写入公钥、安装持久化并发送主机信息，因此仍要按公告处理。

官方认为事件已受控，称看到的最后一次攻击者活动是 11 月 1 日，且已被阻断。如有影响客户的新情况，他们会再直接联系。

这些都是官方陈述。我们没有复现攻击，也没有独立验证服务器已下线或最后活动时间。

## 常见误判

- **没收到邮件，就不用查扩展。** 数据通知和扩展窗口是分开的。
- **已经卸载扩展，所以结束了。** 官方明确说可能不够。
- **这是 Anthropic 官方扩展的漏洞。** 官方写明不是 Anthropic 发布的版本，也不是 Anthropic 产品漏洞。
- **市场里其他扩展也不安全。** 官方称已验证其余扩展为真，并重建了市场；这不是我们抽检后的结论。
- **官方快速检查输出 “not impacted”，等于整机已清理完毕。** 它只检查指定文件里的密钥注释。
- **只在自己常用的那台电脑上查过就够了。** 窗口里用过 Cursor 的每一台机器都要单独看，尤其是共用账户。


## 排查时别把问题扩大

- 不要把官方清理脚本存到来路不明的网盘或聊天记录后再下载，只从官方公告获取。
- 不要在公共讨论里贴出完整主机名、用户名、授权密钥文件，或带有个人环境信息的检查输出。需要协助时，写给官方的 security@cursor.com，或在受控渠道里提供必要片段。
- 不要为了「再验证一次」特意安装 2.1.312 或 2.1.313。公告针对的是窗口内已经发生的安装或更新。
- 本文引用的命令和文件名以核查日的官方公告为准；若页面有更新，以最新文本为准。

## 本文没做的事

没有在真实或虚拟机上安装该扩展，没有执行官方检查或清理脚本，没有验证哈希、网络指标或持久化项，也没有评估某个具体账号是否在被通知名单里。百分比、人数上限、时间窗口和「未受影响」的范围，全部来自官方页面在核查日的表述。

安全机制和公告可能会再更新。处理受影响机器时，以 Cursor 官方公告的最新文本为准。

### 官方依据（均于 2026-11-19，北京时间核对）

- [Security notice — malicious version of Anthropic.claude-code (2.1.312 and 2.1.313)](https://cursor.com/blog/claude-code-extension-security-notice)：窗口、版本、快速检查命令、清理脚本用法、指标；2026-10-30 11:30 太平洋时间更新了指标并澄清受影响版本。
- [An update on our recent security incident](https://cursor.com/blog/security-incident-update)：2026-11-13 的调查结论、数据影响范围、通知规则，以及官方列出的未受影响项。
