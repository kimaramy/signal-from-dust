'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollectionValue } from '@/components/collection';

import { useMonthValue, useSetMonthValue } from './hooks';
import { getMonthValue, monthKeyMap, monthKeySet } from './schema';
import { toMonthSelectLabel } from './utils';

export interface MonthSelectProps {}

export default function MonthSelect() {
  const collection = useCollectionValue();

  const month = useMonthValue();

  const setMonth = useSetMonthValue();

  const isVisible = collection === 'Daily' || collection === 'Weekdaily';

  const monthKeys = monthKeySet.slice();

  const defaultMonthKey = monthKeys.splice(
    monthKeySet.indexOf(monthKeyMap.Default),
    1
  )[0];

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
        <SelectItem value={String(getMonthValue(defaultMonthKey))}>
          {toMonthSelectLabel(defaultMonthKey)}
        </SelectItem>
        {monthKeys.map((monthKey) => (
          <SelectItem key={monthKey} value={String(getMonthValue(monthKey))}>
            {toMonthSelectLabel(monthKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
