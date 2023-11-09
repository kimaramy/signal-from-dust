'use client';

import { useEffect } from 'react';
import { useDistinctYearListQuery } from '@/domains';
import { useEnumQueryParam, useSetQueryParam } from '@/hooks';
import { toast } from 'react-hot-toast';

import { QueryParamEnum, toLowerCase, toUpperCase } from '@/lib/utils';

import { yearSchema, type YearKey } from './schema';

export function useYearKey(): YearKey {
  const lowerCasedKeys = yearSchema.getAllKeys().map(toLowerCase);
  const lowerCasedDefaultKey = toLowerCase(yearSchema.defaultKey);
  const [lowerCasedKey] = useEnumQueryParam(
    QueryParamEnum.Year,
    lowerCasedKeys,
    lowerCasedDefaultKey
  );
  return toUpperCase(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return yearSchema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(QueryParamEnum.Year);
  return function (yearKey: YearKey) {
    const lowerCasedKey = toLowerCase(yearKey);
    setYearKey(lowerCasedKey);
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
