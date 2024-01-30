'use client';

import { useEffect, useState } from 'react';
import { fetchRealtimeDataset, type RealtimeData } from '@/domains';

import { Spinner } from '@/components/layout';

import DatasetHeader from './DatasetHeader';
import RealtimeDatasetBody from './RealtimeDatasetBody';

interface RealtimeDatasetProps {
  title: string;
  initialDataset?: object[];
  revalidate: () => Promise<void>;
}

function RealtimeDataset({
  title,
  initialDataset = [],
  revalidate,
}: RealtimeDatasetProps) {
  const [dataset, setDataset] = useState(initialDataset as RealtimeData[]);

  const isLoading = dataset.length === 0;

  useEffect(() => {
    const abortController = new AbortController();

    if (dataset.length === 0) {
      fetchRealtimeDataset({ signal: abortController.signal })
        .then((dataset) => {
          setDataset(dataset);
          console.log('success');
        })
        .catch((error) => {
          console.error(JSON.stringify(error, null, 2));
          throw error; // This will activate the closest `error.ts` Error Boundary
        });
    }

    return () => {
      abortController.abort();
    };
  }, [dataset]);

  return (
    <>
      <DatasetHeader title={title} dataset={initialDataset} isSticky />
      <RealtimeDatasetBody
        initialDataset={initialDataset as RealtimeData[]}
        revalidate={revalidate}
      />
      {isLoading && <Spinner />}
    </>
  );
}

export default RealtimeDataset;
