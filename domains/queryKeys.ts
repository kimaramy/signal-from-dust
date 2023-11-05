import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { dailyQueryKeys } from './daily';
import { monthlyQueryKeys } from './monthly';
import { weekDailyQueryKeys } from './weekdaily';
import { weeklyQueryKeys } from './weekly';
import { yearlyQueryKeys } from './yearly';

export default mergeQueryKeys(
  dailyQueryKeys,
  weekDailyQueryKeys,
  weeklyQueryKeys,
  monthlyQueryKeys,
  yearlyQueryKeys
);
