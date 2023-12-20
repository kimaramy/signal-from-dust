import {
  monthSchema,
  seasonSchema,
  yearSchema,
  type CollectionKey,
  type MonthKey,
  type SeasonKey,
  type YearKey,
} from '@/lib/model';

import { fetchDailyDataset } from './daily';
import { fetchMonthlyDataset, fetchMonthlyDatasetBySeason } from './monthly';
import { fetchWeekDailyDataset } from './weekdaily';
import { fetchWeeklyDataset } from './weekly';
import { fetchYearlyDataset } from './yearly';

async function fetchDataset(
  collectionKey: CollectionKey,
  yearKey: YearKey,
  monthKey: MonthKey,
  seasonKey: SeasonKey
) {
  const year = yearSchema.getValue(yearKey);
  const month = monthSchema.getValue(monthKey);
  const monthRange = seasonSchema.getMonthRange(seasonKey);

  switch (collectionKey) {
    case 'YEARLY':
      return await fetchYearlyDataset();
    case 'MONTHLY':
      return await fetchMonthlyDataset(year);
    case 'SEASONALLY':
      return await fetchMonthlyDatasetBySeason(year, monthRange);
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
