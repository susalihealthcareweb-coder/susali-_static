
import { site } from '@/data/site';

// =========================================================
// SUSALI HEALTHCARE ROBOTS.TXT
// =========================================================

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],

    sitemap: `${site.url}/sitemap.xml`,

    host: site.url,
  };
}
