import type { Metadata } from 'next';

import type { Locale } from '@/lib/i18n';
import project from '@/lib/project.json';

export const getBaseMetadata = (locale: Locale, altLocale: Locale) =>
  ({
    metadataBase: new URL(project.domain),
    title: project.title,
    // title: {
    //   default: metadata.title,
    //   template: `%s | ${metadata.title}`,
    // },
    description: project.description,
    keywords: project.keywords,
    authors: {
      name: project.author.name,
      url: project.author.url,
    },
    alternates: {
      canonical: project.domain,
      languages: {
        en: `${project.domain}/en`,
        ko: `${project.domain}/ko`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: project.title,
      title: project.title,
      description: project.description,
      url: project.domain,
      images: {
        url: project.link.og_image,
        alt: project.title,
        width: 1200,
        height: 630,
      },
      locale,
      alternateLocale: altLocale,
    },
    twitter: {
      site: 'Data Visualization',
      card: 'summary_large_image',
      creator: project.author.name,
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
  }) satisfies Metadata;
