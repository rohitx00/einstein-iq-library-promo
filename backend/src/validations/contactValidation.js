import { z } from 'zod';

export const contactUpdateSchema = z.object({
  body: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    mapEmbedUrl: z.string().optional(),
  })
});
