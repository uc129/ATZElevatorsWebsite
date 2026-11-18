@AGENTS.md

# ATZ Elevators website

Public marketing site for ATZ Elevators (Amba Tirupati Zetetic Engineering Pvt Ltd, Patna). Next.js (App Router) + TypeScript + Tailwind v4, hosted on Vercel. No database: content lives in typed modules under `src/content/`.

Plan: [docshub/plans/2026-11-18-website-foundation-plan.md](docshub/plans/2026-11-18-website-foundation-plan.md). Decisions: [docshub/adr/](docshub/adr/README.md).

## Commands

- `npm run dev`: local dev server
- `npm run check`: lint, typecheck, unit tests, build (run before every commit)
- `npm run e2e`: Playwright tests at desktop and phone size, with axe accessibility scans (builds and serves on :3100; first run: `npx playwright install chromium`)
- CI: `.github/workflows/ci.yml` runs lint, format, types, unit and browser tests on every push to `master` or `production` and on every pull request
- `npm run format`: Prettier (with Tailwind class sorting)

## Layout

- `src/app/`: routes, one folder per sitemap page
- `src/components/ui/`: primitives (cuicui-derived), the only place base styles live
- `src/components/layout/`: header, menus, footer, mobile action bar, enquiry drawer
- `src/components/sections/`: homepage and page sections, composed from `ui/`
- `src/content/`: typed content data (company, offices, products, services, testimonials, photo credits)
- `src/lib/`: helpers (`cn`, formatting, SEO, `enquiry.ts`)
- `src/styles/`: `tokens.css` (design tokens, ported from the ERP design system)
- `tests/unit/` (Vitest), `tests/e2e/` (Playwright + axe)

## Rules

**Components**

- Shared components before copies. If two places need the same markup or styles, make or extend a component in `src/components/ui/`; sections never re-style a primitive.
- cuicui (https://cuicui.day) is the component source. Copy a component in only when a page needs it, restyle it to the tokens, and keep a header comment with its cuicui URL. One UI library only (ADR 0002).
- Server Components by default; add `"use client"` only to the smallest interactive piece.

**Styling**

- Tokens only. No inline `style`, no `!important`, no arbitrary Tailwind values (`w-[137px]`, `text-[#123456]`). If a value is missing, add a token to `src/styles/tokens.css`.
- Cyan is the interactive accent only (links, buttons, focus, small highlights, the lift illustration), used sparingly. Never large cyan fills. Headings navy; page background white; containers soft grey.
- Icons: `lucide-react` only.

**Accessibility and motion**

- WCAG 2.2 AA minimum, AAA where practical. Body text at least 16px. Focus ring always visible. Disabled states never shown by opacity alone.
- Respect `prefers-reduced-motion`. No bounce, no parallax. Easing `cubic-bezier(.4,0,.6,1)`.
- Essential information is never tooltip-only. Status badges always show text.

**Content**

- Copy in sentence case, no emoji. Currency as ₹ with Indian digit grouping; dates `dd-MMM-yyyy`, IST.
- No statistics in marketing copy (installations, cities, years in business): use short marketing phrases instead. A unit test enforces this for the homepage.
- Founded 2002 ("since 2002"). Older material saying 1998 (logo variant, video end card, old site) is not used.
- The ERP is the source of truth for company facts (legal details, phones, regions, head office). Branch addresses are not in the ERP, so branches show city only until the user supplies them. Branches: Ranchi, Kolkata, Bhubaneswar, Guwahati (Jamshedpur is not shown; user, 18-Nov-2026).
- Clients are handpicked by ATZ. Government emblems (Government of Bihar, MES) are shown by name, never as a logo.
- Do not use the old ATZ group (team) photo.
- Photos: recognisable Patna buildings and streets (Creative Commons) and clean lift close-ups (Pexels); ATZ's own photos when they arrive. No generic or foreign building stock. Credits are never shown on the page, on hover or in the footer: every asset is listed on `/credits` (from `src/content/credits.ts`), linked from the footer legal links.
- Video: the homepage uses the Indian mall escalator film, the only video on the site. The Patna drone reel (On Road, Instagram) is not used: it was taken off the About page on 18-Nov-2026 (no permission from the creator; its still frame carries their watermark, so don't use that either).
- Phones: marketing and sales 72570 01413 (also WhatsApp, enquiries); service and breakdowns 93341 19103.
- Sample photos and testimonials stay labelled as samples ("Verification pending" badge) until real ones arrive. Every photo and film has an entry in `src/content/credits.ts`.
- No database. The enquiry form sends through one seam, `submitEnquiry()` in `src/lib/enquiry.ts`, until the ERP endpoint is provided.

## Git and docs

- `master` is the default branch and the **testing** branch. One branch per feature, cut from an up-to-date `master`; every feature merges into `master`.
- `production` is the **release** branch. Vercel deploys the live site from it. It was cut from `master` on 18-Nov-2026 (same flow as the ERP).
  - Work reaches `production` only through a `master` -> `production` pull request, after it has been checked and cleaned up on `master`. Never commit to `production` directly, never push to it, and never merge a feature branch into it.
  - The user merges the promotion PR. CI runs on the PR and again on the push to `production`.
  - Blocking direct pushes to `production` is a GitHub branch-protection setting the user manages.
- Stage paths explicitly; never `git add -A` or `git commit -a`.
- Commit subjects: plain imperative sentence case, no conventional-commit prefixes.
- Docs follow the `docs-conventions` skill: `docshub/` with YAML front matter, indexed in `docshub/README.md`. Significant decisions get an ADR in `docshub/adr/`.
