import { z } from 'zod';

export const gallerySchema = z.object({
  body: z.object({
    caption: z.string().optional(),
  })
});
