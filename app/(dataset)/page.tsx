import { cache } from 'react';
import { fetchDataset } from '@/domains';

import type { NextPageProps } from '@/lib/router';
import { collectionSchema } from '@/components/collection';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Floating from '@/components/Floating';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { SettingsDialog } from '@/components/settings';
import { yearSchema } from '@/components/year';

const fetchCachedDataset = cache(fetchDataset);

export const revalidate = false; // 다른 동적 패칭 혹은 캐싱 동작 발생 전까지 무기한으로 캐싱

// 페이지 Props 라우트 및 쿼리 파라미터를 데이터 패칭 혹은 다른 동적 빌드 용도로 사용시 Next.js 빌드시 자동으로 동적 렌더링으로 처리하게됨. 사용하지 않을 경우 정적 페이지(기본 값)로 빌드
async function DefaultDatasetPage(_: NextPageProps) {
  const datasetKeys = [
    collectionSchema.defaultKey,
    yearSchema.defaultKey,
    monthSchema.defaultKey,
    seasonSchema.defaultKey,
  ] as const;

  const initialDataset = await fetchCachedDataset(...datasetKeys);

  return (
    <>
      <Dataset
        initialCollectionKey={collectionSchema.defaultKey}
        initialDataset={{
          [collectionSchema.defaultKey]: initialDataset,
        }}
      />
      <Floating right={2} bottom={3}>
        <DatasetDownloadButton
          dataset={initialDataset}
          datasetKeys={datasetKeys}
        />
      </Floating>
      <SettingsDialog />
    </>
  );
}

export default DefaultDatasetPage;
