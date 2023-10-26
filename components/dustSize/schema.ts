import { z } from 'zod';

export const dustSizeSchema = z.enum(['sm', 'lg']);

export const dustSizeMap = Object.freeze({
  default: dustSizeSchema.Enum['sm'],
  ...dustSizeSchema.Enum,
});

export const dustSizeSet = Object.freeze([
  ...new Set(Object.values(dustSizeMap)),
]);

export type DustSize = z.infer<typeof dustSizeSchema>;
