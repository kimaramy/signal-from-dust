import { monthSchema, type MonthKey } from '@/components/month';

import { supabaseClient } from '../supabaseClient';
import type { WeekDailyData } from '../types';

export const fetchWeekDailyDataList = async (monthKey: MonthKey) => {
  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('month', monthSchema.getValue(monthKey))
    .returns<WeekDailyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchWeekDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('weekdaily')
    .select('*')
    .eq('id', dataId)
    .returns<WeekDailyData>();

  if (response.error) throw response;

  return response.data;
};
