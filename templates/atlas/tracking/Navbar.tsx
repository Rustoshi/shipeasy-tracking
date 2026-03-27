'use client'

import type { CompanyBranding } from '@/types'

interface Props {
  company:    CompanyBranding
  trackingId: string
}

export default function AtlasTrackingNavbar({ company, trackingId }: Props) {

  const goHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `/${window.location.search}`
    }
  }

  const trackAnother = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `/${window.location.search}#track`
    }
  }

  return (
    <nav style={{
      position:       'sticky',
      top:            0,
      zIndex:         100,
      height:         64,
      background:     '#ffffff',
      borderBottom:   '1px solid #e5e7eb',
      boxShadow:      '0 1px 8px rgba(0,0,0,0.06)',
      display:        'flex',
      alignItems:     'center',
      padding:        '0 24px',
      gap:            16,
    }}>

      {/* ── Logo + name ── */}
      <button
        onClick={goHome}
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          padding:    0,
          flexShrink: 0,
        }}
      >
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            style={{
              height:    32,
              width:     'auto',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div style={{
            width:          34,
            height:         34,
            borderRadius:   8,
            background:     '#f97316',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize:   17,
              fontWeight: 700,
              color:      '#ffffff',
              lineHeight: 1,
            }}>
              {company.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="atlas-nav-company-name" style={{
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontSize:      20,
          fontWeight:    700,
          color:         '#111827',
          letterSpacing: '0.01em',
          lineHeight:    1,
        }}>
          {company.name}
        </span>
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* ── Tracking ID pill ── */}
      <div className="atlas-nav-tracking-pill" style={{
        display:       'flex',
        alignItems:    'center',
        gap:           6,
        background:    '#f9fafb',
        border:        '1px solid #e5e7eb',
        borderRadius:  100,
        padding:       '5px 14px',
        flexShrink:    0,
      }}>
        {/* Pulsing green dot — indicates live tracking */}
        <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <div style={{
            position:   'absolute',
            inset:      0,
            borderRadius: '50%',
            background: '#22c55e',
            animation:  'pulse-core 2s ease-in-out infinite',
          }} />
          <div style={{
            position:   'absolute',
            inset:      -3,
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.2)',
            animation:  'pulse-ring 2s ease-out infinite',
          }} />
        </div>
        <span style={{
          fontFamily:    "'JetBrains Mono', monospace",
          fontSize:      12,
          fontWeight:    600,
          color:         '#374151',
          letterSpacing: '0.04em',
        }}>
          {trackingId}
        </span>
      </div>

      {/* ── Track Another button ── */}
      <button
        className="atlas-nav-track-btn"
        onClick={trackAnother}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:           6,
          padding:       '8px 16px',
          background:    'transparent',
          border:        '1.5px solid #e5e7eb',
          borderRadius:  8,
          fontFamily:    "'Nunito Sans', sans-serif",
          fontSize:      13,
          fontWeight:    700,
          color:         '#374151',
          cursor:        'pointer',
          whiteSpace:    'nowrap',
          transition:    'all 200ms ease',
          flexShrink:    0,
        }}
        onMouseEnter={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.borderColor  = '#f97316'
          b.style.color        = '#f97316'
          b.style.background   = '#fff7ed'
        }}
        onMouseLeave={e => {
          const b = e.currentTarget as HTMLButtonElement
          b.style.borderColor  = '#e5e7eb'
          b.style.color        = '#374151'
          b.style.background   = 'transparent'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        <span>Track Another</span>
      </button>

      {/* CSS keyframes for pulsing dot + responsive */}
      <style>{`
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 640px) {
          .atlas-nav-company-name { display: none !important; }
          .atlas-nav-track-btn span { display: none !important; }
          .atlas-nav-track-btn { padding: 8px 10px !important; }
        }
        @media (max-width: 480px) {
          .atlas-nav-tracking-pill { padding: 4px 10px !important; }
          .atlas-nav-tracking-pill span { font-size: 10px !important; }
        }
      `}</style>
    </nav>
  )
}
