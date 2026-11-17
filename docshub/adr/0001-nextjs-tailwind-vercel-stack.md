---
title: Next.js, Tailwind v4 and Vercel, in a separate repo
type: adr
status: accepted
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - ../plans/2026-11-18-website-foundation-plan.md
---

# 0001: Next.js, Tailwind v4 and Vercel, in a separate repo

## Context

The old atzelevator.in is dated, with weak content and no modern standards (performance, accessibility, SEO). The redesign is prototyped on a Claude Design canvas. The ERP (ATZElevatorsERP) is .NET with a Blazor front end, split into backend and frontend lanes, with .NET-only CI.

## Options considered

1. **Next.js App Router + Tailwind, new repo.** Static and server rendering per page, strong SEO and image handling, first-class on Vercel. Tailwind fits the copy-paste component library. Cost: a second stack beside .NET.
2. **Blazor static site inside the ERP repo.** One stack. But it mixes a public site into the ERP's lanes, CI and shared-file rules, and Blazor's static marketing story is weaker.
3. **Static site generator (Astro).** Very fast pages, but the chosen component library is React-first and the team already chose Next.js.

## Decision

We will build the website with Next.js (App Router, `src/`, TypeScript strict) and Tailwind v4, in its own repo `ATZElevatorsWebsite` next to the ERP, deployed on Vercel.

## Consequences

- The ERP repo, its lanes and its CI stay untouched. Shared knowledge (design tokens, company facts) is copied in, not imported.
- Node.js 22+ is required (installed machine-wide: 26 LTS).
- The npm package is named `atz-website` because npm forbids capitals.
- Vercel needs the repo on GitHub before it can deploy.
