'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { SettingsModeContext } from './context';
import SettingsFormContainer from './SettingsFormContainer';
import SettingsFormSubmitButton from './SettingsFormSubmitButton';

function SettingsSheetContent() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{settings.sheet.title}</SheetTitle>
      </SheetHeader>
      <section className="pt-6">
        <SettingsModeContext.Provider value="custom">
          <SettingsFormContainer devTool />
        </SettingsModeContext.Provider>
      </section>
      <SheetFooter className="absolute bottom-0 left-0 w-full p-6">
        <SheetClose className="w-full">
          <SettingsFormSubmitButton label={settings.sheet.ok_btn} />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default SettingsSheetContent;
