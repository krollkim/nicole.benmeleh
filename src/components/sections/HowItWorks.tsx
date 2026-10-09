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
    <section id="howitworks" className="w-full bg-honey">
      <div className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto w-full max-w-measure-wide text-center">
          <ScrollReveal className="flex flex-col items-center gap-8 text-center">
            <h2 className="font-display text-h2 font-medium text-ink">
              אין פה כפתור &quot;קבעי תור&quot;
            </h2>

            <p className="max-w-measure-wide text-body text-ink">
              כשאת כותבת לי בוואטסאפ, אנחנו קודם כל מדברות. את מספרת לי מה קורה, אני שואלת,
              לפעמים אנחנו עוברות לשיחת טלפון.
            </p>

            <p className="max-w-measure-wide text-body text-ink">
              רק אחרי שהבנו אם אני האדם הנכון בשבילך, נקבע מפגש. אם אני חושבת שלא, אני אגיד לך
              את זה.
            </p>

            {/* היה כאן לינק, בנימוק ש"הסקשן שמתווכח נגד משפך הזמנות לא
                צריך לצעוק הכי חזק". הנימוק היה שגוי: הסקשן מתווכח נגד
                יומן, לא נגד לדבר — והכפתור אומר בדיוק את הפעולה שהוא
                טוען בעדה. זה הרגע שכל הדף בנוי אליו, והוא קיבל את
                הטיפול החלש ביותר בעמוד.

                showSubtext דלוק כאן ורק כאן: "לא קובעות כלום לפני
                שדיברנו" היא התזה של הסקשן הזה. */}
            <div className="mt-2">
              {/* lavender-press ולא lavender, וזו לא בחירה אסתטית:
                  לבנדר על הדבש נמדד 2.89:1, ו-WCAG 1.4.11 דורש 3:1
                  לרכיב ממשק — הכפתור לא נקרא כאלמנט נפרד מהפס.
                  lavender-press נותן 3.65 ועובר. הוא כבר בפלטה כגוון
                  הלחיצה של אותו כפתור, כלומר לא צבע חדש ולא סגנון שני.
                  ההבדל בעין זניח; המדידה לא.

                  זה הסקשן האחרון בדף מאז 09/10/2026, אז הכפתור הזה הוא
                  הדבר האחרון שהיא רואה. */}
              <WhatsAppLeadButton
                funnel="howitworks"
                tone="onBand"
                buttonClassName="bg-lavender-press text-lead px-10 py-4"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
