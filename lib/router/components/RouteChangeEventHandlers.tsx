'use client';

import React, { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import progress from '../progress';

function RouteChangeCompleteHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => progress.end(), [pathname, searchParams]);
  return null;
}

interface RouteChangeEventHandlersProps {
  progressComponent: React.ReactElement;
}

function RouteChangeEventHandlers({
  progressComponent,
}: RouteChangeEventHandlersProps) {
  return (
    <>
      <Suspense>
        <RouteChangeCompleteHandler />
      </Suspense>
      {progressComponent}
    </>
  );
}

export default RouteChangeEventHandlers;
