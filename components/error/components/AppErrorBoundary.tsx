'use client';

import React, { useCallback, useEffect } from 'react';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { PostgrestError, postgrestErrorSchema } from '@/lib/model';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code';

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export interface AppError {
  error: (Error & { digest?: string }) | string;
  reset: (...args: unknown[]) => void;
}

type AppErrorBoundaryProps = AppError & {
  className?: string;
  resetQuery?: () => void;
};

/**
 * https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
function AppErrorBoundary({
  error,
  className,
  reset,
  resetQuery,
}: AppErrorBoundaryProps) {
  const { dictionary } = useLocaleDictionary();

  let serializedError =
    typeof error === 'string' ? error : JSON.stringify(error, null, 2);

  const isQueryError = postgrestErrorSchema.safeParse(error).success;

  if (isQueryError) {
    const { code, message } = error as unknown as PostgrestError;
    serializedError = `[${code}] ${message}}`;
  }

  const handleReset = useCallback(() => {
    if (isQueryError) {
      resetQuery?.();
    } else {
      reset();
    }
  }, [isQueryError, resetQuery, reset]);

  useEffect(() => {
    console.error(serializedError);
  }, [serializedError]);

  return (
    <div
      className={cn(
        'flex h-auto w-full items-center justify-center bg-primary',
        className
      )}
    >
      <section className="space-y-4 p-4">
        <div className="flex flex-nowrap items-center justify-between gap-4">
          <h3 className="flex items-center text-[1em] leading-snug text-primary-foreground">
            {dictionary.error.title}
          </h3>
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 flex-none"
            onClick={handleReset}
          >
            <Icon.RefreshCcw aria-hidden className="h-3.5 w-3.5" />
            <span className="sr-only">{dictionary.error.ok_btn}</span>
          </Button>
        </div>
        <CodeBlock text={serializedError} />
      </section>
    </div>
  );
}

export default AppErrorBoundary;
