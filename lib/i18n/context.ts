'use client';

import { createContext, useContext } from 'react';

import { type Dictionary } from './dictionary';
import type { Locale } from './i18n';

type LocaleDictionaryContextValue = { dictionary: Dictionary; locale: Locale };

const LocaleDictionaryContext =
  createContext<LocaleDictionaryContextValue | null>(null);

function useLocaleDictionary() {
  const localeDictionary = useContext(LocaleDictionaryContext);
  if (localeDictionary === null) {
    throw new Error(
      `useLocaleDictionary must be called within the LocaleDictionaryContextProvider`
    );
  }
  return localeDictionary;
}

export { LocaleDictionaryContext, useLocaleDictionary };
