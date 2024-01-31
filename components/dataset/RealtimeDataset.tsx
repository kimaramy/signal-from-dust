'use client';

import { useEffect, useState } from 'react';
import { fetchRealtimeDataset, type RealtimeData } from '@/domains';

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
  const [dataset, setDataset] = useState(initialDataset);

  const isLoading = dataset.length === 0;

  useEffect(() => {
    let abortController: AbortController | null = null;

    if (dataset.length === 0) {
      abortController = new AbortController();
      fetchRealtimeDataset({ signal: abortController.signal })
        .then((dataset) => {
          setDataset(dataset);
          console.info('realtime data fetch success on client');
        })
        .catch((error) => {
          console.error(JSON.stringify(error, null, 2));
          throw error; // This will activate the closest `error.ts` Error Boundary
        });
    }

    return () => {
      abortController?.abort();
    };
  }, [dataset]);

  return (
    <>
      <RealtimeDatasetHeader title={title} dataset={dataset} isSticky />
      <RealtimeDatasetBody initialDataset={dataset} revalidate={revalidate} />
      {isLoading && <Spinner />}
    </>
  );
}

export default RealtimeDataset;
