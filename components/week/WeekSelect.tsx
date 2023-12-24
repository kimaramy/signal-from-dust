import { cn } from '@/lib/css';
import { WeekUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WeekSelectProps {
  value: WeekUtils.Key;
  onValueChange: (value: WeekUtils.Key) => void;
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

  const weekKeys = WeekUtils.schema.getAllKeys();

  const defaultWeekKey = weekKeys.splice(
    weekKeys.indexOf(WeekUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 주 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultWeekKey}>
          {WeekUtils.schema.display(defaultWeekKey)}
        </SelectItem>
        {weekKeys.map((weekKey) => (
          <SelectItem key={weekKey} value={weekKey}>
            {WeekUtils.schema.display(weekKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekSelect;
