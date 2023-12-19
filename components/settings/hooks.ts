'use client';

import { useContext, useMemo } from 'react';

import { collectionSchema } from '@/components/collection';
import { dataNameSchema } from '@/components/dataName';
import { monthSchema } from '@/components/month';
import { seasonSchema } from '@/components/season';
import { yearSchema } from '@/components/year';

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
      dataNameKey: dataNameSchema.defaultKey,
      collectionKey: collectionSchema.defaultKey,
      yearKey: yearSchema.defaultKey,
      seasonKey: seasonSchema.defaultKey,
      monthKey: monthSchema.defaultKey,
    }),
    [defaultMode]
  );
}

export { useSettingsModeContext, useSettingsFormDefaultValues };
