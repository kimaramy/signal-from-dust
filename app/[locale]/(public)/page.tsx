import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchDataset } from '@/domains';

import type { Locale } from '@/lib/i18n';
import {
  CollectionUtils,
  DataNameUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';
import type { NextPageProps } from '@/lib/router';
import { Dataset, DatasetControl } from '@/components/dataset';
import { SettingsDialog } from '@/components/settings/dialog';

const fetchCachedDataset = cache(fetchDataset);

export function generateMetadata({ params }: NextPageProps): Metadata {
  const locale = params?.locale as Locale;
  const dataNameSchema = DataNameUtils.schema;
  const collectionSchema = CollectionUtils.schema;
  const locationSchema = LocationUtils.schema;
  return {
    title: [
      dataNameSchema.display(dataNameSchema.defaultKey, locale),
      collectionSchema.display(collectionSchema.defaultKey, locale),
      locationSchema.display(locationSchema.defaultKey, locale),
    ].join(', '),
  };
}

export const revalidate = false; // 다른 동적 패칭 혹은 캐싱 동작 발생 전까지 무기한으로 캐싱

// 페이지 Props 라우트 및 쿼리 파라미터를 데이터 패칭 혹은 다른 동적 빌드 용도로 사용시 Next.js 빌드시 자동으로 동적 렌더링으로 처리하게됨. 사용하지 않을 경우 정적 페이지(기본 값)로 빌드
async function DefaultDatasetPage(_: NextPageProps) {
  const datasetKeys = [
    CollectionUtils.schema.defaultKey,
    YearUtils.schema.defaultKey,
    MonthUtils.schema.defaultKey,
    SeasonUtils.schema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  return (
    <>
      <DatasetControl dataset={initialDataset} datasetKeys={datasetKeys} />
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

export default DefaultDatasetPage;
