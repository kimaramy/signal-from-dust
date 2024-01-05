'use client';

import { useContext, useMemo } from 'react';

import {
  CollectionUtils,
  DataNameUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
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
      locationKey: LocationUtils.schema.defaultKey,
      dataNameKey: DataNameUtils.schema.defaultKey,
      collectionKey: CollectionUtils.schema.defaultKey,
      yearKey: YearUtils.schema.defaultKey,
      seasonKey: SeasonUtils.schema.defaultKey,
      monthKey: MonthUtils.schema.defaultKey,
    }),
    [defaultMode]
  );
}

export { useSettingsModeContext, useSettingsFormDefaultValues };
