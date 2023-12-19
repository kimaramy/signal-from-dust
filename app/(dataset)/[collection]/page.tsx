import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import type { NextStaticPageProps } from '@/lib/router';
import { collectionSchema } from '@/components/collection';
import { dataNameSchema } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Floating from '@/components/Floating';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { yearSchema } from '@/components/year';

const fetchCachedDataset = cache(fetchDataset);

type StaticDatasetPageProps = NextStaticPageProps<
  ReturnType<typeof generateStaticParams>[0]['collection']
>;

export function generateStaticParams() {
  return collectionSchema
    .mapKeys(collectionSchema.lowerCaseKey)
    .map((collection) => ({ collection }));
}

export function generateMetadata({
  params: { collection },
}: StaticDatasetPageProps): Metadata {
  const collectionKey = collectionSchema.upperCaseKey(collection);
  const dataNameKey = dataNameSchema.defaultKey;
  return {
    title: [
      collectionSchema.display(collectionKey, 'en'),
      dataNameSchema.display(dataNameKey, 'en'),
    ].join(' '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function StaticDatasetPage({
  params: { collection },
}: StaticDatasetPageProps) {
  const collectionKey = collectionSchema.upperCaseKey(collection);

  const datasetKeys = [
    collectionKey,
    yearSchema.defaultKey,
    monthSchema.defaultKey,
    seasonSchema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  return (
    <>
      <Dataset
        initialCollectionKey={collectionKey}
        initialDataset={{
          [collectionKey]: initialDataset,
        }}
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

export default StaticDatasetPage;
