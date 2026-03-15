---
title: "Add SMS Verification Login to Your App: Alibaba Cloud SMS + Supabase Complete Guide"
description: "Step-by-step guide to replacing Twilio with Alibaba Cloud SMS and implementing phone OTP login using Supabase Edge Functions — no VPN required, works in China."
date: "2026-03-15"
tags: ["supabase", "alibaba-cloud", "sms", "otp", "login", "edge-functions", "china"]
draft: false
---

Twilio doesn't work reliably in mainland China, and Supabase's built-in phone auth depends on Twilio — leaving many developers stuck when implementing SMS login. This guide provides a complete alternative: **Alibaba Cloud SMS for sending codes + Supabase Edge Functions for verification + Supabase Auth for JWT issuance**. No VPN required, and the code is ready to use.

## Architecture Overview

```
User enters phone number
    ↓
Frontend calls Edge Function: send-otp
    ↓
Edge Function generates 6-digit OTP → writes to Supabase DB (with expiry)
    → calls Alibaba Cloud SMS API to send the code
    ↓
User receives SMS, enters the code
    ↓
Frontend calls Edge Function: verify-otp
    ↓
Edge Function validates OTP → uses Supabase Admin to create/sign-in user → returns session
    ↓
Frontend receives access_token — login complete
```

> **Why not use Supabase's built-in Phone Auth?** Supabase officially supports Twilio and Vonage, both of which require overseas network access. This solution bypasses the built-in Phone Auth and uses a fully custom auth flow managed inside your own Edge Functions — more flexible and fully compatible with the China network environment.

---

## Prerequisites

- A Supabase project (free tier is sufficient)
- An Alibaba Cloud account with real-name verification completed
- An approved SMS signature and template (see Step 1)
- Node.js 18+ local development environment
- Supabase CLI (`npm install -g supabase`)

---

## Step 1: Set Up Alibaba Cloud SMS Service

### 1.1 Enable SMS Service

