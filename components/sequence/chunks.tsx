import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const RealtimeSequence = dynamic(
  () => import('./components/RealtimeSequence.chunk'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
