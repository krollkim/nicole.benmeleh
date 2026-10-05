import Image from 'next/image'
import type { Metadata } from 'next'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * תיבת חול להירו. לא חלק מהאתר — מסלול נפרד שאפשר למחוק בשורה אחת.
 * הדף הראשי ו-Hero.tsx לא נוגעים בזה.
 *
 * מה שהמדידה אמרה, ומה שכל וריאציה עושה איתו:
 *
 * התצלום בהיר. חציון הבהירות בחצי העליון הוא 0.412, ולכן:
 *   טקסט קרם  — כותרת נופלת ב-74.0% מהפיקסלים. לא עובד.
 *   טקסט דיו  — כותרת נופלת ב-3.8%.  עובד.
 *
 * כלומר הרפרנס (טקסט בהיר על תצלום כהה) נכון בעיקרון והפוך בקוטביות
 * בשבילנו. התצלום של מורי האופנוע הוא 0.12; שלנו 0.41.
 *
 * האזור הכהה היחיד כאן הוא תחתון-מרכז, חציון 0.017, שבו טקסט קרם
 * נופל ב-12.2% בלבד — וזו וריאציה ג.
 */

export const metadata: Metadata = {
  title: 'Hero lab',
  robots: { index: false, follow: false },
}

const HEADLINE = 'ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.'
const LEAD = 'רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.'
const PHOTO = '/images/hero-window-1200-g.webp'
const ALT = 'ניקול בן מלך פותחת את הווילון בחדר הטיפולים שלה, עץ גדול מעבר לחלון'

