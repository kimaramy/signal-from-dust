'use client';

import { SupabaseError, SupabaseErrorSchema } from '@/domains';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBox from './ErrorBox';

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
                  <ErrorBox>
                    [{supabaseError.error.code}] {supabaseError.error.message}
                  </ErrorBox>
                );
              }
              return <ErrorBox>{JSON.stringify(error, null, 2)}</ErrorBox>;
            }}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}
