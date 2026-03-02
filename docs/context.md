# Meon Valley Web - Project Rules

## Project Overview
Professional web development and hosting services website built with AstroJS and TailwindCSS. Focus on performance, accessibility, and modern web standards.

## Technology Stack
- **Framework**: AstroJS v5.14.1
- **Styling**: TailwindCSS v4 (with Vite plugin)
- **Content**: Markdown files for all content
- **Deployment**: Netlify (inferred from logos/tech stack)

## Project Structure

### Layout Components
- `src/layouts/MainLayout.astro` - Main layout wrapper
- `src/components/Header.astro` - Site header with navigation
- `src/components/Footer.astro` - Site footer

### Content Organization
- `src/content/` - All markdown content
  - `portfolio/` - Portfolio project entries
  - `pages/` - General page content
  - `legal/` - Legal documents (prefixed with `_` to exclude from collections)
  - `services/` - Service descriptions
- Legal files use `_` prefix (e.g., `_privacy-policy.md`) to exclude from Astro content collections
- Legal pages read files directly with `readFileSync` instead of using collections

### Image Management
- **Optimized images**: `src/assets/` - Processed by Astro Image component
- **Static assets**: `public/` - Served as-is (SVGs, favicons)
- **Rule**: All raster images (JPG, PNG) MUST go in `src/assets/` for optimization
- **Rule**: Only SVGs and static files in `public/`

## Performance Optimization Standards

### Image Optimization
- **Always use** Astro's `<Image>` component for raster images
- **Import images** from `src/assets/` at the top of Astro files
- **Specify dimensions** with correct aspect ratios to prevent layout shift
- **Use WebP format** with quality={80} for optimal compression
- **Generate responsive sizes** with `widths` and `sizes` attributes

**Example:**
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.jpg';
---

<Image 
  src={myImage} 
  alt="Descriptive text" 
  widths={[400, 600, 800]}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
  quality={80}
/>
```

### Font Loading
- **Async loading**: Use `media="print" onload="this.media='all'"` trick
- **Preconnect**: Always add preconnect hints for external fonts
- **Font display**: Use `font-display: swap` in CSS
- **Fallback fonts**: Comprehensive system font stack in Tailwind config
- **Minimize weights**: Only load necessary font weights

### CSS & Render Blocking
- Keep CSS minimal (Tailwind handles purging)
- Load fonts asynchronously to prevent render blocking
- Use preconnect for external resources

## Accessibility Standards (WCAG 2.1 Level AA)

### Interactive Elements
- **Buttons**: Always include `aria-label` for icon-only buttons
- **Links**: Add `aria-label` for icon-only links (e.g., social media)
- **Menu states**: Use `aria-expanded` and `aria-controls` for toggles
- **Decorative SVGs**: Mark with `aria-hidden="true"`

### Heading Hierarchy
- **Never skip levels**: h1 → h2 → h3 (no h1 → h3)
- **Use semantic HTML**: Don't use heading tags for styling
- **Alternative**: Use `<p>` with bold classes for non-semantic headings

### JavaScript State Management
- Update ARIA attributes dynamically (e.g., `aria-expanded` on menu toggle)
- Maintain accessible state for screen readers

## Content Collections Configuration

### Defined Collections
Located in `src/content/config.ts`:
- `portfolio` - Project portfolio entries
- `services` - Service descriptions
- `pages` - General pages
- `legal` - Legal documents (currently empty, files prefixed with `_`)

### Schema Requirements
All collections require proper frontmatter with defined schemas using Zod validation.

## Styling Conventions

### TailwindCSS Configuration
- Custom primary color palette (pink/magenta brand colors)
- Custom gray scale
- Font families: Inter (sans), JetBrains Mono (mono - not currently used)
- System font fallbacks for performance

### Component Patterns
- Use Tailwind utility classes directly in components
- Responsive design: mobile-first approach
- Hover states: `hover:` prefix for interactive elements
- Transitions: `transition-colors duration-200` for smooth interactions

## Build & Deployment

### Build Process
- `npm run build` - Production build
- `npm run preview` - Preview production build locally
- Images optimized at build time (cached for subsequent builds)
- All Astro pages are static (SSG)

### Performance Targets
- **Performance Score**: 85-95
- **Accessibility Score**: 100 (WCAG 2.1 AA)
- **Image optimization**: 95%+ reduction
- **LCP**: < 2.5s
- **Render blocking**: < 200ms

## Documentation Standards

### Performance Changes
Document all performance optimizations with:
- Before/after metrics
- Expected improvements
- Implementation details
- Testing recommendations

### Accessibility Changes
Document all accessibility fixes with:
- WCAG criteria addressed
- Before/after code examples
- Testing procedures
- Compliance statements

## Git Commit Conventions

### Commit Message Structure
```
Brief summary (50 chars or less)

