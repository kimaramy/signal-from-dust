'use client';

import React, { useLayoutEffect, useState } from 'react';

import { isMobile } from './utils';

interface DesktopOnlyProps {
  children: React.ReactNode;
}

function DesktopOnly({ children }: DesktopOnlyProps) {
  const [isHidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    setHidden(isMobile(window.navigator.userAgent));
  }, []);

  if (isHidden) return null;

  return <>{children}</>;
}

export default DesktopOnly;
