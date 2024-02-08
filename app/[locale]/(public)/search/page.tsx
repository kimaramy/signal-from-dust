import { cache } from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { fetchDataset } from '@/domains';

import { parseHeader } from '@/lib/headers';
import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
import {
  DustUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { parseCollectionKey } from '@/components/collection';
import { Dataset } from '@/components/dataset';
import { parseDustKey } from '@/components/dust';
import { parseLocationKey } from '@/components/location';
import { parseMonthKey } from '@/components/month';
import { parseSeasonKey } from '@/components/season';
import { parseYearKey } from '@/components/year';

const fetchCachedDataset = cache(fetchDataset);

export async function generateMetadata({
  params,
  searchParams,
}: NextPageProps) {
  const locale = params?.locale as Locale;
  const dictionary = await getDictionary(locale);
  const collectionKey = parseCollectionKey(searchParams);
  const dustKey = parseDustKey(searchParams);
  const yearKey = parseYearKey(searchParams);
  const seasonKey = parseSeasonKey(searchParams);
  const monthKey = parseMonthKey(searchParams);
  const locationKey = parseLocationKey(searchParams);
  const location = LocationUtils.schema.display(locationKey, locale);
  const dust = DustUtils.schema.display(dustKey, locale);
  const monthOrSeason =
    collectionKey === 'SEASONALLY'
      ? SeasonUtils.schema.display(seasonKey, locale)
      : MonthUtils.schema.display(monthKey, 'short', locale);
  const year = YearUtils.schema.display(yearKey, 'short', locale);
  const title = new IntlMessageFormat(dictionary.title.search_page).format({
    location,
    dust,
    monthOrSeason,
    year,
  }) as string;
  const description = dictionary.intro.content.subtitle;
  return { title, description } satisfies Metadata;
}

async function Page({ params, searchParams }: NextPageProps) {
  const { title } = await generateMetadata({ params, searchParams });

  const collectionKey = parseCollectionKey(searchParams);
  const yearKey = parseYearKey(searchParams);
  const monthKey = parseMonthKey(searchParams);
  const seasonKey = parseSeasonKey(searchParams);

  const datasetKeys = [collectionKey, yearKey, monthKey, seasonKey] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  const { userAgent } = parseHeader(headers());

  if (process.env.NODE_ENV === 'development') {
    const _initialDataset = Array.isArray(initialDataset)
      ? initialDataset
      : initialDataset[seasonKey]!;
    console.log(`search_page: %d`, _initialDataset?.length);
  }

  return (
    <Dataset
      title={title}
      initialCollectionKey={collectionKey}
      initialDataset={initialDataset}
      userAgent={userAgent}
    />
  );
}

export const dynamic = 'auto';

export const revalidate = false; // This is the default and changes the fetch cache to indefinitely cache anything that uses force-cache or is fetched before a dynamic Hook/fetch

export default Page;
