'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { SettingsModeContext } from './context';
import SettingsFormContainer from './SettingsFormContainer';
import SettingsFormSubmitButton from './SettingsFormSubmitButton';

/**
 * @issue [How to avoid hydration error](https://github.com/radix-ui/primitives/issues/1386)
 */
function SettingsDialog() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen((isOpen) => !isOpen)}>
      <DialogContent className="flex aspect-auto min-w-[768px] gap-0 overflow-hidden p-0 md:w-full">
        <section className="relative isolate w-1/2 flex-none">
          <Image
            src="/thumb-lg.webp"
            alt="thumbnail"
            width={500}
            height={500}
            loading="eager"
            className="h-full w-full object-cover dark:blur-sm dark:invert"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-primary mix-blend-multiply dark:bg-background dark:mix-blend-screen"></div>
          <div className="z-5 absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <span className="inline-block font-bold">{siteConfig.title}</span>
            </Link>
          </div>
        </section>
        <section className="flex w-1/2 flex-col p-6">
          <DialogHeader>
            <DialogTitle>데이터 선택</DialogTitle>
          </DialogHeader>
          <section className="py-4">
            <SettingsModeContext.Provider value="preset">
              <SettingsFormContainer devTool={false} />
            </SettingsModeContext.Provider>
          </section>
          <DialogFooter>
            <DialogClose className="w-full">
              <SettingsFormSubmitButton label="시작" />
            </DialogClose>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
