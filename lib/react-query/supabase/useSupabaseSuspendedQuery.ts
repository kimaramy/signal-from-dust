import { type QueryKey } from '@tanstack/react-query';

import {
  useSupabaseQuery,
  type UseSupabaseQueryOptions,
} from './useSupabaseQuery';

export type UseSupabaseSuspendedQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSupabaseQueryOptions<TQueryFnData, TData, TQueryKey>,
  'suspense' | 'useErrorBoundary' | 'onError'
>;

export function useSupabaseSuspendedQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseSuspendedQueryOptions<TQueryFnData, TData, TQueryKey>) {
  const { isLoading, isFetching, isError, error, ...others } = useSupabaseQuery(
    {
      useErrorBoundary: true,
      suspense: true,
      ...options,
    }
  );
  return others;
}
