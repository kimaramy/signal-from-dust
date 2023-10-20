import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum QueryParamEnum {
  DataUnit = 'q',
  Year = 'year',
  Month = 'month',
  Location = 'loc',
}

export function toOrdinalNumberName(num: number) {
  switch (num) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

export function toMonthName(num: number, length: 'long' | 'short' = 'short') {
  const date = new Date();
  date.setMonth(num - 1);
  return date.toLocaleString('ko-KR', { month: length });
}

export const isServer = typeof window === 'undefined';

export function isValidJson(value: string) {
  try {
    return JSON.parse(value) && !!value;
  } catch {
    return false;
  }
}
