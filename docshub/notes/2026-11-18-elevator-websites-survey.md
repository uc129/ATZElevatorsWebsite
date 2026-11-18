---
title: Survey of elevator company websites
type: note
status: done
date: 2026-11-18
author: Claude (with Utkarsh Chaudhary)
related:
  - ../plans/2026-11-18-website-foundation-plan.md
---

# Survey of elevator company websites

What the major lift companies put on their websites, what works for visitors, and what ATZ should take from it. Sites visited on 18-Nov-2026: Otis (US site; the India site blocks automated visits), KONE India, Schindler India, TK Elevator India, Johnson Lifts and Nibav Home Lifts.

## Summary

The global brands have moved from brochure sites to **self-service sites**. They help visitors decide (quizzes, planners, modernisation guides). They let customers act without calling (portals, online payment, apps). They organise everything around **the building type** and **the lifecycle** (new, service, modernise). Indian players compete on **trust** (clients, factories, service network) and, for home lifts, on **price clarity and reviews**.

ATZ already covers the basics well: a lifecycle story, building-type copy, clients, offices, a 24×7 line, WhatsApp and a quote form. The biggest gaps are **decision tools**, **a "switch your AMC" path**, **a clear modernisation guide** and, once the ERP is ready, **customer self-service**.

## What each site does

| Company                       | Direction                          | Notable features                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **KONE India**                | Decision tools and digital service | 7-question "elevator review" quiz giving a personal recommendation; KONE Car Designer (cabin configurator); planning tools and CAD downloads; "Switching to KONE" (service for any brand); "Buildings without an elevator"; myKONE customer portal; KONE Pay; elevator call app; remote monitoring; industry pages (residential, home/villa, retail, office, hotels, hospitals); branch finder; contact form that routes by need (new, modernise, maintain) |
| **Schindler India**           | Clear choices and safety           | Modernisation tiers (RePair, ReStore, ReNew, RePlace) compared by lift age, life extension, energy saving, design impact and price; Plan & Design online tool; décor catalogue; safety tips for riders, owners and children; Schindler Pay; MySchindler app; remote monitoring dashboard; BIM files; free-phone number; segment pages                                                                                                                       |
| **TK Elevator India**         | Building-type first                | Products grouped as low, mid and high rise; nine building applications (residential, hospital, education, hotel and more); home and villa range; "Pay now"; office finder; help desk; editorial articles such as "matching elevators to buildings"                                                                                                                                                                                                          |
| **Otis**                      | Brand story and service promise    | Lifecycle navigation (new, service, modernisation); named service programme (Otis Signature Service) with a quote form; customer login; e-payments; 24×7 phone line in the header; project case studies; safety information for home lifts                                                                                                                                                                                                                  |
| **Johnson Lifts** (India)     | Trust through scale                | Segment navigation (homes, apartments, hospitals, offices, IT parks, factories); "Prestigious customers" by sector (government, airports, railways, metro, hospitals); downloadable catalogue; planning-guide articles; apps (contactless call booking, IoT service)                                                                                                                                                                                        |
| **Nibav** (Indian home lifts) | Price-led, consumer marketing      | Price in the page title ("from ₹…"); pricing page; video reviews and testimonials; FAQs; glossary; pages for who it helps (seniors, people with disabilities, families with children); city pages; separate sales and service numbers and emails; "Order now"                                                                                                                                                                                               |

## Patterns that help visitors

1. **Start from the building, not the product.** Every global site lets visitors pick "hospital", "apartment", "home" and get the right lifts and services for it.
2. **Guided decisions.** Quizzes (KONE), tiered modernisation (Schindler) and planning tools turn "which lift?" into a few easy questions.
3. **Lifecycle navigation.** New lift, maintain, modernise, repair: the same four doors on every site.
4. **Service for any brand.** KONE's "Switching to KONE" page targets owners unhappy with their current maintenance company. This is a large market for a regional company.
5. **Customer self-service.** Portals, payment, apps and complaint tracking are now standard for the big four.
6. **Safety as content.** Schindler's rider, owner and children's tips build trust and are shareable for housing societies.
7. **Proof by sector.** Clients grouped by sector (Johnson), case studies (Otis, KONE), reviews (Nibav).
8. **Downloads for professionals.** Catalogues, CAD and BIM files and shaft planning guides for architects and builders.

## Things to avoid (seen on these sites)

- **Counters that show "0" until JavaScript runs** (Johnson): the first thing visitors and search engines see is wrong.
- **Pages that are empty without JavaScript** (some tools render nothing in the page text): bad for search and slow phones.
- **Blocking visitors and crawlers** (Otis India returned 403 to an automated visit).
- **Heavy statistics** as the main message. ATZ's no-statistics rule already avoids this.

## Recommendations for ATZ

Ranked by value for visitors against effort. "Site only" means no ERP work is needed.

### Now (site only)

1. **"Find your lift" guide.** Five or six questions: building type, floors, who uses it (patients, residents, goods), existing lift or new, and city. It ends with a recommended lift and a pre-filled enquiry. _Like KONE's elevator review._
2. **Modernise, upgrade or replace.** One page comparing repair, upgrade and full replacement by lift age and the problems they solve, with no prices. _Like Schindler's tiers._
3. **"Move your AMC to ATZ".** A page for owners of any brand: what we check on takeover, how the handover works and what the contract covers. _Like "Switching to KONE"._
4. **Building-type pages:** hospitals, apartment societies, independent homes, offices and shops, government and institutions. Each would reuse existing lift and service content and show the clients from that sector.
5. **Safety tips** for riders, building owners and children, with a printable notice for apartment societies. _Like Schindler's safety pages._
6. **FAQs and a short glossary** (MRL, gearless, AMC, comprehensive, ARD and others), with FAQ schema for search.
7. **Downloads:** the ATZ catalogue and a one-page shaft planning guide for architects. The existing catalogue says "since 1998", so it needs a 2002 edition first.
8. **Clients grouped by sector**, with the PMCH-style building photos as ATZ gathers them.

### Next (needs the ERP)

9. **Log and track a complaint online.** This is already planned in the sitemap.
10. **Pay an AMC or invoice online** (UPI or a payment gateway), linked to ERP invoices. _KONE Pay, Schindler Pay and TK "Pay now" all do this._
11. **Customer page for AMC customers:** next visit date, visit history and renewal.
12. **Enquiries into the ERP as leads**, through the existing `submitEnquiry()` seam.

### Later (bigger builds, or decisions for ATZ)

13. **Cabin finish gallery** first, then perhaps a simple cabin designer. _Like Schindler's décor catalogue and KONE Car Designer._
14. **Home-lift pricing guidance.** Nibav leads with price. The site rule today is no statistics, so ATZ needs to decide whether "starting from" prices are allowed.
15. **Project case studies** with real ATZ photos and client quotes.
16. **CAD and BIM drawings** for architects, if ATZ has them.

## Already covered by the ATZ site

- Lifecycle navigation (new, AMC, modernisation, repairs)
- A 24×7 breakdown line in the header, separate from sales
- WhatsApp contact and a quote form from any page
- Lift types with "ideal for" building uses
- Clients from healthcare, government, education and hospitality
- Office pages per city
- "Stuck in a lift?" guidance on the support page
- Accessible, fast, static pages with no statistic counters
