'use client'

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
    <section id="contact" className="bg-surface px-4 py-20 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="flex flex-col items-start gap-8 text-start">
          <h2 className="font-display text-3xl font-medium leading-[1.12] text-ink sm:text-5xl lg:text-6xl">
            אם משהו בגוף שלך מבקש תשומת לב, זה הזמן לדבר עליו
          </h2>

          <WhatsAppLeadButton />

          {/* PLACEHOLDER — no empty clinic-room photo exists yet (assets map §"מה חסר", item 3).
              Do NOT substitute I-room (used elsewhere in the page) or any other photo.
              Remove this block when the real photo arrives. */}
          <div
            role="note"
            className="flex min-h-[60vh] w-full items-center justify-center border-2 border-dashed border-primary-300/70 p-6 text-center"
          >
            <span className="text-sm text-muted">
              מקום שמור לתמונת החדר הריק
              <br />
              טרם צולמה
            </span>
          </div>

          <div className="text-[17px] leading-[1.6] text-ink">
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
