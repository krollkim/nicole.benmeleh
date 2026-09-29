'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { WHATSAPP_PHONE, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

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
    <section id="howitworks" className="w-full bg-secondary/40">
      <div className="px-4 py-24 sm:px-8 md:py-32">
        <div className="mx-auto w-full max-w-2xl text-center">
          <ScrollReveal className="flex flex-col items-center gap-8 text-center">
            <h2 className="font-display text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.75rem]">
              אין פה כפתור &quot;קבעי תור&quot;
            </h2>

            <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink">
              כשאת כותבת לי בוואטסאפ, אנחנו קודם כל מדברות. את מספרת לי מה קורה, אני שואלת,
              לפעמים אנחנו עוברות לשיחת טלפון.
            </p>

            <p className="max-w-[52ch] text-[17px] leading-[1.6] text-ink">
              רק אחרי שהבנו אם אני האדם הנכון בשבילך, נקבע מפגש. אם אני חושבת שלא, אני אגיד לך
              את זה.
            </p>

            {/* A link, not the third filled button. The section that argues
                against a booking funnel should not shout the loudest. */}
            <a
              href={buildWhatsAppUrl(WHATSAPP_PHONE, buildWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-lg text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              בואי נדבר בוואטסאפ
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
