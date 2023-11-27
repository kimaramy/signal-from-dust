'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  dataCollectionSchema,
  useDataCollectionKey,
} from '@/components/dataCollection';
import Grid from '@/components/Grid';

function FakeDataset() {
  const dataCollectionKey = useDataCollectionKey();

  const numbers: number[] = new Array(
    dataCollectionSchema.getDataCount(dataCollectionKey)
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
