'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { WHATSAPP_PHONE, buildWhatsAppUrl } from '@/lib/whatsapp'

/**
 * סקשן 6 · "מה מספרות המטופלות" — מסך וואטסאפ.
 * מקלוד דיזיין, design/design_handoff_whatsapp_reviews.
 *
 * למה מסך טלפון ולא שורת כרטיסים: ההמרה היחידה בדף היא שיחת וואטסאפ,
 * ומסך וואטסאפ הוא הוכחה חברתית ותצוגה של הפעולה באותו אובייקט. שורת
 * הכרטיסים היתה גלילה אופקית — בדיוק מה שנכשל בסקשן 4 — ומודאל היה
 * דפוס אינטראקציה שלישי בדף שכבר יש בו צ'יפים בסקשן 2.
 *
 * שורת ההקלדה היא ה-CTA. היא לא דקורציה: לחיצה פותחת וואטסאפ לניקול
 * עם הודעה מוכנה. זה מה שמצדיק את כפתור הלבנדר — הוא באמת כפתור.
 *
 * ── הצבעים והפונטים הוחלפו לפלטה שלנו ──
 * ה-handoff הגיע עם 18 צבעים, מהם שניים בלבד שלנו, ועם Suez One ו-Heebo.
 * המבנה, הפרופורציות וההתנהגות נשמרו במדויק; הצבעים והטיפוגרפיה מהמערכת
 * שלנו. המיפוי:
 *   #F5EAD8 ו-#FCF8F1 → ground  ·  #201E1D → ink  ·  #474238 → ink-soft
 *   #6E5A9A → lavender          ·  #EDE0CA → honey/30 מעל הקרקע
 *   #DCD3C4 נקודות → ink/12     ·  #82796A זמן → ink-soft
 *   #F0FAE1 ו-#3D472B תגית ירוקה → honey/30 עם טקסט דיו
 *
 * שלושה שלא היה להם מיפוי, ולקחתי את הברירה השמרנית:
 *   1. שם השולחת היה #8C491A, חום-כתום. כאן ink-soft. אם זה חלש מדי
 *      כהדגשה — הכרעה פתוחה.
 *   2. טבעת הפוקוס היתה #C67139 כתום. אצלנו הפוקוס לבנדר, גלובלי.
 *   3. השדה המזויף היה לבן על #FCF8F1. לנו קרקע אחת, אז מסגרת הדבש
 *      היא מה שמגדיר אותו.
 *
 * הטלפון הוא WHATSAPP_PHONE מהפרויקט, לא המספר הזמני שב-handoff.
 */

type Review = { name: string; time: string; text: string }

