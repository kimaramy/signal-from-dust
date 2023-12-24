import { DesktopOnly } from '@/lib/device';
import { getDictionary, i18n, LocaleDictionaryProvider } from '@/lib/i18n';
import Floating from '@/components/Floating';
import Main from '@/components/Main';
import Menu from '@/components/Menu';
import SoundFilter from '@/components/SoundFilter';

type LayoutProps = {
  params: ReturnType<typeof generateStaticParams>[0];
  children: React.ReactNode;
  modal: React.ReactNode;
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

async function Layout({ params, children, modal }: LayoutProps) {
  const dictionary = await getDictionary(params.locale);
  return (
    <LocaleDictionaryProvider locale={params.locale} dictionary={dictionary}>
      <Main id={`[${params.locale}]-layout`}>
        <SoundFilter />
        {children}
      </Main>
      {modal}
      <DesktopOnly>
        <Floating role="menu" direction="row" right={2} top={3}>
          <Menu />
        </Floating>
      </DesktopOnly>
    </LocaleDictionaryProvider>
  );
}

export default Layout;
