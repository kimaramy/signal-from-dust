import { SeasonUtils } from '../../schema';
import type { Database } from './supabase';

type Tables = Database['public']['Tables'];

type Views = Database['public']['Views'];

export namespace Model {
  export type TableKeys = keyof Tables;
  export type ViewKeys = keyof Views;
  export type DailyData = Tables['daily']['Row'];
  export type WeekDailyData = Tables['weekdaily']['Row'];
  export type WeeklyData = Tables['weekly']['Row'];
  export type MonthlyData = Tables['monthly']['Row'];
  export type SeasonalData = { [key in SeasonUtils.Key]?: Model.MonthlyData[] };
  export type YearlyData = Tables['yearly']['Row'];
  export type DistinctYearData = Views['distinct_year']['Row'];
}
