---
title: Content as typed modules, no database
type: adr
status: accepted
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - 0001-nextjs-tailwind-vercel-stack.md
---

# 0003: Content as typed modules, no database

## Context

The site needs company facts, offices, products, services, projects, testimonials and photo credits. The user asked for no database for now. Enquiries will later go to an ERP endpoint that does not exist yet; the public email address is also still to come.

## Options considered

1. **Typed TypeScript modules in `src/content/`.** Type-checked, versioned in git, statically rendered, zero infrastructure. Editing needs a code change.
2. **Markdown/MDX files.** Friendlier for long prose, but weaker typing for structured data.
3. **Headless CMS or database.** Editable by non-developers, but adds infrastructure the user does not want yet.

## Decision

We will keep content in typed TypeScript modules under `src/content/`, with types next to the data. The enquiry form validates with zod in a Server Action and sends through a single `submitEnquiry()` function in `src/lib/enquiry.ts`, which for now only validates and returns success.

## Consequences

- Pages are fully static; Vercel serves them from the edge.
- Content tests can enforce invariants (unique slugs, every photo credited).
- Until the ERP endpoint arrives, enquiries are not stored or sent; the success screen offers WhatsApp (72570 01413) as a direct route. Connecting the ERP is a change to one file.
- Revisit when non-developers need to edit content often, or when long-form pages (case studies, blog) arrive.
