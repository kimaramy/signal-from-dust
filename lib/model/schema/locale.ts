import type { Locale } from '@/lib/i18n';

class LocaleSchema {
  static defaultLocale: Locale = 'ko';
  static locales: Record<Locale, Locale> = {
    en: 'en',
    ko: 'ko',
  };
  static isKorean(locale: Locale) {
    return locale.startsWith('ko');
  }
}

export { LocaleSchema, type Locale };
