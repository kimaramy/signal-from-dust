export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ko'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const getSafeLocale = (locale: Locale) =>
  i18n.locales.includes(locale) ? locale : i18n.defaultLocale; // to avoid runtime error
