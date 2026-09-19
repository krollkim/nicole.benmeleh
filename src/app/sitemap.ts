import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

/**
 * app/sitemap.ts — Next generates /sitemap.xml from this.
 *
 * This is a single-page site (one URL, in-page anchors only) — the sitemap
 * has exactly one entry. If a later wave adds real sub-routes (e.g. legal
 * pages), add them here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
