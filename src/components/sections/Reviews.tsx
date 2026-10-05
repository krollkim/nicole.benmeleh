'use client'

import { ReactNode } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface ReviewsProps {
  /**
   * Optional: the client's existing reviews component, mounted in place of
   * the placeholder slot below once it's ready to wire in.
   */
  children?: ReactNode
}

export default function Reviews({ children }: ReviewsProps) {
  return (
    <section id="reviews" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-measure-wide text-center">
        <ScrollReveal>
          <h2 className="text-start font-display text-h2 font-medium text-ink">
            מה אומרות נשים שטיפלתי בהן
          </h2>

          <div className="mt-10">
            {children ? (
              children
            ) : (
              /* PLACEHOLDER SLOT — the client mounts his existing reviews component here.
                 Do NOT author testimonial markup: the transcribed testimonials are NOT
                 approved for publication (see docs/nicole-assets-map.md ⚠️). */
              <div
                role="note"
                className="flex min-h-[220px] items-center justify-center border-2 border-dashed border-ink/20 p-6 text-center"
              >
                <span className="text-label text-ink-soft">
                  מקום שמור לקומפוננטת הביקורות
                  <br />
                  ממתין לאישור פרסום מהמטופלות
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
