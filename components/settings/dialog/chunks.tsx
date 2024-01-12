import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const SettingsDialog = dynamic(
  () => import('./_SettingsDialog' /* webpackChunkName: "SettingsDialog" */),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
