---
title: "App 增加短信验证码登录：阿里云短信 + Supabase 完整方案"
description: "手把手教你用阿里云短信服务替换 Twilio，配合 Supabase Edge Functions 实现国内可用的手机验证码登录，无需代理，适合独立开发者和小团队。"
date: "2026-03-15"
tags: ["supabase", "阿里云", "短信验证码", "登录", "edge-functions", "国内"]
draft: false
---

Twilio 在国内无法直连，Supabase 默认的手机验证又依赖 Twilio——这让许多国内开发者在接入短信登录时碰壁。本指南提供一套完整替代方案：**阿里云短信服务发码 + Supabase Edge Functions 验证 + Supabase Auth 签发 JWT**，全程无需代理，代码可直接复用。

## 整体架构

```
用户输入手机号
    ↓
前端调用 Edge Function: send-otp
    ↓
Edge Function 生成 6 位 OTP → 写入 Supabase DB（带过期时间）
    → 调用阿里云短信 API 发送验证码
    ↓
用户收到短信，输入验证码
    ↓
前端调用 Edge Function: verify-otp
    ↓
Edge Function 校验 OTP → 用 Supabase Admin 创建/登录用户 → 返回 session
    ↓
前端拿到 access_token，完成登录
```

> **为什么不用 Supabase 内置手机验证？** Supabase 官方支持 Twilio、Vonage 等，均需要海外网络。本方案绕过内置 Phone Auth，用 Custom Auth Flow 完全托管在你自己的 Edge Function 中，更灵活，也更适合国内环境。

---

## 前置要求

- Supabase 项目（免费层即可）
- 阿里云账号，已完成实名认证
- 已申请短信签名和模板（见第一步）
- Node.js 18+ 本地开发环境
- Supabase CLI（`npm install -g supabase`）

---

## 第一步：配置阿里云短信服务

### 1.1 开通短信服务

