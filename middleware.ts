import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSystemLocale, i18n } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // https://nextjs.org/docs/messages/middleware-relative-urls

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !url.pathname.startsWith(`/${locale}/`) && url.pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getSystemLocale(request);
    // e.g. If incoming request is '/weekly', the new URL is now '/ko/weekly'
    url.pathname = `/${locale}${url.pathname.startsWith('/') ? '' : '/'}${
      url.pathname
    }`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image responses)
   * - icon, apple-icon, favicon (icon files)
   * - robots (generated robots)
   * - sitemap (generated sitemaps)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|sitemap|robots|icon|apple-icon|favicon).*)',
  ],
};
