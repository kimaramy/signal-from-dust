import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
import { DustUtils, LocationUtils } from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { RealtimeDataset } from '@/components/dataset';
import { parseDustKey } from '@/components/dust';
import { parseLocationKey } from '@/components/location';

import { revalidateRealtimeDataset } from './actions';

function _fetchRealtimeDataset(origin: string | null) {
  return new Promise<object[]>((resolve, reject) => {
    fetch(`${origin}/api/realtime`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

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

  const _headers = headers(); // only for dynamic runtime

  const realtimeDataset = await _fetchRealtimeDataset(_headers.get('x-origin'));

  if (process.env.NODE_ENV === 'development') {
    console.log(`realtime_page: %s`, JSON.stringify(realtimeDataset));
  }

  return (
    <RealtimeDataset
      title={title}
      initialDataset={realtimeDataset}
      revalidate={revalidateRealtimeDataset}
    />
  );
}

export default Page;
