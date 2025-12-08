# Content Collections Deprecation Fix

## Issue
Astro was showing a deprecation warning:
```
Auto-generating collections for folders in "src/content/" that are not defined as collections.
This is deprecated, so you should define these collections yourself in "src/content.config.ts".
The following collections have been auto-generated: legal
```

## Solution Implemented

### 1. Added Legal Collection Definition
Updated `src/content/config.ts` to explicitly define the `legal` collection:

```typescript
const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  services: servicesCollection,
  pages: pagesCollection,
  legal: legalCollection, // Added
};
```

### 2. Excluded Legal Files from Collection
The legal markdown files (`privacy-policy.md`, `improved-terms.md`, `terms-of-service.md`) are read directly using `readFileSync` in the page components, not through Astro's content collection system.

To prevent them from being processed as collection entries, renamed them with underscore prefix:
- `README.md` → `_README.md`
- `privacy-policy.md` → `_privacy-policy.md`
- `improved-terms.md` → `_improved-terms.md`
- `terms-of-service.md` → `_terms-of-service.md`

Files starting with underscore are automatically ignored by Astro's content collections.

### 3. Updated File References
Updated the file paths in pages that read these files:

**src/pages/privacy.astro:**
```typescript
const privacyContent = readFileSync('src/content/legal/_privacy-policy.md', 'utf-8');
```

**src/pages/terms.astro:**
```typescript
const termsContent = readFileSync('src/content/legal/_improved-terms.md', 'utf-8');
```

## Result
✅ Deprecation warning eliminated
✅ Build completes successfully
✅ All pages render correctly
✅ Legal documents still accessible at `/privacy` and `/terms`

## Build Output
```
11:31:57 [content] Syncing content
11:31:57 [content] Content config changed
11:31:57 [content] Clearing content store
11:31:57 [WARN] [glob-loader] No files found matching "**/*.md,!**/_*/**/*.md,!**/_*.md" in directory "src/content/services"
11:31:57 [WARN] [glob-loader] No files found matching "**/*.md,!**/_*/**/*.md,!**/_*.md" in directory "src/content/legal"
11:31:57 [content] Synced content
...
11:32:07 [build] Complete!
```

The remaining warnings about empty directories are informational only and don't affect functionality.

## Notes
- The legal collection is now properly defined but currently empty (all files prefixed with `_`)
- If you want to use the content collection system for legal documents in the future, remove the underscore prefix and add proper frontmatter
- The current approach (direct file reading) works well for these static legal documents
