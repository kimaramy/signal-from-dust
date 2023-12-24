import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { MonthUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MonthSelectProps {
  value: MonthUtils.Key;
  onValueChange: (value: MonthUtils.Key) => void;
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

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const monthKeys = MonthUtils.schema.getAllKeys();

  const defaultMonthKey = monthKeys.splice(
    monthKeys.indexOf(MonthUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.month.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultMonthKey}>
          {MonthUtils.schema.display(defaultMonthKey, 'short', locale)}
        </SelectItem>
        {monthKeys.map((monthKey) => (
          <SelectItem key={monthKey} value={monthKey}>
            {MonthUtils.schema.display(monthKey, 'short', locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default MonthSelect;
