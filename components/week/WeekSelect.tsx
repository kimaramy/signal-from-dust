import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { weekSchema, type WeekKey } from './schema';

interface WeekSelectProps {
  value: WeekKey;
  onValueChange: (value: WeekKey) => void;
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

  const weekKeys = weekSchema.getAllKeys();

  const defaultWeekKey = weekKeys.splice(
    weekKeys.indexOf(weekSchema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 주 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultWeekKey}>
          {weekSchema.display(defaultWeekKey)}
        </SelectItem>
        {weekKeys.map((weekKey) => (
          <SelectItem key={weekKey} value={weekKey}>
            {weekSchema.display(weekKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekSelect;
