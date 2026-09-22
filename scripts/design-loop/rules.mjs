/**
 * The GOLD STANDARD, fixed. Every rule here is transcribed from a specific
 * line of nicole-design-direction.md and cites it, so that the criterion
 * cannot quietly drift between rounds. If a rule needs to change, the
 * document changes first and this file follows.
 *
 * Four verdicts, because "fail" alone hides two different situations:
 *   PASS    — the page satisfies the rule, measured.
 *   FAIL    — a real defect. Fixable in code. Fix it.
 *   BLOCKED — fails only because an asset or approval does not exist yet.
 *             Not a defect, and NOT something to chase. This is the loop's
 *             stop condition: a BLOCKED rule can never be argued into PASS.
 *   ASK     — an open creative decision. The loop surfaces it and stops.
 *             It does not decide, and it does not "improve" its way past it.
 */

/** Section → mode, from the mapping table (direction v3, §המיפוי). */
export const ROOM_MAP = {
  // room -> voice -> room, all on 22/09/2026. Settled: the client chose
  // A-hero, which is 3:4 (0.750) against a 0.800 column, so it goes in whole.
  hero: 'room',
  // 'map' is a third state, legal for this section only: an interactive body
  // map that is neither a full-height room nor image-free voice. The binary law
  // was written to keep cards out, and it did — but it also produced sections
  // that read as wireframes. See the direction doc, §'החוק הבינארי נשבר'.
  symptoms: 'map',
  approach: 'voice',
  session: 'room',
  about: 'room',
  reviews: 'voice',
  howitworks: 'voice',
  faq: 'voice',
  contact: 'room',
}

/**
 * Sections whose room photograph has not been shot yet (direction v3, row 9
 * of the mapping table and the blocked-hero note). A rule that fails on one
 * of these reports BLOCKED, never FAIL: no amount of code closes it.
 */
export const AWAITING_PHOTO = new Set(['contact', 'reviews'])

const ok = (detail) => ({ verdict: 'PASS', detail })
const bad = (detail) => ({ verdict: 'FAIL', detail })
const blocked = (detail) => ({ verdict: 'BLOCKED', detail })
const ask = (detail) => ({ verdict: 'ASK', detail })


/**
 * Deliberate, client-approved departures from the direction document.
 *
 * A judge that reports a decision already made is noise, and noise is how a
 * loop stops being read. Each entry names the rule, the section, and the date
 * the call was made. Adding one is a decision, not a convenience: if a rule
 * needs an exception in more than a section or two, the rule is wrong and the
 * document should change instead.
 *
 * 22/09/2026, section 2 (the body map from Claude Design). The client chose to
 * keep the component as designed after seeing the conflicts listed.
 */
const EXCEPTIONS = {
  'image-no-frame': ['symptoms'],   // the arch radius and its shadow
  'no-cards': ['symptoms'],         // the floating card that follows the active point
  'no-gradients': ['symptoms'],     // the tint over the mannequin
}
const excused = (id, sectionId) => (EXCEPTIONS[id] || []).includes(sectionId)

