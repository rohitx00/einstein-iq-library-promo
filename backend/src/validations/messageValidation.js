import { z } from 'zod';

export const messageSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    requestType: z.enum(['visit', 'call', 'general']).optional(),
    message: z.string().min(1, 'Message is required'),
    plan: z.string().optional(),
  })
});
