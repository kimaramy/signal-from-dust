import { cn } from '@/lib/css';
import { AppWeek } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WeekSelectProps {
  value: AppWeek.Key;
  onValueChange: (value: AppWeek.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function WeekSelect(props: WeekSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const weekKeys = AppWeek.schema.getAllKeys();

  const defaultWeekKey = weekKeys.splice(
    weekKeys.indexOf(AppWeek.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 주 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultWeekKey}>
          {AppWeek.schema.display(defaultWeekKey)}
        </SelectItem>
        {weekKeys.map((weekKey) => (
          <SelectItem key={weekKey} value={weekKey}>
            {AppWeek.schema.display(weekKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekSelect;
