import { useCallback } from 'react';
import { useSetQueryParams } from '@/hooks';
import { toLower } from 'lodash-es';

import { QueryParamEnum } from '@/lib/utils';

import { useSettingsFormDefaultValues } from './hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

function SettingsFormContainer() {
  const setQueryParams = useSetQueryParams();

  const defaultValues = useSettingsFormDefaultValues();

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      const map = new Map<QueryParamEnum, string | number>();
      map
        .set(QueryParamEnum.DataName, values.dataNameKey)
        .set(QueryParamEnum.DataCollection, values.dataCollectionKey)
        .set(QueryParamEnum.Year, values.yearKey)
        .set(QueryParamEnum.Season, values.seasonKey)
        .set(QueryParamEnum.Month, values.monthKey);

      map.forEach((value, key) => {
        map.set(key, toLower(value.toString()));
      });

      setQueryParams(map);
    },
    [setQueryParams]
  );

  return <SettingsForm defaultValues={defaultValues} onSubmit={handleSubmit} />;
}

export default SettingsFormContainer;
