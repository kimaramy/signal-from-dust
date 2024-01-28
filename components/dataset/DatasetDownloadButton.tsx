'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import JsonToCsvButton, {
  getParserOptions,
  type CsvFileName,
} from './JsonToCsvButton';

interface DatasetDownloadButtonProps extends ButtonProps {
  dataset: object[];
  fileName: CsvFileName;
  iconClassName?: string;
}

function DatasetDownloadButton({
  dataset,
  fileName,
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
        <TooltipTrigger>
          <JsonToCsvButton
            json={dataset}
            fileName={fileName}
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
