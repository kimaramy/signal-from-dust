'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { postgrestErrorSchema, type PostgrestError } from '@/lib/react-query';
import ErrorContainer from '@/components/ErrorContainer';

function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={() => reset()}
            fallbackRender={({ error, resetErrorBoundary }) => {
              let serializedError = JSON.stringify(error, null, 2);

              const isPostgrestError =
                postgrestErrorSchema.safeParse(error).success;

              if (isPostgrestError) {
                const { code, message } = error as PostgrestError;
                serializedError = `[${code}] ${message}}`;
              }
              return (
                <ErrorContainer
                  error={serializedError}
                  reset={resetErrorBoundary}
                />
              );
            }}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

export default QueryErrorBoundary;
