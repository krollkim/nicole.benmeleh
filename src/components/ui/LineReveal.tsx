'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, REDUCED_MOTION_QUERY, ALWAYS_MATCHES } from '@/lib/gsap'

/**
 * Reveals a sentence one VISUAL line at a time. Extends the gsap-scroll-reveal
 * family — same engine, same matchMedia/REDUCED_MOTION_QUERY convention.
 *
 * There is no way to ask the browser for line boxes directly, so the text is
 * split into word spans and the words are grouped by their measured
 * `offsetTop`: words sharing a top are on the same rendered line. This is
 * re-measured on ScrollTrigger refresh, because line breaks move when the
 * viewport resizes or a web font finishes loading.
 *
 * Why words and not characters: splitting Hebrew per character would break
 * text shaping and hand a screen reader a pile of letters. Words keep shaping
 * intact, and the original sentence is preserved verbatim as the element's
 * aria-label so assistive tech reads one clean sentence, not fragments.
 *
 * Copy safety: this component NEVER edits the text. It splits on spaces and
 * rejoins with the same spacing — what it renders is character-for-character
 * the string it was given.
 */
interface LineRevealProps {
  /** The sentence. Rendered verbatim; split only for measurement. */
  text: string
  /** Delay between lines, in seconds. */
  stagger?: number
  className?: string
}

export default function LineReveal({
  text,
  stagger = 0.08,
  className = '',
}: LineRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))
    if (words.length === 0) return

    const mm = gsap.matchMedia()

    mm.add({ reduce: REDUCED_MOTION_QUERY, base: ALWAYS_MATCHES }, (context) => {
      const { reduce } = context.conditions as { reduce: boolean }

      if (reduce) {
        gsap.set(words, { opacity: 1, y: 0 })
        return
      }

      let timeline: gsap.core.Timeline | null = null

      const build = () => {
        timeline?.scrollTrigger?.kill()
        timeline?.kill()

        // Group words into rendered lines by measured top offset.
        const lines = new Map<number, HTMLElement[]>()
        for (const word of words) {
          const top = Math.round(word.offsetTop)
          if (!lines.has(top)) lines.set(top, [])
          lines.get(top)!.push(word)
        }
        const ordered = [...lines.entries()]
          .sort((a, b) => a[0] - b[0])
          .map(([, group]) => group)

        gsap.set(words, { opacity: 0, y: 14 })

        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
        ordered.forEach((group, i) => {
          timeline!.to(
            group,
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            i * stagger
          )
        })
      }

      build()
      ScrollTrigger.addEventListener('refreshInit', build)

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', build)
        timeline?.scrollTrigger?.kill()
        timeline?.kill()
      }
    })

    return () => mm.revert()
  }, [text, stagger])

  const words = text.split(' ')

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word className="inline-block" aria-hidden="true">
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
