'use client';

import { useEffect } from 'react';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code';

type RuntimeError = Error & { digest?: string };

interface ErrorContainerProps {
  error: RuntimeError | string;
  reset: (...args: unknown[]) => void;
  className?: string;
}

function ErrorContainer({ error, reset, className }: ErrorContainerProps) {
  const { dictionary } = useLocaleDictionary();

  const serializedError =
    typeof error === 'string' ? error : JSON.stringify(error, null, 2);

  useEffect(() => {
    // console.error(serializedError); // Log the error
  }, [serializedError]);

  return (
    <div
      className={cn(
        'flex h-auto w-full items-center justify-center bg-primary',
        className
      )}
    >
      <section className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-[1em] leading-snug text-primary-foreground">
            <Icon.AlertCircle
              aria-hidden
              className="mr-1.5 inline-block h-[1.1em] w-[1.1em]"
            />
            {dictionary.error.title}
          </h3>
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6"
            onClick={() => reset()}
          >
            <Icon.RefreshCcw aria-hidden className="h-3.5 w-3.5" />
            <span className="sr-only">{dictionary.error.ok_btn}</span>
          </Button>
        </div>
        <CodeBlock text={serializedError} className="p-4" />
      </section>
    </div>
  );
}

export type { ErrorContainerProps };

export default ErrorContainer;
