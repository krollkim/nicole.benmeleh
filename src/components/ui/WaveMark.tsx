/**
 * סימן הגל של ניקול. מקור: design/export-2b/nicole-wave-icon.svg.
 *
 * מוטמע כ-JSX ולא מיובא כקובץ, משלוש סיבות:
 *   1. אפס בקשת רשת.
 *   2. הצבעים הם טוקנים ולא ערכים קשיחים. בקובץ הם #6B5B95 ו-#CDB18D,
 *      שהם בדיוק הלבנדר והדבש שלנו — אבל טוקן נע עם הפלטה וערך קשיח לא.
 *   3. קבצי ה-SVG שקיבלנו הם כ-8KB כל אחד, ורובם מטא-דאטה של C2PA ולא
 *      גרפיקה. הגיאומטריה עצמה היא שני נתיבים ועיגול.
 *
 * הגיאומטריה מועתקת מילה במילה מגרסת ה-icon, העבה, שנועדה לגדלים
 * קטנים. בייצוא יש גם גרסת mark דקה יותר (stroke 3.2 ו-2) לשימוש גדול.
 *
 * aria-hidden: הוא מופיע תמיד לצד השם הכתוב, ולכן דקורטיבי.
 *
 * onDark: על הפאנל הסגול-העמוק של הפוטר הקו הלבנדר נמדד 1.96:1 מול הרקע
 * ונבלע בו. במצב הזה הוא עובר לקרם (10.12:1), בדיוק כפי שההאנדאוף עושה
 * ב-export-footer-3b/footer.html שורה 42. הדבש נשאר דבש — 5.66:1 שם.
 */
export default function WaveMark({
  className = '',
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14 62 C34 30 54 30 70 50 S106 70 126 38"
        stroke={onDark ? 'var(--color-ground)' : 'var(--color-lavender)'}
        strokeWidth="5"
      />
      <path
        d="M26 76 C44 54 60 54 74 64 S102 78 116 62"
        stroke="var(--color-honey)"
        strokeWidth="3.5"
      />
      <circle cx="134" cy="27" r="5" fill="var(--color-honey)" />
    </svg>
  )
}
