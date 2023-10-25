'use client';

import { useUpdateEffect } from '@/hooks';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollectionValue } from '@/components/collection';

import { useResetYearValue, useSetYearValue, useYearValue } from './hooks';
import { defaultYearKey, getYearValue, yearKeys } from './schema';
import { translateYear } from './utils';

export interface YearSelectProps {}

export default function YearSelect() {
  const collection = useCollectionValue();

  const year = useYearValue();

  const setYear = useSetYearValue();

  const resetYear = useResetYearValue();

  const isVisible =
    collection === 'Weekly' ||
    collection === 'Monthly' ||
    collection === 'Seasonally';

  const _yearKeys = yearKeys.slice();

  const _defaultYearKey = _yearKeys.splice(
    _yearKeys.indexOf(defaultYearKey),
    1
  )[0];

  useUpdateEffect(() => {
    resetYear();
  }, [collection]);

  if (!isVisible) return null;

  return (
    <Select
      value={String(year)}
      onValueChange={(value) => setYear(Number(value))}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={String(getYearValue(_defaultYearKey))}>
          {translateYear(_defaultYearKey)}
        </SelectItem>
        {_yearKeys.reverse().map((yearKey) => (
          <SelectItem key={yearKey} value={String(getYearValue(yearKey))}>
            {translateYear(yearKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
