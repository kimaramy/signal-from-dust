'use client';

import { useQueryParam, useSetQueryParam } from '@/hooks';

import { QueryParamEnum } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type View = 'perspective' | 'grid';

export interface ViewSelectProps {}

export default function ViewSelect() {
  const [view] = useQueryParam<View>(QueryParamEnum.View, 'perspective');

  const setView = useSetQueryParam(QueryParamEnum.View, { method: 'push' });

  return (
    <Select value={view} onValueChange={(value) => setView(value)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="뷰 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="perspective">원근법</SelectItem>
        <SelectItem value="grid">그리드</SelectItem>
      </SelectContent>
    </Select>
  );
}
