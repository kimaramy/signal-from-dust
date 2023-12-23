import { cn } from '@/lib/css';
import { AppWeekday } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WeekdaySelectProps {
  value: AppWeekday.Key;
  onValueChange: (value: AppWeekday.Key) => void;
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

  const weekdayKeys = AppWeekday.schema.getAllKeys();

  const defaultWeekdayKey = weekdayKeys.splice(
    weekdayKeys.indexOf(AppWeekday.schema.defaultKey),
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
            {AppWeekday.schema.display(weekdayKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekdaySelect;
