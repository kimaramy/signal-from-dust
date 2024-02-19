import { useCallback } from 'react';

import { IntlMessageFormat, useLocaleDictionary } from '@/lib/i18n';
import { DustUtils, LocationUtils } from '@/lib/model';
import { useFilterQueryParamsEffect } from '@/lib/router';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { type SceneData } from '@/components/scene/lib';

function useRealtimeSceneContents() {
  const { dictionary } = useLocaleDictionary();

  const createSceneTitle = useCallback(
    (sceneData: SceneData) => {
      const { location, dust } = sceneData.display;
      const title = new IntlMessageFormat(
        dictionary.dataset.realtime_title
      ).format({
        location,
        dust,
      });
      return title as string;
    },
    [dictionary]
  );

  const createSceneSubtitle = useCallback(
    (sceneData: SceneData) => {
      const { location } = sceneData.display;
      const title = [
        dictionary.dataset.label,
        new IntlMessageFormat(dictionary.dataset.realtime_source).format({
          location,
        }),
      ].join(' : ');
      return title;
    },
    [dictionary]
  );

  return { createSceneTitle, createSceneSubtitle };
}

function useRealtimeDatasetParams() {
  const locationKey = useLocationKey('query');
  const dustKey = useDustKey('query');

  useFilterQueryParamsEffect({
    method: 'pick',
    names: [LocationUtils.schema.name, DustUtils.schema.name],
  });

  return { locationKey, dustKey };
}

export { useRealtimeSceneContents, useRealtimeDatasetParams };
