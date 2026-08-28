import type { MetadataRoute } from 'next';
import { config } from '@/lib/constants/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.site.url;

  const routes = ['', '/about', '/projects', '/contact', '/security'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
