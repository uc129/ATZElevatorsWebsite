---
title: Website foundation plan
type: plan
status: in progress
date: 2026-11-18
updated: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - ../adr/0001-nextjs-tailwind-vercel-stack.md
  - ../adr/0002-cuicui-component-library.md
  - ../adr/0003-content-as-typed-modules-no-db.md
---

> Progress: step 0 (Node.js 26 LTS, machine PATH) done 18-Nov-2026. Step 1 (repo bootstrap) done 18-Nov-2026. Step 2 (tokens, fonts, /styleguide) done 18-Nov-2026: headings use Manrope (as on the prototype) rather than General Sans, so all three fonts self-host through next/font/google; status info is blue so cyan stays interactive; `cn()` registers the custom token names with tailwind-merge. Step 3 (UI primitives) done 18-Nov-2026: Button (WhatsApp variant same shape as the others), Badge and VerifiedBadge, Card, FramedCard, Spotlight, Input/Textarea/Select, Tabs, Skeleton, Eyebrow, Container/Section; status colours follow cuicui badges; Navigation moved to step 4 with the header. Step 4 (site shell) done 18-Nov-2026: utility bar, sticky header, Lifts menu, phone menu, footer, phone action bar, enquiry drawer (native dialog) with a /quote fallback page, Server Action validation, sitemap.xml and robots.txt. Routes follow the canvas sitemap (`/lifts/[slug]`, not `/products`). The breakdown line uses the service number 93341 19103. Until the ERP endpoint exists, a valid enquiry ends with a pre-filled WhatsApp message to the sales number. Step 5 (homepage) done 18-Nov-2026: hero, highlights (marketing phrases, no statistics), the ATZ film (from atzelevators.vercel.app, trimmed before its 1998 end card, 50 MB to 3 MB), the isometric lift journey, lift types, services with breakdown band, a handpicked client wall (logos from the atz-website-2025 repo), sample testimonials, offices from the ERP and the closing call to action. Photos are credited in content/credits.ts; lift types without a good ATZ photo show an icon panel. Revised the same day: the old promo film and all foreign placeholder photos were replaced with organic Patna photos from Wikimedia Commons (skyline from Golghar, a lift tower under construction, malls, hospitals, PMCH) and an Indian mall escalator film from Pexels. Revised again: recognisable Patna landmarks (Biscomaun Bhawan, the Secretariat at night, Cybotech Tower, PMCH as a client), clean lift close-ups for lift types and services, Jamshedpur replaced by Kolkata, and all credits moved to a /credits page. The Patna drone reel (permission pending) is kept, slowed, for the About page.

# Website foundation plan

## Context

The current atzelevator.in is dated and its content is weak. The redesign is prototyped on the "ATZ Elevators Website" Design canvas: an audit, a sitemap, and the desktop and phone homepages. The next step is a real codebase.

The stack: Next.js and Tailwind, with **cuicui** (copy-paste React and Tailwind components) as the component library. There is **no database** for now.

Architecture, coding standards and UI/UX rules follow the ERP repo:

- design-system tokens;
- the `ux-standards` rules;
- `docshub/` conventions and ADRs;
- branch and commit habits.

## Decisions

