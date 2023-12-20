import './globals.css';

import { cn } from '@/lib/css';
import { fontSans } from '@/lib/fonts';
import {
  Progress,
  RouteChangeEventHandlers,
  type NextLayoutProps,
} from '@/lib/router';
import QueryClientProvider from '@/components/QueryClientProvider';
import QueryErrorBoundary from '@/components/QueryErrorBoundary';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ToastProvider';

import AppIcons from './app-icons';
import { baseMetadata } from './metadata';

export const metadata = baseMetadata;

function RootLayout({ children, modal }: NextLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <AppIcons />
      </head>
      <body
        className={cn(
          'min-h-screen bg-body font-sans antialiased scrollbar-hide',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider>
            <QueryErrorBoundary>
              <div className="relative flex min-h-screen flex-col">
                {children}
                {modal}
              </div>
            </QueryErrorBoundary>
            <ToastProvider />
          </QueryClientProvider>
        </ThemeProvider>
        <RouteChangeEventHandlers progressComponent={<Progress />} />
      </body>
    </html>
  );
}

export default RootLayout;
