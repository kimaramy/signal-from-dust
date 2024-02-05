import { type QueryKey } from '@tanstack/react-query';

import {
  useSupabaseInfiniteQuery,
  type UseSupabaseInfiniteQueryOptions,
} from './useSupabaseInfiniteQuery';

export type UseSupabaseSuspenseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSupabaseInfiniteQueryOptions<TQueryFnData, TData, TQueryKey>,
  'suspense' | 'useErrorBoundary' | 'onError'
>;

export function useSupabaseSuspenseInfiniteQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSupabaseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    TData,
    TQueryKey
  >
) {
  const { isLoading, isFetching, isError, error, ...others } =
    useSupabaseInfiniteQuery({
      useErrorBoundary: true,
      suspense: true,
      ...options,
    });
  return others;
}
