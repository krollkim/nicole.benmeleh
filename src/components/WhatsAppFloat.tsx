'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_PHONE, WHATSAPP_FUNNEL, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * Always-available floating WhatsApp button, pinned to the bottom
 * (logical inline-end, so it sits correctly in this RTL page without
 * hardcoded left/right).
 *
 * It hides itself whenever a "keep-out" region is on screen. This is the
 * CalendarCTA pattern from the lead-capture skill (IntersectionObserver on
 * the footer), generalised to a list of selectors:
 *
 *   footer — so it never covers the legal disclaimer on small screens.
 *   #faq   — measured overlap at 360px: the 56px circle sat on top of the
 *            accordion rows (~1095px² over "כמה טיפולים אני צריכה?"), so a
 *            tap near the end of a question row opened WhatsApp instead of
 *            the answer. Hiding beats moving the button: it fixes every
 *            future overlap in these regions too, without touching layout.
 *
 * Both regions end in a CTA of their own (the FAQ is followed by the closing
 * section's button; the footer sits under it), so nothing is lost by hiding.
 */
export interface WhatsAppFloatProps {
  /** International digits only, e.g. 972523055110. Defaults to WHATSAPP_PHONE. */
  phone?: string
  /** Funnel/source label folded into the prefilled message. Defaults to WHATSAPP_FUNNEL. */
  funnel?: string
  /** Override the prefilled message entirely. Must stay short, warm, neutral — no price, no promises. */
  message?: string
  className?: string
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.26l-.999 3.648 3.748-.957z" />
  </svg>
)

// Regions the float must never sit on top of. Add a selector here and the
// float stays out of its way — no layout change needed.
const KEEP_OUT_SELECTORS = ['footer', '#faq']

// Small threshold so the float doesn't flicker on and off around the exact
// edge of a region.
const KEEP_OUT_THRESHOLD = 0.05

export function WhatsAppFloat({
  phone = WHATSAPP_PHONE,
  funnel = WHATSAPP_FUNNEL,
  message,
  className = '',
}: WhatsAppFloatProps) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const targets = KEEP_OUT_SELECTORS.flatMap((s) =>
      Array.from(document.querySelectorAll(s))
    )
    if (targets.length === 0) return

    // Track which regions are currently on screen; hide while any of them is.
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setHidden(visible.size > 0)
      },
      { threshold: KEEP_OUT_THRESHOLD }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const finalMessage = message ?? buildWhatsAppMessage(funnel)

  return (
    <a
      href={buildWhatsAppUrl(phone, finalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="בואי נדבר בוואטסאפ עם ניקול בן מלך"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        hidden ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
      } ${className}`}
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        insetInlineEnd: '1.25rem',
      }}
    >
      <WhatsAppIcon />
    </a>
  )
}
