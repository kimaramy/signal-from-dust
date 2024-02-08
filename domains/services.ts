import {
  CollectionUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';

import { fetchDailyDataset } from './daily';
import { fetchMonthlyDataset, fetchMonthlyDatasetBySeason } from './monthly';
import { fetchWeekDailyDataset } from './weekdaily';
import { fetchWeeklyDataset } from './weekly';
import { fetchYearlyDataset } from './yearly';

async function fetchDataset(
  collectionKey: CollectionUtils.Key,
  yearKey: YearUtils.Key,
  monthKey: MonthUtils.Key,
  seasonKey: SeasonUtils.Key
) {
  const year = YearUtils.schema.getValue(yearKey);
  const month = MonthUtils.schema.getValue(monthKey);
  const monthRange = SeasonUtils.schema.getMonthRange(seasonKey);

  switch (collectionKey) {
    case 'YEARLY':
      return await fetchYearlyDataset();
    case 'MONTHLY':
      return await fetchMonthlyDataset(year);
    case 'SEASONALLY':
      return await fetchMonthlyDatasetBySeason(year, monthRange, seasonKey);
    case 'WEEKLY':
      return await fetchWeeklyDataset(year);
    case 'WEEKDAILY':
      return await fetchWeekDailyDataset(month);
    case 'DAILY':
    default:
      return await fetchDailyDataset(month);
  }
}

export { fetchDataset };
