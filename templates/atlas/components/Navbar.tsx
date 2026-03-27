'use client'

import { useState, useEffect } from 'react'
import type { CompanyBranding } from '@/types'

interface Props {
  company: CompanyBranding
}

const NAV_LINKS = [
  { label: 'Services', href: '#services'  },
  { label: 'Gallery',  href: '#gallery'   },
  { label: 'Track',    href: '#track'     },
  { label: 'Contact',  href: '#contact'   },
]

export default function AtlasNavbar({ company }: Props) {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Main navbar ── */}
      <nav style={{
        position:   'fixed',
        top:        0, left: 0, right: 0,
        zIndex:     1000,
        height:     72,
        display:    'flex',
        alignItems: 'center',
        padding:    '0 24px',
        background: scrolled ? '#ffffff' : 'transparent',
        boxShadow:  scrolled
          ? '0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'
          : 'none',
        transition: 'background 300ms ease, box-shadow 300ms ease',
      }}>

        {/* ── Logo ── */}
        <a
          href="/"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            10,
            textDecoration: 'none',
            flexShrink:     0,
          }}
        >
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <div style={{
              width:          40,
              height:         40,
              background:     '#f97316',
              borderRadius:   10,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize:   20,
                fontWeight: 700,
                color:      '#ffffff',
                lineHeight: 1,
              }}>
                {company.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      22,
            fontWeight:    700,
            letterSpacing: '0.01em',
            color:         scrolled ? '#0a0a0a' : '#ffffff',
            transition:    'color 300ms ease',
            lineHeight:    1,
          }}>
            {company.name}
          </span>
        </a>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* ── Desktop nav links ── */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        32,
          marginRight: 32,
        }} className="atlas-nav-desktop">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                fontFamily:  "'Nunito Sans', sans-serif",
                fontSize:    14,
                fontWeight:  600,
                color:       scrolled ? '#374151' : 'rgba(255,255,255,0.88)',
                transition:  'color 200ms ease',
                padding:     0,
                whiteSpace:  'nowrap',
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLButtonElement).style.color = '#f97316'
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLButtonElement).style.color =
                  scrolled ? '#374151' : 'rgba(255,255,255,0.88)'
              }
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Desktop CTA ── */}
        <button
          onClick={() => scrollTo('#track')}
          className="atlas-nav-desktop"
          style={{
            padding:      '10px 22px',
            background:   '#f97316',
            border:       'none',
            borderRadius: 8,
            color:        '#ffffff',
            fontFamily:   "'Nunito Sans', sans-serif",
            fontSize:     14,
            fontWeight:   700,
            cursor:       'pointer',
            whiteSpace:   'nowrap',
            transition:   'background 200ms ease, transform 150ms ease',
            boxShadow:    '0 2px 8px rgba(249,115,22,0.35)',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.background = '#ea580c'
            b.style.transform  = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.background = '#f97316'
            b.style.transform  = 'none'
          }}
        >
          Track Shipment →
        </button>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="atlas-nav-mobile"
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    8,
            display:    'flex',
            flexDirection: 'column',
            gap:        5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:         'block',
              width:           24,
              height:          2,
              background:      scrolled || menuOpen ? '#0a0a0a' : '#ffffff',
              borderRadius:    2,
              transition:      'all 280ms cubic-bezier(0.4,0,0.2,1)',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                : i === 1 ? 'scaleX(0) opacity(0)'
                : 'translateY(-7px) rotate(-45deg)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        style={{
          position:   'fixed',
          top:        72,
          left:       0,
          right:      0,
          zIndex:     999,
          background: '#ffffff',
          borderBottom: menuOpen ? '1px solid #e5e7eb' : 'none',
          boxShadow:  menuOpen ? '0 8px 32px rgba(0,0,0,0.12)' : 'none',
          maxHeight:  menuOpen ? '100vh' : 0,
          overflow:   'hidden',
          transition: 'max-height 360ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ padding: '8px 24px 24px' }}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'space-between',
                width:       '100%',
                background:  'none',
                border:      'none',
                borderBottom: i < NAV_LINKS.length - 1
                  ? '1px solid #f3f4f6'
                  : 'none',
                padding:     '16px 0',
                fontFamily:  "'Nunito Sans', sans-serif",
                fontSize:    16,
                fontWeight:  600,
                color:       '#111827',
                cursor:      'pointer',
                textAlign:   'left',
                transition:  'color 150ms',
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLButtonElement).style.color = '#f97316'
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLButtonElement).style.color = '#111827'
              }
            >
              {link.label}
              <span style={{ color: '#f97316', fontSize: 18 }}>→</span>
            </button>
          ))}

          {/* Mobile CTA */}
          <button
            onClick={() => scrollTo('#track')}
            style={{
              marginTop:    16,
              width:        '100%',
              padding:      '15px 0',
              background:   '#f97316',
              border:       'none',
              borderRadius: 10,
              color:        '#ffffff',
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     16,
              fontWeight:   700,
              cursor:       'pointer',
              boxShadow:    '0 4px 16px rgba(249,115,22,0.3)',
            }}
          >
            Track Shipment →
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 769px) {
          .atlas-nav-mobile  { display: none !important; }
          .atlas-nav-desktop { display: flex !important; }
        }
        @media (max-width: 768px) {
          .atlas-nav-desktop { display: none !important; }
          .atlas-nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
