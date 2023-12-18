import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import type { NextPageProps } from '@/lib/router';
import {
  dataCollectionSchema,
  parseDataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, parseDataNameKey } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Floating from '@/components/Floating';
import { parseMonthKey } from '@/components/month';
import { parseSeasonKey } from '@/components/season';
import { parseYearKey } from '@/components/year';

const fetchCachedDataset = cache(fetchDataset);

export function generateMetadata({
  params,
  searchParams,
}: NextPageProps): Metadata {
  const collectionKey = parseDataCollectionKey(params);
  const dataNameKey = parseDataNameKey(searchParams);
  return {
    title: [
      dataCollectionSchema.display(collectionKey, 'en'),
      dataNameSchema.display(dataNameKey, 'en'),
    ].join(' '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function DynamicDatasetPage({ params, searchParams }: NextPageProps) {
  const collectionKey = parseDataCollectionKey(params);

  const yearKey = parseYearKey(searchParams);

  const monthKey = parseMonthKey(searchParams);

  const seasonKey = parseSeasonKey(searchParams);

  const datasetKeys = [collectionKey, yearKey, monthKey, seasonKey] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  return (
    <>
      <Dataset
        initialCollectionKey={collectionKey}
        initialDataset={{ [collectionKey]: initialDataset }}
      />
      <Floating right={2} bottom={3}>
        <DatasetDownloadButton
          dataset={initialDataset}
          datasetKeys={datasetKeys}
        />
      </Floating>
    </>
  );
}

export default DynamicDatasetPage;
