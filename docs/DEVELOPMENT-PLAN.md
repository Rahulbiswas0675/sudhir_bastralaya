# Sudhir Bastralaya — Development Plan

## Project overview

Premium static landing page for Sudhir Bastralaya (Karimpur, Nadia), combining Bengali textile heritage with contemporary fashion. Stack: HTML5, compiled Tailwind CSS, custom CSS, vanilla ES modules. Deployable on any static host.

## Existing design audit

| Area | Finding |
|---|---|
| Source | Single Stitch export `index.html` (~819 lines) |
| Reuse | Section IA, copy, contacts, WhatsApp number, Facebook URL, form fields |
| Gaps | Dead nav/`#` links, non-functional mobile menu, CDN Tailwind, Material icons, remote low-res images, invented product prices, weak SEO/a11y |
| Backup | `docs/backups/index.original.html` |

## Final design direction

- Brand tokens: `#F8F4ED`, `#641F35`, `#812F48`, `#C5A46D`, `#282525`, `#E9DFD1`
- Typography: Playfair Display (headings) + Plus Jakarta Sans (body)
- Full-bleed editorial hero with brand-first hierarchy
- Enquiry-only products (no invented prices)
- Sample testimonials clearly labeled

## Folder structure

See repository root: `assets/`, `docs/`, `index.html`, Tailwind CLI config.

## Component architecture

Data modules → `components.js` renderers → mount points in `index.html`. Config, WhatsApp, validation, navigation, animations, contact form as separate modules.

## Phase status

- [x] 01 Inspection / backup
- [x] 02 Development plan
- [x] 03 Design system CSS
- [x] 04 Folder architecture
- [x] 05 Header and hero
- [x] 06 Collections and categories
- [x] 07 Lookbook and products
- [x] 08 About and reviews
- [x] 09 Contact and WhatsApp
- [x] 10 Footer
- [x] 11 Responsive
- [x] 12 Animations
- [x] 13 SEO and accessibility
- [x] 14 Performance
- [x] 15 QA — see `docs/QA-REPORT.md`
- [x] 16 Deployment docs — see `docs/DEPLOYMENT.md`

## WhatsApp

Central number: `918768675669` in `assets/js/config.js`. Secondary phone is click-to-call only.

## Testing checklist

- [x] Navigation, mobile menu, filters, carousel, form validation, WhatsApp open, responsive spot checks, console clean of boot errors

## Deployment checklist

- [x] Root `index.html`, relative asset paths, no CDN Tailwind, WebP images, robots/sitemap placeholders
- [ ] Live production deploy (not performed — prepare locally only)
