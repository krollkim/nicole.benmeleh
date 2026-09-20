'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import StaggerReveal from '@/components/ui/StaggerReveal'

/**
 * Section 8 — "שאלות שחוזרות" (docs/nicole-page-copy-v11.md).
 *
 * All seven Q&As, verbatim, in doc order. Built as a native <details>/
 * <summary> accordion — no JS needed, keyboard-operable and correctly
 * exposed to assistive tech out of the box.
 *
 * "את מטפלת רק בנשים?" — corrected from "אתה" in copy doc v1.3 (the source had
 * a typo; the visitor asks in her own voice, so the address is female like the
 * rest of the page). The same string is mirrored in src/lib/schema.ts
 * (faqPageJsonLd) — if it ever changes again, change BOTH or the page and its
 * structured data desync.
 *
 * "כמה זה עולה?" deliberately answers with no price — do not add one.
 */

interface QA {
  q: string
  a: string
}

const faqs: QA[] = [
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
    a: 'זה תלוי בסוג הטיפול ובסדרה שנבנה יחד. כתבי לי ונדבר על זה בפתיחות.',
  },
  {
    // Known copy issue, intentionally preserved — see file header comment.
    q: 'את מטפלת רק בנשים?',
    a: 'רוב מי שמגיע אליי הן נשים, ובעיקר בנושאים של פוריות, הריון ואיזון הורמונלי. אני מטפלת גם בגברים.',
  },
  {
    q: 'זה במקום רופא?',
    a: 'לא. רפואה סינית היא טיפול משלים. היא לא מחליפה בדיקות, אבחנות או טיפול רפואי, ואני תמיד אשמח שנעבוד לצד הגורמים המטפלים שלך.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="bg-voice px-4 py-20 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-start font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            שאלות שחוזרות
          </h2>
        </ScrollReveal>

        <StaggerReveal stagger={0.1} columns={1} className="mt-12 flex flex-col border-t border-primary-200/60">
          {faqs.map((item) => {
            const isPainQuestion = item.q === 'זה כואב?'
            return (
              <div key={item.q}>
                <details className="group border-b border-primary-200/60 py-5">
                  <summary
                    className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden [&::marker]:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span>{item.q}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>

                  <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">{item.a}</p>

                  {isPainQuestion && (
                    <>
                      {/* PLACEHOLDER — no acupuncture/needle photo exists yet (assets map §"מה חסר", item 1).
                          Do NOT substitute another image. Remove this block when the real photo arrives. */}
                      <div
                        role="note"
                        className="mt-5 flex min-h-[200px] items-center justify-center border-2 border-dashed border-primary-300/70 p-6 text-center"
                      >
                        <span className="text-sm text-muted">
                          מקום שמור לתמונת דיקור
                          <br />
                          טרם צולמה
                        </span>
                      </div>
                    </>
                  )}
                </details>
              </div>
            )
          })}
        </StaggerReveal>
      </div>
    </section>
  )
}
