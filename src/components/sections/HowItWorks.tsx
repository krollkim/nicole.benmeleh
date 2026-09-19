'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * Section 7 — "מה קורה כשאת כותבת לי" (docs/nicole-page-copy-v11.md).
 *
 * No repeating list here (heading + two paragraphs + CTA), so per the
 * scroll-reveal rule this is allowed to sit inside a single ScrollReveal.
 *
 * H-band is described in the assets map as a strong composition that works
 * as a wide band between sections, not as a main/hero-style image — so it
 * is rendered full-bleed and short, ahead of the text content, rather than
 * as a contained "main" photo.
 *
 * THE WORDS "קבעי תור" IN THE <h2> ARE INTENTIONAL — DO NOT "FIX" THEM.
 * The heading is literally אין פה כפתור "קבעי תור", and the section works
 * precisely because it names the thing the page refuses to do. This is the one
 * and only place that phrase may appear. It must NEVER become the label of a
 * button or link anywhere on the site — every CTA is <WhatsAppLeadButton />,
 * whose label is the hardcoded "בואי נדבר בוואטסאפ".
 */
export default function HowItWorks() {
  return (
    <section id="howitworks" className="bg-bg">
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[3/1]">
        <Image
          src="/images/H-band-1920.webp"
          alt="קאדר רחב של חדר הטיפולים עם החלון והאור הנכנס פנימה"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal className="flex flex-col items-start gap-6 text-start">
            <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              אין פה כפתור &quot;קבעי תור&quot;
            </h2>

            <p className="text-base leading-relaxed text-ink">
              כשאת כותבת לי בוואטסאפ, אנחנו קודם כל מדברות. את מספרת לי מה קורה, אני שואלת,
              לפעמים אנחנו עוברות לשיחת טלפון.
            </p>

            <p className="text-base leading-relaxed text-ink">
              רק אחרי שהבנו אם אני האדם הנכון בשבילך — נקבע מפגש. אם אני חושבת שלא, אני אגיד לך
              את זה.
            </p>

            <WhatsAppLeadButton className="mt-2" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
