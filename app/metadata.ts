import { type Metadata } from 'next';

import { siteConfig } from '@/lib/site';

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.links.origin),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
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
  icons: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      sizes: '16x16',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/apple-icon-180x180.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/android-icon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon-96x96.png',
    },
  ],
};
