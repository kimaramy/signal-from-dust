import { z } from "zod"

export const SupabaseErrorSchema = z.object({
  status: z.number(),
  statusText: z.string(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.string(),
    hint: z.string(),
  }),
  data: z.null(),
  count: z.null(),
})

export type SupabaseError = z.infer<typeof SupabaseErrorSchema>
