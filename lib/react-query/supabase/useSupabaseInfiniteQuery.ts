import {
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';

import type { PostgrestError } from '@/lib/model';

/**
 * @alias UseSbIQOptions
 * @description Abbreviation of UseSupabaseInfiniteQueryOptions
 */
type UseSupabaseInfiniteQueryOptions<
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

/**
 * @alias useSbIQ
 * @description Abbreviation of useSupabaseInfiniteQuery
 */
function useSupabaseInfiniteQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseInfiniteQueryOptions<TQueryFnData, TData, TQueryKey>) {
  return useInfiniteQuery(options);
}

export { useSupabaseInfiniteQuery as useSbIQ };
export type { UseSupabaseInfiniteQueryOptions as UseSbIQOptions };
