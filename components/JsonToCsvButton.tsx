'use client';

import React, { useCallback, useState } from 'react';
import { Parser, type ParserOptions } from '@json2csv/plainjs';
import { toast } from 'react-hot-toast';

import { Link } from '@/lib/router';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface JsonToCsvButtonProps<TData extends object = object>
  extends Omit<ButtonProps, 'onClick'> {
  json: TData[];
  fileName: `${string}.csv`;
  parserOptions?: ParserOptions<TData>;
}

function JsonToCsvButton<TData extends object = object>({
  json,
  fileName,
  parserOptions,
  ...rest
}: JsonToCsvButtonProps<TData>) {
  const [fileURL, setFileURL] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    try {
      const parser = new Parser(parserOptions);
      const csv = parser.parse(json);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      setFileURL(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      toast.error(
        `Can't download given dataset. Received ${JSON.stringify(
          json,
          null,
          2
        )}`
      );
    }
  }, [json, parserOptions]);

  return (
    <Button variant="ghost" size="icon" asChild {...rest}>
      <Link
        href={fileURL ?? 'javascript:void(0);'}
        download={fileName}
        onClick={handleClick}
      >
        <Icon.Download aria-hidden className="h-4 w-4" />
        <span className="sr-only">Download this dataset</span>
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

export default JsonToCsvButton;
