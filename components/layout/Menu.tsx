'use client';

import React from 'react';

import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/group';
import { IntroSheetTriggerButton } from '@/components/intro';
import { LocaleToggleButton } from '@/components/locale';
import { SettingsSheetTriggerButton } from '@/components/settings/sheet';
import { ThemeToggleButton } from '@/components/theme';

const Menu = React.memo(function Menu() {
  return (
    <>
      <nav className="hidden flex-none md:flex">
        <ButtonGroup
          items={[
            <SettingsSheetTriggerButton />,
            <IntroSheetTriggerButton />,
            <ThemeToggleButton />,
            <LocaleToggleButton />,
          ]}
        />
      </nav>
      <ButtonGroup
        className="flex-none md:hidden"
        items={[
          <Button variant="ghost" size="icon">
            <Icon.Menu className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>,
        ]}
      />
    </>
  );
});

export default Menu;
