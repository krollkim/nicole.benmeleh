'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap, REDUCED_MOTION_QUERY, ALWAYS_MATCHES } from '@/lib/gsap'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

/**
 * Single-block fade-up. Use this to reveal ONE element/section as a whole
 * (e.g. a section heading + intro paragraph).
 *
 * USAGE — right vs wrong (double-opacity trap):
 *
 *   // RIGHT: heading revealed on its own, grid revealed separately by
 *   // StaggerReveal. Two owners, two elements — no conflict.
 *   <ScrollReveal><h2>הכותרת</h2></ScrollReveal>
 *   <StaggerReveal className="grid grid-cols-3 gap-6">
 *     <Card /><Card /><Card />
 *   </StaggerReveal>
 *
 *   // WRONG: do NOT nest StaggerReveal (or any animated cards) inside
 *   // ScrollReveal. The wrapper fades `opacity` on the whole block while
 *   // StaggerReveal *also* fades `opacity` on each card — two tweens
 *   // fighting over the same property produces a broken "stuck" two-stage
 *   // reveal.
 *   <ScrollReveal>
 *     <h2>הכותרת</h2>
 *     <StaggerReveal className="grid grid-cols-3 gap-6">
 *       <Card /><Card /><Card />
 *     </StaggerReveal>
 *   </ScrollReveal>
 *
 * One element = one reveal owner. Always.
 *
 * Reduced motion: when the user has `prefers-reduced-motion: reduce` set,
 * this renders in its final state immediately — no fade/slide is played.
 *
 * Defaults below (duration 0.55, y 30, ease power2.out, start 'top 85%') are
 * sensible starting points — tune per project.
 */
export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add(
      { reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean }

        if (reduce) {
          gsap.set(el, { opacity: 1, y: 0 })
          return
        }

        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