function Label({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <div className="bg-ink px-shell py-6 text-ground">
      <p className="text-label opacity-70">וריאציה {id}</p>
      <p className="mt-1 font-display text-h3">{title}</p>
      <p className="mt-2 max-w-measure-wide text-micro opacity-70">{note}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   א · דיו על התמונה, חצי עליון
   ההיפוך של הרפרנס. הכותרת יושבת ישירות על התצלום, בלי שכבה
   ובלי גרייד, בקוטביות שהתצלום שלנו דורש. 3.8% נפילה.
   הליד והכפתור יורדים אל הקרם, כי טקסט גוף בדיו נופל שם ב-20.5%.
   ───────────────────────────────────────────────────────────── */
function VariantA() {
  return (
    <section className="w-full">
      {/* הקרופ: ב-40% ניקול נחתכה בקצה התחתון. 58% מחזיר אותה פנימה
          ומשאיר את התקרה והווילון — האזור הבהיר — מתחת לכותרת. */}
      <div className="relative h-[82svh] w-full overflow-hidden lg:h-[92vh]">
        <Image
          src={PHOTO}
          alt={ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_58%]"
        />
        <div className="absolute inset-0 flex items-start px-shell pt-12 lg:pt-16">
          <h1 className="max-w-measure text-balance font-display text-display text-ink">
            {HEADLINE}
          </h1>
        </div>
      </div>
      <div className="px-shell py-10">
        <p className="max-w-measure text-lead text-ink-soft">{LEAD}</p>
        <div className="mt-8">
          <WhatsAppLeadButton align="start" buttonClassName="text-lead px-10 py-4" />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ב · בלוק קרם שחופף את התמונה
   התמונה היא האירוע ותופסת את כל המסך, אבל הטקסט יושב על קרקע
   מלאה — אפס בעיית ניגודיות, בכל תצלום, גם זה שניקול עוד תשלח.
   זו הוריאציה היחידה כאן שלא תלויה בבהירות התצלום.
   ───────────────────────────────────────────────────────────── */
function VariantB() {
  return (
    <section className="relative w-full">
      <div className="relative h-[72svh] w-full overflow-hidden lg:h-[82vh]">
        <Image src={PHOTO} alt={ALT} fill sizes="100vw" className="object-cover object-[center_42%]" />
      </div>
      {/* רוחב הבלוק מגיע מהרשת ולא מ-ch. ch מחושב לפי font-size של האלמנט,
          שהוא גודל גוף — אז max-w-measure-wide נתן קופסה של 440px שבתוכה
          כותרת של 76px, והיא התפרקה לשבע שורות. */}
      <div className="relative z-10 -mt-20 px-shell lg:-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,58%)_minmax(0,42%)]">
          <div className="bg-ground p-10 lg:p-14">
            <h1 className="text-balance font-display text-display text-ink">{HEADLINE}</h1>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">{LEAD}</p>
            <div className="mt-10">
              <WhatsAppLeadButton align="start" buttonClassName="text-lead px-10 py-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ג · הרפרנס כפשוטו — קרם על האזור הכהה
   זה מה שקים הראה, בלי שינוי קוטביות. עובד רק בגלל שהטקסט מרוכז
   ויושב בתחתון-מרכז, האזור היחיד בתצלום שחציון הבהירות שלו 0.017.
   כותרת בלבד: טקסט גוף בקרם נופל שם ב-17.9%.
   ───────────────────────────────────────────────────────────── */
function VariantC() {
  return (
    <section className="w-full">
      <div className="relative h-[72svh] w-full overflow-hidden lg:h-[86vh]">
        <Image src={PHOTO} alt={ALT} fill sizes="100vw" className="object-cover object-[center_30%]" />
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-shell pb-16">
          <h1 className="max-w-measure text-balance text-center font-display text-display text-ground">
            {HEADLINE}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center px-shell py-10 text-center">
        <p className="max-w-measure text-lead text-ink-soft">{LEAD}</p>
        <div className="mt-8">
          <WhatsAppLeadButton buttonClassName="text-lead px-10 py-4" />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ד · טורים לא שווים, עם חפיפה
   מה ששובר את תחושת הווייארפריים הוא לא היחס אלא הקו: שני
   מלבנים שווי גובה שנפגשים בקו ישר קוראים כמו שלד. כאן הטקסט
   חופף את התמונה ויוצא ממנה, והתמונה גבוהה מהסקשן.
   ───────────────────────────────────────────────────────────── */
function VariantD() {
  return (
    <section className="w-full overflow-hidden py-16 lg:py-24">
      <div className="relative grid grid-cols-1 items-center lg:grid-cols-[minmax(0,48%)_minmax(0,52%)]">
        {/* הטקסט ראשון = ימין ב-RTL. z מעל התמונה.
            ב-40% הכותרת התפרקה לארבע שורות, והחפיפה ייצרה רצועת קרם
            דקה שנקראה כתקלה. 48% נותן שתי שורות, והחפיפה גדולה מספיק
            כדי להיקרא ככוונה. */}
        <div className="relative z-10 px-shell lg:-me-16 lg:ps-0">
          <div className="bg-ground py-8 lg:py-14 lg:pe-14 lg:ps-10">
            <h1 className="text-balance font-display text-display text-ink">{HEADLINE}</h1>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">{LEAD}</p>
            <div className="mt-10">
              <WhatsAppLeadButton align="start" buttonClassName="text-lead px-10 py-4" />
            </div>
          </div>
        </div>
        <div className="relative mt-8 h-[58svh] w-full overflow-hidden lg:mt-0 lg:h-[82vh]">
          <Image
            src={PHOTO}
            alt={ALT}
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="object-cover object-[center_45%]"
          />
        </div>
      </div>
    </section>
  )
}

export default function HeroLab() {
  return (
    <main>
      <Label
        id="א"
        title="דיו על התמונה, חצי עליון"
        note="ההיפוך של הרפרנס. כותרת ישירות על התצלום, בלי שכבה ובלי גרייד. נמדד: 3.8% מהפיקסלים נופלים. הליד והכפתור על הקרם, כי טקסט גוף היה נופל ב-20.5%."
      />
      <VariantA />

      <Label
        id="ב"
        title="בלוק קרם שחופף את התמונה"
        note="התמונה תופסת את כל המסך, הטקסט על קרקע מלאה. היחידה כאן שלא תלויה בבהירות התצלום — תעבוד גם עם מה שניקול תשלח בעתיד."
      />
      <VariantB />

      <Label
        id="ג"
        title="הרפרנס כפשוטו — קרם על האזור הכהה"
        note="בלי היפוך קוטביות. עובד רק בתחתון-מרכז, האזור היחיד שחציון הבהירות שלו 0.017. כותרת בלבד: גוף בקרם נופל שם ב-17.9%."
      />
      <VariantC />

      <Label
        id="ד"
        title="טורים לא שווים, עם חפיפה"
        note="מה ששובר את תחושת הווייארפריים הוא הקו, לא היחס. כאן הטקסט חופף את התמונה ויוצא ממנה, והתמונה גבוהה מהסקשן."
      />
      <VariantD />

      <div className="bg-ink px-shell py-16 text-ground">
        <p className="text-micro opacity-70">
          סוף. זהו מסלול בדיקה — למחוק את src/app/hero-lab/ כשמחליטים.
        </p>
      </div>
    </main>
  )
}
