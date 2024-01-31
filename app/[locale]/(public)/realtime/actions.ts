'use server';

import { revalidateTag } from 'next/cache';
import { realtimeDatasetRevalidateTag } from '@/domains';

/**
 * @param origin local or deployed next.js server origin(\<scheme>://\<hostname>:\<port>)
 * @returns fetched dataset(array) or empty array
 */
export async function fetchRealtimeDatasetOnServer<TData = unknown>(
  origin: string | null
) {
  if (origin === null) return [] as TData[];
  return new Promise<TData[]>((resolve, reject) => {
    fetch(`${origin}/api/realtime`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export async function revalidateRealtimeDataset() {
  if (process.env.NODE_ENV === 'development') {
    console.log('revalidate_tag: %s', realtimeDatasetRevalidateTag);
  }
  revalidateTag(realtimeDatasetRevalidateTag);
}
