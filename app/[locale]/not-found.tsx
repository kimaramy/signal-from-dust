'use client';

import Link from 'next/link';

import { DesktopOnly } from '@/lib/device';
import { useLocaleDictionary } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import Main from '@/components/Main';

export default function NotFound() {
  const { locale, dictionary } = useLocaleDictionary();

  return (
    <Main className="flex h-screen items-center justify-center">
      <section className="p-4">
        <div className="flex items-center justify-center gap-3">
          <h2 className="font-mono text-2xl font-bold">404</h2>
          <div
            role="presentation"
            className="h-[1.5em] w-[1px] border-l-[1px] border-muted-foreground"
          ></div>
          <p className="text-lg">{dictionary.not_found.title}</p>
        </div>
        <DesktopOnly>
          <div className="mt-6 flex w-full justify-center">
            <Button asChild>
              <Link href={`/${locale}`}>{dictionary.not_found.ok_btn}</Link>
            </Button>
          </div>
        </DesktopOnly>
      </section>
    </Main>
  );
}
