import './globals.css';

import { cn } from '@/lib/css';
import { fontSans } from '@/lib/fonts';
import { QueryClientProvider } from '@/lib/react-query';
import {
  Progress,
  RouteChangeEventHandlers,
  type NextLayoutProps,
} from '@/lib/router';
import { ToastProvider } from '@/lib/toast';
import { ThemeProvider } from '@/components/theme';

import AppIcons from './app-icons';
import { baseMetadata } from './metadata';

export const metadata = baseMetadata;

function RootLayout({ children }: NextLayoutProps) {
  return (
    <html suppressHydrationWarning>
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
            <div
              id="root-layout"
              className="relative flex min-h-screen flex-col"
            >
              {children}
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
