import type { MetadataRoute } from 'next'
import { absoluteUrl, SITE_URL } from '@/lib/site'

/**
 * app/robots.ts — Next generates /robots.txt from this.
 *
 * PRE-LAUNCH: disallow everything. The real domain and WhatsApp number are
 * still placeholders (SITE_URL in src/lib/site.ts, WHATSAPP_PHONE in
 * src/lib/whatsapp.ts), so the site must not be crawled or submitted anywhere
 * yet. Pairs with `robots: { index: false, follow: false }` in
 * src/app/layout.tsx — FLIP BOTH TOGETHER AT LAUNCH.
 *
 * AT LAUNCH restore: { userAgent: '*', allow: '/' }, keeping the sitemap line.
 * Allow all crawlers including AI ones (GPTBot, PerplexityBot, Google-Extended)
 * — GEO discoverability depends on not blocking them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
