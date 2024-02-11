import dynamic from 'next/dynamic';

import { Spinner } from '@/components/layout';

export const SettingsDialog = dynamic(
  () =>
    import('./SettingsDialog.chunk' /* webpackChunkName: "SettingsDialog" */),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