| Area         | Choice                                                                                                                                                      | Source                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Location     | New sibling repo `C:\Users\utkar\source\repos\uc129\ATZElevatorsWebsite`, its own git, `master` default                                                     | Keeps the ERP lane split and its .NET CI clean |
| Framework    | Next.js (latest, App Router, `src/`), TypeScript strict, React Server Components by default                                                                 | —                                              |
| Styling      | Tailwind v4 (CSS-first `@theme`) with ERP tokens ported into `src/styles/tokens.css` (copied, not imported)                                                 | ERP `tokens/*.css`                             |
| Components   | cuicui, copied in per component as needed, restyled to tokens, using `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge)                                    | cuicui getting-started                         |
| Icons        | `lucide-react` only                                                                                                                                         | ERP brand rules                                |
| Fonts        | `next/font`: Inter (body), Manrope or General Sans (headings, self-hosted from Fontshare), IBM Plex Mono (figures)                                          | ERP type tokens                                |
| Content      | Typed TS modules in `src/content/` (company, offices, products, services, projects, testimonials, photo credits)                                            | No DB                                          |
| Enquiry form | Client and server validation (zod) in a Server Action. Delivery for v1: success state plus a WhatsApp/`mailto` handoff, no backend storage                  | No DB                                          |
| Quality      | ESLint (next config) and Prettier, Vitest with Testing Library, Playwright smoke tests with axe a11y checks                                                 | ERP testing habit                              |
| Palette      | Cyan only, used sparingly as in the prototype (links, buttons, small accents, the lift illustration). No red theme                                          | User, 18-Nov-2026                              |
| Phones       | Marketing and sales 72570 01413 (WhatsApp, enquiries, header and CTA). Service and breakdowns 93341 19103 (service pages, breakdown band, call-for-service) | User                                           |
| Hosting      | Vercel. Static and SSR defaults, no special adapter. The repo connects to Vercel once it has a GitHub remote                                                | User                                           |

## Folder layout

```
ATZElevatorsWebsite/
  CLAUDE.md                 rules for agents (lanes, branches, UI rules, no-hacks)
  docshub/README.md         index (Date | Doc | Status | Summary)
  docshub/adr/0001-nextjs-tailwind-stack.md
  docshub/adr/0002-cuicui-component-library.md
  docshub/adr/0003-content-as-typed-modules-no-db.md
  docshub/plans/2026-11-18-website-foundation-plan.md   (this plan)
  public/images/…           photos (resized ≤2400px), logo
  src/app/                  layout.tsx, page.tsx, route folders from the sitemap, not-found, sitemap.ts, robots.ts
  src/components/ui/        cuicui-derived primitives (Button, Badge, Card, Input, Tabs, Skeleton, Nav)
  src/components/layout/    UtilityBar, Header, MegaMenu, MobileMenu, Footer, MobileActionBar, EnquiryDrawer
  src/components/sections/  Hero, ProofStrip, HowWeWork (isometric lift), ProductTabs, Services, Projects, Testimonials, Offices, CtaBand
  src/content/              *.ts data + types
  src/lib/                  cn.ts, format.ts (₹, Indian digit grouping, dd-MMM-yyyy, IST), seo.ts
  src/styles/               globals.css, tokens.css
  tests/unit/, tests/e2e/
