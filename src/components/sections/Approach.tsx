'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import TreeRings from '@/components/ui/TreeRings'

/**
 * סקשן 3 — "לא כל אחת מקבלת את אותו טיפול". אופציה 3f מקלוד דיזיין.
 *
 * הסקשן עבר מקל לכבד (הכרעה 1.1): עד כה הוא היה שני טורי טקסט על קרם,
 * 576px תוכן בתוך 1440, ונמדד כ-89.7% אוויר. עכשיו יש לו שדה דיו עם
 * טבעות עץ בדבש — הערך הכהה היחיד בדף מלבד הפוטר.
 *
 * למה דווקא טבעות: זה החיבור היחיד בדף בין ויזואל מופשט לעץ האמיתי
 * שבחלון של ההירו ושל סקשן 5. הן גם אומרות "שכבות שנבנות לאורך זמן",
 * שזו בדיוק התזה של הסקשן.
 *
 * שתי פסקאות ירדו מהגרסה הקודמת — "למה זו סדרה ולא טיפול בודד" ו-"משם
 * מתקדמות לאט". שתיהן נענות ב-FAQ תחת "כמה טיפולים אני צריכה?", ולכן
 * המסר לא אבד. הכרעה 1.3 שחררה את הקופי לשינוי.
 *
 * המרווחים הומרו מהטוקנים הקרויים של ה-handoff (pt-lg, mb-md) למספריים,
 * כי globals.css שלנו לא מגדיר את הכינויים הגנריים — רק gutter,
 * gutter-sm ו-visual-sm. ההמרה: xs=4 · sm=6 · md=10 · lg=16 · xl=24.
 *
 * id="approach" — הנאבבר מקשר אליו ב-brand.json. לא לשנות.
 */
export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="flex flex-col bg-ground lg:grid lg:grid-split-reverse lg:section-room"
    >
      {/* הטקסט — שמאל (55).
          הסקשן הזה הפוך לשאר: בכל הדף הטקסט מימין והוויזואל משמאל, וכאן
          להפך. הסיבה נמדדה — סקשן 2 מעליו מחזיק ויזואל תחום של 470px
          (80→550) משמאל, וסקשן 3 הוא שדה שנוגע בקצה. שני גבולות שמאליים
          שונים לחלוטין זה מעל זה קוראים כשבר, והטבעות "יוצאות" מהמסך
          ביחס לבובה הממורכזת שמעליהן. */}
      <div className="order-2 flex flex-col justify-center px-shell pt-16 pb-24 lg:pe-gutter lg:ps-24 lg:py-0">
        <ScrollReveal>
          <p className="mb-4 text-label font-semibold text-ink-soft lg:mb-6">
            לא כל אחת מקבלת את אותו טיפול
          </p>
          <h2 id="approach-title" className="mb-10 font-display text-display text-ink lg:mb-16">
            <span className="lg:block">המפגש הראשון </span>
            <span className="lg:block">הוא לא טיפול. </span>
            <span className="lg:block">הוא אבחון.</span>
          </h2>
          <p className="max-w-measure text-body text-ink">
            אני בודקת דופק, מאבחנת את הבטן, ושומעת ממך את כל הסיפור, לא רק את התסמין שהביא אותך.
            מתוך זה אני בונה אסטרטגיית טיפול שמתאימה לך, ומחליטה אם נעבוד בשיאצו, בדיקור, או
            בשילוב.
          </p>
        </ScrollReveal>
      </div>

      {/* הוויזואל — ימין (45), נוגע בקצה, בלי מרזב.
          order-1 בשני המצבים: במובייל הוא מעל הטקסט, ובדסקטופ הוא
          הראשון ברשת, כלומר הימני ב-RTL. */}
      <div className="relative order-1 h-visual-sm min-w-0 overflow-hidden bg-ink lg:h-auto">
        <TreeRings />
      </div>
    </section>
  )
}
