import { supabaseClient } from '../supabaseClient';
import type { MonthlyData } from '../types';

export const fetchMonthlyDataList = async (year: number) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
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
