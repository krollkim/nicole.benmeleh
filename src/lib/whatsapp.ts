/**
 * Shared WhatsApp link/message builder for the WhatsApp-only lead-capture
 * flow on this site. No backend, no Sheets — the visitor's tap opens a
 * wa.me chat with ניקול directly.
 *
 * Used by: src/components/WhatsAppFloat.tsx, src/components/WhatsAppLeadButton.tsx
 */

// ניקול's number. Local 052-696-0896 → international, no leading zero, no '+',
// digits only (wa.me requires this exact shape).
export const WHATSAPP_PHONE = '972526960896'

/**
 * Funnel/source label embedded in the prefilled message so ניקול can tell
 * where a chat came from (mirrors the `משפך` field used in the Sheets-form
 * variant elsewhere in this system). This site has one funnel.
 */
export const WHATSAPP_FUNNEL = 'ניקול בן מלך'

/**
 * Build a wa.me deep link with an optional prefilled (URL-encoded) message.
 * Phone must already be digits-only, international format, no leading 0, no '+'.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Short, warm, neutral prefilled message. Deliberately makes no promises,
 * mentions no price, and does not claim any result — the site's whole
 * premise is "we talk first, nothing is booked yet."
 *
 * ONE LINE, BY DECISION — do not re-add a funnel/source line.
 * The message is sent in the visitor's own name, so it must not read like a
 * marketing tag someone put in her mouth. The attribution already lives in the
 * wording itself ("הגעתי מהאתר"). If funnel measurement is wanted later it
 * belongs in an analytics click event, NOT in the message body.
 *
 * `funnel` stays in the signature for callers and future analytics, and is
 * deliberately not interpolated into the text.
 */
export function buildWhatsAppMessage(funnel: string = WHATSAPP_FUNNEL): string {
  void funnel
  return 'היי ניקול, הגעתי מהאתר ורציתי לשאול על טיפול'
}
