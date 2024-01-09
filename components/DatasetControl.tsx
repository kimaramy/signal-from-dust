'use client';

import { useTitle } from '@/lib/hooks';
import { CollectionUtils } from '@/lib/model';
import { SafeArea } from '@/components/ui/safe-area';
import DatasetDownloadButton from '@/components/DatasetDownloadButton';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

interface DatasetControlProps {
  datasetKeys: Readonly<[CollectionUtils.Key, ...string[]]>;
  dataset: object[];
}

function DatasetControl({ dataset, datasetKeys }: DatasetControlProps) {
  const title = useTitle();

  const isDailyOrWeekly =
    CollectionUtils.schema.getDataCount(datasetKeys[0]) > 30;

  return (
    <Header position={isDailyOrWeekly ? 'sticky' : 'fixed'}>
      <SafeArea className="flex justify-between py-4 md:px-4">
        <div className="flex gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <DatasetDownloadButton dataset={dataset} datasetKeys={datasetKeys} />
        </div>
        <Menu />
      </SafeArea>
    </Header>
  );
}

export default DatasetControl;
