'use client'

import { useRef, useState, useEffect } from 'react'

const STEPS = [
  {
    number:      '01',
    title:       'Shipment Created',
    description: 'Your freight forwarder creates your shipment in the system and assigns a unique tracking ID.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
        <path d="m7.5 4.27 9 5.15M3.29 7 12 12l8.71-5M12 22V12"/>
        <circle cx="18.5" cy="15.5" r="2.5"/>
        <path d="M20.27 17.27 22 19"/>
      </svg>
    ),
  },
  {
    number:      '02',
    title:       'In Transit',
    description: 'Your cargo moves via sea, air, or road — tracked at every customs checkpoint and transfer hub.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    number:      '03',
    title:       'Customs Clearance',
    description: 'Import documentation is processed and your shipment clears customs at the destination country.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    number:      '04',
    title:       'Delivered',
    description: 'Your shipment reaches its final destination. You receive a delivery confirmation with proof of delivery.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
]

export default function AtlasHowItWorks() {
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
      id="how-it-works"
      ref={ref}
      style={{
        background: '#fff7ed',
        padding:    'clamp(64px, 10vw, 96px) 24px',
        overflow:   'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Section heading ── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
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
            The Process
          </div>

          <h2 style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      'clamp(30px, 4vw, 46px)',
            fontWeight:    800,
            color:         '#111827',
            letterSpacing: '-0.01em',
            marginBottom:  14,
            lineHeight:    1.1,
            opacity:       visible ? 1 : 0,
            transform:     visible ? 'translateY(0)' : 'translateY(16px)',
            transition:    'opacity 500ms ease 80ms, transform 500ms ease 80ms',
          }}>
            How Your Shipment Gets There
          </h2>

          <p style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   16,
            color:      '#6b7280',
            maxWidth:   480,
            margin:     '0 auto',
            lineHeight: 1.65,
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 500ms ease 160ms, transform 500ms ease 160ms',
          }}>
            From pickup to delivery, every step of your shipment's
            journey is documented and visible in real time.
          </p>
        </div>

        {/* ── Steps — desktop horizontal ── */}
        <div style={{ position: 'relative' }} id="atlas-steps-container">

          {/* Dashed connector line — desktop only */}
          <div
            id="atlas-connector-line"
            style={{
              position:   'absolute',
              top:        28,
              left:       '12.5%',
              right:      '12.5%',
              height:     2,
              zIndex:     0,
            }}
          >
            {/* Background track */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: 'repeating-linear-gradient(90deg, #fed7aa 0, #fed7aa 6px, transparent 6px, transparent 10px)',
              opacity:    0.5,
            }} />
            {/* Animated fill */}
            <div style={{
              position:     'absolute',
              inset:        0,
              background:   'repeating-linear-gradient(90deg, #f97316 0, #f97316 6px, transparent 6px, transparent 10px)',
              transformOrigin: 'left center',
              transform:    visible ? 'scaleX(1)' : 'scaleX(0)',
              transition:   'transform 1200ms cubic-bezier(0.4,0,0.2,1) 400ms',
            }} />
          </div>

          {/* Steps grid */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap:                 24,
            position:            'relative',
            zIndex:              1,
          }} id="atlas-steps-grid">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  textAlign:     'center',
                  opacity:       visible ? 1 : 0,
                  transform:     visible ? 'translateY(0)' : 'translateY(24px)',
                  transition:    `opacity 600ms ease ${200 + i * 150}ms,
                                  transform 600ms ease ${200 + i * 150}ms`,
                }}
              >
                {/* Step icon circle */}
                <div style={{
                  width:          56,
                  height:         56,
                  borderRadius:   '50%',
                  background:     '#f97316',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   20,
                  flexShrink:     0,
                  boxShadow:      '0 4px 20px rgba(249,115,22,0.35)',
                  position:       'relative',
                  zIndex:         2,
                  border:         '3px solid #fff7ed',
                  transition:     'transform 300ms ease, box-shadow 300ms ease',
                }}>
                  {step.icon}
                </div>

                {/* Step number */}
                <div style={{
                  fontFamily:    "'JetBrains Mono', monospace",
                  fontSize:      10,
                  fontWeight:    600,
                  letterSpacing: '0.15em',
                  color:         '#f97316',
                  marginBottom:  6,
                  opacity:       0.7,
                }}>
                  STEP {step.number}
                </div>

                {/* Step title */}
                <h3 style={{
                  fontFamily:   "'Barlow Condensed', sans-serif",
                  fontSize:     18,
                  fontWeight:   700,
                  color:        '#111827',
                  marginBottom: 10,
                  letterSpacing:'0.01em',
                  lineHeight:   1.2,
                }}>
                  {step.title}
                </h3>

                {/* Step description */}
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize:   13,
                  fontWeight: 400,
                  color:      '#6b7280',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Animated route path SVG ── */}
        <div style={{
          marginTop: 56,
          opacity:   visible ? 1 : 0,
          transition:'opacity 600ms ease 1000ms',
        }}>
          <svg
            viewBox="0 0 900 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 80, overflow: 'visible' }}
          >
            {/* Background path */}
            <path
              d="M 40 40 C 180 10, 320 70, 450 40 C 580 10, 720 70, 860 40"
              stroke="#fed7aa"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
            />

            {/* Animated foreground path — draws itself */}
            <path
              d="M 40 40 C 180 10, 320 70, 450 40 C 580 10, 720 70, 860 40"
              stroke="#f97316"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray:  1000,
                strokeDashoffset: visible ? 0 : 1000,
                transition:       'stroke-dashoffset 2000ms cubic-bezier(0.4,0,0.2,1) 600ms',
              }}
            />

            {/* Origin dot */}
            <circle cx="40" cy="40" r="6" fill="#f97316" />
            <circle cx="40" cy="40" r="12" fill="none"
              stroke="#f97316" strokeWidth="1.5" opacity="0.3">
              <animate attributeName="r" values="6;16;6" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>

            {/* Travelling dot — animates along path */}
            {visible && (
              <circle r="7" fill="#f97316"
                style={{ filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.8))' }}>
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 40 40 C 180 10, 320 70, 450 40 C 580 10, 720 70, 860 40"
                />
              </circle>
            )}

            {/* Destination dot */}
            <circle cx="860" cy="40" r="6" fill="#22c55e"
              opacity={visible ? 1 : 0}
              style={{ transition: 'opacity 400ms ease 2400ms' }} />
            <circle cx="860" cy="40" r="12" fill="none"
              stroke="#22c55e" strokeWidth="1.5" opacity="0.3">
              <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>

            {/* Origin label */}
            <text x="40" y="68" textAnchor="middle"
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      10,
                fill:          '#f97316',
                fontWeight:    600,
                letterSpacing: '0.1em',
                opacity:       0.7,
              }}>
              ORIGIN
            </text>

            {/* Destination label */}
            <text x="860" y="68" textAnchor="middle"
              style={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      10,
                fill:          '#22c55e',
                fontWeight:    600,
                letterSpacing: '0.1em',
                opacity:       0.7,
              }}>
              DESTINATION
            </text>
          </svg>
        </div>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #atlas-connector-line {
            display: none !important;
          }
          /* Vertical line for mobile */
          #atlas-steps-container::before {
            content: '';
            position: absolute;
            left: 27px;
            top: 56px;
            bottom: 0;
            width: 2px;
            background: repeating-linear-gradient(
              180deg,
              #f97316 0, #f97316 6px,
              transparent 6px, transparent 10px
            );
            opacity: 0.4;
            z-index: 0;
          }
          #atlas-steps-grid > div {
            flex-direction: row !important;
            text-align: left !important;
            align-items: flex-start !important;
            gap: 18px;
          }
          #atlas-steps-grid > div > div:first-child {
            flex-shrink: 0;
            margin-bottom: 0 !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          #atlas-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 48px 24px !important;
          }
          #atlas-connector-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
