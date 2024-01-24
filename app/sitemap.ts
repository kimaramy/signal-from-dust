import type { MetadataRoute } from 'next';

import { i18n } from '@/lib/i18n';
import metadata from '@/lib/metadata.json';
import { CollectionUtils } from '@/lib/model';

export default function sitemap(): MetadataRoute.Sitemap {
  const rootPages = i18n.locales.map((locale) => ({
    url: `${metadata.domain}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1, // 0 ~ 1.0 (default: 0.5)
  })) as MetadataRoute.Sitemap;

  const collectionPages = i18n.locales.flatMap((locale) =>
    CollectionUtils.schema
      .mapKeys(CollectionUtils.schema.lowerCaseKey)
      .map((collection) => ({
        url: `${metadata.domain}/${locale}/${collection}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8, // 0 ~ 1.0 (default: 0.5)
      }))
  ) as MetadataRoute.Sitemap;

  const searchPages = i18n.locales.map((locale) => ({
    url: `${metadata.domain}/${locale}/search`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5, // 0 ~ 1.0 (default: 0.5)
  })) as MetadataRoute.Sitemap;

  return [...rootPages, ...collectionPages, ...searchPages];
}
