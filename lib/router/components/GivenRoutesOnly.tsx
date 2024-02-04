'use client';

import { usePathname } from 'next/navigation';

interface GivenRoutesOnlyProps {
  pathnames: string[];
  validator?: (currentPathname: string, targetPathnames: string[]) => boolean;
  children: React.ReactNode;
}

function GivenRoutesOnly({
  pathnames,
  validator,
  children,
}: GivenRoutesOnlyProps) {
  const pathname = usePathname();

  const matchesGivenPathname =
    validator?.(pathname, pathnames) ?? pathnames.includes(pathname);

  if (!matchesGivenPathname) return null;

  return <>{children}</>;
}

export default GivenRoutesOnly;
