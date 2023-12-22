import { collectionSchema, type CollectionKey } from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import Grid from '@/components/Grid';

interface FakeDatasetProps {
  collectionKey: CollectionKey;
}

function FakeDataset({ collectionKey }: FakeDatasetProps) {
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
