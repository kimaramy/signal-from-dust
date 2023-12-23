import { AppData, supabaseClient } from '@/lib/model';

export const fetchYearlyDataset = async (params?: unknown) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .returns<AppData.YearlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchYearlyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .eq('id', dataId)
    .returns<AppData.YearlyData>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchDistinctYearDataset = async () => {
  const response = await supabaseClient
    .from('distinct_year')
    .select()
    .returns<AppData.DistinctYearData[]>();

  if (response.error) throw response.error;

  return response.data;
};
