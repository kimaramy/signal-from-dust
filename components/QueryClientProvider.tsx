'use client';

import { useState } from 'react';
import { SupabaseError, SupabaseErrorSchema } from '@/domains';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

type QueryClientProviderProps = {
  children: React.ReactNode;
};

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          suspense: false,
          useErrorBoundary: false,
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          useErrorBoundary: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError(unknownError, unknownQuery) {
          let errorMessage =
            (unknownQuery.meta?.errorMessage as string) ??
            (unknownError as Error)?.message ??
            '';

          const isSupabaseError =
            SupabaseErrorSchema.safeParse(unknownError).success;

          if (isSupabaseError) {
            const { error } = unknownError as SupabaseError;
            errorMessage = `[${error.code}] ${error.message}`;
          }

          toast.error(errorMessage);
        },
      }),
      mutationCache: new MutationCache({
        onError(
          unknownError,
          _unknownVariables,
          _unknownContext,
          unknownMutation
        ) {
          let errorMessage =
            (unknownMutation.meta?.errorMessage as string) ??
            (unknownError as Error)?.message ??
            '';

          const isSupabaseError =
            SupabaseErrorSchema.safeParse(unknownError).success;

          if (isSupabaseError) {
            const { error } = unknownError as SupabaseError;
            errorMessage = `[${error.code}] ${error.message}`;
          }

          toast.error(errorMessage);
        },
      }),
    })
  );

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ReactQueryClientProvider>
  );
}
