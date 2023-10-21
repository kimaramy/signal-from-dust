'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useDisplayValue, useSetDisplayValue } from './hooks';
import { displaySet } from './schema';

export interface DisplaySelectProps {}

export default function DisplaySelect() {
  const display = useDisplayValue();

  const setDisplay = useSetDisplayValue();

  return (
    <Select value={display} onValueChange={(value) => setDisplay(value)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="출력 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        {displaySet.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
