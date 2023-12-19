'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDistinctYearListQuery } from '@/domains';
import { toast } from 'react-hot-toast';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { yearSchema, type YearKey } from './schema';

export function useYearKey(initialKey?: YearKey): YearKey {
  const lowerCasedKeys = yearSchema.mapKeys(yearSchema.lowerCaseKey);
  const lowerCasedDefaultKey = yearSchema.lowerCaseKey(
    initialKey ?? yearSchema.defaultKey
  );
  const [lowerCasedKey] = useEnumUrlParam(
    QueryParamEnum.Year,
    lowerCasedDefaultKey,
    {
      enums: lowerCasedKeys,
      part: 'query',
    }
  );
  return yearSchema.upperCaseKey(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return yearSchema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(useSearchParams(), QueryParamEnum.Year);
  return function (yearKey: YearKey) {
    const lowerCasedKey = yearSchema.lowerCaseKey(yearKey);
    return setYearKey(lowerCasedKey);
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
