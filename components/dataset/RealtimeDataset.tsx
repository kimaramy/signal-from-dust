'use client';

import { useRealtimeListQuery, type RealtimeData } from '@/domains';

import { Spinner } from '@/components/layout';

import RealtimeDatasetBody from './RealtimeDatasetBody';
import RealtimeDatasetHeader from './RealtimeDatasetHeader';

interface RealtimeDatasetProps {
  title: string;
  initialDataset: RealtimeData[];
  revalidate: () => Promise<void>;
}

function RealtimeDataset({
  title,
  initialDataset,
  revalidate,
}: RealtimeDatasetProps) {
  const { dataset, isLoading } = useRealtimeListQuery({
    initialDataset,
    enabled: initialDataset.length === 0,
  });

  return (
    <>
      <RealtimeDatasetHeader title={title} dataset={dataset} isSticky />
      <RealtimeDatasetBody initialDataset={dataset} revalidate={revalidate} />
      {isLoading && <Spinner />}
    </>
  );
}

export default RealtimeDataset;
