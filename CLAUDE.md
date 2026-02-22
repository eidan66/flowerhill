# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server (Turbopack)
yarn build      # Production build
yarn lint       # ESLint
yarn start      # Serve production build
```

No test suite is configured yet.

## Critical: Yarn PnP is disabled

`.yarnrc.yml` must keep `nodeLinker: node-modules` — Yarn PnP is incompatible with Turbopack and will break the dev server with a "next/package.json not found" error. Never remove this line.

## Stack

- **Next.js 16.1.6** — App Router, Turbopack, Server Actions, `proxy.ts` (replaces middleware)
- **React 19** — use `useActionState` (not the deprecated `useFormState`)
- **Tailwind CSS v4** — `@import "tailwindcss"` in `globals.css`, no `tailwind.config.*` file. Do not use CSS wildcard selectors (`[dir="rtl"] .ml-*`) — Turbopack's CSS parser rejects them.
- **TypeScript** — path alias `@/*` → `./*` (project root)

## Internationalization (i18n)

URL structure: `/he/...` (Hebrew, default, RTL) and `/en/...` (English, LTR). Bare paths (e.g. `/login`) redirect to `/he/login` via `proxy.ts`.

`proxy.ts` injects an `x-locale` response header that the root layout reads to set `<html lang dir>`. All pages live under `app/[locale]/` and receive `params.locale`.

Translation files: `app/lib/i18n/he.ts` (source of truth, defines `Dict` type) and `app/lib/i18n/en.ts` (must satisfy `Dict`). Do NOT use `as const` on either — it would make `Dict` use literal string types and break English assignments.

Pattern for pages:
```tsx
const { locale } = await params;
const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
const t = dict.pageName;
```

Client components receive translation slices as props (`t: Dict["login"]`) — never import translation files in `"use client"` components directly.

Language switcher in `Header.tsx` swaps the locale prefix in the current pathname.

## Architecture

### Server / Client component split

The Header is split into two files to allow both interactive state (mobile menu) and server-side session reading:

- `app/components/HeaderServer.tsx` — async Server Component; reads the cookie session and passes `isLoggedIn` + `userName` as props
- `app/components/Header.tsx` — `"use client"` component; owns mobile menu state

`app/layout.tsx` imports `HeaderServer`, never `Header` directly.

### Auth system

All auth is in two files:

- `app/lib/session.ts` — cookie-based session (encode/decode base64 JSON). **Not cryptographically signed** — replace with a signed JWT from the real backend when integrating. Cookie name: `fh_session`, 7-day expiry.
- `app/actions/auth.ts` — three Server Actions: `loginAction`, `logoutAction`, `forgotPasswordAction`, `registerAction`. Each checks `process.env.AUTH_API_URL`; if set it calls the real backend, otherwise falls back to a dev stub (dev only). The integration point is clearly marked with `── BACKEND CALL ──` comments in each action.

Route protection is in `proxy.ts` (Next.js 16 name for middleware). It reads the raw cookie directly (no import from session lib) because proxy runs at the Edge runtime.

### Pages and their rendering

All pages are **dynamic/SSR** because `HeaderServer` reads cookies, which opts them out of static rendering. Pages under `/account` additionally call `getSession()` and redirect to `/login` if null.

### Form pattern

All forms use `useActionState(action, initialState)` in a `"use client"` component, paired with a Server Action. The page shell is a Server Component that exports `metadata`. Example: `app/login/page.tsx` (server) → `LoginForm.tsx` (client).

## Business context

B2B wholesale flowers site (Hebrew, RTL). The site is a lead-generation and catalog tool — **not an e-commerce checkout**. The primary conversion action is "בקש הצעת מחיר" (quote request). Pricing is login-gated. Registration submits a request for manual approval; it does not auto-create an account.

## Environment variables

| Variable | Purpose |
|---|---|
| `AUTH_API_URL` | Base URL of the existing Flower Hill backend API. If unset, dev stubs are used. |

Set in `.env.local` (not committed).

## RTL / Hebrew notes

- `<html lang="he" dir="rtl">` is set in `app/layout.tsx`
- Phone/email inputs use `dir="ltr"` individually
- All user-facing copy is Hebrew
