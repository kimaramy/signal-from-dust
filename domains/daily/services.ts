import { Model, supabaseClient } from '@/lib/model';

import { getFetchOptions, type FetchOptions } from '../utils';

export const fetchDailyDataset = async (
  month: number,
  options?: FetchOptions
) => {
  const { signal } = getFetchOptions(options);

  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('month', month)
    .abortSignal(signal)
    .returns<Model.DailyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchDailyData = async (
  dataId: number,
  options?: FetchOptions
) => {
  const { signal } = getFetchOptions(options);

  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('id', dataId)
    .abortSignal(signal)
    .returns<Model.DailyData>();

  if (response.error) throw response.error;

  return response.data;
};
