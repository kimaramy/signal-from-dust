import { supabaseClient } from '@/lib/model';

import { fetcher } from '../utils';

export const fetchWeeklyDataset = fetcher(
  async (params: { year: number }, options) => {
    const response = await supabaseClient
      .from('weekly')
      .select('*')
      .eq('year', params.year)
      .abortSignal(options.signal);

    if (response.error) throw response.error;

    return response.data;
  }
);

export const fetchWeeklyData = fetcher(
  async (params: { dataId: number }, options) => {
    const response = await supabaseClient
      .from('weekly')
      .select('*')
      .eq('id', params.dataId)
      .abortSignal(options.signal)
      .single();

    if (response.error) throw response.error;

    return response.data;
  }
);
