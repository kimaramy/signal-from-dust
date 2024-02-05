'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import project from '@/lib/project.json';
import { Link } from '@/lib/router';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function IntroDialog() {
  const {
    dictionary: { intro },
  } = useLocaleDictionary();

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const onceOpendKey = 'introDialogOpened';
    const onceOpend = sessionStorage.getItem(onceOpendKey) === '1';
    if (!onceOpend) {
      setOpen(true);
      sessionStorage.setItem(onceOpendKey, '1');
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen((isOpen) => !isOpen)}>
      <DialogContent className="h-full overflow-y-auto overflow-x-hidden p-0 md:min-h-[480px]">
        <DialogHeader className="text-left">
          <div className="relative aspect-4/3 w-full bg-primary">
            <Image
              src={project.link.og_image}
              alt={project.title}
              fill
              loading="eager"
              className="object-cover"
            />
          </div>
          <section className="p-4 md:p-6">
            <div className="space-y-2">
              <DialogTitle className="text-xl">
                {intro.content.title}
              </DialogTitle>
            </div>
            <div className="space-y-2 py-4">
              <DialogTitle className="text-sm">
                {intro.content.subtitle}
              </DialogTitle>
              <DialogDescription>{intro.content.description}</DialogDescription>
            </div>
            <div className="flex items-center justify-between">
              <ul className="divide flex h-auto items-center divide-x divide-border text-xs">
                {[
                  intro.content.author,
                  intro.content.year,
                  intro.content.type,
                ].map((word) => (
                  <li
                    key={word}
                    className="px-2 first:pl-0 first:pr-2 last:pl-2 last:pr-0"
                  >
                    {word}
                  </li>
                ))}
              </ul>
              <div>
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                  <Link href={project.link.repo} target="_blank">
                    <Icon.Github aria-hidden className="h-4 w-4" />
                    <span className="sr-only">Gitub</span>
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </DialogHeader>
        <DialogFooter className="bg-white/15 sticky bottom-0 left-0 p-4 backdrop-blur md:p-6">
          <DialogClose className="w-full" asChild>
            <Button variant="default" size="lg" className="w-full">
              {intro.ok_btn}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default IntroDialog;
