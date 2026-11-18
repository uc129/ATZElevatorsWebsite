---
title: Find your lift guide plan
type: plan
status: draft
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - ../notes/2026-11-18-elevator-websites-survey.md
  - ./2026-11-18-website-foundation-plan.md
  - ../adr/0003-content-as-typed-modules-no-db.md
---

# Find your lift guide plan

## Context

This is recommendation 1 in the [website survey](../notes/2026-11-18-elevator-websites-survey.md), modelled on KONE's elevator review. Visitors often do not know which lift they need. The guide asks six short questions, recommends one ATZ lift (with alternatives and the reasons), and ends in a quote form that is already filled in.

It sits on the site only. There is no database and no ERP work.

## Goals

- Within a minute, a visitor gets a clear answer: **this lift, because of these answers**.
- The guide turns a visitor into a pre-filled enquiry, with the same fields as today's form plus a summary in the message.
- It works **without JavaScript** and passes WCAG 2.2 AA, like the rest of the site.
- The result has its own shareable URL. A society secretary can send it to the committee.

## Not in scope

- Prices, sizes or capacities in the result. The no-statistics rule applies, so the result names a lift type, not a specification.
- Storing answers. Nothing is kept, and there is no analytics.
- A cabin designer (survey item 13).

## Design

### Route

`/find-your-lift`. It is short, easy to say on the phone and has nothing to do with `/lifts/[slug]`. The result is the same page with the answers in the query string, for example `/find-your-lift?building=hospital&stage=new&carry=stretcher&floors=6&roof=unsure&city=patna`.

### Questions

All the copy lives in `src/content/lift-finder.ts`, in the same typed-module style as the rest of the content.

| #   | Question                                      | Options                                                                                                                                                                         | Why we ask                                                     |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1   | What kind of building is it?                  | Independent house or villa · Apartment society · Hospital or clinic · Office or shop · Mall or hotel · Factory or warehouse · Restaurant or kitchen · Government or institution | Sets the main lift family                                      |
| 2   | Is there a lift there now?                    | No, it needs a new lift · Yes, it needs upgrading or replacing · Yes, I need maintenance or repairs                                                                             | Sends the visitor to installation, modernisation or AMC        |
| 3   | What will the lift mostly carry?              | People · Patients on stretchers or beds · Goods and heavy loads · Small items like food, files or linen                                                                         | Hospital, freight and dumbwaiter override the building default |
| 4   | How many floors, including the ground?        | A number input, from 2 to 60, the same rule as the enquiry form                                                                                                                 | Decides whether MRL or gearless is worth suggesting            |
| 5   | Is there room on the roof for a machine room? | Yes · No · Not sure                                                                                                                                                             | MRL when there is no room                                      |
| 6   | Which city is the building in?                | The five offices, plus "Somewhere else"                                                                                                                                         | Names the nearest office and fills in the city field           |

When the visitor chooses "maintenance or repairs" at question 2, the guide skips questions 3 to 5 and goes straight to an AMC and repairs result. They do not need a lift recommendation.

### Recommendation rules

The rules go in `src/lib/lift-finder.ts` as one pure function, `recommendLift(answers) → Recommendation`. It is easy to unit test, and its output is data rather than markup.

The rules apply in this order, and the first match wins:

1. Small items → **dumbwaiter**.
2. Goods, or a factory or warehouse → **freight**.
3. Stretchers, or a hospital or clinic → **hospital lift**.
4. An independent house or villa → **home lift**.
5. A mall or hotel → **panoramic**, with passenger as the alternative.
6. No room on the roof, or "not sure" with more than a few floors → **MRL and gearless**.
7. Everything else → **passenger**, with MRL as the alternative when the building is tall.

The function returns:

- `primary`: a lift slug from `liftCategories`;
- `alternatives`: up to two slugs;
- `service`: installation or modernisation, from question 2;
- `reasons`: short sentences built from the answers, such as "Your building has no room on the roof, so a machine-room-less lift fits.";
- `office`: the matching office.

The thresholds are named constants, so ATZ engineers can tune them in one place. The reasons are plain copy and carry no statistics.

### Page and components

