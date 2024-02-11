import { Model, supabaseClient } from '@/lib/model';

import { getFetchOptions, type FetchOptions } from '../utils';

export const fetchWeeklyDataset = async (
  year: number,
  fetchOptions?: FetchOptions
) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('year', year)
    .abortSignal(signal)
    .returns<Model.WeeklyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchWeeklyData = async (
  dataId: number,
  fetchOptions?: FetchOptions
) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('id', dataId)
    .abortSignal(signal)
    .returns<Model.WeeklyData>();

  if (response.error) throw response.error;

  return response.data;
};
