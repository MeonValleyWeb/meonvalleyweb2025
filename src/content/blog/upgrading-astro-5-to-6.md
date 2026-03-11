---
title: "Upgrading from Astro 5 to Astro 6: Common Pitfalls and Solutions"
description: "A detailed guide to the breaking changes in Astro 6, including content collections migration, slug handling, and markdown rendering issues."
date: 2026-03-11
author: "Meon Valley Web"
category: "Astro Development"
featured: true
image: "/astro-logo-light-gradient.png"
imageAlt: "Astro upgrade migration guide"
tags: ["astro", "migration", "web-development", "content-collections"]
---

Upgrading to Astro 6 is a significant step forward for your static site generation, but the content collections API has fundamentally changed. If you've recently upgraded and found yourself staring at mysterious `undefined` slugs and `entry.render is not a function` errors, you're not alone. This guide walks through the major breaking changes and how to fix them.

## The Big Picture: What Changed

Astro 6 introduced a new content collections system that moves away from the old file-based approach. The core issue: **the content API changed dramatically**, and old patterns simply don't work anymore.

### Key Breaking Changes

1. **Content config location moved** - from `src/content/config.ts` to `src/content.config.ts`
2. **All collections now require explicit loaders** - no more implicit file discovery
3. **The `slug` property no longer auto-generates** - you must extract it from `entry.id`
4. **Entry rendering changed** - `entry.render()` doesn't exist, you need manual markdown rendering

## Issue 1: Content Config Location

### Astro 5 (Old Way)
```
src/content/config.ts          ✗ Doesn't work in Astro 6
```

### Astro 6 (New Way)
```
src/content.config.ts          ✓ Correct location
```

This seems simple, but many developers move the file to the wrong location when upgrading. If you see this error:

```
[LegacyContentConfigError] Found legacy content config file in "src/content/config.ts".
Please move this file to "src/content.config.ts"
```

Move your configuration file to the root `src/` directory instead of inside the `src/content/` folder.

## Issue 2: Missing Loaders on Collections

### Astro 5 (Old Way)
```javascript
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
```

### Astro 6 (New Way)
```javascript
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
```

Every collection now requires an explicit `loader`. This tells Astro where to find your content files. The most common is `glob()`, which uses file patterns to discover markdown files.

## Issue 3: The Slug Problem (The Most Common Error)

This is where most developers get stuck. In Astro 5, entries had an auto-generated `slug` property. In Astro 6, they don't.

### The Error You'll See
```
Missing parameter: slug
  at getParameter (routing/generator.js:18:13)
```

This happens when your dynamic route uses `entry.slug`, but that property is `undefined`.

### Astro 5 (Old Way)
```javascript
export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => ({
    params: { slug: entry.slug },  // ✗ entry.slug is undefined in v6
    props: { entry },
  }));
}
```

### Astro 6 (New Way)
```javascript
export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => {
    // entry.id is like 'blog/my-post' or 'blog/folder/my-post'
    const slug = entry.id.split('/').pop()?.replace(/\.md$/, '') || '';
    return {
      params: { slug },
      props: { entry },
    };
  });
}
```

In Astro 6, entries have an `id` property that contains the collection-relative path. For a file at `src/content/blog/my-post.md`, `entry.id` will be `blog/my-post`. You need to extract just the filename portion.

### Also Fix Your Blog Listing Page

Don't forget to update places where you generate links to posts:

```javascript
// Astro 5 (Old)
href={`/blog/${post.slug}`}  // ✗ undefined

// Astro 6 (New)
href={`/blog/${post.id.split('/').pop()?.replace(/\.md$/, '')}`}  // ✓ correct
```

## Issue 4: Entry Rendering Changed

### The Error You'll See
```
TypeError: entry.render is not a function
```

In Astro 5, you could call `entry.render()` to get a Content component. This no longer exists.

### Astro 5 (Old Way)
```javascript
const { entry } = Astro.props;
const { Content } = await entry.render();  // ✗ Doesn't exist in v6

// In template
<Content />
```

### Astro 6 Solution: Manual Markdown Rendering

First, update your schema to include the body:

