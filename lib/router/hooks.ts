'use client';

import { useRouter as useAppRouter } from 'next/navigation';

import { start } from './events';
import { shouldTriggerStartEvent } from './utils';

function useRouter(): ReturnType<typeof useAppRouter> {
  const router = useAppRouter();
  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) start();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) start();
      router.replace(href, options);
    },
  };
}

export { useRouter };
