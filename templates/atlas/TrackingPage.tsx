'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CompanyBranding, PublicShipment, PublicShipmentHistory } from '@/types'

import AtlasTrackingNavbar from './tracking/Navbar'
import AtlasStatusCard from './tracking/StatusCard'
import AtlasTimelineDetails from './tracking/TimelineDetails'
import TrackingMap from '../shared/TrackingMap'

interface Props {
  company:    CompanyBranding
  shipment:   PublicShipment | null
  history:    PublicShipmentHistory[]
  trackingId: string
}

export default function AtlasTrackingPage({
  company,
  shipment,
  history,
  trackingId,
}: Props) {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState('')

  // ── Get search params on client ────────────────────────────────────────
  useEffect(() => {
    setSearchParams(window.location.search)
  }, [])

  // ── Load fonts ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = 'atlas-fonts'
    if (document.getElementById(id)) return
    const link  = document.createElement('link')
    link.id     = id
    link.rel    = 'stylesheet'
    link.href   = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=JetBrains+Mono:wght@400;600&display=swap'
    document.head.appendChild(link)
  }, [])

  // ── Load Smartsupp ──────────────────────────────────────────────────────
  useEffect(() => {
    if (
      company.support?.type !== 'smartsupp' ||
      !company.support?.smartsuppKey
    ) return

    const id = 'smartsupp-script-init'
    if (document.getElementById(id)) return

    const script   = document.createElement('script')
    script.id      = id
    script.text    = `
      window._smartsupp = window._smartsupp || {};
      _smartsupp.key = '${company.support.smartsuppKey}';
      window.smartsupp || (function(d) {
        var s,c,o=window.smartsupp=function(){o._.push(arguments)};
        o._=[];
        s=d.getElementsByTagName('script')[0];
        c=d.createElement('script');
        c.type='text/javascript';
        c.charset='utf-8';
        c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c,s);
      })(document);
    `
    document.head.appendChild(script)
  }, [company.support?.smartsuppKey, company.support?.type])

  // ── Not found state ─────────────────────────────────────────────────────
  if (!shipment) {
    return (
      <div style={{
        minHeight:   '100vh',
        background:  '#ffffff',
        fontFamily:  "'Nunito Sans', sans-serif",
      }}>
        <AtlasTrackingNavbar company={company} trackingId={trackingId} />

        <div style={{
          maxWidth:      520,
          margin:        '0 auto',
          padding:       '80px 24px',
          textAlign:     'center',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           16,
        }}>
          {/* Icon */}
          <div style={{
            width:          72,
            height:         72,
            borderRadius:   '50%',
            background:     '#fff7ed',
            border:         '2px solid #fed7aa',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       32,
          }}>
            🔍
          </div>

          <h1 style={{
            fontFamily:   "'Barlow Condensed', sans-serif",
            fontSize:     28,
            fontWeight:   800,
            color:        '#111827',
            letterSpacing:'-0.01em',
            margin:       0,
          }}>
            Shipment Not Found
          </h1>

          <p style={{
            fontSize:   15,
            color:      '#6b7280',
            lineHeight: 1.65,
            margin:     0,
          }}>
            We could not find a shipment with tracking ID{' '}
            <code style={{
              fontFamily:  "'JetBrains Mono', monospace",
              fontSize:    14,
              fontWeight:  600,
              color:       '#f97316',
              background:  '#fff7ed',
              padding:     '2px 8px',
              borderRadius: 4,
            }}>
              {trackingId}
            </code>
            . Please check the ID and try again.
          </p>

          {/* Search form */}
          <form
            onSubmit={e => {
              e.preventDefault()
              const input = (e.currentTarget.elements.namedItem('id') as HTMLInputElement)
              const id    = input.value.trim().toUpperCase()
              if (id) router.push(`/track/${id}${window.location.search}`)
            }}
            style={{
              width:   '100%',
              display: 'flex',
              gap:     0,
              marginTop: 8,
            }}
          >
            <input
              name="id"
              placeholder="Enter tracking ID"
              autoComplete="off"
              style={{
                flex:         1,
                padding:      '13px 16px',
                background:   '#f9fafb',
                border:       '1.5px solid #e5e7eb',
                borderRight:  'none',
                borderRadius: '8px 0 0 8px',
                fontFamily:   "'JetBrains Mono', monospace",
                fontSize:     14,
                color:        '#111827',
                outline:      'none',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = '#f97316'
                e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(249,115,22,0.10)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow   = 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding:      '13px 20px',
                background:   '#f97316',
                border:       'none',
                borderRadius: '0 8px 8px 0',
                color:        '#ffffff',
                fontFamily:   "'Nunito Sans', sans-serif",
                fontSize:     14,
                fontWeight:   700,
                cursor:       'pointer',
                whiteSpace:   'nowrap',
                transition:   'background 200ms',
              }}
              onMouseEnter={e =>
                (e.currentTarget as HTMLButtonElement).style.background = '#ea580c'
              }
              onMouseLeave={e =>
                (e.currentTarget as HTMLButtonElement).style.background = '#f97316'
              }
            >
              Track →
            </button>
          </form>

          {/* Back link */}
          <button
            onClick={() => router.push(`/${window.location.search}`)}
            style={{
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      13,
              color:         '#9ca3af',
              textDecoration:'underline',
              padding:       0,
            }}
          >
            ← Back to {company.name}
          </button>
        </div>
      </div>
    )
  }

  // ── Main tracking page ──────────────────────────────────────────────────
  return (
    <div style={{
      minHeight:  '100vh',
      background: '#f9fafb',
      fontFamily: "'Nunito Sans', sans-serif",
    }}>

      {/* Navbar */}
      <AtlasTrackingNavbar company={company} trackingId={trackingId} />

      {/* ── Print receipt bar ── */}
      <div style={{
        background:     '#fff7ed',
        borderBottom:   '1px solid #fed7aa',
        padding:        '10px 24px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        flexWrap:       'wrap',
        gap:            10,
      }}>
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        8,
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize:   13,
          color:      '#92400e',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          <span>
            Need a receipt for customs or records?
          </span>
        </div>
        <a
          href={`/receipt/${trackingId}${searchParams}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           6,
            padding:       '7px 16px',
            background:    '#f97316',
            border:        'none',
            borderRadius:  6,
            color:         '#ffffff',
            fontFamily:    "'Nunito Sans', sans-serif",
            fontSize:      13,
            fontWeight:    700,
            textDecoration:'none',
            whiteSpace:    'nowrap',
            transition:    'background 200ms',
          }}
          onMouseEnter={e =>
            (e.currentTarget as HTMLAnchorElement).style.background = '#ea580c'
          }
          onMouseLeave={e =>
            (e.currentTarget as HTMLAnchorElement).style.background = '#f97316'
          }
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print Receipt
        </a>
      </div>

      {/* Page content */}
      <div style={{
        maxWidth: 960,
        margin:   '0 auto',
        padding:  '32px 24px 64px',
      }}>

        {/* Status card */}
        <AtlasStatusCard shipment={shipment} />

        {/* Map */}
        <div style={{
          background:   '#ffffff',
          borderRadius: 16,
          border:       '1px solid #e5e7eb',
          overflow:     'hidden',
          marginBottom: 20,
          boxShadow:    '0 1px 8px rgba(0,0,0,0.04)',
        }}>
          {/* Map header */}
          <div style={{
            padding:        '16px 24px',
            borderBottom:   '1px solid #f3f4f6',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#f97316" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
              </svg>
              <span style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontSize:      16,
                fontWeight:    700,
                color:         '#111827',
                letterSpacing: '0.01em',
              }}>
                Shipment Route
              </span>
            </div>

            {/* Route pill */}
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          6,
              padding:      '4px 12px',
              background:   '#f9fafb',
              border:       '1px solid #e5e7eb',
              borderRadius: 100,
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     12,
              fontWeight:   600,
              color:        '#374151',
            }}>
              {shipment.originCountry}
              <span style={{ color: '#f97316' }}>→</span>
              {shipment.destinationCountry}
            </div>
          </div>

          {/* Map renders here */}
          <TrackingMap shipment={shipment} height={400} />
        </div>

        {/* Timeline + Details */}
        <AtlasTimelineDetails shipment={shipment} history={history} />

      </div>
    </div>
  )
}
