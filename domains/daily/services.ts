import { monthSchema, type MonthKey } from '@/components/month';

import { supabaseClient } from '../supabaseClient';
import type { DailyData } from '../types';

export const fetchDailyDataList = async (monthKey: MonthKey) => {
  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('month', monthSchema.getValue(monthKey))
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
