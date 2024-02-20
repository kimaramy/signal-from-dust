import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const Sequence2 = dynamic(() => import('./components/Sequence2.chunk'), {
  ssr: false,
  loading: () => <Spinner />,
});
