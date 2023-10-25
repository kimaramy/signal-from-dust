import { z } from 'zod';

import * as tsUtils from '@/lib/ts-utils';

export enum Year {
  'All' = 0,
  'TwentyFifteen' = 2015,
  'TwentySixteen',
  'TwentySeventeen',
  'TwentyEighteen',
  'TwentyNineteen',
  'TwentyTwenty',
  'TwentyTwentyOne',
  'TwentyTwentyTwo',
}

export const yearKeys = Object.freeze(tsUtils.getAllEnumKeys(Year));

export const yearValues = Object.freeze(tsUtils.getAllEnumValues(Year));

export type YearKey = (typeof yearKeys)[number];

export const yearKeySchema = z
  .enum(
    tsUtils.stringUnionToArray<YearKey>()(
      'All',
      'TwentyFifteen',
      'TwentySixteen',
      'TwentySeventeen',
      'TwentyEighteen',
      'TwentyNineteen',
      'TwentyTwenty',
      'TwentyTwentyOne',
      'TwentyTwentyTwo'
    )
  )
  .default('All');

export const defaultYearKey = yearKeySchema._def.defaultValue();

export const defaultYearValue = Year[defaultYearKey];

export const getYearValue = (yearKey: YearKey) => Year[yearKey];

export const getYearKey = (value: Year) =>
  tsUtils.getEnumKeyByValue(Year, value);
