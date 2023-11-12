'use client';

// import { DisplayToggleButton } from '@/components/display';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function FloatingButtons() {
  return (
    <div className="fixed right-[2%] top-[3%] z-50 flex items-center justify-center gap-2 rounded-md bg-white p-2 shadow-lg dark:bg-muted">
      <SettingsSheetTriggerButton />
      {/* <DisplayToggleButton /> */}
      <ThemeToggleButton />
    </div>
  );
}
