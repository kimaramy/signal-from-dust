import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import * as Model from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { parseCollectionKey } from '@/components/collection';
import { parseDataNameKey } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Floating from '@/components/Floating';
import { parseMonthKey } from '@/components/month';
import { parseSeasonKey } from '@/components/season';
import { parseYearKey } from '@/components/year';

const fetchCachedDataset = cache(fetchDataset);

export function generateMetadata({ searchParams }: NextPageProps): Metadata {
  const collection = Model.collectionSchema.display(
    parseCollectionKey(searchParams),
    'en'
  );
  const dataName = Model.dataNameSchema.display(
    parseDataNameKey(searchParams),
    'en'
  );
  const year = Model.yearSchema.display(
    parseYearKey(searchParams),
    'short',
    'en'
  );
  const season = Model.seasonSchema.display(parseSeasonKey(searchParams), 'en');
  const month = Model.monthSchema.display(
    parseMonthKey(searchParams),
    'short',
    'en'
  );
  return {
    title: [
      collection,
      [
        'Dust',
        '(',
        [dataName, season !== 'Every season' ? season : month, year].join(', '),
        ')',
      ].join(''),
    ].join(' '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function DynamicDatasetPage({ searchParams }: NextPageProps) {
  const collectionKey = parseCollectionKey(searchParams);

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
