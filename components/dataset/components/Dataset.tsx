'use client';

import { LayoutProvider } from '@/components/layout';
import { useLayoutKey } from '@/components/layout/lib/hooks';

import DatasetBody, { type DatasetBodyProps } from './DatasetBody';
import DatasetHeader from './DatasetHeader';

interface DatasetProps extends Omit<DatasetBodyProps, 'initialDataset'> {
  title: string;
  initialDataset: object[];
}

function Dataset({
  title,
  initialCollectionKey,
  initialDataset,
}: DatasetProps) {
  const layoutKey = useLayoutKey('query');

  return (
    <LayoutProvider initialLayoutKey={layoutKey}>
      <DatasetHeader title={title} dataset={initialDataset} isSticky />
      <DatasetBody
        initialCollectionKey={initialCollectionKey}
        initialDataset={{ [initialCollectionKey]: initialDataset }}
      />
    </LayoutProvider>
  );
}

export default Dataset;
