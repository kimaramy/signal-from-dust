'use client';

import { useMobileDetect } from '@/lib/device';
import { LayoutProvider } from '@/components/layout';
import { LayoutUtils } from '@/components/layout/lib/schema';

import DatasetBody, { type DatasetBodyProps } from './DatasetBody';
import DatasetHeader from './DatasetHeader';

interface DatasetProps extends Omit<DatasetBodyProps, 'initialDataset'> {
  title: string;
  initialDataset: object[];
  userAgent?: string | null;
}

function Dataset({
  title,
  initialCollectionKey,
  initialDataset,
  userAgent,
}: DatasetProps) {
  const isMobile = useMobileDetect({ userAgent });

  const layoutKey: LayoutUtils.Key = isMobile ? 'SHORT' : 'DETAIL';

  return (
    <LayoutProvider key={layoutKey} initialLayoutKey={layoutKey}>
      <DatasetHeader title={title} dataset={initialDataset} />
      <DatasetBody
        initialCollectionKey={initialCollectionKey}
        initialDataset={{ [initialCollectionKey]: initialDataset }}
      />
    </LayoutProvider>
  );
}

export default Dataset;
