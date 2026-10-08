# Handoff: WhatsApp Reviews Section (Nicole)

## Overview
A testimonials section for Nicole's (Chinese medicine / acupuncture) site. Four real client messages are shown inside a WhatsApp-style phone screen. The input bar at the bottom of the phone is the section's CTA: clicking it opens WhatsApp to Nicole with a prefilled message. The page has no "book an appointment" button by design — the conversation is the conversion.

Language: Hebrew, `dir="rtl"`.

## About the Design Files
The files here are **design references built in HTML** — a prototype of the intended look and behavior, not production code. Recreate it in the target codebase's environment (React, Vue, WordPress block, etc.) using its existing patterns. `reviews-phone.dc.html` opens directly in a browser (keep `support.js`, `reviews-data.js` and `_ds/` beside it).

## Fidelity
**High-fidelity.** Colors, type, spacing, radii and copy are final. Recreate pixel-perfectly.

## Layout
Section root: `dir="rtl"`, `display:flex; flex-wrap:wrap; align-items:center`.
- Padding: `clamp(40px,6vw,80px)` vertical, `clamp(20px,5vw,64px)` horizontal
- Gap: `clamp(32px,6vw,96px)`
- Page background: `#F5EAD8`
- Two children: **Intro column** (start/right side in RTL) and **Phone**. On narrow screens they wrap and stack (intro above phone).

### Intro column
`flex:1 1 300px; max-width:440px`, column, `gap:16px`, items aligned to start.
1. Tag "המלצות" — pill, 11px, letter-spacing .02em, padding 3px 10px, bg `#F0FAE1`, text `#3D472B`, radius 999px
2. H2 "מה מספרות המטופלות" — Suez One 400, `clamp(32px,4.4vw,52px)`, line-height 1.12, `text-wrap:balance`, color `#201E1D`
3. Paragraph "הודעות שקיבלה ניקול מהמטופלות שלה, כפי שנשלחו." — Heebo 400, 18px, line-height 1.6, color `#474238`

### Phone
`flex:0 1 360px; width:100%; max-width:360px`, column, `border-radius:36px; overflow:hidden`, border `8px solid #201B1B`, bg `#FCF8F1`, shadow `0 12px 32px rgba(46,43,37,.22)`.

**1. Header bar** — flex row, gap 12px, padding 12px 16px, bg `#CDB18D`, text `#201B1B`
- Avatar: 40×40 circle, bg `#201B1B`, letter "נ" in `#F5EAD8`, Heebo 600 17px, centered
- Title "המלצות על ניקול" — 16px / 600
- Subtitle "4 הודעות" (count of messages) — 13px / 400, full opacity

**2. Chat feed** (scroll area)
- bg `#FCF8F1` plus dot pattern: `radial-gradient(#DCD3C4 1.4px, transparent 1.6px)` at `22px 22px`
- `overflow-y:auto; overscroll-behavior:contain`, scrollbar hidden
- Bottom fade: `mask-image: linear-gradient(#000 calc(100% - 56px), transparent)`
- Inner padding: 24px top/bottom, 18px right, 40px left (bubbles hug the right edge, WhatsApp incoming style in RTL)
- Messages stacked, gap 18px
- **Date chip** above the first message: "היום", centered, 12px/500, padding 5px 12px, pill, bg `#F9F4ED`, text `#645C50`, shadow `0 1px 2px rgba(46,43,37,.14)`
- **Bubble**: bg `#EDE0CA`, radius `18px 0 18px 18px` (top-right square, where the tail attaches), padding 8px 12px 6px, shadow `0 1px 2px rgba(46,43,37,.14)`, column gap 3px, max-width 100%
  - Tail: 12×16 SVG at top-right, `position:absolute; right:-11px; top:0`, path `M0 0H12C8 3 4 9 0 16Z`, fill `#EDE0CA` (must sit flush with the bubble — no gap)
  - Sender name: 14px / 600, `#8C491A`
  - Body: 15.5px / 400, line-height 1.5, `white-space:pre-line` (preserve line breaks), `text-wrap:pretty`, `#201E1D`
  - Time: 11.5px, `#82796A`, tabular numerals, aligned to end (left)

