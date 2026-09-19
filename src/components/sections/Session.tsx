'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import StaggerReveal from '@/components/ui/StaggerReveal'

interface StepImage {
  src: string
  alt: string
}

interface Step {
  title: string
  body: React.ReactNode
  images?: StepImage[]
}

const steps: Step[] = [
  {
    title: 'מגיעה לקליניקה',
    body: (
      <>
        חדר מואר ונעים ברחוב אחד העם. שוכבות על מיטת טיפולים, <strong>עם בגדים</strong>. לא
        צריך להביא כלום.
      </>
    ),
    images: [
      {
        src: '/images/I-room-1920.webp',
        alt: 'חדר הטיפולים בקליניקה ברחוב אחד העם — שרפרף, חלון ופרגוד',
      },
    ],
  },
  {
    title: 'מדברות',
    body: 'לפני שאני נוגעת, אני שומעת. מה כואב, מה משתנה, מה מטריד. גם אם זה נשמע לא קשור.',
  },
  {
    title: 'הטיפול',
    body: 'כ־45 דקות. שיאצו הוא לחץ ותנועה — מרגיש נעים, מרפה, ומניע דם בגוף. דיקור הוא דקירה קלה, וכשהמחטים בפנים לא כואב, להפך. רוב הנשים נרדמות.',
    images: [
      {
        src: '/images/D-hands-top-1920.webp',
        alt: 'קלוז־אפ על ידיים בעבודת שיאצו, מבט מלמעלה',
      },
      {
        src: '/images/E-hands-foot-1920.webp',
        alt: 'קלוז־אפ על ידיים עובדות על כף רגל',
      },
    ],
  },
  {
    title: 'אחרי',
    body: 'יוצאות רגועות, לפעמים קצת מרחפות. למחרת בדרך כלל מרגישים הקלה. לפעמים דווקא עולה כאב ליום־יומיים, כי הגוף עבר שינוי — ואז הוא מתייצב.',
  },
]

export default function Session() {
  return (
    <section id="session" className="bg-bg px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-start font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            בלי הפתעות: ככה נראית שעה אצלי
          </h2>
        </ScrollReveal>

        <StaggerReveal stagger={0.15} columns={1} className="relative mt-12 flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={step.title} className="relative ps-12">
              {/* rail — logical inset-inline-start so it sits on the correct
                  side in RTL automatically */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-2.5rem] top-9 w-px bg-primary-200 start-[15px]"
                />
              )}
              {/* step marker */}
              <span
                aria-hidden="true"
                className="absolute top-0 flex h-8 w-8 items-center justify-center rounded-pill bg-primary text-sm font-semibold text-white start-0"
              >
                {i + 1}
              </span>

              <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>

              {step.images && (
                <div
                  className={`mt-4 grid gap-3 ${
                    step.images.length > 1 ? 'max-w-md grid-cols-2' : 'max-w-md grid-cols-1'
                  }`}
                >
                  {step.images.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-md"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={
                          step.images!.length > 1
                            ? '(max-width: 640px) 45vw, 220px'
                            : '(max-width: 640px) 100vw, 448px'
                        }
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </StaggerReveal>

        <ScrollReveal className="mt-10">
          <p className="text-base leading-relaxed text-ink">
            רוב הנשים שמגיעות אליי לא חוששות מהטיפול. הן חוששות ממה שקורה להן בגוף. התפקיד שלי
            הוא קודם כל לייצר מקום בטוח — בלי זה אין טיפול.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
