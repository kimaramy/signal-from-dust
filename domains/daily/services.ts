import { supabaseClient } from '@/lib/model';

import { fetcher } from '../utils';

export const fetchDailyDataset = fetcher(
  async (params: { month: number }, options) => {
    const response = await supabaseClient
      .from('daily')
      .select('*')
      .eq('month', params.month)
      .abortSignal(options.signal);

    if (response.error) throw response.error;

    return response.data;
  }
);

export const fetchDailyData = fetcher(
  async (params: { dataId: number }, { signal }) => {
    const response = await supabaseClient
      .from('daily')
      .select('*')
      .eq('id', params.dataId)
      .abortSignal(signal)
      .single();

    if (response.error) throw response.error;

    return response.data;
  }
);
