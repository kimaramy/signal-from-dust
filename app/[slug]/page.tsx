import { cache, Suspense } from 'react';
import type { Metadata } from 'next';
import { fetchInitialDataset } from '@/domains/prefetches';

import type { NextStaticPageProps } from '@/lib/router';
import { dataCollectionSchema } from '@/components/dataCollection';
import { dataNameSchema } from '@/components/dataName';
import Dataset from '@/components/Dataset';
import FakeDataset from '@/components/FakeDataset';
import Main from '@/components/Main';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { yearSchema } from '@/components/year';

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

  const initialDataset = await cache(fetchInitialDataset)(
    dataCollectionKey,
    yearSchema.defaultKey,
    monthSchema.defaultKey,
    seasonSchema.defaultKey
  );

  return (
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
  );
}

export default StaticQueryPage;
