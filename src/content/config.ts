import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
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
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    layout: z.string().optional(),
  }),
});

const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.date().optional(),
  }),
});

const newsroomCollection = defineCollection({
  type: 'content',
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
  }),
});

const blogCollection = defineCollection({
  type: 'content',
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
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  services: servicesCollection,
  pages: pagesCollection,
  legal: legalCollection,
  newsroom: newsroomCollection,
  blog: blogCollection,
};
