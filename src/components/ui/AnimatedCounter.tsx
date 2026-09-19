'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface AnimatedCounterProps {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

/**
 * Number count-up on first scroll-into-view.
 *
 * USAGE:
 *   <AnimatedCounter to={1200} suffix="+" />
 *
 * This is a standalone element (a <span>), not a wrapper around other
 * animated content, so the double-opacity trap that applies to ScrollReveal /
 * StaggerReveal does not apply here — it never nests inside them.
 *
 * This is the ONE place this kit deliberately uses IntersectionObserver
 * instead of ScrollTrigger: it's a fire-once, self-contained reveal (not a
 * scroll-glued animation), threshold 0.5 reads cleanly, and it never needs to
 * stay synced to scroll position. For scroll-driven section/card reveals use
 * ScrollReveal / StaggerReveal (ScrollTrigger) instead.
 *
 * Reduced motion: when `prefers-reduced-motion: reduce` is set, the final
 * number is rendered immediately with no count-up animation.
 */
export default function AnimatedCounter({
  to,
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = counterRef.current
    if (!element || hasAnimated) return

    if (prefersReducedMotion()) {
      element.textContent = to + suffix
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const obj = { value: 0 }
          gsap.to(obj, {
            value: to,
            duration,
            snap: { value: 1 },
            onUpdate() {
              if (element) {
                element.textContent = Math.floor(obj.value) + suffix
              }
            },
          })
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [to, suffix, duration, hasAnimated])

  return (
    <span ref={counterRef} className={className}>
      0{suffix}
    </span>
  )
}
