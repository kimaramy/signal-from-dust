'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { URLPart } from '@/lib/router';
import { useDustKey } from '@/components/dust';
import { useLocationKey } from '@/components/location';
import { useMonthKey } from '@/components/month';
import { useSeasonKey } from '@/components/season';
import { useYearKey } from '@/components/year';

import { useCollectionKey } from '../collection';
import { SettingsContext, SettingsContextUtils } from './context';
import { SettingsModeUtils } from './schema';

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

  const locationKey = useLocationKey();

  const dustKey = useDustKey();

  const yearKey = useYearKey();

  const monthKey = useMonthKey();

  const seasonKey = useSeasonKey();

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

export default SettingsProvider;
