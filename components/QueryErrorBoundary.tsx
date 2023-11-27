'use client';

import { SupabaseError, SupabaseErrorSchema } from '@/domains';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorCode from '@/components/ErrorCode';

type QueryErrorBoundaryProps = {
  children: React.ReactNode;
};

export default function QueryErrorBoundary({
  children,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={() => reset()}
            fallbackRender={({ error }) => {
              const isSupabaseError =
                SupabaseErrorSchema.safeParse(error).success;

              if (isSupabaseError) {
                const supabaseError = error as unknown as SupabaseError;
                return (
                  <ErrorCode
                    text={`[${supabaseError.error.code}] ${supabaseError.error.message}}`}
                  />
                );
              }
              return <ErrorCode text={JSON.stringify(error, null, 2)} />;
            }}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}
