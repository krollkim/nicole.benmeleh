/**
 * JSON-LD structured-data builders (schema.org) for the ניקול בן מלך landing page.
 *
 * One graph, cross-linked by `@id` (pattern from the seo-geo-audit skill):
 * ProfessionalService (the clinic) ↔ Person (ניקול) ↔ WebSite. Render
 * `siteGraph` once (root layout); render `faqPageJsonLd` on the page that
 * has the FAQ section.
 *
 * HARD RULES for this project (see docs/nicole-page-copy-v11.md legal note):
 *  - No price anywhere: no `offers`, no `priceRange`, no price field of any
 *    kind, on any node.
 *  - No healing claims / outcome promises: no `MedicalCondition`,
 *    `MedicalTherapy` efficacy fields, `healthCondition`. The page talks
 *    about symptoms that changed and about process — schema must not assert
 *    more than that.
 *  - No `AggregateRating` / `Review`: the testimonials are unapproved for
 *    publication (docs/nicole-page-copy-v11.md §6) — emitting review markup
 *    would fabricate it.
 *  - Every Hebrew string here is lifted verbatim from
 *    docs/nicole-page-copy-v11.md (v1.2) / design/out/brand.json. Do not
 *    paraphrase, shorten, or "helpfully" complete a sentence (see the FAQ
 *    "כמה זה עולה?" entry, which deliberately gives no number).
 *  - Only describe what is actually on the page.
 */
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  PERSON_NAME,
  PERSON_JOB_TITLE,
  CLINIC_NAME,
  CLINIC_STREET_ADDRESS,
  CLINIC_CITY,
  CLINIC_COUNTRY,
  CLINIC_PHONE,
  INSTAGRAM_URL,
} from '@/lib/site'

const CLINIC_ID = `${SITE_URL}/#clinic`
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

// ── The clinic ───────────────────────────────────────────────────────────
//
// Type choice: `ProfessionalService`, not `Organization` and not
// `MedicalClinic` / `Hospital` / `Physician`. Those last three sit under
// schema.org's `MedicalOrganization` branch, which search/AI engines read as
// a claim of licensed, regulated clinical care — exactly what the page's own
// legal note (docs/nicole-page-copy-v11.md, "הערה משפטית") and the footer
// disclaimer ("טיפולים משלימים ואינם מהווים תחליף לייעוץ, אבחון או טיפול
// רפואי") explicitly disclaim. `ProfessionalService` is schema.org's neutral
// type for a service business with a physical address (supports
// `address`/`areaServed`/`sameAs`/`founder` etc.) without importing any
// regulated-provider semantics, and it's the type the seo-geo-audit skill
// recommends over plain `Organization` for a clinic/studio/agency.
// `telephone` is ניקול's number (site.ts `CLINIC_PHONE`) — structured data
// only; the page itself shows no phone and has no `tel:` link, because the
// funnel is WhatsApp-first. No `openingHoursSpecification` (not provided),
// no `priceRange`, no `offers`.
export const professionalServiceJsonLd = {
  '@type': 'ProfessionalService',
  '@id': CLINIC_ID,
  name: CLINIC_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  inLanguage: 'he',
  telephone: CLINIC_PHONE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CLINIC_STREET_ADDRESS,
    addressLocality: CLINIC_CITY,
    addressCountry: CLINIC_COUNTRY,
  },
  areaServed: {
    '@type': 'City',
    name: CLINIC_CITY,
  },
  founder: { '@id': PERSON_ID },
  employee: { '@id': PERSON_ID },
  sameAs: [INSTAGRAM_URL],
}

// ── Person (ניקול) ──────────────────────────────────────────────────────
//
// `knowsAbout` mirrors — not invents — the credentials written as real body
// text in docs/nicole-page-copy-v11.md §5. Every entry below is a verbatim
// substring of that section.
export const personJsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  jobTitle: PERSON_JOB_TITLE,
  // Verbatim, §5 first line.
  description:
    'אני מטפלת ברפואה סינית — דיקור, שיאצו, כוסות רוח ופורמולות צמחים.',
  worksFor: { '@id': CLINIC_ID },
  url: SITE_URL,
  sameAs: [INSTAGRAM_URL],
  knowsAbout: [
    'דיקור',
    'שיאצו',
    'כוסות רוח',
    'פורמולות צמחים',
    'אבחנות בטן',
    'דיקור קרקפת בשיטת YNSA',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    // Verbatim, §5: "למדתי ארבע שנים במכללת תמורות".
    name: 'מכללת תמורות',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    // Verbatim, §5: "אני מוסמכת מטעם האיגוד העולמי של רפואה סינית".
    name: 'מוסמכת מטעם האיגוד העולמי של רפואה סינית',
  },
}

// ── WebSite ─────────────────────────────────────────────────────────────
export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'he',
  publisher: { '@id': CLINIC_ID },
}

/** Global graph — render once, in the root layout, via <JsonLd data={siteGraph} />. */
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [professionalServiceJsonLd, personJsonLd, websiteJsonLd],
}

// ── FAQPage ─────────────────────────────────────────────────────────────
//
// All seven Q&As, verbatim, from docs/nicole-page-copy-v11.md §8 (identical
// text also appears in design/out/brand.json sections.faq.items). This array
// is intentionally private to schema.ts: if a later wave introduces a shared
// FAQ content module for the visible section, keep both in sync by copying
// text verbatim rather than re-deriving it, since this copy is legally
// reviewed (see the "כמה זה עולה?" answer, which deliberately gives no price).
const faqs: { q: string; a: string }[] = [
  {
    q: 'זה כואב?',
    a: 'שיאצו לא כואב, הוא נעים ומרפה. בדיקור מרגישים דקירה קלה ברגע ההחדרה, וכשהמחטים בפנים זה לא כואב — רוב הנשים נרגעות ונרדמות.',
  },
  {
    q: 'צריך להתפשט?',
    a: 'לא. הטיפול נעשה עם בגדים.',
  },
  {
    q: 'כמה זמן זה לוקח?',
    a: 'המפגש הוא בערך 45 דקות. המפגש הראשון קצת ארוך יותר כי הוא כולל אבחון ושיחה.',
  },
  {
    q: 'כמה טיפולים אני צריכה?',
    a: 'תלוי בך ובמה שהגוף מראה באבחון. אני לא נוקבת במספר לפני שראיתי אותך. בדרך כלל עובדות בסדרה, בערך פעם בשבוע, ומתאימות את הקצב לתגובה.',
  },
  {
    q: 'כמה זה עולה?',
    // Deliberately no number — do not "helpfully" add a price.
    a: 'זה תלוי בסוג הטיפול ובסדרה שנבנה יחד. כתבי לי ונדבר על זה בפתיחות.',
  },
  {
    q: 'את מטפלת רק בנשים?',
    a: 'רוב מי שמגיע אליי הן נשים, ובעיקר בנושאים של פוריות, הריון ואיזון הורמונלי. אני מטפלת גם בגברים.',
  },
  {
    q: 'זה במקום רופא?',
    a: 'לא. רפואה סינית היא טיפול משלים. היא לא מחליפה בדיקות, אבחנות או טיפול רפואי, ואני תמיד אשמח שנעבוד לצד הגורמים המטפלים שלך.',
  },
]

export const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  inLanguage: 'he',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}
