'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useDisplayValue, useSetDisplayValue } from './hooks';
import { Display, displaySet } from './schema';
import { toDisplayName } from './utils';

export interface DisplaySelectProps {}

export default function DisplaySelect() {
  const display = useDisplayValue();

  const setDisplay = useSetDisplayValue();

  return (
    <Select
      value={display}
      onValueChange={(value) => setDisplay(value as Display)}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a view" />
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
