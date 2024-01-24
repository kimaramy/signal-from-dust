import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

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

async function _generateMetadata({ params, searchParams }: NextPageProps) {
  const locale = params?.locale as Locale;

  const dictionary = await getDictionary(locale);

  const dustKey = parseDustKey(searchParams);
  const yearKey = parseYearKey(searchParams);
  const seasonKey = parseSeasonKey(searchParams);
  const monthKey = parseMonthKey(searchParams);
  const locationKey = parseLocationKey(searchParams);

  const location = LocationUtils.schema.display(locationKey, locale);
  const dust = DustUtils.schema.display(dustKey, locale);
  const monthOrSeason =
    seasonKey !== SeasonUtils.schema.defaultKey
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

export async function generateMetadata(
  props: NextPageProps
): Promise<Metadata> {
  return await _generateMetadata(props);
}

async function Page({ params, searchParams }: NextPageProps) {
  const { title } = await _generateMetadata({ params, searchParams });

  const collectionKey = parseCollectionKey(searchParams);
  const yearKey = parseYearKey(searchParams);
  const monthKey = parseMonthKey(searchParams);
  const seasonKey = parseSeasonKey(searchParams);

  const datasetKeys = [collectionKey, yearKey, monthKey, seasonKey] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  if (process.env.NODE_ENV === 'development') {
    console.log(`search_page: %d`, initialDataset.length);
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