**3. CTA input bar** — the whole row is one link (`<a>`)
- flex row, gap 10px, padding 10px 12px, bg `#FCF8F1`; hover bg `#F5EAD8`
- Fake field: flex 1, min-height 44px, pill, bg `#FFFFFF`, border `1.5px solid #CDB18D`, padding 0 16px, text "כתבי לניקול…" 15px `#5B5150`
- Send button: 44×44 circle, bg `#6E5A9A` (lavender, ~5.4:1 vs `#FCF8F1`), Lucide `send` icon 20px, stroke `#FCF8F1`, stroke-width 2.75, mirrored horizontally (`scaleX(-1)`) for RTL
- Focus: visible 2px outline (accent `#C67139`), offset -4px

## Interactions & Behavior
- **Feed height (important):** the feed is sized so the **first message is fully visible** and the top of the second one peeks under the bottom fade. Measured at runtime: `feedHeight = (top of 2nd message relative to feed content top) + 96px`. Re-measure on resize and after fonts load (ResizeObserver + `document.fonts.ready`). Keep the phone short — it must not take a full screen.
- Feed scrolls manually only. No autoplay.
- **CTA link:** `https://wa.me/<phone>?text=<encodeURIComponent(message)>`, `target="_blank" rel="noopener"`, `aria-label="שליחת הודעת וואטסאפ לניקול"`.
  - `phone`: digits only, international format, no `+` (placeholder in the prototype: `972500000000` — **replace with Nicole's real number**)
  - `message` default: "היי ניקול, קראתי את ההמלצות ורציתי לדבר"

## State
Static content; no fetching. Configurable props: `phone`, `message`. Reviews come from `reviews-data.js`.

## Content
Display order (indexes into `reviews-data.js`): `[3, 1, 2, 0]` — the shortest message first so the phone stays low.
1. מטופלת · 9:38 — "אחת המטפלות היותר מדהימות…"
2. מטופלת · 11:31 — "הכרתי את ניקול במקרה לפני שנה…"
3. נועה · 11:42 — "הגעתי לניקול בעקבות סחרחורות…"
4. הדר · 10:59 — "אני רוצה להמליץ מכל הלב על ניקול…"

Use the text verbatim from `reviews-data.js` (including emoji and line breaks). Note: Hadar's message ends with "ומכל הלב" — the last word was cut off in the source screenshot; confirm with the original message.

## Design Tokens
Colors
- Ink (phone frame, avatar, header text): `#201B1B`
- Honey (header bar, field border): `#CDB18D`
- Cream (page bg, avatar letter): `#F5EAD8`
- Chat bg / CTA bar: `#FCF8F1`
- Bubble: `#EDE0CA`
- Lavender (send button): `#6E5A9A`
- Body text: `#201E1D`; secondary text `#474238`; time `#82796A`; date chip text `#645C50`; field placeholder `#5B5150`
- Sender name: `#8C491A`
- Dots: `#DCD3C4`; date chip bg `#F9F4ED`
- Tag: bg `#F0FAE1`, text `#3D472B`

Typography
- Heading: Suez One 400 (Google Fonts)
- Body: Heebo 400/500/600 (Google Fonts)

Radii: phone 36px; bubble 18px (top-right 0); pills 999px
Shadows: sm `0 1px 2px rgba(46,43,37,.14)`; lg `0 12px 32px rgba(46,43,37,.22)`

## Assets
- Send icon: Lucide `send` (https://lucide.dev), stroke-width 2.75
- No images. Bubble tail is an inline SVG (path above).

## Files
- `reviews-phone.dc.html` — the design reference (open in browser)
- `reviews-data.js` — the four review texts, names and times
- `support.js`, `_ds/…` — runtime + design-system stylesheet the reference needs to open; not for production
