import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ScrubZoom from '@/components/ui/ScrubZoom'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

/**
 * סקשן 1 — Hero. A ROOM section: full viewport HEIGHT, not full width.
 *
 * Split layout — the photograph is a vertical column filling the viewport
 * height on one side, the heading and CTA on the other. On mobile the photo
 * fills the screen and the text sits beneath it. No frame, no rounded corner,
 * no shadow.
 *
 * WHY NOT FULL-WIDTH (direction v3): ten of the twelve photographs are 3:4
 * portrait and they are composed vertically — window at the top, treatment bed
 * at the bottom. Cropping one into a horizontal band deletes the bed and
 * leaves a window with a tree. That is exactly what killed the H-band image.
 * Rule: never crop a portrait photograph into a horizontal band.
 *
 * THE PHOTOGRAPH HERE IS TEMPORARY — DO NOT TREAT IT AS CHOSEN.
 * Every existing photograph shows a treatment in progress, and in this layout
 * the largest thing in frame is a patient's body. A woman arriving because of
 * her own pain would meet someone else being treated first, which seats her as
 * a spectator instead of putting her in the room. The hero needs either the
 * empty room or ניקול alone, and neither has been shot yet.
 *
 * I-room stands in because it was shot LANDSCAPE and shows the space with no
 * exposed limbs dominating the frame. The trade-off, stated honestly: a
 * landscape photo in a vertical column gets cropped at the sides — the inverse
 * of the H-band problem — which is another reason this is a placeholder and
 * not a decision. Replace it the moment the real photograph exists.
 *
 * This <h1> is the ONLY <h1> on the page. Copy is verbatim from
 * docs/nicole-page-copy-v11.md, headline option א׳.
 *
 * LCP: the photo is `priority`, never lazy, and not wrapped in any reveal.
 * ScrubZoom starts at rest, so the first frame is the finished frame.
 */
export default function Hero() {
  return (
    <section id="hero" className="overflow-hidden bg-surface">
      <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
        {/* The room. Vertical column, full viewport height on desktop. */}
        <div className="relative h-[80vh] w-full overflow-hidden md:h-screen">
          <ScrubZoom className="absolute inset-0" to={1.06} drift={30}>
            <Image
              src="/images/I-room-1920.webp"
              alt="חדר הטיפולים של ניקול בן מלך ברחוב אחד העם בתל אביב — חלון גדול, עץ בחוץ ואור יום"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </ScrubZoom>
        </div>

        {/* The voice. */}
        <div className="flex flex-col justify-center px-4 py-16 sm:px-8 md:py-24">
          <ScrollReveal className="flex flex-col items-start text-start">
            <h1 className="text-balance font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
              ווסת שמכאיבה. עיכול שלא מסתדר. כאב שחוזר ולא עובר.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-[1.6] text-muted">
              רפואה סינית לנשים, בקליניקה בתל אביב. מתחילות באבחון, ומשם מטפלות בשורש.
            </p>
            <div className="mt-9">
              <WhatsAppLeadButton buttonClassName="text-base md:text-lg px-8 py-4" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
