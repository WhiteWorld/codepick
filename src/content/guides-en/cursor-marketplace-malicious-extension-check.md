---
title: "A malicious Claude Code extension appeared in Cursor's marketplace. How should you check?"
description: "Separate data-exposure notices from the extension check. Use the official window to decide whether to inspect a machine, explain why uninstalling is not enough, and point to official detection and cleanup steps. This article did not run those scripts on a real computer."
date: "2026-11-19"
article_type: howto
tags: [cursor, security, claude-code, marketplace]
pillar: workflow
content_status: keep
locale_strategy: mirrored
draft: true
---

> Checked November 19, 2026 (Asia/Shanghai), against Cursor's [security notice](https://cursor.com/blog/claude-code-extension-security-notice) published on October 29, 2026 and updated on October 30, and the [investigation update](https://cursor.com/blog/security-incident-update) of November 13, 2026. This article only organizes public statements. It did not run the official check or remediation scripts on a real computer, and it did not perform independent forensics.

If you have not received a notice from Cursor, do not conclude that you are unaffected. **Whether any of your data was copied, and whether this computer installed a tampered extension, are separate questions.**

Cursor says that if your session data appeared in the copied records, they contacted you directly; if you did not receive that kind of notice, your data was not in those records. That answers whether training traces were taken. It does not answer whether you should inspect the extension on this machine.

The extension question depends on whether, during the official window, you installed or updated a tampered version from Cursor's VS Code extension marketplace. A missing data notice does not let you skip that check.

For subscriptions and mainland-China access, see the [Cursor tool page](/en/tool/cursor/) and the [China usage guide](/en/guides/cursor-china-usage/). For broader agent-permission practice, see the [AI coding agent security guide](/en/guides/ai-coding-agent-security-2026/).

## Separate the two tracks

| What you are worried about | What Cursor says | What to do now |
| --- | --- | --- |
| Whether prompts, code, or account data were copied | The November 13 update: prompts and code were not affected if you use Privacy Mode. For users not using Privacy Mode, coding-agent traces were exposed for fewer than 0.05% of users, and Cursor says it notified each of them. If you did not receive a notification, your data was not in these traces. API credentials appeared in traces for less than 0.01% of customers. If customer-support or business data may have been involved, Cursor says it notified those customers directly. | Check email and in-product notices first. A missing notice does not mean the extension is automatically fine. |
| Whether this computer installed a tampered extension | From about 2:27 a.m. to 1:35 p.m. Pacific Time on October 29, 2026 (daylight time, UTC-7; about 17:27 on October 29 to 04:35 on October 30 in Asia/Shanghai), unauthorized copies of `Anthropic.claude-code` 2.1.312 and 2.1.313 for Windows and macOS appeared on the cache used by Cursor's VS Code extension marketplace. Cursor later said at most about 5,000 users who requested those cached versions that day potentially received the malicious build, and that it was available for approximately 11 hours. The marketplace source, Open VSX, never had the malware, and Anthropic did not publish this copy. | If you installed or updated either version from that marketplace during the window, follow the official notice to check and clean up. Uninstalling the extension alone may not be enough. |

The Asia/Shanghai times are converted from the official Pacific Time window. The notices do not state a China-time deadline.

## Who should inspect a machine

The official notice describes the check for people who, during that window, installed or updated `Anthropic.claude-code` 2.1.312 or 2.1.313 from Cursor's VS Code extension marketplace on macOS or Windows.

Falling outside that description is not the same as having finished a forensic review. Also note:

- “At most about 5,000 users” is an upper bound on people who requested specific cached versions that day, not a count of confirmed infections.
- The tampered packages Cursor named are Windows and macOS builds. The indicators updated on October 30 also list Linux paths and scheduled jobs. This article does not treat Linux as officially excluded. If you used Cursor's extension marketplace on Linux, still compare the official indicators; do not skip the check only because the named packages were for Windows and macOS.
- Cursor states that official Cursor app updates, live traffic you are sending to Cursor now, customer code repositories, other extensions in the marketplace, and plugins downloaded from the Cursor Marketplace were not in the scope of this tampered extension. Those are official conclusions, not a marketplace audit we repeated.


## If you cannot remember an install in that window, the official quick check is still a reasonable first step

