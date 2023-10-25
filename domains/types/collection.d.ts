import type { Database } from './supabase';

export type Tables = Database['public']['Tables'];

export type TableKeys = keyof Tables;

export type DailyData = Tables['daily']['Row'];

export type WeekDailyData = Tables['weekdaily']['Row'];

export type WeeklyData = Tables['weekly']['Row'];

export type MonthlyData = Tables['monthly']['Row'];

export type YearlyData = Tables['yearly']['Row'];
