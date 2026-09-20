import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 1 — Hero. A ROOM section under the binary law.
 *
 * The photograph is the section: full-bleed, edge to edge, no frame, no
 * rounded corner, no shadow. The heading lives INSIDE the image rather than
 * in a box beside it — the visitor is meant to be standing in the room, not
 * reading about it.
 *
 * This <h1> is the ONLY <h1> on the entire page; every other section uses
 * <h2>. Copy is verbatim from docs/nicole-page-copy-v11.md, headline option
 * א׳ (marked "✅ א׳ — נבחרה"). Options ב׳/ג׳ are not used.
 *
 * LCP: the image is `priority`, never lazy, and — deliberately — NOT wrapped
 * in any reveal. It is the largest paint on the page, and putting it behind a
 * scroll animation delays that paint. Only the text reveals.
 *
 * Contrast: white text over a photograph needs a scrim, and the check has to
 * be made against the BRIGHTEST part of the image (here the window). The
 * gradient below runs from the reading edge (right in RTL) and is measured,
 * not eyeballed.
 *
 * Asset note: A-hero exists only at 800/1200 (no 1920), so next/image is
 * never asked to source anything wider than 1200.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[88vh] w-full overflow-hidden">
      <Image
        src="/images/A-hero-1200.webp"
        alt="חדר הקליניקה של ניקול בן מלך בתל אביב — חלון גדול, עץ בחוץ, וניקול מביטה למצלמה"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Scrim. Strongest at the reading edge where the text sits, fading out
          across the frame so the room stays visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_left,rgba(32,27,27,0.88)_0%,rgba(32,27,27,0.76)_52%,rgba(32,27,27,0.30)_74%,rgba(32,27,27,0.10)_100%)]"
      />

      <div className="relative flex min-h-[88vh] items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-8 md:pb-28">
          <ScrollReveal className="flex max-w-2xl flex-col items-start text-start">
            <h1 className="text-balance font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/90 md:text-xl">
              רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.
            </p>
            <div className="mt-9">
              <WhatsAppLeadButton tone="onImage" buttonClassName="text-base md:text-lg px-8 py-4" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
