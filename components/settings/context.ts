'use client';

import { createContext } from 'react';

import type { SettingsMode } from './form/SettingsForm';

export const SettingsModeContext = createContext<SettingsMode | null>(null);

if (process.env.NODE_ENV !== 'production') {
  SettingsModeContext.displayName = 'SettingsModeContext';
}
