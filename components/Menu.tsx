'use client';

import IntroSheetTriggerButton from '@/components/intro/IntroSheetTriggerButton';
import LocaleToggleButton from '@/components/LocaleToggleButton';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

function Menu() {
  return (
    <>
      <SettingsSheetTriggerButton />
      <IntroSheetTriggerButton />
      <ThemeToggleButton />
      <LocaleToggleButton />
    </>
  );
}

export default Menu;
