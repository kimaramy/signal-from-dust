'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import {
  parseJsonToCsv,
  type CsvFileName,
  type JsonToCsvParserOptions,
} from '@/lib/parsers';
import { Link } from '@/lib/router';
import { toast } from '@/lib/toast';
import { Button, type ButtonProps } from '@/components/ui/button';

function createParserOptions<T extends object = object>(
  selectedFields?: string[]
): JsonToCsvParserOptions<T> {
  return {
    fields: selectedFields?.map((field) => ({
      label: field,
      value: field,
    })),
  };
}

interface JsonToCsvButtonProps<TData extends object = object>
  extends Omit<ButtonProps, 'onClick'> {
  json: TData[];
  fileName: CsvFileName;
  parserOptions?: JsonToCsvParserOptions<TData>;
  label: string;
  iconClassName?: string;
}

function JsonToCsvButton<TData extends object = object>({
  json,
  fileName,
  label,
  parserOptions,
  iconClassName,
  ...rest
}: JsonToCsvButtonProps<TData>) {
  const [fileURL, setFileURL] = useState('#');

  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (evt) => {
      try {
        const blob = parseJsonToCsv(json, parserOptions);
        setFileURL(URL.createObjectURL(blob));
      } catch (err) {
        evt.preventDefault(); // prevent link action
        console.error(err);
        toast.error(`Can't download given dataset.`);
      }
    },
    [json, parserOptions]
  );

  return (
    <Button variant="ghost" size="icon" asChild {...rest}>
      <Link href={fileURL} download={fileName} onClick={handleClick}>
        <Icon.Download aria-hidden className={cn('h-4 w-4', iconClassName)} />
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}

export { createParserOptions };

export type { CsvFileName };

export default JsonToCsvButton;
