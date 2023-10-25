import { Display } from './schema';

export function toDisplayName(display: Display) {
  switch (display) {
    case '2d':
      return '모아서 보기';
    case '3d':
      return '데이터별로 보기';
    default:
      throw new TypeError(`${display} is not a Display type`);
  }
}
