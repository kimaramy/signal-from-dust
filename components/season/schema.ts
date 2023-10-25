import { z } from 'zod';

export const seasonSchema = z.enum([
  'All',
  'Spring',
  'Summer',
  'Fall',
  'Winter',
]);

export const seasonMap = Object.freeze({
  Default: seasonSchema.Enum.All,
  ...seasonSchema.Enum,
});

export const seasonSet = Object.freeze([...new Set(Object.values(seasonMap))]);

export type Season = z.infer<typeof seasonSchema>;
