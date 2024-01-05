import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { YearUtils } from '@/lib/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YearSelectProps {
  value: YearUtils.Key;
  onValueChange: (value: YearUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function YearSelect(props: YearSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const {
    locale,
    dictionary: { settings },
  } = useLocaleDictionary();

  const yearKeys = YearUtils.schema.getAllKeys();

  const defaultYearKey = yearKeys.splice(
    yearKeys.indexOf(YearUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select
      value={value}
      disabled={disabled ?? yearKeys.length < 2}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder={settings.form.year.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultYearKey}>
          {YearUtils.schema.display(defaultYearKey, 'short', locale)}
        </SelectItem>
        {yearKeys.reverse().map((yearKey) => (
          <SelectItem key={yearKey} value={yearKey}>
            {YearUtils.schema.display(yearKey, 'short', locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearSelect;
