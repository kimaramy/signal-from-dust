import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isMobile } from '@/lib/device';

const unsupportedPath = '/unsupported';
const dynamicQueryPath = '/query';

export function middleware({ headers, nextUrl }: NextRequest) {
  const safeUrl = nextUrl.clone(); // https://nextjs.org/docs/messages/middleware-relative-urls
  const userAgent = headers.get('user-agent');
  const isUnsupportedPath = safeUrl.pathname.startsWith(unsupportedPath);
  const isDynamicQueryPath = safeUrl.pathname.startsWith(dynamicQueryPath);
  if (isMobile(userAgent ?? '') && !isUnsupportedPath) {
    safeUrl.pathname = unsupportedPath; // will be redirected to '/not-found' if not found
    return NextResponse.redirect(safeUrl);
  }
  const hasDynamicQuery = [...new Set(safeUrl.searchParams.keys())].length > 0;
  if (hasDynamicQuery && !isDynamicQueryPath && !isUnsupportedPath) {
    safeUrl.pathname = dynamicQueryPath;
    return NextResponse.redirect(safeUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
