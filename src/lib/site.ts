/**
 * Central site config — single source of truth for absolute URLs and brand/NAP data.
 *
 * Pattern from the seo-geo-audit skill (site.ts + schema.ts + seo/JsonLd.tsx):
 * ONE canonical origin drives every absolute URL — schema `@id`s, sitemap,
 * robots, canonical, OG. Change SITE_URL here and nothing else needs touching.
 *
 * Every Hebrew string below is lifted verbatim from docs/nicole-page-copy-v11.md
 * (final page copy, v1.2) and design/out/brand.json. Do not paraphrase.
 */

// TODO(seo): production domain not decided yet. Replace with the final
// domain (no trailing slash; pick www OR non-www and stay consistent) before
// launch. sitemap.ts, robots.ts, schema.ts and the metadata block reported to
// the orchestrator all derive from this one constant, so this is a one-line fix.
export const SITE_URL = 'https://example.com' // TODO(seo): set final domain

export const SITE_NAME = 'ניקול בן מלך'
export const SITE_SHORT_NAME = 'ניקול בן מלך'

// Verbatim: hero subhead, docs/nicole-page-copy-v11.md §1 / brand.json sections.hero.subhead
export const SITE_DESCRIPTION =
  'רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.'

// ── Person (ניקול) ──────────────────────────────────────────────────────────
export const PERSON_NAME = 'ניקול בן מלך'

// Verbatim: docs/nicole-page-copy-v11.md §5 opening line ("אני מטפלת ברפואה סינית")
export const PERSON_JOB_TITLE = 'מטפלת ברפואה סינית'

// ── Clinic NAP — verbatim, docs/nicole-page-copy-v11.md §9 / brand.json sections.contact.clinic ──
export const CLINIC_NAME = 'קליניקת "בית מרפה"'
export const CLINIC_STREET_ADDRESS = 'אחד העם 89'
export const CLINIC_CITY = 'תל אביב'
export const CLINIC_COUNTRY = 'IL'

// TODO(seo): no phone number has been provided for the clinic yet. Do not
// invent one. Once given, set it here and wire it into
// professionalServiceJsonLd (`telephone`) in schema.ts — that field is
// currently omitted rather than guessed.
export const CLINIC_PHONE_TODO = ''

// No opening hours were supplied in the copy doc — `openingHoursSpecification`
// is intentionally omitted from schema.ts rather than guessed. Add it there
// (not here) once hours are confirmed.

export const INSTAGRAM_URL = 'https://www.instagram.com/nicole.benmeleh/'
export const INSTAGRAM_HANDLE = '@nicole.benmeleh'

/** Build an absolute URL from a path, using the (updatable) SITE_URL. */
export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
