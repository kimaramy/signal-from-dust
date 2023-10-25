import type { TableKeys } from '@/domains';
import type { PascalCase } from 'type-fest';
import { z } from 'zod';

import { stringUnionToArray } from '@/lib/ts-utils';

export const collectionSchema = z.enum([
  ...stringUnionToArray<PascalCase<TableKeys>>()(
    'Yearly',
    'Monthly',
    'Weekly',
    'Weekdaily',
    'Daily'
  ),
  'Seasonally',
]);

export const collectionMap = Object.freeze({
  default: collectionSchema.Enum.Yearly,
  ...collectionSchema.Enum,
});

export const collectionSet = Object.freeze([
  ...new Set(Object.values(collectionMap)),
]);

export type Collection = z.infer<typeof collectionSchema>;