1. Log in to the [Alibaba Cloud SMS Console](https://dysms.console.aliyun.com/)
2. Enable the service for the first time by clicking "Activate Now"
3. Navigate to "Domestic Messages"

### 1.2 Apply for an SMS Signature

1. Go to "Signature Management" → "Add Signature"
2. Select "Enterprise/App" as the source, and enter your app name as the signature (e.g., `PiggyTracker`)
3. Upload the required qualification documents and wait for approval (within 1 business day)

> **Note:** Real SMS cannot be sent until your signature is approved. During development, use the test signature `Alibaba Cloud SMS Test`.

### 1.3 Apply for an SMS Template

1. Go to "Template Management" → "Add Template"
2. Select "Verification Code" type, and fill in the template content:

```
Your verification code is: ${code}, valid for ${minute} minutes. Do not share it.
```

3. Wait for approval and note down the **Template CODE** (e.g., `SMS_123456789`)

### 1.4 Get an AccessKey

1. Go to "RAM Access Control" → create a sub-user (**never use your root account AK**)
2. Grant the sub-user the `AliyunDysmsFullAccess` policy
3. Create an AccessKey and save the `AccessKeyId` and `AccessKeySecret`

---

## Step 2: Prepare the Supabase Database Table

Run the following in Supabase SQL Editor:

```sql
-- Store OTP codes (auto-expire after 5 minutes)
create table if not exists otp_codes (
  id          uuid primary key default gen_random_uuid(),
  phone       text not null,
  code        text not null,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default (now() + interval '5 minutes'),
  used        boolean not null default false
);

-- Index for phone-based lookups
create index on otp_codes (phone);

-- RLS: only allow service_role access (Edge Functions use the service_role key)
alter table otp_codes enable row level security;

-- Optional: scheduled cleanup to prevent table bloat
-- Requires pg_cron extension (Supabase Dashboard → Database → Extensions)
-- select cron.schedule('clean-otp', '*/10 * * * *', $$
--   delete from otp_codes where expires_at < now();
-- $$);
```

---

## Step 3: Create Supabase Edge Functions

Initialize the Edge Functions directory if you haven't already:

```bash
supabase init
supabase login
supabase link --project-ref <your-project-ref>
```

### 3.1 Shared Utility: Alibaba Cloud SMS Signing

Create `supabase/functions/_shared/aliyun-sms.ts`:

```typescript
// Alibaba Cloud SMS sender using HMAC-SHA1 signing (no SDK required)
// Works natively in Deno / Edge Functions

export interface AliyunSmsConfig {
  accessKeyId: string;
  accessKeySecret: string;
  signName: string;       // SMS signature
  templateCode: string;   // SMS template CODE
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

### 3.2 Send OTP: `send-otp`

Create `supabase/functions/send-otp/index.ts`:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendSms } from '../_shared/aliyun-sms.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Rate limiting: max 1 send per phone number per 60 seconds
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

  // Basic phone number validation (Chinese mainland 11-digit format)
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return Response.json({ error: 'Invalid phone number format' }, { status: 400 });
  }

  if (await isRateLimited(phone)) {
    return Response.json({ error: 'Too many requests. Please wait 60 seconds.' }, { status: 429 });
  }

  // Generate a 6-digit OTP
  const code = String(Math.floor(100000 + Math.random() * 900000));

  const { error: dbError } = await supabase.from('otp_codes').insert({
    phone,
    code,
    expires_at: new Date(Date.now() + 5 * 60_000).toISOString(),
  });

  if (dbError) {
    console.error('DB insert error:', dbError);
    return Response.json({ error: 'Service error. Please try again.' }, { status: 500 });
  }

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
    return Response.json({ error: `SMS send failed: ${result.message}` }, { status: 502 });
  }

  return Response.json({ success: true });
});
```

### 3.3 Verify OTP + Login: `verify-otp`

Create `supabase/functions/verify-otp/index.ts`:

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
    return Response.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Find the most recent valid, unused OTP for this phone
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
    return Response.json({ error: 'Code not found or expired' }, { status: 400 });
  }

  if (otpRecord.code !== code) {
    return Response.json({ error: 'Incorrect verification code' }, { status: 400 });
  }

  // Mark code as used
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('id', otpRecord.id);

  // Sign in or create user via admin API
  // Convention: email = phone@sms.local (internal identifier, never exposed)
  const fakeEmail = `${phone}@sms.local`;
  const password = Deno.env.get('SMS_USER_PASSWORD_SALT')! + phone;

  let session = null;
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: fakeEmail,
    password,
  });

  if (signInError) {
    // User doesn't exist — create a new account
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email: fakeEmail,
      password,
      email_confirm: true,
      user_metadata: { phone },
    });

    if (signUpError) {
      console.error('Create user error:', signUpError);
      return Response.json({ error: 'Registration failed. Please contact support.' }, { status: 500 });
    }

    const { data: afterSignUp } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });
    session = afterSignUp?.session;
  } else {
    session = signInData?.session;
  }

  if (!session) {
    return Response.json({ error: 'Login failed. Please try again.' }, { status: 500 });
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

## Step 4: Configure Environment Variables

In Supabase Dashboard → Project Settings → Edge Functions → Secrets, add:

| Variable | Description |
|----------|-------------|
| `ALIYUN_ACCESS_KEY_ID` | Alibaba Cloud RAM sub-user AK |
| `ALIYUN_ACCESS_KEY_SECRET` | Alibaba Cloud RAM sub-user SK |
| `ALIYUN_SMS_SIGN_NAME` | SMS signature (e.g., `PiggyTracker`) |
| `ALIYUN_SMS_TEMPLATE_CODE` | SMS template CODE (e.g., `SMS_123456789`) |
| `SMS_USER_PASSWORD_SALT` | A random string for deriving internal passwords |

> `SMS_USER_PASSWORD_SALT` is a random string you define (e.g., `aBc$xyz!`), used to derive user passwords in the "phone → internal email account" model. **Once set, never change it** — doing so will lock out all existing users.

For local development, create `supabase/functions/.env`:

```bash
ALIYUN_ACCESS_KEY_ID=your_ak
ALIYUN_ACCESS_KEY_SECRET=your_sk
ALIYUN_SMS_SIGN_NAME=PiggyTracker
ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789
SMS_USER_PASSWORD_SALT=your_random_salt
```

---

## Step 5: Deploy Edge Functions

```bash
# Deploy both functions
supabase functions deploy send-otp
supabase functions deploy verify-otp

# Set secrets for production
supabase secrets set \
  ALIYUN_ACCESS_KEY_ID=your_ak \
  ALIYUN_ACCESS_KEY_SECRET=your_sk \
  ALIYUN_SMS_SIGN_NAME="PiggyTracker" \
  ALIYUN_SMS_TEMPLATE_CODE=SMS_123456789 \
  SMS_USER_PASSWORD_SALT=your_random_salt
```

---

## Step 6: Frontend Integration (React Example)

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
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      window.location.href = '/home';
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="login-form">
      <h2>Phone Login</h2>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        maxLength={11}
      />
      {!codeSent ? (
        <button onClick={handleSendCode} disabled={loading || phone.length !== 11}>
          {loading ? 'Sending...' : 'Get Verification Code'}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={e => setCode(e.target.value)}
            maxLength={6}
          />
          <button onClick={handleSendCode} disabled={countdown > 0}>
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
          <button onClick={handleVerify} disabled={loading || code.length !== 6}>
            {loading ? 'Verifying...' : 'Login / Register'}
          </button>
        </>
      )}
    </div>
  );
}
```

---

## Cost Estimate

| Service | Cost |
|---------|------|
| Alibaba Cloud SMS (domestic verification) | ~¥0.045/message |
| Supabase Free Tier | 50,000 MAU, 500MB database — enough for most early-stage apps |
| Supabase Pro | $25/month (100k MAU) |
| Edge Function invocations | 5 million/month free |

**Rough estimate**: 1,000 logins = ~¥45 in SMS fees. The Supabase free tier handles most indie apps at early stage.

---

## FAQ

### Q: SMS not being received — how do I debug?

1. Check Edge Function logs (Supabase Dashboard → Functions → Logs)
2. Confirm your Alibaba Cloud SMS signature and template are approved
3. Verify that the RAM sub-user has the `AliyunDysmsFullAccess` permission
4. Check "Send Records" in the Alibaba Cloud SMS Console for any blocks

### Q: How do I integrate this in Flutter / React Native?

Replace `fetch` with the HTTP library of your choice (`dio`, `http`, etc.). The API contract is identical. After receiving `access_token`, store it in `FlutterSecureStorage` or `AsyncStorage`, then restore the session in the Supabase client SDK:

```dart
await supabase.auth.setSession(accessToken: token, refreshToken: refreshToken);
```

### Q: Is the `@sms.local` email pattern secure?

This email is only used internally within Supabase and will never receive any actual emails. Users complete all authentication via SMS OTP — the email exists solely as a database primary key. The password is derived from `SALT + phone`, meaning only the server holding the `SALT` can compute it. Security risk is low. For higher security requirements, consider calling `supabase.auth.admin.generateLink()` to generate a magic link and return a session directly, eliminating the password derivation entirely.

### Q: Can I support international phone numbers?

Alibaba Cloud SMS supports international messaging — enable "International/HK/Macao/Taiwan" in the Console and apply for an international template. Fees vary by destination country. In the code, simply accept phone numbers with country codes (e.g., `+1xxxxxxxxxx`) and update the validation regex accordingly.

---

## Summary

| Step | Tool | Time |
|------|------|------|
| Apply for SMS signature + template | Alibaba Cloud Console | 1 business day (approval) |
| Create database table | Supabase SQL Editor | 5 minutes |
| Deploy 2 Edge Functions | Supabase CLI | 10 minutes |
| Integrate frontend | React / Flutter | 30 minutes |

Total integration time: roughly half a day. This is the simplest production-ready approach for **SMS login + Supabase** that works in mainland China. Questions and feedback welcome at [GitHub Issues](https://github.com/WhiteWorld/codepick/issues).
