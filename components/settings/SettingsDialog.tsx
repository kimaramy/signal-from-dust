'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// import Logo from '../Logo';
import SettingsFormContainer from './SettingsFormContainer';
import SettingsFormSubmitButton from './SettingsFormSubmitButton';

function SettingsDialog() {
  const [isOpen, setOpen] = useState(true);

  return (
    <Dialog defaultOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogContent className="flex aspect-video w-[50vw] max-w-[768px] overflow-hidden p-0 md:w-full">
        <section className="relative isolate w-1/2">
          <Image
            src="/thumb-lg.webp"
            alt="thumbnail"
            width={500}
            height={500}
            className="h-full w-full object-cover dark:blur-sm dark:invert"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-primary mix-blend-multiply dark:bg-background dark:mix-blend-screen"></div>
          <div className="z-5 absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <Link href="/" className="flex items-center space-x-2 text-white">
              {/* <Logo /> */}
              <span className="inline-block font-bold">{siteConfig.name}</span>
            </Link>
          </div>
        </section>
        <section className="w-1/2 px-4 py-6">
          <DialogHeader>
            <DialogTitle>데이터 선택</DialogTitle>
            {/* <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription> */}
          </DialogHeader>
          <section className="py-4">
            <SettingsFormContainer />
          </section>
          <DialogFooter>
            <DialogClose>
              <SettingsFormSubmitButton label="시작" />
            </DialogClose>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
