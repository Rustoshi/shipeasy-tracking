'use client'

import { useRef, useState, useEffect } from 'react'

const TESTIMONIALS = [
  {
    quote:   "We've shipped over 400 containers through this platform in the past two years. The customs clearance speed alone has saved us weeks of delays. Genuinely the most reliable freight partner we've worked with.",
    name:    'James Richardson',
    role:    'Supply Chain Director',
    company: 'Sterling Imports Ltd',
    country: 'United Kingdom',
    initials:'JR',
    stars:   5,
  },
  {
    quote:   "Real-time tracking was a game changer for our business. Our clients trust us more because we can give accurate updates at every stage. The documentation has never been wrong — not once.",
    name:    'Sarah Mitchell',
    role:    'Head of Procurement',
    company: 'Pacific Trade Solutions',
    country: 'Australia',
    initials:'SM',
    stars:   5,
  },
  {
    quote:   "I was sceptical at first but the dedicated account manager made all the difference. One call, one person, every time. Our shipments clear customs faster than any other forwarder we've tried.",
    name:    'Michael Thompson',
    role:    'Operations Manager',
    company: 'Atlantic Freight Co',
    country: 'Canada',
    initials:'MT',
    stars:   5,
  },
]

interface CardProps {
  testimonial: typeof TESTIMONIALS[0]
  delay:       number
  visible:     boolean
}

function TestimonialCard({ testimonial, delay, visible }: CardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    '#1f2937',
        borderRadius:  16,
        padding:       '32px 28px',
        border:        `1px solid ${hovered ? '#f97316' : 'rgba(255,255,255,0.06)'}`,
        transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:     hovered
          ? '0 16px 48px rgba(0,0,0,0.4)'
          : '0 4px 16px rgba(0,0,0,0.2)',
        transition:    'border-color 250ms ease, transform 280ms ease, box-shadow 280ms ease',
        display:       'flex',
        flexDirection: 'column',
        gap:           0,
        height:        '100%',
        boxSizing:     'border-box',
        minWidth:      0,
        overflow:      'hidden',
        // Entrance
        opacity:       visible ? 1 : 0,
        marginTop:     visible ? 0 : 24,
        transitionProperty: 'border-color, transform, box-shadow, opacity, margin-top',
        transitionDuration: `250ms, 280ms, 280ms, 600ms, 600ms`,
        transitionTimingFunction: 'ease, ease, ease, ease, ease',
        transitionDelay: `0ms, 0ms, 0ms, ${delay}ms, ${delay}ms`,
      }}
    >
      {/* Large decorative quote mark */}
      <div style={{
        fontFamily:  'Georgia, serif',
        fontSize:    72,
        lineHeight:  0.8,
        color:       '#f97316',
        opacity:     0.7,
        marginBottom: 16,
        userSelect:  'none',
        flexShrink:  0,
      }}>
        ❝
      </div>

      {/* Stars */}
      <div style={{
        display:      'flex',
        gap:          3,
        marginBottom: 16,
        flexShrink:   0,
      }}>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24"
            fill="#f97316" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p style={{
        fontFamily:  "'Nunito Sans', sans-serif",
        fontSize:    14,
        fontWeight:  400,
        color:       'rgba(255,255,255,0.82)',
        lineHeight:  1.8,
        marginBottom: 28,
        flex:        1,
        fontStyle:   'italic',
      }}>
        "{testimonial.quote}"
      </p>

      {/* Divider */}
      <div style={{
        height:       1,
        background:   'rgba(255,255,255,0.08)',
        marginBottom: 20,
        flexShrink:   0,
      }} />

      {/* Author block */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        14,
        flexShrink: 0,
      }}>
        {/* Initials avatar */}
        <div style={{
          width:          44,
          height:         44,
          borderRadius:   '50%',
          background:     hovered
            ? 'linear-gradient(135deg, #f97316, #ea580c)'
            : 'linear-gradient(135deg, #374151, #4b5563)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexShrink:     0,
          transition:     'background 250ms ease',
          boxShadow:      hovered
            ? '0 0 0 2px #f97316'
            : '0 0 0 2px rgba(255,255,255,0.08)',
        }}>
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      15,
            fontWeight:    700,
            color:         '#ffffff',
            letterSpacing: '0.05em',
          }}>
            {testimonial.initials}
          </span>
        </div>

        {/* Name and company */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily:   "'Barlow Condensed', sans-serif",
            fontSize:     16,
            fontWeight:   700,
            color:        '#ffffff',
            marginBottom: 2,
            letterSpacing:'0.01em',
          }}>
            {testimonial.name}
          </div>
          <div style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   12,
            color:      '#6b7280',
            lineHeight: 1.4,
            overflow:   'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {testimonial.role} · {testimonial.company}, {testimonial.country}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AtlasTestimonials() {
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
      id="testimonials"
      ref={ref}
      style={{
        background: '#111827',
        padding:    'clamp(64px, 10vw, 96px) 24px',
        overflow:   'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', overflow: 'hidden' }}>

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      11,
            fontWeight:    800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         '#f97316',
            marginBottom:  12,
            opacity:       visible ? 1 : 0,
            transform:     visible ? 'translateY(0)' : 'translateY(12px)',
            transition:    'opacity 500ms ease, transform 500ms ease',
          }}>
            Client Testimonials
          </div>

          <h2 style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      'clamp(30px, 4vw, 46px)',
            fontWeight:    800,
            color:         '#ffffff',
            letterSpacing: '-0.01em',
            marginBottom:  14,
            lineHeight:    1.1,
            opacity:       visible ? 1 : 0,
            transform:     visible ? 'translateY(0)' : 'translateY(16px)',
            transition:    'opacity 500ms ease 80ms, transform 500ms ease 80ms',
          }}>
            What Our Clients Say
          </h2>

          <p style={{
            fontFamily:  "'Nunito Sans', sans-serif",
            fontSize:    15,
            color:       'rgba(255,255,255,0.45)',
            maxWidth:    440,
            margin:      '0 auto',
            lineHeight:  1.65,
            opacity:     visible ? 1 : 0,
            transform:   visible ? 'translateY(0)' : 'translateY(16px)',
            transition:  'opacity 500ms ease 160ms, transform 500ms ease 160ms',
          }}>
            Trusted by importers, exporters, and freight forwarders
            across Africa, the Middle East, and beyond.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 24,
          alignItems:          'stretch',
          minWidth:            0,
        }} id="atlas-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              delay={i * 150}
              visible={visible}
            />
          ))}
        </div>

        {/* Bottom trust note */}
        <div style={{
          textAlign:  'center',
          marginTop:  48,
          opacity:    visible ? 1 : 0,
          transition: 'opacity 600ms ease 700ms',
        }}>
          <div style={{
            display:     'inline-flex',
            alignItems:  'center',
            gap:         10,
            padding:     '10px 20px',
            background:  'rgba(255,255,255,0.04)',
            borderRadius: 100,
            border:      '1px solid rgba(255,255,255,0.08)',
          }}>
            {/* Five stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                fill="#f97316" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
            <span style={{
              fontFamily:  "'Nunito Sans', sans-serif",
              fontSize:    13,
              fontWeight:  600,
              color:       'rgba(255,255,255,0.5)',
            }}>
              Rated 4.9 / 5 from 1,200+ verified reviews
            </span>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          #atlas-testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
