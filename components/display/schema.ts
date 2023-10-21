import { z } from 'zod';

export const displaySchema = z.enum(['3d', '2d']);

export const displayMap = Object.freeze({
  default: displaySchema.Enum['3d'],
  '3d': displaySchema.Enum['3d'],
  '2d': displaySchema.Enum['2d'],
});

export const displaySet = [...new Set(Object.values(displayMap))];

export type Display = z.infer<typeof displaySchema>;
