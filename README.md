# SugarFlow AI (v2)

Hackathon prototype for a sugar-company operations platform. Next.js 14 App
Router + TypeScript + Tailwind + Supabase.

## What changed in this version

- **Real account creation.** Signup/login now use your actual name, email,
  and password — never placeholder account data. All *operational* data
  (farms, trucks, payments, etc.) is still clearly labeled demo data.
- **No email-verification wait required.** Turn off **Confirm email** in
  Supabase: Dashboard → Authentication → Providers → Email. With it off,
  signup returns a session immediately and the app skips straight to the
  dashboard — no "check your inbox" step.
- **Fully responsive.** Sidebar collapses to a slide-over drawer below the
  `lg` breakpoint, all grids/tables stack on small screens, topbar shrinks
  gracefully.
- **Signup abuse prevention (real, not cosmetic).** A disposable-email
  domain blocklist and a Postgres-backed rate limit (3 signups/IP per 15
  min, 2 attempts/email per 24h) run server-side in
  `app/api/auth/signup/route.ts` before any account is created. See
  `lib/security/` and migration `0005_signup_security.sql`.
- **Signup trigger bug fixed** (`0004_fix_signup_trigger.sql`) — schema-
  qualified + pinned `search_path`, fixes "Database error saving new user."
- **Charts switched to real ECharts** (`echarts` + `echarts-for-react`,
  `components/dashboard/EChart.tsx`) on Command Center and Mill & Supply,
  replacing Recharts. This was a best guess at "charts should be real like
  echarts" — flag it if you meant something else (e.g. the AI chat feel).

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Run the migrations in `supabase/migrations/` **in order** via the Supabase
SQL Editor, then in Supabase Dashboard → Authentication → Providers → Email,
turn **off** "Confirm email."

```bash
npm run dev
```

## Honest real-vs-demo map

| Feature | Real | Demo fallback |
|---|---|---|
| Account creation / login | Supabase Auth, real rows | Demo Mode if Supabase isn't configured |
| Farm Intelligence | Supabase `farms` table | `lib/data/farms-demo.ts` if query fails/empty |
| Harvest / Transport / Mill / Payments / Alerts | — | `lib/data/*-demo.ts` (not yet wired to Supabase) |
| AI chat (`/dashboard/alerts`) | Real Anthropic call if `ANTHROPIC_API_KEY` set | Deterministic keyword fallback, tagged `source` |
| M-Pesa payments | Would use real Daraja creds | Sandbox mode by default, clearly labeled |
| "Ledger" | Plain Postgres table | Not a blockchain — never claimed as one |

## Known gaps

- Only Farm Intelligence is wired to live Supabase data; the rest still read
  local demo files (same as the previous version).
- Reports, Settings, and Profile pages aren't built yet — the brief
  mentioned them but they weren't part of the 9 core screens built so far.
- This rebuild was done from the project's documented architecture and
  code, not from the original reference screenshots (those only ever
  existed as chat images and aren't available to re-check pixel-for-pixel
  fidelity). Visual layout follows the same design tokens and structure as
  before, but may not match the original screenshots to the pixel.
