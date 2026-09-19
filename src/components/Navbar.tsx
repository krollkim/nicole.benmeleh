'use client'

import { useState } from 'react'

/**
 * Fixed RTL navbar (landing mode: lives in page.tsx, PIC pattern).
 *
 * The brand name is rendered as a <span>, never an <h1> — the page has
 * exactly one <h1>, in the hero section, which a later wave owns.
 *
 * The WhatsApp CTA component doesn't exist yet (a later wave owns it), so
 * for now the CTA is a plain anchor to #contact, styled as a button.
 */
export interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  brand: string
  links: NavLink[]
  ctaLabel: string
}

export default function Navbar({ brand, links, ctaLabel }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-black/5 bg-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-8 flex items-center justify-between">
        {/* Brand — sits at the start (right) in RTL */}
        <span className="font-display font-bold tracking-tight text-ink select-none">
          {brand}
        </span>

        {/* Desktop links (center) */}
        <nav className="hidden md:flex gap-8 flex-1 justify-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — placeholder anchor until the WhatsApp component lands */}
        <a
          href="#contact"
          className="hidden md:inline-flex rounded-pill bg-primary px-5 py-2 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {ctaLabel}
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-ink text-2xl leading-none"
          aria-label="תפריט"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-surface px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-pill bg-primary px-5 py-2 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
          </a>
        </nav>
      )}
    </header>
  )
}
