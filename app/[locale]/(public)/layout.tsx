import { getDictionary, Locale, LocaleDictionaryProvider } from '@/lib/i18n';
import { NextLayoutProps } from '@/lib/router';
import { SoundFilter } from '@/components/bit';
import { Main } from '@/components/layout';

type LayoutProps = NextLayoutProps & {
  modal: React.ReactNode;
};

async function Layout({ params, children, modal }: LayoutProps) {
  const locale = params?.locale as Locale;
  const dictionary = await getDictionary(locale);
  return (
    <LocaleDictionaryProvider locale={locale} dictionary={dictionary}>
      <Main id={`[${params.locale}]-layout`} className="bg-body">
        <SoundFilter />
        {children}
      </Main>
      {modal}
    </LocaleDictionaryProvider>
  );
}

export default Layout;
