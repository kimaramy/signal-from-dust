import { Model, supabaseClient } from '@/lib/model';

export const fetchYearlyDataset = async (params?: unknown) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .returns<Model.YearlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchYearlyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('yearly')
    .select('*')
    .eq('id', dataId)
    .returns<Model.YearlyData>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchDistinctYearDataset = async () => {
  const response = await supabaseClient
    .from('distinct_year')
    .select()
    .returns<Model.DistinctYearData[]>();

  if (response.error) throw response.error;

  return response.data;
};
