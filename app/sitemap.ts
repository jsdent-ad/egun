import type { MetadataRoute } from 'next'

const BASE_URL = 'https://egun.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/natural-tooth', priority: 0.8 },
    { url: '/implant', priority: 0.8 },
    { url: '/cosmetic', priority: 0.8 },
    { url: '/orthodontics', priority: 0.8 },
    { url: '/pediatric', priority: 0.8 },
    { url: '/media', priority: 0.6 },
    { url: '/notice', priority: 0.5 },
  ]

  return pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.priority >= 0.8 ? 'weekly' : 'monthly',
    priority: page.priority,
  }))
}
