import { cache, Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchInitialDataset } from '@/domains';

import type { NextPageProps } from '@/lib/router';
import {
  dataCollectionSchema,
  parseDataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, parseDataNameKey } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import Main from '@/components/Main';
import { parseMonthKey } from '@/components/month';
import { parseSeasonKey } from '@/components/season';
import { parseYearKey } from '@/components/year';

const fetchInitialCachedDataset = cache(fetchInitialDataset);

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

  const initialDataset = await fetchInitialCachedDataset(
    dataCollectionKey,
    yearKey,
    monthKey,
    seasonKey
  );

  return (
    <Main>
      {/* Dataset 내부 클라이언트 사이드 쿼리 요청 대비 Suspense */}
      <Suspense fallback={<FakeDataset />}>
        <Dataset
          initialDataCollectionKey={dataCollectionKey}
          initialDataset={{ [dataCollectionKey]: initialDataset }}
        />
      </Suspense>
    </Main>
  );
}

export default DynamicQueryPage;
