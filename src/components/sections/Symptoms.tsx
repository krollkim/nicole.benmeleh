import type { ReactElement } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ClipReveal from '@/components/ui/ClipReveal'
import StaggerReveal from '@/components/ui/StaggerReveal'

/**
 * סקשן 2 — מגיעות אליי עם.
 *
 * Six entries, verbatim titles + bodies from docs/nicole-page-copy-v11.md,
 * laid out as a two-column list separated by hairlines (not as cards).
 * Heading and the list are two separate top-level reveals
 * (ScrollReveal + StaggerReveal side by side, never nested) per the
 * gsap-scroll-reveal double-opacity rule.
 *
 * Icons are simple inline thin-line SVGs, abstract and calm — no needles,
 * no anatomy.
 */

type IconProps = { className?: string }

const iconBase = 'h-8 w-8 text-primary'

function IconFertility({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </svg>
  )
}

function IconCycle({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  )
}

function IconLayers({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 8c2-1.5 4-1.5 6 0s4 1.5 6 0" />
      <path d="M4 12.5c2-1.5 4-1.5 6 0s4 1.5 6 0" />
      <path d="M4 17c2-1.5 4-1.5 6 0s4 1.5 6 0" />
    </svg>
  )
}

function IconDigestion({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4c3 0 5 1.8 5 4s-2 3.2-4.2 3.8C10.5 12.3 8 13.4 8 16c0 2.2 2 4 4.5 4S17 18.6 17 17" />
    </svg>
  )
}

function IconNeckShoulders({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 17c0-4 3-8 4-8" />
      <path d="M20 17c0-4-3-8-4-8" />
      <path d="M8 9a4 4 0 0 1 8 0" />
    </svg>
  )
}

function IconMigraine({ className = iconBase }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M8.5 12h1.8l1.2-2.5 1.5 5 1.2-2.5h1.8" />
    </svg>
  )
}

interface SymptomCard {
  title: string
  body: string
  Icon: (props: IconProps) => ReactElement
}

const cards: SymptomCard[] = [
  {
    title: 'פוריות והריון',
    body: 'ניסיונות להיכנס להריון, ליווי לאורך ההריון, והגוף שצריך להיות מאוזן בשביל שניהם.',
    Icon: IconFertility,
  },
  {
    title: 'ווסת ואיזון הורמונלי',
    body: 'מחזור כואב או לא סדיר, תסמינים שחוזרים כל חודש ומשבשים את החיים.',
    Icon: IconCycle,
  },
  {
    title: 'כאב שיש מתחתיו עוד משהו',
    body: 'כאבי גב, כתפיים, ברכיים — מקרים אורתופדיים שהשורש שלהם לא רק פיזי.',
    Icon: IconLayers,
  },
  {
    title: 'מערכת עיכול',
    body: 'נפיחות, כובד, אי־נוחות שנמשכת שנים ו"התרגלת אליה".',
    Icon: IconDigestion,
  },
  {
    title: 'צוואר וכתפיים',
    body: 'תפיסות, מתח שלא משתחרר, ראש שמרגיש כבד בסוף היום.',
    Icon: IconNeckShoulders,
  },
  {
    title: 'מיגרנות',
    body: 'כאבי ראש חוזרים שמכתיבים לך את היום.',
    Icon: IconMigraine,
  },
]

export default function Symptoms() {
  return (
    <section id="symptoms" className="bg-surface px-4 py-20 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-8 text-start lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              מה מביא נשים לקליניקה
            </h2>
            <ClipReveal className="relative hidden aspect-[4/3] w-full max-w-xs overflow-hidden rounded-card shadow-md lg:block">
              <Image
                src="/images/F-mid-1200.webp"
                alt="ניקול מטפלת בקליניקה שלה, בחדר מואר ונעים עם אור טבעי"
                fill
                sizes="320px"
                className="object-cover"
              />
            </ClipReveal>
          </div>
        </ScrollReveal>

        {/* A two-column list, not six cards. Cards gave each symptom a box,
            a shadow and a hover state — six competing objects for something
            the reader is meant to scan and recognise herself in. A hairline
            between entries does the grouping without the chrome, and the
            extra column gap is what makes the airiness readable rather than
            merely present. `columns={2}` so the stagger resets each row. */}
        <StaggerReveal
          columns={2}
          stagger={0.12}
          className="mt-14 grid grid-cols-1 gap-x-16 md:grid-cols-2"
        >
          {cards.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="flex gap-5 border-t border-primary-200/70 py-8 text-start"
            >
              <Icon className="h-7 w-7 shrink-0 text-primary" />
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>

        <ScrollReveal className="mt-10">
          <p className="max-w-2xl text-start leading-relaxed text-muted">
            לא מצאת את עצמך ברשימה? כתבי לי בכל זאת. חלק גדול מהנשים שמגיעות אליי הגיעו עם משהו שלא ידעו איך לקרוא לו.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
