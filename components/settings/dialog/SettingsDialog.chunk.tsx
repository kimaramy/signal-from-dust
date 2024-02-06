'use client';

import { useEffect, useState } from 'react';

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

import { SettingsFormContainer, SettingsFormSubmitButton } from '../form';

/**
 * @issue [How to avoid hydration error](https://github.com/radix-ui/primitives/issues/1386)
 */
function SettingsDialog() {
  const {
    dictionary: { intro, settings },
  } = useLocaleDictionary();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onceOpenedKey = 'settingsDialogOpend';
    const onceOpened = sessionStorage.getItem(onceOpenedKey) === '1';
    if (!onceOpened) {
      timeout = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem(onceOpenedKey, '1');
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen((isOpen) => !isOpen)}>
      <DialogContent className="flex min-h-screen w-screen max-w-full gap-0 overflow-hidden p-0 md:min-h-[480px] lg:aspect-auto lg:max-w-screen-md">
        <section className="relative isolate hidden w-1/2 flex-none lg:block">
          <DustThumbnail
            dustGrade="BAD"
            fileSize="540x540"
            fill
            loading="eager"
            className="object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-primary/20 mix-blend-multiply dark:bg-secondary/60 dark:mix-blend-multiply"></div>
          <div className="z-5 absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <span className="font-bold uppercase text-white">
              {intro.content.title}
            </span>
          </div>
        </section>
        <section className="flex w-full flex-col justify-between p-6 lg:w-1/2">
          <div>
            <DialogHeader>
              <DialogTitle>{settings.dialog.title}</DialogTitle>
            </DialogHeader>
            <section className="py-4">
              <SettingsFormContainer useDevTool={false} />
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
