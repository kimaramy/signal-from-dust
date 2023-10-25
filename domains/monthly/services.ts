import { getMonthRangeBySeason, type Season } from '@/components/season';
import { type Year } from '@/components/year';

import { supabaseClient } from '../supabaseClient';
import type { MonthlyData } from '../types';

export const fetchMonthlyDataList = async (year: Year) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  return response.data;
};

export const fetchMonthlyDataListBySeason = async (
  year: Year,
  season: Season
) => {
  const monthRange = getMonthRangeBySeason(season);

  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .in('month', monthRange)
    .returns<MonthlyData[]>();

  if (response.error) throw response;

  if (season === 'Winter') {
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
