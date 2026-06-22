# Schema.org Analysis - Meon Valley Web

## Current Schema Implementation

### ✅ What's Already Implemented (MainLayout.astro)

**Global JSON-LD Schema on ALL pages:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Meon Valley Web",
      "url": "https://meonvalleyweb.com",
      "logo": "/meon-valley-web-logo.svg",
      "areaServed": ["Hampshire", "South Coast", "United Kingdom"],
      "description": "Web design, WordPress hosting, and maintenance for small businesses."
    },
    {
      "@type": "Service",
      "serviceType": "Managed WordPress Hosting",
      "provider": { "@type": "LocalBusiness", "name": "Meon Valley Web" },
      "areaServed": ["Hampshire", "South Coast", "United Kingdom"]
    },
    {
      "@type": "Service",
      "serviceType": "WordPress Support & Maintenance",
      "provider": { "@type": "LocalBusiness", "name": "Meon Valley Web" },
      "areaServed": ["Hampshire", "South Coast", "United Kingdom"]
    }
  ]
}
```

**This provides:**
- ✅ LocalBusiness schema (critical for local SEO)
- ✅ Service schemas for core offerings
- ✅ Area served information for local targeting
- ✅ Logo and URL for Knowledge Graph

---

## ⚠️ Schema Gaps & Missing Opportunities

### 1. **Location Pages Need LocalBusiness Schema**
**Pages affected:** All 9 location pages (Fareham, Southampton, Portsmouth, etc.)

**Current State:** Only global schema from MainLayout

**Missing:** Page-specific schema that tells Google:
- This page is specifically about "Web Design in [Town]"
- Service area includes specific postcodes
- Local landmarks/business districts served

**Impact:** Low - Global schema covers basics, but page-specific would help local rankings

**Recommended Schema per location page:**
```json
{
  "@type": "LocalBusiness",
  "@id": "https://meonvalleyweb.com/web-design-fareham#business",
  "name": "Meon Valley Web - Fareham Web Design",
  "url": "https://meonvalleyweb.com/web-design-fareham",
  "serviceArea": {
    "@type": "City",
    "name": "Fareham",
    "containedIn": {
      "@type": "State",
      "name": "Hampshire"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Website Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Development" } }
    ]
  }
}
```

---

### 2. **Contact Page Missing ContactPoint Schema**
**Page:** `/contact`

**Missing:** Proper structured data for contact information

**Current:** Just visual contact info, no schema markup

**Recommended:**
```json
{
  "@type": "ContactPoint",
  "telephone": "+44-7850-037850",
  "contactType": "sales",
  "email": "hello@meonvalleyweb.com",
  "areaServed": "Hampshire",
  "availableLanguage": ["English"],
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

---

### 3. **Services Page Missing Service Catalog Schema**
**Page:** `/services`

**Current:** Lists services visually only

**Missing:** OfferCatalog schema to show all services in structured format

**Recommended:**
```json
{
  "@type": "OfferCatalog",
  "name": "Web Development Services",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "WordPress Development",
        "description": "Custom WordPress themes...",
        "areaServed": "Hampshire, South Coast, UK"
      }
    },
    {
      "@type": "Offer", 
      "itemOffered": {
        "@type": "Service",
        "name": "AstroJS Development",
        "description": "Modern headless websites..."
      }
    }
  ]
}
```

---

### 4. **No FAQ Schema on Any Pages**
**Gap:** FAQ sections exist but lack FAQPage schema

**Impact:** HIGH - FAQ schema enables rich snippets in Google

**Pages that should have FAQ schema:**
- `/services` - Service-specific FAQs
- All location pages - "Do you work with [town] businesses?" etc.
- `/contact` - Contact-related FAQs

**Example:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you work with small businesses in Fareham?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we specialise in helping small businesses..."
      }
    }
  ]
}
```

---

### 5. **No Breadcrumb Schema**
**Gap:** No BreadcrumbList schema anywhere

**Impact:** MEDIUM - Helps with navigation in search results

**Should be on:**
- All location pages: `Home > Web Design Hampshire > Web Design Fareham`
- Service pages: `Home > Services > [Service Name]`
- Blog posts: `Home > Blog > [Post Title]`

**Example:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://meonvalleyweb.com/" },
    { "@type": "ListItem", "position": 2, "name": "Web Design Hampshire", "item": "https://meonvalleyweb.com/web-design-hampshire" },
    { "@type": "ListItem", "position": 3, "name": "Web Design Fareham", "item": "https://meonvalleyweb.com/web-design-fareham" }
  ]
}
```

