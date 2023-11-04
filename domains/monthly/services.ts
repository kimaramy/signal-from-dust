import { seasonSchema, type SeasonValue } from '@/components/season';
import { type Year } from '@/components/year';

import { supabaseClient } from '../supabaseClient';
import type { MonthlyData } from '../types';

export const fetchMonthlyDataset = async (yearValue: Year) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', yearValue)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchMonthlyDatasetBySeason = async (
  yearValue: Year,
  seasonValue: SeasonValue
) => {
  const monthRange = seasonSchema.getMonthRange(
    seasonSchema.getKeyByValue(seasonValue)
  );

  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', yearValue)
    .in('month', monthRange)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  if (seasonValue === 'winter') {
    const decemberData = response.data.pop()!;
    response.data.unshift(decemberData);
    return response.data;
  }

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
