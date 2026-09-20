import type { ReactElement } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ClipReveal from '@/components/ui/ClipReveal'
import StaggerReveal from '@/components/ui/StaggerReveal'

/**
 * סקשן 2 — מגיעות אליי עם.
 *
 * Six cards, verbatim titles + bodies from docs/nicole-page-copy-v11.md.
 * Heading and the card grid are two separate top-level reveals
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
    <section id="symptoms" className="bg-surface px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row-reverse lg:items-center lg:text-start">
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

        <StaggerReveal
          columns={3}
          stagger={0.15}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="rounded-card bg-bg p-6 text-start shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </StaggerReveal>

        <ScrollReveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center leading-relaxed text-muted">
            לא מצאת את עצמך ברשימה? כתבי לי בכל זאת. חלק גדול מהנשים שמגיעות אליי הגיעו עם משהו שלא ידעו איך לקרוא לו.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
