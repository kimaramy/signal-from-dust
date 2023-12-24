import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import { i18n } from '@/lib/i18n';
import { Schema } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Floating from '@/components/Floating';

const fetchCachedDataset = cache(fetchDataset);

type StaticDatasetPageProps = NextPageProps<
  ReturnType<typeof generateStaticParams>[0]
>;

export function generateStaticParams() {
  const collectionSchema = Schema.get('collection');
  return collectionSchema
    .mapKeys(collectionSchema.lowerCaseKey)
    .flatMap((collection) =>
      i18n.locales.map((locale) => ({ locale, collection }))
    );
}

export function generateMetadata({
  params: { collection, locale },
}: StaticDatasetPageProps): Metadata {
  const collectionSchema = Schema.get('collection');
  const dataNameSchema = Schema.get('dataName');
  const collectionKey = collectionSchema.upperCaseKey(collection);
  const dataNameKey = dataNameSchema.defaultKey;
  return {
    title: [
      dataNameSchema.display(dataNameKey, locale),
      collectionSchema.display(collectionKey, locale),
    ].join(', '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function StaticDatasetPage({
  params: { collection },
}: StaticDatasetPageProps) {
  const collectionKey = Schema.get('collection').upperCaseKey(collection);

  const datasetKeys = [
    collectionKey,
    Schema.get('year').defaultKey,
    Schema.get('month').defaultKey,
    Schema.get('season').defaultKey,
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
