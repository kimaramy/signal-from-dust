type AvailableLocale = 'en' | 'ko';

class LocaleSchema {
  static defaultLocale: AvailableLocale = 'ko';
  static locales: Record<AvailableLocale, AvailableLocale> = {
    en: 'en',
    ko: 'ko',
  };
  static isKorean(locale: AvailableLocale) {
    return locale.startsWith('ko');
  }
}

export { LocaleSchema, type AvailableLocale };
