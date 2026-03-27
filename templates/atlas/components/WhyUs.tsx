'use client'

import { useRef, useState, useEffect } from 'react'

const FEATURES = [
  {
    title:       'Customs Expertise',
    description: 'Licensed customs brokers in 60+ countries. We clear your cargo fast with zero documentation errors.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title:       'Real-Time Visibility',
    description: 'Live status updates at every checkpoint. You always know exactly where your shipment is.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title:       'Dedicated Account Manager',
    description: 'A single point of contact for every shipment. No call centres. No automated responses.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
  },
  {
    title:       'Door-to-Door Coverage',
    description: 'We handle collection, transit, customs, and final delivery — end to end, across 180+ countries.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

export default function AtlasWhyUs() {
  const ref             = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="why-us"
      ref={ref}
      style={{
        background: '#ffffff',
        padding:    'clamp(64px, 10vw, 96px) 24px',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin:   '0 auto',
        display:  'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:      64,
        alignItems: 'center',
      }} id="atlas-whyus-grid">

        {/* ── Left column: headline + CTA ── */}
        <div style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-32px)',
          transition:'opacity 700ms ease, transform 700ms ease',
        }}>
          {/* Orange overline */}
          <div style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      11,
            fontWeight:    800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         '#f97316',
            marginBottom:  16,
          }}>
            Why Choose Us
          </div>

          {/* Large headline */}
          <h2 style={{
            fontFamily:   "'Barlow Condensed', sans-serif",
            fontSize:     'clamp(34px, 4.5vw, 54px)',
            fontWeight:   800,
            lineHeight:   1.05,
            letterSpacing:'-0.01em',
            color:        '#111827',
            marginBottom: 20,
          }}>
            The Freight Partner{' '}
            <span style={{
              color:   '#f97316',
              display: 'block',
            }}>
              You Can Rely On.
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p style={{
            fontFamily:   "'Nunito Sans', sans-serif",
            fontSize:     15,
            fontWeight:   400,
            color:        '#6b7280',
            lineHeight:   1.8,
            marginBottom: 36,
            maxWidth:     420,
          }}>
            We have been moving freight across borders for over two decades.
            Our network, expertise, and technology means your cargo arrives
            on time, every time — with full visibility from day one.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap:     32,
            marginBottom: 36,
          }}>
            {[
              { value: '20+',  label: 'Years Experience' },
              { value: '60+',  label: 'Countries Covered' },
              { value: '99.4%', label: 'On-Time Rate' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      28,
                  fontWeight:    800,
                  color:         '#f97316',
                  letterSpacing: '-0.01em',
                  lineHeight:    1,
                  marginBottom:  4,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily:    "'Nunito Sans', sans-serif",
                  fontSize:      11,
                  fontWeight:    600,
                  color:         '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => {
              document.querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              padding:      '14px 32px',
              background:   '#f97316',
              border:       'none',
              borderRadius: 10,
              color:        '#ffffff',
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     15,
              fontWeight:   800,
              cursor:       'pointer',
              display:      'inline-flex',
              alignItems:   'center',
              gap:          8,
              boxShadow:    '0 4px 20px rgba(249,115,22,0.35)',
              transition:   'background 200ms ease, transform 150ms ease, box-shadow 200ms ease',
              letterSpacing:'0.01em',
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = '#ea580c'
              b.style.transform  = 'translateY(-2px)'
              b.style.boxShadow  = '0 8px 28px rgba(249,115,22,0.45)'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = '#f97316'
              b.style.transform  = 'none'
              b.style.boxShadow  = '0 4px 20px rgba(249,115,22,0.35)'
            }}
          >
            Get a Quote
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* ── Right column: feature cards 2×2 ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 16,
        }}>
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              style={{
                background:   '#f9fafb',
                borderRadius: 12,
                padding:      '22px 20px',
                borderLeft:   '3px solid #f97316',
                opacity:      visible ? 1 : 0,
                transform:    visible ? 'translateY(0)' : 'translateY(24px)',
                transition:   `opacity 600ms ease ${300 + i * 120}ms,
                               transform 600ms ease ${300 + i * 120}ms`,
              }}
            >
              {/* Icon */}
              <div style={{
                width:          40,
                height:         40,
                borderRadius:   10,
                background:     '#f97316',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                marginBottom:   14,
                boxShadow:      '0 3px 10px rgba(249,115,22,0.30)',
                flexShrink:     0,
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily:   "'Barlow Condensed', sans-serif",
                fontSize:     17,
                fontWeight:   700,
                color:        '#111827',
                marginBottom: 8,
                letterSpacing:'0.01em',
                lineHeight:   1.2,
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize:   13,
                fontWeight: 400,
                color:      '#6b7280',
                lineHeight: 1.7,
                margin:     0,
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #atlas-whyus-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
