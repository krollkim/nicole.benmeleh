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
    <section id="about" className="overflow-hidden bg-surface">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          {/* Side swap with section 4: Session puts its media on the reading-
              start edge (the right in RTL), so this one takes the far edge.
              `md:order-2` moves the portrait after the text on desktop while
              keeping it FIRST on mobile, where a face before the bio reads
              better in a single column. */}
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_minmax(0,46%)]">
            {/* PLACEHOLDER — C-portrait in a vertical crop. Swap for the real portrait when it arrives (copy doc §"מה חסר", item 3). */}
            <DriftReveal
              side="end"
              className="w-full md:order-2 md:h-full"
            >
              <ClipReveal className="relative h-[60vh] w-full overflow-hidden md:h-full md:min-h-[78vh]">
                <Image
                  src="/images/C-portrait-1920.webp"
                  alt="ניקול בן מלך מחייכת, פורטרט זמני עד לצילום פורטרט מוקדש"
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="object-cover object-top"
                />
              </ClipReveal>
            </DriftReveal>

            <div className="flex flex-col justify-center px-4 py-20 sm:px-8 md:py-36">
              <h2 className="text-start font-display text-3xl font-medium leading-[1.12] text-ink sm:text-5xl lg:text-6xl">
                נעים להכיר, אני ניקול בן מלך
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-[17px] leading-[1.6] text-ink max-w-[46ch]">
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
                  <span className="font-display text-xl font-medium text-primary">
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
