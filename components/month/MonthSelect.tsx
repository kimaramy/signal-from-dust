import { cn } from '@/lib/css';
import { AppMonth } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MonthSelectProps {
  value: AppMonth.Key;
  onValueChange: (value: AppMonth.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function MonthSelect(props: MonthSelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const monthKeys = AppMonth.schema.getAllKeys();

  const defaultMonthKey = monthKeys.splice(
    monthKeys.indexOf(AppMonth.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 월 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultMonthKey}>
          {AppMonth.schema.display(defaultMonthKey)}
        </SelectItem>
        {monthKeys.map((monthKey) => (
          <SelectItem key={monthKey} value={monthKey}>
            {AppMonth.schema.display(monthKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default MonthSelect;
