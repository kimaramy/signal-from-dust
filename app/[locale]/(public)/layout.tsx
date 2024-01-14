import { getDictionary, i18n, LocaleDictionaryProvider } from '@/lib/i18n';
import { SoundFilter } from '@/components/bit';
import { Main } from '@/components/layout';

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
    </LocaleDictionaryProvider>
  );
}

export default Layout;
