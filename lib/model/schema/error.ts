import { z } from 'zod';

const postgrestErrorSchema = z.object({
  message: z.string(),
  details: z.string(),
  hint: z.string(),
  code: z.string(),
});

class ErrorSchema {
  static isPostgrestError(error: unknown) {
    return postgrestErrorSchema.safeParse(error).success;
  }
}

export { ErrorSchema };
