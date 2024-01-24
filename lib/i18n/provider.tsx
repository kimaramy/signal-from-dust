'use client';

import React from 'react';

import { LocaleDictionaryContext } from './context';
import type { Dictionary } from './dictionary';
import { getSafeLocale, type Locale } from './i18n';

interface LocaleDictionaryProviderProps {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}

function LocaleDictionaryProvider({
  locale,
  dictionary,
  children,
}: LocaleDictionaryProviderProps) {
  return (
    <LocaleDictionaryContext.Provider
      value={{ locale: getSafeLocale(locale), dictionary }}
    >
      {children}
    </LocaleDictionaryContext.Provider>
  );
}

export { LocaleDictionaryProvider };
