# Cursor Prompt Pack — FlowerHill (flowerhill.co.il) Modern Web App Rebuild/Upgrade
Generated: 2026-02-22

This document is intended to be pasted into **Cursor + Claude Code** as the project prompt/context.
Goal: build a **modern, high-quality, maintainable** web application that replaces or significantly modernizes the existing website and preserves current business logic (especially login) while improving UX/UI, performance, SEO, and conversions.

---

## 0) Core Goal (Non-negotiable)
Modernize **Flower Hill / Givat HaPrakhim** into a professional **B2B wholesale** platform:
- Modern UX/UI (mobile-first, responsive, accessible)
- Bilingual: **Hebrew RTL primary**, English optional secondary
- Strong trust/credibility positioning (B2B export/import)
- Catalog browsing that is fast and clear
- Clear “Request Quote / Contact Sales” actions
- Preserve existing login capability (do NOT break current customers)

---

## 1) Known Current Site Structure (Routes, Navigation, Clicks)

### 1.1 Main Navigation (Primary Menu)
These appear as top-level navigation routes on the current site:

- `/` — Home
- `/page_13375` — About Us
- `/page_13245` — Events & Florists (אירועים ושוזרים)
- `/page_13247` — Import (יבוא)
- `/page_13097` — Export (יצוא)
- `/page_13285` — Growers & Suppliers (מגדלים וספקים)
- `/page_13376` — Shops & Hotels (חנויות ובתי מלון)
- `/page_13243` — Downloadable Forms (טפסים להורדה)
- `/contact` — Contact page (form + directions + email)
- `/LoginPage` — Customer Club login/registration

### 1.2 Catalog Navigation (Secondary Menu)
- `/page_13277` — “All results” / catalog index (broad listing)
- `/product_list_2level?c0=14308` — Flowers & Fillers (פרחים ופילרים)
- `/product_list_2level?c0=14309` — Specials & Decorative Branches (מיוחדים וענפי קישוט)
- `/product_list_2level?c0=14310` — Greens (ירוקים)
- `/product_list_2level?c0=14311` — Roses (ורדים)
- `/product_list_2level?c0=15459` — Nursery (המשתלה)
- `/product_list_2level?c0=14313` — Accessories & Tools (אביזרים וכלים)

### 1.3 Dynamic/Pattern Routes (Generate Many Pages)
- `/page_{ID}` — many static CMS pages
- `/product_list_2level?c0={ID}` — category lists
- `/product?c0={ID}` — product detail pages

### 1.4 Import/Export Subpages (Known)
Import subpages:
- `/page_13358` — Import Flowers
- `/page_13360` — Flowers (under Import)
- `/page_13368` — Bulbs
- `/page_13366` — Fluorescent
- `/page_13364` — Flower dyes
- `/page_13362` — Flower accessories

Export:
- `/page_13356` — Export Bulbs
- `/page_13097` — Export (general)

### 1.5 Legal/Other
- `/page_13263` — Careers (דרושים)
- `/page_13231` — Terms/Regulations (תקנון)

### 1.6 Click Types That Exist Today (Functional Actions)
- Navigate via main menu + catalog menu
- Browse category list → click product → open product detail
- Submit contact form on `/contact`
- Login/Register/Forgot-password on `/LoginPage`

**Important known limitation:** the current site’s search icon/function may be JS-driven and needs in-browser crawling to fully map. Treat as “TBD (discover during crawl)”.

---

## 2) Phase 1 Accounts Decision (Must Match Current Site)
The current site already has a login system at `/LoginPage`.
**Phase 1 decision:** preserve and modernize login UX, but do not rebuild a full new account platform unless we confirm backend requirements.

Phase 1 Account Scope:
- Maintain login capability
- Allow existing customers to authenticate
- Preserve existing backend integrations (unknown details → must audit)
- Improve login UI, error states, accessibility, mobile layout
- No major expansion of account features in Phase 1

Phase 2 (optional):
- Full account management (favorites, reorder, history) after backend audit.

---

## 3) What Cursor/Claude Must Produce

### 3.1 Deliverables
1) Full site audit summary (UX/UI/SEO/performance/content)
2) Final sitemap + information architecture for new site
3) Core user flows:
   - Browse catalog → filter → product detail → Request Quote
   - Contact Sales (WhatsApp/call/email/form)
   - Supplier inquiry flow
   - Login (preserved)
4) UI direction: “Professional Botanical” (clean, B2B, credible)
5) Technical plan & architecture
6) Backlog: epics → stories → tasks (MVP + Phase 2)
7) Acceptance criteria for key pages
8) A **route-by-route mapping** doc for the new app that covers old site parity + improvements

### 3.2 MVP Pages (Recommended)
- Home
- Products (catalog index)
- Category listing
- Product detail
- Services (Export/Import/Logistics/Custom packing)
- About (with credibility)
- Suppliers
- Resources (Catalogs + Forms + FAQs)
- Contact
- Login (preserved)

