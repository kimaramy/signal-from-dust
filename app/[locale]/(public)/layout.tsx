import { DesktopOnly, MobileOnly } from '@/lib/device';
import type { NextLayoutProps } from '@/lib/router';
import { SafeArea } from '@/components/ui/safe-area';
import { BitNoise } from '@/components/bit';
import { IntroDialog } from '@/components/intro';
import { Footer, Main } from '@/components/layout';

type LayoutProps = NextLayoutProps & {
  modal: React.ReactNode;
};

function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      <Main>{children}</Main>
      <MobileOnly>
        <Footer />
        <IntroDialog />
      </MobileOnly>
      <DesktopOnly>
        <BitNoise />
      </DesktopOnly>
      {modal}
    </>
  );
}

export default Layout;
