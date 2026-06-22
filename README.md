# Meon Valley Web

A fast, accessible, SEO-friendly website for Meon Valley Web, built with Astro 6+ and Tailwind CSS 4+. Content and business data are centralised in `src/data/site.ts` so the site stays consistent across pages.

## Quick start

```bash
npm install
npm run dev
npm run build
```

## Build & quality checks

Run these before committing to verify the refactor branch:

```bash
npm run build
node scripts/verify-build.js
node scripts/accessibility-audit.js
```

## Project structure

```text
src/
├── components/          # Reusable UI primitives (cards, nav, section, etc.)
├── content/             # Content collections: blog, newsroom, portfolio, legal
├── data/site.ts         # Single source of truth for pricing, nav, locations, etc.
├── layouts/
│   └── MainLayout.astro # SEO, schema, breadcrumbs, header, footer
├── pages/               # Astro page routes
├── scripts/             # Imported page scripts (where used)
└── styles/global.css    # Tailwind layers and base styles

scripts/
├── verify-build.js      # Post-build smoke tests
└── accessibility-audit.js # Post-build a11y/SEO checks
```

## Editing key content

- **Navigation, footer, contact details, prices**: edit `src/data/site.ts`.
- **Page titles/descriptions**: set `<MainLayout title=... description=...>` props on each page.
- **Breadcrumbs**: pass a `breadcrumbs` array to `MainLayout`.
- **Portfolio / blog / newsroom**: add Markdown files under `src/content/<collection>/`.
- **Open Graph**: `MainLayout` uses the default business description; add `ogImage` when a social image is needed.

## Accessibility & SEO standards

- Exactly one `<h1>` per page.
- Form inputs must have an associated label.
- Images must have alt text.
- Meta descriptions should be 50–160 characters.
- Schema.org JSON-LD is included in `MainLayout` (`LocalBusiness`, `WebSite`, `BreadcrumbList`).
- See `docs/accessibility.md` and `docs/seo-checklist.md` for details.

## Deployment

Configured for Netlify:

- `public/_headers` forces security headers.
- `public/_redirects` handles HTTPS, www, and deprecated routes.
- `sitemap-index.xml` is generated automatically.

## License

© Meon Valley Web. All rights reserved.
