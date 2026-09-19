import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import brand from '../../brand.json'

import Hero from '@/components/sections/Hero'
import Symptoms from '@/components/sections/Symptoms'
import Approach from '@/components/sections/Approach'
import Session from '@/components/sections/Session'
import About from '@/components/sections/About'
import Reviews from '@/components/sections/Reviews'
import HowItWorks from '@/components/sections/HowItWorks'
import Faq from '@/components/sections/Faq'
import Closing from '@/components/sections/Closing'

/**
 * The nine sections follow docs/nicole-page-copy-v11.md in its own order.
 * The numbering below is the copy doc's section numbering — keep them in sync.
 *
 * <Reviews /> renders a marked placeholder slot. The client drops his existing
 * reviews component in as a child: <Reviews><HisComponent /></Reviews>.
 * It stays empty until the testimonials are cleared for publication
 * (see docs/nicole-assets-map.md).
 */
export default function Home() {
  return (
    <>
      <Navbar brand={brand.brand.name} links={brand.nav.links} ctaLabel={brand.nav.cta.label} />
      <main>
        <Hero />        {/* 1 — Hero, the page's only <h1> */}
        <Symptoms />    {/* 2 — מה מביא נשים לקליניקה */}
        <Approach />    {/* 3 — לא כל אחת מקבלת את אותו טיפול */}
        <Session />     {/* 4 — בלי הפתעות: ככה נראית שעה אצלי */}
        <About />       {/* 5 — נעים להכיר, אני ניקול בן מלך */}
        <Reviews />     {/* 6 — ביקורות (placeholder slot) */}
        <HowItWorks />  {/* 7 — אין פה כפתור "קבעי תור" */}
        <Faq />         {/* 8 — שאלות שחוזרות */}
        <Closing />     {/* 9 — סגירה + פרטי הקליניקה */}
      </main>
      <Footer brand={brand.brand.name} tagline={brand.footer.tagline} disclaimer={brand.footer.disclaimer} />
    </>
  )
}
