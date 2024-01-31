import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { RealtimeData } from '@/domains';

import { parseHeader } from '@/lib/headers';
import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
import { DustUtils, LocationUtils } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { RealtimeDataset } from '@/components/dataset';
import { parseDustKey } from '@/components/dust';
import { parseLocationKey } from '@/components/location';

import {
  fetchRealtimeDatasetOnServer,
  revalidateRealtimeDataset,
} from './actions';

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

  const { origin } = parseHeader(headers()); // only runs in dynamic runtime

  const realtimeDataset =
    await fetchRealtimeDatasetOnServer<RealtimeData>(origin);

  if (process.env.NODE_ENV === 'development') {
    console.log(`realtime_page: %d`, realtimeDataset.length);
  }

  return (
    <RealtimeDataset
      title={title}
      initialDataset={realtimeDataset}
      revalidate={revalidateRealtimeDataset}
    />
  );
}

export const dynamic = 'force-dynamic';

export default Page;
