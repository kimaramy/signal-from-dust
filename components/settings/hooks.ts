'use client';

import { useContext } from 'react';

import { useEnumUrlParam, type URLPart } from '@/lib/router';

import { SettingsContext, SettingsContextError } from './context';
import { SettingsModeUtils } from './schema';

function useSettingsContext() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) {
    throw SettingsContextError(useSettingsContext.name);
  }
  return settingsContext;
}

function useSettingsModeKey(
  part?: URLPart,
  initialKey?: SettingsModeUtils.Key
) {
  const [settingsModeKey] = useEnumUrlParam(
    SettingsModeUtils.schema.name,
    initialKey ?? SettingsModeUtils.schema.defaultKey,
    {
      enums: SettingsModeUtils.schema.getAllKeys(),
      part,
    }
  );
  return settingsModeKey;
}

export { useSettingsContext, useSettingsModeKey };