// מילה במילה מ-reviews-data.js, כולל שבירות שורה ואימוג'י.
// הסדר: הקצרה ראשונה, כדי שהטלפון יישאר נמוך.
const REVIEWS: Review[] = [
  {
    name: 'שי',
    time: '9:38',
    text: `אחת המטפלות היותר מדהימות שיצא לי לפגוש, אנרגיות טובות, נעימה ומקצועית מאוד.
הגעתי לסדרת טיפולים ואחרי כל טיפול מחדש יצאתי שלווה יותר.
מגע מדהים, מלאת נתינה ועם המון תשוקה לעשייה שלה.`,
  },
  {
    name: 'נופר',
    time: '11:31',
    text: `הכרתי את ניקול במקרה לפני שנה.
היא ראתה שאני סובלת עם כאבים ברגל ופנתה אליי.
לאחר שנה, חוויתי התקף של דלקת פרקים ובקושי הצלחתי ללכת.
נזכרתי בניקול, שמיד פינתה זמן לקבל אותי.
ניקול טיפלה בי ברגישות שיא ומקצועיות רבה, תוך הקשבה מקסימלית ותשומת לב לפרטים הקטנים.
עברנו תהליך עמוק יחד, ולאחר שריפאה אותי מההתקף של דלקת הפרקים,
עברנו לטפל בנושאים נוספים שעלו, שגם להם- היא מצאה פתרון.
ממליצה על ניקול מכל ליבי, מוכשרת, מקצועית, קשובה. מדהימה!`,
  },
  {
    name: 'נועה',
    time: '11:42',
    text: `הגעתי לניקול בעקבות סחרחורות בלתי פוסקות וטורדניות, אחרי שכבר ניסיתי כמעט הכול – נוירולוג, אף אוזן גרון, צילום ראש ועוד אינספור בדיקות.
הגעתי אליה בייאוש מוחלט, אבל עם אמונה שאולי דווקא הדיקור הסיני יצליח לעזור לי במקום שבו שום דבר אחר לא הצליח.

מהרגע הראשון ניקול קיבלה אותי באהבה, ברגישות ובמסירות. היא הקדישה לי זמן, שאלה עשרות שאלות, ניסתה להבין לעומק מה עובר עליי ומיד התחלנו בטיפול.

והתוצאה הייתה פשוט מדהימה – כבר אחרי 2–3 טיפולים הסחרחורות נעלמו לחלוטין!

אבל מבחינתי, זה אפילו לא נגמר שם. במסגרת שישה טיפולים בלבד שעברתי אצל ניקול, קרו עוד שני דברים משמעותיים ומרגשים במיוחד עבורי: נקלטתי להריון הראשון שלי, וגם בעיית עיכול שליוותה אותי במשך 13 שנים, ושאף תזונאי לא הצליח לפתור, השתפרה משמעותית!

מעבר לתוצאות, כל טיפול אצל ניקול היה חוויה בפני עצמה – הרגשתי שאני בידיים מקצועיות, קשובות ואכפתיות באמת.

אני ממליצה עליה מכל הלב. אם אתם מתלבטים אם לנסות – פשוט תגיעו ותתנו לזה הזדמנות. מבחינתי, זה היה שווה כל שקל ❤️`,
  },
  {
    name: 'הדר',
    time: '10:59',
    text: `אני רוצה להמליץ מכל הלב על ניקול ❤️

ניקול מלווה אותי כבר דרך ארוכה, עוד משלב האיזון ההורמונלי, ולאורך כל הדרך הרגשתי שאני מקבלת ממנה הרבה מעבר לטיפול בדיקור סיני. היא עזרה לי להכניס יותר מודעות לאורח חיים בריא, לתזונה, ובעיקר לימדה אותי להקשיב לגוף שלי ולהבין מה הוא צריך.

במהלך ההריון היא המשיכה ללוות אותי ברגישות ובמקצועיות, ועזרה לי להתמודד עם התופעות השונות שחוויתי בדרך, תמיד בצורה נעימה, קשובה ומכילה.

אבל הדבר שאני הכי מעריכה בניקול הוא שמעולם לא הרגשתי שצריך לעשות טיפול "רק כי קבענו". להפך — היא תמיד הקשיבה קודם כל לגוף שלי, ובחרנו לעשות טיפולים רק כשבאמת הרגשנו שיש בהם צורך. מבחינתי זה אומר המון על המקצועיות, הכנות והגישה שלה.

לאורך כל הדרך הרגשתי אצלה קבלה, הכלה והמון אכפתיות. יש בה שילוב מיוחד של מקצועיות, רגישות והקשבה אמיתית, ואני פשוט שמחה שהיא הייתה ועודנה חלק מהדרך שלי.

ממליצה עליה באהבה גדולה ומכל הלב`,
  },
]

const CTA_MESSAGE = 'היי ניקול, קראתי את ההמלצות ורציתי לדבר'

