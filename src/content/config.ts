import { z, defineCollection } from "astro:content";

export const collections = {
  experience: defineCollection({
    type: "content",
    schema: z.object({
      company: z.string(),
      position: z.string(),
      location: z.string(),
      dates: z.string(),
    }),
  }),
};
