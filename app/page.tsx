'use client';

import Dataset from '@/components/Dataset';
import FloatingButtons from '@/components/FloatingButtons';
import Minimap from '@/components/MiniMap';
import { SettingsDialog } from '@/components/settings';

export default function IndexPage() {
  return (
    <>
      <main className="relative flex flex-1 items-center overflow-y-auto scrollbar-hide 3xl:container 3xl:!px-0">
        <Minimap />
        <Dataset />
      </main>
      <FloatingButtons />
      <SettingsDialog />
    </>
  );
}
