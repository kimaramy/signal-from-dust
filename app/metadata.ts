import type { Metadata } from 'next';

import metadata from '@/lib/metadata.json';

export const baseMetadata: Metadata = {
  metadataBase: new URL(metadata.domain),
  title: metadata.title,
  // title: {
  //   default: metadata.title,
  //   template: `%s | ${metadata.title}`,
  // },
  description: metadata.description,
  keywords: metadata.keywords,
  authors: {
    name: metadata.author.name,
    url: metadata.author.url,
  },
  alternates: {
    canonical: metadata.domain,
    languages: {
      en: `${metadata.domain}/en`,
      ko: `${metadata.domain}/ko`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: metadata.title,
    images: {
      url: metadata.link.og_image,
      alt: metadata.title,
      width: 1200,
      height: 630,
    },
    locale: 'en',
    alternateLocale: 'ko',
  },
  twitter: {
    site: 'Data Visualization',
    card: 'summary_large_image',
    creator: metadata.author.name,
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
};
