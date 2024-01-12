'use client';

import { IntroSheetTriggerButton } from '@/components/intro';
import { LocaleToggleButton } from '@/components/locale';
import { SettingsSheetTriggerButton } from '@/components/settings/sheet';
import { ThemeToggleButton } from '@/components/theme';

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
