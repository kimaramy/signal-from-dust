import { z } from 'zod';

import { getEnumKeyByValue, stringUnionToArray } from '@/lib/ts-utils';

export enum Month {
  'All' = 0,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
}

export type MonthKey = keyof typeof Month;

export const monthKeySchema = z.enum(
  stringUnionToArray<MonthKey>()(
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  )
);

export const monthKeyMap = Object.freeze({
  Default: monthKeySchema.Enum.All,
  ...monthKeySchema.Enum,
});

export const monthKeySet = Object.freeze([
  ...new Set(Object.values(monthKeyMap)),
]);

export const getMonthValue = (monthKey: MonthKey) => Month[monthKey];

export const getMonthKey = (value: Month) =>
  getEnumKeyByValue<typeof Month, Month, MonthKey>(Month, value);
