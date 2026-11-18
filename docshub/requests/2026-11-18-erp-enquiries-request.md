---
title: Request to the ERP for website enquiries and complaints
type: request
status: open
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - ../plans/2026-11-18-find-your-lift-plan.md
  - ../notes/2026-11-18-elevator-websites-survey.md
---

> Copy of the request filed in the ERP repo as
> `Architecture/Workspace/handoffs/2026-11-18-website-enquiries-request.md`
> ([ERP PR #327](https://github.com/uc129/ATZElevatorsERP/pull/327)). The ERP copy is the one the
> backend works from; update this copy's status when the backend PR merges.

# Request: take in enquiries from the public website, 18-Nov-2026

From the ATZ website (`uc129/ATZElevatorsWebsite`, Next.js on Vercel) to the backend (the
**claude** account). Asked for by the user on 18-Nov-2026.

**Part 1 (enquiries) unblocks the website now.** Parts 2 and 3 (complaints) need decisions from
ATZ before they can be built. Part 4 is for later.

## Why

The website has a quote form on every page, in a drawer and at `/quote`. It also has a "Find your
lift" guide that ends in a pre-filled quote. All of it goes through one function on the website's
server, `submitEnquiry()` in `src/lib/enquiry.ts`.

Today that function sends nothing. The visitor is asked to send the enquiry to the sales number on
WhatsApp instead. Nothing is recorded, and sales can't see or follow up enquiries in the ERP.

The ERP has no record for an enquiry or lead. Every endpoint except `POST /api/client-errors` needs
a signed-in staff user.

## Part 1: record website enquiries (asked now)

### The endpoint

| Route                                                  | Verb | Caller                                                                          | Response                   |
| ------------------------------------------------------ | ---- | ------------------------------------------------------------------------------- | -------------------------- |
| `/api/public/enquiries` (name is the backend's choice) | POST | The website's **server** (a Next.js Server Action), never the visitor's browser | `201` with `{ reference }` |

**Access**

- No staff token. The website's server sends a shared secret, for example an `X-Website-Key`
  header. The key is kept in API user-secrets or environment variables, and in a Vercel
  environment variable.
- A wrong or missing key gets `401`.
- Rate-limited per IP, like `ClientErrorsController` (`[AllowAnonymous]`,
  `[EnableRateLimiting(...)]`, `[RequestSizeLimit(...)]`). Because the caller is Vercel's server,
  limit per key as well as per IP.

**Duplicates**

- The website sends an idempotency key (a UUID) with each submission. The same key with the same
  body returns the same `reference`. This uses the existing `IdempotencyClaims` pattern.
- The visitor's own retries, such as a double tap or a slow network, must never create two
  enquiries.

### Request body (Contracts DTO)

The values below are exactly what the website sends today (`needOptions` and `liftTypeOptions` in
the website's `src/lib/enquiry.ts`). Please add them as value lists in `SharedKernel/ValueLists/`.

| Field            | Type    | Rules                                                                                                                                                                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `need`           | string  | `new` (new lift installation), `amc` (AMC and maintenance), `modernise` (modernisation), `repair` (repair or breakdown). Required.                                                                                    |
| `liftType`       | string  | `unsure`, `passenger`, `home`, `mrl` (MRL or gearless), `panoramic`, `hospital` (hospital or stretcher), `freight`, `dumbwaiter`. Defaults to `unsure`.                                                               |
| `floors`         | int?    | 2 to 60, including the ground floor. The form starts at 6, and the visitor can change it.                                                                                                                             |
| `city`           | string? | Up to 60 characters. Free text: the visitor's city, an office city, or the city Vercel reports from their internet address.                                                                                           |
| `name`           | string  | 2 to 80 characters. Required.                                                                                                                                                                                         |
| `mobile`         | string  | 10-digit Indian mobile starting 6 to 9. The website already strips `+91`, `91`, `0`, spaces and dashes before sending. Required.                                                                                      |
| `message`        | string? | Up to 1,000 characters. Usually a ready-made line, such as "Hi, I'd like to talk about installing a hospital lift at our hospital. Could you please contact me to arrange a site visit?", which the visitor may edit. |
| `sourcePath`     | string? | The page it came from, such as `/lifts/hospital` or `/find-your-lift?building=hospital&...`. It tells sales what the visitor was looking at. Up to 500 characters.                                                    |
| `idempotencyKey` | uuid    | As above.                                                                                                                                                                                                             |

The website also has a hidden honeypot field for bots. It's checked on the website's server and
never sent.

### Responses

| Status                                               | When                                                             | Website does                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `201` `{ reference }`                                | Recorded                                                         | Shows "Thanks, {name}. We have your enquiry." with the reference                  |
| `200` `{ reference }`                                | Same idempotency key replayed                                    | Same as 201                                                                       |
| `400` `ErrorCodes.*` with field errors               | Validation failed (the website validates first, so this is rare) | Falls back to the WhatsApp hand-off                                               |
| `401`                                                | Bad or missing website key                                       | Falls back to WhatsApp, and logs on the website's server without personal details |
| `429`                                                | Rate limit                                                       | Falls back to WhatsApp                                                            |
| `5xx` or timeout (the website waits about 5 seconds) |                                                                  | Falls back to WhatsApp                                                            |

Any failure falls back to today's WhatsApp hand-off, so a visitor never loses an enquiry.

### In the ERP

- **The record:** a lead or enquiry with every field above.
  - `receivedAt` as `DateTimeOffset` in UTC (SA_10).
  - A status for sales: new, contacted, quoted, won, lost. The exact names are the backend's
    choice.
  - The region, if it can be worked out from the city. Otherwise blank.
- **Notify sales of new enquiries, if possible.** The website's sales number is 72570 01413.
  Email, WhatsApp or a dashboard count are all fine; it's the backend's choice.
- **Frontend (claude2049), after the backend PR:** a list and a detail screen for sales, with a
  way to turn an enquiry into a client and quotation. This is a separate request once the
  endpoint exists.
- **Personal data:** name and mobile. Never write them to logs or error reports. A retention
  rule (how long unconverted enquiries are kept) is a decision for ATZ.

### What the website changes when this merges

- Only the body of `submitEnquiry()`.
- Two Vercel environment variables: the API URL and the website key.

The form, validation and success screen stay the same. When the call succeeds, the success screen
already has a "delivered" state, "We have your enquiry", in place of the WhatsApp step.

## Part 2: log a breakdown or complaint from the website (needs decisions first)

The website has a placeholder page at `/support/complaint`. Its idea: an existing AMC customer
reports a lift problem online, and the ERP creates a breakdown **task**.

**Questions for ATZ before this can be designed:**

1. **How does the ERP know the caller is a real customer, and which lift?** Options:
   - the mobile number registered on the client contact, plus a site or lift code printed in
     the lift;
   - a one-time code sent by SMS to that mobile.

   Without a check, anyone could log false breakdowns.

2. **Does a website complaint become a task straight away, or wait in a queue for the service
   desk to accept?**
3. **What do customers know about their lift?** For example, a lift ID on a sticker in the car,
   or the AMC number.

The 24×7 service number (93341 19103) stays the main route for breakdowns. The website form is
for non-urgent problems.

## Part 3: track a complaint (after part 2)

`/support/track` on the website: the customer enters a complaint number and their mobile, and
sees the status (logged, engineer assigned, visit booked, resolved) with dates. No staff names
beyond what ATZ is happy to show, and no other personal details.

## Part 4: later (needs customer sign-in)

These are listed only so the backend knows they're coming. Nothing is asked now.

- **AMC renewal and online payment of AMC or invoices**, at `/support/amc` on the website, through
  a payment gateway.
- **A customer page:** next service visit, visit history, open complaints, invoices.

Both need a decision on how customers sign in, for example Supabase auth with a customer role.

## Not asked from the ERP

- **Branch office addresses.** They aren't in the regions master; the user will supply them as
  website content.
- **The public email address.** The user will supply it.
- **Company details already on the website** (legal name, GSTIN, CIN, head office, phones): these
  were copied from `V120__CompanyBrandingAndLetterhead.sql` and `V073__RegionsMaster.sql`. A public
  read of the company profile would be nice later, so the website can't drift, but it isn't needed
  now.

## Reference

- Website plan for the guide that feeds enquiries:
  `docshub/plans/2026-11-18-find-your-lift-plan.md` in the website repo.
- Website survey with the full list of "needs the ERP" ideas:
  `docshub/notes/2026-11-18-elevator-websites-survey.md`, items 9 to 12.
