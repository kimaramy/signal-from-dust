'use client';

import { useRealtimeListQuery, type RealtimeData } from '@/domains';

import { Spinner } from '@/components/layout';

import DatasetHeader from './DatasetHeader';
import RealtimeDatasetBody from './RealtimeDatasetBody';

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
      <DatasetHeader title={title} dataset={dataset} />
      <RealtimeDatasetBody initialDataset={dataset} revalidate={revalidate} />
      {isLoading && <Spinner />}
    </>
  );
}

export default RealtimeDataset;
