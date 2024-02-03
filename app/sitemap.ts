import type { MetadataRoute } from 'next';

import { i18n } from '@/lib/i18n';
import { CollectionUtils } from '@/lib/model';
import project from '@/lib/project.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const rootPages = i18n.locales.map((locale) => ({
    url: `${project.domain}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1, // 0 ~ 1.0 (default: 0.5)
  })) as MetadataRoute.Sitemap;

  const collectionPages = i18n.locales.flatMap((locale) =>
    CollectionUtils.schema
      .mapKeys(CollectionUtils.schema.lowerCaseKey)
      .map((collection) => ({
        url: `${project.domain}/${locale}/${collection}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8, // 0 ~ 1.0 (default: 0.5)
      }))
  ) as MetadataRoute.Sitemap;

  const searchPages = i18n.locales.map((locale) => ({
    url: `${project.domain}/${locale}/search`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5, // 0 ~ 1.0 (default: 0.5)
  })) as MetadataRoute.Sitemap;

  return [...rootPages, ...collectionPages, ...searchPages];
}
