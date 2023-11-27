import { type Metadata } from 'next';

import { siteConfig } from '@/lib/site';

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.links.origin),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: {
    name: siteConfig.author,
    url: siteConfig.links.github,
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.title,
    images: {
      url: siteConfig.links.ogImage,
      alt: siteConfig.title,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    site: 'Data Visualization',
    card: 'summary_large_image',
    creator: siteConfig.author,
  },
  viewport: {
    initialScale: 1.0,
    width: 'device-width',
  },
  formatDetection: {
    telephone: false,
  },
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
