import '@/styles/globals.css';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Gnb from '@/components/Gnb';
import QueryClientProvider from '@/components/QueryClientProvider';
import SoundFilterX from '@/components/SoundFilterX';
import SoundFilterY from '@/components/SoundFilterY';
import TailwindIndicator from '@/components/TailwindIndicator';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="ko" suppressHydrationWarning>
        <head>{/* <script defer src="grained.js"></script> */}</head>
        <body
          className={cn(
            'min-h-screen bg-body font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider>
              <div className="relative flex min-h-screen flex-col">
                <Gnb />
                <SoundFilterX />
                <SoundFilterY />
                <div className="flex-1">{children}</div>
              </div>
            </QueryClientProvider>
            <ToastProvider />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
