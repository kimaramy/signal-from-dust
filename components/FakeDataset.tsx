'use client';

import { collectionSchema } from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollectionKey } from '@/components/collection';
import Grid from '@/components/Grid';

function FakeDataset() {
  const collectionKey = useCollectionKey();

  const numbers: number[] = new Array(
    collectionSchema.getDataCount(collectionKey)
  ).fill(0);

  return (
    <Grid
      items={numbers}
      itemKey={(_, index) => index.toString()}
      renderItem={() => <Skeleton className="h-full w-full" />}
    />
  );
}

export default FakeDataset;
