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

export default useDecoratedRouter;
