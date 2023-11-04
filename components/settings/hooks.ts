import { useCallback, useMemo } from 'react';
import { useSetQueryParams } from '@/hooks';
import { toLower } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';
import {
  dataCollectionSchema,
  useDataCollectionKey,
} from '@/components/dataCollection';
import { dataNameSchema, useDataNameKey } from '@/components/dataName';
import {
  defaultMonthValue,
  getMonthKey,
  useMonthValue,
} from '@/components/month';
import { seasonSchema, useSeasonKey } from '@/components/season';
import { defaultYearValue, getYearKey, useYearValue } from '@/components/year';

import { type SettingsFormValues } from './SettingsForm';

export function useSettingsState() {
  const setQueryParams = useSetQueryParams();

  const dataNameKey = useDataNameKey();
  const dataCollectionKey = useDataCollectionKey();
  const seasonKey = useSeasonKey();
  const yearValue = useYearValue();
  const monthValue = useMonthValue();

  const defaultSettingsData: SettingsFormValues = useMemo(
    () => ({
      mode: 'preset',
      dataNameKey: dataNameSchema.getDefaultKey(),
      dataCollectionKey: dataCollectionSchema.getDefaultKey(),
      seasonKey: seasonSchema.getDefaultKey(),
      month: defaultMonthValue,
      year: defaultYearValue,
    }),
    []
  );

  const settingsData: SettingsFormValues = {
    mode: 'preset',
    dataNameKey,
    dataCollectionKey,
    seasonKey,
    year: yearValue,
    month: monthValue,
  };

  const setSettingsData = useCallback(
    (values: SettingsFormValues) => {
      const map = new Map<QueryParamEnum, string | number>();
      map
        .set(QueryParamEnum.DataName, values.dataNameKey)
        .set(QueryParamEnum.DataCollection, values.dataCollectionKey)
        .set(QueryParamEnum.Season, values.seasonKey);

      map.forEach((value, key) => {
        map.set(key, toLower(value.toString()));
      });

      map
        .set(QueryParamEnum.Year, getYearKey(values.year) as string)
        .set(QueryParamEnum.Month, getMonthKey(values.month) as string);

      setQueryParams(map);
    },
    [setQueryParams]
  );

  return {
    defaultSettingsData,
    settingsData,
    setSettingsData,
  };
}
