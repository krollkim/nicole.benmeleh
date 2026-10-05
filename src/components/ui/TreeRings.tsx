'use client'

import { useEffect, useRef } from 'react'

/**
 * טבעות עץ — קנבס דקורטיבי לסקשן 3. מקלוד דיזיין, אופציה 3f.
 *
 * דפוס חדש בכל טעינה. תנועה איטית מאוד. נעצר כשהסקשן מחוץ למסך.
 * צבע הקו נקרא מ-var(--color-honey), כלומר הוא נשאר בתוך הפלטה גם אם
 * הטוקן ישתנה.
 *
 * prefers-reduced-motion מצייר פריים קפוא אחד ולא מריץ rAF בכלל —
 * מקפיא ולא מאט. זו הדרישה מ-TASKS.md, והיא מתקיימת כאן ולא רק
 * ב-globals.css: כלל CSS של animation:none לא היה עוצר לולאת קנבס.
 *
 * aria-hidden: זו דקורציה. אין בה מידע שקורא-מסך צריך.
 */
export default function TreeRings({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const stroke = getComputedStyle(cv).getPropertyValue('--color-honey').trim() || '#CDB18D'

    const harm = [2, 3, 4, 5, 7].map((k) => ({
      k,
      a: (0.25 + Math.random()) / k,
      p: Math.random() * Math.PI * 2,
      s: (Math.random() - 0.5) * 0.12,
    }))
    const cx = 0.35 + Math.random() * 0.3
    const cy = 0.35 + Math.random() * 0.3

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const t0 = performance.now()

    const resize = () => {
      w = cv.offsetWidth
      h = cv.offsetHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const ox = w * cx
      const oy = h * cy
      const sp = Math.max(w, h) * 0.04
      ctx.strokeStyle = stroke
      ctx.globalAlpha = 0.9
      ctx.lineWidth = 1.5
      for (let i = 1; i <= 26; i++) {
        const R = i * sp
        ctx.beginPath()
        for (let j = 0; j <= 180; j++) {
          const th = (j / 180) * Math.PI * 2
          let s = 0
          for (const m of harm) s += m.a * Math.sin(m.k * th + m.p + t * m.s)
          const r = R + R * 0.09 * s + sp * 0.12 * Math.sin(3 * th + i * 0.9 + t * 0.05)
          const x = ox + r * Math.cos(th)
          const y = oy + r * Math.sin(th)
          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }
    }

    const loop = (now: number) => {
      draw(Math.max(0, (now - t0) / 1000))
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (mq.matches) draw(3)
      else if (visible) raf = requestAnimationFrame(loop)
    }

    resize()
    start()

    const ro = new ResizeObserver(() => {
      resize()
      draw(Math.max(0, (performance.now() - t0) / 1000))
    })
    ro.observe(cv)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else cancelAnimationFrame(raf)
    })
    io.observe(cv)

    mq.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mq.removeEventListener('change', start)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 block size-full ${className}`}
    />
  )
}
