---
title: Colour tokens follow the ATZ ERP design system
type: adr
status: accepted
date: 2026-11-27
author: Claude (with Utkarsh Chaudhary)
related:
  - 0002-cuicui-component-library.md
  - ../plans/2026-11-18-website-foundation-plan.md
---

# 0004: Colour tokens follow the ATZ ERP design system

## Context

The website ported the ERP tokens on 18-Nov-2026 and then drifted from them: the status colours came from cuicui's Tailwind palette, and the text inks were tuned on the website canvas. On 27-Nov-2026 the ERP gained a published design system ("ATZ ERP" artifact on claude.ai), which reconciles the prototype with the shipped Blazor app.

Two of the website's values also failed WCAG 2.2 AA non-text contrast (1.4.11):

- the focus ring used `brand-line` `#1fa3c4`, 2.96:1 on white (3:1 needed);
- field and choice edges used `line-strong` `#d5d9de`, about 1.4:1 on white.

## Options considered

1. **Values only, keep the site's look.** Take the ERP's focus, control-edge, text and status values; keep the white page, Manrope headings, fluid type scale, radii and glows, which were approved for the marketing surface.
2. **Accessibility fixes only.** Fix the focus ring and field edges; leave the drift.
3. **Full alignment.** Also take General Sans, the grey page and the ERP's radii and type scale. Reverses decisions approved for the website.

## Decision

The user chose option 1. In `src/styles/tokens.css`:

- New `focus` `#0c7289` (5.5:1 on white) for every focus outline and focus ring; `brand-line` stays for strokes and illustration.
- New `control-line` `#8a949e` (3.1:1) for field and choice edges; `line-strong` stays for decorative frames.
- `ink` and `muted` take the ERP's `text-primary` and `text-muted`.
- Status solid, tint and text values are the ERP's. The cuicui badge shape stays; `-line` is the solid at 30% on white.
- `subtle` stays `#5a6e80`: the ERP's `#66737f` is 4.49:1 on the website's grey `box`, below AA.

## Consequences

- A status reads the same on the site and in the ERP. Status text on its tint is 6.4–7.3:1 (was 4.7–7.1:1).
- When the ERP design system changes a colour, port it here by hand (the tokens are copied, not imported).
- The checked choice card's edge is now `brand` (4.9:1) instead of `brand-line`.
