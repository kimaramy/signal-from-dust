'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { finish } from '../events';
import NProgress from './NProgress';

function OnRouteChangeCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => finish(), [pathname, searchParams]);
  return null;
}

function OnRouteChangeComplete() {
  return (
    <>
      <Suspense>
        <OnRouteChangeCompleteChild />
      </Suspense>
      <NProgress />
    </>
  );
}

export default OnRouteChangeComplete;
