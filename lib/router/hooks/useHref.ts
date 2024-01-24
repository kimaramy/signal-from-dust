import { usePathname, useSearchParams } from 'next/navigation';

function useHref() {
  const pathname = usePathname();
  const seachParams = useSearchParams();
  return `${pathname}?${seachParams.toString()}`;
}

export default useHref;
