import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 1 — Hero. Full-bleed photograph, the heading sitting quietly on it.
 *
 * PATTERN: salondhomme.nl, a one-practitioner skin clinic. The photograph is
 * the hero. There is no text column beside it, which is the whole point: a
 * 50/50 split left half the screen empty and made the page read as a
 * wireframe.
 *
 * THE IMAGE RULE THIS FOLLOWS — close-up survives any frame, a scene does not:
 *   scene    (a room, a portrait in its surroundings) — the composition IS the
 *            content, so it needs the aspect it was shot at, or it stays off.
 *   close-up (hands, touch) — the subject fills the frame and there is no
 *            composition to destroy, so full-bleed at any ratio is fine.
 *
 * D-hands-top is a close-up: ניקול's hands holding a patient's hand, shot from
 * above over a warm wood floor. That is why cropping it to 1.6 on desktop and
 * 0.49 on a phone costs nothing, while every crop of the ROOM photographs
 * killed them.
 *
 * It also settles the older argument. A treatment in progress was banned from
 * the hero because a wide frame shows a woman being worked on. A tight frame
 * shows touch instead. The content was never the problem; the framing was.
 *
 * No photograph fills two slots: section 4 took E-hands-foot when this took D.
 *
 * THE SCRIM is functional, not decoration, and says so with data-scrim so the
 * design loop can tell the difference instead of pattern-matching the gradient
 * string. Two gradients, not one: the phone headline wraps to three lines and
 * climbs into the weak part of a desktop scrim, which measured 3.55:1. The
 * mobile stops are pushed higher. Measured with the text hidden, sampling the
 * backdrop inside each text box - see scrim-test in the scratchpad.
 *
 * This <h1> is the ONLY <h1> on the page. Copy is verbatim from
 * docs/nicole-page-copy-v11.md, headline option א׳.
 *
 * LCP: the photograph is `priority` and is not wrapped in any reveal.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative h-[92svh] w-full overflow-hidden md:h-screen">
      <Image
        src="/images/D-hands-top-1920.webp"
        alt="ידיה של ניקול בן מלך אוחזות בידה של מטופלת במהלך טיפול שיאצו"
        // Declares the scene/close-up distinction to the design loop. A close-up
        // has no composition to destroy, so any frame is legitimate. Never put
        // this on a room or an environmental portrait.
        data-crop="closeup"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_68%] md:object-[center_72%]"
      />

      {/* Functional scrim. Declared, not inferred — see the design loop. */}
      <div
        data-scrim
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(32,27,27,0.72)_0%,rgba(32,27,27,0.42)_38%,rgba(32,27,27,0.18)_64%,transparent_88%)]"
      />

      <div data-scrim
        className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(32,27,27,0.88)_0%,rgba(32,27,27,0.80)_55%,rgba(32,27,27,0.55)_82%,transparent_100%)] px-4 pb-12 pt-28 sm:px-8 md:pb-20 md:pt-36">
        <ScrollReveal className="mx-auto flex w-full max-w-5xl flex-col items-start text-start">
          <h1 className="text-balance font-display text-4xl font-medium leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-[1.6] text-white/85">
            רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.
          </p>
          <div className="mt-8">
            <WhatsAppLeadButton tone="onImage" align="start" buttonClassName="text-base md:text-lg px-8 py-4" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
