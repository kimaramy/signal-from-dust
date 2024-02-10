import '../globals.css';

import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import { cn } from '@/lib/css';
import { fontSans } from '@/lib/fonts';
import {
  getDictionary,
  LocaleDictionaryProvider,
  type Locale,
} from '@/lib/i18n';
import { SupabaseQueryClientProvider } from '@/lib/react-query';
import {
  Progress,
  RouteChangeEventHandlers,
  type NextLayoutProps,
} from '@/lib/router';
import { ToastProvider } from '@/lib/toast';
import { ThemeProvider } from '@/components/theme';

import { getBaseMetadata } from '../metadata';

export async function generateMetadata({
  params,
}: NextLayoutProps): Promise<Metadata> {
  const locale = params?.locale as Locale;
  return await getBaseMetadata(locale, locale === 'en' ? 'ko' : 'en');
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
          'min-h-screen bg-body font-sans antialiased scrollbar-hide',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseQueryClientProvider>
            <LocaleDictionaryProvider locale={locale} dictionary={dictionary}>
              <div
                id="root-layout"
                className="relative flex min-h-screen flex-col"
              >
                {children}
              </div>
              <ToastProvider />
            </LocaleDictionaryProvider>
          </SupabaseQueryClientProvider>
        </ThemeProvider>
        <RouteChangeEventHandlers progressComponent={<Progress />} />
        <GoogleAnalytics gaId="G-07RT6LJM3W" />
      </body>
    </html>
  );
}

export default Layout;
