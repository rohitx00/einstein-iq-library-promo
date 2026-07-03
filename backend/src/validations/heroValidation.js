import { z } from 'zod';

export const heroUpdateSchema = z.object({
  body: z.object({
    headline: z.string().min(1, 'Headline is required').optional(),
    subtitle: z.string().min(1, 'Subtitle is required').optional(),
    primaryCtaText: z.string().optional(),
    primaryCtaLink: z.string().optional(),
    secondaryCtaText: z.string().optional(),
    secondaryCtaLink: z.string().optional(),
  })
});
