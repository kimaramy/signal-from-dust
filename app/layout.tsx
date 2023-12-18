import './globals.css';

import { DesktopOnly } from '@/lib/device';
import { fontSans } from '@/lib/fonts';
import { Progress, RouteChangeEventHandlers } from '@/lib/router';
import { cn } from '@/lib/utils';
import Floating from '@/components/Floating';
import Menu from '@/components/Menu';
import QueryClientProvider from '@/components/QueryClientProvider';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import SoundFilter from '@/components/SoundFilter';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ToastProvider';

import { baseMetadata } from './metadata';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = baseMetadata;

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        {/* <link
          rel="shortcut icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon.ico"
        /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
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
          <QueryClientProvider>
            <div className="relative flex min-h-screen flex-col">
              <SoundFilter />
              <div className="flex-1">
                <QueryErrorBoundary>
                  {children}
                  <DesktopOnly>
                    <Floating direction="row" right={2} top={3}>
                      <Menu />
                    </Floating>
                  </DesktopOnly>
                </QueryErrorBoundary>
              </div>
            </div>
            <ToastProvider />
          </QueryClientProvider>
        </ThemeProvider>
        <RouteChangeEventHandlers progressComponent={<Progress />} />
      </body>
    </html>
  );
}

export default RootLayout;
