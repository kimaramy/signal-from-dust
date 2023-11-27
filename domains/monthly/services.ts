import type { MonthlyData } from '..';
import { supabaseClient } from '../supabaseClient';

export const fetchMonthlyDataset = async (year: number) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchMonthlyDatasetBySeason = async (
  year: number,
  months: number[]
) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .in('month', months)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchMonthlyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('id', dataId)
    .returns<MonthlyData>();

  if (response.error) throw response;

  return response.data;
};
