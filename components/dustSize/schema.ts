import { z } from 'zod';

export const dustSizeSchema = z.enum(['sm', 'lg']);

export const dustSizeMap = Object.freeze({
  default: dustSizeSchema.Enum['lg'],
  ...dustSizeSchema.Enum,
});

export const dustSizeSet = Object.freeze([
  ...new Set(Object.values(dustSizeMap)),
]);

export const defaultDustSize = dustSizeMap.default;

export type DustSize = z.infer<typeof dustSizeSchema>;
