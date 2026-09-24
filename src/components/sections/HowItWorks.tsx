'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * Section 7 — "מה קורה כשאת כותבת לי" (docs/nicole-page-copy-v11.md).
 *
 * No repeating list here (heading + two paragraphs + CTA), so per the
 * scroll-reveal rule this is allowed to sit inside a single ScrollReveal.
 *
 * No image. H-band was tried here as a wide transitional band and removed:
 * its source is 1440×1920 — a portrait photo. Any horizontal band shows
 * roughly a third of its height, so at 3/1 the window fell out of frame
 * entirely and at 21/9 with object-top it still read as a close-up of a
 * shoulder rather than as a space. No aspect ratio or object-position fixes
 * a portrait forced into a letterbox.
 *
 * A band that doesn't carry meaning is decoration, and this page doesn't
 * need decoration. If a genuinely wide frame of the room is shot later, this
 * is where it goes.
 *
 * About "קבעי תור" in the heading: the heading is אין פה כפתור "קבעי תור" —
 * the phrase in quotes is the thing this section exists to refuse, so naming
 * it is the point. That makes this the one place on the site where those
 * words appear on purpose.
 *
 * Anywhere else they would mean the opposite. Every CTA is
 * <WhatsAppLeadButton />, whose label is the hardcoded "בואי נדבר בוואטסאפ",
 * because the page promises a conversation before anything is booked. A
 * button labelled "קבעי תור" would contradict the section it sits under.
 */
export default function HowItWorks() {
  return (
    <section id="howitworks" className="">
      <div className="px-4 py-20 sm:px-6 md:py-36">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal className="flex flex-col items-start gap-6 text-start">
            <h2 className="font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
              אין פה כפתור &quot;קבעי תור&quot;
            </h2>

            <p className="max-w-[46ch] text-[17px] leading-[1.6] text-ink">
              כשאת כותבת לי בוואטסאפ, אנחנו קודם כל מדברות. את מספרת לי מה קורה, אני שואלת,
              לפעמים אנחנו עוברות לשיחת טלפון.
            </p>

            <p className="max-w-[46ch] text-[17px] leading-[1.6] text-ink">
              רק אחרי שהבנו אם אני האדם הנכון בשבילך, נקבע מפגש. אם אני חושבת שלא, אני אגיד לך
              את זה.
            </p>

            <WhatsAppLeadButton className="mt-2" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
