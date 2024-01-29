import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const RealtimeSequence = dynamic(
  () => import('./components/_RealtimeSequence'),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

// export const MobileSequence = dynamic(
//   () => impor./components/MobileSequencence'),
//   {
//     ssr: false,
//     loading: () => <Spinner />,
//   }
// );

// export const Sequence = dynamic(() => import('./components/Sequence'), {
//   ssr: false,
//   loading: () => <Spinner />,
// });
