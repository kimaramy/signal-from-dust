'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { resetZoom } from '@/lib/zoom';

function ZoomResetHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => resetZoom(), [pathname, searchParams]);
  return null;
}

export default ZoomResetHandler;
