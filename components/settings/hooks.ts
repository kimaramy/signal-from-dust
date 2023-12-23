'use client';

import { useContext, useMemo } from 'react';

import {
  AppCollection,
  AppDataName,
  AppMonth,
  AppSeason,
  AppYear,
} from '@/lib/model';

import { SettingsModeContext } from './context';
import type { SettingsFormValues, SettingsMode } from './SettingsForm';

function useSettingsModeContext() {
  const mode = useContext(SettingsModeContext);
  if (!mode) {
    throw new Error(
      `Calling useContext with SettingsModeContext must be inside a SettingsModeContext.Provider with a value.`
    );
  }
  return mode;
}

function useSettingsFormDefaultValues(defaultMode: SettingsMode) {
  return useMemo<SettingsFormValues>(
    () => ({
      mode: defaultMode,
      dataNameKey: AppDataName.schema.defaultKey,
      collectionKey: AppCollection.schema.defaultKey,
      yearKey: AppYear.schema.defaultKey,
      seasonKey: AppSeason.schema.defaultKey,
      monthKey: AppMonth.schema.defaultKey,
    }),
    [defaultMode]
  );
}

export { useSettingsModeContext, useSettingsFormDefaultValues };
