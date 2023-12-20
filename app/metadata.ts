import { type Metadata } from 'next';

import { seoConfig } from '@/lib/seo';

export const baseMetadata: Metadata = {
  metadataBase: new URL(seoConfig.links.origin),
  title: {
    default: seoConfig.title,
    template: `%s - ${seoConfig.title}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: {
    name: seoConfig.author,
    url: seoConfig.links.github,
  },
  openGraph: {
    type: 'website',
    siteName: seoConfig.title,
    images: {
      url: seoConfig.links.ogImage,
      alt: seoConfig.title,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    site: 'Data Visualization',
    card: 'summary_large_image',
    creator: seoConfig.author,
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
