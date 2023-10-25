import { z } from 'zod';

import { getEnumKeyByValue, stringUnionToArray } from '@/lib/ts-utils';

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

export type YearKey = keyof typeof Year;

export const yearKeySchema = z.enum(
  stringUnionToArray<YearKey>()(
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
);

export const yearKeyMap = Object.freeze({
  Default: yearKeySchema.enum.All,
  ...yearKeySchema.enum,
});

export const yearKeySet = Object.freeze([
  ...new Set(Object.values(yearKeyMap)),
]);

export const getYearValue = (yearKey: YearKey) => Year[yearKey];

export const getYearKey = (value: Year) =>
  getEnumKeyByValue<typeof Year, Year, YearKey>(Year, value);
