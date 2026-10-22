
import { site } from '@/data/site';

// =========================================================
// SUSALI HEALTHCARE SITEMAP
// =========================================================

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/services',
    '/healthcare-network',
    '/faqs',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,

    changeFrequency: 'monthly',

    priority: route === '' ? 1.0 : 0.7,
  }));
}
