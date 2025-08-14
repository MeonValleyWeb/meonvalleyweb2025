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
    title: z.string(),
    description: z.string(),
    layout: z.string().optional(),
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  services: servicesCollection,
  pages: pagesCollection,
};