'use client';

import { useEffect } from 'react';
import { useDistinctYearListQuery } from '@/domains';
import { toast } from 'react-hot-toast';

import { yearSchema, type YearKey } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useYearKey(part?: URLPart, initialKey?: YearKey): YearKey {
  const [lowerCasedKey] = useEnumUrlParam(
    yearSchema.name,
    yearSchema.lowerCaseKey(initialKey ?? yearSchema.defaultKey),
    {
      enums: yearSchema.mapKeys(yearSchema.lowerCaseKey),
      part,
    }
  );
  return yearSchema.upperCaseKey(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return yearSchema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(yearSchema.name);
  return function (yearKey: YearKey) {
    return setYearKey(yearSchema.lowerCaseKey(yearKey));
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
      const isSynced = yearSchema.checkSyncWithDB(dbYears);

      if (!isSynced) {
        toast.error(
          `Database has been updated. Please check schema years with database years.`
        );
      }
    }
  }, [dbYears]);
}
