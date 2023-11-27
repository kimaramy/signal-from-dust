'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { finish } from '../nprogress';
import NProgress from './NProgress';

function RouteChangeCompleteHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => finish(), [pathname, searchParams]);
  return null;
}

function RouteChangeEventHandlers() {
  return (
    <>
      <Suspense>
        <RouteChangeCompleteHandler />
      </Suspense>
      <NProgress />
    </>
  );
}

export default RouteChangeEventHandlers;
