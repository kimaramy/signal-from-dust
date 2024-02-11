'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { URLPart } from '@/lib/router';
import { useCollectionKey } from '@/components/collection';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import { useYearKey } from '@/components/year';

import { SettingsContext, SettingsContextUtils } from './contexts';
import { SettingsModeUtils } from './schemes';

interface SettingsProviderProps {
  initialModeKey?:
    | SettingsModeUtils.Key
    | ((pathname: string) => SettingsModeUtils.Key);
  collectionKeyHint?: URLPart | ((pathname: string) => URLPart);
  children: React.ReactNode;
}

function SettingsProvider({
  initialModeKey = SettingsModeUtils.schema.defaultKey,
  collectionKeyHint = 'query',
  children,
}: SettingsProviderProps) {
  const pathname = usePathname();

  const _initialModeKey =
    typeof initialModeKey === 'function'
      ? initialModeKey(pathname)
      : initialModeKey;

  const _collectionKeyHint =
    typeof collectionKeyHint === 'function'
      ? collectionKeyHint(pathname)
      : collectionKeyHint;

  const collectionKey = useCollectionKey(_collectionKeyHint);

  const locationKey = useLocationKey('query');

  const dustKey = useDustKey('query');

  const yearKey = useYearKey('query');

  const monthKey = useMonthKey('query');

  const seasonKey = useSeasonKey('query');

  return (
    <SettingsContext.Provider
      value={{
        ...SettingsContextUtils.createDefaultValues(_initialModeKey),
        collectionKey,
        locationKey,
        dustKey,
        yearKey,
        monthKey,
        seasonKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider };
