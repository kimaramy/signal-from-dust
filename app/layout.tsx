import './globals.css';

import { Suspense } from 'react';

import { fontSans } from '@/lib/fonts';
import { OnRouteChangeComplete } from '@/lib/router';
import { cn } from '@/lib/utils';
import FakeDataset from '@/components/FakeDataset';
import FloatingButtons from '@/components/FloatingButtons';
import QueryClientProvider from '@/components/QueryClientProvider';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import RuntimeErrorBoundary from '@/components/RuntimeErrorBoundary';
import SoundFilterX from '@/components/SoundFilterX';
import SoundFilterY from '@/components/SoundFilterY';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ToastProvider';

import { baseMetadata } from './metadata';

export const metadata = baseMetadata;
interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'none'" /> */}
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
              <SoundFilterX />
              <SoundFilterY />
              <div className="flex-1">
                <RuntimeErrorBoundary>
                  <QueryErrorBoundary>
                    <Suspense fallback={<FakeDataset />}>
                      {children}
                      <FloatingButtons />
                    </Suspense>
                  </QueryErrorBoundary>
                </RuntimeErrorBoundary>
              </div>
            </div>
            <ToastProvider />
          </QueryClientProvider>
        </ThemeProvider>
        <OnRouteChangeComplete />
      </body>
    </html>
  );
}

export default RootLayout;
