import { DustSize } from './schema';

export function translateDustSize(size: DustSize) {
  switch (size) {
    case 'sm':
      return '초미세먼지';
    case 'lg':
      return '미세먼지';
    default:
      throw new TypeError(`${size} is not a DustSize type`);
  }
}
