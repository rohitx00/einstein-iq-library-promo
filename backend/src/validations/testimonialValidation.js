import { z } from 'zod';

export const testimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    content: z.string().min(1, 'Content is required'),
    rating: z.number().int().min(1).max(5),
    displayOrder: z.number().int().optional(),
  })
});

export const testimonialUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    role: z.string().min(1, 'Role is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    rating: z.number().int().min(1).max(5).optional(),
    displayOrder: z.number().int().optional(),
  })
});
