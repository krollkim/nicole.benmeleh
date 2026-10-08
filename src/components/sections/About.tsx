'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import DriftReveal from '@/components/ui/DriftReveal'
import ClipReveal from '@/components/ui/ClipReveal'

export default function About() {
  // overflow-hidden: the portrait is full-bleed now and DriftReveal
  // translates it 32px on entry, which would otherwise widen the page by
  // exactly that much on mobile. The shift is intentional; the container clips it.
  return (
    <section id="about" className="overflow-hidden">
      {/* full width, like the hero: a ROOM photo reaches the edge of the page */}
      <div>
        <ScrollReveal>
          {/* Side swap with section 4: Session puts its media on the reading-
              start edge (the right in RTL), so this one takes the far edge.
              `md:order-2` moves the portrait after the text on desktop while
              keeping it FIRST on mobile, where a face before the bio reads
              better in a single column. */}
          <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
            {/* קאדר שקים העלה 07/10/2026. ניקול גדולה בפריים, מחייכת אל
                המצלמה, העץ בחלון מאחוריה — החזק מבין שלושת הקאדרים שלה.

                גורד לסט: המקור נמדד L=0.430 מול ממוצע 0.378 של שש האחרות,
                כלומר 14% בהיר מהן, והיה JPEG. brightness 0.94 הוריד אותו
                ל-0.370 והומר ל-webp. המקור נשאר כ-about.jpeg.

                זה משחרר את hero-window-1200-g, שישבה כאן זמנית מאז שהחדר
                הריק לקח את ההירו, ולכן מבטל אחת משתי הכפילויות בסקשן 4. */}
            <DriftReveal
              side="end"
              className="w-full md:order-2 md:h-full"
            >
              <ClipReveal className="relative h-[82svh] w-full overflow-hidden md:h-[88vh]">
                <Image
                  src="/images/about-1200-g.webp"
                  alt="ניקול בן מלך בחדר הטיפולים שלה, מחייכת אל המצלמה, עץ גדול מעבר לחלון"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[center_50%]"
                />
              </ClipReveal>
            </DriftReveal>

            {/* התיחום יושב כאן, על הטור כולו, ולא על הפסקאות בלבד — כך
                הכותרת, הגוף ושורת האמון חולקים קצה אחד ולא שלושה. */}
            <div className="flex flex-col justify-center px-4 py-16 md:max-w-measure-wide md:px-8 md:py-24 md:pe-16">
              <h2 className="text-start font-display text-h2 font-medium text-ink">
                נעים להכיר, אני ניקול בן מלך
              </h2>

              {/* בלי תיחום משלו. היה כאן max-w-measure, ומדדנו שלושה
                  רוחבים שונים באותו טור — כותרת 480, פסקאות 387, שורת
                  אמון 480 — כך שהפסקאות נתקעו פנימה ב-93px עם קצה שמאלי
                  מרופט שצף בתוך עמודה רחבה יותר. התיחום עבר לטור. */}
              <div className="mt-6 flex flex-col gap-4 text-body text-ink">
                <p>אני מטפלת ברפואה סינית: דיקור, שיאצו, כוסות רוח ופורמולות צמחים.</p>
                <p>
                  למדתי ארבע שנים במכללת תמורות, התמחיתי בבית החולים בני ציון בחיפה, והיום אני
                  מרצה במכללה ומלווה כיתות שיאצו משנה א׳ עד ג׳. המשכתי לקורסים מתקדמים באבחנות
                  בטן ובדיקור קרקפת בשיטת YNSA, ואני מוסמכת מטעם האיגוד העולמי של רפואה סינית.
                </p>
                <p>
                  מעבר לתעודות, עברתי בעצמי את הדברים שנשים מגיעות אליי איתם. אני יודעת איך זה
                  מרגיש לשבת מול מישהי ולא לדעת אם היא מבינה אותך. בגלל זה אני מתחילה תמיד
                  מלהקשיב.
                </p>
              </div>

              {/* טור ולא שורה. היה כאן flex-wrap, ובטור של 391px שלושה
                  פריטים לא נכנסים — השלישי נפל לשורה משלו ונקרא כיתום,
                  בדסקטופ ובמובייל גם יחד. שורה של שלושה לא תעבוד בשום
                  רוחב כאן: ~130px לפריט, ו"מרצה במכללת תמורות" לבדו
                  צריך כ-150. קו דק מפריד, כדי שהשלושה ייקראו כיחידה. */}
              <div className="mt-8 flex flex-col divide-y divide-ink/15 border-t border-ink/15">
                <div className="flex items-baseline gap-2 py-4">
                  <AnimatedCounter to={4} className="font-display text-h3 font-medium text-lavender" />
                  <span className="text-label text-ink-soft">שנות לימוד</span>
                </div>
                <div className="flex items-baseline gap-2 py-4">
                  <AnimatedCounter
                    to={200}
                    suffix="+"
                    className="font-display text-h3 font-medium text-lavender"
                  />
                  <span className="text-label text-ink-soft">מטופלים</span>
                </div>
                <div className="flex items-baseline gap-2 py-4">
                  <span className="font-display text-h3 font-medium text-lavender">
                    מרצה במכללת תמורות
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