---

### 6. **No Review/Rating Schema**
**Gap:** Testimonials exist but lack Review schema markup

**Impact:** HIGH - Could enable star ratings in search results

**Pages with testimonials:**
- `/web-design-fareham`
- Other location pages

**Should add:**
```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "reviewBody": "Our new website has transformed how we connect with customers...",
  "publisher": { "@type": "LocalBusiness", "name": "Meon Valley Web" }
}
```

---

### 7. **No WebSite Schema with SearchAction**
**Gap:** No sitelinks searchbox potential

**Impact:** LOW - Nice to have, enables search box in results

**Recommended:**
```json
{
  "@type": "WebSite",
  "url": "https://meonvalleyweb.com",
  "name": "Meon Valley Web",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://meonvalleyweb.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## 🔴 Critical Issues

### Issue: Duplicate LocalBusiness Schema
**Problem:** Every page has the same LocalBusiness schema via MainLayout

**Risk:** Google sees duplicate LocalBusiness entities

**Fix:** Extract LocalBusiness to homepage only, use Organization on other pages

### Issue: Missing OpeningHours on Main LocalBusiness
**Problem:** No business hours in schema

**Impact:** Google may not show "Open now" indicators

**Fix:** Add OpeningHoursSpecification to LocalBusiness

---

## 📊 Priority Recommendations

### High Priority (Implement First)
1. **FAQ Schema** - Add to all location pages and services page
2. **Review Schema** - Add to testimonials on location pages
3. **Breadcrumb Schema** - Add to all pages
4. **Fix LocalBusiness Duplication** - Move to homepage only

### Medium Priority (Implement Next)
5. **ContactPoint Schema** - Add to contact page
6. **Service Catalog** - Add to services page
7. **Opening Hours** - Add to LocalBusiness schema

### Low Priority (Nice to Have)
8. **WebSite with SearchAction** - Homepage only
9. **Article Schema** - Blog posts
10. **HowTo Schema** - If adding tutorials

---

## 💡 Quick Implementation Plan

### Option A: Create SchemaComponents.astro (Like SaintsFC)
Create a reusable component library:
- `SchemaFAQ.astro` - FAQPage schema
- `SchemaBreadcrumb.astro` - BreadcrumbList schema
- `SchemaReview.astro` - Review schema wrapper
- `SchemaLocalBusiness.astro` - Enhanced LocalBusiness

**Benefits:**
- Consistent across all pages
- Easy to maintain
- Type-safe with TypeScript

### Option B: Inline Schema in Each Page
Add schema directly to page frontmatter/props

**Benefits:**
- Page-specific flexibility
- No extra component files

**Tradeoffs:**
- More repetition
- Harder to maintain

---

## 🎯 Expected SEO Impact

| Schema Type | Expected Impact | Difficulty |
|-------------|-----------------|------------|
| FAQ Schema | ⭐⭐⭐⭐⭐ Rich snippets | Easy |
| Review Schema | ⭐⭐⭐⭐⭐ Star ratings | Easy |
| Breadcrumb | ⭐⭐⭐ Better navigation | Easy |
| Service Catalog | ⭐⭐⭐ Service visibility | Medium |
| Opening Hours | ⭐⭐ "Open now" badge | Easy |

---

## 📝 Next Steps

1. **Create `SchemaComponents.astro`** component file
2. **Add FAQ schemas** to 3-5 priority pages first
3. **Implement breadcrumbs** across all pages
4. **Add Review schema** to location page testimonials
5. **Test with Google Rich Results Test** after each addition

---

*Analysis Date: March 27, 2026*
*Site: meonvalleyweb.com*
*Pages Analyzed: 36*
