'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DustSize, dustSizeSet } from './schema';
import { translateDustSize } from './utils';

interface DustSizeSelectProps {
  value: DustSize;
  onValueChange: (value: DustSize) => void;
  hidden?: boolean;
  disabled?: boolean;
}

function DustSizeSelect(props: DustSizeSelectProps) {
  const { value, onValueChange, hidden = false, disabled = false } = props;

  if (hidden) return null;

  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="조회 데이터 선택" />
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

export default DustSizeSelect;
