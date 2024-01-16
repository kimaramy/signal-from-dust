import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// import { isMobile } from '@/lib/device';
import { i18n } from '@/lib/i18n';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

function getUserAgent(request: NextRequest) {
  return request.headers.get('user-agent');
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // https://nextjs.org/docs/messages/middleware-relative-urls

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      // Your other files in `public`
    ].includes(url.pathname)
  ) {
    return;
  }

  const locale = getLocale(request);
  const userAgent = getUserAgent(request);

  // if (
  //   isMobile(userAgent ?? '') &&
  //   !url.pathname.startsWith(`/${locale}/unsupported`)
  // ) {
  //   url.pathname = `/${locale}/unsupported`; // will be redirected to '/not-found' if not found
  //   return NextResponse.redirect(url);
  // }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !url.pathname.startsWith(`/${locale}/`) && url.pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    url.pathname = `/${locale}${url.pathname.startsWith('/') ? '' : '/'}${
      url.pathname
    }`;

    // e.g. incoming request is /weekly
    // The new URL is now /en-US/weekly
    return NextResponse.redirect(url);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
