import { ButtonGroup } from '@/components/ui/group';
import { SettingsSheetTriggerButton } from '@/components/settings/sheet';

function MobileMenu() {
  return (
    <ButtonGroup
      className="flex-none md:hidden"
      items={[<SettingsSheetTriggerButton />]}
    />
  );
}

export default MobileMenu;
