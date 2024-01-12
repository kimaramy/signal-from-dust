'use client';

import { useEffect } from 'react';
import { useDistinctYearListQuery } from '@/domains';

import { YearUtils } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';
import { toast } from '@/lib/toast';

export function useYearKey(
  part?: URLPart,
  initialKey?: YearUtils.Key
): YearUtils.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    YearUtils.schema.name,
    YearUtils.schema.lowerCaseKey(initialKey ?? YearUtils.schema.defaultKey),
    {
      enums: YearUtils.schema.mapKeys(YearUtils.schema.lowerCaseKey),
      part,
    }
  );
  return YearUtils.schema.upperCaseKey(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return YearUtils.schema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(YearUtils.schema.name);
  return function (yearKey: YearUtils.Key) {
    return setYearKey(YearUtils.schema.lowerCaseKey(yearKey));
  };
}

export function useValidateYearSchema() {
  const dbYears = useDistinctYearListQuery({
    select: (dataset) =>
      dataset
        .map((data) => data.year)
        .filter((year) => !Number.isNaN(Number(year))) as number[],
  });

  useEffect(() => {
    if (dbYears) {
      const isSynced = YearUtils.schema.checkSyncWithDB(dbYears);

      if (!isSynced) {
        toast.error(
          `Database has been updated. Please check schema years with database years.`
        );
      }
    }
  }, [dbYears]);
}
