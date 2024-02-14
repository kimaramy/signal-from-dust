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
    <SheetContent className="overflow-x-hidden p-0 pr-safe pb-safe">
      <div className="relative h-full">
        <div className="p-4 sm:p-6">
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
      <SheetFooter className="sticky bottom-0 left-0 w-full p-4 backdrop-blur sm:px-6 sm:py-4">
        <SheetClose className="w-full" asChild>
          <SettingsFormSubmitButton label={settings.sheet.ok_btn} />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default SettingsSheetContent;
