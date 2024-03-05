import { Model, SeasonUtils, supabaseClient } from '@/lib/model';

import { fetcher } from '../utils';

export const fetchMonthlyDataset = fetcher(
  async (params: { year: number }, options) => {
    const response = await supabaseClient
      .from('monthly')
      .select('*')
      .eq('year', params.year)
      .abortSignal(options.signal);

    if (response.error) throw response.error;

    return response.data;
  }
);

export const fetchMonthlyDatasetBySeason = fetcher<
  { year: number; monthRange: number[]; seasonKey: SeasonUtils.Key },
  Promise<Model.SeasonalData>
>(async (params, options) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', params.year)
    .in('month', params.monthRange)
    .abortSignal(options.signal);

  if (response.error) throw response.error;

  return { [params.seasonKey]: response.data };
});

export const fetchMonthlyData = fetcher(
  async (params: { dataId: number }, options) => {
    const response = await supabaseClient
      .from('monthly')
      .select('*')
      .eq('id', params.dataId)
      .abortSignal(options.signal)
      .single();

    if (response.error) throw response.error;

    return response.data;
  }
);
