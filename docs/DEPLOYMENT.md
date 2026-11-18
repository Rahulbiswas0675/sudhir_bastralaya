# Deployment Guide

## What to upload

Upload the project root contents (static files):

- `index.html`
- `robots.txt`
- `sitemap.xml`
- `assets/` (css, js, images, icons)
- Optional: `README.md`, `docs/` (not required for the live site)

Do **not** need to upload:

- `node_modules/`
- `.npm-cache/`
- `package-lock.json` (optional)
- Tailwind rebuild tooling (only needed if you change utility classes later)

## Hosting instructions

1. Point the domain document root at the folder containing `index.html`.
2. Ensure HTTPS is enabled on the host.
3. Confirm MIME types serve `.webp`, `.svg`, and `.js` correctly.
4. Open `https://your-domain/` and verify CSS, images, and WhatsApp links.

Works on Hostinger static hosting, Netlify drag-and-drop, Cloudflare Pages, GitHub Pages, or any Apache/Nginx static root.

### Netlify example

Drag the project folder into Netlify Drop, or connect a Git repo with publish directory = repository root (no build command required if `assets/css/tailwind.css` is already committed).

## Domain configuration notes

Replace placeholder domain `https://sudhirbastralaya.in` in:

- `index.html` canonical / Open Graph / JSON-LD
- `robots.txt`
- `sitemap.xml`
- `assets/js/config.js` (`SITE.domain`)

## HTTPS recommendation

Always serve over HTTPS so WhatsApp deep links, maps, and modern browser features work without mixed-content warnings.

## Post-deployment verification checklist

- [ ] Homepage loads without console errors
- [ ] All section images load (WebP)
- [ ] SVG icons render
- [ ] Desktop and mobile navigation work
- [ ] Product filters work
- [ ] Contact form validation works
- [ ] WhatsApp enquiry opens to `918768675669`
- [ ] `tel:` and `mailto:` links work on mobile
- [ ] Facebook footer link opens the official page
- [ ] `robots.txt` and `sitemap.xml` are reachable

## Rebuild CSS before deploy (if classes changed)

```bash
npm install
npm run build:css
```

Then re-upload `assets/css/tailwind.css`.
