import MobileDetect from 'mobile-detect';

export function isMobile(userAgent: string) {
  return new MobileDetect(userAgent).mobile() !== null;
}
