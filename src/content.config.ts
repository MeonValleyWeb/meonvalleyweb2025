import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolioCollection = defineCollection({
  loader: glob({ pattern: 'portfolio/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technology: z.string(),
    category: z.string(),
    client: z.string(),
    status: z.enum(['Live', 'In Development', 'Experimental']),
    featured: z.boolean().default(false),
    order: z.number(),
    timeline: z.string().optional(),
    dataScale: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    body: z.string().optional(),
  }),
});

// Services collection - no files currently
// const servicesCollection = defineCollection({
//   loader: glob({ pattern: '**/services/**/*.md', base: './src/content' }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     icon: z.string().optional(),
//     featured: z.boolean().default(false),
//     order: z.number().optional(),
//   }),
// });

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/pages/**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    layout: z.string().optional(),
  }),
});

const legalCollection = defineCollection({
  loader: glob({ pattern: 'legal/_*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

const newsroomCollection = defineCollection({
  loader: glob({ pattern: '**/newsroom/**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    body: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/blog/**/*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    body: z.string().optional(),
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  pages: pagesCollection,
  legal: legalCollection,
  newsroom: newsroomCollection,
  blog: blogCollection,
};
