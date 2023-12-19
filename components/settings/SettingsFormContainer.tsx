import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import { useNavigate, useSetQueryParams, type TypedRoute } from '@/lib/router';
import { QueryParamEnum, toLowerCase } from '@/lib/utils';

import { useSettingsFormDefaultValues, useSettingsModeContext } from './hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  devTool: boolean;
}

function SettingsFormContainer({ devTool }: SettingsFormContainerProps) {
  const navigate = useNavigate();

  const setQueryParams = useSetQueryParams(useSearchParams());

  const defaultMode = useSettingsModeContext();

  const defaultValues = useSettingsFormDefaultValues(defaultMode);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      if (values.mode === 'preset') {
        const pathname = `/${toLowerCase(values.collectionKey)}` as TypedRoute;

        return navigate(pathname, { method: 'push' });
      }

      const map = new Map<QueryParamEnum, string>()
        .set(QueryParamEnum.Collection, values.collectionKey)
        .set(QueryParamEnum.DataName, values.dataNameKey)
        .set(QueryParamEnum.Year, values.yearKey)
        .set(QueryParamEnum.Season, values.seasonKey)
        .set(QueryParamEnum.Month, values.monthKey);

      map.forEach((value, key) => {
        map.set(key, toLowerCase(value.toString()));
      });

      const pathname = `/search` as TypedRoute;

      const search = setQueryParams(map, { stringify: true });

      navigate(`${pathname}${search}`, { method: 'push' });
    },
    [setQueryParams, navigate]
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
