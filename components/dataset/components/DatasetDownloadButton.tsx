'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import JsonToCsvButton, { createParserOptions } from './JsonToCsvButton';

interface DatasetDownloadButtonProps extends ButtonProps {
  dataset: object[];
  datasetName: string;
  iconClassName?: string;
}

function DatasetDownloadButton({
  dataset,
  datasetName,
  iconClassName,
  ...rest
}: DatasetDownloadButtonProps) {
  const { dictionary } = useLocaleDictionary();

  const label = dictionary.dataset.download_btn;

  const selectedFields =
    dataset.length > 0 && Object.keys(dataset[0]).length > 0
      ? Object.keys(dataset[0])
      : undefined;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger tabIndex={-1} className="outline-none">
          <JsonToCsvButton
            json={dataset}
            fileName={`${datasetName.replace(/\s/g, '_')}.csv`}
            parserOptions={createParserOptions(selectedFields)}
            label={label}
            iconClassName={iconClassName}
            {...rest}
          />
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DatasetDownloadButton;
