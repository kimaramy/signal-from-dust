import { useCallback } from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { type SchemaName } from '@/lib/model';
import { useNavigate, useSetQueryParams, type TypedRoute } from '@/lib/router';
import { toLowerCase } from '@/lib/utils';

import { SettingsContextUtils } from '../context';
import { useSettingsContext } from '../hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  useDevTool: boolean;
}

function SettingsFormContainer({ useDevTool }: SettingsFormContainerProps) {
  const { locale } = useLocaleDictionary();

  const navigate = useNavigate();

  const setQueryParams = useSetQueryParams();

  const values = SettingsContextUtils.createValues({
    ...useSettingsContext(),
  });

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      if (values.modeKey === 'preset') {
        return navigate(
          `/${locale}/${toLowerCase(values.collectionKey)}` as TypedRoute,
          { method: 'push' }
        );
      }

      if (values.modeKey === 'realtime') {
        const queryParams = new Map<SchemaName, string>()
          .set('location', toLowerCase(values.locationKey))
          .set('dust', toLowerCase(values.dustKey));

        const search = setQueryParams(queryParams, { stringify: true });

        return navigate(`/${locale}/today${search}` as TypedRoute, {
          method: 'push',
        });
      }

      const queryParams = new Map<SchemaName, string>()
        .set('location', values.locationKey)
        .set('collection', values.collectionKey)
        .set('dust', values.dustKey)
        .set('year', values.yearKey)
        .set('season', values.seasonKey)
        .set('month', values.monthKey);

      queryParams.forEach((value, key) => {
        queryParams.set(key, toLowerCase(value));
      });

      const search = setQueryParams(queryParams, { stringify: true });

      navigate(`/${locale}/search${search}` as TypedRoute, { method: 'push' });
    },
    [locale, setQueryParams, navigate]
  );

  return (
    <SettingsForm
      values={values}
      onSubmit={handleSubmit}
      useDevTool={useDevTool}
    />
  );
}

export default SettingsFormContainer;
