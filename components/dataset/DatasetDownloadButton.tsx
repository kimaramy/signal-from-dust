'use client';

import { useTitle } from '@/lib/hooks';
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
  iconClassName?: string;
}

function DatasetDownloadButton({
  dataset,
  iconClassName,
  ...rest
}: DatasetDownloadButtonProps) {
  const title = useTitle();

  const { dictionary } = useLocaleDictionary();

  const label = dictionary.dataset.download_btn;

  const selectedFields = Object.keys(dataset[0]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <JsonToCsvButton
            json={dataset}
            fileName={`${title.replace(/\s/g, '_')}.csv`}
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
