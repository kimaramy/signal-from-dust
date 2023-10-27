'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { defaultMonthKey, getMonthValue, Month, monthKeys } from './schema';
import { translateMonth } from './utils';

interface MonthSelectProps {
  value: Month;
  onValueChange: (value: Month) => void;
  hidden?: boolean;
  disabled?: boolean;
}

function MonthSelect(props: MonthSelectProps) {
  const { value, onValueChange, hidden = false, disabled = false } = props;

  const _monthKeys = monthKeys.slice();

  const _defaultMonthKey = _monthKeys.splice(
    _monthKeys.indexOf(defaultMonthKey),
    1
  )[0];

  if (hidden) return null;

  return (
    <Select
      value={String(value)}
      disabled={disabled}
      onValueChange={(value) => onValueChange(Number(value))}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="조회 월 선택" />
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

export default MonthSelect;