Many people no longer know whether they had 2.1.312 or 2.1.313, or whether it came from Cursor's VS Code extension marketplace. The official check population is those two versions in that window, but the quick check itself does not require reinstalling the extension or first recovering an install log.

If you are unsure, the more cautious path is to run the official quick check on each computer that may have installed or updated the relevant extension from that marketplace during the window, then decide whether to move on to cleanup. Remembering a different version, or remembering an install from Open VSX or Anthropic's own distribution, is not a substitute for the official conditions. It is also not evidence that you have already ruled them out.

If this is a work computer or a machine other people can log into, run the check under the account that actually used Cursor. The official macOS command looks at that user's `~/.ssh/authorized_keys`. The Windows command also looks at `C:\ProgramData\ssh\administrators_authorized_keys`. Checking only your laptop does not mean the office machine has been checked.

If you only use Cursor and never installed the Claude Code extension, you are outside the official extension-check description. The data-notification track still stands on its own.

## How the official check works

Do not copy cleanup scripts from reprints or chat logs. Use the [official security notice](https://cursor.com/blog/claude-code-extension-security-notice) for the latest steps, complete indicators, and scripts.

The official quick check looks for a public key labeled `svc-telemetry` in authorized-keys files. The notice gives these commands:

macOS:

```bash
grep -qs svc-telemetry ~/.ssh/authorized_keys && echo "svc-telemetry key found" || echo "No key found; machine not impacted"
```

Windows (PowerShell):

```powershell
$files = "$HOME\.ssh\authorized_keys", "C:\ProgramData\ssh\administrators_authorized_keys" | Where-Object { Test-Path $_ }
if ($files -and (Select-String svc-telemetry $files)) { "svc-telemetry key found" } else { "No key found; machine not impacted" }
```

Cursor says that if the key is found, the machine is impacted. This command only searches for `svc-telemetry` in those authorized-keys files. The notice also lists other files, persistence items, processes, and network indicators. “No key found” is the result of this quick check, not a complete forensic clearance on its own. A permission or read error, or any other failure of the command, is not the same as “no key found,” and must not be treated as a negative result; have an administrator investigate. The commands above are quoted from the official notice; this article does not rewrite them as verified scripts, and it did not run them on a real computer.

Cursor also published the unauthorized public-key fingerprint `SHA256:0Z6R+DF64Do2nwQic8a7kkfDLNNk4IiK+2U2Rci4htk` and the reverse-tunnel key fingerprint `SHA256:KOAU57+ZG6u3MG4WwzPzPX2O5YEe9qdOC1Bl+6MVyDQ`. Use the notice for the full public key, package hashes, and network indicators.

## If you find it, uninstalling the extension is not enough

Cursor is explicit: the payload drops standalone persistence that can keep running, so uninstalling the extension may not be sufficient.

If the quick check finds the key, or you find official indicators consistent with payload execution or backdoor installation from this incident, follow the notice:

1. Isolate the host.
2. Search endpoint, network, and extension-installation telemetry against the official indicators. Ordinary SSH activity, or a single generic filename on its own, should not be treated as confirmation that cleanup is required; match the evidence to payload execution or backdoor installation from this incident.
3. Use the official remediation scripts on affected systems. On macOS, download `remediate-macos.sh` and run `bash remediate-macos.sh` as the affected user, not as root, from the folder you saved it to. On Windows, download `remediate-windows.ps1` and run `powershell -ExecutionPolicy Bypass -File .\remediate-windows.ps1` from PowerShell opened with Run as Administrator, in the folder you saved it to. Cursor says the scripts remove the malicious extension, persistence mechanisms, running tunnel processes, and the attacker's SSH key, and exit with a non-zero status if anything remains.
4. Rotate credentials and sessions accessible from the affected host, from a trusted system. Cursor notes that the limited environment-variable collection does not rule out later credential access over the backdoor.
5. Assess whether the host should be rebuilt.

This article did not run these remediation scripts, and it did not verify their effect on a current system. For questions, Cursor gives security@cursor.com.

## How Cursor describes the incident

Do the investigation first, then read the background, so the details do not come first.

The November 13 investigation update says the incident started with an access key Cursor had issued to its inference vendor Fireworks. The key was exposed by Fireworks, and the attacker used it to copy data from a read-only storage bucket. That bucket contained limited coding-agent traces, mostly from 2025, from sessions not in Privacy Mode, which Cursor says it was permitted to use for model training. A small number of those traces contained credentials that had not been redacted. Starting with those credentials, the attacker reached select SaaS tools used by Cursor, and from there accessed select archived non-production source repositories, limited customer-support data and email conversations, product-usage metrics and contact details, summaries of some coding-agent conversations, and some credentials users had sent to the Cursor support team.

After monitoring systems identified unauthorized activity, Cursor deactivated the vendor key and began rotating credentials and cutting off further access. Out of an abundance of caution, it temporarily disabled internal and product services beyond what the evidence required, which temporarily disrupted some Cursor features, then restored them.

On October 29, using a stolen credential from data exposed from Cursor's internal systems, the attacker placed unauthorized copies of the Claude Code extension on the cache used to serve Cursor's VS Code extension marketplace. Cursor emphasizes that Anthropic did not publish this copy, this was not a vulnerability in Anthropic's product, and Open VSX never had the malware.

About the extension, Cursor says it attempts to collect host and user information, add an attacker-controlled SSH key to `authorized_keys`, and open a reverse SSH tunnel with persistence. It also states two limits: the attacker server was taken offline with the cloud provider, so the reverse shell and host-detail POST are not functional; and on most macOS and Windows hosts where Cursor was not started with administrator privileges, enabling the local SSH service fails, so the attacker could not have logged in through the tunnel. Cursor still asks readers to follow the remediation steps, because the extension may already have added the key, installed persistence, and sent host details.

Cursor believes the incident is contained. It says the last attacker activity it has seen was on November 1 and was blocked. If it identifies additional information that affects customers, it says it will contact them directly.

These are official statements. We did not reproduce the attack, and we did not independently verify that the server is offline or confirm the last activity date.

## Common misreadings

- **No email means you can skip the extension check.** The data notice and the extension window are separate.
- **Uninstalling the extension finishes the job.** Cursor explicitly says that may not be enough.
- **This is a vulnerability in Anthropic's official extension.** Cursor says Anthropic did not publish this copy, and this was not a vulnerability in Anthropic's product.
- **Other marketplace extensions are also unsafe.** Cursor says it validated that all other extensions were authentic and rebuilt the marketplace; that is not a sampling exercise we repeated.
- **The official quick check printed “not impacted,” so the machine is fully clean.** That check only looks for the key comment in the named files.
- **Checking the laptop you use most is enough.** Check each machine that may have installed or updated the relevant extension from that marketplace during the window. If you cannot remember, use the official quick check. Shared accounts especially should not be skipped. Do not broaden the scope to every machine that has ever run Cursor.


## Do not widen the problem while you investigate

- Do not download the official remediation scripts from an unknown drive or chat log; get them from the official notice.
- Do not post full hostnames, usernames, authorized-keys files, or check output that contains personal environment details in a public thread. If you need help, write to security@cursor.com, or share only what is necessary in a controlled channel.
- Do not install 2.1.312 or 2.1.313 just to "verify again." The notice is about installs or updates that already happened in the window.
- The commands and filenames in this article follow the official notice as of the check date. If that page is updated, follow the latest text.

## What this article did not do

It did not install the extension on a real or virtual machine, run the official check or remediation scripts, verify hashes, network indicators, or persistence items, or assess whether any specific account was on the notification list. Percentages, the user cap, the time window, and the “not affected” scope all come from the official pages as they stood on the check date.

Security guidance and the notices may change. When handling an affected machine, follow the latest text of Cursor's official notices.

### Official sources (all checked November 19, 2026, Asia/Shanghai)

- [Security notice — malicious version of Anthropic.claude-code (2.1.312 and 2.1.313)](https://cursor.com/blog/claude-code-extension-security-notice): window, versions, quick-check commands, remediation-script usage, and indicators. Updated at 11:30 a.m. Pacific Time on October 30, 2026, with IOCs and clarified affected versions.
- [An update on our recent security incident](https://cursor.com/blog/security-incident-update): the November 13, 2026 investigation conclusions, data-impact scope, notification rules, and the official list of what was not affected.
