import { z } from 'zod';

export const postgrestErrorSchema = z.object({
  message: z.string(),
  details: z.string(),
  hint: z.string(),
  code: z.string(),
});
