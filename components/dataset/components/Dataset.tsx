'use client';

import { useMobileDetect } from '@/lib/device';
import { LayoutProvider } from '@/components/layout';
import { LayoutUtils } from '@/components/layout/lib/schemes/layout';

import { DatasetOrderProvider } from '../lib';
import DatasetBody, { type DatasetBodyProps } from './DatasetBody';
import DatasetHeader from './DatasetHeader';

interface DatasetProps extends Omit<DatasetBodyProps, 'initialDataset'> {
  title: string;
  initialDataset: { [key: string]: object[] } | object[];
  userAgent?: string | null;
}

function Dataset({
  title,
  initialCollectionKey,
  initialDataset,
  userAgent,
}: DatasetProps) {
  const isMobile = useMobileDetect({ userAgent });

  const initialLayoutKey = LayoutUtils.schema.getKeyByDevice(isMobile);

  return (
    <LayoutProvider key={initialLayoutKey} initialLayoutKey={initialLayoutKey}>
      <DatasetOrderProvider>
        <DatasetHeader title={title} dataset={initialDataset} />
        <DatasetBody
          initialCollectionKey={initialCollectionKey}
          initialDataset={{ [initialCollectionKey]: initialDataset }}
        />
      </DatasetOrderProvider>
    </LayoutProvider>
  );
}

export default Dataset;
