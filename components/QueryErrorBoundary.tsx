'use client';

import { SupabaseError, SupabaseErrorSchema } from '@/domains';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

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
                  <div>
                    <code className="flex rounded bg-gray-100 p-4 font-mono text-xs">
                      [{supabaseError.error.code}] {supabaseError.error.message}
                    </code>
                  </div>
                );
              }
              return (
                <div>
                  <code className="flex rounded bg-gray-100 p-4 font-mono text-xs">
                    {JSON.stringify(error, null, 2)}
                  </code>
                </div>
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
