import { DesktopOnly, MobileOnly } from '@/lib/device';
import type { NextLayoutProps } from '@/lib/router';
import { SafeArea } from '@/components/ui/safe-area';
import { BitNoise } from '@/components/bit';
import { IntroDialog } from '@/components/intro';

type LayoutProps = NextLayoutProps & {
  modal: React.ReactNode;
};

function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      <SafeArea asChild className="h-full flex-1 3xl:border-x 3xl:px-0">
        <main>{children}</main>
      </SafeArea>
      <DesktopOnly>
        <BitNoise />
      </DesktopOnly>
      <MobileOnly>
        <IntroDialog />
      </MobileOnly>
      {modal}
    </>
  );
}

export default Layout;
