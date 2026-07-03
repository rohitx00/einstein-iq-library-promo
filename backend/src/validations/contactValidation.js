import { z } from 'zod';

export const contactUpdateSchema = z.object({
  body: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    mapUrl: z.string().optional(),
    workingHours: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
  })
});
