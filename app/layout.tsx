import '@/styles/globals.css';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
// import Gnb from '@/components/Gnb';
import QueryClientProvider from '@/components/QueryClientProvider';
import SoundFilterX from '@/components/SoundFilterX';
import SoundFilterY from '@/components/SoundFilterY';
// import TailwindIndicator from '@/components/TailwindIndicator';
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
        <head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <meta
            name="keywords"
            content="data art, interative, visualization, sonification, graphic, sound, pattern, dust"
          />
          <meta name="author" content="Fed" />
          {/* 페이지별 오픈그래프 공통 */}
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="Sound Of Dust" />
          <meta name="og:locale" content="ko_KR" />
          <meta name="og:image" content="" />
          <meta name="og:image:alt" content="Sound Of Dust" />
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="628" />
          {/* 페이지별 트위터 공통 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@DataArt" />
          <meta name="twitter:creator" content="@Fed" />
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
                {/* <Gnb /> */}
                <SoundFilterX />
                <SoundFilterY />
                <div className="flex-1">{children}</div>
              </div>
              <ToastProvider />
            </QueryClientProvider>
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
