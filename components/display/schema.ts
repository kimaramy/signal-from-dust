import { z } from 'zod';

export const displaySchema = z.enum(['3d', '2d']);

export const displayMap = Object.freeze({
  default: displaySchema.Enum['2d'],
  ...displaySchema.Enum,
});

export const displaySet = Object.freeze([
  ...new Set(Object.values(displayMap)),
]);

export type Display = z.infer<typeof displaySchema>;
