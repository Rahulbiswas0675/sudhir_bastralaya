# QA Report — Sudhir Bastralaya Landing Page

**Date:** 2026-11-18  
**Environment:** Local static server `http://127.0.0.1:8790/`  
**Browser:** Cursor IDE browser (Chromium)

## Summary

The rebuilt static site loads with compiled Tailwind, local WebP photography, SVG icons, modular vanilla JS, validated WhatsApp enquiry flow, and no invented product prices. Core functional and responsive checks passed in this environment.

## A. Visual QA

| Check | Result | Notes |
|---|---|---|
| All sections present | Pass | Home, Collections, Categories, Lookbook, Products, About, Reviews, Contact, Footer |
| Brand colors / typography | Pass | CSS variables `#F8F4ED`, `#641F35`, `#812F48`, `#C5A46D`, `#282525`, `#E9DFD1`; Playfair + Plus Jakarta |
| Hero brand-first composition | Pass | Full-bleed hero with brand mark + headline |
| Image quality (WebP) | Pass | 24 local `.webp` assets; HTTP 200; 0 broken after eager decode |
| No product prices | Pass | No `₹` in page body |
| Sample reviews labeled | Pass | 3 `.testimonial-sample` labels |

## B. Functional QA

| Check | Result | Evidence |
|---|---|---|
| Sticky header / scroll state | Pass | `data-site-header` classes toggle in navigation module |
| Mobile menu open/close | Pass | CDP: `menuOpen` true then `menuClosed` true |
| Section nav anchors | Pass | Real `#` section hrefs in header/footer |
| Product filters | Pass | Sarees filter → 4 cards; All → 8 cards |
| Product WhatsApp enquire links | Pass | Rendered `wa.me/918768675669` enquiry URLs |
| Testimonial carousel controls | Pass | Prev/next buttons present and wired |
| Empty form submission | Pass | Inline alerts for name, phone, interest |
| Invalid phone | Pass | “Enter a valid 10-digit Indian mobile number.” |
| Invalid email | Pass | “Enter a valid email address.” |
| Valid form → WhatsApp | Pass | `window.open` captured URL contains `wa.me/918768675669` + encoded `text=` |
| tel: / mailto: / Facebook / Maps | Pass | Present with verified URLs |
| Back-to-top / WhatsApp FAB | Pass | Present in DOM |

## C. Responsive QA

| Viewport | Overflow | Notes |
|---|---|---|
| 375×812 (emulated mobile) | Pass | `cw=sw=375`; desktop nav hidden; menu button present |
| ~962 default IDE width | Pass | No horizontal overflow |
| 320 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 | Partial | Layout uses fluid CSS + Tailwind breakpoints (`sm`/`md`/`lg`). Full visual pixel QA at every listed width was not exhaustively screenshotted in this session; 375 and default width were instrumented. |

## D. Technical QA

| Check | Result |
|---|---|
| No CDN Tailwind | Pass |
| No Material Symbols | Pass |
| No remote `lh3.googleusercontent` images in page | Pass |
| ES modules load (`main.js`, `config.js`) | Pass (HTTP 200) |
| `robots.txt` / `sitemap.xml` | Pass |
| SEO meta + OG + JSON-LD | Pass |
| Favicon SVG | Pass |
| Console JS boot | Pass (collections/products/testimonials rendered) |

## E. Form QA

| Case | Result |
|---|---|
| Empty submit | Pass — blocked with field errors |
| Invalid phone `123` | Pass |
| Invalid email `bad-email` | Pass |
| Valid name/phone/email/category | Pass — opens WhatsApp URL (not auto-sent) |
| Destination number | Pass — `918768675669` only |

## Issues found and fixed during QA

| Issue | Fix |
|---|---|
| Select validation grammar “a interest” | Changed to “category” label in `contact-form.js` |
| Browser initially showed cached old Stitch HTML | Confirmed new HTML via curl; retested on port 8790 |

## Remaining issues / limitations

1. Exhaustive visual screenshots at every listed viewport width were not all captured; fluid CSS was verified and 375px emulation confirmed no overflow.
2. Hero/product photography uses high-quality stock fashion WebP stand-ins until official boutique photography is supplied (`docs/CONTENT-GUIDE.md`).
3. Domain `https://sudhirbastralaya.in` is a placeholder in meta/sitemap until production domain is confirmed.
4. Lighthouse CI scores were not run in this environment.
5. Popup-blocker same-tab WhatsApp fallback is implemented in code; blocker path was not forcibly simulated beyond `window.open` stub success.

## Browser/device testing limitations

- Testing performed in Cursor embedded Chromium against local static server only.
- No Safari/iOS, Firefox, or physical Android device pass in this report.
- WhatsApp deep links were validated by URL construction, not by completing a send inside the WhatsApp app.
