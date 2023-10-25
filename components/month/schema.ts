import { z } from 'zod';

import * as tsUtils from '@/lib/ts-utils';

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

export const monthKeys = Object.freeze(tsUtils.getAllEnumKeys(Month));

export const monthValues = Object.freeze(tsUtils.getAllEnumValues(Month));

export type MonthKey = (typeof monthKeys)[number];

export const monthKeySchema = z
  .enum(
    tsUtils.stringUnionToArray<MonthKey>()(
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
  )
  .default('All');

export const defaultMonthKey = monthKeySchema._def.defaultValue();

export const defaultMonthValue = Month[defaultMonthKey];

export const getMonthValue = (monthKey: MonthKey) => Month[monthKey];

export const getMonthKey = (value: Month) =>
  tsUtils.getEnumKeyByValue(Month, value);
