import { CollectionUtils } from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid } from '@/components/layout';

interface FakeDatasetProps {
  collectionKey: CollectionUtils.Key;
}

function FakeDataset({ collectionKey }: FakeDatasetProps) {
  const numbers: number[] = new Array(
    CollectionUtils.schema.getDataCount(collectionKey)
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
