import { Model, supabaseClient } from '@/lib/model';

import { getFetchOptions, type FetchOptions } from '../utils';

export const fetchYearlyDataset = async (fetchOptions?: FetchOptions) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .abortSignal(signal)
    .returns<Model.YearlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchYearlyData = async (
  dataId: number,
  fetchOptions?: FetchOptions
) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .eq('id', dataId)
    .abortSignal(signal)
    .returns<Model.YearlyData>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchDistinctYearDataset = async (fetchOptions?: FetchOptions) => {
  const { signal } = getFetchOptions(fetchOptions);

  const response = await supabaseClient
    .from('distinct_year')
    .select()
    .abortSignal(signal)
    .returns<Model.DistinctYearData[]>();

  if (response.error) throw response.error;

  return response.data;
};
