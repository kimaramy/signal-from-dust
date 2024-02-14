'use client';

import React from 'react';

import { cn } from '@/lib/css';
import { DesktopOnly } from '@/lib/device';
import { useLocaleDictionary } from '@/lib/i18n';
import { GivenRoutesOnly } from '@/lib/router';
import { toLowerCase } from '@/lib/utils';
import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import { useCollectionKey } from '@/components/collection';
import { LayoutConsumer, LayoutSelect } from '@/components/layout';
import { Menu } from '@/components/navigation';

import { DatasetOrderConsumer } from '../lib';
import DatasetDownloadButton from './DatasetDownloadButton';
import DatasetOrderSelect from './DatasetOrderSelect';

export interface DatasetHeaderProps
  extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  dataset: { [key: string]: object[] } | object[];
}

const DatasetHeader = React.forwardRef<HTMLDivElement, DatasetHeaderProps>(
  function DatasetHeader({ title, dataset, className, ...rest }, ref) {
    const { locale } = useLocaleDictionary();

    const collectionKey = useCollectionKey('path');

    return (
      <header
        ref={ref}
        className={cn(
          'bg-white/15 sticky left-0 top-0 z-50 w-full border-b border-border backdrop-blur px-safe pt-safe dark:border-primary/20',
          className
        )}
        {...rest}
      >
        <SafeArea className="flex justify-between gap-2 px-4 py-3 sm:py-4">
          <div className="flex w-full items-center gap-4 overflow-hidden xl:gap-6">
            <h1 className="w-auto truncate text-lg font-bold tracking-tight sm:px-1.5 sm:text-xl md:max-w-2/3 lg:text-2xl">
              {title}
            </h1>
            <div className="hidden items-center gap-3 md:flex">
              <ButtonGroup
                items={[
                  Array.isArray(dataset) ? (
                    <DatasetDownloadButton
                      datasetName={title}
                      dataset={dataset}
                    />
                  ) : null,
                  <URLCopyButton />,
                ]}
              />
              <DesktopOnly>
                <GivenRoutesOnly
                  pathnames={[
                    `/${locale}`,
                    `/${locale}/${collectionKey}`,
                    `/${locale}/search`,
                  ].map(toLowerCase)}
                >
                  <div className="flex gap-1.5">
                    <LayoutConsumer>
                      {(layoutContext) => (
                        <LayoutSelect
                          className="w-auto border-primary/20"
                          value={layoutContext.key}
                          onValueChange={(value) => layoutContext.setKey(value)}
                        />
                      )}
                    </LayoutConsumer>
                    <DatasetOrderConsumer>
                      {(datasetOrderContext) => (
                        <DatasetOrderSelect
                          className="w-auto border-primary/20"
                          value={datasetOrderContext.key}
                          onValueChange={(value) =>
                            datasetOrderContext.setKey(value)
                          }
                        />
                      )}
                    </DatasetOrderConsumer>
                  </div>
                </GivenRoutesOnly>
              </DesktopOnly>
            </div>
          </div>
          <Menu />
        </SafeArea>
      </header>
    );
  }
);

export default DatasetHeader;
