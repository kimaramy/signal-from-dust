import { i18n, type Locale } from '@/lib/i18n';

class LocaleSchema {
  static defaultLocale: Locale = i18n.defaultLocale;
  static locales: Record<Locale, Locale> = i18n.locales.reduce(
    (accum, locale) => {
      if (!accum[locale]) accum[locale] = locale;
      return accum;
    },
    {} as Record<Locale, Locale>
  );
  static isEnglish(locale: Locale) {
    return locale.startsWith('en');
  }
  static isKorean(locale: Locale) {
    return locale.startsWith('ko');
  }
}

export { LocaleSchema, type Locale };
