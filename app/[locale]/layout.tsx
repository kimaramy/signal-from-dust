import '../globals.css';

import type { Metadata } from 'next';

import { cn } from '@/lib/css';
import { fontSans } from '@/lib/fonts';
import {
  getDictionary,
  LocaleDictionaryProvider,
  type Locale,
} from '@/lib/i18n';
import { QueryClientProvider } from '@/lib/react-query';
import {
  Progress,
  RouteChangeEventHandlers,
  type NextLayoutProps,
} from '@/lib/router';
import { ToastProvider } from '@/lib/toast';
import { ThemeProvider } from '@/components/theme';

import { getBaseMetadata } from '../metadata';

export function generateMetadata({ params }: NextLayoutProps): Metadata {
  const locale = params?.locale as Locale;
  return getBaseMetadata(locale, locale === 'en' ? 'ko' : 'en');
}

async function Layout({ params, children }: NextLayoutProps) {
  const locale = params?.locale as Locale;

  const dictionary = await getDictionary(locale);

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
            <LocaleDictionaryProvider locale={locale} dictionary={dictionary}>
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