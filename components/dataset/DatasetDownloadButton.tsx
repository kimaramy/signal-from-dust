'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import JsonToCsvButton, { getParserOptions } from './JsonToCsvButton';

interface DatasetDownloadButtonProps extends ButtonProps {
  dataset: object[];
  datasetKeys: ReadonlyArray<string>;
  iconClassName?: string;
}

function DatasetDownloadButton({
  dataset,
  datasetKeys,
  iconClassName,
  ...rest
}: DatasetDownloadButtonProps) {
  const { dictionary } = useLocaleDictionary();

  const label = dictionary.dataset.download_btn;

  const selectedFields = Object.keys(dataset[0]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <JsonToCsvButton
            json={dataset}
            fileName={`${datasetKeys.join('_')}.csv`}
            label={label}
            parserOptions={getParserOptions(selectedFields)}
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
