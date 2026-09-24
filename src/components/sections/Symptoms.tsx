'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

/**
 * סקשן 2 — מה מביא נשים לקליניקה.
 *
 * מפת גוף: שש נקודות על צילום בובת העץ. מעבר עכבר / פוקוס / נגיעה
 * מחליפים את הכרטיס הצף. הטקסטים מילה במילה מ־docs/nicole-page-copy-v11.md.
 *
 * דורש: public/images/body-mannequin-848.webp
 */

type Point = { top: string; left: string }

interface SymptomCard {
  n: string
  title: string
  body: string
  point: Point
}

/* y מתוך BODY_POINTS של הפרויקט; זוגות שנפלו על אותה נקודה הוזזו הצידה
   כדי ששתי הנקודות יישארו לחיצות. */
const cards: SymptomCard[] = [
  {
    n: '01',
    title: 'פוריות והריון',
    body: 'ניסיונות להיכנס להריון, ליווי לאורך ההריון, והגוף שצריך להיות מאוזן בשביל שניהם.',
    point: { top: '45.5%', left: '50%' },
  },
  {
    n: '02',
    title: 'ווסת ואיזון הורמונלי',
    body: 'מחזור כואב או לא סדיר, תסמינים שחוזרים כל חודש ומשבשים את החיים.',
    point: { top: '43%', left: '40%' },
  },
  {
    n: '03',
    title: 'כאב שיש מתחתיו עוד משהו',
    body: 'כאבי גב, כתפיים, ברכיים — מקרים אורתופדיים שהשורש שלהם לא רק פיזי.',
    point: { top: '39.5%', left: '61%' },
  },
  {
    n: '04',
    title: 'מערכת עיכול',
    body: 'נפיחות, כובד, אי־נוחות שנמשכת שנים ו"התרגלת אליה".',
    point: { top: '37.6%', left: '50%' },
  },
  {
    n: '05',
    title: 'צוואר וכתפיים',
    body: 'תפיסות, מתח שלא משתחרר, ראש שמרגיש כבד בסוף היום.',
    point: { top: '22.9%', left: '57%' },
  },
  {
    n: '06',
    title: 'מיגרנות',
    body: 'כאבי ראש חוזרים שמכתיבים לך את היום.',
    point: { top: '15%', left: '50%' },
  },
]

const ARCH = { borderRadius: '200px 200px 40px 40px' } as const

export default function Symptoms() {
  const [active, setActive] = useState(0)
  const card = cards[active]

  return (
    <section id="symptoms" className="px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_470px] lg:gap-14">
            {/* טקסט */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
                מה מביא נשים לקליניקה
              </h2>
              <p className="max-w-[40ch] leading-relaxed text-muted">
                רוב הנשים מגיעות עם דבר אחד, ומגלות שהוא מחובר לעוד שלושה.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {cards.map((c, i) => (
                  <button
                    key={c.title}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={
                      'rounded-pill border px-5 py-2.5 text-start transition-colors ' +
                      (i === active
                        ? 'border-primary bg-primary font-semibold text-bg'
                        : 'border-primary/30 text-ink hover:bg-primary/10')
                    }
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <p className="max-w-[46ch] leading-relaxed text-muted">
                לא מצאת את עצמך ברשימה? כתבי לי בכל זאת. חלק גדול מהנשים שמגיעות אליי הגיעו עם משהו
                שלא ידעו איך לקרוא לו.
              </p>
            </div>

            {/* מפת הגוף */}
            <div
              className="relative mx-auto mb-16 w-full max-w-[470px] lg:mb-10"
              style={{ aspectRatio: '470 / 700' }}
            >
              <div className="absolute inset-0 overflow-hidden shadow-lg" style={ARCH}>
                <Image
                  src="/images/body-mannequin-848.webp"
                  alt="בובת עץ מפרקית עומדת, שישה אזורי טיפול מסומנים עליה"
                  fill
                  sizes="(max-width: 1023px) 100vw, 470px"
                  className="object-cover"
                  priority={false}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(198,150,90,.12) 0%, rgba(245,238,228,.10) 45%, rgba(42,38,51,.18) 100%)',
                  }}
                />
              </div>

              {cards.map((c, i) => {
                const on = i === active
                return (
                  <button
                    key={c.title}
                    type="button"
                    aria-label={c.title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                    style={{ top: c.point.top, left: c.point.left }}
                  >
                    {on && (
                      <span className="absolute h-[30px] w-[30px] animate-ping rounded-pill border border-primary-800" />
                    )}
                    <span
                      className={
                        'block rounded-pill transition-all duration-300 ' +
                        (on
                          ? 'h-5 w-5 bg-primary shadow-[0_0_0_7px_rgba(251,247,241,.55)]'
                          : 'h-3 w-3 bg-primary/60 shadow-sm')
                      }
                    />
                  </button>
                )
              })}

              <div className="absolute inset-x-6 -bottom-18 rounded-card bg-bg p-6 shadow-lg">
                <span className="font-mono text-xs font-semibold tracking-widest text-primary">
                  {card.n}
                </span>
                <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{card.body}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