```

## Rules carried from the ERP

- **Shared components:** shared components come before copies. Section markup never repeats a primitive's styles.
- **No one-off hacks:**
  - no inline styles;
  - no `!important`;
  - no arbitrary Tailwind values like `w-[137px]`. Add a token instead.
- **Colour:** cyan is the interactive accent only, never a large fill. Headings are navy. The background is white, with soft grey containers.
- **Accessibility:** WCAG AA as the minimum, AAA where practical. Focus rings stay visible, body text is at least 16px, and disabled states are never shown by opacity alone.
- **Motion:** honours `prefers-reduced-motion`. No bounce and no parallax. Easing is `cubic-bezier(.4,0,.6,1)`.
- **Copy and format:**
  - Copy is in sentence case, with no emoji.
  - Status badges always show text.
  - Tooltips are never the only place essential information appears.
- **Pages:** no horizontal scroll. Keep pages to about two screen heights, except the long homepage.
- **Honesty:** sample photos and testimonials stay labelled as samples with the greyed "Verification pending" badge, and photo credits are rendered from `content/credits.ts`.
- **Git and docs:**
  - feature branches from `master`;
  - stage paths explicitly;
  - plain imperative commit subjects with the Co-Authored-By trailer;
  - a PR-session note in `docshub/pr-sessions/` for each significant PR.

## Steps

1. **Bootstrap the repo.**
   - Run `npx create-next-app@latest ATZElevatorsWebsite --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`, then `git init`.
   - Add Prettier, `clsx`, `tailwind-merge`, `lucide-react`, `zod`, Vitest and Playwright.
   - Add npm scripts: `dev`, `build`, `lint`, `typecheck`, `test` and `e2e`.
   - Write `CLAUDE.md`, `docshub/README.md`, ADRs 0001–0003 and this plan. Make the first commit on `master`.
2. **Tokens and theme.**
   - Port the ERP colours, type scale, spacing, radii, shadows and motion into `tokens.css` and `@theme`.
   - Wire the fonts.
   - Add a `/styleguide` dev page showing tokens and primitives (not shown in the sitemap).
3. **UI primitives from cuicui.**
   - Copy in Button (primary, secondary, ghost, and WhatsApp green with a dark border), Badge (including verified-pending), Card, Input/Textarea/Select, Tabs, Skeleton and Navigation.
   - Restyle each to the tokens.
   - Record the cuicui source URL in a header comment.
4. **Site shell.**
   - Build the root layout: utility bar, sticky header with Products mega menu, mobile menu, footer (GSTIN, CIN, credits), mobile action bar, and enquiry drawer (Server Action plus success state).
   - Add metadata, `sitemap.ts` and `robots.ts`.
5. **Homepage.** Port the canvas sections in order:
   - hero ("Keeping the world in motion.");
   - proof strip;
   - How we work, with the isometric SVG lift and its 20s CSS timeline, reusing the geometry from `Learning/09_Isometric_Wireframe/iso_wireframe.py`;
   - products tabs;
   - services;
   - projects;
   - testimonials;
   - offices (Patna HQ, Ranchi, Kolkata, Bhubaneswar, Guwahati);
   - CTA band.

   All content comes from `src/content/`.

6. **Route stubs from the sitemap.**
   - Pages: products, `products/[slug]`, services, projects, about, contact, `contact/[office]`, privacy and terms.
   - Each gets a real header, a short intro and a "coming soon" body, generated from content via `generateStaticParams`.
7. **Tests.**
   - Vitest: `cn`, `format` and the content invariants (unique slugs, every photo has a credit).
   - Playwright: home, header navigation, mobile menu, enquiry form validation and submit, plus an axe scan on home and contact.
   - Optional: a GitHub Actions workflow running lint, typecheck, test and build once the repo has a remote.

## Reuse

- **Canvas design and copy:** `scratchpad\atz-v3\project\Main.dc.html` and `Sitemap.dc.html`. These are the reference for structure, copy and token values. They are not copied verbatim; inline styles become classes.
- **Tokens:** `ATZElevatorsERP\Architecture\ATZ ERP Design\ERP design system for elevators\tokens\*.css`.
- **Isometric lift:** `ATZElevatorsERP\Learning\09_Isometric_Wireframe\` (geometry, schedule and keyframes).
- **Company facts:** `ATZElevatorsERP\src\ATZ.ERP.Infrastructure\Migrations\Scripts\V120__CompanyBrandingAndLetterhead.sql` and `V073__RegionsMaster.sql`.
- **Logo and photos:** the logo is `src\ATZ.ERP.Infrastructure\Documents\Assets\atz-logo.png`. Photos are the 7 Commons images plus the brochure crops, with their credits.

## Open items (user will supply later; not blocking)

- Public email.
- ERP endpoint for enquiries. Until it arrives, the Server Action validates the enquiry and returns success, and the actual send sits behind one `submitEnquiry()` seam in `src/lib/enquiry.ts`.
- Office addresses (Ranchi, Bhubaneswar and others).
- Founding year (1998 vs 2002).
- Real photos and testimonials.

## Verification

- `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` all pass.
- `npm run e2e` passes, including the axe checks.
- Use `npm run dev` with a `.claude/launch.json` entry and preview_start to check:
  - the desktop (1440) and phone (390) homepages against the canvas;
  - keyboard navigation through the header, mega menu and drawer;
  - reduced motion stopping the lift animation;
  - no console errors.
