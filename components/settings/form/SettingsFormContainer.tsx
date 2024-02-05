import { useCallback } from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { type SchemaName } from '@/lib/model';
import { useNavigate, useSetQueryParams, type TypedRoute } from '@/lib/router';
import { toLowerCase } from '@/lib/utils';

import { useSettingsFormDefaultValues, useSettingsModeContext } from '../hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  useDevTool: boolean;
}

function SettingsFormContainer({ useDevTool }: SettingsFormContainerProps) {
  const { locale } = useLocaleDictionary();

  const navigate = useNavigate();

  const setQueryParams = useSetQueryParams();

  const defaultMode = useSettingsModeContext();

  const defaultValues = useSettingsFormDefaultValues(defaultMode);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      if (values.mode === 'preset') {
        return navigate(
          `/${locale}/${toLowerCase(values.collectionKey)}` as TypedRoute,
          { method: 'push' }
        );
      }

      if (values.mode === 'realtime') {
        const newQueryParams = new Map<SchemaName, string>()
          .set('location', toLowerCase(values.locationKey))
          .set('dust', toLowerCase(values.dustKey));

        const search = setQueryParams(newQueryParams, { stringify: true });

        return navigate(`/${locale}/today${search}` as TypedRoute, {
          method: 'push',
        });
      }

      const newQueryParams = new Map<SchemaName, string>()
        .set('location', values.locationKey)
        .set('collection', values.collectionKey)
        .set('dust', values.dustKey)
        .set('year', values.yearKey)
        .set('season', values.seasonKey)
        .set('month', values.monthKey);

      newQueryParams.forEach((value, key) => {
        newQueryParams.set(key, toLowerCase(value));
      });

      const search = setQueryParams(newQueryParams, { stringify: true });

      navigate(`/${locale}/search${search}` as TypedRoute, { method: 'push' });
    },
    [locale, setQueryParams, navigate]
  );

  return (
    <SettingsForm
      useDevTool={useDevTool}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}

export default SettingsFormContainer;
