'use client';

import { useMobileDetect } from '../hooks';

interface MobileOnlyProps {
  children: React.ReactNode;
}

function MobileOnly({ children }: MobileOnlyProps) {
  const isMobile = useMobileDetect();

  if (!isMobile) return null;

  return <>{children}</>;
}

export default MobileOnly;
