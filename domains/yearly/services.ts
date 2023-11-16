import type { DistinctYearData, YearlyData } from '..';
import { supabaseClient } from '../supabaseClient';

export const fetchYearlyDataset = async (params?: unknown) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .returns<YearlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchYearlyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .eq('id', dataId)
    .returns<YearlyData>();

  if (response.error) throw response;

  return response.data;
};

export const fetchDistinctYearDataset = async () => {
  const response = await supabaseClient
    .from('distinct_year')
    .select()
    .returns<DistinctYearData[]>();

  if (response.error) throw response;

  return response.data;
};