```javascript
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    body: z.string().optional(),  // Add this
  }),
});
```

Then render it manually using `marked`:

```javascript
import { marked } from 'marked';

const { entry } = Astro.props;
const htmlContent = entry.body ? await marked(entry.body) : '';
```

In your template:

```astro
<Fragment set:html={htmlContent} />
```

The complete pattern:

```astro
---
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => {
    const slug = entry.id.split('/').pop()?.replace(/\.md$/, '') || '';
    return { params: { slug }, props: { entry } };
  });
}

const { entry } = Astro.props;
const htmlContent = entry.body ? await marked(entry.body) : '';
---

<div class="content">
  <Fragment set:html={htmlContent} />
</div>
```

## Issue 5: Glob Patterns Gotchas

When defining your loaders, the pattern matching is more strict. Common mistakes:

### Pattern Too Broad
```javascript
// ✗ This won't work - too permissive
loader: glob({ pattern: '*.md', base: './src/content' })

// ✓ Correct - matches files in subdirectories
loader: glob({ pattern: '**/blog/**/*.md', base: './src/content' })
```

### Base Path Issues
```javascript
// ✗ Wrong - relative to project root
loader: glob({ pattern: 'blog/*.md', base: 'src/content' })

// ✓ Correct - relative to project root with ./
loader: glob({ pattern: 'blog/*.md', base: './src/content' })
```

### Common Pattern Examples
```javascript
// Single directory
glob({ pattern: 'blog/*.md', base: './src/content' })

// Nested directories
glob({ pattern: '**/blog/**/*.md', base: './src/content' })

// Exclude underscore files
glob({ pattern: '[!._]*.md', base: './src/content' })
```

## Complete Before and After Example

### Full Astro 5 Setup
```javascript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
// src/pages/blog/[slug].astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<h1>{entry.data.title}</h1>
<p>{entry.data.description}</p>
<Content />
```

### Full Astro 6 Setup
```javascript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/blog/**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    body: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
// src/pages/blog/[slug].astro
---
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => {
    const slug = entry.id.split('/').pop()?.replace(/\.md$/, '') || '';
    return {
      params: { slug },
      props: { entry },
    };
  });
}

const { entry } = Astro.props;
const htmlContent = entry.body ? await marked(entry.body) : '';
---

<h1>{entry.data.title}</h1>
<p>{entry.data.description}</p>
<Fragment set:html={htmlContent} />
```

## Upgrade Checklist

- [ ] Move `src/content/config.ts` to `src/content.config.ts`
- [ ] Add `loader: glob(...)` to all collection definitions
- [ ] Add `body: z.string().optional()` to all collection schemas
- [ ] Replace `entry.slug` with `entry.id.split('/').pop()?.replace(/\.md$/, '')`
- [ ] Replace `entry.render()` with manual `marked()` rendering
- [ ] Update all blog/post listing pages to use the new slug format
- [ ] Test all dynamic routes to ensure links work correctly
- [ ] Run your build and verify no `Missing parameter` or `render is not a function` errors

## Pro Tips

### Create a Helper Function

Don't repeat the slug extraction everywhere. Create a utility:

```javascript
// src/utils/slugs.ts
export function getSlugFromId(id: string): string {
  return id.split('/').pop()?.replace(/\.md$/, '') || '';
}
```

Then use it:

```javascript
const slug = getSlugFromId(entry.id);
```

### Cache Rendered HTML

If you're rendering many posts, consider caching the rendered HTML:

```javascript
const htmlCache = new Map<string, string>();

async function renderMarkdown(body: string | undefined): Promise<string> {
  if (!body) return '';
  if (htmlCache.has(body)) return htmlCache.get(body)!;

  const html = await marked(body);
  htmlCache.set(body, html);
  return html;
}
```

## Final Thoughts

Astro 6's changes might feel breaking at first, but they actually make the content system more explicit and easier to reason about. You're no longer relying on magic slug generation—you control exactly how content is discovered and organized.

The transition is worth it. Once you've updated your collections, you'll find the new system is actually cleaner and more maintainable. The investment in this upgrade pays dividends in clarity and control.

Good luck with your migration!
