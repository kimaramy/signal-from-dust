import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { weekdaySchema, type WeekdayKey } from './schema';

interface WeekdaySelectProps {
  value: WeekdayKey;
  onValueChange: (value: WeekdayKey) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function WeekdaySelect(props: WeekdaySelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const weekdayKeys = weekdaySchema.getAllKeys();

  const defaultWeekdayKey = weekdayKeys.splice(
    weekdayKeys.indexOf(weekdaySchema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 요일 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultWeekdayKey}>요일 전체</SelectItem>
        {weekdayKeys.map((weekdayKey) => (
          <SelectItem key={weekdayKey} value={weekdayKey}>
            {weekdaySchema.display(weekdayKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekdaySelect;
