import { NextLayoutProps } from '@/lib/router';
import { SoundFilter } from '@/components/bit';
import { Main } from '@/components/layout';

type LayoutProps = NextLayoutProps & {
  modal: React.ReactNode;
};

function Layout({ params, children, modal }: LayoutProps) {
  return (
    <>
      <Main id={`[${params.locale}]-layout`} className="bg-body">
        <SoundFilter />
        {children}
      </Main>
      {modal}
    </>
  );
}

export default Layout;
