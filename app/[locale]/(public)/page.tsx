import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import { getDictionary, IntlMessageFormat, type Locale } from '@/lib/i18n';
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
import { SettingsDialog } from '@/components/settings/dialog';

const fetchCachedDataset = cache(fetchDataset);

async function _generateMetadata({ params }: NextPageProps) {
  const locale = params?.locale as Locale;

  const dictionary = await getDictionary(locale);

  const collection = CollectionUtils.schema.display(
    CollectionUtils.schema.defaultKey,
    locale
  );
  const location = LocationUtils.schema.display(
    LocationUtils.schema.defaultKey,
    locale
  );
  const dust = DustUtils.schema.display(DustUtils.schema.defaultKey, locale);

  const title = new IntlMessageFormat(dictionary.title.collection_page).format({
    collection,
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

// 페이지 Props 라우트 및 쿼리 파라미터를 데이터 패칭 혹은 다른 동적 빌드 용도로 사용시 Next.js 빌드시 자동으로 동적 렌더링으로 처리하게됨. 사용하지 않을 경우 정적 페이지(기본 값)로 빌드
async function Page(props: NextPageProps) {
  const { title } = await _generateMetadata(props);

  const datasetKeys = [
    CollectionUtils.schema.defaultKey,
    YearUtils.schema.defaultKey,
    MonthUtils.schema.defaultKey,
    SeasonUtils.schema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  if (process.env.NODE_ENV === 'development') {
    console.log(`defualt_page: %d`, initialDataset.length);
  }

  return (
    <>
      <DatasetHeader title={title} dataset={initialDataset} />
      <Dataset
        initialCollectionKey={CollectionUtils.schema.defaultKey}
        initialDataset={{
          [CollectionUtils.schema.defaultKey]: initialDataset,
        }}
      />
      <SettingsDialog />
    </>
  );
}

export const revalidate = false; // 다른 동적 패칭 혹은 캐싱 동작 발생 전까지 무기한으로 캐싱

export default Page;
