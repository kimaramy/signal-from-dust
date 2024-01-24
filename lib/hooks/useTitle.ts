import { useLayoutEffect, useState } from 'react';

import { useHref } from '@/lib/router';

function useTitle() {
  const href = useHref();

  const [title, setTitle] = useState('');

  useLayoutEffect(() => {
    setTitle(document.title);
  }, [href]);

  return title;
}

export default useTitle;
