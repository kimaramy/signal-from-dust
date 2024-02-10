import type { Metadata } from 'next';

import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/project';

export async function getBaseMetadata(locale: Locale, altLocale: Locale) {
  const dictionary = await getDictionary(locale);

  return {
    metadataBase: new URL(dictionary.domain),
    title: {
      default: dictionary.title,
      template: `%s - ${dictionary.title}`,
    },
    description: dictionary.description,
    keywords: dictionary.keywords,
    authors: {
      name: dictionary.author.name,
      url: dictionary.author.url,
    },
    alternates: {
      canonical: dictionary.domain,
      languages: {
        en: `${dictionary.domain}/en`,
        ko: `${dictionary.domain}/ko`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: dictionary.title,
      title: dictionary.title,
      description: dictionary.description,
      url: dictionary.domain,
      images: {
        url: dictionary.link.og_image,
        alt: dictionary.title,
        width: 1200,
        height: 630,
      },
      locale,
      alternateLocale: altLocale,
    },
    twitter: {
      site: 'Data Visualization',
      card: 'summary_large_image',
      creator: dictionary.author.name,
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
  } satisfies Metadata;
}
