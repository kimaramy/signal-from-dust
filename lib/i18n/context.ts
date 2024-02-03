'use client';

import { createContext } from 'react';

import { type Dictionary } from './dictionary';
import type { Locale } from './i18n';

type LocaleDictionaryContextValue = { dictionary: Dictionary; locale: Locale };

const LocaleDictionaryContext =
  createContext<LocaleDictionaryContextValue | null>(null);

const LocaleDictionaryContextError = (caller: string) =>
  new Error(
    `${caller} must be called within a LocaleDictionaryContext.Provider`
  );

export {
  LocaleDictionaryContext,
  LocaleDictionaryContextError,
  type LocaleDictionaryContextValue,
};
