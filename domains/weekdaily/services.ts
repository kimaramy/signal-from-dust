import type { WeekDailyData } from '..';
import { supabaseClient } from '../supabaseClient';

export const fetchWeekDailyDataset = async (month: number) => {
  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('month', month)
    .returns<WeekDailyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchWeekDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('id', dataId)
    .returns<WeekDailyData>();

  if (response.error) throw response.error;

  return response.data;
};
