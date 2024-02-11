import { Model, SeasonUtils, supabaseClient } from '@/lib/model';

import { getFetchOptions, type FetchOptions } from '../utils';

export const fetchMonthlyDataset = async (
  year: number,
  fetchOptions?: FetchOptions
) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .abortSignal(signal)
    .returns<Model.MonthlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchMonthlyDatasetBySeason = async (
  params: {
    year: number;
    monthRange: number[];
    seasonKey: SeasonUtils.Key;
  },
  fetchOptions?: FetchOptions
): Promise<Model.SeasonalData> => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', params.year)
    .in('month', params.monthRange)
    .abortSignal(signal)
    .returns<Model.MonthlyData[]>();

  if (response.error) throw response.error;

  return { [params.seasonKey]: response.data };
};

export const fetchMonthlyData = async (
  dataId: number,
  fetchOptions?: FetchOptions
) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('id', dataId)
    .abortSignal(signal)
    .returns<Model.MonthlyData>();

  if (response.error) throw response.error;

  return response.data;
};
