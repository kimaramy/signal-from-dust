'use client';

import { useMobile } from '../hooks';

interface MobileOnlyProps {
  children: React.ReactNode;
}

function MobileOnly({ children }: MobileOnlyProps) {
  const isMobile = useMobile();

  if (!isMobile) return null;

  return <>{children}</>;
}

export default MobileOnly;
