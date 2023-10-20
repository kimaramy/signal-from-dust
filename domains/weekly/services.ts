import { supabaseClient } from '../supabaseClient';
import type { WeeklyData } from '../types';

export const fetchWeeklyDataList = async (year: number) => {
  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('year', year)
    .returns<WeeklyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchWeeklyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('id', dataId)
    .returns<WeeklyData>();

  if (response.error) throw response;

  return response.data;
};
