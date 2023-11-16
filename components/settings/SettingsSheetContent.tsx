'use client';

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
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>조회할 데이터를 선택하세요</SheetTitle>
      </SheetHeader>
      <section className="pt-6">
        <SettingsModeContext.Provider value="custom">
          <SettingsFormContainer devTool />
        </SettingsModeContext.Provider>
      </section>
      <SheetFooter className="absolute bottom-0 left-0 w-full p-6">
        <SheetClose className="w-full">
          <SettingsFormSubmitButton label="적용" />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default SettingsSheetContent;
