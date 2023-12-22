'use client';

import { usePlainUrlParam } from '@/lib/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface LocationSelectProps {}

export default function LocationSelect() {
  const [location] = usePlainUrlParam('location', 'Seoul');

  return (
    <Select disabled value={location}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="조회 위치 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Seoul">서울</SelectItem>
      </SelectContent>
    </Select>
  );
}
