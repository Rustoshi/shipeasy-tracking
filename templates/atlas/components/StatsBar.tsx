'use client'

import { useState, useEffect, useRef } from 'react'

// ── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(
  target: number,
  duration: number,
  triggered: boolean,
  decimals = 0
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!triggered) return
    let startTime: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = eased * target
      setValue(decimals > 0
        ? parseFloat(current.toFixed(decimals))
        : Math.floor(current)
      )
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration, decimals])

  return value
}

// ── Icons ──────────────────────────────────────────────────────────────────
function IconBox() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
      <path d="m7.5 4.27 9 5.15M3.29 7 12 12l8.71-5M12 22V12"/>
      <circle cx="18.5" cy="15.5" r="2.5"/>
      <path d="M20.27 17.27 22 19"/>
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  )
}
function IconTruck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    </svg>
  )
}
function IconHeadset() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function AtlasStatsBar() {
  const ref           = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Trigger count-up once when section enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shipments = useCountUp(248,   1800, visible, 0)
  const onTime    = useCountUp(99.4,  2200, visible, 1)
  const countries = useCountUp(140,   1600, visible, 0)

  const STATS = [
    {
      icon:    <IconBox />,
      value:   `${shipments.toLocaleString()}K+`,
      label:   'Shipments Tracked',
      detail:  'Across 180+ countries',
    },
    {
      icon:    <IconTruck />,
      value:   `${onTime}%`,
      label:   'On-Time Delivery',
      detail:  'Industry-leading rate',
    },
    {
      icon:    <IconGlobe />,
      value:   `${countries}+`,
      label:   'Countries Covered',
      detail:  'Global network',
    },
    {
      icon:    <IconHeadset />,
      value:   '24/7',
      label:   'Live Support',
      detail:  'Always available',
    },
  ]

  return (
    <section
      ref={ref}
      style={{
        background: '#111827',
        padding:    '0 24px',
      }}
    >
      <div
        id="atlas-stats-grid"
        style={{
          maxWidth:  1100,
          margin:    '0 auto',
          display:   'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          position:  'relative',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding:        '40px 24px',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              textAlign:      'center',
              gap:            10,
              position:       'relative',
              // Vertical divider between stats (not after last)
              borderRight: i < STATS.length - 1
                ? '1px solid rgba(255,255,255,0.07)'
                : 'none',
              // Entrance animation — stagger by index
              opacity:   visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `
                opacity   600ms ease ${i * 120}ms,
                transform 600ms ease ${i * 120}ms
              `,
            }}
          >
            {/* Icon */}
            <div style={{
              color:      'rgba(255,255,255,0.45)',
              lineHeight: 1,
            }}>
              {stat.icon}
            </div>

            {/* Number */}
            <div style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      'clamp(36px, 4vw, 52px)',
              fontWeight:    800,
              color:         '#f97316',
              lineHeight:    1,
              letterSpacing: '-0.01em',
            }}>
              {stat.value}
            </div>

            {/* Label */}
            <div style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      13,
              fontWeight:    700,
              color:         '#ffffff',
              letterSpacing: '0.02em',
              lineHeight:    1.3,
            }}>
              {stat.label}
            </div>

            {/* Supporting detail */}
            <div style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize:   11,
              fontWeight: 400,
              color:      'rgba(255,255,255,0.35)',
              lineHeight: 1.4,
            }}>
              {stat.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile grid: 2×2 */}
      <style>{`
        @media (max-width: 640px) {
          #atlas-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #atlas-stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 28px 16px !important;
          }
          #atlas-stats-grid > div:nth-child(3),
          #atlas-stats-grid > div:nth-child(4) {
            border-bottom: none !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          #atlas-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #atlas-stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          #atlas-stats-grid > div:nth-child(1),
          #atlas-stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          #atlas-stats-grid > div:nth-child(3),
          #atlas-stats-grid > div:nth-child(4) {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  )
}
