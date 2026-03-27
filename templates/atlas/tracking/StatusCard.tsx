'use client'

import { useEffect, useState } from 'react'
import type { PublicShipment, ShipmentStatus } from '@/types'
import { STATUS_PROGRESS } from '@/types'

interface Props {
  shipment: PublicShipment
}

const STATUS_COLOR: Record<ShipmentStatus, {
  dot: string; bg: string; text: string; border: string
}> = {
  'Pending':                  { dot: '#6b7280', bg: '#f9fafb', text: '#374151', border: '#e5e7eb' },
  'Shipment Created':         { dot: '#3b82f6', bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Picked Up':                { dot: '#3b82f6', bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Export Customs Clearance': { dot: '#f97316', bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'In Transit':               { dot: '#f97316', bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Arrived at Destination':   { dot: '#22c55e', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Import Customs Clearance': { dot: '#f97316', bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Out for Delivery':         { dot: '#22c55e', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Delivered':                { dot: '#22c55e', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'On Hold':                  { dot: '#eab308', bg: '#fefce8', text: '#a16207', border: '#fde68a' },
  'Returned':                 { dot: '#ef4444', bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
  'Damaged':                  { dot: '#ef4444', bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
}

// Journey milestones — order matters
const MILESTONES: { label: string; statuses: ShipmentStatus[] }[] = [
  {
    label:    'Created',
    statuses: ['Shipment Created', 'Picked Up', 'Export Customs Clearance',
               'In Transit', 'Arrived at Destination', 'Import Customs Clearance',
               'Out for Delivery', 'Delivered'],
  },
  {
    label:    'Picked Up',
    statuses: ['Picked Up', 'Export Customs Clearance', 'In Transit',
               'Arrived at Destination', 'Import Customs Clearance',
               'Out for Delivery', 'Delivered'],
  },
  {
    label:    'In Transit',
    statuses: ['In Transit', 'Arrived at Destination',
               'Import Customs Clearance', 'Out for Delivery', 'Delivered'],
  },
  {
    label:    'Customs',
    statuses: ['Import Customs Clearance', 'Out for Delivery', 'Delivered'],
  },
  {
    label:    'Delivered',
    statuses: ['Delivered'],
  },
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

export default function AtlasStatusCard({ shipment }: Props) {
  const [progressWidth, setProgressWidth] = useState(0)

  const color    = STATUS_COLOR[shipment.currentStatus]
  const progress = Math.max(0, STATUS_PROGRESS[shipment.currentStatus])
  const isNegative = STATUS_PROGRESS[shipment.currentStatus] < 0

  // Animate progress bar on mount
  useEffect(() => {
    const t = setTimeout(() => setProgressWidth(progress), 200)
    return () => clearTimeout(t)
  }, [progress])

  const isDelivered = shipment.currentStatus === 'Delivered'

  return (
    <div style={{
      background:   '#ffffff',
      borderRadius: 16,
      border:       '1px solid #e5e7eb',
      overflow:     'hidden',
      marginBottom: 20,
      boxShadow:    '0 1px 8px rgba(0,0,0,0.04)',
    }}>

      {/* ── Colored top accent bar ── */}
      <div style={{
        height:     4,
        background: isNegative
          ? '#ef4444'
          : `linear-gradient(90deg, #f97316, ${color.dot})`,
      }} />

      <div style={{
        display:  'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:      0,
      }} id="atlas-status-grid">

        {/* ── LEFT: Status info ── */}
        <div style={{
          padding:     '28px 32px',
          borderRight: '1px solid #f3f4f6',
        }} id="atlas-status-left">

          {/* Status badge */}
          <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          7,
            padding:      '5px 14px',
            background:   color.bg,
            border:       `1px solid ${color.border}`,
            borderRadius: 100,
            marginBottom: 18,
          }}>
            {/* Pulsing dot */}
            <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
              <div style={{
                position:   'absolute',
                inset:      0,
                borderRadius: '50%',
                background: color.dot,
              }} />
              {!isNegative && (
                <div style={{
                  position:   'absolute',
                  inset:      -3,
                  borderRadius: '50%',
                  background: color.dot,
                  opacity:    0.25,
                  animation:  'pulse-ring 2s ease-out infinite',
                }} />
              )}
            </div>
            <span style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      12,
              fontWeight:    700,
              color:         color.text,
              letterSpacing: '0.02em',
            }}>
              {shipment.currentStatus}
            </span>
          </div>

          {/* Large status name */}
          <div style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      'clamp(24px, 3vw, 36px)',
            fontWeight:    800,
            color:         '#111827',
            letterSpacing: '-0.01em',
            lineHeight:    1.1,
            marginBottom:  12,
          }}>
            {isDelivered ? '🎉 Package Delivered!' : shipment.currentStatus}
          </div>

          {/* Route */}
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        8,
            marginBottom: 20,
          }}>
            <span style={{
              fontFamily:  "'Nunito Sans', sans-serif",
              fontSize:    14,
              fontWeight:  600,
              color:       '#374151',
            }}>
              {shipment.originCountry}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#f97316" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span style={{
              fontFamily:  "'Nunito Sans', sans-serif",
              fontSize:    14,
              fontWeight:  600,
              color:       '#374151',
            }}>
              {shipment.destinationCountry}
            </span>
          </div>

          {/* Tracking ID */}
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          8,
            marginBottom: 10,
          }}>
            <span style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      11,
              fontWeight:    600,
              color:         '#9ca3af',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              flexShrink:    0,
            }}>
              Tracking ID
            </span>
            <code style={{
              fontFamily:  "'JetBrains Mono', monospace",
              fontSize:    13,
              fontWeight:  600,
              color:       '#f97316',
              background:  '#fff7ed',
              padding:     '2px 8px',
              borderRadius: 4,
            }}>
              {shipment.trackingId}
            </code>
          </div>

          {/* Last update timestamp */}
          <div style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize:   12,
            color:      '#9ca3af',
          }}>
            Last updated: {formatDate(shipment.updatedAt ?? shipment.createdAt)}
          </div>
        </div>

        {/* ── RIGHT: Progress ── */}
        <div style={{ padding: '28px 32px' }} id="atlas-status-right">

          {/* Progress label */}
          <div style={{
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'center',
            marginBottom:  10,
          }}>
            <span style={{
              fontFamily:    "'Nunito Sans', sans-serif",
              fontSize:      12,
              fontWeight:    700,
              color:         '#6b7280',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              Journey Progress
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize:   20,
              fontWeight: 800,
              color:      isNegative ? '#ef4444' : '#f97316',
            }}>
              {isNegative ? '—' : `${progress}%`}
            </span>
          </div>

          {/* Progress bar track */}
          <div style={{
            height:       8,
            background:   '#f3f4f6',
            borderRadius: 100,
            overflow:     'hidden',
            marginBottom: 28,
          }}>
            <div style={{
              height:       '100%',
              borderRadius: 100,
              width:        `${progressWidth}%`,
              background:   isNegative
                ? '#ef4444'
                : 'linear-gradient(90deg, #fb923c, #f97316)',
              transition:   'width 1200ms cubic-bezier(0.4,0,0.2,1)',
              boxShadow:    isNegative
                ? 'none'
                : '0 0 8px rgba(249,115,22,0.4)',
            }} />
          </div>

          {/* Milestone steps */}
          <div style={{
            position: 'relative',
            display:  'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            {/* Connector line behind dots */}
            <div style={{
              position:   'absolute',
              top:        10,
              left:       10,
              right:      10,
              height:     2,
              background: '#f3f4f6',
              zIndex:     0,
            }} />

            {MILESTONES.map((milestone, i) => {
              const reached = milestone.statuses.includes(shipment.currentStatus)
              const isLast  = i === MILESTONES.length - 1

              return (
                <div key={milestone.label} style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           6,
                  position:      'relative',
                  zIndex:        1,
                  flex:          isLast ? '0 0 auto' : 1,
                }}>
                  {/* Circle */}
                  <div style={{
                    width:          22,
                    height:         22,
                    borderRadius:   '50%',
                    background:     reached ? '#f97316' : '#e5e7eb',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    transition:     'background 400ms ease',
                    boxShadow:      reached
                      ? '0 0 0 3px rgba(249,115,22,0.20)'
                      : 'none',
                  }}>
                    {reached && (
                      <svg width="11" height="11" viewBox="0 0 24 24"
                        fill="none" stroke="white"
                        strokeWidth="3" strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <span style={{
                    fontFamily:  "'Nunito Sans', sans-serif",
                    fontSize:    10,
                    fontWeight:  reached ? 700 : 400,
                    color:       reached ? '#f97316' : '#9ca3af',
                    textAlign:   'center',
                    whiteSpace:  'nowrap',
                    letterSpacing: '0.02em',
                  }}>
                    {milestone.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Warning for negative states */}
          {isNegative && (
            <div style={{
              marginTop:    20,
              padding:      '12px 14px',
              background:   shipment.currentStatus === 'On Hold'
                ? '#fefce8'
                : '#fef2f2',
              border:       `1px solid ${shipment.currentStatus === 'On Hold'
                ? '#fde68a'
                : '#fecaca'}`,
              borderRadius: 8,
              display:      'flex',
              gap:          8,
              alignItems:   'flex-start',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>
                {shipment.currentStatus === 'On Hold' ? '⚠️' : '❌'}
              </span>
              <span style={{
                fontFamily:  "'Nunito Sans', sans-serif",
                fontSize:    12,
                color:       shipment.currentStatus === 'On Hold'
                  ? '#92400e'
                  : '#991b1b',
                lineHeight:  1.5,
              }}>
                {shipment.currentStatus === 'On Hold'
                  ? 'Your shipment is temporarily on hold. Our team is working to resolve this.'
                  : shipment.currentStatus === 'Returned'
                  ? 'This shipment has been returned to the sender.'
                  : 'This shipment has been flagged as damaged. Please contact support.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (max-width: 640px) {
          #atlas-status-grid {
            grid-template-columns: 1fr !important;
          }
          #atlas-status-left {
            border-right: none !important;
            border-bottom: 1px solid #f3f4f6;
            padding: 24px 20px !important;
          }
          #atlas-status-right {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  )
}
