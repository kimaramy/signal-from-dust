import type { MetadataRoute } from 'next';

import { project } from '@/lib/project';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/'],
    },
    sitemap: [`${project.url.domain}/sitemap.xml`],
  };
}
