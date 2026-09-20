'use client'

import { useEffect, useState } from 'react'
import { WhatsAppLeadButton } from '@/components/WhatsAppLeadButton'

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
  // Over the hero the bar is transparent: the hero is a ROOM section that runs
  // edge to edge, and a solid strip across the top of it reads as a separate
  // band instead of part of the room. Same IntersectionObserver pattern the
  // float uses for its keep-out regions.
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    // Scroll position, not IntersectionObserver. The hero's height depends on
    // its image finishing layout, so an observer's first callback can fire
    // against a hero that is still 0px tall and latch the wrong state. Reading
    // the hero's height on each scroll is immune to that ordering.
    const update = () => {
      const hero = document.querySelector('#hero')
      if (!hero) return setOverHero(false)
      setOverHero(window.scrollY < hero.getBoundingClientRect().height - 80)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // one more pass after images settle, so the first paint is not judged on a
    // hero that has not reached its full height yet
    const t = setTimeout(update, 600)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* The solid bar is a separate layer whose OPACITY animates, not a
          background-colour that transitions. Chrome will not interpolate
          between `transparent` and a color-mix() value — the class flips but
          the colour stays stuck at the start — so the fade has to ride on
          opacity, which always interpolates. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-black/5 bg-bg/90 backdrop-blur-md transition-opacity duration-500 ${overHero ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className="relative max-w-7xl mx-auto h-16 px-4 sm:px-8 flex items-center justify-between">
        {/* Brand — sits at the start (right) in RTL */}
        <span className={`font-display font-bold tracking-tight select-none transition-colors duration-500 ${overHero ? 'text-white' : 'text-ink'}`}>
          {brand}
        </span>

        {/* Desktop links (center) */}
        <nav className="hidden md:flex gap-8 flex-1 justify-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`transition-colors duration-500 ${overHero ? 'text-white/90 hover:text-white' : 'text-ink hover:text-primary'}`}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — the real conversion. Compact: no subtext in the bar.
            The wrapper does the responsive hiding: WhatsAppLeadButton's own
            root carries `inline-flex`, which beats a `hidden` passed through
            className, so hiding has to happen on an element outside it. */}
        <div className="hidden md:block">
          <WhatsAppLeadButton
            showSubtext={false}
            buttonClassName="px-5 py-2 text-sm shadow-sm"
          />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`md:hidden -me-2 flex h-11 w-11 items-center justify-center text-2xl leading-none transition-colors duration-500 ${overHero ? 'text-white' : 'text-ink'}`}
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
