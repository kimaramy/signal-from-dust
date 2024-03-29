import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import { getDictionary, i18n, IntlMessageFormat, Locale } from '@/lib/i18n';
import {
  CollectionUtils,
  DustUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';
import { project } from '@/lib/project';
import type { NextPageProps } from '@/lib/router';
import { Dataset } from '@/components/dataset';

const fetchCachedDataset = cache(fetchDataset);

type PageProps = NextPageProps<ReturnType<typeof generateStaticParams>[0]>;

export function generateStaticParams() {
  return CollectionUtils.schema
    .mapKeys(CollectionUtils.schema.lowerCaseKey)
    .flatMap((collection) =>
      i18n.locales.map((locale) => ({ locale, collection }))
    );
}

export async function generateMetadata({ params }: Pick<PageProps, 'params'>) {
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
  const description = dictionary.intro.content.subtitle;
  const getCanonicalURL = (locale?: Locale) =>
    locale
      ? `${project.url.domain}/${locale}/${params.collection}`
      : `${project.url.domain}/${params.collection}`;
  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalURL(),
      languages: {
        en: getCanonicalURL('en'),
        ko: getCanonicalURL('ko'),
      },
    },
  } satisfies Metadata;
}

async function Page({ params }: PageProps) {
  const { title } = await generateMetadata({ params });

  const collectionKey = CollectionUtils.schema.upperCaseKey(params.collection);

  const datasetKeys = [
    collectionKey,
    YearUtils.schema.defaultKey,
    MonthUtils.schema.defaultKey,
    SeasonUtils.schema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  if (process.env.NODE_ENV === 'development') {
    const _initialDataset = Array.isArray(initialDataset)
      ? initialDataset
      : initialDataset[SeasonUtils.schema.defaultKey]!;
    console.log(`collection_page: %d`, _initialDataset.length);
  }

  return (
    <Dataset
      title={title}
      initialCollectionKey={collectionKey}
      initialDataset={initialDataset}
    />
  );
}

export const dynamicParams = false;

export const revalidate = false;

export default Page;
