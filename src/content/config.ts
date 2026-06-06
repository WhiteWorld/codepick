import { defineCollection, z } from 'astro:content';

const contentGovernance = {
  pillar: z.enum(['tools', 'plans', 'compare', 'workflow', 'stack', 'market']).optional(),
  content_status: z.enum(['keep', 'rewrite', 'merge', 'archive']).optional(),
  locale_strategy: z.enum(['mirrored', 'zh_only', 'en_only', 'planned_en', 'planned_zh']).optional(),
};

const compare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    ...contentGovernance,
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
    ...contentGovernance,
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
    ...contentGovernance,
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
    ...contentGovernance,
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
    ...contentGovernance,
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
    ...contentGovernance,
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
