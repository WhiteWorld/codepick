import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const contentGovernance = {
  pillar: z.enum(['tools', 'plans', 'compare', 'workflow', 'stack', 'market']).optional(),
  content_status: z.enum(['keep', 'rewrite', 'merge', 'archive']).optional(),
  locale_strategy: z.enum(['mirrored', 'zh_only', 'en_only', 'planned_en', 'planned_zh']).optional(),
};

const compare = defineCollection({
  loader: glob({ pattern: '**/*.md*', base: 'src/content/compare' }),
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
  loader: glob({ pattern: '**/*.md*', base: 'src/content/guides' }),
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
  loader: glob({ pattern: '**/*.md*', base: 'src/content/compare-en' }),
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
  loader: glob({ pattern: '**/*.md*', base: 'src/content/guides-en' }),
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
  loader: glob({ pattern: '**/*.md*', base: 'src/content/practices' }),
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
  loader: glob({ pattern: '**/*.md*', base: 'src/content/practices-en' }),
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
