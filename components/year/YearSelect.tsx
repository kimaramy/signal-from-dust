import { cn } from '@/lib/css';
import { AppYear } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YearSelectProps {
  value: AppYear.Key;
  onValueChange: (value: AppYear.Key) => void;
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

  const yearKeys = AppYear.schema.getAllKeys();

  const defaultYearKey = yearKeys.splice(
    yearKeys.indexOf(AppYear.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="조회 연도 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultYearKey}>
          {AppYear.schema.display(defaultYearKey)}
        </SelectItem>
        {yearKeys.reverse().map((yearKey) => (
          <SelectItem key={yearKey} value={yearKey}>
            {AppYear.schema.display(yearKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearSelect;
