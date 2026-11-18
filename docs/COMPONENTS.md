# Components

Reusable UI is implemented with HTML structure plus vanilla JS renderers in `assets/js/components.js`.

## Renderers

| Function | Mount | Data |
|---|---|---|
| `renderCollections` | `#collectionsGrid` | `data/collections.js` |
| `renderCategories` | `#categoriesGrid` | `data/categories.js` |
| `renderProductFilters` / `renderProducts` | `#productFilterGroup`, `#productsGrid` | `data/products.js` |
| `renderTestimonials` / `initCarousel` | `#testimonialsTrack`, `#reviewsCarousel` | `data/testimonials.js` |

## Modules

| File | Responsibility |
|---|---|
| `config.js` | Business constants, nav, WhatsApp number |
| `whatsapp.js` | Message builders + `wa.me` open/fallback |
| `validation.js` | Form field validation helpers |
| `contact-form.js` | Enquiry form wiring |
| `navigation.js` | Sticky header, mobile menu, smooth scroll, active section, back-to-top |
| `animations.js` | Intersection Observer reveals + hero entrance |
| `main.js` | Boot sequence |

## CSS component layer

`assets/css/components.css` defines buttons, header, mobile nav, tiles, filters, form fields, carousel, FAB, footer helpers.
