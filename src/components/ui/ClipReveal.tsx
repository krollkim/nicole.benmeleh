'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap, REDUCED_MOTION_QUERY, ALWAYS_MATCHES } from '@/lib/gsap'

/**
 * The page's single image-reveal language: a clip-path inset that opens from
 * the centre outward. Extends the gsap-scroll-reveal family — same engine,
 * same matchMedia/REDUCED_MOTION_QUERY convention.
 *
 * clip-path instead of opacity, on purpose. A fading photo reads as the photo
 * itself being uncertain; an opening frame reads as the frame revealing a
 * photo that was always there. It also keeps images off the opacity property
 * entirely, which is what the surrounding ScrollReveal/StaggerReveal own — so
 * an image can sit inside either without two owners fighting over one value.
 *
 * Every image on the page gets this same reveal so it reads as one language,
 * with ONE deliberate exception: the hero image. The hero is the LCP element;
 * putting it behind a scroll-triggered reveal delays the largest paint and
 * risks the ≤2.5s budget. A performance standard outranks visual consistency,
 * so the hero image renders immediately and un-animated. That is a knowing
 * inconsistency, not an oversight.
 */
interface ClipRevealProps {
  children: ReactNode
  /** Seconds. Keep within the page's 0.6–1.2 band. */
  duration?: number
  className?: string
}

export default function ClipReveal({
  children,
  duration = 1.2,
  className = '',
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add({ reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES }, (context) => {
      const { reduce } = context.conditions as { reduce: boolean }

      // Full cancellation: the frame is simply open, no wipe is played.
      if (reduce) {
        gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
        return
      }

      gsap.fromTo(
        el,
        { clipPath: 'inset(50% 0% 50% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })

    return () => mm.revert()
  }, [duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
