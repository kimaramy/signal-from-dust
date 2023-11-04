import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { defaultYearKey, getYearValue, Year, yearKeys } from './schema';
import { translateYear } from './utils';

interface YearSelectProps {
  value: Year;
  onValueChange: (value: Year) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function YearSelect(props: YearSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const _yearKeys = yearKeys.slice();

  const _defaultYearKey = _yearKeys.splice(
    _yearKeys.indexOf(defaultYearKey),
    1
  )[0];

  return (
    <Select
      value={String(value)}
      disabled={disabled}
      onValueChange={(value) => onValueChange(Number(value))}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 연도 선택" />
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

export default YearSelect;
