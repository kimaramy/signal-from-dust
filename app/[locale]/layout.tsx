import '../globals.css';

import type { Metadata } from 'next';

import { cn } from '@/lib/css';
import { fontSans } from '@/lib/fonts';
import { getDictionary, i18n, LocaleDictionaryProvider } from '@/lib/i18n';
import { QueryClientProvider } from '@/lib/react-query';
import {
  Progress,
  RouteChangeEventHandlers,
  type NextLayoutProps,
} from '@/lib/router';
import { ToastProvider } from '@/lib/toast';
import { ThemeProvider } from '@/components/theme';

import { getBaseMetadata } from '../metadata';

type LayoutProps = NextLayoutProps & {
  params: ReturnType<typeof generateStaticParams>[0];
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params: { locale },
}: LayoutProps): Metadata {
  return getBaseMetadata(locale, locale === 'en' ? 'ko' : 'en');
}

async function Layout({ params, children }: LayoutProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased scrollbar-hide',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider>
            <LocaleDictionaryProvider
              locale={params.locale}
              dictionary={dictionary}
            >
              <div
                id="root-layout"
                className="relative flex min-h-screen flex-col"
              >
                {children}
              </div>
              <ToastProvider />
            </LocaleDictionaryProvider>
          </QueryClientProvider>
        </ThemeProvider>
        <RouteChangeEventHandlers progressComponent={<Progress />} />
      </body>
    </html>
  );
}

export default Layout;
