import { useCallback } from 'react';
import { useSetQueryParams } from '@/hooks';

import { QueryParamEnum, toLowerCase } from '@/lib/utils';

import { useSettingsFormDefaultValues, useSettingsModeContext } from './hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  devTool: boolean;
}

function SettingsFormContainer({ devTool }: SettingsFormContainerProps) {
  const setQueryParams = useSetQueryParams();

  const defaultMode = useSettingsModeContext();

  const defaultValues = useSettingsFormDefaultValues(defaultMode);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      const map = new Map<QueryParamEnum, string>()
        .set(QueryParamEnum.DataName, values.dataNameKey)
        .set(QueryParamEnum.DataCollection, values.dataCollectionKey)
        .set(QueryParamEnum.Year, values.yearKey)
        .set(QueryParamEnum.Season, values.seasonKey)
        .set(QueryParamEnum.Month, values.monthKey);

      map.forEach((value, key) => {
        map.set(key, toLowerCase(value.toString()));
      });

      setQueryParams(map);
    },
    [setQueryParams]
  );

  return (
    <SettingsForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      devTool={devTool}
    />
  );
}

export default SettingsFormContainer;
