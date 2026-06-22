# SEO checklist

Use this when adding or editing pages.

## Per-page requirements

- [ ] `<title>` is unique and puts the primary keyword first:  
      e.g. `WordPress Hosting Hampshire | Meon Valley Web`
- [ ] `<meta name="description">` is 50–160 characters and describes the page.
- [ ] Exactly one `<h1>` that matches the page topic.
- [ ] URL is lowercase and hyphen-separated.
- [ ] Breadcrumbs passed to `MainLayout` so `BreadcrumbList` schema renders.
- [ ] Internal links use descriptive anchor text (avoid "click here", "read more").

## Global SEO

- `MainLayout.astro` injects:
  - `LocalBusiness` schema
  - `WebSite` schema on the homepage
  - `BreadcrumbList` when `breadcrumbs` are supplied
  - canonical `<link rel="canonical">`
- `public/robots.txt` and `sitemap-index.xml` are generated at build time.
- Open Graph defaults use the site URL, title, and description.

## Content

- [ ] Homepage links to the top location pages under "Areas we serve".
- [ ] Service and hosting pages cross-link to related services.
- [ ] Portfolio entries use `image` and `imageAlt` frontmatter.
- [ ] Blog/newsroom posts include a descriptive excerpt in `description`.

## Post-deploy

- [ ] Submit the new sitemap to Google Search Console.
- [ ] Run the [Google Rich Results Test](https://search.google.com/test/rich-results) on home, hosting, one location, and one blog post.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) for mobile and desktop.

## No-nos

- Do not duplicate H1s in Markdown files; the layout already provides the page H1.
- Do not mention specific proprietary control-panel brands publicly; describe features instead.
- Keep location pages distinct to avoid thin-content penalties, or consolidate via a data-driven template in a future phase.
