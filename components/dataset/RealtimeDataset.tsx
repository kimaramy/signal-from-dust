'use client';

import type { RealtimeData } from '@/domains';

import DatasetHeader from './DatasetHeader';
import RealtimeDatasetBody from './RealtimeDatasetBody';

interface RealtimeDatasetProps {
  title: string;
  initialDataset: object[];
  revalidate: () => Promise<void>;
}

function RealtimeDataset({
  title,
  initialDataset,
  revalidate,
}: RealtimeDatasetProps) {
  return (
    <>
      <DatasetHeader title={title} dataset={initialDataset} isSticky />
      <RealtimeDatasetBody
        initialDataset={initialDataset as RealtimeData[]}
        revalidate={revalidate}
      />
    </>
  );
}

export default RealtimeDataset;
