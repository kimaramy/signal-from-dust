import { type DataCollectionKey } from '@/components/dataCollection';
import { monthSchema, type MonthKey } from '@/components/month';
import { seasonSchema, type SeasonKey } from '@/components/season';
import { yearSchema, type YearKey } from '@/components/year';

import { fetchDailyDataset } from './daily';
import { fetchMonthlyDataset, fetchMonthlyDatasetBySeason } from './monthly';
import { fetchWeekDailyDataset } from './weekdaily';
import { fetchWeeklyDataset } from './weekly';
import { fetchDistinctYearDataset, fetchYearlyDataset } from './yearly';

const fetchInitialDataset = async function fetchInitialDataset(
  dataCollectionKey: DataCollectionKey,
  yearKey: YearKey,
  monthKey: MonthKey,
  seasonKey: SeasonKey
) {
  const year = yearSchema.getValue(yearKey);
  const month = monthSchema.getValue(monthKey);
  const monthRange = seasonSchema.getMonthRange(seasonKey);

  switch (dataCollectionKey) {
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
};

const validateDistinctYears = async (): Promise<string | null> => {
  try {
    const distinctYears = (await fetchDistinctYearDataset())
      .map((dbYearData) => dbYearData.year)
      .filter((year) => !Number.isNaN(Number(year))) as number[] | null;

    if (!distinctYears) {
      return 'Cannot request database years. Please check database table.';
    }

    const isSynced = yearSchema.checkSyncWithDB(distinctYears);

    if (!isSynced) {
      return 'Database has been updated. Please check schema years with database years.';
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchInitialDataset, validateDistinctYears };
