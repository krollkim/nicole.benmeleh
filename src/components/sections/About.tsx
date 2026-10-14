'use client'

import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import DriftReveal from '@/components/ui/DriftReveal'
import ClipReveal from '@/components/ui/ClipReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

export default function About() {
  // overflow-hidden: the portrait is full-bleed now and DriftReveal
  // translates it 32px on entry, which would otherwise widen the page by
  // exactly that much on mobile. The shift is intentional; the container clips it.
  return (
    <section id="about" className="overflow-hidden">
      {/* full width, like the hero: a ROOM photo reaches the edge of the page */}
      <div>
        <ScrollReveal>
          {/* Side swap with section 4: Session puts its media on the reading-
              start edge (the right in RTL), so this one takes the far edge.
              `md:order-2` moves the portrait after the text on desktop while
              keeping it FIRST on mobile, where a face before the bio reads
              better in a single column.

              min-h ולא h: הגובה נגזר מהטור הארוך מבין השניים, והמינימום רק
              מונע מהסקשן לקרוס אם הטקסט יתקצר. */}
          <div className="grid grid-cols-1 items-stretch md:min-h-[88vh] md:grid-cols-2">
            {/* קאדר שקים העלה 07/10/2026. ניקול גדולה בפריים, מחייכת אל
                המצלמה, העץ בחלון מאחוריה — החזק מבין שלושת הקאדרים שלה.

                גורד לסט: המקור נמדד L=0.430 מול ממוצע 0.378 של שש האחרות,
                כלומר 14% בהיר מהן, והיה JPEG. brightness 0.94 הוריד אותו
                ל-0.370 והומר ל-webp. המקור נשאר כ-about.jpeg.

                זה משחרר את hero-window-1200-g, שישבה כאן זמנית מאז שהחדר
                הריק לקח את ההירו, ולכן מבטל אחת משתי הכפילויות בסקשן 4. */}
            <DriftReveal side="end" className="w-full md:order-2 md:h-full">
              {/* md:h-full ולא md:h-[88vh]. התמונה הייתה נעולה על 792px בתוך
                  תא שהטקסט מתח ל-1011, ומתחתיה נמדדו 219px של קרם ריק —
                  כלומר התמונה הפסיקה למלא את הטור שלה. */}
              <ClipReveal className="relative h-[82svh] w-full overflow-hidden md:h-full">
                <Image
                  src="/images/about-1200-g.webp"
                  alt="ניקול בן מלך בחדר הטיפולים שלה, מחייכת אל המצלמה, עץ גדול מעבר לחלון"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[center_50%]"
                />
              </ClipReveal>
            </DriftReveal>

            {/* התיחום יושב על עטיפה פנימית אחת, ולא על כל בלוק בנפרד — כך
                הכותרת, הגוף, שורת האמון וה-CTA חולקים קצה אחד ולא ארבעה.

                מה שהשתנה 13/10/2026: התיחום ישב על הטור עצמו, ואז כל 233px
                העודף נפלו לצד אחד. נמדד ב-1440 — התמונה נגמרה ב-x=720
                והאות הראשונה התחילה ב-x=1017, כלומר 297px של ריק ביניהן,
                בזמן שמקצה הדף הימני, שם העין נכנסת, נשארו 32px בלבד.
                עכשיו הריפוד סימטרי ו-mx-auto מחלק את העודף לשני הצדדים. */}
            <div className="flex flex-col justify-center px-4 py-16 md:px-10 md:py-16 lg:px-16">
              <div className="w-full md:mx-auto md:max-w-measure-wide">
                <h2 className="text-start font-display text-h2 font-medium text-ink">
                  נעים להכיר, אני ניקול בן מלך
                </h2>

                {/* בלי תיחום משלו. היה כאן max-w-measure, ומדדנו שלושה
                    רוחבים שונים באותו טור — כותרת 480, פסקאות 387, שורת
                    אמון 480 — כך שהפסקאות נתקעו פנימה ב-93px עם קצה שמאלי
                    מרופט שצף בתוך עמודה רחבה יותר. התיחום עבר החוצה. */}
                <div className="mt-6 flex flex-col gap-4 text-body text-ink">
                  <p>אני מטפלת ברפואה סינית: דיקור, שיאצו, כוסות רוח ופורמולות צמחים.</p>
                  <p>
                    למדתי ארבע שנים במכללת תמורות, התמחיתי בבית החולים בני ציון בחיפה, והיום אני
                    מרצה במכללה ומלווה כיתות שיאצו משנה א׳ עד ג׳. המשכתי לקורסים מתקדמים באבחנות
                    בטן ובדיקור קרקפת בשיטת YNSA, ואני מוסמכת מטעם האיגוד העולמי של רפואה סינית.
                  </p>
                  <p>
                    מעבר לתעודות, עברתי בעצמי את הדברים שנשים מגיעות אליי איתם. אני יודעת איך זה
                    מרגיש לשבת מול מישהי ולא לדעת אם היא מבינה אותך. בגלל זה אני מתחילה תמיד
                    מלהקשיב.
                  </p>
                </div>

                {/* שתיים ואחת למטה. שורה של שלושה לא נכנסת — "מרצה במכללת
                    תמורות" לבדו צריך ~150px ולפריט יש ~130 — וטור של שלושה
                    נמדד 200px לשלוש עובדות בנות שורה אחת, וזה מה שדחף את
                    ה-CTA אל מתחת לקיפול. שתי שורות במקום שלוש חוסכות 84px,
                    והשלישי מקבל רוחב מלא כי הוא היחיד שהוא משפט ולא מספר. */}
                <div className="mt-8 grid grid-cols-2 border-t border-ink/15">
                  <div className="flex items-baseline gap-2 border-b border-ink/15 py-3 pe-4">
                    <AnimatedCounter to={4} className="font-display text-h3 font-medium text-lavender" />
                    <span className="text-label text-ink-soft">שנות לימוד</span>
                  </div>
                  <div className="flex items-baseline gap-2 border-b border-ink/15 py-3">
                    <AnimatedCounter
                      to={200}
                      suffix="+"
                      className="font-display text-h3 font-medium text-lavender"
                    />
                    <span className="text-label text-ink-soft">מטופלים</span>
                  </div>
                  <div className="col-span-2 flex items-baseline py-3">
                    <span className="font-display text-h3 font-medium text-lavender">
                      מרצה במכללת תמורות
                    </span>
                  </div>
                </div>

                {/* CTA בכל סקשן (11/10/2026), והצף ירד. כאן הוא יושב
                    אחרי שורת האמון ולא לפניה — ההסמכות הן מה שמצדיק
                    את הבקשה, אז הן באות קודם. */}
                <div className="mt-10 flex justify-center md:justify-start">
                  <WhatsAppLeadButton
                    align="start"
                    funnel="about"
                    showSubtext={false}
                    buttonClassName="text-lead px-10 py-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
