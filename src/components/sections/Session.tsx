'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PinnedSequence, { PinnedSequenceStep } from '@/components/ui/PinnedSequence'

/**
 * Section 4 — "בלי הפתעות: ככה נראית שעה אצלי" (docs/nicole-page-copy-v11.md).
 *
 * This is the page's one pinned move, and it earns the pin from the content:
 * the four steps are a real sequence — you arrive, you talk, you're treated,
 * you leave. On desktop the media column pins while the steps advance past it.
 * Below `md`, and under prefers-reduced-motion, the pin does not run at all
 * and this stays the plain vertical timeline (see PinnedSequence).
 *
 * Media: only TWO states across the four steps, deliberately.
 *   steps 1–2  the room (I-room)      — you arrive, and you talk, in that room
 *   steps 3–4  the hands (D-hands-top) — the treatment, carrying into "after"
 * Four photo changes would be decoration; two follow the content. Step 4 is
 * about leaving calm, so it deliberately does NOT get a fresh photo of hands
 * still working — that would quietly contradict the copy.
 *
 * The frame is square on purpose: I-room is landscape 4:3 while D is portrait
 * 3:4, and a square is the only frame that crops both fairly. A tighter ratio
 * is exactly what made the H-band image read as a body close-up instead of a
 * space (see HowItWorks).
 *
 * Reveal ownership: PinnedSequence owns the media column (pin + crossfade)
 * and, internally, the StaggerReveal over the step nodes. One owner per
 * element — nothing here wraps a stagger in a second opacity animation.
 */

const roomMedia = (
  <div className="relative aspect-square w-full overflow-hidden rounded-card">
    <Image
      src="/images/I-room-1920.webp"
      alt="חדר הטיפולים בקליניקה ברחוב אחד העם — שרפרף, חלון ופרגוד"
      fill
      sizes="(max-width: 767px) 100vw, 40vw"
      className="object-cover"
    />
  </div>
)

/**
 * D alone, square — not the D+E pair. Both are portrait 3:4; pairing them
 * side by side squeezed each into a 1:2 sliver, which is the same mistake
 * that killed the H-band image: the wrong format for the frame. One photo
 * that sits correctly beats two that are cut to fit.
 *
 * E-hands-foot is not dropped from the project — it is waiting for a place
 * that suits its format.
 */
const handsMedia = (
  <div className="relative aspect-square w-full overflow-hidden rounded-card">
    <Image
      src="/images/D-hands-top-1920.webp"
      alt="קלוז־אפ על ידיים בעבודת שיאצו, מבט מלמעלה"
      fill
      sizes="(max-width: 767px) 100vw, 40vw"
      className="object-cover"
    />
  </div>
)

interface StepCopy {
  title: string
  body: React.ReactNode
  media?: React.ReactNode
}

const stepCopy: StepCopy[] = [
  {
    title: 'מגיעה לקליניקה',
    body: (
      <>
        חדר מואר ונעים ברחוב אחד העם. שוכבות על מיטת טיפולים, <strong>עם בגדים</strong>. לא
        צריך להביא כלום.
      </>
    ),
    media: roomMedia,
  },
  {
    title: 'מדברות',
    body: 'לפני שאני נוגעת, אני שומעת. מה כואב, מה משתנה, מה מטריד. גם אם זה נשמע לא קשור.',
  },
  {
    title: 'הטיפול',
    body: 'כ־45 דקות. שיאצו הוא לחץ ותנועה — מרגיש נעים, מרפה, ומניע דם בגוף. דיקור הוא דקירה קלה, וכשהמחטים בפנים לא כואב, להפך. רוב הנשים נרדמות.',
    media: handsMedia,
  },
  {
    title: 'אחרי',
    body: 'יוצאות רגועות, לפעמים קצת מרחפות. למחרת בדרך כלל מרגישים הקלה. לפעמים דווקא עולה כאב ליום־יומיים, כי הגוף עבר שינוי — ואז הוא מתייצב.',
  },
]

export default function Session() {
  const steps: PinnedSequenceStep[] = stepCopy.map((step, i) => ({
    key: step.title,
    media: step.media ?? null,
    content: (
      <div className="relative ps-12">
        {/* rail — mobile only. On desktop the steps sit far apart beside the
            pinned media, where a connector would be a long empty stroke. */}
        {i < stepCopy.length - 1 && (
          <span
            aria-hidden="true"
            className="absolute bottom-[-2.5rem] top-9 w-px bg-primary-200 start-[15px] md:hidden"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute top-0 flex h-8 w-8 items-center justify-center rounded-pill bg-primary text-sm font-semibold text-white start-0"
        >
          {i + 1}
        </span>

        <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
      </div>
    ),
  }))

  return (
    <section id="session" className="bg-bg px-4 py-20 sm:px-6 md:py-36">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-start font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            בלי הפתעות: ככה נראית שעה אצלי
          </h2>
        </ScrollReveal>

        {/* Media sits on the reading-start edge (the right in RTL) and drifts
            in from that same edge. Section 5 takes the opposite side. */}
        <PinnedSequence
          steps={steps}
          mediaClassName="aspect-square"
          driftSide="start"
          className="mt-12"
        />

        <ScrollReveal className="mt-10 md:mt-16">
          <p className="max-w-3xl text-base leading-relaxed text-ink">
            רוב הנשים שמגיעות אליי לא חוששות מהטיפול. הן חוששות ממה שקורה להן בגוף. התפקיד שלי
            הוא קודם כל לייצר מקום בטוח — בלי זה אין טיפול.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
