'use client';

import { createContext } from 'react';

import { type Dictionary } from './dictionary';
import type { Locale } from './i18n';

type LocaleDictionaryContextValue = { dictionary: Dictionary; locale: Locale };

const LocaleDictionaryContext =
  createContext<LocaleDictionaryContextValue | null>(null);

export { LocaleDictionaryContext };