1. 登录 [阿里云短信服务控制台](https://dysms.console.aliyun.com/)
2. 首次使用需开通服务，点击「立即开通」
3. 开通后进入「国内消息」

### 1.2 申请短信签名

1. 进入「签名管理」→「添加签名」
2. 签名来源选「企业/APP」，填写应用名称作为签名（如：`猪猪记账`）
3. 上传相关资质文件，等待审核（1 个工作日内）

> **注意**：签名审核通过前无法发送真实短信，开发阶段可在「测试专用签名」中使用 `阿里云短信测试`。

### 1.3 申请短信模板

1. 进入「模板管理」→「添加模板」
2. 选「验证码」类型，填写模板内容：

```
您的验证码为：${code}，${minute}分钟内有效，请勿泄露。
```

3. 等待审核通过，记下**模板 CODE**（如 `SMS_123456789`）

### 1.4 获取 AccessKey

1. 进入「RAM 访问控制」→ 创建子用户（**不要用主账号 AK**）
2. 给子用户授权 `AliyunDysmsFullAccess` 策略
3. 创建 AccessKey，保存 `AccessKeyId` 和 `AccessKeySecret`

---

## 第二步：准备 Supabase 数据库表

在 Supabase SQL Editor 中执行：

```sql
-- 存储 OTP 验证码（5 分钟过期后自动清理）
create table if not exists otp_codes (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  code        text not null,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default (now() + interval '5 minutes'),
  used        boolean not null default false
);

-- 索引：按手机号查询
create index on otp_codes (phone);

-- RLS：只允许 service_role 访问（Edge Function 用 service_role key）
alter table otp_codes enable row level security;

-- 定时清理过期记录（可选，避免表膨胀）
-- 需要在 Supabase Dashboard → Database → Extensions 中开启 pg_cron
-- select cron.schedule('clean-otp', '*/10 * * * *', $$
--   delete from otp_codes where expires_at < now();
-- $$);
```

---

## 第三步：创建 Supabase Edge Functions

初始化本地 Edge Functions 目录（如果还没有）：

```bash
supabase init
supabase login
supabase link --project-ref <your-project-ref>
```

### 3.1 共享工具模块：阿里云短信签名

创建 `supabase/functions/_shared/aliyun-sms.ts`：

```typescript
// 阿里云短信发送（使用 HMAC-SHA1 签名 + 手动拼接请求）
// 无需 SDK，Deno/Edge Function 原生支持

export interface AliyunSmsConfig {
  accessKeyId: string;
  accessKeySecret: string;
  signName: string;       // 短信签名
  templateCode: string;   // 短信模板 CODE
}

function percentEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

async function hmacSha1(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function sendSms(
  config: AliyunSmsConfig,
  phone: string,
  templateParams: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  const params: Record<string, string> = {
    AccessKeyId: config.accessKeyId,
    Action: 'SendSms',
    Format: 'JSON',
    PhoneNumbers: phone,
    SignName: config.signName,
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: crypto.randomUUID().replace(/-/g, ''),
    SignatureVersion: '1.0',
    TemplateCode: config.templateCode,
    TemplateParam: JSON.stringify(templateParams),
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z/, 'Z'),
    Version: '2017-05-25',
  };

  // 排序参数并构造待签名字符串
  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys
    .map(k => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join('&');

  const stringToSign = `GET&${percentEncode('/')}&${percentEncode(canonicalQuery)}`;
  const signature = await hmacSha1(config.accessKeySecret + '&', stringToSign);

  const finalQuery = canonicalQuery + `&Signature=${percentEncode(signature)}`;
  const url = `https://dysmsapi.aliyuncs.com/?${finalQuery}`;

  const resp = await fetch(url);
  const data = await resp.json();

  if (data.Code === 'OK') {
    return { success: true, message: 'sent' };
  } else {
    console.error('Aliyun SMS error:', data);
    return { success: false, message: data.Message || data.Code };
  }
}
```

### 3.2 发送验证码：`send-otp`

创建 `supabase/functions/send-otp/index.ts`：

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendSms } from '../_shared/aliyun-sms.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// 频率限制：同一手机号 60 秒内只能发 1 次
async function isRateLimited(phone: string): Promise<boolean> {
  const { count } = await supabase
    .from('otp_codes')
    .select('*', { count: 'exact', head: true })
    .eq('phone', phone)
    .gte('created_at', new Date(Date.now() - 60_000).toISOString());
  return (count ?? 0) > 0;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { phone } = await req.json();

  // 基础手机号格式校验（中国大陆 11 位）
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return Response.json({ error: '手机号格式不正确' }, { status: 400 });
  }

  if (await isRateLimited(phone)) {
    return Response.json({ error: '发送太频繁，请 60 秒后再试' }, { status: 429 });
  }

  // 生成 6 位随机验证码
  const code = String(Math.floor(100000 + Math.random() * 900000));

  // 写入数据库（旧的未使用验证码不会影响，仅保留最新）
  const { error: dbError } = await supabase.from('otp_codes').insert({
    phone,
    code,
    expires_at: new Date(Date.now() + 5 * 60_000).toISOString(),
  });

  if (dbError) {
    console.error('DB insert error:', dbError);
    return Response.json({ error: '服务异常，请稍后重试' }, { status: 500 });
  }

  // 调用阿里云短信
  const result = await sendSms(
    {
      accessKeyId: Deno.env.get('ALIYUN_ACCESS_KEY_ID')!,
      accessKeySecret: Deno.env.get('ALIYUN_ACCESS_KEY_SECRET')!,
      signName: Deno.env.get('ALIYUN_SMS_SIGN_NAME')!,
      templateCode: Deno.env.get('ALIYUN_SMS_TEMPLATE_CODE')!,
    },
    phone,
    { code, minute: '5' }
  );

  if (!result.success) {
    return Response.json({ error: `短信发送失败：${result.message}` }, { status: 502 });
  }

  return Response.json({ success: true });
});
```

