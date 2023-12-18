import { DesktopOnly } from '@/lib/device';
import type { NextLayoutProps } from '@/lib/router';
import Floating from '@/components/Floating';
import Main from '@/components/Main';
import Menu from '@/components/Menu';
import SoundFilter from '@/components/SoundFilter';

function Layout({ children }: NextLayoutProps) {
  return (
    <>
      <Main>
        <SoundFilter />
        {children}
      </Main>
      <DesktopOnly>
        <Floating role="menu" direction="row" right={2} top={3}>
          <Menu />
        </Floating>
      </DesktopOnly>
    </>
  );
}

export default Layout;
