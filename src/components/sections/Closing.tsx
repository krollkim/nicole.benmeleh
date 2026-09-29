'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * Section 9 — "סגירה" (docs/nicole-page-copy-v11.md).
 *
 * id is "contact" (not "closing") — the navbar CTA and other sections link
 * to #contact.
 *
 * No repeating list here (heading + CTA + clinic details), so per the
 * scroll-reveal rule this is allowed to sit inside a single ScrollReveal.
 *
 * No phone number exists for the clinic — none is invented, no tel: link.
 */
export default function Closing() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="flex flex-col items-start gap-8 text-start">
          <h2 className="font-display text-3xl font-medium leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
            אם משהו בגוף שלך מבקש תשומת לב, זה הזמן לדבר עליו
          </h2>

          <WhatsAppLeadButton />

          {/* The empty room. Shot 27/09/2026 — this slot carried a dashed
              placeholder reading "טרם צולמה" from the first build until now.
              Shot 3:4. The frame stays 3:4 on the phone and opens only to 1:1
              on wider screens — a 4:3 frame stretched it 1.8x past its shot
              aspect and the design loop caught it. */}
          <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[1/1]">
            <Image
              src="/images/room-empty-1200.webp"
              alt="חדר הטיפולים של ניקול בן מלך ריק — מיטת טיפולים, חלון מהרצפה לתקרה ועץ בחוץ"
              fill
              sizes="(max-width: 767px) 100vw, 768px"
              className="object-cover object-center"
            />
          </div>      <div className="text-[17px] leading-[1.6] text-ink">
            <p>קליניקת &quot;בית מרפה&quot;, אחד העם 89, תל אביב</p>
            <p className="mt-1">
              אינסטגרם:{' '}
              <a
                href="https://www.instagram.com/nicole.benmeleh/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 font-medium text-primary underline underline-offset-2 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded-sm"
              >
                @nicole.benmeleh
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
