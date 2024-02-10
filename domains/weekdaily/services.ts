import { Model, supabaseClient } from '@/lib/model';

import { getFetchOptions, type FetchOptions } from '../utils';

export const fetchWeekDailyDataset = async (
  month: number,
  options?: FetchOptions
) => {
  const { signal } = getFetchOptions(options);

  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('month', month)
    .abortSignal(signal)
    .returns<Model.WeekDailyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchWeekDailyData = async (
  dataId: number,
  options?: FetchOptions
) => {
  const { signal } = getFetchOptions(options);

  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('id', dataId)
    .abortSignal(signal)
    .returns<Model.WeekDailyData>();

  if (response.error) throw response.error;

  return response.data;
};