### 3.3 验证码校验 + 登录：`verify-otp`

创建 `supabase/functions/verify-otp/index.ts`：

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { phone, code } = await req.json();

  if (!phone || !code) {
    return Response.json({ error: '参数缺失' }, { status: 400 });
  }

  // 查找最近一条有效、未使用的验证码
  const { data: otpRecord, error } = await supabase
    .from('otp_codes')
    .select('id, code, expires_at')
    .eq('phone', phone)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !otpRecord) {
    return Response.json({ error: '验证码不存在或已过期' }, { status: 400 });
  }

  if (otpRecord.code !== code) {
    return Response.json({ error: '验证码错误' }, { status: 400 });
  }

  // 标记验证码已使用
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('id', otpRecord.id);

  // 用 admin API 登录或注册用户
  // 约定：邮箱 = phone@sms.local（内部标识，不对外暴露）
  const fakeEmail = `${phone}@sms.local`;
  const password = Deno.env.get('SMS_USER_PASSWORD_SALT')! + phone;

  // 先尝试登录，失败则注册
  let session = null;
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: fakeEmail,
    password,
  });

  if (signInError) {
    // 用户不存在，创建新用户
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email: fakeEmail,
      password,
      email_confirm: true,
      user_metadata: { phone },
    });

    if (signUpError) {
      console.error('Create user error:', signUpError);
      return Response.json({ error: '注册失败，请联系客服' }, { status: 500 });
    }

    // 创建后立即登录
    const { data: afterSignUp } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });
    session = afterSignUp?.session;
  } else {
    session = signInData?.session;
  }

  if (!session) {
    return Response.json({ error: '登录失败，请重试' }, { status: 500 });
  }

  return Response.json({
    success: true,
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
  });
});
```

---

## 第四步：配置环境变量

在 Supabase Dashboard → Project Settings → Edge Functions → Secrets 中添加：

| 变量名 | 说明 |
|--------|------|
| `ALIYUN_ACCESS_KEY_ID` | 阿里云 RAM 子用户 AK |
| `ALIYUN_ACCESS_KEY_SECRET` | 阿里云 RAM 子用户 SK |
| `ALIYUN_SMS_SIGN_NAME` | 短信签名（如：猪猪记账）|
| `ALIYUN_SMS_TEMPLATE_CODE` | 短信模板 CODE（如：SMS_123456789）|
| `SMS_USER_PASSWORD_SALT` | 自定义随机字符串，用于派生内部密码 |

> `SMS_USER_PASSWORD_SALT` 是一个你自己设置的随机字符串（如 `aBc$xyz!`），用于在"手机号 → 内部邮箱账号"模式下派生用户密码。**一旦设定不可修改**，否则所有用户将无法登录。

本地开发时，创建 `supabase/functions/.env`：

```bash
ALIYUN_ACCESS_KEY_ID=your_ak
ALIYUN_ACCESS_KEY_SECRET=your_sk
ALIYUN_SMS_SIGN_NAME=猪猪记账
ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789
SMS_USER_PASSWORD_SALT=your_random_salt
```

---

## 第五步：部署 Edge Functions

```bash
# 部署两个函数
supabase functions deploy send-otp
supabase functions deploy verify-otp

# 设置 secrets（生产环境）
supabase secrets set \
  ALIYUN_ACCESS_KEY_ID=your_ak \
  ALIYUN_ACCESS_KEY_SECRET=your_sk \
  ALIYUN_SMS_SIGN_NAME="猪猪记账" \
  ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789 \
  SMS_USER_PASSWORD_SALT=your_random_salt
```

---

## 第六步：前端接入（React 示例）

```typescript
import { useState } from 'react';

