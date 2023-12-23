import { AppCollection, AppMonth, AppSeason, AppYear } from '@/lib/model';

import { fetchDailyDataset } from './daily';
import { fetchMonthlyDataset, fetchMonthlyDatasetBySeason } from './monthly';
import { fetchWeekDailyDataset } from './weekdaily';
import { fetchWeeklyDataset } from './weekly';
import { fetchYearlyDataset } from './yearly';

async function fetchDataset(
  collectionKey: AppCollection.Key,
  yearKey: AppYear.Key,
  monthKey: AppMonth.Key,
  seasonKey: AppSeason.Key
) {
  const year = AppYear.schema.getValue(yearKey);
  const month = AppMonth.schema.getValue(monthKey);
  const monthRange = AppSeason.schema.getMonthRange(seasonKey);

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
