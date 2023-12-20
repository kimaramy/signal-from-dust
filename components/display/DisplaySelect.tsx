import { cn } from '@/lib/css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { displaySchema, type DisplayKey } from './schema';

interface DisplaySelectProps {
  value: DisplayKey;
  onValueChange: (value: DisplayKey) => void;
  hidden?: boolean;
  disabled?: boolean;
  className?: string;
}

function DisplaySelect(props: DisplaySelectProps) {
  const {
    value,
    onValueChange,
    hidden = false,
    disabled = false,
    className,
  } = props;

  const displayKeys = displaySchema.getAllKeys();

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className={cn('min-w-40', hidden && 'hidden', className)}>
        <SelectValue placeholder="보기 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        {displayKeys.map((displayKey) => (
          <SelectItem key={displayKey} value={displayKey}>
            {displaySchema.display(displayKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DisplaySelect;
