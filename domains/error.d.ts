import { z } from 'zod';

export const SupabaseErrorSchema = z.object({
  status: z.number(),
  statusText: z.string(),
  error: z.object({
    code: z.string().nullable(),
    message: z.string().nullable(),
    details: z.string().nullable(),
    hint: z.string().nullable(),
  }),
  data: z.null(),
  count: z.null(),
});

export type SupabaseError = z.infer<typeof SupabaseErrorSchema>;
