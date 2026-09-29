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
    <section id="reviews" className="px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto w-full max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-start font-display text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.75rem]">
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
                className="flex min-h-[220px] items-center justify-center border-2 border-dashed border-primary-300/70 p-6 text-center"
              >
                <span className="text-sm text-muted">
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
