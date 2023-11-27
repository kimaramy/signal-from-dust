'use client';

import { useRouter } from 'next/navigation';

import { start } from './nprogress';
import { shouldTriggerStartEvent } from './utils';

function useDecoratedRouter(): ReturnType<typeof useRouter> {
  const router = useRouter();
  return {
    ...router,
    push(href, options) {
      if (shouldTriggerStartEvent(href)) start();
      router.push(href, options);
    },
    replace(href, options) {
      if (shouldTriggerStartEvent(href)) start();
      router.replace(href, options);
    },
  };
}

export { useDecoratedRouter };
