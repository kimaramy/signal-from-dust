import { Model, supabaseClient } from '@/lib/model';

export const fetchMonthlyDataset = async (year: number) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .returns<Model.MonthlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchMonthlyDatasetBySeason = async (
  year: number,
  months: number[]
) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('year', year)
    .in('month', months)
    .returns<Model.MonthlyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchMonthlyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('monthly')
    .select('*')
    .eq('id', dataId)
    .returns<Model.MonthlyData>();

  if (response.error) throw response.error;

  return response.data;
};