export default function Reviews() {
  const feed = useRef<HTMLDivElement>(null)
  const [feedHeight, setFeedHeight] = useState<number | undefined>()

  /**
   * גובה הפיד נמדד ולא נקבע מראש: ההודעה הראשונה גלויה במלואה והשנייה
   * מציצה מתחת לדהייה. 96px הם ההצצה והדהייה יחד.
   *
   * זה הכרחי כי אורכי ההודעות שונים מאוד — הקצרה שלוש שורות והארוכה שש
   * פסקאות — וכל ערך קבוע היה חותך אחת מהן באמצע משפט.
   */
  const fit = useCallback(() => {
    const el = feed.current
    if (!el) return
    const msgs = el.querySelectorAll('[data-msg]')
    if (msgs.length < 2) return
    const top = el.firstElementChild?.getBoundingClientRect().top ?? 0
    setFeedHeight(Math.ceil(msgs[1].getBoundingClientRect().top - top + 96))
  }, [])

  useEffect(() => {
    fit()
    const el = feed.current
    if (!el) return
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    // הפונטים משנים את גובה הטקסט, אז מודדים שוב אחרי שהם נטענו
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [fit])

  return (
    <section id="reviews" className="section-voice bg-ground">
      <div className="flex flex-wrap items-center justify-center gap-10 px-shell lg:gap-24">
        {/* הקול — ראשון ברשת = ימין ב-RTL */}
        <div className="flex max-w-measure flex-1 shrink-0 basis-80 flex-col items-start gap-4">
          <span className="rounded-pill bg-honey/30 px-3 py-1 text-label font-medium text-ink">
            המלצות
          </span>
          <h2 className="text-balance font-display text-h2 text-ink">מה מספרות המטופלות</h2>
          <p className="text-body text-ink-soft">הודעות שקיבלה ניקול מהמטופלות שלה, כפי שנשלחו.</p>
        </div>

        {/* הטלפון */}
        <div className="flex w-full max-w-[360px] shrink-0 basis-[360px] flex-col overflow-hidden rounded-phone border-8 border-ink bg-ground shadow-arch">
          {/* פס עליון */}
          <div className="flex items-center gap-4 bg-honey px-4 py-3 text-ink">
            <div className="grid size-10 flex-none place-items-center rounded-full bg-ink font-semibold text-ground">
              נ
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-body font-semibold">המלצות על ניקול</span>
              <span className="text-label">{REVIEWS.length} הודעות</span>
            </div>
          </div>

          {/* הפיד. הדהייה בתחתית בלבד — חיתוך למעלה נקרא כתקלת רינדור. */}
          <div
            ref={feed}
            style={{
              height: feedHeight,
              backgroundImage:
                'radial-gradient(color-mix(in srgb, var(--color-ink) 12%, transparent) 1.4px, transparent 1.6px)',
              backgroundSize: '22px 22px',
              maskImage: 'linear-gradient(#000 calc(100% - 56px), transparent)',
              WebkitMaskImage: 'linear-gradient(#000 calc(100% - 56px), transparent)',
            }}
            className="no-scrollbar flex-none overflow-y-auto overscroll-contain bg-ground"
          >
            <div className="flex flex-col gap-6 pb-6 pe-10 ps-4 pt-6">
              {REVIEWS.map((r, i) => (
                <div key={r.name + r.time} data-msg className="flex flex-col items-start gap-6">
                  {i === 0 && (
                    <span className="self-center rounded-pill bg-ground px-3 py-1 text-label font-medium text-ink-soft shadow-bubble">
                      היום
                    </span>
                  )}
                  <div className="relative flex max-w-full flex-col gap-1 rounded-bubble rounded-ss-none bg-honey/30 px-3 py-2 shadow-bubble">
                    {/* הזנב, flush עם הבועה — בלי רווח ביניהם */}
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      aria-hidden="true"
                      className="absolute -end-[11px] top-0 block"
                    >
                      <path d="M0 0H12C8 3 4 9 0 16Z" fill="var(--color-honey)" fillOpacity="0.3" />
                    </svg>
                    <div className="text-label font-semibold text-ink-soft">{r.name}</div>
                    <div className="whitespace-pre-line text-pretty text-body text-ink">
                      {r.text}
                    </div>
                    <span className="self-end text-label tabular-nums text-ink-soft">{r.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ה-CTA. כל השורה היא קישור אחד. */}
          <a
            href={buildWhatsAppUrl(WHATSAPP_PHONE, CTA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שליחת הודעת וואטסאפ לניקול"
            className="flex items-center gap-2 bg-ground p-3 text-ink transition-colors hover:bg-honey/15"
          >
            <span className="flex min-h-11 flex-1 items-center rounded-pill border border-honey px-4 text-body text-ink-soft">
              כתבי לניקול…
            </span>
            <span className="grid size-11 flex-none place-items-center rounded-full bg-lavender text-ground">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="-scale-x-100"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
