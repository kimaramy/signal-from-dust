'use client';

import { useEffect, useState } from 'react';

import { fetchRealtimeDatasetViaRoute, type RealtimeData } from './services';

export function useRealtimeListQuery(initialDataset: RealtimeData[]) {
  const [dataset, setDataset] = useState(initialDataset);

  const isLoading = dataset.length === 0;

  useEffect(() => {
    let abortController: AbortController | null = null;

    if (dataset.length === 0) {
      abortController = new AbortController();
      fetchRealtimeDatasetViaRoute(window.location.origin, {
        signal: abortController.signal,
      })
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

  return { dataset, isLoading };
}
