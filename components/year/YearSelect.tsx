import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { yearSchema, type YearKey } from './schema';

interface YearSelectProps {
  value: YearKey;
  onValueChange: (value: YearKey) => void;
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

  const yearKeys = yearSchema.getAllKeys();

  const defaultYearKey = yearKeys.splice(
    yearKeys.indexOf(yearSchema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 연도 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultYearKey}>
          {yearSchema.display(defaultYearKey)}
        </SelectItem>
        {yearKeys.reverse().map((yearKey) => (
          <SelectItem key={yearKey} value={yearKey}>
            {yearSchema.display(yearKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearSelect;
