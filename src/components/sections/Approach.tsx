import ScrollReveal from '@/components/ui/ScrollReveal'

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
    <section id="approach" className="bg-bg px-4 py-16 sm:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
          לא כל אחת מקבלת את אותו טיפול
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
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

        <div className="mt-10 rounded-card border border-secondary-200 bg-secondary-50 p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">
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
