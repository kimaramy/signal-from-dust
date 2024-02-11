import { ButtonGroup } from '@/components/ui/group';
import { IntroSheetTriggerButton } from '@/components/intro';
import { LocaleToggleButton } from '@/components/locale';
import { SettingsSheetTriggerButton } from '@/components/settings/components/sheet';
import { ThemeToggleButton } from '@/components/theme';

function DesktopMenu() {
  return (
    <ButtonGroup
      className="hidden flex-none md:flex"
      items={[
        <SettingsSheetTriggerButton />,
        <IntroSheetTriggerButton />,
        <ThemeToggleButton />,
        <LocaleToggleButton />,
      ]}
    />
  );
}

export default DesktopMenu;
