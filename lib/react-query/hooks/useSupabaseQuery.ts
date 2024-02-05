import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { PostgrestError } from '@/lib/model';

export type UseSupabaseQueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, PostgrestError, TData, TQueryKey>;

export function useSupabaseQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseSupabaseQueryOptions<TQueryFnData, TData, TQueryKey>) {
  return useQuery(options);
}
