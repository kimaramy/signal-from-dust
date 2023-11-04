import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { dailyDataKeys } from './daily';
import { monthlyQueryKeys } from './monthly';
import { weekDailyDataKeys } from './weekdaily';
import { weeklyDataKeys } from './weekly';
import { yearlyDataKeys } from './yearly';

export default mergeQueryKeys(
  dailyDataKeys,
  weekDailyDataKeys,
  weeklyDataKeys,
  monthlyQueryKeys,
  yearlyDataKeys
);
