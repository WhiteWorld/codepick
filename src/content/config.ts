import { defineCollection, z } from 'astro:content';

const compare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated_at: z.string().optional(),
    article_type: z.enum(['howto', 'review', 'explainer']),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    faq: z.array(faqItem).optional(),
  }),
});

// English content collections (same schema)
const compareEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const guidesEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated_at: z.string().optional(),
    article_type: z.enum(['howto', 'review', 'explainer']),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    faq: z.array(faqItem).optional(),
  }),
});

const practices = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated_at: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const practicesEn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated_at: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  compare,
  guides,
  practices,
  'compare-en': compareEn,
  'guides-en': guidesEn,
  'practices-en': practicesEn,
};
