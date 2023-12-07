'use client';

import IntroSheetTriggerButton from '@/components/intro/IntroSheetTriggerButton';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function FloatingButtons() {
  return (
    <div className="fixed right-[2%] top-[3%] z-50 flex items-center justify-center gap-2 rounded-md bg-white p-2 shadow-lg dark:bg-muted">
      <IntroSheetTriggerButton />
      <SettingsSheetTriggerButton />
      <ThemeToggleButton />
    </div>
  );
}
