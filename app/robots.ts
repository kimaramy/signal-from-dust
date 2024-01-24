import type { MetadataRoute } from 'next';

import metadata from '@/lib/metadata.json';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/'],
    },
    sitemap: [`${metadata.domain}/sitemap.xml`],
  };
}
