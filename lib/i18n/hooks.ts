'use client';

import { useContext, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import {
  LocaleDictionaryContext,
  LocaleDictionaryContextError,
} from './context';
import { Locale } from './i18n';

function useLocaleDictionary() {
  const localeDictionary = useContext(LocaleDictionaryContext);
  if (!localeDictionary) {
    throw LocaleDictionaryContextError(useLocaleDictionary.name);
  }
  return localeDictionary;
}

function useLocaleSwitchedURL(
  locale: Locale,
  switchFn: (locale: Locale) => Locale
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const localeSwitchedURL = useMemo(() => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = switchFn(locale); // e.g. locale === 'en' ? 'ko' : 'en';
    return `${segments.join('/')}?${searchParams.toString()}`;
  }, [pathname, searchParams, switchFn, locale]);

  return localeSwitchedURL;
}

export { useLocaleDictionary, useLocaleSwitchedURL };
