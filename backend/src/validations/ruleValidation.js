import { z } from 'zod';

export const ruleSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    icon: z.string().optional(),
    displayOrder: z.number().int().optional(),
  })
});

export const ruleUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    icon: z.string().optional(),
    displayOrder: z.number().int().optional(),
  })
});
