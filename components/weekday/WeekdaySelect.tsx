import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { WeekdayUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WeekdaySelectProps {
  value: WeekdayUtils.Key;
  onValueChange: (value: WeekdayUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function WeekdaySelect(props: WeekdaySelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const weekdayKeys = WeekdayUtils.schema.getAllKeys();

  const defaultWeekdayKey = weekdayKeys.splice(
    weekdayKeys.indexOf(WeekdayUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select
      value={value}
      disabled={disabled ?? weekdayKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.weekday.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultWeekdayKey}>
          {WeekdayUtils.schema.display(defaultWeekdayKey, 'short', locale)}
        </SelectItem>
        {weekdayKeys.map((weekdayKey) => (
          <SelectItem key={weekdayKey} value={weekdayKey}>
            {WeekdayUtils.schema.display(weekdayKey, 'short', locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default WeekdaySelect;
