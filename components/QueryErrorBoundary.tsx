'use client';

import { SupabaseError, SupabaseErrorSchema } from '@/domains';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

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

              const isSupabaseError =
                SupabaseErrorSchema.safeParse(error).success;

              if (isSupabaseError) {
                const supabaseError = error as SupabaseError;
                serializedError = `[${supabaseError.error.code}] ${supabaseError.error.message}}`;
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
