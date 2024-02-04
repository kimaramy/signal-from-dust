'use client';

import { useLayoutEffect, useState } from 'react';

import { isMobile } from './parser';

interface UseMobileDetectParams {
  userAgent?: string | null;
}

function useMobileDetect(params?: UseMobileDetectParams) {
  const userAgentOnServer = params?.userAgent;

  const [_isMobile, setMobile] = useState(
    userAgentOnServer ? isMobile(userAgentOnServer) : false
  );

  useLayoutEffect(() => {
    const userAgentOnClient = window.navigator.userAgent;
    setMobile(isMobile(userAgentOnClient));
  }, []);

  return _isMobile;
}

export { useMobileDetect };
