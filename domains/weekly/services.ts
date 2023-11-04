import { yearSchema, type YearKey } from '@/components/year';

import { supabaseClient } from '../supabaseClient';
import type { WeeklyData } from '../types';

export const fetchWeeklyDataList = async (yearKey: YearKey) => {
  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('year', yearSchema.getValue(yearKey))
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
