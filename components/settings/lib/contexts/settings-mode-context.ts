'use client';

import { createContext } from 'react';

import {
  CollectionUtils,
  DustUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';

import { SettingsModeUtils } from '../schemes';

interface SettingsContextValues {
  modeKey: SettingsModeUtils.Key;
  locationKey?: LocationUtils.Key;
  dustKey?: DustUtils.Key;
  collectionKey?: CollectionUtils.Key;
  yearKey?: YearUtils.Key;
  seasonKey?: SeasonUtils.Key;
  monthKey?: MonthUtils.Key;
}

class SettingsContextUtils {
  static createDefaultValues(
    initialModeKey: SettingsModeUtils.Key
  ): Required<SettingsContextValues> {
    return {
      modeKey: initialModeKey,
      locationKey: LocationUtils.schema.defaultKey,
      dustKey: DustUtils.schema.defaultKey,
      collectionKey: CollectionUtils.schema.defaultKey,
      yearKey: YearUtils.schema.defaultKey,
      seasonKey: SeasonUtils.schema.defaultKey,
      monthKey: MonthUtils.schema.defaultKey,
    };
  }
  static createValues(values: Partial<SettingsContextValues>) {
    return {
      ...SettingsContextUtils.createDefaultValues(
        SettingsModeUtils.schema.defaultKey
      ),
      ...values,
    };
  }
}

const SettingsContext = createContext<SettingsContextValues>(
  SettingsContextUtils.createDefaultValues(SettingsModeUtils.schema.defaultKey)
);

const SettingsContextError = (caller: string) =>
  `${caller} must be called within a SettingsContext.Provider`;

export {
  SettingsContext,
  SettingsContextError,
  SettingsContextUtils,
  type SettingsContextValues,
};
