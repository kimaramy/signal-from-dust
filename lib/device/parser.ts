import MobileDetect from 'mobile-detect';

/**
 * @param userAgent user-agent string
 * - it could be window.navigator.userAgent on client
 * - if could be user-agent header value from request on server
 * @returns whether current user-agent is mobile(or tablet) device
 */
export function isMobile(userAgent: string) {
  return new MobileDetect(userAgent).mobile() !== null;
}
