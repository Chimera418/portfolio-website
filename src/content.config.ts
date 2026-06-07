import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const devlogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/devlog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'devlog': devlogCollection,
};
