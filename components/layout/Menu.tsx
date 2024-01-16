'use client';

import { ButtonGroup } from '@/components/ui/group';
import { IntroSheetTriggerButton } from '@/components/intro';
import { LocaleToggleButton } from '@/components/locale';
import { SettingsSheetTriggerButton } from '@/components/settings/sheet';
import { ThemeToggleButton } from '@/components/theme';

function Menu() {
  return (
    <nav className="hidden md:block">
      <ButtonGroup
        items={[
          <SettingsSheetTriggerButton />,
          <IntroSheetTriggerButton />,
          <ThemeToggleButton />,
          <LocaleToggleButton />,
        ]}
      />
    </nav>
  );
}

export default Menu;