- Detailed bullet points of changes
- Include metrics where applicable
- Reference documentation files

Performance/Accessibility improvements:
- Specific improvements with numbers
- Expected impact

Expected PageSpeed gains:
- Metric improvements
```

### Commit Frequency
- Commit after each logical group of changes
- Separate commits for: images, fonts, accessibility, documentation
- Always include documentation in same commit as changes

## Common Patterns

### Page Structure
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { Image } from 'astro:assets';
// Import images from assets
---

<MainLayout title="Page Title" description="Page description">
  <!-- Page content -->
</MainLayout>
```

### Mobile Menu Pattern
- Button with proper ARIA attributes
- JavaScript toggle with state management
- Hidden by default, toggle with `.hidden` class

### Technology Logos
- Display at h-12 (48px height)
- Maintain proper aspect ratios
- Use Image component for PNGs
- Keep SVGs in public/ folder

## Testing Checklist

### Before Deployment
- [ ] `npm run build` succeeds
- [ ] No console errors or warnings
- [ ] All images load correctly
- [ ] Mobile menu works
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader announcements correct

### After Deployment
- [ ] Run PageSpeed Insights
- [ ] Verify image optimization
- [ ] Check font loading (no FOIT)
- [ ] Test on mobile devices
- [ ] Verify Core Web Vitals

## Known Issues & Solutions

### Content Collections Deprecation
- **Issue**: Auto-generated collections are deprecated
- **Solution**: Explicitly define all collections in `config.ts`
- **Workaround**: Prefix files with `_` to exclude from collections

### Font Loading
- **Issue**: Google Fonts block render (780ms)
- **Solution**: Async loading with media="print" trick
- **Alternative**: Self-host fonts or use system fonts only

### Image Aspect Ratios
- **Issue**: Displayed dimensions don't match natural aspect ratio
- **Solution**: Calculate correct dimensions based on natural ratio
- **Formula**: width = naturalWidth * (targetHeight / naturalHeight)

## Project-Specific Notes

### Charity Commitment
- Build one website for charity every quarter (free)
- 10% of profits go to charitable causes
- Charity page showcases this work

### Service Offerings
- WordPress sites
- Headless WordPress with Astro
- Full AstroJS solutions
- Laravel applications
- Hosting plans: Wayfarer (£30), Shipwright (£75), Monarch (£100)

### Brand Colors
- Primary: #BC1F63 (pink/magenta)
- Used throughout for CTAs, links, accents
- Maintains professional yet distinctive appearance

## Future Enhancements (Optional)

### Performance
- [ ] Self-host fonts for zero external requests
- [ ] Critical CSS inlining
- [ ] Service worker for caching
- [ ] Optimize remaining portfolio/charity images

### Accessibility
- [ ] Skip to main content link
- [ ] Focus trap in mobile menu
- [ ] Reduced motion preferences
- [ ] High contrast mode support

### Features
- [ ] Blog/news section
- [ ] Client testimonials
- [ ] Case studies with metrics
- [ ] Contact form with validation