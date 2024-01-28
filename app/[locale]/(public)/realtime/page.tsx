import type { Metadata } from 'next';
import { fetchRealtimeDataset } from '@/domains/';

import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
import { DustUtils, LocationUtils } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { RealtimeDataset } from '@/components/dataset';
import { parseDustKey } from '@/components/dust';
import { parseLocationKey } from '@/components/location';

import { revalidateRealtimeData } from './actions';

async function _generateMetadata({ params, searchParams }: NextPageProps) {
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

export async function generateMetadata(
  props: NextPageProps
): Promise<Metadata> {
  return await _generateMetadata(props);
}

async function Page({ params, searchParams }: NextPageProps) {
  const { title } = await _generateMetadata({ params, searchParams });

  const initialDataset = await fetchRealtimeDataset();

  if (process.env.NODE_ENV === 'development') {
    console.log(`realtime_page: %d`, initialDataset?.length ?? 0);
  }

  return (
    <RealtimeDataset
      title={title}
      initialDataset={initialDataset}
      revalidate={revalidateRealtimeData}
    />
  );
}

export const dynamicParams = false;

export const revalidate = false;

export default Page;
