import { z } from 'zod';

export const planSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.string().min(1, 'Price is required'),
    duration: z.string().min(1, 'Duration is required'),
    features: z.string().min(1, 'Features are required'),
    isFeatured: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
  })
});

export const planUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    price: z.string().min(1, 'Price is required').optional(),
    duration: z.string().min(1, 'Duration is required').optional(),
    features: z.string().min(1, 'Features are required').optional(),
    isFeatured: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
  })
});
