import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware({ url, nextUrl }: NextRequest) {
  // console.log(url);
  const hasQuery = [...new Set(nextUrl.searchParams.keys())].length > 0;
  if (hasQuery) {
    return NextResponse.redirect(new URL('/query' + url.search, url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/',
};
