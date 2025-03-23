// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Define your collection(s)
const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string().transform((str) => new Date(str)), // Pour convertir en Date
    description: z.string(),
    author: z.object({
      name: z.string(),
      url: z.string(),
    }),
    categories: z.array(z.string()),
  }),
});

// 3. Export un objet `collections`
export const collections = { posts };
