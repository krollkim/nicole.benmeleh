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
    <section id="reviews" className="bg-bg px-4 py-20 sm:px-6 md:py-36">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-start font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
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
                className="flex min-h-[220px] items-center justify-center rounded-card border-2 border-dashed border-primary-300 bg-surface p-6 text-center"
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
