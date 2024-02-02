'use client';

import { LayoutProvider } from '@/components/layout';

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
  return (
    <LayoutProvider>
      <DatasetHeader title={title} dataset={initialDataset} isSticky />
      <DatasetBody
        initialCollectionKey={initialCollectionKey}
        initialDataset={{ [initialCollectionKey]: initialDataset }}
      />
    </LayoutProvider>
  );
}

export default Dataset;
