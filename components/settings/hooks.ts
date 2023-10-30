import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { QueryParamEnum } from '@/lib/utils';
import { defaultCollection, useCollectionValue } from '@/components/collection';
import { defaultDustSize, useDustSizeValue } from '@/components/dustSize';
import {
  defaultMonthValue,
  getMonthKey,
  useMonthValue,
} from '@/components/month';
import { defaultSeason, useSeasonValue } from '@/components/season';
import { defaultYearValue, getYearKey, useYearValue } from '@/components/year';

import { SettingsFormData } from './SettingsForm';

export function useSettingsState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dataName = useDustSizeValue();
  const dataCollection = useCollectionValue();
  const year = useYearValue();
  const month = useMonthValue();
  const season = useSeasonValue();

  const defaultSettingsData: SettingsFormData = useMemo(
    () => ({
      mode: 'preset',
      dataName: defaultDustSize,
      dataCollection: defaultCollection,
      year: defaultYearValue,
      season: defaultSeason,
      month: defaultMonthValue,
    }),
    []
  );

  const settingsData: SettingsFormData = {
    mode: 'preset',
    dataName,
    dataCollection,
    year,
    month,
    season,
  };

  const setSettingsData = useCallback(
    (values: SettingsFormData) => {
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

  return {
    defaultSettingsData,
    settingsData,
    setSettingsData,
  };
}
