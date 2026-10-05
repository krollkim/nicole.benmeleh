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
            {/* הקאדר הזה היה ההירו עד 05/10/2026, והוא עובר לכאן כי החדר
                הריק לקח את ההירו. מה שהוא מחליף הוא portrait-1200-g, שהוא
                סלפי: היד מושטת ונראית בפינה הימנית התחתונה, וברקע משמאל
                פח עם שקית שחורה וסולם-שרפרף. סקשן שתפקידו אמינות לא
                יכול להיפתח בזה.

                כאן ניקול עומדת ליד הווילון, גוף מלא, אור טבעי, מסתכלת
                למצלמה, בחלל שלה. זה לא מבטל את הצורך בצילום מקצועי —
                זה מוריד אותו מחסימה להעדפה. */}
            <DriftReveal
              side="end"
              className="w-full md:order-2 md:h-full"
            >
              <ClipReveal className="relative h-[82svh] w-full overflow-hidden md:h-[88vh]">
                <Image
                  src="/images/hero-window-1200-g.webp"
                  alt="ניקול בן מלך פותחת את הווילון בחדר הטיפולים שלה, עץ גדול מעבר לחלון"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[center_50%]"
                />
              </ClipReveal>
            </DriftReveal>

            <div className="flex flex-col justify-center px-4 py-16 md:px-8 md:py-24 md:pe-16">
              <h2 className="text-start font-display text-h2 font-medium text-ink">
                נעים להכיר, אני ניקול בן מלך
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-body text-ink max-w-measure">
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

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 pt-6">
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter to={4} className="font-display text-h3 font-medium text-lavender" />
                  <span className="text-label text-ink-soft">שנות לימוד</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter
                    to={200}
                    suffix="+"
                    className="font-display text-h3 font-medium text-lavender"
                  />
                  <span className="text-label text-ink-soft">מטופלים</span>
                </div>
                <div className="flex items-baseline gap-1">
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
