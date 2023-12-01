import Link from 'next/link';

import { DesktopOnly } from '@/lib/device';
import { Button } from '@/components/ui/button';
import Main from '@/components/Main';

export default function NotFound() {
  return (
    <Main className="flex h-screen items-center justify-center">
      <section className="p-4">
        <div className="flex items-center justify-center gap-3">
          <h2 className="font-mono text-2xl font-bold">404</h2>
          <div
            role="presentation"
            className="h-[1.5em] w-[1px] border-l-[1px] border-muted-foreground"
          ></div>
          <p className="text-lg">Page not found</p>
        </div>
        <DesktopOnly>
          <div className="mt-6 flex w-full justify-center">
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </DesktopOnly>
      </section>
    </Main>
  );
}
