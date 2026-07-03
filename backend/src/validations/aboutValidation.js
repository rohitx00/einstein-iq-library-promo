import { z } from 'zod';

export const aboutUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    mission: z.string().min(1, 'Mission is required').optional(),
    vision: z.string().min(1, 'Vision is required').optional(),
  })
});
