'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function About() {
  return (
    <section id="about" className="bg-surface px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start md:gap-12">
            {/* PLACEHOLDER — C-portrait in a vertical crop. Swap for the real portrait when it arrives (copy doc §"מה חסר", item 3). */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-card shadow-lg md:mx-0">
              <Image
                src="/images/C-portrait-1920.webp"
                alt="ניקול בן מלך מחייכת, פורטרט זמני עד לצילום פורטרט מוקדש"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover object-top"
              />
            </div>

            <div>
              <h2 className="text-start font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                נעים להכיר, אני ניקול בן מלך
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
                <p>אני מטפלת ברפואה סינית — דיקור, שיאצו, כוסות רוח ופורמולות צמחים.</p>
                <p>
                  למדתי ארבע שנים במכללת תמורות, התמחיתי בבית החולים בני ציון בחיפה, והיום אני
                  מרצה במכללה ומלווה כיתות שיאצו משנה א׳ עד ג׳. המשכתי לקורסים מתקדמים באבחנות
                  בטן ובדיקור קרקפת בשיטת YNSA, ואני מוסמכת מטעם האיגוד העולמי של רפואה סינית.
                </p>
                <p>
                  מעבר לתעודות — עברתי בעצמי את הדברים שנשים מגיעות אליי איתם. אני יודעת איך זה
                  מרגיש לשבת מול מישהי ולא לדעת אם היא מבינה אותך. בגלל זה אני מתחילה תמיד
                  מלהקשיב.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-primary-200 pt-6">
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter to={4} className="font-display text-2xl font-medium text-primary" />
                  <span className="text-sm text-muted">שנות לימוד</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter
                    to={200}
                    suffix="+"
                    className="font-display text-2xl font-medium text-primary"
                  />
                  <span className="text-sm text-muted">מטופלים</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-lg font-medium text-primary">
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
