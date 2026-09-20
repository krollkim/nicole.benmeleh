'use client'

import { gsap as gsapLib } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsapLib.registerPlugin(ScrollTrigger)
}

export const gsap = gsapLib
export { ScrollTrigger }

/**
 * True when the user has requested reduced motion (OS/browser setting).
 * Components in src/components/ui/* use gsap.matchMedia() with this same
 * query so entrance animations are skipped in favour of the final resting
 * state — no fade/slide, content is just present.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Always-true media query, to be paired with REDUCED_MOTION_QUERY.
 *
 * WHY THIS EXISTS — this bug silently disabled every reveal on the page:
 * `gsap.matchMedia().add(conditions, cb)` only invokes `cb` when AT LEAST ONE
 * condition MATCHES. A context registered with just
 * `{ reduce: '(prefers-reduced-motion: reduce)' }` therefore never runs on a
 * normal browser — the query is false, no condition matches, the callback is
 * never called, and the animation it guards never happens. Nothing throws and
 * nothing logs; the page simply renders static and looks "fine".
 *
 * Pair it with this so the callback always runs and `context.conditions.reduce`
 * can be branched on:
 *
 *   mm.add({ reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES }, (ctx) => {
 *     if (ctx.conditions.reduce) { ...final state...; return }
 *     ...animate...
 *   })
 *
 * A context that already carries a condition which matches (e.g. an
 * `isDesktop` breakpoint) does not need it — that is why PinnedSequence's pin
 * worked while every plain reveal silently did not.
 */
export const ALWAYS_MATCHES = '(min-width: 0px)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches

export const fadeUp = (
  target: string | HTMLElement | Element,
  vars?: gsap.TweenVars
) =>
  gsap.fromTo(
    target,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ...vars }
  )

export const staggerFadeUp = (
  targets: string | HTMLElement[] | Element[],
  stagger = 0.1,
  vars?: gsap.TweenVars
) =>
  gsap.fromTo(
    targets,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger, ...vars }
  )

export const parallax = (target: string | HTMLElement | Element, speed = 0.5) =>
  ScrollTrigger.create({
    trigger: target,
    onUpdate: (self) => {
      gsap.to(target, { y: self.getVelocity() * speed, overwrite: 'auto' })
    },
  })
