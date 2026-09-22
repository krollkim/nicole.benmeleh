'use client'

import { WHATSAPP_PHONE, WHATSAPP_FUNNEL, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * Inline WhatsApp CTA used inside content sections (Hero, section 7, section 9).
 *
 * The label and sub-line are fixed, verbatim copy — they are intentionally
 * NOT exposed as children/props, so this component can't drift from the
 * approved copy ("בואי נדבר בוואטסאפ" / "לא קובעות כלום לפני שדיברנו.").
 * This page never has a "קבעי תור" (book now) button — only "let's talk."
 */
export interface WhatsAppLeadButtonProps {
  /** International digits only, e.g. 972523055110. Defaults to WHATSAPP_PHONE. */
  phone?: string
  /** Funnel/source label folded into the prefilled message. Defaults to WHATSAPP_FUNNEL. */
  funnel?: string
  /** Override the prefilled message entirely. Must stay short, warm, neutral — no price, no promises. */
  message?: string
  /** Sub-line colour context. "onImage" is for ROOM sections, where the
   *  default muted tone sits on a photograph and fails contrast. */
  tone?: 'default' | 'onImage'
  /** Show the "לא קובעות כלום לפני שדיברנו." sub-line beneath the button. Default true. */
  showSubtext?: boolean
  /**
   * Where the button and its sub-line sit inside their own box.
   *
   * 'center' keeps the historical behaviour. 'start' exists because the
   * centred sub-line lands 39px inside the content column: the wrapper centres
   * it under the BUTTON, not under the column, so in a left-aligned text block
   * it reads as a stray indent. Passing a className cannot fix this — items-center
   * and items-start carry equal specificity and the winner depends on stylesheet
   * order, not on the order they are written in.
   */
  align?: 'center' | 'start'
  /** Classes for the outer wrapper (button + optional sub-line). */
  className?: string
  /** Classes for the <a> button itself, for per-section sizing/placement. */
  buttonClassName?: string
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.26l-.999 3.648 3.748-.957z" />
  </svg>
)

export function WhatsAppLeadButton({
  phone = WHATSAPP_PHONE,
  funnel = WHATSAPP_FUNNEL,
  message,
  showSubtext = true,
  align = 'center',
  tone = 'default',
  className = '',
  buttonClassName = '',
}: WhatsAppLeadButtonProps) {
  const finalMessage = message ?? buildWhatsAppMessage(funnel)

  return (
    <div
      className={`inline-flex flex-col gap-2 ${align === 'start' ? 'items-start text-start' : 'items-center text-center'} ${className}`}
    >
      <a
        href={buildWhatsAppUrl(phone, finalMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="בואי נדבר בוואטסאפ עם ניקול בן מלך"
        className={`inline-flex items-center gap-2 rounded-pill bg-accent px-7 py-3.5 text-base font-medium text-white shadow-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${buttonClassName}`}
      >
        <WhatsAppIcon />
        <span>בואי נדבר בוואטסאפ</span>
      </a>
      {showSubtext && (
        <p className={tone === 'onImage' ? 'text-sm text-white/85' : 'text-sm text-muted'}>לא קובעות כלום לפני שדיברנו.</p>
      )}
    </div>
  )
}
