import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 1 — Hero.
 *
 * This <h1> is the ONLY <h1> on the entire page — every other section (here
 * and in the other six sections built by sibling agents) uses <h2>.
 *
 * Copy is verbatim from docs/nicole-page-copy-v11.md, headline option א׳
 * (the one marked "✅ א׳ — נבחרה"). Options ב׳/ג׳ are not used.
 *
 * Image: A-hero (A-hero-800.webp / A-hero-1200.webp) — this asset only
 * exists at 800/1200 widths (no 1920), so next/image is never asked to
 * source anything wider than 1200.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bg px-4 pt-28 pb-20 sm:px-8 md:pt-40 md:pb-36"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text column — heading, subhead, CTA. No grid here, so a single
            ScrollReveal owner for the whole block is correct. */}
        <ScrollReveal className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <h1 className="max-w-xl text-balance font-display text-3xl font-bold leading-[1.2] text-ink sm:text-4xl md:text-5xl">
            ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
            רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.
          </p>
          <div className="mt-8">
            <WhatsAppLeadButton buttonClassName="text-base md:text-lg px-8 py-4" />
          </div>
        </ScrollReveal>

        {/* Image column — separate top-level reveal, sibling (not nested)
            of the text column's ScrollReveal. */}
        <ScrollReveal className="w-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-lg md:aspect-[3/4]">
            <Image
              src="/images/A-hero-1200.webp"
              alt="חדר הקליניקה של ניקול בן מלך בתל אביב — חלון גדול, עץ בחוץ, וניקול מביטה למצלמה"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
