import { type DataNameKey } from './schema';

class DustGrade {
  static grades = {
    NULL: '미정',
    GOOD: '좋음',
    NORMAL: '보통',
    BAD: '나쁨',
    WORST: '매우 나쁨',
  };
  private static getLargeDustGrade(value: number) {
    if (value <= 0) return DustGrade.grades.NULL;
    if (value <= 30) return DustGrade.grades.GOOD;
    if (value <= 80) return DustGrade.grades.NORMAL;
    if (value <= 150) return DustGrade.grades.BAD;
    return DustGrade.grades.WORST;
  }
  private static getSmallDustGrade(value: number) {
    if (value <= 0) return DustGrade.grades.NULL;
    if (value <= 15) return DustGrade.grades.GOOD;
    if (value <= 35) return DustGrade.grades.NORMAL;
    if (value <= 75) return DustGrade.grades.BAD;
    return DustGrade.grades.WORST;
  }
  static getGrade(value: number, dataName: DataNameKey) {
    if (dataName === 'PM_LARGE') return this.getLargeDustGrade(value);
    if (dataName === 'PM_SMALL') return this.getSmallDustGrade(value);
    return DustGrade.grades.NULL;
  }
  static getGradeColor(dustGrade: string) {
    if (dustGrade === DustGrade.grades.NULL) return '#565656';
    if (dustGrade === DustGrade.grades.GOOD) return '#25ce7b';
    if (dustGrade === DustGrade.grades.NORMAL) return '#fdc741';
    if (dustGrade === DustGrade.grades.BAD) return '#ff6b01';
    return '#fc4236';
  }
}

export { DustGrade };
