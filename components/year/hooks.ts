'use client';

import { useEffect } from 'react';
import { useDistinctYearListQuery } from '@/domains';
import { toast } from 'react-hot-toast';

import { AppYear } from '@/lib/model';
import { useEnumUrlParam, useSetQueryParam, type URLPart } from '@/lib/router';

export function useYearKey(
  part?: URLPart,
  initialKey?: AppYear.Key
): AppYear.Key {
  const [lowerCasedKey] = useEnumUrlParam(
    AppYear.schema.name,
    AppYear.schema.lowerCaseKey(initialKey ?? AppYear.schema.defaultKey),
    {
      enums: AppYear.schema.mapKeys(AppYear.schema.lowerCaseKey),
      part,
    }
  );
  return AppYear.schema.upperCaseKey(lowerCasedKey);
}

export function useYearValue() {
  const yearKey = useYearKey();
  return AppYear.schema.getValue(yearKey);
}

export function useSetYearKey() {
  const setYearKey = useSetQueryParam(AppYear.schema.name);
  return function (yearKey: AppYear.Key) {
    return setYearKey(AppYear.schema.lowerCaseKey(yearKey));
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
      const isSynced = AppYear.schema.checkSyncWithDB(dbYears);

      if (!isSynced) {
        toast.error(
          `Database has been updated. Please check schema years with database years.`
        );
      }
    }
  }, [dbYears]);
}
