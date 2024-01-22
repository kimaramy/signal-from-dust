import type { MetadataRoute } from 'next';

import { seoConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/'],
    },
    sitemap: [`${seoConfig.links.origin}/sitemap.xml`],
  };
}
