---
title: cuicui as the component library
type: adr
status: accepted
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - 0001-nextjs-tailwind-vercel-stack.md
---

# 0002: cuicui as the component library

## Context

The `ux-standards` rules ask for one UI library per project. The user chose cuicui (https://cuicui.day/common-ui): React + TypeScript + Tailwind components distributed as copy-paste source, relying on a `cn()` helper (clsx + tailwind-merge). There is no package or CLI to install.

## Options considered

1. **cuicui, copied in per component.** Full control of markup and styles, no runtime dependency, components restyled to ATZ tokens. Cost: no automatic upstream updates.
2. **shadcn/ui.** Same copy-paste model with a CLI and Radix primitives for accessibility. Not the user's choice.
3. **A packaged library (MUI, Chakra).** Faster start, but heavy, opinionated styling that fights the ATZ design language.

## Decision

We will use cuicui as the only component library. A component is copied into `src/components/ui/` only when a page needs it, restyled to the design tokens, and keeps a header comment with its cuicui source URL. `cn()` lives in `src/lib/cn.ts`.

## Consequences

- Each copied component must be checked for accessibility (keyboard, focus, reduced motion) because cuicui does not guarantee it; fix it in the copy.
- Upstream fixes are pulled by hand, guided by the source URL comment.
- Interactive needs cuicui lacks (dialog focus trap, menus, tabs) are built in `ui/` on the same tokens, not by adding a second library.
- Design elements are also taken from the cuicui website itself (user, 18-Nov-2026): diffused light (`glow-diffuse`, `shadow-diffuse`), the pointer-following card light (`Spotlight`), framed cards, press and lift micro-interactions, and the status badge recipe (tint, soft border, deep AA text). Kept within ATZ rules: faint ice-cyan only, no bounce, static for reduced motion.
- cuicui components that need the `motion` library are rebuilt with CSS instead, so the site has no animation dependency.
