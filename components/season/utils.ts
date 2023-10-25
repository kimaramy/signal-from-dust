import { seasonSchema, type Season } from './schema';

export function getMonthRangeBySeason(season: Season) {
  switch (season) {
    case 'All':
      return new Array(12).fill(0).map((_, i) => i + 1);
    case 'Spring':
      return [3, 4, 5];
    case 'Summer':
      return [6, 7, 8];
    case 'Fall':
      return [9, 10, 11];
    case 'Winter':
      return [12, 1, 2];
    default:
      return seasonSchema.safeParse(season) as never;
  }
}

export function toKoreanSeasonName(season: Season) {
  switch (season) {
    case 'All':
      return '전체 계절';
    case 'Spring':
      return '봄';
    case 'Summer':
      return '여름';
    case 'Fall':
      return '가을';
    case 'Winter':
      return '겨울';
    default:
      return seasonSchema.safeParse(season) as never;
  }
}
