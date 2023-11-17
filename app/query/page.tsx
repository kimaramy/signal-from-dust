import { Suspense } from 'react';
import { fetchInitialDataset } from '@/domains';

import type { NextPageProps } from '@/lib/types';
import { pickDataCollectionKey } from '@/components/dataCollection';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import Main from '@/components/Main';
import { pickMonthKey } from '@/components/month';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import { pickSeasonKey } from '@/components/season';
import { pickYearKey } from '@/components/year';

async function QueryPage({ searchParams }: NextPageProps) {
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
    <Main>
      <QueryErrorBoundary>
        <Suspense fallback={<FakeDataset />}>
          <Dataset initialDataset={{ [dataCollectionKey]: initialDataset }} />
        </Suspense>
      </QueryErrorBoundary>
    </Main>
  );
}

export const revalidate = false;

export default QueryPage;
