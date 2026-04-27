# Changelog

All notable changes to this project will be documented in this file.

## [2026-04-27] - v1.4

### Added
- Link response headers for agent discovery per RFC 8288
  - `Link: </services>; rel="service-doc"` - API documentation reference
  - `Link: </contact>; rel="service-desc"` - Service description reference
  - `Link: </about>; rel="describedby"` - Site description reference

## [2026-03-03] - v1.3

### Added
- WordPress Doctor landing page with booking flow and request-a-slot form
- Local SEO landing pages for web design, WordPress hosting, and support
- `robots.txt` for improved crawl control

### Changed
- Hosting and services pages updated with new CTAs and booking integration
- Main layout and header/footer tweaks to support new marketing pages

---

## [2025-12-08] - v1.2

### Added
- Dark mode support across the site
- Fathom analytics tracking

### Changed
- Astro upgraded to v5.16.4
- Performance optimizations (image handling, render-blocking fixes)
- Accessibility improvements aligned to WCAG 2.1 AA
- Terms and privacy layout refinements
- Netlify form validation adjustments

---

## [2025-08-16] - v1.1

### Added
- Comprehensive charity page and portfolio showcase
- Expanded portfolio projects and assets

### Changed
- Homepage redesign with modern layout and hero refinements
- Pricing page reworked toward WordPress hosting focus
- About page updated with refreshed styling

---

## [2025-01-27] - Feature Branch Merge to Main

### Merged
- Successfully merged `feature/style-exploration` branch into `main`
- All WordPress hosting focus updates now live on main branch
- Fast-forward merge with no conflicts
- Repository now contains all latest changes and improvements

### Additional Updates
- Final index page refinements and optimizations
- All feature branch changes integrated into production-ready main branch

### Comprehensive Changes Included in Merge
- **22 files changed** with 1,914 insertions and 427 deletions
- **New pages created:** charity.astro, pricing.astro
- **New assets added:** 14 image files for portfolio and projects
- **Enhanced components:** Header.astro with improved navigation
- **Content updates:** about.md, about.astro, contact.astro, portfolio.astro, index.astro
- **Documentation:** Complete CHANGELOG.md for tracking all changes

---

## [2025-01-27] - Pricing Page Hosting Focus Update

### Added
- New hosting-focused pricing page structure matching meonvalleyhost.com
- Wayfarer hosting plan (£25/month) for personal blogs & small businesses
- Monarch hosting plan (£50/month) for medium-sized business websites
- Enterprise solutions CTA with custom quote option
- Setup included section with migration assistance details (£250)
- Hosting-specific features section with 4 key categories:
  - Lightning Fast Performance
  - Enterprise Security
  - Professional Management
  - Expert Support

### Changed
- Updated hero section to focus on "Premium WordPress Hosting Solutions"
- Replaced web design pricing plans with WordPress hosting plans
- Updated "What's included" section to be hosting-focused instead of web design
- Modified CTA section with hosting-specific contact information:
  - Phone: +44 (0)7850 037850
  - Email: info@meonvalleyweb.com
  - Response time: Within 2 hours
- Updated page title and meta description for hosting focus
- Removed pricing toggle functionality (no longer needed)
- Fixed TypeScript errors in JavaScript FAQ functionality

### Removed
- Project-based pricing plans (Starter, Professional, Enterprise)
- Monthly web design plans (Hosting Only, Hosting + Maintenance, Full Management)
- Pricing toggle between project and monthly plans
- Web design focused features and content

### Technical
- Cleaned up JavaScript code and added proper null checks
- Updated page metadata for SEO optimization
- Maintained responsive design and accessibility features

---

## Previous Changes
*Previous changes not documented in this changelog*
