import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const ScreenSequence = dynamic(
  () =>
    import(
      './components/_ScreenSequence' /* webpackChunkName: "ScreenSequence" */
    ),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