| Piece                                         | Kind                 | Notes                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/find-your-lift/page.tsx`             | Server               | Metadata and the page header. It reads `searchParams` (outside Suspense, `instant = false`, so the result is in the first HTML without JavaScript), parses them with a zod schema and shows the questions or the result. Bad or partial parameters show the questions again with the valid answers kept, never an error                                            |
| `components/ui/choice-card.tsx`               | New shared primitive | A large radio card (icon, label, hint) built on a real `<input type="radio">` inside a `<label>`. It uses the token focus ring and selected state, with no arbitrary values. It is reusable for the modernisation guide (survey item 2)                                                                                                                            |
| `components/sections/lift-finder.tsx`         | Client, progressive  | It wraps a normal `<form method="get" action="/find-your-lift">` holding all six fieldsets. **Without JS**, every question shows on one page and Submit loads the result. **With JS**, it shows one question at a time. Choosing an option moves to the next question. It has Back and Next buttons, a "Question 2 of 6" label, and moves focus to each new legend |
| `components/sections/lift-recommendation.tsx` | Server               | The recommended lift card (reusing `cardStyles()`, the lift photo or icon panel and `idealFor`), the "Why this lift" reasons, the alternatives as small cards, the next step (link to the service), the nearest office, and the actions below                                                                                                                      |
| Result actions                                | Existing parts       | **Get a quote with these answers** opens the enquiry drawer pre-filled, or links to `/quote?…` without JS. Also **Send on WhatsApp**, a pre-filled message to the marketing number, and **Start again**                                                                                                                                                            |

### Pre-filling the enquiry

There are small changes to existing code:

- `EnquiryForm` takes an optional `defaults` prop: need, liftType, floors, city and message. The message is a summary of the answers.
- `EnquiryProvider.open(defaults?)` passes the defaults on. `EnquiryButton` gets an optional `defaults` prop. Without JS it falls back to the `/quote?…` link.
- `/quote` reads `searchParams` (outside Suspense, like the guide) and passes the parsed defaults to the form.
- One helper, `enquiryDefaultsFromAnswers()` in `lib/lift-finder.ts`, builds the defaults. The WhatsApp text comes from the same summary, through the existing `enquiryWhatsappUrl` style.

### Entry points

- Homepage hero: a secondary action, "Find your lift".
- Lifts menu (desktop) and the mobile menu: a "Not sure which lift? Find your lift" link at the foot.
- `/lifts` index: a band above the list.
- Footer "Lifts" column, and `sitemap.ts`.

### Accessibility and motion

- Each question is a `<fieldset>` with a `<legend>`. Errors use the form's existing alert pattern.
- The step label is plain text. A polite live region announces the step change.
- Choice cards are at least 44 px tall (an existing token) and work with the arrow keys, which native radio groups provide.
- Step transitions are a fade only, inside `motion-safe:`. There is no slide or bounce.

## Build steps

1. **Logic and content.** Write `content/lift-finder.ts` (questions, options, reason copy). Write `lib/lift-finder.ts`: the answer schema, `recommendLift`, the summary and `enquiryDefaultsFromAnswers`. Add unit tests:
   - every building and carry combination returns a real lift slug;
   - the main rules hold;
   - the maintenance branch works;
   - bad parameters are dropped;
   - there are no digits in the reason copy.
2. **ChoiceCard primitive.** Add it to `/styleguide`, with a unit test.
3. **The guide page without JS.** Build the single-page GET form and the result view, server rendered. Check it with JavaScript turned off.
4. **Step-by-step with JS.** Add the step mode, Back and Next buttons, focus moves and the live region.
5. **Pre-filled enquiry.** Add `defaults` to EnquiryForm, the drawer and `/quote`. Wire up the result actions.
6. **Entry points.** Add the hero, menus, `/lifts` band, footer and sitemap links.
7. **Tests and docs.**
   - Add `/find-your-lift` and one result URL to `tests/e2e/routes.ts` (pages and axe).
   - Add a new `lift-finder.spec.ts`: complete the guide with JS, then check the result and that the drawer is pre-filled. Complete it with JS off (`javaScriptEnabled: false`), then check the result and the `/quote` pre-fill. Check that Back keeps answers, and test the maintenance shortcut on phone and desktop.
   - Update `CLAUDE.md` if new rules come up, and mark this plan done.

Branch: `feature/find-your-lift` from `master`. Merge `docs/elevator-websites-survey` first, so this plan and the survey land together.

## Risks

- **Wrong advice.** The rules are a starting point, not engineering. The result always says that an ATZ engineer confirms the lift after a free site survey. ATZ should review the rules table before launch.
- **searchParams makes the page dynamic.** Found in step 3: content streamed behind `<Suspense>` is swapped in by an inline script, so without JavaScript the visitor only ever sees the fallback. The page therefore reads `searchParams` outside Suspense with `export const instant = false` and renders on each request (`ƒ`). The page is light, so this costs little. `/quote` needs the same treatment in step 5.
- **Drawer state.** Pre-filled defaults must not survive into the next blank opening. `formKey` already remounts the form on each opening.

## Decisions from ATZ (18-Nov-2026)

1. The name `/find-your-lift` stays.
2. "Government or institution" stays as its own building type.
3. Malls and hotels get the panoramic lift as the main pick.
4. Floor ranges: MRL from 5 to 15 floors (when roof space is not sure; "no room" gets MRL up to 15 floors), gearless as the alternative to a passenger lift from 8 to 15 floors. Above 15 floors, whatever the roof answer, the guide suggests a passenger lift and says the engineers plan high-rise lifts on the survey.

## Verification

- `npm run lint`, `typecheck`, `test`, `build` and `e2e` all pass, including axe on the guide and the result.
- In the preview, at 1440 and 390 width:
  - each path (home, hospital, mall, factory, maintenance) gives a sensible result;
  - the drawer and `/quote` are pre-filled;
  - it works with the keyboard only;
  - it works with reduced motion;
  - it works with JavaScript turned off;
  - there are no console errors.
