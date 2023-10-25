'use client';

import { useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollectionValue } from '@/components/collection';

import { useResetYearValue, useSetYearValue, useYearValue } from './hooks';
import { getYearValue, yearKeyMap, yearKeySet } from './schema';
import { toYearSelectLabel } from './utils';

export interface YearSelectProps {}

export default function YearSelect() {
  const collection = useCollectionValue();

  const year = useYearValue();

  const setYear = useSetYearValue();

  const resetYear = useResetYearValue();

  const isEnabled =
    collection === 'Weekly' ||
    collection === 'Monthly' ||
    collection === 'Seasonally';

  const yearKeys = yearKeySet.slice();

  const defaultYearKey = yearKeys.splice(
    yearKeySet.indexOf(yearKeyMap.Default),
    1
  )[0];

  useEffect(() => {
    if (collection === 'Yearly') resetYear();
  }, [collection]);

  return (
    <Select
      value={String(year)}
      disabled={!isEnabled}
      onValueChange={(value) => setYear(Number(value))}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={String(getYearValue(defaultYearKey))}>
          {toYearSelectLabel(defaultYearKey)}
        </SelectItem>
        {yearKeys.reverse().map((yearKey) => (
          <SelectItem key={yearKey} value={String(getYearValue(yearKey))}>
            {toYearSelectLabel(yearKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
