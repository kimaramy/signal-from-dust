'use client';

import { useMobileDetect } from '../hooks';

interface DesktopOnlyProps {
  children: React.ReactNode;
}

function DesktopOnly({ children }: DesktopOnlyProps) {
  const isMobile = useMobileDetect();

  if (isMobile) return null;

  return <>{children}</>;
}

export default DesktopOnly;
