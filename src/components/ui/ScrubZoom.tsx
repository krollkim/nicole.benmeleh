'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap, REDUCED_MOTION_QUERY, ALWAYS_MATCHES } from '@/lib/gsap'

/**
 * A very slow scale + drift tied to scroll position, for the big room
 * photographs. Extends the gsap-scroll-reveal family — same engine, same
 * matchMedia/REDUCED_MOTION_QUERY convention.
 *
 * This is the "light changes, elements do not enter" idea. Nothing appears,
 * nothing slides in; the room simply breathes as you move through it. The
 * numbers are deliberately at the edge of noticeable — if you can watch it
 * happening as an animation, it is too much.
 *
 * LCP SAFETY — the reason this starts at rest:
 * the hero photograph is the largest paint on the page. It therefore begins at
 * scale 1 with no offset and no opacity change, so the first frame is the
 * finished frame and nothing here delays it. The movement only exists once the
 * visitor has started scrolling, which is after LCP by definition. Never give
 * this an entrance state.
 *
 * `ease: 'none'` because it is scrubbed: the easing belongs to the scroll, not
 * to a clock of its own.
 */
interface ScrubZoomProps {
  children: ReactNode
  /** Scale reached by the end of the scroll range. Keep it under ~1.1. */
  to?: number
  /** Vertical drift in px across the same range. */
  drift?: number
  className?: string
}

export default function ScrubZoom({
  children,
  to = 1.08,
  drift = 40,
  className = '',
}: ScrubZoomProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add({ reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES }, (context) => {
      const { reduce } = context.conditions as { reduce: boolean }

      // Full cancellation, not a smaller movement.
      if (reduce) {
        gsap.set(el, { scale: 1, y: 0 })
        return
      }

      gsap.fromTo(
        el,
        { scale: 1, y: 0 },
        {
          scale: to,
          y: drift,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    return () => mm.revert()
  }, [to, drift])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
