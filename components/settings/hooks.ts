'use client';

import { useContext, useMemo } from 'react';

import * as Model from '@/lib/model';

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
      dataNameKey: Model.dataNameSchema.defaultKey,
      collectionKey: Model.collectionSchema.defaultKey,
      yearKey: Model.yearSchema.defaultKey,
      seasonKey: Model.seasonSchema.defaultKey,
      monthKey: Model.monthSchema.defaultKey,
    }),
    [defaultMode]
  );
}

export { useSettingsModeContext, useSettingsFormDefaultValues };
