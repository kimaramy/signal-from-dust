'use client';

import IntroSheetTriggerButton from '@/components/intro/IntroSheetTriggerButton';
import LocaleToggleButton from '@/components/LocaleToggleButton';
import SettingsSheetTriggerButton from '@/components/settings/SettingsSheetTriggerButton';
import ThemeToggleButton from '@/components/ThemeToggleButton';

function Menu() {
  return (
    <nav className="flex items-center justify-center gap-2">
      <SettingsSheetTriggerButton />
      <IntroSheetTriggerButton />
      <ThemeToggleButton />
      <LocaleToggleButton />
    </nav>
  );
}

export default Menu;
