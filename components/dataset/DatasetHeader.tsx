import React from 'react';

import { DesktopOnly } from '@/lib/device';
import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import {
  Header,
  LayoutConsumer,
  LayoutSelect,
  Menu,
} from '@/components/layout';

import DatasetDownloadButton from './DatasetDownloadButton';

export interface DatasetHeaderProps {
  title: string;
  dataset: object[];
  isSticky?: boolean;
  className?: string;
}

const DatasetHeader = React.forwardRef<HTMLDivElement, DatasetHeaderProps>(
  function DatasetHeader({ title, dataset, isSticky, className }, ref) {
    return (
      <Header
        ref={ref}
        position={isSticky ? 'sticky' : 'fixed'}
        className={className}
      >
        <SafeArea className="flex justify-between p-4">
          <div className="flex w-full items-center gap-6 xl:gap-8">
            <h1 className="max-w-1/2 truncate text-xl font-bold lg:text-2xl">
              {title}
            </h1>
            <div className="flex items-center gap-3">
              <ButtonGroup
                items={[
                  <DatasetDownloadButton
                    dataset={dataset}
                    fileName={`${title.replace(/\s/g, '_')}.csv`}
                  />,
                  <URLCopyButton />,
                ]}
              />
              <DesktopOnly>
                <LayoutConsumer>
                  {(layoutContext) => (
                    <LayoutSelect
                      className="w-auto border-primary/20"
                      value={layoutContext.key}
                      onValueChange={(value) => layoutContext.setKey(value)}
                    />
                  )}
                </LayoutConsumer>
              </DesktopOnly>
            </div>
          </div>
          <Menu />
        </SafeArea>
      </Header>
    );
  }
);

export default DatasetHeader;