---

## 4) Technical Implementation Guidance (Keep It Practical)
Do not over-engineer Phase 1.

Recommended Phase 1 Stack:
- Next.js (App Router) + TypeScript
- Styling: Tailwind or CSS Modules (team choice); ensure RTL support
- Content: Headless CMS (Contentful/Sanity) OR structured JSON while prototyping
- Deployment: Vercel
- SEO: metadata, sitemap.xml, robots.txt, structured data where relevant
- Analytics: GA4 (events for “quote request”, “contact click”, “whatsapp click”)

Search:
- Start lightweight (client-side search or simple indexing)
- Upgrade to Algolia/Meilisearch later if needed

Data model (minimum):
- Category
- Product (name, Hebrew/English name, images, specs, tags, availability notes, MOQ notes, etc.)
- Resources (forms, catalogs, PDFs)
- Static pages (about/import/export/suppliers)

---

## 5) Required Discovery Questions (Must Not Assume)
Before building advanced flows, we must confirm:
1) Are prices public or login-gated?
2) Is pricing tier-based?
3) MOQ rules (minimum order quantity)
4) Inventory model: seasonal static vs live availability
5) Fulfillment workflow: manual vs system-based
6) Payment terms/methods
7) Countries/regions served + logistics partners
8) Certifications (if any)
9) Internal workflow after quote request (who handles, SLA)

If unknown, mark as **TBD** and design UX to support “request quote” first.

---

## 6) Crawl & Complete Mapping (What’s Missing Today)
We need a **complete crawl** to capture:
- Every internal link (`<a href>`)
- Any JS-driven navigation/actions (search, popups, menus)
- Form actions/endpoints
- Hidden routes (if any)

### 6.1 Provide a DevTools Script (to run in browser) that outputs JSON
Cursor/Claude must create a script that:
- Extracts all anchors + buttons + onclick handlers
- Extracts forms + inputs + action targets
- Extracts nav menus (including dropdown items)
- Outputs a JSON “site map” for the current page
Optionally: iterative crawl (manual step) to repeat per page.

(We already have a working DevTools script for image extraction; follow the same approach for route extraction.)

---

## 7) UX/UI Direction
Chosen visual direction: **Professional Botanical**
- Clean, spacious layouts
- Botanical elements (subtle)
- Sophisticated palette (greens, warm neutrals, muted accents)
- Typography: Hebrew-friendly, strong hierarchy
- Components: product cards, filters, breadcrumbs, sticky CTAs, forms, trust badges, FAQ accordions

Accessibility:
- WCAG AA
- Strong focus states
- RTL correctness (logical properties)
- Lighthouse accessibility target: 95+

Performance targets:
- LCP < 2.5s
- CLS < 0.1
- INP good
- Image optimization with Next Image
- Font optimization

---

## 8) Conversion & Sales Enablement (B2B)
Primary CTAs:
- “Request Wholesale Pricing” / “Request a Quote”
- “Talk to Sales” (WhatsApp, Call)
- “Download Catalog” (if relevant)

Trust signals must be prominent:
- Export/import experience
- Logistics / cold-chain details (if true)
- Facility photos
- Quality standards
- Service hours + response time commitment

---

## 9) Execution Protocol (Multi-Agent Workflow inside Cursor)
If using role-based prompting, run in this order:
1) UX Expert: audit + flows + IA
2) UI Expert: system + components + templates
3) Synthesizer: unify UX+UI into a single plan
4) Product: KPIs + MVP/Phase 2 + analytics events
5) Architecture: stack + data model + SEO tech + deployment
6) SEO/GEO: keyword clusters + page mapping
7) Performance/Accessibility: budgets + checklists
8) Content: Hebrew-first copy outline + microcopy
9) Team Lead: final decisions + backlog + acceptance criteria

---

## 10) Immediate Next Steps (What to build first)
1) Create repo & baseline Next.js app (TypeScript, App Router)
2) Implement RTL + i18n scaffolding (Hebrew primary)
3) Build shared layout: header/nav/footer
4) Build page shells matching sitemap
5) Build catalog UI with mock data
6) Implement “Request Quote” flow (form + email/webhook stub)
7) Preserve login route (placeholder until backend audit)
8) Add SEO basics + analytics events
9) Run crawl script on key old pages and ensure parity

---

## 11) Output Requirements (Strict)
When responding, Cursor/Claude must output:
- A checklist of what is already mapped (from this doc)
- A checklist of what must be discovered by crawl
- The updated sitemap for the new app
- A concrete MVP backlog (epics → tasks)
- A concrete file/folder structure proposal for the new app
- A DevTools crawler script to extract routes/actions per page
- A plan for preserving the existing login integration

---

## 12) Notes
- Do not invent endpoints or backend logic for login.
- Assume we may need to integrate with an existing system; build adapters later.
- Make Phase 1 useful even if login integration remains as-is (quote-first approach).

---

END.
