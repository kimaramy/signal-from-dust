import { seasonSchema, type SeasonKey } from '@/components/season';
import { yearSchema, type YearKey } from '@/components/year';

import { supabaseClient } from '../supabaseClient';
import type { MonthlyData } from '../types';

export const fetchMonthlyDataset = async (yearKey: YearKey) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', yearSchema.getValue(yearKey))
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchMonthlyDatasetBySeason = async (
  yearKey: YearKey,
  seasonKey: SeasonKey
) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', yearSchema.getValue(yearKey))
    .in('month', seasonSchema.getMonthRange(seasonKey))
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  if (seasonKey === 'WINTER') {
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
