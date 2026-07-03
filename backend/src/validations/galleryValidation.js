import { z } from 'zod';

export const gallerySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
  })
});
