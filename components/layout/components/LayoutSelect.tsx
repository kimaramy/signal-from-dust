import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { LayoutUtils } from '../lib/schema';

interface LayoutSelectProps {
  value: LayoutUtils.Key;
  onValueChange: (value: LayoutUtils.Key) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function LayoutSelect(props: LayoutSelectProps) {
  const { value, onValueChange, hidden = false, disabled, className } = props;

  const { locale } = useLocaleDictionary();

  const layoutKeys = LayoutUtils.schema
    .getAllKeys()
    .filter((key) => LayoutUtils.schema.checkEnabled(key));

  const defaultLayoutKey = layoutKeys.splice(
    layoutKeys.indexOf(LayoutUtils.schema.defaultKey),
    1
  )[0];

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-32', hidden && 'hidden', className)}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultLayoutKey}>
          {LayoutUtils.schema.display(defaultLayoutKey, locale)}
        </SelectItem>
        {layoutKeys.map((layoutKey) => (
          <SelectItem key={layoutKey} value={layoutKey}>
            {LayoutUtils.schema.display(layoutKey, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LayoutSelect;
