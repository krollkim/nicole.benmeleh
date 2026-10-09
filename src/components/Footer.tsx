import WaveMark from '@/components/ui/WaveMark'
import { WHATSAPP_PHONE, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * RTL footer. `tagline` and `disclaimer` are rendered verbatim from
 * brand.json (`footer.tagline` / `footer.disclaimer`) — the disclaimer is a
 * legally required line and must not be reworded. `legalLinks` is
 * intentionally omitted: brand.json's footer.legalLinks is [] by design.
 *
 * WHY THIS IS DARK, and why that is a layout decision rather than a colour one:
 * the whole page sits on one cream ground, which is what makes it read as calm
 * — and also why it has no strong moment anywhere. A page with a single value
 * from top to bottom has no floor. This band is the floor. It is the only dark
 * surface on the site, and it does two jobs at once: it ends the page, and it
 * gives the eye somewhere to land.
 *
 * It replaces a footer that was three grey lines leaking down the right-hand
 * side with no edge, no structure, and no separation from the section above.
 *
 * Contrast: cream on #201B1B is far past 4.5:1, so the disclaimer is finally
 * readable instead of being the faintest thing on the page.
 */
interface FooterProps {
  brand: string
  tagline: string
  disclaimer: string
}

export default function Footer({ brand, tagline, disclaimer }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-ink px-4 py-20 text-ground md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-voice">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
          {/* who */}
          <div>
            {/* הגל גדול יותר כאן מאשר בנאבבר — בפוטר יש לו מקום, ושם
                הוא קורא כחתימה ולא כאייקון ניווט. */}
            <div className="flex items-center gap-3">
              <WaveMark className="h-7 w-10 flex-none" />
              <p className="font-display text-h3 font-medium text-ground">{brand}</p>
            </div>
            <p className="mt-3 text-micro text-ground/70">{tagline}</p>
          </div>

          {/* where, and how to reach her */}
          <div className="flex flex-col gap-3 text-micro">
            <p className="text-ground/70">
              קליניקת &quot;בית מרפה&quot;
              <br />
              אחד העם 89, תל אביב
            </p>
            <a
              href={buildWhatsAppUrl(WHATSAPP_PHONE, buildWhatsAppMessage('footer'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-ground underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground/50"
            >
              וואטסאפ
            </a>
            {/* dir=ltr so the @ lands on the correct side of the handle */}
            <a
              href="https://www.instagram.com/nicole.benmeleh/"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="w-fit text-ground underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ground/50"
            >
              @nicole.benmeleh
            </a>
          </div>

          {/* the line the law requires, at a size a person can actually read */}
          <div>
            <p className="max-w-measure text-micro text-ground/70">{disclaimer}</p>
          </div>
        </div>

        {/* /45 נמדד 4.02:1 על הדיו ונפל. /50 נותן 4.67 בקושי, /55 נותן 5.38. */}
        <p className="mt-16 text-label text-ground/55">
          © {year} {brand}. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  )
}
