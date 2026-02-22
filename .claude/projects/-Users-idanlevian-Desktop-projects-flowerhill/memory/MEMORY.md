# Flower Hill Project Memory

## Project Overview
B2B wholesale flower business website — "גבעת הפרחים / Flower Hill"
URL: https://www.flowerhill.co.il

## Stack
- Next.js 16.1.6 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4
- Yarn 4.12.0 with **node-modules linker** (NOT PnP — Turbopack incompatible with PnP)
- Deployment target: Vercel

## Critical Fix
`.yarnrc.yml` must have `nodeLinker: node-modules` — Yarn PnP breaks Turbopack.

## Pages Built
- `/` — Homepage (Hero, categories, audience segments, trust, CTA)
- `/products` — Product catalog (4 categories)
- `/contact` — Quote request form + contact methods
- `/about` — Company story, values, quality standards
- `/suppliers` — Grower/supplier partnership program
- `/services` — Export/Import page
- `/resources` — FAQ accordion + document downloads

## Design System
- **Direction**: RTL Hebrew-first (`dir="rtl"` on `<html>`)
- **Language**: Hebrew primary, `lang="he"`
- **Primary color**: green-800/900 (`#166534`)
- **Accent**: amber-400 for CTAs
- **Typography**: Geist Sans (variable font)

## Business Logic Confirmed
- Pricing: Mixed (standard + custom quotes). Logged-in customers see prices.
- Accounts: Existing login system preserved — NOT rebuilt in Phase 1
- Catalog: Mixed (curated core + seasonal updates)
- Quote workflow: Manual follow-up by sales team
- Market: Primarily Israeli B2B (florists, event designers, hotels, wholesalers)
- No baseline analytics yet — GA4 to be set up

## Component Architecture
- `app/components/Header.tsx` — Sticky RTL nav with mobile hamburger + floating WhatsApp
- `app/components/Footer.tsx` — Dark footer with 4-column links
- All pages are Server Components except Header (uses useState for mobile menu)

## TBD Items (need stakeholder input)
- Actual phone number (placeholder: TBD)
- Physical address
- WhatsApp number
- Exact delivery windows by region
- Pricing tiers
- Downloadable catalog files
- Certifications (GLOBALGAP etc.)
- Login system integration details

## Phase 2 (after launch)
- Account system redesign
- Full catalog with pricing for logged-in users
- Analytics (GA4 events)
- Advanced product filtering / search
- Email notification system for quote requests
