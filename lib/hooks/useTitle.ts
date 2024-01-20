import { useLayoutEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function useTitle() {
  const pathname = usePathname();
  const seachParams = useSearchParams();

  const [title, setTitle] = useState('');

  useLayoutEffect(() => {
    setTitle(document.title);
  }, [pathname, seachParams]);

  return title;
}

export default useTitle;
