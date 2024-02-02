'use server';

import { revalidateTag } from 'next/cache';
import { realtimeDatasetRevalidateTag } from '@/domains/realtime';

export async function revalidateRealtimeDataset() {
  if (process.env.NODE_ENV === 'development') {
    console.log('revalidate_tag: %s', realtimeDatasetRevalidateTag);
  }
  revalidateTag(realtimeDatasetRevalidateTag);
}
