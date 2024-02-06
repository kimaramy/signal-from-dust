'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { SettingsFormContainer, SettingsFormSubmitButton } from '../form';

function SettingsSheetContent() {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  return (
    <SheetContent className="p-0">
      <div className="relative h-full overflow-y-auto overflow-x-hidden">
        <div className="p-6">
          <SheetHeader className="text-left">
            <SheetTitle className="text-base md:text-lg">
              {settings.sheet.title}
            </SheetTitle>
          </SheetHeader>
          <section className="pt-6">
            <SettingsFormContainer useDevTool />
          </section>
        </div>
      </div>
      <SheetFooter className="sticky bottom-0 left-0 w-full p-6 backdrop-blur">
        <SheetClose className="w-full" asChild>
          <SettingsFormSubmitButton label={settings.sheet.ok_btn} />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default SettingsSheetContent;
