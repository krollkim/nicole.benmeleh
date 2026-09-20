'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { gsap, ScrollTrigger, REDUCED_MOTION_QUERY } from '@/lib/gsap'
import StaggerReveal from '@/components/ui/StaggerReveal'

/**
 * Pinned media column + a scrolling column of steps.
 *
 * This extends the gsap-scroll-reveal family (ScrollReveal / StaggerReveal /
 * AnimatedCounter) rather than working around it: same engine (ScrollTrigger),
 * same `gsap.matchMedia()` + REDUCED_MOTION_QUERY convention, same rule that
 * each element has exactly ONE reveal owner.
 *
 * Ownership note — the double-opacity trap: this component owns ONLY the
 * media column (pin + crossfade). It never touches the step nodes' opacity,
 * so the caller is free to keep wrapping the steps column in StaggerReveal.
 * Two owners, two different elements, no conflict.
 *
 * Engine note: the pin and the active-step detection are ScrollTrigger, not
 * IntersectionObserver — anything that must stay glued to scrolling uses
 * ScrollTrigger (IntersectionObserver is correct only for the count-up).
 *
 * Fallbacks — the pin is an enhancement, never a requirement:
 *   • below `md` the pin does not run at all. A pinned column inside a 360px
 *     viewport feels trapped, so mobile keeps the plain vertical timeline
 *     with each step's media inline.
 *   • `prefers-reduced-motion: reduce` cancels it outright (not softened):
 *     no pin, no crossfade, inline media, everything at rest.
 * Both fallbacks are CSS-driven (`md:` / `motion-reduce:`) so nothing depends
 * on JS measuring the viewport after hydration — no layout shift.
 */
export interface PinnedSequenceStep {
  /** Stable key. */
  key: string
  /** The step's text content, rendered in the scrolling column. */
  content: ReactNode
  /**
   * Media for this step. `null` keeps the previous step's media on screen —
   * used for steps that have no photo of their own, so the sequence changes
   * only when the content actually changes.
   */
  media?: ReactNode | null
}

interface PinnedSequenceProps {
  steps: PinnedSequenceStep[]
  /** Extra classes on the media frame (aspect ratio lives here). */
  mediaClassName?: string
  /** Passed to the internal StaggerReveal that owns the step nodes. */
  stagger?: number
  className?: string
}

/** Offset from the top of the viewport when pinned — clears the fixed navbar. */
const PIN_TOP_OFFSET = 96

export default function PinnedSequence({
  steps,
  mediaClassName = '',
  stagger = 0.15,
  className = '',
}: PinnedSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mediaColRef = useRef<HTMLDivElement>(null)
  const stepsColRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Resolve "null media = keep previous" once, so the pinned column always has
  // something to show for every step.
  const resolvedMedia: ReactNode[] = []
  let carried: ReactNode = null
  for (const step of steps) {
    if (step.media) carried = step.media
    resolvedMedia.push(carried)
  }

  useEffect(() => {
    const root = rootRef.current
    const mediaCol = mediaColRef.current
    const stepsCol = stepsColRef.current
    if (!root || !mediaCol || !stepsCol) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        reduce: REDUCED_MOTION_QUERY,
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions as {
          isDesktop: boolean
          reduce: boolean
        }

        // Reduced motion, or a phone: no pin, no scroll-driven state.
        if (reduce || !isDesktop) {
          setActive(0)
          return
        }

        const pin = ScrollTrigger.create({
          trigger: root,
          start: `top top+=${PIN_TOP_OFFSET}`,
          end: () => `+=${stepsCol.offsetHeight - mediaCol.offsetHeight}`,
          pin: mediaCol,
          pinSpacing: false,
          invalidateOnRefresh: true,
        })

        // One trigger per step drives which media is showing. Scroll-glued,
        // and it reverses correctly on the way back up.
        const stepEls = Array.from(
          stepsCol.querySelectorAll<HTMLElement>('[data-sequence-step]')
        )
        const stepTriggers = stepEls.map((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          })
        )

        return () => {
          pin.kill()
          stepTriggers.forEach((t) => t.kill())
        }
      }
    )

    return () => mm.revert()
  }, [steps.length])

  return (
    <div
      ref={rootRef}
      className={`md:grid md:grid-cols-2 md:items-start md:gap-12 ${className}`}
    >
      {/* Pinned media column — desktop only, and off under reduced motion. */}
      <div
        ref={mediaColRef}
        aria-hidden="true"
        className="hidden md:block motion-reduce:md:hidden"
      >
        <div className={`relative overflow-hidden rounded-card shadow-md ${mediaClassName}`}>
          {resolvedMedia.map((node, i) => (
            <div
              key={steps[i].key}
              className="absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {node}
            </div>
          ))}
        </div>
      </div>

      {/* Steps column. StaggerReveal lives INSIDE this component and wraps the
          step nodes directly, because it animates its own direct children
          (`Array.from(el.children)`) — putting a PinnedSequence inside a
          StaggerReveal instead would hand it a single wrapper div, killing the
          cascade AND making it a second opacity owner of the media column. */}
      <div ref={stepsColRef}>
        {/* On desktop each step gets a tall slot rather than a gap: the pin
            lasts (stepsColumnHeight − mediaHeight), so short steps make the
            pin flicker past in a couple of hundred pixels. A slot per step
            gives each one real scroll distance beside the pinned media, and
            centring the text in its slot keeps it level with that media.
            Mobile keeps a plain gap — no slots, no pin. */}
        <StaggerReveal
          columns={1}
          stagger={stagger}
          className="flex flex-col gap-10 md:gap-0"
        >
          {steps.map((step) => (
            <div
              key={step.key}
              data-sequence-step
              className="md:flex md:min-h-[55vh] md:flex-col md:justify-center"
            >
              {step.content}
              {/* Inline media: the mobile / reduced-motion home for the photos.
                  Hidden on desktop, where the pinned column shows them — except
                  under reduced motion, where the pin never runs. */}
              {step.media && (
                <div className="mt-4 md:hidden motion-reduce:md:block">{step.media}</div>
              )}
            </div>
          ))}
        </StaggerReveal>
      </div>
    </div>
  )
}
