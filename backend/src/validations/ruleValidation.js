import { z } from 'zod';

export const ruleSchema = z.object({
  body: z.object({
    rule: z.string().min(1, 'Rule text is required'),
    displayOrder: z.number().int().optional(),
  })
});

export const ruleUpdateSchema = z.object({
  body: z.object({
    rule: z.string().min(1, 'Rule text is required').optional(),
    displayOrder: z.number().int().optional(),
  })
});
