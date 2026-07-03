import { z } from 'zod';

export const faqSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    displayOrder: z.number().int().optional(),
  })
});

export const faqUpdateSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'Question is required').optional(),
    answer: z.string().min(1, 'Answer is required').optional(),
    displayOrder: z.number().int().optional(),
  })
});
