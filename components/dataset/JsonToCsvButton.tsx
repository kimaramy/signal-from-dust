'use client';

import React, { useCallback, useState } from 'react';
import { Parser, type ParserOptions } from '@json2csv/plainjs';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Link } from '@/lib/router';
import { toast } from '@/lib/toast';
import { Button, type ButtonProps } from '@/components/ui/button';

type CsvFileName = `${string}.csv`;

interface JsonToCsvButtonProps<TData extends object = object>
  extends Omit<ButtonProps, 'onClick'> {
  json: TData[];
  fileName: CsvFileName;
  label: string;
  parserOptions?: ParserOptions<TData>;
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
        const parser = new Parser(parserOptions);
        const csv = parser.parse(json);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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

const getParserOptions = (selectedFields?: string[]): ParserOptions => {
  return {
    fields: selectedFields?.map((field) => ({
      label: field,
      value: field,
    })),
  };
};

export { getParserOptions };

export type { CsvFileName };

export default JsonToCsvButton;
