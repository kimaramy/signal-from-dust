'use client';

import { useEffect } from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import CodeBlock from '@/components/CodeBlock';

type RuntimeError = Error & { digest?: string };

interface ErrorContainerProps {
  error: RuntimeError | string;
  reset: (...args: unknown[]) => void;
}

function ErrorContainer({ error, reset }: ErrorContainerProps) {
  const { dictionary } = useLocaleDictionary();

  const serializedError =
    typeof error === 'string' ? error : JSON.stringify(error, null, 2);

  useEffect(() => {
    // console.error(serializedError); // Log the error
  }, [serializedError]);

  return (
    <section className="space-y-4 bg-primary p-2">
      <div className="flex items-center gap-4">
        <h3 className="flex items-center text-[1em] leading-snug text-primary-foreground">
          <Icon.AlertCircle aria-hidden className="mr-1 inline-block h-4 w-4" />
          {dictionary.error.title}
        </h3>
        <Button
          variant="secondary"
          size="icon"
          className="h-6 w-6 rounded-full"
          onClick={() => reset()}
        >
          <Icon.RefreshCcw aria-hidden className="h-3.5 w-3.5" />
          <span className="sr-only">{dictionary.error.ok_btn}</span>
        </Button>
      </div>
      <CodeBlock text={serializedError} />
    </section>
  );
}

export type { ErrorContainerProps };

export default ErrorContainer;
