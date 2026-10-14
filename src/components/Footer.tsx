import WaveMark from '@/components/ui/WaveMark'
import { WHATSAPP_PHONE, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

export interface FooterProps {
  brand: string
  tagline: string
  disclaimer: string
}

/**
 * הפוטר. מבוסס על export-footer-3b מקלוד דיזיין, בצבעים שלנו.
 *
 * ── ה-cap ──
 * רצועת דבש בראש הפוטר עם פינות תחתונות מעוגלות. היא לא מחיצה — היא
 * ההמשך של סקשן 8, שהוא פס דבש ברוחב מלא. הדבש זורם מהסקשן אל הפוטר
 * ומתעגל פנימה, ואז מתגלה הדיו שמתחתיו.
 *
 * זה גם מה שפותר את הקפיצה: בלי ה-cap המעבר היה דבש→דיו בבת אחת,
 * 8.32:1 בלי שום הכנה.
 *
 * ── הצבעים ──
 * הפאנל הוא lavender-deep, הסגול-העמוק. הוא לא צבע מיובא: אותו גוון
 * ואותה רוויה כמו הלבנדר שלנו (256° מול 257°, 26.6% מול 24.2%), מדרגה
 * כהה מתחת ל-lavender-press. הוא נוסף כטוקן ב-globals.css.
 *
 * מיפיתי אותו קודם ל-ink וזו הייתה טעות: ink הוא גוון 0°, כלומר חום,
 * והסגול הוא כל הסיבה שבחרנו ב-3B.
 *
 * ולא אפשר היה פשוט להשתמש בלבנדרים הקיימים — טקסט ground/70 נמדד
 * 3.43 על lavender ו-4.13 על lavender-press, שניהם נופלים מ-4.5.
 * על lavender-deep הוא 5.87.
 *
 * שני הצבעים המשניים של הייצוא הוחלפו: #D9D1E6 → ground/70 (5.87),
 * #C9C0D8 → ground/60 (4.76). /55 נמדד 4.27 ונפל. הוא עבד על הדיו ולא
 * על הסגול, וזה בדיוק מה שנשבר כשמחליפים רקע.
 *
 * ── הפוטר ברוחב מלא ──
 * ה-cap מעוגל, הפוטר עצמו לא. זה שומר על הכלל "פס ברוחב מלא שמחלק
 * את העמוד" — פאנל צף היה שובר אותו.
 */
export default function Footer({ brand, tagline, disclaimer }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-lavender-deep text-ground">
      {/* ה-cap. rounded-b-[3rem] הוא ערך מפורש ולא טוקן: צורה חד-פעמית
          אחת, כמו הקשת בסקשן 2. */}
      <div className="h-16 rounded-b-[3rem] bg-honey" />

      <div className="mx-auto flex w-full max-w-voice flex-col gap-16 px-shell pb-10 pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          {/* מי */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <WaveMark onDark className="h-8 w-11 flex-none" />
              <span className="font-display text-h2 text-ground">{brand}</span>
            </div>
            <p className="max-w-measure text-body text-ground/70">{tagline}</p>
          </div>

          {/* איפה, ואיך מגיעים אליה */}
          <div className="flex flex-col gap-2 text-body">
            <span className="font-semibold">קליניקת &quot;בית מרפה&quot;</span>
            <span className="text-ground/70">אחד העם 89, תל אביב</span>
            {/* dir=ltr: בלי זה ה-@ קופץ לצד הלא נכון בעברית */}
            <a
              dir="ltr"
              href="https://www.instagram.com/nicole.benmeleh/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-fit font-medium text-honey transition-colors hover:text-ground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
            >
              @nicole.benmeleh
            </a>
          </div>

          {/* הבקשה. הכפתור הוא קרם מלא על הסגול — 10.12:1 מול הפאנל,
              כלומר הדבר הבהיר ביותר בפוטר. הכיתוב עליו הוא דיו: 14.87
              על הקרם, ו-8.32 על הדבש ב-hover. שניהם לא תלויים בפאנל. */}
          <div className="flex md:justify-end">
            <a
              href={buildWhatsAppUrl(WHATSAPP_PHONE, buildWhatsAppMessage('footer'))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-fit w-fit items-center gap-2 rounded-pill bg-ground px-6 py-4 text-body font-semibold text-ink transition-colors hover:bg-honey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span>וואטסאפ</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-label text-ground/60 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-measure-wide">{disclaimer}</p>
          <span className="whitespace-nowrap">
            © {year} {brand}. כל הזכויות שמורות.
          </span>
        </div>
      </div>
    </footer>
  )
}
