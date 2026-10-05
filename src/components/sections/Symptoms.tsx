'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 2 — מה מביא נשים לקליניקה.
 *
 * מפת גוף: שש נקודות על צילום בובת העץ. מעבר עכבר / פוקוס / נגיעה
 * מחליפים את הכרטיס הצף. הטקסטים מילה במילה מ־docs/nicole-page-copy-v11.md.
 *
 * דורש: public/images/body-mannequin-848-g.webp
 *
 * ה-CTA כאן הוא לינק בתוך המשפט ולא כפתור — ראה ההערה מעל הפסקה.
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
    <section id="symptoms" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-voice">
        <ScrollReveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_470px] lg:gap-14">
            {/* טקסט */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-h2 font-medium text-ink">
                מה מביא נשים לקליניקה
              </h2>
              <p className="max-w-measure text-ink-soft">
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
                      // bg-primary/8 ו-hover:bg-primary/15 היו כאן ולא ייצרו CSS
                      // כלל — הטוקן primary נמחק, וסיומת השקיפות הסתירה אותם
                      // מההמרה. התוצאה: הצ'יפים הלא-פעילים היו טקסט מרחף בלי
                      // גלולה, ולכן שורות הצ'יפים נקראו מפוזרות ושבורות.
                      // דיו ולא לבנדר: לבנדר שמור לכפתורים ולמצב פעיל אחד,
                      // וצ'יפ במנוחה הוא לא מצב פעיל.
                      (i === active
                        ? 'border-transparent bg-ink font-semibold text-ground'
                        : 'border-transparent bg-ink/8 text-ink hover:bg-ink/15')
                    }
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              {/* "כתבי לי בכל זאת" היה טקסט מת — הקופי הזמין לפעולה ולא
                  היה לאן ללחוץ. ניסיתי לינק בתוך המשפט והוא נפסל: הסקיל
                  אוסר ghost buttons בנימוק ש"אנשים לא רואים אותם ולא
                  לוחצים עליהם", ולינק טקסט חלש מ-ghost button, כלומר
                  אותו נימוק פוסל אותו. והוא גם פוגע בהיררכיה — רמת
                  הדגשה שלישית שאינה כותרת ואינה כפתור, רעש בלי משקל.

                  הכפתור זהה לזה שבהירו, במלוא עוצמתו. "עד שלוש הופעות"
                  ירד מהבריף: כלל הדילול הוא על אלמנטים שמתחרים באותו
                  מסך, לא על חזרות לאורך גלילה. */}
              <p className="max-w-measure text-ink-soft">
                לא מצאת את עצמך ברשימה? חלק גדול מהנשים שמגיעות אליי הגיעו עם משהו שלא ידעו איך
                לקרוא לו.
              </p>

              {/* המרכוז יושב על ההורה ולא על הקומפוננטה: העטיפה שלה היא
                  inline-flex עם items-start, ו-className חיצוני היה מתנגש
                  בה בסגירות שווה — ה-JSDoc שלה מזהיר על זה. הורה עם
                  justify-center ממרכז את כל הבלוק בלי להילחם בפנים. */}
              <div className="mt-8 flex justify-center md:justify-start">
                <WhatsAppLeadButton
                  align="start"
                  funnel="symptoms"
                  showSubtext={false}
                  buttonClassName="text-lead px-10 py-4"
                />
              </div>
            </div>

            {/* מפת הגוף */}
            <div
              className="relative mx-auto mb-16 w-full max-w-[470px] lg:mb-10"
              style={{ aspectRatio: '470 / 700' }}
            >
              <div className="absolute inset-0 overflow-hidden shadow-arch" style={ARCH}>
                <Image
                  src="/images/body-mannequin-848-g.webp"
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
                      <span className="absolute h-[30px] w-[30px] animate-ping rounded-pill border border-lavender" />
                    )}
                    <span
                      className={
                        'block rounded-pill transition-all duration-300 ' +
                        // bg-primary/60 היה כאן ולא ייצר CSS — חמש מתוך שש
                        // הנקודות היו בלתי נראות לגמרי, ורק הפעילה נראתה.
                        // shadow-sm מת גם הוא: המערכת מגדירה arch ו-float בלבד.
                        // ההילה עברה מ-rgba(251,247,241) לטוקן הקרקע; הראשון
                        // היה #FBF7F1, צבע שביעי שלא קיים בפלטה.
                        (on
                          ? 'h-5 w-5 bg-lavender shadow-[0_0_0_7px_rgb(245_239_228_/_0.55)]'
                          : 'h-3 w-3 bg-ground ring-1 ring-ink/25')
                      }
                    />
                  </button>
                )
              })}

              <div className="absolute inset-x-6 -bottom-18 rounded-arch bg-ground p-6 shadow-arch">
                <span className="text-label font-semibold text-lavender">
                  {card.n}
                </span>
                <h3 className="mt-2 font-display text-h3 font-medium text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-ink-soft">{card.body}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
