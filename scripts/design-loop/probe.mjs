/**
 * The MEASUREMENT half of the design loop. Runs inside the page, touches
 * nothing, returns raw evidence as JSON.
 *
 * It deliberately does NOT decide anything. Judging lives in rules.mjs, so
 * that "what is on the page" and "what the direction document demands" stay
 * two separate things that can be diffed against each other. That separation
 * is the whole point: the previous way of working collapsed them into one
 * act of taste, which is why the same page could be declared finished and
 * then, on looking at it, obviously not be.
 */
export function collectEvidence(palette) {
  const px = (v) => parseFloat(v) || 0
  const vh = window.innerHeight
  const vw = window.innerWidth

  const toHex = (c) => {
    const m = /^rgba?\(([^)]+)\)$/.exec(c)
    if (!m) return null
    const p = m[1].split(',').map((s) => parseFloat(s))
    if (p.length > 3 && p[3] < 0.999) return null // alpha: blended, not a token
    return '#' + p.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  const all = Array.from(document.querySelectorAll('main *, header *, footer *'))
  const sectionOf = (el) => {
    const s = el.closest('section')
    return s ? s.id || '?' : el.closest('footer') ? 'footer' : el.closest('header') ? 'navbar' : '?'
  }
  const isCta = (el) =>
    !!el.closest('a[href*="wa.me"], a[href*="whatsapp"], button') ||
    el.tagName === 'A' ||
    el.tagName === 'BUTTON'

  // ---- sections: room or voice, no middle state -------------------------
  const sections = Array.from(document.querySelectorAll('main section')).map((s) => {
    const imgs = Array.from(s.querySelectorAll('img'))
    const tallest = imgs.reduce((max, i) => Math.max(max, i.getBoundingClientRect().height), 0)
    const ratio = +(tallest / vh).toFixed(3)
    return {
      id: s.id || '?',
      imageCount: imgs.length,
      tallestImageVhRatio: ratio,
      mode: imgs.length === 0 ? 'voice' : ratio >= 0.75 ? 'room' : 'neither',
    }
  })

  // ---- images: framed, rounded, shadowed, or cropped out of portrait ----
  const images = Array.from(document.querySelectorAll('main img')).map((i) => {
    const cs = getComputedStyle(i)
    const box = i.getBoundingClientRect()
    const wrap = i.parentElement ? getComputedStyle(i.parentElement) : null
    return {
      sectionId: sectionOf(i),
      src: (i.currentSrc || i.src).split('/').pop().slice(0, 40),
      naturalRatio: i.naturalHeight ? +(i.naturalWidth / i.naturalHeight).toFixed(2) : null,
      renderedRatio: box.height ? +(box.width / box.height).toFixed(2) : null,
      heightVhRatio: +(box.height / vh).toFixed(3),
      radiusPx: Math.max(px(cs.borderTopLeftRadius), wrap ? px(wrap.borderTopLeftRadius) : 0),
      shadow: cs.boxShadow !== 'none' ? cs.boxShadow.slice(0, 40) : (wrap && wrap.boxShadow !== 'none' ? wrap.boxShadow.slice(0, 40) : null),
      borderPx: Math.max(px(cs.borderTopWidth), wrap ? px(wrap.borderTopWidth) : 0),
      isCloseUp: i.dataset.crop === 'closeup',
    }
  })

  // ---- cards: the thing the direction bans outright ---------------------
  const cardSuspects = []
  for (const el of all) {
    if (isCta(el) || el.tagName === 'IMG') continue
    const cs = getComputedStyle(el)
    const pad = Math.min(px(cs.paddingTop), px(cs.paddingLeft))
    if (pad < 12) continue
    const parentBg = el.parentElement ? getComputedStyle(el.parentElement).backgroundColor : ''
    const ownBg = cs.backgroundColor
    // A translucent surface is still a surface. toHex() rejects any alpha < 1,
    // so bg-*/95 used to slip past this check entirely and a real card passed.
    const alpha = (/^rgba(([^)]+))$/.exec(ownBg) || [])[1]
    const ownAlpha = alpha ? (parseFloat(alpha.split(',')[3]) || 1) : 1
    const hasOwnSurface = ownBg !== parentBg && ownAlpha >= 0.5
    const decorated = px(cs.borderTopLeftRadius) > 0 || cs.boxShadow !== 'none' || px(cs.borderTopWidth) > 0
    if (hasOwnSurface && decorated) {
      cardSuspects.push({
        sectionId: sectionOf(el),
        tag: el.tagName,
        cls: String(el.className).slice(0, 50),
        why: `bg ${toHex(ownBg)} + pad ${pad}px + ${px(cs.borderTopLeftRadius) > 0 ? 'radius' : cs.boxShadow !== 'none' ? 'shadow' : 'border'}`,
      })
    }
  }

  // ---- palette: any fourth colour --------------------------------------
  const allowed = new Set(palette.map((h) => h.toUpperCase()))
  allowed.add('#FFFFFF').add('#000000')
  const offPalette = new Map()
  for (const el of all) {
    const cs = getComputedStyle(el)
    for (const prop of ['color', 'backgroundColor', 'borderTopColor']) {
      if (prop === 'borderTopColor' && px(cs.borderTopWidth) === 0) continue
      if (prop === 'backgroundColor' && cs.backgroundColor === 'rgba(0, 0, 0, 0)') continue
      const hex = toHex(cs[prop])
      if (!hex || allowed.has(hex)) continue
      const k = `${hex}|${prop}`
      if (!offPalette.has(k)) offPalette.set(k, { hex, prop, count: 0, sample: `${sectionOf(el)} ${el.tagName}` })
      offPalette.get(k).count++
    }
  }

  // ---- accent reserved for the WhatsApp CTA ----------------------------
  const accentHex = (palette.find((h) => h.toUpperCase() === '#6B5B95') || '#6B5B95').toUpperCase()
  const accentUsers = all
    .filter((el) => toHex(getComputedStyle(el).backgroundColor) === accentHex)
    .map((el) => ({
      sectionId: sectionOf(el),
      tag: el.tagName,
      isWhatsApp: !!el.closest('a[href*="wa.me"], a[href*="whatsapp"]') || !!el.querySelector('a[href*="wa.me"]'),
      isInteractive: !!el.closest('button, a, [role="button"], summary'),
      // Not truncated to 40 like the other captures: rules match against this
      // string, and the class that identifies an element is often the last one.
      cls: String(el.className).slice(0, 160),
    }))

  // ---- the AI-slop tells -----------------------------------------------
  const frostedGlass = all
    .filter((el) => getComputedStyle(el).backdropFilter !== 'none' && getComputedStyle(el).backdropFilter !== '')
    .map((el) => ({ sectionId: sectionOf(el), tag: el.tagName, filter: getComputedStyle(el).backdropFilter }))
  const gradients = all
    .filter((el) => /gradient/.test(getComputedStyle(el).backgroundImage))
    .map((el) => ({
      sectionId: sectionOf(el),
      tag: el.tagName,
      bg: getComputedStyle(el).backgroundImage.slice(0, 60),
      // A scrim declares itself. Guessing from the gradient string was fragile:
      // it only matched 'to bottom', so flipping the direction made a legitimate
      // scrim read as decoration.
      isScrim: el.hasAttribute('data-scrim'),
    }))

  // ---- typography ------------------------------------------------------
  const h1s = Array.from(document.querySelectorAll('h1'))
  const disclaimer = Array.from(document.querySelectorAll('footer *')).find((el) =>
    /תחליף|משלים/.test(el.textContent || '') && el.children.length === 0
  )

  return {
    viewport: { w: vw, h: vh },
    docHeight: document.documentElement.scrollHeight,
    h1Count: h1s.length,
    h1Text: h1s[0] ? h1s[0].textContent.slice(0, 60) : null,
    headingFont: h1s[0] ? getComputedStyle(h1s[0]).fontFamily.split(',')[0].replace(/["']/g, '') : null,
    bodyFont: getComputedStyle(document.body).fontFamily.split(',')[0].replace(/["']/g, ''),
    disclaimerPx: disclaimer ? px(getComputedStyle(disclaimer).fontSize) : null,
    sections,
    images,
    cardSuspects,
    offPalette: Array.from(offPalette.values()).sort((a, b) => b.count - a.count),
    accentUsers,
    frostedGlass,
    gradients,
    horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - vw),
  }
}
