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

import { useMonthValue, useResetMonthValue, useSetMonthValue } from './hooks';
import { defaultMonthKey, getMonthValue, monthKeys } from './schema';
import { translateMonth } from './utils';

export interface MonthSelectProps {}

export default function MonthSelect() {
  const collection = useCollectionValue();

  const month = useMonthValue();

  const setMonth = useSetMonthValue();

  const resetMonth = useResetMonthValue();

  const isVisible = collection === 'Daily' || collection === 'Weekdaily';

  const _monthKeys = monthKeys.slice();

  const _defaultMonthKey = _monthKeys.splice(
    _monthKeys.indexOf(defaultMonthKey),
    1
  )[0];

  useUpdateEffect(() => {
    if (collection === 'Monthly') resetMonth();
  }, [collection]);

  if (!isVisible) return null;

  return (
    <Select
      value={String(month)}
      onValueChange={(value) => setMonth(Number(value))}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={String(getMonthValue(_defaultMonthKey))}>
          {translateMonth(_defaultMonthKey)}
        </SelectItem>
        {_monthKeys.map((monthKey) => (
          <SelectItem key={monthKey} value={String(getMonthValue(monthKey))}>
            {translateMonth(monthKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
