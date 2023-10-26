'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useDustSizeValue, useSetDustSizeValue } from './hooks';
import { DustSize, dustSizeSet } from './schema';
import { translateDustSize } from './utils';

export interface DustSizeSelectProps {}

export default function DustSizeSelect() {
  const dustSize = useDustSizeValue();

  const setDustSize = useSetDustSizeValue();

  return (
    <Select
      value={dustSize}
      onValueChange={(value) => setDustSize(value as DustSize)}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a dust" />
      </SelectTrigger>
      <SelectContent>
        {dustSizeSet.slice().map((value) => (
          <SelectItem key={value} value={value}>
            {translateDustSize(value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
