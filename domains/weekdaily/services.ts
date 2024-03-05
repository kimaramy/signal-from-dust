import { supabaseClient } from '@/lib/model';

import { fetcher } from '../utils';

export const fetchWeekDailyDataset = fetcher(
  async ({ month }: { month: number }, { signal }) => {
    const response = await supabaseClient
      .from('weekdaily')
      .select('*')
      .eq('month', month)
      .abortSignal(signal);

    if (response.error) throw response.error;

    return response.data;
  }
);

export const fetchWeekDailyData = fetcher(
  async ({ dataId }: { dataId: number }, { signal }) => {
    const response = await supabaseClient
      .from('weekdaily')
      .select('*')
      .eq('id', dataId)
      .abortSignal(signal)
      .single();

    if (response.error) throw response.error;

    return response.data;
  }
);
