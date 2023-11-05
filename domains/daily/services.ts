import { supabaseClient } from '../supabaseClient';
import type { DailyData } from '../types';

export const fetchDailyDataset = async (month: number) => {
  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('month', month)
    .returns<DailyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('id', dataId)
    .returns<DailyData>();

  if (response.error) throw response;

  return response.data;
};
