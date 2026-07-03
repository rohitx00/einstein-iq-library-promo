import { z } from 'zod';

export const facilitySchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    icon: z.string().min(1, 'Icon name is required'),
    displayOrder: z.number().int().optional(),
  })
});

export const facilityUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    icon: z.string().min(1, 'Icon name is required').optional(),
    displayOrder: z.number().int().optional(),
  })
});
