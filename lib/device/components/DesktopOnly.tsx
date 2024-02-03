'use client';

import { useMobile } from '../hooks';

interface DesktopOnlyProps {
  children: React.ReactNode;
}

function DesktopOnly({ children }: DesktopOnlyProps) {
  const isMobile = useMobile();

  if (isMobile) return null;

  return <>{children}</>;
}

export default DesktopOnly;
