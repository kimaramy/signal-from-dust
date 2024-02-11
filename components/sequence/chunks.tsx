import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const Sequence3 = dynamic(() => import('./components/Sequence3.chunk'), {
  ssr: false,
  loading: () => <Spinner />,
});
