import { cache } from 'react';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { postgrestErrorSchema, type PostgrestError } from '@/lib/model';
import { toast } from '@/lib/toast';

export const getQueryClient = cache(() => new QueryClient());

export function getSupabaseQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
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

        const isPostgrestError =
          postgrestErrorSchema.safeParse(unknownError).success;

        if (isPostgrestError) {
          const error = unknownError as PostgrestError;
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

        const isPostgrestError =
          postgrestErrorSchema.safeParse(unknownError).success;

        if (isPostgrestError) {
          const error = unknownError as PostgrestError;
          errorMessage = `[${error.code}] ${error.message}`;
        }

        toast.error(errorMessage);
      },
    }),
  });
}
