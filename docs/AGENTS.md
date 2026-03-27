# Agent Development Guide
**Meon Valley Web 2025 - Astro Project**  
Last Updated: December 8, 2025

> **Purpose:** This document provides comprehensive guidance for AI agents and developers working on the Meon Valley Web 2025 project. It covers project structure, technologies, workflows, security considerations, and best practices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Coding Standards](#coding-standards)
6. [Git Workflow](#git-workflow)
7. [Testing & Quality Assurance](#testing--quality-assurance)
8. [Security Considerations](#security-considerations)
9. [Deployment](#deployment)
10. [Common Tasks](#common-tasks)
11. [Troubleshooting](#troubleshooting)
12. [References](#references)

---

## Project Overview

**Project Name:** Meon Valley Web 2025  
**Type:** Static website for web development agency  
**Repository:** https://github.com/MeonValleyWeb/meonvalleyweb2025.git  
**Hosting:** Netlify  
**Default Branch:** `main`

### Purpose
Marketing and portfolio website showcasing web development services, hosting solutions, and completed projects. Features include contact forms, portfolio showcase, service descriptions, and legal documentation.

### Key Features
- Static site generation (SSG) for optimal performance
- Portfolio project showcase with dynamic routing
- Contact form with spam protection (Netlify Forms)
- Responsive design with accessibility features
- Content collections for structured data
- Dark mode support (recently added)
- Privacy-focused analytics (Fathom)

---

## Technology Stack

### Core Framework
- **Astro v5.16.4** - Static Site Generator
  - File-based routing
  - Content collections with Zod validation
  - Component islands architecture
  - Zero JS by default (progressive enhancement)

### Styling
- **Tailwind CSS v4.1.12** - Utility-first CSS framework
  - Custom theme configuration
  - Typography plugin (`@tailwindcss/typography`)
  - Vite plugin integration (`@tailwindcss/vite`)
  - Custom color palette (primary pink: `#BC1F63`)
  - Responsive breakpoints
  - Dark mode support

### Content Management
- **Astro Content Collections** - Type-safe content management
  - Collections: `portfolio`, `services`, `pages`, `legal`
  - Zod schema validation
  - Markdown support with frontmatter

### Markdown Processing
- **Marked v16.3.0** - Markdown parser
  - ⚠️ Security Note: Sanitize user-generated content before rendering

### Language
- **TypeScript** - Type-safe JavaScript
  - Strict mode enabled (`astro/tsconfigs/strict`)
  - Type checking for `.astro`, `.ts`, and content schemas

### Package Manager
- **npm** - Default package manager (v8+)
  - Alternative: pnpm (recommended for faster installs)

### Development Tools
- **VS Code Extensions:**
  - `astro-build.astro-vscode` (required)
  - Recommended: ESLint, Prettier, Tailwind CSS IntelliSense

### Analytics
- **Fathom Analytics** - Privacy-focused website analytics
  - Site ID: `GVQVVZKT`
  - Script: `https://cdn.usefathom.com/script.js`

### Fonts
- **Google Fonts:** Inter (weights: 400, 500, 600, 700)
  - Preconnected for performance
  - `font-display: swap` for optimal loading

---

## Project Structure

```
meonvalleyweb-2025/
├── .astro/               # Generated types and build cache
├── .git/                 # Git repository
├── .vscode/              # VS Code configuration
│   ├── extensions.json   # Recommended extensions
│   └── launch.json       # Debug configurations
├── dist/                 # Built static files (generated)
├── docs/                 # Project documentation
│   ├── SECURITY_AUDIT_2025.md
│   ├── ACCESSIBILITY_AUDIT_2025.md
│   ├── ACCESSIBILITY_FIX.md
│   ├── DEPRECATION_FIX_SUMMARY.md
│   ├── IMAGE_OPTIMIZATION_SUMMARY.md
│   ├── PERFORMANCE_OPTIMIZATION_SUMMARY.md
│   ├── PHASE_1_COMPLETED.md
│   └── RENDER_BLOCKING_FIX.md
├── node_modules/         # Dependencies (not committed)
├── public/               # Static assets (copied as-is)
│   ├── favicon.svg
│   ├── apple-touch-icon*.png
│   ├── *.jpg, *.png      # Images
│   └── portfolio/        # Portfolio images
├── src/
│   ├── assets/           # Optimized assets (processed by Astro)
│   ├── components/       # Reusable Astro components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/          # Content collections
│   │   ├── config.ts     # Collection schemas
│   │   ├── portfolio/    # Portfolio projects (Markdown)
│   │   ├── pages/        # Content pages
│   │   └── legal/        # Legal documents
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro   # Homepage
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   ├── portfolio/[...slug].astro  # Dynamic routes
│   │   ├── contact.astro
│   │   ├── hosting.astro
│   │   ├── charity.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── thank-you.astro
│   │   └── archived/     # Deprecated pages
│   └── styles/
│       └── global.css    # Global styles & Tailwind config
├── .gitignore
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── CHANGELOG.md          # Version history
├── README.md             # Project readme
└── AGENTS.md             # This file

```

### Key Directories Explained

#### `/src/pages/`
- File-based routing (e.g., `about.astro` → `/about`)
- Dynamic routes: `[...slug].astro` for catch-all routes
- Each file exports Astro components

#### `/src/content/`
- Type-safe content collections
- Markdown files with frontmatter validation
- Schemas defined in `config.ts`

#### `/src/components/`
- Reusable UI components
- Used across multiple pages
- Astro components (`.astro` files)

#### `/src/layouts/`
- Page templates
- `MainLayout.astro` wraps most pages
- Contains `<head>`, header, footer, and analytics

#### `/public/`
- Static assets served as-is
- No processing or optimization
- Directly accessible via root URL

#### `/docs/`
- Project documentation and audit reports
- Not served to production
- Internal documentation only

---

## Development Setup

### Prerequisites

```bash
# Required
Node.js >= 18.14.1
npm >= 8.0.0

# Optional (but recommended)
pnpm >= 8.0.0
Git >= 2.30.0
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/MeonValleyWeb/meonvalleyweb2025.git
cd meonvalleyweb-2025

# Install dependencies
npm install
# OR
pnpm install

# Start development server
npm run dev
# Server runs at: http://localhost:4321
```

### Available Scripts

```json
{
  "dev": "astro dev",           // Start dev server (port 4321)
  "build": "astro build",       // Build for production
  "preview": "astro preview",   // Preview production build
  "astro": "astro"              // Run Astro CLI commands
}
```

### Recommended Additional Scripts (to add)

```json
{
  "check": "astro check && npm run lint",
  "lint": "eslint src --ext .astro,.ts,.js",
  "format": "prettier --write \"src/**/*.{astro,ts,js,css,md}\"",
  "type-check": "tsc --noEmit"
}
```

### VS Code Setup

1. **Install recommended extension:**
   ```
   Astro (astro-build.astro-vscode)
   ```

2. **Additional recommended extensions:**
   - ESLint
   - Prettier - Code formatter
   - Tailwind CSS IntelliSense
   - Error Lens (optional, for inline errors)

3. **Workspace Settings** (`.vscode/settings.json`):
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "[astro]": {
       "editor.defaultFormatter": "astro-build.astro-vscode"
     },
     "files.associations": {
       "*.css": "tailwindcss"
     }
   }
   ```

---

## Coding Standards

### Astro Components

**File naming:** PascalCase for components (`Header.astro`, `Footer.astro`)  
**Page naming:** kebab-case for pages (`about.astro`, `thank-you.astro`)

**Component Structure:**
```astro
---
// Frontmatter (server-side JavaScript/TypeScript)
import MainLayout from '../layouts/MainLayout.astro';

export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Template (HTML-like syntax) -->
<MainLayout title={title} description={description}>
  <section class="container mx-auto px-4">
    <h1>{title}</h1>
    <!-- Content -->
  </section>
</MainLayout>

<style>
  /* Scoped styles (optional) */
  h1 {
    @apply text-4xl font-bold text-gray-900;
  }
</style>

<script>
  // Client-side JavaScript (optional)
  // Runs in the browser
</script>
```

### TypeScript

- **Use strict mode** (enabled by default)
- **Define interfaces for props:**
  ```typescript
  export interface Props {
    title: string;
    description?: string;
  }
  ```
- **Type content collections:**
  ```typescript
  import { z } from 'astro:content';
  
  const schema = z.object({
    title: z.string(),
    date: z.date(),
  });
  ```

### Tailwind CSS

**Use utility classes:**
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h1 class="text-5xl font-bold text-gray-900 mb-6">Title</h1>
</div>
```

**Custom colors (defined in theme):**
```html
<button class="bg-primary-500 hover:bg-primary-600">Click me</button>
```

**Responsive design:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Content -->
</div>
```

**Dark mode:**
```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <!-- Content -->
</div>
```

### Accessibility

**Required practices:**

1. **Semantic HTML:**
   ```html
   <nav>, <main>, <article>, <section>, <header>, <footer>
   ```

2. **Alt text for images:**
   ```html
   <img src="/image.jpg" alt="Descriptive text">
   ```

3. **Form labels:**
   ```html
   <label for="email">Email Address</label>
   <input type="email" id="email" name="email" required>
   ```

4. **Focus indicators:**
   ```css
   *:focus-visible {
     outline: 3px solid #BC1F63;
     outline-offset: 2px;
   }
   ```

5. **Skip to main content:**
   ```html
   <a href="#main-content" class="skip-link">Skip to main content</a>
   ```

6. **Reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

### Code Comments

- **Minimal comments** - Write self-documenting code
- **Use comments for:**
  - Complex logic explanations
  - Security considerations
  - Performance optimizations
  - TODO/FIXME notes

**Example:**
```typescript
// Security: Sanitize user input to prevent XSS
const sanitized = DOMPurify.sanitize(userInput);

// TODO: Add rate limiting to contact form
// Performance: Lazy load images below the fold
```

---

## Git Workflow

### Branching Strategy

**Main Branch:** `main` (protected)
- Always deployable
- Never force-push
- Requires PR for changes

**Branch Naming Conventions:**

```bash
feature/<descriptive-slug>   # New features
bugfix/<issue-description>   # Bug fixes
hotfix/<critical-issue>      # Production hotfixes
refactor/<component-name>    # Code refactoring
docs/<documentation-update>  # Documentation changes
```

**Examples:**
```bash
feature/dark-mode
bugfix/contact-form-validation
hotfix/broken-portfolio-links
refactor/header-component
docs/update-readme
```

### Workflow Steps

#### 1. Create Feature Branch

```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create and checkout new branch
git checkout -b feature/your-feature-name
```

#### 2. Development

```bash
# Make changes
# Stage changes
git add .

# Commit with descriptive message
git commit -m "[Component] Description of changes

- Detail 1
- Detail 2

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"
```

#### 3. Pre-Commit Checks

**ALWAYS run before committing:**

```bash
# Build the project
npm run build

# Check for TypeScript errors (if check script exists)
npm run check

# Verify no broken links or assets
npm run preview
# Test at http://localhost:4321
```

#### 4. Push Changes

```bash
# First push
git push -u origin feature/your-feature-name

# Subsequent pushes
git push

# Force push (ONLY on feature branches, NEVER on main)
git push --force-with-lease
```

#### 5. Create Pull Request

**PR Title Format:**
```
[Component] Brief description
```

**Examples:**
- `[Header] Add dark mode toggle`
- `[Contact Form] Fix email validation regex`
- `[Portfolio] Add new case study`

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Performed
- [ ] Local dev server (`npm run dev`)
- [ ] Production build (`npm run build`)
- [ ] Preview mode (`npm run preview`)
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile devices
- [ ] Tested accessibility (keyboard navigation, screen reader)

## Screenshots (for UI changes)
[Attach screenshots or GIFs]

## Related Issues
Closes #123
```

#### 6. Review & Merge

- **Automated checks:** Netlify deploy preview
- **Manual review:** Code quality, functionality
- **Merge strategy:** Squash and merge (preferred)

### Commit Message Format

**Structure:**
```
[Component] Short summary (50 chars max)

- Detailed explanation of changes
- Why the change was needed
- Any breaking changes or important notes

Co-authored-by: Name <email>
```

**Examples:**
```
[Contact Form] Add honeypot spam protection

- Added hidden bot-field input
- Updated form submission validation
- Improved spam detection rate by 95%

[Portfolio] Optimize images for performance

- Converted JPGs to WebP format
- Added responsive image srcsets
- Reduced page load time by 2.3s
```

### Git Hooks (Recommended)

**Pre-commit hook** (`.git/hooks/pre-commit`):
```bash
#!/bin/bash

echo "Running pre-commit checks..."

# Run build
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Commit aborted."
  exit 1
fi

echo "✅ All checks passed"
exit 0
```

### Never Commit

❌ **DO NOT commit:**
- `.env` files
- API keys or secrets
- `node_modules/`
- `dist/` folder
- `.DS_Store` files
- Personal configuration files
- Large binary files (>5MB)
- Unoptimized images
- Debug logs

✅ **DO commit:**
- Source code
- Configuration files
- Documentation
- Optimized images in `/public`
- Package lock files

---

## Testing & Quality Assurance

### Pre-Deployment Checklist

**Before every deployment, verify:**

#### Build & Compilation
```bash
# 1. Clean build
rm -rf dist .astro
npm run build

# 2. Check for errors
# Look for:
# - TypeScript errors
# - Missing imports
# - Broken links
# - Asset loading failures
```

#### Local Testing
```bash
# 3. Preview production build
npm run preview

# 4. Test all pages manually
# Visit each page at http://localhost:4321
# - Home (/)
# - About (/about)
# - Services (/services)
# - Portfolio (/portfolio)
# - Contact (/contact)
# - Hosting (/hosting)
# - Charity (/charity)
# - Privacy (/privacy)
# - Terms (/terms)
```

#### Functionality Testing

**Contact Form:**
- [ ] All fields validate correctly
- [ ] Email regex accepts valid emails
- [ ] Phone regex accepts valid numbers
- [ ] Honeypot field is hidden
- [ ] Form submits successfully
- [ ] Thank you page redirects
- [ ] Email notifications work (Netlify)

**Navigation:**
- [ ] Header links work
- [ ] Footer links work
- [ ] Logo links to home
- [ ] Mobile menu functions
- [ ] Active page indicators

**Portfolio:**
- [ ] All projects load
- [ ] Dynamic routes work (`/portfolio/[slug]`)
- [ ] Images display correctly
- [ ] Markdown content renders

**Responsive Design:**
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)

#### Browser Testing

**Test on:**
- Chrome/Edge (Chromium) - Latest
- Firefox - Latest
- Safari - Latest (macOS/iOS)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Performance Testing

**Tools:**
```bash
# Lighthouse (Chrome DevTools)
# Target scores:
# - Performance: 90+
# - Accessibility: 100
# - Best Practices: 95+
# - SEO: 100

# PageSpeed Insights
# Visit: https://pagespeed.web.dev/
# Test: https://meonvalleyweb.com
```

**Key Metrics:**
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s

#### Accessibility Testing

**Automated:**
```bash
# axe DevTools (Chrome Extension)
# WAVE (Web Accessibility Evaluation Tool)
```

**Manual:**
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Alt text on all images
- [ ] Form labels properly associated
- [ ] Color contrast ratios meet WCAG 2.1 AA

#### Security Testing

```bash
# Check for vulnerabilities
npm audit

# Should return 0 vulnerabilities
# If vulnerabilities found:
npm audit fix
```

**Manual checks:**
- [ ] No exposed API keys in code
- [ ] No secrets in `.env` committed
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Forms have CSRF protection
- [ ] No inline JavaScript (XSS prevention)

#### Content Verification

- [ ] All text content is accurate
- [ ] Spelling and grammar checked
- [ ] Legal documents up to date
- [ ] Copyright year current
- [ ] Contact information correct
- [ ] No broken links

### Automated Testing (Recommended to Add)

**Unit Tests** (currently not implemented):
```bash
# Suggested: Vitest
npm install -D vitest @vitest/ui

# Test component logic
# Test utility functions
# Test content schema validation
```

**E2E Tests** (currently not implemented):
```bash
# Suggested: Playwright
npm install -D @playwright/test

# Test user flows:
# - Contact form submission
# - Navigation
# - Portfolio browsing
```

---

## Security Considerations

> **Reference:** See `/docs/SECURITY_AUDIT_2025.md` for comprehensive security audit

### Critical Security Rules

#### 1. Never Commit Secrets

❌ **NEVER commit:**
```bash
# Environment variables
.env
.env.local
.env.production

# API keys
API_KEY=abc123

# Credentials
password=secret
token=xyz789
```

✅ **Use environment variables:**
```typescript
// Access via Astro
const apiKey = import.meta.env.API_KEY;

// Set in Netlify dashboard:
// Site settings → Environment variables
```

#### 2. Validate All User Input

**Contact form validation:**
```typescript
// Email validation
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

// Phone validation
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

// Sanitize before processing
if (!emailRegex.test(email)) {
  // Reject input
}
```

#### 3. Protect Against XSS

**Astro automatically escapes content:**
```astro
---
const userInput = "<script>alert('XSS')</script>";
---

<!-- Safe - Astro escapes HTML -->
<div>{userInput}</div>
<!-- Renders as: &lt;script&gt;alert('XSS')&lt;/script&gt; -->
```

**When using `set:html` (dangerous):**
```astro
---
import DOMPurify from 'isomorphic-dompurify';

const userContent = "<p>User content</p>";
const sanitized = DOMPurify.sanitize(userContent);
---

<!-- Only use with sanitized content -->
<div set:html={sanitized} />
```

#### 4. Secure External Links

**Always add security attributes:**
```html
<!-- ❌ Vulnerable to tabnabbing -->
<a href="https://external.com" target="_blank">Link</a>

<!-- ✅ Secure -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">Link</a>
```

#### 5. HTTP Security Headers

**Create `public/_headers`** (Netlify):
```nginx
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.usefathom.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://cdn.usefathom.com; frame-ancestors 'none';
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  X-XSS-Protection: 1; mode=block
```

#### 6. Dependency Security

**Regular audits:**
```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# Review breaking changes
npm audit fix --force
```

**Dependabot:**
- Enabled on GitHub repository
- Automatically creates PRs for security updates
- Review and merge promptly

#### 7. Form Security

**Spam protection:**
```html
<!-- Honeypot field (hidden from users, visible to bots) -->
<div style="display: none;">
  <label>Don't fill this out if you're human: 
    <input name="bot-field" />
  </label>
</div>
```

**CSRF protection:**
- Netlify Forms provides built-in CSRF protection
- Form submissions are validated server-side

**Rate limiting:**
- Netlify's default rate limiting (100 submissions/month free tier)
- Consider adding CAPTCHA for additional protection

#### 8. Content Security Policy (CSP)

**Allowed sources:**
- Scripts: `'self'`, Fathom Analytics
- Styles: `'self'`, Google Fonts
- Fonts: `'self'`, Google Fonts
- Images: `'self'`, `data:`, any HTTPS
- Frames: None (`frame-ancestors 'none'`)

**Inline scripts:**
- Avoid inline `<script>` tags when possible
- Use `<script>` with `is:inline` directive if necessary
- Consider using `nonce` for CSP

#### 9. HTTPS Enforcement

**Netlify automatically enforces HTTPS:**
- HTTP requests redirect to HTTPS
- HSTS header set (max-age: 31536000)
- TLS 1.2+ only

#### 10. Secure Asset Storage

**Public assets:**
- Stored in `/public` directory
- No sensitive data (passwords, keys, tokens)
- Optimize images before committing

**Private assets:**
- Store in external service (AWS S3, Cloudinary)
- Use signed URLs for access
- Never commit to repository

### Security Incident Response

**If security breach detected:**

1. **Immediate Actions:**
   ```bash
   # Take site offline (if critical)
   # Netlify: Stop auto-publishing
   
   # Rotate all credentials
   # Update environment variables
   
   # Review git history for exposed secrets
   git log --all --full-history --source -- **/.env*
   ```

2. **Notify stakeholders:**
   - Email: security@meonvalleyweb.com (create this)
   - GitHub: Open security issue (private)
   - Netlify: Contact support if hosting-related

3. **Investigate:**
   - Review access logs
   - Check for unauthorized changes
   - Identify attack vector

4. **Remediate:**
   - Remove malicious code
   - Patch vulnerabilities
   - Restore from clean backup

5. **Document:**
   - Create incident report
   - Update security documentation
   - Implement preventive measures

---

## Deployment

### Hosting: Netlify

**Production URL:** https://meonvalleyweb.com  
**Netlify Site:** meonvalleyweb2025

### Deployment Process

**Automatic Deployment:**
```bash
# Push to main branch
git push origin main

# Netlify automatically:
# 1. Detects push
# 2. Runs: npm run build
# 3. Publishes dist/ folder
# 4. Deploys to production
```

**Manual Deployment:**
```bash
# Build locally
npm run build

# Deploy via Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```

### Deploy Previews

**Pull Requests automatically get deploy previews:**
- URL format: `deploy-preview-{PR-number}--meonvalleyweb2025.netlify.app`
- Test before merging to main
- Share with stakeholders for review

### Environment Variables

**Set in Netlify dashboard:**
```
Site settings → Environment variables

# Example:
FATHOM_SITE_ID=GVQVVZKT
CONTACT_EMAIL=hello@meonvalleyweb.com
```

**Access in code:**
```typescript
const siteId = import.meta.env.FATHOM_SITE_ID;
```

### Build Configuration

**Netlify settings:**
```toml
# netlify.toml (optional, currently not in use)
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Post-Deployment Verification

**After deployment, verify:**

1. **Site loads correctly:**
   ```bash
   curl -I https://meonvalleyweb.com
   # Check for 200 status code
   ```

2. **Security headers present:**
   ```bash
   curl -I https://meonvalleyweb.com | grep -E "(Content-Security-Policy|X-Frame-Options|Strict-Transport)"
   ```

3. **Forms work:**
   - Submit test form
   - Verify email receipt

4. **Analytics tracking:**
   - Visit site
   - Check Fathom dashboard for event

5. **Performance:**
   - Run Lighthouse audit
   - Verify Core Web Vitals

### Rollback Procedure

**If deployment fails:**

```bash
# Option 1: Revert commit
git revert HEAD
git push origin main

# Option 2: Netlify dashboard
# Deploys → [Previous deploy] → Publish deploy
```

---

## Common Tasks

### Adding a New Page

```bash
# 1. Create page file
touch src/pages/new-page.astro

# 2. Add content
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="New Page" description="Description">
  <section class="container mx-auto px-4 py-20">
    <h1 class="text-5xl font-bold mb-6">New Page</h1>
    <!-- Content -->
  </section>
</MainLayout>

# 3. Add navigation link (if needed)
# Edit: src/components/Header.astro

# 4. Test locally
npm run dev
```

### Adding a Portfolio Project

```bash
# 1. Create markdown file
touch src/content/portfolio/project-name.md

# 2. Add frontmatter and content
---
title: "Project Name"
description: "Brief description"
technology: "Astro, TypeScript, Tailwind"
category: "E-commerce"
client: "Client Name"
status: "Live"
featured: true
order: 1
image: "/portfolio/project-image.jpg"
imageAlt: "Project screenshot"
---

# Project Name

Detailed project description...

## Challenge
...

## Solution
...

## Results
...

# 3. Add project image
# Copy to: public/portfolio/project-image.jpg

# 4. Verify schema validation
npm run build
# Check for Zod validation errors
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update astro

# Update all minor/patch versions
npm update

# Update to latest major versions (review breaking changes)
npm install astro@latest tailwindcss@latest

# Verify no breaking changes
npm run build
npm run preview
```

### Optimizing Images

```bash
# 1. Compress images before adding
# Tools: TinyPNG, ImageOptim, Squoosh

# 2. Recommended formats:
# - Photos: WebP (fallback: JPG)
# - Graphics: SVG (fallback: PNG)
# - Icons: SVG

# 3. Responsive images
<picture>
  <source srcset="/image.webp" type="image/webp">
  <source srcset="/image.jpg" type="image/jpeg">
  <img src="/image.jpg" alt="Description">
</picture>

# 4. Use Astro's Image component (recommended)
---
import { Image } from 'astro:assets';
import myImage from '../assets/image.jpg';
---

<Image src={myImage} alt="Description" />
# Automatic optimization, responsive sizes, lazy loading
```

### Adding Custom Fonts

```bash
# 1. Self-host option (recommended for privacy)
# Download fonts from Google Fonts
# Place in: public/fonts/

# 2. Update CSS
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap;
}

# 3. Update Tailwind config
fontFamily: {
  custom: ['CustomFont', 'sans-serif'],
}

# 4. Use in components
<h1 class="font-custom">Heading</h1>
```

### Debugging Build Errors

```bash
# 1. Clear cache
rm -rf .astro dist node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Check TypeScript errors
npx tsc --noEmit

# 4. Verbose build
npm run build -- --verbose

# 5. Check specific file
npx astro check src/pages/problem-page.astro
```

---

## Troubleshooting

### Common Issues

#### "Module not found" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Tailwind classes not applying

**Solution:**
```bash
# 1. Check content paths in tailwind.config.js
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']

# 2. Restart dev server
# Kill and restart: npm run dev

# 3. Check global.css import
# Verify: import '../styles/global.css'; in layout
```

#### TypeScript errors in .astro files

**Solution:**
```bash
# 1. Ensure Astro VS Code extension installed
# 2. Reload VS Code window: Cmd+Shift+P → "Reload Window"
# 3. Check tsconfig.json extends correct config
{
  "extends": "astro/tsconfigs/strict"
}
```

#### Images not loading

**Solution:**
```bash
# 1. Check image path (relative to public/)
# Correct: <img src="/image.jpg">
# Incorrect: <img src="./image.jpg">

# 2. Verify image exists in public/ or src/assets/

# 3. Check file extensions (case-sensitive on Linux)
```

#### Build succeeds locally but fails on Netlify

**Solution:**
```bash
# 1. Check Node version matches
# Netlify default: Node 18
# Set in Netlify: Build settings → Environment

# 2. Check environment variables
# Add in Netlify dashboard if needed

# 3. Review build logs on Netlify
# Deploys → [Failed deploy] → Deploy log
```

#### Contact form not submitting

**Solution:**
```bash
# 1. Verify Netlify form attributes
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- fields -->
</form>

# 2. Check form name matches hidden field
# 3. Deploy to Netlify (forms don't work locally)
# 4. Check Netlify dashboard: Forms
```

### Performance Issues

**Slow dev server:**
```bash
# Clear cache
rm -rf .astro
npm run dev
```

**Slow build times:**
```bash
# Check for large dependencies
npx npm-check -u

# Optimize images before committing
# Use fewer/smaller dependencies
```

**Slow page loads:**
```bash
# 1. Run Lighthouse audit
# 2. Optimize images (WebP, compression)
# 3. Minimize JavaScript
# 4. Use Astro components (less JS)
# 5. Lazy load below-the-fold content
```

---

## References

### Official Documentation

- **Astro:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Netlify:** https://docs.netlify.com

### Internal Documentation

- `/docs/SECURITY_AUDIT_2025.md` - Comprehensive security audit
- `/docs/ACCESSIBILITY_AUDIT_2025.md` - Accessibility compliance
- `/docs/PERFORMANCE_OPTIMIZATION_SUMMARY.md` - Performance improvements
- `/CHANGELOG.md` - Version history
- `/README.md` - Project overview

### Tools & Resources

- **Mozilla Observatory:** https://observatory.mozilla.org
- **Lighthouse:** Chrome DevTools → Lighthouse
- **PageSpeed Insights:** https://pagespeed.web.dev
- **WAVE:** https://wave.webaim.org
- **Can I Use:** https://caniuse.com

### Security Resources

- **OWASP Top 10:** https://owasp.org/Top10
- **Content Security Policy:** https://content-security-policy.com
- **Security Headers:** https://securityheaders.com
- **npm audit:** https://docs.npmjs.com/cli/v8/commands/npm-audit

### Community

- **Astro Discord:** https://astro.build/chat
- **GitHub Discussions:** https://github.com/withastro/astro/discussions
- **Tailwind Discord:** https://tailwindcss.com/discord

---

## Changelog

### December 8, 2025
- Initial creation of AGENTS.md
- Documented project structure, technologies, and workflows
- Added security considerations from security audit
- Defined git workflow and branching strategy
- Created testing checklist and deployment procedures

---

**Questions or Issues?**  
Contact: hello@meonvalleyweb.com  
Repository: https://github.com/MeonValleyWeb/meonvalleyweb2025  

---

*This document is maintained by the Meon Valley Web development team and should be updated whenever project structure, technologies, or workflows change significantly.*
