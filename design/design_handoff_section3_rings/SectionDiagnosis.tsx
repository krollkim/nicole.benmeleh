import { TreeRings } from './TreeRings';

/** סקשן 3 · "לא כל אחת מקבלת את אותו טיפול" — אופציה 3f */
export function SectionDiagnosis() {
  return (
    <section
      aria-labelledby="s3-title"
      className="flex flex-col bg-ground lg:grid lg:grid-split lg:section-room"
    >
      {/* טקסט — ימין (55) */}
      <div className="order-2 flex flex-col justify-center px-shell pt-lg pb-xl lg:order-1 lg:ps-gutter lg:pe-lg lg:py-0">
        <p className="mb-xs text-label font-semibold text-ink-soft lg:mb-sm">
          לא כל אחת מקבלת את אותו טיפול
        </p>
        <h2 id="s3-title" className="mb-md font-display text-display text-ink lg:mb-lg">
          <span className="lg:block">המפגש הראשון </span>
          <span className="lg:block">הוא לא טיפול. </span>
          <span className="lg:block">הוא אבחון.</span>
        </h2>
        <p className="max-w-measure text-body text-ink">
          אני בודקת דופק, מאבחנת את הבטן, ושומעת ממך את כל הסיפור, לא רק את התסמין שהביא אותך. מתוך זה אני בונה אסטרטגיית טיפול שמתאימה לך, ומחליטה אם נעבוד בשיאצו, בדיקור, או בשילוב.
        </p>
      </div>

      {/* ויזואל — שמאל (45), נוגע בקצה, בלי מרזב */}
      <div className="relative order-1 h-visual-sm min-w-0 overflow-hidden bg-ink lg:order-2 lg:h-auto">
        <TreeRings />
      </div>
    </section>
  );
}
