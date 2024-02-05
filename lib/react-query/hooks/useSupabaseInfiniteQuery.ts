import {
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import type { PostgrestError } from '@/lib/model';

export type UseSupabaseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseInfiniteQueryOptions<
  TQueryFnData,
  PostgrestError,
  TData,
  TQueryFnData,
  TQueryKey
>;

export function useSupabaseInfiniteQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseInfiniteQueryOptions<TQueryFnData, TData, TQueryKey>) {
  return useInfiniteQuery(options);
}
