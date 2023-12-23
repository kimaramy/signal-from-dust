import { useCallback } from 'react';

import { type AppSchemaName } from '@/lib/model';
import { useNavigate, useSetQueryParams, type TypedRoute } from '@/lib/router';
import { toLowerCase } from '@/lib/utils';

import { useSettingsFormDefaultValues, useSettingsModeContext } from './hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  devTool: boolean;
}

function SettingsFormContainer({ devTool }: SettingsFormContainerProps) {
  const navigate = useNavigate();

  const setQueryParams = useSetQueryParams();

  const defaultMode = useSettingsModeContext();

  const defaultValues = useSettingsFormDefaultValues(defaultMode);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      if (values.mode === 'preset') {
        const pathname = `/${toLowerCase(values.collectionKey)}` as TypedRoute;
        return navigate(pathname, { method: 'push' });
      }

      const map = new Map<AppSchemaName, string>()
        .set('collection', values.collectionKey)
        .set('dataName', values.dataNameKey)
        .set('year', values.yearKey)
        .set('season', values.seasonKey)
        .set('month', values.monthKey);

      map.forEach((value, key) => {
        map.set(key, toLowerCase(value.toString()));
      });

      const search = setQueryParams(map, { stringify: true });

      navigate(`/search${search}`, { method: 'push' });
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
