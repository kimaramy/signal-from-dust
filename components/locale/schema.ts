type AvailableLocale = 'en' | 'ko';

class LocaleSchema {
  static isKorean(locale: AvailableLocale) {
    return locale.startsWith('ko');
  }
  static defaultLocale: AvailableLocale = 'ko';
  static locales: { [key: string]: AvailableLocale } = {
    en: 'en',
    ko: 'ko',
  };
}

export { LocaleSchema, type AvailableLocale };
