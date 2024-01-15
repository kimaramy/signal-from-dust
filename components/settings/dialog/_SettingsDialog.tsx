'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useLocaleDictionary } from '@/lib/i18n';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DustThumbnail } from '@/components/dust';

import { SettingsModeContext } from '../context';
import { SettingsFormContainer, SettingsFormSubmitButton } from '../form';

/**
 * @issue [How to avoid hydration error](https://github.com/radix-ui/primitives/issues/1386)
 */
function SettingsDialog() {
  const {
    locale,
    dictionary: { intro, settings },
  } = useLocaleDictionary();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen((isOpen) => !isOpen)}>
      <DialogContent className="flex aspect-auto min-h-[480px] min-w-[768px] gap-0 overflow-hidden p-0 md:w-full">
        <section className="relative isolate w-1/2 flex-none">
          <DustThumbnail name="bad" size="540" fill className="object-cover" />
          <div className="absolute left-0 top-0 h-full w-full bg-primary/50 mix-blend-multiply dark:bg-secondary/50"></div>
          <div className="z-5 absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <Link
              href={`/${locale}`}
              className="inline-block font-bold uppercase text-white"
            >
              {intro.content.title}
            </Link>
          </div>
        </section>
        <section className="flex w-1/2 flex-col justify-between p-6">
          <div>
            <DialogHeader>
              <DialogTitle>{settings.dialog.title}</DialogTitle>
            </DialogHeader>
            <section className="py-4">
              <SettingsModeContext.Provider value="preset">
                <SettingsFormContainer devTool={false} />
              </SettingsModeContext.Provider>
            </section>
          </div>
          <DialogFooter>
            <DialogClose className="w-full" asChild>
              <SettingsFormSubmitButton label={settings.dialog.ok_btn} />
            </DialogClose>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
