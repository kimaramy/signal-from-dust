'use client';

import { useQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface LocationSelectProps {}

export default function LocationSelect() {
  const [location] = useQueryParam(QueryParamEnum.Location, 'Seoul');

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
