import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import SettingsFormContainer from './SettingsFormContainer';
import SettingsFormSubmitButton from './SettingsFormSubmitButton';

function SettingsSheetContent() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>조회할 데이터를 선택하세요</SheetTitle>
        {/* <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription> */}
      </SheetHeader>
      <section className="pt-6">
        <SettingsFormContainer />
      </section>
      <SheetFooter className="absolute bottom-0 left-0 w-full p-6">
        <SheetClose className="w-full">
          <SettingsFormSubmitButton />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default SettingsSheetContent;
