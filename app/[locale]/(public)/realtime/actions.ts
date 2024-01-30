'use server';

import { revalidateTag } from 'next/cache';
import { realtimeDatasetRevalidateTag } from '@/domains';

export async function revalidateRealtimeDataset() {
  if (process.env.NODE_ENV === 'development') {
    console.log('revalidate: %s', realtimeDatasetRevalidateTag);
  }
  revalidateTag(realtimeDatasetRevalidateTag);
}
