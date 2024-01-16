'use client';

import { useTitle } from '@/lib/hooks';
import { CollectionUtils } from '@/lib/model';
import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import { DatasetDownloadButton } from '@/components/dataset';
import { Header, Menu } from '@/components/layout';

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
      <SafeArea className="flex justify-between p-4">
        <div className="flex items-center gap-6 xl:gap-8">
          <h1 className="text-lg font-bold md:text-xl xl:text-2xl">{title}</h1>
          <ButtonGroup
            items={[
              <DatasetDownloadButton
                dataset={dataset}
                datasetKeys={datasetKeys}
              />,
              <URLCopyButton />,
            ]}
          />
        </div>
        <Menu />
      </SafeArea>
    </Header>
  );
}

export default DatasetControl;
