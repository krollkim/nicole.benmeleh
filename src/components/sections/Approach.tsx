'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import LineReveal from '@/components/ui/LineReveal'

/**
 * סקשן 3 — הדבר שמבדל (the emotional core of the page).
 *
 * Heading + prose + one highlighted box, no grid — per the
 * gsap-scroll-reveal rule this is the one case allowed to wrap the whole
 * block in a single ScrollReveal (no child runs its own reveal).
 *
 * Copy verbatim from docs/nicole-page-copy-v11.md.
 */
export default function Approach() {
  return (
    <section id="approach" className="bg-voice px-4 py-20 sm:px-8 md:py-36">
      <ScrollReveal className="mx-auto max-w-xl">
        {/* Revealed one rendered line at a time. The string is passed verbatim
            and LineReveal only splits it on spaces for measurement. */}
        <h2 className="text-start font-display text-3xl font-medium leading-[1.12] text-ink sm:text-5xl lg:text-6xl">
          <LineReveal text="לא כל אחת מקבלת את אותו טיפול" stagger={0.08} />
        </h2>

        <div className="mt-10 space-y-6 text-lg leading-[1.6] text-ink">
          <p>המפגש הראשון הוא לא טיפול. הוא אבחון.</p>
          <p>
            אני בודקת דופק, מאבחנת את הבטן, ושומעת ממך את כל הסיפור — לא רק את התסמין שהביא
            אותך. מתוך זה אני בונה אסטרטגיית טיפול שמתאימה לך, ומחליטה אם נעבוד בשיאצו, בדיקור,
            או בשילוב.
          </p>
          <p>
            משם מתקדמות לאט, ובודקות איך הגוף שלך מגיב. הקצב נקבע לפי התגובה שלו, לא לפי לוח
            זמנים שקבעתי מראש.
          </p>
        </div>

        <div className="mt-16 border-t border-primary-300/60 pt-8">
          <h3 className="font-display text-2xl font-medium text-ink">
            למה זו סדרה ולא טיפול בודד
          </h3>
          <p className="mt-3 leading-relaxed text-ink">
            טיפול אחד יכול להקל. הוא לא מטפל בשורש. אם נטפל רק בסימפטום, הוא יחזור — ולכן אנחנו
            הולכות למקום שממנו הוא מגיע.
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
