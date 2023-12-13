'use client';

import IntroSheetTriggerButton from '@/components/intro/IntroSheetTriggerButton';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

function Menu() {
  return (
    <>
      <IntroSheetTriggerButton />
      <SettingsSheetTriggerButton />
      <ThemeToggleButton />
    </>
  );
}

export default Menu;
