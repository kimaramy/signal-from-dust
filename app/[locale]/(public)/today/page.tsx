import type { Metadata } from 'next';
import { fetchRealtimeDataset } from '@/domains/realtime';

import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
import { DustUtils, LocationUtils } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { RealtimeDataset } from '@/components/dataset';
import { parseDustKey } from '@/components/dust';
import { parseLocationKey } from '@/components/location';

import { revalidateRealtimeDataset } from './actions';

export async function generateMetadata({
  params,
  searchParams,
}: NextPageProps) {
  const locale = params?.locale as Locale;
  const dictionary = await getDictionary(locale);
  const dustKey = parseDustKey(searchParams);
  const locationKey = parseLocationKey(searchParams);
  const location = LocationUtils.schema.display(locationKey, locale);
  const dust = DustUtils.schema.display(dustKey, locale);
  const title = new IntlMessageFormat(dictionary.title.realtime_page).format({
    location,
    dust,
  }) as string;
  const description = dictionary.intro.content.subtitle;
  return { title, description } satisfies Metadata;
}

async function Page({ params, searchParams }: NextPageProps) {
  const { title } = await generateMetadata({ params, searchParams });

  const realtimeDataset = await fetchRealtimeDataset();

  if (process.env.NODE_ENV === 'development') {
    console.log(`today_page: %d`, realtimeDataset.length);
  }

  return (
    <RealtimeDataset
      title={title}
      initialDataset={realtimeDataset}
      revalidate={revalidateRealtimeDataset}
    />
  );
}

export const revalidate = 0; // Specifying 0 implies that this layout or page should never be static.

export const dynamic = 'force-dynamic'; // This disables all caching of fetches and always revalidates.

export default Page;
