import Image from 'next/image'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 1 — Hero. Full-bleed photograph, the heading sitting quietly on it.
 *
 * PATTERN: salondhomme.nl, a one-practitioner skin clinic. The photograph is
 * the hero. There is no text column beside it, which is the whole point: a
 * 50/50 split left half the screen empty and made the page read as a
 * wireframe.
 *
 * THE PHOTOGRAPH: hero-window, shot 27/09/2026. ניקול drawing the curtain,
 * the tree filling the window behind her. This slot was blocked from the very
 * first build — every earlier photograph showed a treatment in progress, and
 * four different layouts were built and rejected trying to work around it.
 *
 * IT BREAKS THE SCENE/CLOSE-UP RULE ON PURPOSE, and the exception is recorded
 * in scripts/design-loop/rules.mjs. The rule says a scene cannot survive a
 * crop this wide: shot at 0.75, shown full-bleed at 1.58. It survives here for
 * one specific reason — the subject is the TREE, and the tree spans the whole
 * frame horizontally, so a wide crop removes sky and floor rather than the
 * subject. That was checked on screen before the exception was written.
 *
 * Do not reuse this exception for another photograph without looking first.
 *
 * No photograph fills two slots: section 4 took E-hands-foot when this took D.
 *
 * THE SCRIM is functional, not decoration, and says so with data-scrim so the
 * design loop can tell the difference instead of pattern-matching the gradient
 * string. Two gradients, not one: the phone headline wraps to three lines and
 * climbs into the weak part of a desktop scrim, which measured 3.55:1. The
 * mobile stops are pushed higher. Measured with the text hidden, sampling the
 * backdrop inside each text box - see scrim-test in the scratchpad.
 *
 * This <h1> is the ONLY <h1> on the page. Copy is verbatim from
 * docs/nicole-page-copy-v11.md, headline option א׳.
 *
 * LCP: the photograph is `priority` and is not wrapped in any reveal.
 */
export default function Hero() {
  return (
    <section id="hero" className="w-full overflow-hidden pb-16 lg:py-24">
      {/* הפיצול מתחיל ב-md ולא ב-lg. בגרסה הקודמת טור אחד נמשך עד 1024,
          ושם התמונה הוצגה 1023x540 — יחס 1.89 מול 0.75 מקורי, מתיחה של
          פי 2.5 כשהכלל עוצר ב-1.6. הטווח 600–1023 היה שבור.

          הטור של הטקסט רחב יותר ב-md (58%) כי שם ה-Display הוא 54px
          ובטור צר הוא מתפרק. ב-lg הוא חוזר ל-48%. */}
      <div className="relative grid grid-cols-1 items-center md:grid-cols-[minmax(0,58%)_minmax(0,42%)] lg:grid-cols-[minmax(0,48%)_minmax(0,52%)]">
        {/* הקול. בדסקטופ ראשון ברשת = ימין ב-RTL.

            order: במובייל התמונה ראשונה והבלוק נדחף עליה ב--mt-20, כך
            שהטקסט והכפתור יושבים על התצלום ולא מעליו. bg-ground על
            הבלוק הפנימי הוא מה שהופך אותו לכרטיס אטום שם.

            בדסקטופ אין חפיפה, וזו החלטה: ניסיתי אותה ועם קרקע אחת היא
            נקראת כנגיסה בתצלום ולא כשכבה שמעליו. חפיפה דורשת שני
            משטחים שנבדלים, ולדף הזה יש צבע רקע אחד. מה ששובר את תחושת
            הווייארפריים הוא שהתמונה לא ממלאת את מלוא הגובה והטקסט
            ממורכז אנכית מולה. */}
        <div className="relative z-10 order-2 -mt-20 px-4 md:order-1 md:mt-0 md:px-0 md:ps-6 lg:ps-24">
          <div className="bg-ground p-6 lg:p-0 lg:py-14">
            <h1 className="text-balance font-display text-display font-medium text-ink">
              ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.
            </h1>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">
              רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.
            </p>
            <div className="mt-10">
              {/* text-lead בכל הרוחבים. התפקיד כבר נוזלי 19→21, ודריסה
                  בברייקפוינט מחזירה בדיוק את הכפילות שהמערכת באה להעיף.
                  px-10 py-4 = 40×16, על סקלת ה-8. px-8 היה 32. */}
              {/* showSubtext כבוי: "לא קובעות כלום לפני שדיברנו" מופיע
                  בדף שלוש פעמים, והליד כאן כבר אומר את אותו דבר. השורה
                  שייכת לכפתור של סקשן 7, שכל תפקידו הוא חוסר המחויבות.
                  נמדד גם שהיא יתומה: 169px מתחת לכפתור של 258px, מיושרת
                  נכון לימין אבל הקצה השמאלי שלה נוחת באמצע כלום. */}
              <WhatsAppLeadButton
                align="start"
                showSubtext={false}
                buttonClassName="text-lead px-10 py-4"
              />
            </div>
          </div>
        </div>

        {/* החדר הריק. הטור יוצא בערך 750x740, יחס 1.01, מול 0.75 מקורי —
            שינוי של פי 1.35, בתוך כלל ה-1.6. ברוחב מלא זה היה פי 2.4. */}
        {/* 60svh ולא 72: ב-390x844 הגובה הכולל הוא נאבבר 65 + תמונה
            פחות 80 של החפיפה + הכרטיס. ב-72svh הכפתור נפל מתחת לקיפול,
            והקהל מגיע מאינסטגרם — ההנעה לפעולה חייבת להיראות בלי גלילה. */}
        <div className="relative order-1 h-[60svh] w-full overflow-hidden lg:order-2 lg:h-[82vh]">
          <Image
            src="/images/room-empty-1200-gc.webp"
            alt="חדר הטיפולים של ניקול בן מלך: מיטת טיפולים, חלון מהרצפה לתקרה ועץ גדול בחוץ"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover object-[center_45%]"
          />
        </div>
      </div>
    </section>
  )
}
