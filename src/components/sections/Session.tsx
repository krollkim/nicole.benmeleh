'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * סקשן 4 · "בלי הפתעות: ככה נראית שעה אצלי" — אופציה 4c, מדרגות.
 * מקלוד דיזיין, design/design_handoff_section4_steps.
 *
 * ה-ScrollTrigger pin יצא. הוא היה 363 שורות בין Session.tsx ל-
 * PinnedSequence.tsx, והוא מה שעשה את הסקשן ל-2511px, הארוך בדף.
 *
 * למה 4c: הכותרת מבטיחה "בלי הפתעות", ו-4a/4b מסתירים שלושה מארבעת
 * השלבים עד שגוללים או לוחצים — מכניקה של הפתעה בסקשן שמבטיח שאין.
 *
 * ── המובייל נבנה מחדש 07/10/2026 ──
 * הייתה כאן קרוסלה אופקית עם snap. היא נפסלה משתי סיבות:
 *   1. היא הסתירה שלושה מארבעה — בדיוק מה שפסל את 4a ו-4b. המימוש
 *      סתר את הנימוק שבגללו בחרנו באופציה הזאת.
 *   2. אי אפשר היה להבין שהיא קיימת. ניסיתי מחוון של ארבעה פסים
 *      והוא נקרא כקו הפרדה, לא כמיקום.
 * במקומה: ערמה אנכית, תמונות 3:2 במקום 3:4 כדי שהגובה יישאר סביר,
 * וקו מחבר בין שלב לשלב. אין מה לגלות מהצד, אין אפורדנס לפתור.
 *
 * ── פס ההתקדמות בדסקטופ ──
 * קים ביקש שהקו יזוז עם הגלילה. הגרסה שהוא תיאר — "גוללת למטה והתוכן
 * זז הצידה" — היא ה-pin שהרגע הורדנו, ובמובייל היא scroll-jacking.
 * כאן הפס מתמלא לפי כמה שהסקשן עבר במסך: אותה תחושת התקדמות, בלי
 * לעצור את הדף ובלי גובה נוסף.
 */

type Step = { title: string; body: React.ReactNode; img: string; alt: string }

// ⚠️ room-empty משמשת גם בהירו ובסקשן 9. הפרה מודעת וזמנית של "אף
// תצלום לא ממלא שני תפקידים", עד שיגיעו צילומי הקליניקה הנוספים.
const STEPS: Step[] = [
  {
    title: 'מגיעה לקליניקה',
    body: (
      <>
        חדר מואר ונעים ברחוב אחד העם. שוכבות על מיטת טיפולים,{' '}
        <strong className="font-semibold">עם בגדים</strong>. לא צריך להביא כלום.
      </>
    ),
    img: '/images/room-empty-1200-gc.webp',
    alt: 'חדר הטיפולים: מיטת טיפולים לבנה מול חלון גדול עם וילונות',
  },
  {
    title: 'מדברות',
    body: 'לפני שאני נוגעת, אני שומעת. מה כואב, מה משתנה, מה מטריד. גם אם זה נשמע לא קשור.',
    img: '/images/hero-window-1200-g.webp',
    alt: 'ניקול בן מלך ליד החלון בחדר הטיפולים, עץ גדול מעבר לזכוכית',
  },
  {
    title: 'הטיפול',
    body: 'כ־45 דקות. שיאצו הוא לחץ ותנועה, מרגיש נעים, מרפה, ומניע דם בגוף. דיקור הוא דקירה קלה, וכשהמחטים בפנים לא כואב, להפך. רוב הנשים נרדמות.',
    img: '/images/I-room-1920-g.webp',
    alt: 'ניקול מטפלת במטופלת השוכבת בבגדים על מיטת הטיפולים',
  },
  {
    title: 'אחרי',
    body: 'יוצאות רגועות, לפעמים קצת מרחפות. למחרת בדרך כלל מרגישים הקלה. לפעמים דווקא עולה כאב ליום־יומיים, כי הגוף עבר שינוי, ואז הוא מתייצב.',
    img: '/images/E-hands-foot-1920-g.webp',
    alt: 'ידיה של ניקול על כף רגל של מטופלת',
  },
]

