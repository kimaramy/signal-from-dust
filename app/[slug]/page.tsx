import { cache, Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchInitialDataset } from '@/domains/prefetches';

import type { NextStaticPageProps } from '@/lib/router';
import { dataCollectionSchema } from '@/components/dataCollection';
import { dataNameSchema } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import FakeDataset from '@/components/FakeDataset';
import Floating from '@/components/Floating';
import Main from '@/components/Main';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { yearSchema } from '@/components/year';

const fetchInitialCachedDataset = cache(fetchInitialDataset);

type StaticQueryPageProps = NextStaticPageProps<
  ReturnType<typeof generateStaticParams>[0]['slug']
>;

export function generateStaticParams() {
  return dataCollectionSchema.getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params: { slug },
}: StaticQueryPageProps): Metadata {
  const dataCollectionKey = dataCollectionSchema.getKeyBySlug(slug);
  const dataNameKey = dataNameSchema.defaultKey;
  return {
    title: [
      dataCollectionSchema.display(dataCollectionKey, 'en'),
      dataNameSchema.display(dataNameKey, 'en'),
    ].join(' '),
  };
}

export const dynamicParams = false;

export const revalidate = false;

async function StaticQueryPage({ params: { slug } }: StaticQueryPageProps) {
  const dataCollectionKey = dataCollectionSchema.getKeyBySlug(slug);

  const datasetKeys = [
    dataCollectionKey,
    yearSchema.defaultKey,
    monthSchema.defaultKey,
    seasonSchema.defaultKey,
  ] as const;

  const initialDataset = await fetchInitialCachedDataset(...datasetKeys);

  return (
    <>
      <Main>
        {/* Dataset 내부 클라이언트 사이드 쿼리 요청 대비 Suspense */}
        <Suspense fallback={<FakeDataset />}>
          <Dataset
            initialDataCollectionKey={dataCollectionKey}
            initialDataset={{
              [dataCollectionKey]: initialDataset,
            }}
          />
        </Suspense>
      </Main>
      <Floating right={2} bottom={11}>
        <DatasetDownloadButton
          dataset={initialDataset}
          datasetKeys={datasetKeys}
        />
      </Floating>
    </>
  );
}

export default StaticQueryPage;
