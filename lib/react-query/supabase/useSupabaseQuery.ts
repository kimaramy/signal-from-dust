import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { PostgrestError } from '@/lib/model';

/**
 * @alias UseSbQOptions
 * @description Abbreviation of UseSupabaseQueryOptions
 */
type UseSupabaseQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, PostgrestError, TData, TQueryKey>;

/**
 * @alias useSbQ
 * @description Abbreviation of useSupabaseQuery
 */
function useSupabaseQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseQueryOptions<TQueryFnData, TData, TQueryKey>) {
  return useQuery(options);
}

export { useSupabaseQuery as useSbQ };
export type { UseSupabaseQueryOptions as UseSbQOptions };
