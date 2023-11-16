'use client';

import { createContext } from 'react';

import type { SettingsMode } from './SettingsForm';

export const SettingsModeContext = createContext<SettingsMode | null>(null);

if (process.env.NODE_ENV !== 'production') {
  SettingsModeContext.displayName = 'SettingsModeContext';
}
