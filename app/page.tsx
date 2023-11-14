import { Suspense } from 'react';
import * as Domains from '@/domains';

import type { NextPageProps } from '@/lib/types';
import {
  pickDataCollectionKey,
  type DataCollectionKey,
} from '@/components/dataCollection';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import FloatingButtons from '@/components/FloatingButtons';
import Main from '@/components/Main';
import { monthSchema, pickMonthKey, type MonthKey } from '@/components/month';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import {
  pickSeasonKey,
  seasonSchema,
  type SeasonKey,
} from '@/components/season';
import { SettingsDialog } from '@/components/settings';
import { pickYearKey, yearSchema, type YearKey } from '@/components/year';

async function fetchInitialDataset(
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
      return await Domains.fetchYearlyDataset();
    case 'MONTHLY':
      return await Domains.fetchMonthlyDataset(year);
    case 'SEASONALLY':
      return await Domains.fetchMonthlyDatasetBySeason(year, monthRange);
    case 'WEEKLY':
      return await Domains.fetchWeeklyDataset(year);
    case 'WEEKDAILY':
      return await Domains.fetchWeekDailyDataset(month);
    case 'DAILY':
    default:
      return await Domains.fetchDailyDataset(month);
  }
}

async function IndexPage({ searchParams }: NextPageProps) {
  const dataCollectionKey = pickDataCollectionKey(searchParams);

  const yearKey = pickYearKey(searchParams);

  const monthKey = pickMonthKey(searchParams);

  const seasonKey = pickSeasonKey(searchParams);

  const initialDataset = await fetchInitialDataset(
    dataCollectionKey,
    yearKey,
    monthKey,
    seasonKey
  );

  return (
    <>
      <Main>
        <QueryErrorBoundary>
          <Suspense fallback={<FakeDataset />}>
            <Dataset initialDataset={{ [dataCollectionKey]: initialDataset }} />
          </Suspense>
        </QueryErrorBoundary>
      </Main>
      <FloatingButtons />
      <SettingsDialog />
    </>
  );
}

export const revalidate = false;

export default IndexPage;