export default function Session() {
  const ref = useRef<HTMLElement>(null)
  // null = בלי חשיפה (SSR, בלי JS, reduced-motion). התמונות גלויות כברירת
  // מחדל, כלומר האנימציה יכולה להיכשל רק לכיוון הבטוח.
  const [reveal, setReveal] = useState<null | 'hidden' | 'shown'>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setReveal('hidden')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setReveal('shown')
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // כמה מהסקשן כבר עבר במסך, 0 עד 1. גלילה רגילה של הדף, בלי pin
  // ובלי להפריע למשתמשת. rAF כדי לא לחשב בכל אירוע scroll.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const read = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const span = r.height + window.innerHeight
      const seen = window.innerHeight - r.top
      setProgress(Math.max(0, Math.min(1, seen / span)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="session"
      aria-labelledby="session-title"
      className="section-voice bg-ground"
    >
      <h2 id="session-title" className="mb-6 px-shell font-display text-h2 text-ink">
        בלי הפתעות: ככה נראית שעה אצלי
      </h2>

      {/* פס ההתקדמות. דסקטופ בלבד — במובייל הקו המחבר בין הכרטיסים
          כבר אומר את אותו דבר. start-0 הוא ימין ב-RTL, אז הוא מתמלא
          מימין לשמאל, לכיוון הקריאה. */}
      <div aria-hidden="true" className="mb-16 hidden px-shell lg:block">
        <div className="relative h-px w-full bg-ink/15">
          <div
            className="absolute inset-y-0 start-0 bg-ink"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <ol className="flex flex-col px-shell lg:grid lg:grid-cols-4 lg:gap-4 lg:px-0">
        {STEPS.map((s, i) => (
          /* lg:step-drop ולא step-drop — במובייל זו ערמה אנכית, וירידה
             מדורגת רק הייתה דוחפת כל כרטיס עוד 24px למטה בלי משמעות. */
          <li
            key={s.title}
            className="flex flex-col lg:step-drop"
            style={{ '--i': i } as CSSProperties}
          >
            {/* ה-clip-path יושב על העטיפה ולא על <Image>, כי next/image
                עם fill מרנדר את התמונה בתוך אלמנט ממוקם משלו.
                3:2 במובייל ו-3:4 בדסקטופ: ערמה אנכית של ארבע תמונות
                3:4 הגיעה ל-2896px, יותר מה-pin שהורדנו. */}
            <div
              className="relative aspect-[3/2] w-full overflow-hidden lg:aspect-[3/4]"
              style={{
                clipPath: reveal === 'hidden' ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
                transition: reveal ? `clip-path 1s var(--ease-out) ${i * 200}ms` : undefined,
              }}
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 pt-6 lg:px-6">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-honey text-label font-semibold text-ink"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-h3 text-ink">{s.title}</h3>
              </div>
              <p className="text-body text-ink-soft">{s.body}</p>
            </div>

            {/* הקו המחבר, מובייל בלבד. הוא מה שהופך ארבעה כרטיסים
                לתהליך אחד במקום לארבעה אובייקטים שעומדים זה מעל זה. */}
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="mx-auto my-6 h-10 w-px bg-ink/20 lg:hidden" />
            )}
          </li>
        ))}
      </ol>

      <p className="mt-16 px-shell text-body text-ink lg:mx-auto lg:mt-24 lg:max-w-measure-wide lg:px-0 lg:text-center lg:text-lead">
        רוב הנשים שמגיעות אליי לא חוששות מהטיפול. הן חוששות ממה שקורה להן בגוף. התפקיד שלי הוא קודם
        כל לייצר מקום בטוח. בלי זה אין טיפול.
      </p>
    </section>
  )
}
