/**
 * Renders a JSON-LD <script> tag. Server component — safe in layouts/pages.
 *
 * Usage:
 *   import JsonLd from '@/components/seo/JsonLd'
 *   import { siteGraph, faqPageJsonLd } from '@/lib/schema'
 *
 *   // once, in the root layout:
 *   <JsonLd data={siteGraph} />
 *   // on the page that renders the FAQ section:
 *   <JsonLd data={faqPageJsonLd} />
 */
interface JsonLdProps {
  data: object
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
