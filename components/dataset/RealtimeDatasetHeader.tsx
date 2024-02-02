import React from 'react';

import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import { Header, Menu } from '@/components/layout';

import DatasetDownloadButton from './DatasetDownloadButton';
import type { DatasetHeaderProps } from './DatasetHeader';

const RealtimeDatasetHeader = React.forwardRef<
  HTMLDivElement,
  DatasetHeaderProps
>(function RealtimeDatasetHeader({ title, dataset, isSticky, className }, ref) {
  return (
    <Header
      ref={ref}
      position={isSticky ? 'sticky' : 'fixed'}
      className={className}
    >
      <SafeArea className="flex justify-between p-4">
        <div className="flex w-full items-center gap-6 xl:gap-8">
          <h1 className="max-w-2/3 truncate text-xl font-bold lg:text-2xl">
            {title}
          </h1>
          <div className="hidden items-center gap-3 md:flex">
            <ButtonGroup
              items={[
                <DatasetDownloadButton dataset={dataset} datasetName={title} />,
                <URLCopyButton />,
              ]}
            />
          </div>
        </div>
        <Menu />
      </SafeArea>
    </Header>
  );
});

export default RealtimeDatasetHeader;
