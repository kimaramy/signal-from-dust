'use client';

import { useEffect, useState } from 'react';

import { fetchRealtimeDatasetViaRoute, type RealtimeData } from './services';

interface UseRealtimeListQueryOptions {
  initialDataset?: RealtimeData[];
  enabled?: boolean;
}

export function useRealtimeListQuery(options?: UseRealtimeListQueryOptions) {
  const initialOptions = {
    initialDataset: [],
    enabled: true,
  } satisfies typeof options;

  const initialDataset =
    options?.initialDataset ?? initialOptions.initialDataset;
  const enabled = options?.enabled ?? initialOptions.enabled;

  const [dataset, setDataset] = useState(initialDataset);

  const isLoading = dataset.length === 0;

  useEffect(() => {
    let abortController: AbortController | null = null;

    if (enabled) {
      abortController = new AbortController();
      fetchRealtimeDatasetViaRoute<RealtimeData>(window.location.origin, {
        signal: abortController.signal,
      })
        .then((dataset) => {
          setDataset(dataset);
          console.log('Realtime dataset fetch success on client');
        })
        .catch((error) => {
          console.error(JSON.stringify(error, null, 2));
          throw error; // This will activate the closest `error.ts` Error Boundary
        });
    }

    return () => {
      abortController?.abort();
    };
  }, [enabled]);

  return { dataset, isLoading };
}
