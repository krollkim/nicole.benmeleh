/**
 * RTL footer. `tagline` and `disclaimer` are rendered verbatim from
 * brand.json (`footer.tagline` / `footer.disclaimer`) — the disclaimer is a
 * legally required line and must not be reworded. `legalLinks` is
 * intentionally omitted: brand.json's footer.legalLinks is [] by design.
 */
interface FooterProps {
  brand: string
  tagline: string
  disclaimer: string
}

export default function Footer({ brand, tagline, disclaimer }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 py-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold text-ink">{tagline}</p>
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{disclaimer}</p>
        <p className="text-xs text-muted">
          © {year} {brand}. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  )
}
