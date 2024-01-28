import { NextLayoutProps } from '@/lib/router';
import { BitNoise } from '@/components/bit';
import { Main } from '@/components/layout';

type LayoutProps = NextLayoutProps & {
  modal: React.ReactNode;
};

function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      <Main className="bg-body">
        <BitNoise />
        {children}
      </Main>
      {modal}
    </>
  );
}

export default Layout;
