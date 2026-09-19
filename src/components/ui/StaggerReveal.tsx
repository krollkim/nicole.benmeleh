'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap, REDUCED_MOTION_QUERY } from '@/lib/gsap'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  /** Grid columns — resets the stagger each row (cascade effect). */
  columns?: number
  /** Delay between cards within a row (seconds). Default 0.15. */
  stagger?: number
}

/**
 * Card "wave" reveal — each direct child is animated as one staggered item.
 *
 * USAGE — right vs wrong (double-opacity trap):
 *
 *   // RIGHT: heading revealed by ScrollReveal, grid revealed separately by
 *   // this component. Two owners, two elements — no conflict.
 *   <ScrollReveal><h2>הכותרת</h2></ScrollReveal>
 *   <StaggerReveal columns={3} stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *     <Card /><Card /><Card />
 *   </StaggerReveal>
 *
 *   // WRONG: do NOT wrap this in ScrollReveal (or give a parent element its
 *   // own opacity tween). The parent fade + this component's per-card fade
 *   // both animate `opacity` on overlapping elements, producing a broken
 *   // "stuck" two-stage reveal.
 *   <ScrollReveal>
 *     <StaggerReveal className="grid grid-cols-3 gap-6">
 *       <Card /><Card /><Card />
 *     </StaggerReveal>
 *   </ScrollReveal>
 *
 * One element = one reveal owner. Reveal the heading and the grid as two
 * separate reveals, never one nested inside the other.
 *
 * Mechanism: each card has its OWN GSAP ScrollTrigger (`trigger: card`,
 * `start: 'top 88%'`, `toggleActions: 'play none none none'`), so it stays
 * glued to scroll and feels smooth (IntersectionObserver was tried here
 * previously and felt detached/"stuck" — do not swap engines).
 *
 * Within a row the cards cascade by `(i % columns) * stagger`, so the delay
 * resets each row instead of accumulating a long tail.
 *
 * RTL: cards animate in DOM order. In an RTL grid the first DOM child sits
 * on the right, so the wave flows right→left (natural Hebrew reading
 * direction) with no extra config. Only `y`/`opacity` are animated — no `x`
 * movement, so there is nothing direction-sensitive to get wrong.
 *
 * Reduced motion: when `prefers-reduced-motion: reduce` is set, all cards
 * render in their final state immediately — no stagger/slide is played.
 */
export default function StaggerReveal({
  children,
  className = '',
  columns = 3,
  stagger = 0.15,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = Array.from(el.children) as HTMLElement[]
    if (items.length === 0) return

    const mm = gsap.matchMedia()

    mm.add(
      { reduce: REDUCED_MOTION_QUERY },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean }

        if (reduce) {
          gsap.set(items, { opacity: 1, y: 0 })
          return
        }

        items.forEach((card, i) => {
          // The card may have `transition-all` (for hover). Disable it during
          // the GSAP entrance so the CSS transition doesn't fight GSAP's
          // per-frame updates on opacity/transform (that conflict causes a
          // "two-stage" feel). Restored on complete so hover keeps working.
          card.style.transition = 'none'
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            duration: 0.7,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: (i % columns) * stagger,
            onComplete: () => {
              card.style.transition = ''
            },
          })
        })
      }
    )

    return () => mm.revert()
  }, [columns, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
