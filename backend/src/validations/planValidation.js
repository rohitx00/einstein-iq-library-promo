import { z } from 'zod';

export const planSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.string().min(1, 'Price is required'),
    duration: z.string().min(1, 'Duration is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    isPopular: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
  })
});

export const planUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    price: z.string().min(1, 'Price is required').optional(),
    duration: z.string().min(1, 'Duration is required').optional(),
    features: z.array(z.string()).min(1, 'At least one feature is required').optional(),
    isPopular: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
  })
});
