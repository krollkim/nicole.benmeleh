'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap, REDUCED_MOTION_QUERY, ALWAYS_MATCHES } from '@/lib/gsap'

/**
 * Small horizontal drift on entry, tied to scroll position (`scrub`), not to a
 * one-shot toggle. Extends the gsap-scroll-reveal family: same engine
 * (ScrollTrigger), same matchMedia/REDUCED_MOTION_QUERY convention.
 *
 * Why scrub and not toggleActions: a toggle fires a fixed-length tween that
 * runs on its own clock, which reads as an element "flying in". Scrubbed, the
 * element is simply a little off-position and settles as you scroll — the
 * movement belongs to the scroll, not to itself. Travel is deliberately small
 * (24–40px); more than that stops being a settle and becomes an entrance.
 *
 * RTL: `side` is LOGICAL, never left/right. The sign is derived from the
 * document's resolved direction at runtime rather than assumed — this is the
 * one thing here that is easy to get backwards, so it is read from the DOM
 * and then confirmed visually.
 *
 * Owns ONLY `x`, on its own wrapper. It never touches opacity or clip-path,
 * so it composes safely with a ClipReveal on the image inside it: different
 * properties, different elements, no double-owner conflict.
 */
interface DriftRevealProps {
  children: ReactNode
  /**
   * Which edge the element settles in from, in logical terms.
   * 'start' = the reading-start edge (the RIGHT in RTL); 'end' = the far edge.
   */
  side?: 'start' | 'end'
  /** Travel distance in px. Keep it within 24–40. */
  distance?: number
  className?: string
}

export default function DriftReveal({
  children,
  side = 'start',
  distance = 32,
  className = '',
}: DriftRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add({ reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES }, (context) => {
      const { reduce } = context.conditions as { reduce: boolean }

      if (reduce) {
        gsap.set(el, { x: 0 })
        return
      }

      // Resolve the logical side against the real document direction.
      const isRtl = getComputedStyle(document.documentElement).direction === 'rtl'
      const startEdgeIsPositiveX = isRtl // in RTL the reading-start edge is the right
      const towardStart = side === 'start'
      const sign = towardStart === startEdgeIsPositiveX ? 1 : -1

      gsap.fromTo(
        el,
        { x: sign * distance },
        {
          x: 0,
          ease: 'none', // scrubbed: the easing belongs to the scroll, not a clock
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 55%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    return () => mm.revert()
  }, [side, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
