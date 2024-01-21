import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import { getDictionary, i18n, IntlMessageFormat } from '@/lib/i18n';
import {
  CollectionUtils,
  DustUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { Dataset, DatasetHeader } from '@/components/dataset';

const fetchCachedDataset = cache(fetchDataset);

async function getPageTitle({ params }: Pick<PageProps, 'params'>) {
  const dictionary = await getDictionary(params.locale);

  const collection = CollectionUtils.schema.display(
    CollectionUtils.schema.upperCaseKey(params.collection),
    params.locale
  );
  const location = LocationUtils.schema.display(
    LocationUtils.schema.defaultKey,
    params.locale
  );
  const dust = DustUtils.schema.display(
    DustUtils.schema.defaultKey,
    params.locale
  );

  const title = new IntlMessageFormat(dictionary.title.collection_page).format({
    collection,
    location,
    dust,
  }) as string;

  return title;
}

type PageProps = NextPageProps<ReturnType<typeof generateStaticParams>[0]>;

export function generateStaticParams() {
  return CollectionUtils.schema
    .mapKeys(CollectionUtils.schema.lowerCaseKey)
    .flatMap((collection) =>
      i18n.locales.map((locale) => ({ locale, collection }))
    );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const title = await getPageTitle({ params });
  return { title };
}

async function Page({ params }: PageProps) {
  const title = await getPageTitle({ params });

  const collectionKey = CollectionUtils.schema.upperCaseKey(params.collection);

  const datasetKeys = [
    collectionKey,
    YearUtils.schema.defaultKey,
    MonthUtils.schema.defaultKey,
    SeasonUtils.schema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  if (process.env.NODE_ENV === 'development') {
    console.log(`collection_page: %d`, initialDataset.length);
  }

  return (
    <>
      <DatasetHeader
        title={title}
        dataset={initialDataset}
        datasetKeys={datasetKeys}
      />
      <Dataset
        initialCollectionKey={collectionKey}
        initialDataset={{
          [collectionKey]: initialDataset,
        }}
      />
    </>
  );
}

export const dynamicParams = false;

export const revalidate = false;

export default Page;
