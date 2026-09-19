'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_PHONE, WHATSAPP_FUNNEL, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * Always-available floating WhatsApp button, pinned to the bottom
 * (logical inline-end, so it sits correctly in this RTL page without
 * hardcoded left/right). Fades out near the end of the page so it never
 * sits on top of the footer's legal disclaimer on small screens.
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

// How close to the bottom of the page (px) before the float fades out,
// so it doesn't sit on top of the footer disclaimer on short/mobile screens.
const FOOTER_CLEARANCE_PX = 220

export function WhatsAppFloat({
  phone = WHATSAPP_PHONE,
  funnel = WHATSAPP_FUNNEL,
  message,
  className = '',
}: WhatsAppFloatProps) {
  const [nearBottom, setNearBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - FOOTER_CLEARANCE_PX
      setNearBottom(scrolledToBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const finalMessage = message ?? buildWhatsAppMessage(funnel)

  return (
    <a
      href={buildWhatsAppUrl(phone, finalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="בואי נדבר בוואטסאפ עם ניקול בן מלך"
      aria-hidden={nearBottom}
      tabIndex={nearBottom ? -1 : 0}
      className={`fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        nearBottom ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
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
