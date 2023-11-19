import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchInitialDataset } from '@/domains';

import type { NextPageProps } from '@/lib/types';
import {
  dataCollectionSchema,
  pickDataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, pickDataNameKey } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import Main from '@/components/Main';
import { pickMonthKey } from '@/components/month';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import { pickSeasonKey } from '@/components/season';
import { pickYearKey } from '@/components/year';

export function generateMetadata({ searchParams }: NextPageProps): Metadata {
  const dataCollectionKey = pickDataCollectionKey(searchParams);
  const dataNameKey = pickDataNameKey(searchParams);
  return {
    title: [
      dataCollectionSchema.display(dataCollectionKey, 'en'),
      dataNameSchema.display(dataNameKey, 'en'),
    ].join(' '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function DynamicQueryPage({ searchParams }: NextPageProps) {
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
          <Dataset
            initialDataCollectionKey={dataCollectionKey}
            initialDataset={{ [dataCollectionKey]: initialDataset }}
          />
        </Suspense>
      </QueryErrorBoundary>
    </Main>
  );
}

export default DynamicQueryPage;
