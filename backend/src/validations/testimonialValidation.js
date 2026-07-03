import { z } from 'zod';

export const testimonialSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    review: z.string().min(1, 'Review is required'),
    rating: z.coerce.number().int().min(1).max(5),
  })
});

export const testimonialUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    occupation: z.string().min(1, 'Occupation is required').optional(),
    review: z.string().min(1, 'Review is required').optional(),
    rating: z.coerce.number().int().min(1).max(5).optional(),
  })
});
