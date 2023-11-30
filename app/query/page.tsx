import { Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchInitialDataset } from '@/domains';

import type { NextPageProps } from '@/lib/types';
import {
  dataCollectionSchema,
  parseDataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, parseDataNameKey } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import Main from '@/components/Main';
import { parseMonthKey } from '@/components/month';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import { parseSeasonKey } from '@/components/season';
import { parseYearKey } from '@/components/year';

export function generateMetadata({ searchParams }: NextPageProps): Metadata {
  const dataCollectionKey = parseDataCollectionKey(searchParams);
  const dataNameKey = parseDataNameKey(searchParams);
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
  const dataCollectionKey = parseDataCollectionKey(searchParams);

  const yearKey = parseYearKey(searchParams);

  const monthKey = parseMonthKey(searchParams);

  const seasonKey = parseSeasonKey(searchParams);

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
