'use client';

import { useContext, useMemo } from 'react';

import {
  CollectionUtils,
  DustUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';

import { SettingsModeContext } from './context';
import type { SettingsFormValues, SettingsMode } from './form/SettingsForm';

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
      dustKey: DustUtils.schema.defaultKey,
      collectionKey: CollectionUtils.schema.defaultKey,
      yearKey: YearUtils.schema.defaultKey,
      seasonKey: SeasonUtils.schema.defaultKey,
      monthKey: MonthUtils.schema.defaultKey,
    }),
    [defaultMode]
  );
}

export { useSettingsModeContext, useSettingsFormDefaultValues };
