'use client'

import { useState } from 'react'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'
import { WHATSAPP_PHONE, buildWhatsAppUrl, buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * Fixed RTL navbar (landing mode: lives in page.tsx, PIC pattern).
 *
 * The brand name is rendered as a <span>, never an <h1> — the page has
 * exactly one <h1>, in the hero section.
 *
 * The navbar CTA is the real <WhatsAppLeadButton />, not an anchor to
 * #contact. This page has exactly one conversion, so the CTA in the navbar
 * has to BE that conversion rather than a shortcut to it: a button reading
 * "בואי נדבר בוואטסאפ" that merely scrolls somewhere is a broken promise,
 * and this page's whole thesis is that it doesn't make those.
 *
 * It therefore carries the `accent` colour like every other WhatsApp CTA.
 * That is inside the "accent is reserved for the WhatsApp CTA" rule, not an
 * exception to it — this IS a WhatsApp CTA.
 */
export interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  brand: string
  links: NavLink[]
}

export default function Navbar({ brand, links }: NavbarProps) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ground">
      <div className="relative max-w-voice mx-auto h-16 px-4 md:px-8 flex items-center justify-between">
        {/* Brand — sits at the start (right) in RTL */}
        <span className="font-display font-semibold text-ink select-none">
          {brand}
        </span>

        {/* Desktop links (center) */}
        <nav className="hidden md:flex gap-8 flex-1 justify-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink transition-colors hover:text-lavender">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — the real conversion. Compact: no subtext in the bar.
            The wrapper does the responsive hiding: WhatsAppLeadButton's own
            root carries `inline-flex`, which beats a `hidden` passed through
            className, so hiding has to happen on an element outside it. */}
        {/* A text link, not a fifth filled button. The primary style appears
            exactly once on the page — in the hero — which is the only way it
            keeps meaning anything. */}
        <a
          href={buildWhatsAppUrl(WHATSAPP_PHONE, buildWhatsAppMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-ink underline underline-offset-4 transition-opacity hover:opacity-70 md:block"
        >
          בואי נדבר
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden -me-2 flex h-11 w-11 items-center justify-center text-h3 text-ink"
          aria-label="תפריט"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-ground px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink hover:text-lavender transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {/* Same real CTA in the mobile menu. The wrapper closes the menu on
              tap (the button itself opens WhatsApp in a new tab, so the page
              stays behind it and shouldn't be left with the menu open). */}
          <div onClick={() => setOpen(false)}>
            <WhatsAppLeadButton className="w-full" buttonClassName="w-full justify-center" />
          </div>
        </nav>
      )}
    </header>
  )
}