export const RULES = [
  {
    id: 'binary-law',
    doc: '§החוק הבינארי: "כל סקשן בדף הוא אחד משניים. אין מצב ביניים"',
    judge(ev) {
      const middle = ev.sections.filter((s) => s.mode === 'neither')
      if (!middle.length) return ok(`${ev.sections.length} sections, all room or voice`)
      const names = middle.map((s) => `${s.id}(img@${s.tallestImageVhRatio}vh)`).join(', ')
      // A section that owns no photograph yet cannot reach room height.
      const onlyBlocked = middle.every((s) => AWAITING_PHOTO.has(s.id) || ROOM_MAP[s.id] === 'map')
      return onlyBlocked ? blocked(`awaiting photo: ${names}`) : bad(`middle state: ${names}`)
    },
  },
  {
    id: 'room-mapping',
    doc: '§המיפוי: the nine-row table, 4 חדר / 5 קול alternating',
    judge(ev) {
      // A section declared 'map' in the table is exempt from room/voice.
      const off = ev.sections.filter(
        (s) => ROOM_MAP[s.id] && ROOM_MAP[s.id] !== 'map' && s.mode !== 'neither' && s.mode !== ROOM_MAP[s.id]
      )
      const fmt = (l) => l.map((s) => `${s.id}: want ${ROOM_MAP[s.id]}, is ${s.mode}`).join('; ')
      const real = off.filter((s) => !AWAITING_PHOTO.has(s.id))
      if (real.length) return bad(fmt(real))
      if (off.length) return blocked(`${fmt(off)} — awaiting the photograph`)
      return ok('every classified section matches the table')
    },
  },
  {
    id: 'image-no-frame',
    doc: '§אסור: "תמונה בתוך מסגרת, עם פינות מעוגלות או עם צל"',
    judge(ev) {
      const framed = ev.images
        .filter((i) => !excused('image-no-frame', i.sectionId))
        .filter((i) => i.radiusPx > 0 || i.shadow || i.borderPx > 0)
        .map((i) => `${i.sectionId}/${i.src}: r=${i.radiusPx} b=${i.borderPx} s=${i.shadow ? 'yes' : 'no'}`)
      return framed.length ? bad(framed.join('; ')) : ok(`${ev.images.length} images, none framed`)
    },
  },
  {
    id: 'no-portrait-band',
    doc: '§אסור + §קלוז-אפ שורד כל מסגרת: the ban is for scenes, not close-ups',
    judge(ev) {
      const cropped = ev.images
        // A close-up declares itself with data-crop="closeup". The subject fills
        // the frame, so there is no composition for a wide crop to destroy. The
        // ban exists for SCENES, where the framing is the content.
        .filter((i) => !i.isCloseUp && i.naturalRatio && i.naturalRatio < 1 && i.renderedRatio && i.renderedRatio > 1.5)
        .map((i) => `${i.sectionId}/${i.src}: shot ${i.naturalRatio}, rendered ${i.renderedRatio}`)
      const closeups = ev.images.filter((i) => i.isCloseUp).length
      return cropped.length ? bad(cropped.join('; ')) : ok(`no scene squeezed into a band (${closeups} declared close-up)`)
    },
  },
  {
    id: 'no-cards',
    doc: '§אסור: "כרטיסיות. בשום סקשן."',
    judge(ev) {
      const suspects = ev.cardSuspects.filter((c) => !excused('no-cards', c.sectionId))
      if (!suspects.length) return ok('zero card-shaped elements outside the excused sections')
      return bad(suspects.map((c) => `${c.sectionId} <${c.tag}> ${c.why}`).join('; '))
    },
  },
  {
    id: 'palette-closed',
    doc: '§אסור: "כל צבע שאינו מהקרקע המדודה או מהלוונדר. בלי צבע רביעי."',
    judge(ev) {
      if (!ev.offPalette.length) return ok('every opaque colour is a theme token')
      return bad(ev.offPalette.slice(0, 5).map((c) => `${c.hex} as ${c.prop} ×${c.count} (${c.sample})`).join('; '))
    },
  },
  {
    id: 'accent-reserved',
    doc: '§שכבה 2 + §נגיעות: lavender is the CTA, plus a named list of touches',
    judge(ev) {
      // §נגיעות sanctions lavender on: the FAQ separators, the step numbers in
      // section 4, the review quote marks, the numbers in section 5, and link
      // underlines. Those are not stray accent — they are the rule.
      // The document says lavender is "ה-CTA וכל מצב אינטראקטיבי" — every
      // interactive state, not a fixed list. The old whitelist only named the
      // step numbers in section 4, so an active filter pill and an active body-
      // map dot both read as stray accent. They are exactly what the rule wants.
      const SANCTIONED = [{ sectionId: 'session', cls: /rounded-pill/ }]
      const stray = ev.accentUsers.filter(
        (a) => !a.isWhatsApp && !a.isInteractive && !SANCTIONED.some((k) => k.sectionId === a.sectionId && k.cls.test(a.cls))
      )
      // Stated every run, because it limits what this rule can ever prove:
      // --color-primary and --color-accent hold the same hex, so the probe
      // cannot tell the CTA role from the touch role by colour alone.
      const caveat = '(primary and accent share one hex; roles are not separable by colour)'
      if (stray.length) return bad(stray.map((a) => `${a.sectionId} <${a.tag}> ${a.cls}`).join('; '))
      const ctas = ev.accentUsers.filter((a) => a.isWhatsApp).length
      const interactive = ev.accentUsers.filter((a) => !a.isWhatsApp && a.isInteractive).length
      return ok(`${ctas} CTA + ${interactive} interactive + ${ev.accentUsers.length - ctas - interactive} touches ${caveat}`)
    },
  },

  {
    id: 'no-gradients',
    doc: 'slop tell: the indigo→purple gradient (a [data-scrim] is functional, not decoration)',
    judge(ev) {
      // A scrim declares itself with [data-scrim]. The old regex only matched
      // 'to bottom', so a bottom-up scrim read as decoration and failed.
      const real = ev.gradients.filter((g) => !g.isScrim && !excused('no-gradients', g.sectionId))
      return real.length ? bad(real.map((g) => `${g.sectionId} ${g.bg}`).join('; ')) : ok('no decorative gradients')
    },
  },
  {
    id: 'no-frosted-glass',
    doc: 'slop tell: backdrop-blur on a floating bar',
    judge(ev) {
      if (!ev.frostedGlass.length) return ok('no backdrop-filter anywhere')
      return bad(ev.frostedGlass.map((f) => `${f.sectionId} <${f.tag}> ${f.filter}`).join('; '))
    },
  },
  {
    id: 'single-h1',
    doc: 'the page has exactly one <h1>, in the hero',
    judge(ev) {
      return ev.h1Count === 1 ? ok(`"${ev.h1Text}"`) : bad(`${ev.h1Count} <h1> elements`)
    },
  },
  {
    id: 'disclaimer-not-smallest',
    doc: '§טיפוגרפיה: "שורת ההבהרה בפוטר לא קטנה מ-14px"',
    judge(ev) {
      if (ev.disclaimerPx == null) return bad('disclaimer line not found in <footer>')
      return ev.disclaimerPx >= 14 ? ok(`${ev.disclaimerPx}px`) : bad(`${ev.disclaimerPx}px, under the 14px floor`)
    },
  },
  {
    id: 'no-horizontal-overflow',
    doc: 'RTL regression guard: the page must not scroll sideways',
    judge(ev) {
      return ev.horizontalOverflowPx === 0
        ? ok('scrollWidth === innerWidth')
        : bad(`${ev.horizontalOverflowPx}px of horizontal overflow`)
    },
  },
  {
    id: 'body-font-is-a-choice',
    doc: '§טיפוגרפיה names Assistant — but Assistant is the Hebrew default face',
    judge(ev) {
      if (!/Assistant/i.test(ev.bodyFont || '')) return ok(`body is ${ev.bodyFont}`)
      return ask(`body is ${ev.bodyFont}, the Hebrew equivalent of Inter. Keep it or replace it — your call.`)
    },
  },
]
