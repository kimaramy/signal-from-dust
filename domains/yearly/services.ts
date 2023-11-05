import { supabaseClient } from '../supabaseClient';
import type { YearlyData } from '../types';

export const fetchYearlyDataset = async (filters?: unknown) => {
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
