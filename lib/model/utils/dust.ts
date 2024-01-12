import { DataNameUtils } from '../schema/dataName';

const dustGrades = {
  NULL: {
    en: 'Null',
    ko: '미정',
    color: '#565656',
  },
  GOOD: {
    en: 'Good',
    ko: '좋음',
    color: '#25ce7b',
  },
  NORMAL: {
    en: 'Normal',
    ko: '보통',
    color: '#fdc741',
  },
  BAD: {
    en: 'Bad',
    ko: '나쁨',
    color: '#ff6b01',
  },
  WORST: {
    en: 'Worst',
    ko: '매우나쁨',
    color: '#fc4236',
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
