import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { QueryParamEnum } from '@/lib/utils';
import { useCollectionValue } from '@/components/collection';
import { useDustSizeValue } from '@/components/dustSize';
import { getMonthKey, useMonthValue } from '@/components/month';
import { useSeasonValue } from '@/components/season';
import { getYearKey, useYearValue } from '@/components/year';

import { SettingsFormData } from './SettingsForm';

export function useSettingsState(): [
  SettingsFormData,
  (formData: SettingsFormData) => void,
] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dataName = useDustSizeValue();
  const dataCollection = useCollectionValue();
  const year = useYearValue();
  const month = useMonthValue();
  const season = useSeasonValue();

  const settingsState: SettingsFormData = {
    mode: 'preset',
    dataName,
    dataCollection,
    year,
    month,
    season,
  };

  const setSettingsState = useCallback(
    (values: SettingsFormData) => {
      console.log('here!', values);
      const mutableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      mutableSearchParams.set(QueryParamEnum.DustSize, values.dataName);
      mutableSearchParams.set(QueryParamEnum.Collection, values.dataCollection);
      mutableSearchParams.set(
        QueryParamEnum.Year,
        getYearKey(values.year) as string
      );
      mutableSearchParams.set(
        QueryParamEnum.Month,
        getMonthKey(values.month) as string
      );
      mutableSearchParams.set(QueryParamEnum.Season, values.season);
      router.push(`?${mutableSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  return [settingsState, setSettingsState];
}
