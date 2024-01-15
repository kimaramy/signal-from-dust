import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import { i18n } from '@/lib/i18n';
import { Schema } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { Dataset, DatasetControl } from '@/components/dataset';

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
  const dustSchema = Schema.get('dust');
  const locationSchema = Schema.get('location');
  return {
    title: [
      dustSchema.display(dustSchema.defaultKey, locale),
      collectionSchema.display(
        collectionSchema.upperCaseKey(collection),
        locale
      ),
      locationSchema.display(locationSchema.defaultKey, locale),
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
      <DatasetControl dataset={initialDataset} datasetKeys={datasetKeys} />
      <Dataset
        initialCollectionKey={collectionKey}
        initialDataset={{
          [collectionKey]: initialDataset,
        }}
      />
    </>
  );
}

export default StaticDatasetPage;
