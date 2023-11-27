import dynamic from 'next/dynamic';

export const SettingsDialog = dynamic(
  () => import('./SettingsDialog' /* webpackChunkName: "SettingsDialog" */),
  { ssr: false }
);
