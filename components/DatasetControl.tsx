'use client';

import { useLayoutEffect, useState } from 'react';

import { cn } from '@/lib/css';
import { CollectionUtils } from '@/lib/model';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Menu from '@/components/Menu';

interface DatasetControlProps extends React.HTMLAttributes<HTMLDivElement> {
  datasetKeys: Readonly<[CollectionUtils.Key, ...string[]]>;
  dataset: object[];
}

function DatasetControl({
  dataset,
  datasetKeys,
  className,
  ...rest
}: DatasetControlProps) {
  const [title, setTitle] = useState('');

  const isSticky = CollectionUtils.schema.getDataCount(datasetKeys[0]) > 30;

  useLayoutEffect(() => {
    setTitle(document.title);
  }, []);

  return (
    <header
      className={cn(
        'left-0 top-0 z-50 flex w-full justify-between border-b border-border px-6 py-4 dark:border-white/20',
        isSticky ? 'bg-white/15 sticky backdrop-blur' : 'fixed',
        className
      )}
      {...rest}
    >
      <div className="flex gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <DatasetDownloadButton dataset={dataset} datasetKeys={datasetKeys} />
      </div>
      <Menu />
    </header>
  );
}

export default DatasetControl;
