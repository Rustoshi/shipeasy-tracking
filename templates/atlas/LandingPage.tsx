'use client'

import { useEffect }        from 'react'
import type { CompanyBranding } from '@/types'

import AtlasNavbar         from './components/Navbar'
import AtlasHero           from './components/Hero'
import AtlasStatsBar       from './components/StatsBar'
import AtlasServices       from './components/Services'
import AtlasHowItWorks     from './components/HowItWorks'
import AtlasWhyUs          from './components/WhyUs'
import AtlasTestimonials   from './components/Testimonials'
import AtlasGallery        from './components/Gallery'
import AtlasTrackSection   from './components/TrackSection'
import AtlasContactSection from './components/ContactSection'
import AtlasFooter         from './components/Footer'

interface Props {
  company: CompanyBranding
}

export default function AtlasLandingPage({ company }: Props) {

  // ── Load Google Fonts ──────────────────────────────────────────────────
  useEffect(() => {
    const id = 'atlas-fonts'
    if (document.getElementById(id)) return
    const link  = document.createElement('link')
    link.id     = id
    link.rel    = 'stylesheet'
    link.href   = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=JetBrains+Mono:wght@400;600&display=swap'
    document.head.appendChild(link)
  }, [])

  // ── Load GTranslate widget ─────────────────────────────────────────────
  useEffect(() => {
    const id = 'gtranslate-script'
    if (document.getElementById(id)) return

    // GTranslate config — must be set before the script loads
    ;(window as Window & {
      gtranslateSettings?: Record<string, unknown>
    }).gtranslateSettings = {
      default_language:       'en',
      native_language_names:  true,
      detect_browser_language:false,
      languages:              ['en', 'fr', 'ar', 'es', 'zh-CN', 'pt'],
      wrapper_selector:       '.gtranslate_wrapper',
      switcher_horizontal_position: 'left',
      switcher_vertical_position:   'bottom',
      float_switcher_open_direction:'top',
    }

    const script    = document.createElement('script')
    script.id       = id
    script.src      = 'https://cdn.gtranslate.net/widgets/latest/float.js'
    script.defer    = true
    document.body.appendChild(script)

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  // ── Load Smartsupp live chat ───────────────────────────────────────────
  useEffect(() => {
    if (
      company.support?.type !== 'smartsupp' ||
      !company.support?.smartsuppKey
    ) return

    const id = 'smartsupp-script'
    if (document.getElementById(id)) return

    const key = company.support.smartsuppKey

    // Smartsupp inline init
    const inline = document.createElement('script')
    inline.id    = `${id}-init` 
    inline.text  = `
      window._smartsupp = window._smartsupp || {};
      _smartsupp.key = '${key}';
      window.smartsupp || (function(d) {
        var s,c,o = window.smartsupp = function(){ o._.push(arguments)};
        o._ = [];
        s = d.getElementsByTagName('script')[0];
        c = d.createElement('script');
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.async = true;
        c.src = 'https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c, s);
      })(document);
    `
    document.head.appendChild(inline)

    return () => {
      const init = document.getElementById(`${id}-init`)
      if (init) init.remove()
      // Remove Smartsupp iframe if it was injected
      const frame = document.getElementById('smartsupp-widget-container')
      if (frame) frame.remove()
    }
  }, [company.support?.smartsuppKey, company.support?.type])

  return (
    <div style={{
      background:  '#ffffff',
      overflowX:   'hidden',
      minHeight:   '100vh',
    }}>
      {/* GTranslate widget container - fixed position */}
      <div 
        className="gtranslate_wrapper"
        style={{
          position: 'fixed',
          bottom:   20,
          left:     16,
          zIndex:   9000,
        }}
      />

        {/* Navigation */}
        <AtlasNavbar company={company} />

        {/* Hero — full viewport carousel */}
        <AtlasHero company={company} />

        {/* Stats bar — dark strip with counters */}
        <AtlasStatsBar />

        {/* Services — 6 service cards */}
        <AtlasServices />

        {/* How it works — 4 steps with animated connector */}
        <AtlasHowItWorks />

        {/* Why choose us — headline + 4 feature cards */}
        <AtlasWhyUs />

        {/* Testimonials — 3 client quotes */}
        <AtlasTestimonials />

        {/* Gallery — 6 image masonry grid */}
        <AtlasGallery />

        {/* Track section — orange background with form */}
        <AtlasTrackSection company={company} />

        {/* Contact section — details + form */}
        <AtlasContactSection company={company} />

        {/* Footer */}
        <AtlasFooter company={company} />

    </div>
  )
}
