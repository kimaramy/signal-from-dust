import type { Locale } from './i18n';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const getDictionary = async (locale?: Locale) =>
  (locale && dictionaries[locale]?.()) || dictionaries.en();
