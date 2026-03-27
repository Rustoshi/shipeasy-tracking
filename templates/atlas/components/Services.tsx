'use client'

import { useRef, useState, useEffect } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────

function ShipIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/>
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 5.5 3.5 10.5 3.5 10.5"/>
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
      <path d="M12 10v4"/><path d="M8 13h8"/>
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-4 1L7 8.8c-1.4-.1-2.7-.4-4-.8-1-.3-2 .6-1.7 1.7.4 1.3.7 2.6.8 4L11 20c0 0 3-2 3.5-2.5"/>
      <path d="m15.07 5.73 2.33 6.06"/>
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
    </svg>
  )
}

function TrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="16" rx="2"/>
      <path d="M4 11h16"/>
      <path d="M12 3v8"/>
      <path d="m8 19-2 3"/><path d="m18 22-2-3"/>
      <circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>
    </svg>
  )
}

function WarehouseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/>
      <path d="M6 18h12"/><path d="M6 14h12"/>
      <rect x="8" y="14" width="8" height="8"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
      <path d="M2 8h4a10 10 0 0 1 0 8H2"/><path d="M22 8h-4a10 10 0 0 0 0 8h4"/>
    </svg>
  )
}

// ── Service card ──────────────────────────────────────────────────────────

interface ServiceCardProps {
  photo:       string
  icon:        React.ReactNode
  title:       string
  description: string
  delay:       number
  visible:     boolean
}

function ServiceCard({ photo, icon, title, description, delay, visible }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   '#ffffff',
        borderRadius: 16,
        overflow:     'visible',
        position:     'relative',
        boxShadow:    hovered
          ? '0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)'
          : '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition:   'transform 320ms ease, box-shadow 320ms ease',
        opacity:      visible ? 1 : 0,
      }}
    >
      <div style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}>

        {/* Photo */}
        <div style={{
          height:       200,
          borderRadius: '16px 16px 0 0',
          overflow:     'hidden',
          position:     'relative',
        }}>
          <div style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(${photo})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center',
            transform:          hovered ? 'scale(1.06)' : 'scale(1.0)',
            transition:         'transform 600ms ease',
          }} />
          <div style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18) 100%)',
          }} />
        </div>

        {/* Orange icon badge — half overlapping photo */}
        <div style={{
          position:       'absolute',
          top:            200 - 24,
          left:           20,
          width:          48,
          height:         48,
          borderRadius:   12,
          background:     '#f97316',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          boxShadow:      '0 4px 16px rgba(249,115,22,0.45)',
          zIndex:         10,
          transform:      hovered ? 'scale(1.08)' : 'scale(1)',
          transition:     'transform 200ms ease',
        }}>
          {icon}
        </div>

        {/* Card body */}
        <div style={{ padding: '36px 22px 26px' }}>
          <h3 style={{
            fontFamily:   "'Barlow Condensed', sans-serif",
            fontSize:     21,
            fontWeight:   700,
            color:        '#111827',
            marginBottom: 10,
            letterSpacing:'0.01em',
            lineHeight:   1.2,
          }}>
            {title}
          </h3>

          <p style={{
            fontFamily:   "'Nunito Sans', sans-serif",
            fontSize:     14,
            fontWeight:   400,
            color:        '#6b7280',
            lineHeight:   1.7,
            marginBottom: 18,
          }}>
            {description}
          </p>

          <a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           6,
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      13,
              fontWeight:    700,
              color:         '#f97316',
              textDecoration:'none',
              transition:    'gap 200ms ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.gap            = '10px'
              ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.gap            = '6px'
              ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'
            }}
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

const SERVICES = [
  {
    title:       'Ocean Freight',
    description: 'Full container loads and groupage shipments across all major global trade routes. Port-to-port and door-to-door options available.',
    photo:       'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
    // REPLACE_OCEAN_PHOTO
    icon:        <ShipIcon />,
  },
  {
    title:       'Air Freight',
    description: 'Time-critical air cargo on scheduled and charter services with priority customs clearance and same-day booking.',
    photo:       'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    // REPLACE_AIR_PHOTO
    icon:        <PlaneIcon />,
  },
  {
    title:       'Road Freight',
    description: 'Door-to-door overland transport with real-time GPS tracking at every checkpoint. Full and part-load options available.',
    photo:       'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    // REPLACE_ROAD_PHOTO
    icon:        <TruckIcon />,
  },
  {
    title:       'Rail Transport',
    description: 'Cost-effective rail freight solutions for long-distance overland cargo. Ideal for heavy goods between major trade corridors.',
    photo:       'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
    // REPLACE_RAIL_PHOTO
    icon:        <TrainIcon />,
  },
  {
    title:       'Warehousing & Fulfilment',
    description: 'Secure storage, inventory management, and order fulfilment services at strategically located distribution centres.',
    photo:       'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    // REPLACE_WAREHOUSE_PHOTO
    icon:        <WarehouseIcon />,
  },
  {
    title:       'International Freight',
    description: 'End-to-end international freight forwarding with customs brokerage, documentation, and compliance support in 180+ countries.',
    photo:       'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    // REPLACE_INTERNATIONAL_PHOTO
    icon:        <GlobeIcon />,
  },
]

export default function AtlasServices() {
  const ref               = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: '#ffffff',
        padding:    'clamp(64px, 10vw, 96px) 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Section heading ── */}
        <div style={{
          textAlign: 'center',
          marginBottom: 56,
        }}>
          {/* Orange overline */}
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
            Our Services
          </div>

          {/* Main heading */}
          <h2 style={{
            fontFamily:   "'Barlow Condensed', sans-serif",
            fontSize:     'clamp(30px, 4vw, 46px)',
            fontWeight:   800,
            color:        '#111827',
            letterSpacing:'-0.01em',
            marginBottom: 14,
            lineHeight:   1.1,
            opacity:      visible ? 1 : 0,
            transform:    visible ? 'translateY(0)' : 'translateY(16px)',
            transition:   'opacity 500ms ease 80ms, transform 500ms ease 80ms',
          }}>
            Complete Logistics Solutions
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   16,
            fontWeight: 400,
            color:      '#6b7280',
            maxWidth:   480,
            margin:     '0 auto',
            lineHeight: 1.65,
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 500ms ease 160ms, transform 500ms ease 160ms',
          }}>
            From express courier to ocean freight, we offer a complete
            range of shipping and logistics services tailored to your
            business needs.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 28,
        }} id="atlas-services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              photo={service.photo}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={i * 100}
              visible={visible}
            />
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          #atlas-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
