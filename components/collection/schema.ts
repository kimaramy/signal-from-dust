import type { TableKeys } from '@/domains';
import type { PascalCase } from 'type-fest';
import { z } from 'zod';

import { stringUnionToArray } from '@/lib/ts-utils';

import { toOrderedBy } from './utils';

export type Collection = PascalCase<TableKeys> | 'Seasonally';

export const collections = Object.freeze(
  toOrderedBy(
    stringUnionToArray<Collection>()(
      'Yearly',
      'Seasonally',
      'Monthly',
      'Weekly',
      'Weekdaily',
      'Daily'
    ),
    ['Yearly', 'Seasonally', 'Monthly', 'Weekly', 'Weekdaily', 'Daily']
  )
);

export const collectionSchema = z
  .enum([collections[0], ...collections.slice(1)])
  .default('Yearly');

export const defaultCollection = collectionSchema._def.defaultValue();
