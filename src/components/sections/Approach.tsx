'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import LineReveal from '@/components/ui/LineReveal'

/**
 * סקשן 3 — הדבר שמבדל (the emotional core of the page).
 *
 * TWO COLUMNS, and the reason is measured, not stylistic: this section used a
 * single max-w-xl column, 576px of content inside a 1440px viewport, and read
 * as 89.7% empty space. The reference page this layout follows fills 1340 of
 * 1440. Nothing was added here — the same copy is split so the heading and its
 * thesis line hold one column while the detail holds the other.
 *
 * COLUMN RATIO, measured both ways: heading-narrow/prose-wide (this) and the
 * flip. Flipping did not close the gap, it only moved it from under the heading
 * to under the prose — the copy simply does not fill two columns at this
 * height. Whatever finally fills it has to be ADDED, not rearranged.
 *
 * The thesis line is set larger than the body on purpose. It is the sentence
 * the whole section turns on, and at body size it disappeared into the prose.
 *
 * One ScrollReveal wraps the whole block and no child runs its own — the
 * gsap-scroll-reveal rule for a prose section with no grid of items.
 *
 * Copy verbatim from docs/nicole-page-copy-v11.md. Not one word added.
 */
export default function Approach() {
  return (
    <section id="approach" className="px-4 py-24 sm:px-8 md:py-32">
      <ScrollReveal className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:gap-20">
        {/* The claim. */}
        <div>
          <h2 className="text-start font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
            <LineReveal text="לא כל אחת מקבלת את אותו טיפול" stagger={0.08} />
          </h2>
          <p className="mt-8 font-display text-2xl leading-[1.3] text-ink sm:text-[26px]">
            המפגש הראשון הוא לא טיפול. הוא אבחון.
          </p>

          <div className="mt-12">
            <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              למה זו סדרה ולא טיפול בודד
            </h3>
            <p className="mt-3 text-lg leading-[1.6] text-ink">
              טיפול אחד יכול להקל. הוא לא מטפל בשורש. אם נטפל רק בסימפטום, הוא יחזור, ולכן אנחנו
              הולכות למקום שממנו הוא מגיע.
            </p>
          </div>
        </div>

        {/* What that actually means. */}
        <div>
          <div className="space-y-6 text-lg leading-[1.6] text-ink">
            <p>
              אני בודקת דופק, מאבחנת את הבטן, ושומעת ממך את כל הסיפור, לא רק את התסמין שהביא
              אותך. מתוך זה אני בונה אסטרטגיית טיפול שמתאימה לך, ומחליטה אם נעבוד בשיאצו, בדיקור,
              או בשילוב.
            </p>
            <p>
              משם מתקדמות לאט, ובודקות איך הגוף שלך מגיב. הקצב נקבע לפי התגובה שלו, לא לפי לוח
              זמנים שקבעתי מראש.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
