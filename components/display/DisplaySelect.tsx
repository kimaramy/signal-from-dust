'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Display, displaySet } from './schema';
import { toDisplayName } from './utils';

interface DisplaySelectProps {
  value: Display;
  onValueChange: (value: Display) => void;
  hidden?: boolean;
  disabled?: boolean;
}

function DisplaySelect(props: DisplaySelectProps) {
  const { value, onValueChange, hidden = false, disabled = false } = props;

  if (hidden) return null;

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="보기 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        {displaySet.slice().map((value) => (
          <SelectItem key={value} value={value}>
            {toDisplayName(value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DisplaySelect;