const SUPABASE_ANON_KEY = 'your-anon-key';
const SUPABASE_URL = 'https://xxxx.supabase.co';
const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1`;

function SmsLoginForm() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    setLoading(true);
    const res = await fetch(`${FUNCTIONS_BASE}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setCodeSent(true);
      // 60 秒倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      alert(data.error);
    }
  }

  async function handleVerify() {
    setLoading(true);
    const res = await fetch(`${FUNCTIONS_BASE}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ phone, code }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // 保存 token，跳转首页
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      window.location.href = '/home';
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="login-form">
      <h2>手机号登录</h2>
      <input
        type="tel"
        placeholder="请输入手机号"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        maxLength={11}
      />
      {!codeSent ? (
        <button onClick={handleSendCode} disabled={loading || phone.length !== 11}>
          {loading ? '发送中...' : '获取验证码'}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="请输入 6 位验证码"
            value={code}
            onChange={e => setCode(e.target.value)}
            maxLength={6}
          />
          <button onClick={handleSendCode} disabled={countdown > 0}>
            {countdown > 0 ? `${countdown}s 后重发` : '重新发送'}
          </button>
          <button onClick={handleVerify} disabled={loading || code.length !== 6}>
            {loading ? '验证中...' : '登录 / 注册'}
          </button>
        </>
      )}
    </div>
  );
}
```

---

## 费用参考

| 服务 | 费用 |
|------|------|
| 阿里云短信（国内验证码） | 约 ¥0.045/条 |
| Supabase 免费层 | 50,000 MAU、500MB 数据库，完全够用 |
| Supabase Pro | $25/月（10 万 MAU） |
| Edge Function 调用 | 免费层 500 万次/月 |

**粗算**：1000 次登录约 ¥45 短信费，Supabase 免费层撑住大多数独立应用早期阶段。

---

## 常见问题

### Q：收不到短信怎么排查？

1. 检查 Edge Function 日志（Supabase Dashboard → Functions → Logs）
2. 确认阿里云短信签名/模板审核已通过
3. 确认 RAM 子用户有 `AliyunDysmsFullAccess` 权限
4. 用阿里云短信控制台「发送记录」查看是否有拦截

### Q：如何在 Flutter / React Native 中使用？

只需把 `fetch` 换成对应语言的 HTTP 库（`dio`、`http` 等），接口不变。收到 `access_token` 后存入 `FlutterSecureStorage` 或 `AsyncStorage`，并用 Supabase 客户端 SDK 手动设置 session：

```dart
await supabase.auth.setSession(accessToken: token, refreshToken: refreshToken);
```

### Q：`@sms.local` 邮箱模式安全吗？

该邮箱只在 Supabase 内部使用，永远不会发送邮件。用户通过短信验证码完成所有身份认证，邮箱仅作数据库主键用途，且密码由 `SALT + 手机号` 派生，只有拥有 `SALT` 的服务端才能计算——安全风险可控。若有更高安全要求，可改为调用 `supabase.auth.admin.generateLink()` 生成 magic link 后直接返回 session，彻底不暴露密码逻辑。

### Q：能否支持海外手机号？

阿里云短信支持国际短信，需要在控制台开通「国际/港澳台」并申请国际短信模板，费用按目的地国家计费。代码层面只需在手机号前加国家代码（如 `+1xxxxxxxxxx`），并放开格式校验正则。

---

## 总结

| 步骤 | 工具 | 耗时 |
|------|------|------|
| 申请短信签名 + 模板 | 阿里云控制台 | 1 个工作日审核 |
| 创建数据库表 | Supabase SQL Editor | 5 分钟 |
| 部署 2 个 Edge Functions | Supabase CLI | 10 分钟 |
| 接入前端 | React / Flutter | 30 分钟 |

整体接入时间约半天，是目前**国内短信登录 + Supabase**最简洁的可落地方案。遇到问题欢迎在 [GitHub Issues](https://github.com/WhiteWorld/codepick/issues) 反馈。
