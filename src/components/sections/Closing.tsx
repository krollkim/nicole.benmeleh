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
    <section id="contact" className="pb-24 md:flex md:items-center md:gap-0 md:pb-0">
      {/* The room, full-bleed. It is the best photograph on the site and it
          was being served at 45% width with margins. A room section touches
          the edges — that is the whole definition. */}
      <div className="relative mb-16 h-[82svh] w-full overflow-hidden md:mb-0 md:aspect-auto md:h-[88vh] md:w-[48%]">
        <Image
          src="/images/room-empty-1200-gc.webp"
          alt="חדר הטיפולים של ניקול בן מלך ריק — מיטת טיפולים, חלון מהרצפה לתקרה ועץ בחוץ"
          fill
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
      </div>
      <div className="px-4 md:px-8 md:flex-1 md:py-24 md:pe-20 md:ps-16">
      <div className="mx-auto w-full max-w-voice">
        <ScrollReveal className="flex flex-col items-start gap-10 text-start">
          <h2 className="font-display text-h2 font-medium text-ink">
            אם משהו בגוף שלך מבקש תשומת לב, זה הזמן לדבר עליו
          </h2>

          {/* המרכוז יושב על ההורה ולא על הקומפוננטה: העטיפה שלה היא
              inline-flex, ו-items-start של ה-ScrollReveal דחף אותה לימין.
              רק הכפתור ממורכז — items-center על כל הבלוק היה נותן כותרת
              ממורכזת עם טקסט מיושר לימין בתוכה, וזה גרוע יותר. */}
          <div className="flex w-full justify-center md:justify-start">
            <WhatsAppLeadButton buttonClassName="text-body md:text-lead px-8 py-4" />
          </div>


        </ScrollReveal>
      </div>
      </div>
    </section>
  )
}
