import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Step = { title: string; body: React.ReactNode; img: string; alt: string };

// TODO: נתיבי התמונות לפי הפרויקט. 3:4, לפחות 1000px רוחב.
// TODO: הגוף של שלבים 2 ו-3 הוא טיוטה. להחליף בקופי המקורי מהאתר הקיים.
const STEPS: Step[] = [
  {
    title: 'מגיעה לקליניקה',
    body: (<>חדר מואר ונעים ברחוב אחד העם. שוכבות על מיטת טיפולים, <strong className="font-semibold">עם בגדים</strong>. לא צריך להביא כלום.</>),
    img: '/images/clinic-room.jpg',
    alt: 'חדר הטיפולים: מיטת טיפולים לבנה מול חלון גדול עם וילונות',
  },
  {
    title: 'מדברות',
    body: 'לפני שאני נוגעת, אני שומעת. מה כואב, מה ניסית, מה מדאיג אותך. ורק אחר כך בודקת.',
    img: '/images/nicole-window.jpg',
    alt: 'ניקול ליד החלון בקליניקה',
  },
  {
    title: 'הטיפול',
    body: 'שיאצו, דיקור או שילוב, לפי מה שראינו. לפני כל מגע אני אומרת מה אני עומדת לעשות. הרבה מהנשים נרדמות.',
    img: '/images/treatment.jpg',
    alt: 'ניקול מטפלת במטופלת השוכבת בבגדים על מיטת הטיפולים',
  },
  {
    title: 'אחרי',
    body: 'יוצאות רגועות, לפעמים קצת מרחפות. למחרת בדרך כלל מרגישים הקלה. לפעמים דווקא עולה כאב ליום־יומיים, כי הגוף עבר שינוי, ואז הוא מתייצב.',
    img: '/images/hands.jpg',
    alt: 'ידיה של ניקול על כף רגל של מטופלת',
  },
];

/** סקשן 4 · "בלי הפתעות" — אופציה 4c, מדרגות */
export function SectionSteps() {
  const ref = useRef<HTMLElement>(null);
  // null = בלי חשיפה (SSR, בלי JS, reduced-motion). התמונות גלויות כברירת מחדל.
  const [reveal, setReveal] = useState<null | 'hidden' | 'shown'>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setReveal('hidden');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setReveal('shown'); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-labelledby="s4-title" className="section-voice bg-ground">
      <h2 id="s4-title" className="mb-md px-shell font-display text-h2 text-ink lg:mb-lg">
        בלי הפתעות: ככה נראית שעה אצלי
      </h2>

      {/* מובייל: גלילה אופקית עם snap. דסקטופ: ארבע עמודות, הקיצוניות נוגעות בקצה */}
      <ol className="no-scrollbar flex snap-x snap-mandatory items-start gap-xs overflow-x-auto px-shell lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="step-drop flex w-4/5 shrink-0 snap-start flex-col lg:w-auto"
            style={{ '--i': i } as CSSProperties}
          >
            <img
              src={s.img}
              alt={s.alt}
              loading="lazy"
              className="block aspect-3/4 w-full object-cover"
              style={{
                clipPath: reveal === 'hidden' ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
                transition: reveal ? `clip-path 1s var(--ease-out) ${i * 200}ms` : undefined,
              }}
            />
            <div className="flex flex-col gap-xs pt-sm lg:px-sm">
              <div className="flex items-center gap-xs">
                <span aria-hidden="true" className="flex size-md shrink-0 items-center justify-center rounded-full bg-honey text-label font-semibold text-ink">
                  {i + 1}
                </span>
                <h3 className="font-display text-h3 text-ink">{s.title}</h3>
              </div>
              <p className="text-body text-ink-soft">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-lg px-shell text-body text-ink lg:mx-auto lg:mt-xl lg:max-w-measure-wide lg:px-0 lg:text-center lg:text-lead">
        רוב הנשים שמגיעות אליי לא חוששות מהטיפול. הן חוששות ממה שקורה להן בגוף. התפקיד שלי הוא קודם כל לייצר מקום בטוח. בלי זה אין טיפול.
      </p>
    </section>
  );
}
