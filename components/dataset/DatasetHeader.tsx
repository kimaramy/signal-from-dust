import { ButtonGroup } from '@/components/ui/group';
import { SafeArea } from '@/components/ui/safe-area';
import { URLCopyButton } from '@/components/clipboard';
import { DatasetDownloadButton } from '@/components/dataset';
import { Header, Menu } from '@/components/layout';

interface DatasetHeaderProps {
  title: string;
  dataset: object[];
}

function DatasetHeader({ title, dataset }: DatasetHeaderProps) {
  return (
    <Header position={dataset.length > 30 ? 'sticky' : 'fixed'}>
      <SafeArea className="flex justify-between p-4">
        <div className="flex w-full items-center gap-6 xl:gap-8">
          <h1 className="max-w-1/2 truncate text-xl font-bold lg:text-2xl">
            {title}
          </h1>
          <ButtonGroup
            items={[
              <DatasetDownloadButton
                dataset={dataset}
                fileName={`${title.replace(/\s/g, '_')}.csv`}
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

export default DatasetHeader;
