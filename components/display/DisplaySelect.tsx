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
}

function DisplaySelect({ value, onValueChange }: DisplaySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
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
