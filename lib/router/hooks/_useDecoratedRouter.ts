'use client';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';

import progress from '../progress';
import { shouldTriggerStartEvent } from '../utils';

function useDecoratedRouter(): ReturnType<typeof useRouter> {
  const router = useRouter();
  return {
    ...router,
    push(href, options) {
      if (shouldTriggerStartEvent(href)) progress.start();
      router.push(href, options);
    },
    replace(href, options) {
      if (shouldTriggerStartEvent(href)) progress.start();
      router.replace(href, options);
    },
  };
}

/**
 * [Typed Routes](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
 */
export type TypedRoute = Route;

export default useDecoratedRouter;
