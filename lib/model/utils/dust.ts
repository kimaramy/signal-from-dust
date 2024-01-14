import { DataNameUtils } from '../schema/dataName';

const dustGrades = {
  NULL: {
    grade: 'NULL',
    color: '#565656',
    i18n: {
      en: 'Null',
      ko: '미정',
    },
  },
  GOOD: {
    grade: 'GOOD',
    color: '#25ce7b',
    i18n: {
      en: 'Good',
      ko: '좋음',
    },
  },
  NORMAL: {
    grade: 'NORMAL',
    color: '#fdc741',
    i18n: {
      en: 'Normal',
      ko: '보통',
    },
  },
  BAD: {
    grade: 'BAD',
    color: '#ff6b01',
    i18n: {
      en: 'Bad',
      ko: '나쁨',
    },
  },
  WORST: {
    grade: 'WORST',
    color: '#fc4236',
    i18n: {
      en: 'Worst',
      ko: '매우나쁨',
    },
  },
};

class DustUtils {
  static unit = '㎍/㎥';
  private static getLargeDustGrade(value: number) {
    if (value <= 0) return dustGrades.NULL;
    if (value <= 30) return dustGrades.GOOD;
    if (value <= 80) return dustGrades.NORMAL;
    if (value <= 150) return dustGrades.BAD;
    return dustGrades.WORST;
  }
  private static getSmallDustGrade(value: number) {
    if (value <= 0) return dustGrades.NULL;
    if (value <= 15) return dustGrades.GOOD;
    if (value <= 35) return dustGrades.NORMAL;
    if (value <= 75) return dustGrades.BAD;
    return dustGrades.WORST;
  }
  static getGrade(value: number, dataName: DataNameUtils.Key) {
    if (dataName === 'PM_LARGE') return this.getLargeDustGrade(value);
    if (dataName === 'PM_SMALL') return this.getSmallDustGrade(value);
    return dustGrades.NULL;
  }
}

export { DustUtils };
