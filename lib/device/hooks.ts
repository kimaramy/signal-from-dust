import { useLayoutEffect, useState } from 'react';

import { isMobile } from './parser';

function useMobile() {
  const [_isMobile, setMobile] = useState(true);

  useLayoutEffect(() => {
    setMobile(isMobile(window.navigator.userAgent));
  }, []);

  return _isMobile;
}

export { useMobile };
