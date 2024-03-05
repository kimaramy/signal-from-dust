import { supabaseClient } from '@/lib/model';

import { fetcher } from '../utils';

export const fetchYearlyDataset = fetcher(async (_, { signal }) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .abortSignal(signal);

  if (response.error) throw response.error;

  return response.data;
});

export const fetchYearlyData = fetcher(
  async (params: { dataId: number }, options) => {
    const response = await supabaseClient
      .from('yearly')
      .select('*')
      .eq('id', params.dataId)
      .abortSignal(options.signal)
      .single();

    if (response.error) throw response.error;

    return response.data;
  }
);

export const fetchDistinctYearDataset = fetcher(async (_, { signal }) => {
  const response = await supabaseClient
    .from('distinct_year')
    .select()
    .abortSignal(signal);

  if (response.error) throw response.error;

  return response.data;
});
