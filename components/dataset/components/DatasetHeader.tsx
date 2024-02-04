'use client';

import React from 'react';

import { cn } from '@/lib/css';
import { DesktopOnly } from '@/lib/device';
import { useLocaleDictionary } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import { GivenRoutesOnly } from '@/lib/router';
import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import { useCollectionKey } from '@/components/collection';
import { LayoutConsumer, LayoutSelect, Menu } from '@/components/layout';

import DatasetDownloadButton from './DatasetDownloadButton';

export interface DatasetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  dataset: object[];
}

const DatasetHeader = React.forwardRef<HTMLDivElement, DatasetHeaderProps>(
  function DatasetHeader({ title, dataset, className, ...rest }, ref) {
    const { locale } = useLocaleDictionary();

    const collectionKey = useCollectionKey('path');

    const lowerCasedCollectionKey =
      CollectionUtils.schema.lowerCaseKey(collectionKey);

    return (
      <header
        ref={ref}
        className={cn(
          'bg-white/15 sticky left-0 top-0 z-50 w-full border-b border-border backdrop-blur dark:border-primary/20',
          className
        )}
        {...rest}
      >
        <SafeArea className="flex justify-between gap-2 p-4">
          <div className="flex w-full items-center gap-6 xl:gap-8">
            <h1 className="truncate text-xl font-bold tracking-tight md:max-w-2/3 lg:text-2xl">
              {title}
            </h1>
            <div className="hidden items-center gap-3 md:flex">
              <ButtonGroup
                items={[
                  <DatasetDownloadButton
                    datasetName={title}
                    dataset={dataset}
                  />,
                  <URLCopyButton />,
                ]}
              />
              <DesktopOnly>
                <GivenRoutesOnly
                  pathnames={[
                    `/${locale}`,
                    `/${locale}/${lowerCasedCollectionKey}`,
                    `/${locale}/search`,
                  ]}
                >
                  <LayoutConsumer>
                    {(layoutContext) => (
                      <LayoutSelect
                        className="w-auto border-primary/20"
                        value={layoutContext.key}
                        onValueChange={(value) => layoutContext.setKey(value)}
                      />
                    )}
                  </LayoutConsumer>
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
