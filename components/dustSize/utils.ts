import { defaultDustSize, DustSize } from './schema';

export function translateDustSize(size: DustSize = defaultDustSize) {
  switch (size) {
    case 'sm':
      return '초미세먼지';
    case 'lg':
      return '미세먼지';
    default:
      throw new TypeError(`${size} is not a DustSize type`);
  }
}

export const dustGrades = {
  NULL: '미정',
  GOOD: '좋음',
  NORMAL: '보통',
  BAD: '나쁨',
  WORST: '매우 나쁨',
};

export function getDustGrade(value: number, dust: DustSize = defaultDustSize) {
  if (dust === 'lg') return getLargeDustGrade(value);
  return getSmallDustGrade(value);
}

function getLargeDustGrade(value: number) {
  if (value <= 0) return dustGrades.NULL;
  if (value <= 30) return dustGrades.GOOD;
  if (value <= 80) return dustGrades.NORMAL;
  if (value <= 150) return dustGrades.BAD;
  return dustGrades.WORST;
}

function getSmallDustGrade(value: number) {
  if (value <= 0) return dustGrades.NULL;
  if (value <= 15) return dustGrades.GOOD;
  if (value <= 35) return dustGrades.NORMAL;
  if (value <= 75) return dustGrades.BAD;
  return dustGrades.WORST;
}

export function getDustGradeColor(grade: string) {
  if (grade === dustGrades.NULL) return '#565656';
  if (grade === dustGrades.GOOD) return '#25ce7b';
  if (grade === dustGrades.NORMAL) return '#fdc741';
  if (grade === dustGrades.BAD) return '#ff6b01';
  if (grade === dustGrades.WORST) return '#fc4236';
}
