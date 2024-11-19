import { z, defineCollection } from "astro:content";

const experienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    position: z.string(),
    location: z.string(),
    dates: z.string(),
  }),
});

const techCollection = defineCollection({
    type: "content"
  });

export const collections = {
  experience: experienceCollection,
  tech: techCollection
};
