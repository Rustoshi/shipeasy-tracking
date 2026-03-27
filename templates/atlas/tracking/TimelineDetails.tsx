'use client'

import type {
  PublicShipment,
  PublicShipmentHistory,
  ShipmentStatus,
} from '@/types'

interface Props {
  shipment: PublicShipment
  history:  PublicShipmentHistory[]
}

const STATUS_DOT: Record<ShipmentStatus, string> = {
  'Pending':                  '#6b7280',
  'Shipment Created':         '#3b82f6',
  'Picked Up':                '#3b82f6',
  'Export Customs Clearance': '#f97316',
  'In Transit':               '#f97316',
  'Arrived at Destination':   '#22c55e',
  'Import Customs Clearance': '#f97316',
  'Out for Delivery':         '#22c55e',
  'Delivered':                '#22c55e',
  'On Hold':                  '#eab308',
  'Returned':                 '#ef4444',
  'Damaged':                  '#ef4444',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

function CardHeader({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div style={{
      padding:      '16px 20px',
      borderBottom: '1px solid #f3f4f6',
      display:      'flex',
      alignItems:   'center',
      gap:          8,
    }}>
      <div style={{ color: '#f97316' }}>{icon}</div>
      <span style={{
        fontFamily:    "'Barlow Condensed', sans-serif",
        fontSize:      17,
        fontWeight:    700,
        color:         '#111827',
        letterSpacing: '0.01em',
      }}>
        {title}
      </span>
    </div>
  )
}

function DetailRow({
  label,
  value,
  mono = false,
  highlight = false,
}: {
  label:      string
  value:      string | null | undefined
  mono?:      boolean
  highlight?: boolean
}) {
  if (!value) return null
  return (
    <div style={{
      display:       'flex',
      justifyContent:'space-between',
      alignItems:    'flex-start',
      padding:       '10px 20px',
      borderBottom:  '1px solid #f9fafb',
      gap:           16,
    }}>
      <span style={{
        fontFamily:    "'Nunito Sans', sans-serif",
        fontSize:      11,
        fontWeight:    700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color:         '#9ca3af',
        flexShrink:    0,
        paddingTop:    1,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono
          ? "'JetBrains Mono', monospace"
          : "'Nunito Sans', sans-serif",
        fontSize:   mono ? 12 : 13,
        fontWeight: highlight ? 700 : 500,
        color:      highlight ? '#f97316' : '#111827',
        textAlign:  'right',
        lineHeight: 1.5,
      }}>
        {value}
      </span>
    </div>
  )
}

export default function AtlasTimelineDetails({ shipment, history }: Props) {
  const sorted = [...history].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr',
      gap:                 20,
      alignItems:          'start',
    }} id="atlas-timeline-grid">

      {/* ══ LEFT: Timeline ══════════════════════════════════════ */}
      <div style={{
        background:   '#ffffff',
        borderRadius: 16,
        border:       '1px solid #e5e7eb',
        overflow:     'hidden',
        boxShadow:    '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        <CardHeader
          title="Status History"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          }
        />

        <div style={{ padding: '16px 20px' }}>
          {sorted.length === 0 ? (
            <div style={{
              textAlign:  'center',
              padding:    '32px 0',
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize:   14,
              color:      '#9ca3af',
            }}>
              No status updates yet
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sorted.map((entry, i) => {
                const dotColor = i === 0
                  ? STATUS_DOT[entry.status as ShipmentStatus] ?? '#6b7280'
                  : '#d1d5db'
                const isLatest = i === 0

                return (
                  <div
                    key={entry._id}
                    style={{
                      display:  'flex',
                      gap:      14,
                      position: 'relative',
                      paddingBottom: i < sorted.length - 1 ? 20 : 0,
                    }}
                  >
                    {/* Connector line */}
                    {i < sorted.length - 1 && (
                      <div style={{
                        position:   'absolute',
                        left:       9,
                        top:        22,
                        bottom:     0,
                        width:      2,
                        background: '#f3f4f6',
                        zIndex:     0,
                      }} />
                    )}

                    {/* Dot */}
                    <div style={{
                      width:          20,
                      height:         20,
                      borderRadius:   '50%',
                      background:     dotColor,
                      border:         `2.5px solid ${isLatest ? dotColor : '#e5e7eb'}`,
                      flexShrink:     0,
                      marginTop:      2,
                      position:       'relative',
                      zIndex:         1,
                      boxShadow:      isLatest
                        ? `0 0 0 4px ${dotColor}25` 
                        : 'none',
                    }} />

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Status name */}
                      <div style={{
                        fontFamily:   "'Barlow Condensed', sans-serif",
                        fontSize:     16,
                        fontWeight:   700,
                        color:        isLatest ? '#111827' : '#374151',
                        marginBottom: 3,
                        letterSpacing:'0.01em',
                      }}>
                        {entry.status}
                        {isLatest && (
                          <span style={{
                            marginLeft:    8,
                            fontFamily:    "'Nunito Sans', sans-serif",
                            fontSize:      10,
                            fontWeight:    700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color:         '#ffffff',
                            background:    dotColor,
                            padding:       '1px 6px',
                            borderRadius:  4,
                            verticalAlign: 'middle',
                          }}>
                            Latest
                          </span>
                        )}
                      </div>

                      {/* Remark */}
                      {entry.remark && (
                        <div style={{
                          fontFamily:   "'Nunito Sans', sans-serif",
                          fontSize:     13,
                          color:        '#6b7280',
                          marginBottom: 4,
                          lineHeight:   1.5,
                        }}>
                          {entry.remark}
                        </div>
                      )}

                      {/* Location + timestamp row */}
                      <div style={{
                        display:    'flex',
                        flexWrap:   'wrap',
                        gap:        '4px 12px',
                        alignItems: 'center',
                      }}>
                        {entry.location && (
                          <div style={{
                            display:    'flex',
                            alignItems: 'center',
                            gap:        3,
                          }}>
                            <svg width="11" height="11" viewBox="0 0 24 24"
                              fill="none" stroke="#9ca3af" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span style={{
                              fontFamily: "'Nunito Sans', sans-serif",
                              fontSize:   11,
                              color:      '#9ca3af',
                            }}>
                              {entry.location}
                            </span>
                          </div>
                        )}
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize:   10,
                          color:      '#9ca3af',
                        }}>
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ══ RIGHT: Shipment Details ══════════════════════════════ */}
      <div style={{
        background:   '#ffffff',
        borderRadius: 16,
        border:       '1px solid #e5e7eb',
        overflow:     'hidden',
        boxShadow:    '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        <CardHeader
          title="Shipment Details"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
              <path d="m7.5 4.27 9 5.15M3.29 7 12 12l8.71-5M12 22V12"/>
            </svg>
          }
        />

        {/* Sender section */}
        <div style={{
          padding:      '10px 20px 4px',
          fontFamily:   "'Nunito Sans', sans-serif",
          fontSize:     10,
          fontWeight:   700,
          letterSpacing:'0.15em',
          textTransform:'uppercase',
          color:        '#f97316',
          background:   '#fff7ed',
          borderBottom: '1px solid #fed7aa',
        }}>
          Sender
        </div>
        <DetailRow label="Name"    value={shipment.senderName}    />
        <DetailRow label="Address" value={shipment.senderAddress} />
        <DetailRow label="Country" value={shipment.originCountry} />

        {/* Receiver section */}
        <div style={{
          padding:      '10px 20px 4px',
          fontFamily:   "'Nunito Sans', sans-serif",
          fontSize:     10,
          fontWeight:   700,
          letterSpacing:'0.15em',
          textTransform:'uppercase',
          color:        '#f97316',
          background:   '#fff7ed',
          borderBottom: '1px solid #fed7aa',
          borderTop:    '1px solid #f3f4f6',
        }}>
          Receiver
        </div>
        <DetailRow label="Name"    value={shipment.receiverName}    />
        <DetailRow label="Address" value={shipment.receiverAddress} />
        <DetailRow label="Country" value={shipment.destinationCountry} />
        <DetailRow label="Email"   value={shipment.receiverEmail}   />
        <DetailRow label="Phone"   value={shipment.receiverPhone}   />

        {/* Package section */}
        <div style={{
          padding:      '10px 20px 4px',
          fontFamily:   "'Nunito Sans', sans-serif",
          fontSize:     10,
          fontWeight:   700,
          letterSpacing:'0.15em',
          textTransform:'uppercase',
          color:        '#f97316',
          background:   '#fff7ed',
          borderBottom: '1px solid #fed7aa',
          borderTop:    '1px solid #f3f4f6',
        }}>
          Package
        </div>
        <DetailRow
          label="Description"
          value={shipment.description}
        />
        <DetailRow
          label="Weight"
          value={`${shipment.weight} kg`}
          mono
        />
        <DetailRow
          label="Declared Value"
          value={`${shipment.currency} ${Number(shipment.declaredValue).toLocaleString()}`}
          mono
        />

        {/* Shipping fee — only shown when visible */}
        {shipment.charges?.visible && shipment.charges.amount > 0 && (
          <>
            <DetailRow
              label={shipment.charges.description ?? 'Shipping Fee'}
              value={`${shipment.charges.currency} ${Number(shipment.charges.amount).toLocaleString()}`}
              mono
              highlight
            />
            <div style={{
              display:       'flex',
              justifyContent:'space-between',
              alignItems:    'flex-start',
              padding:       '10px 20px',
              borderBottom:  '1px solid #f9fafb',
              gap:           16,
            }}>
              <span style={{
                fontFamily:    "'Nunito Sans', sans-serif",
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         '#9ca3af',
              }}>
                Payment Status
              </span>
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize:   11,
                fontWeight: 700,
                padding:    '3px 8px',
                borderRadius: 4,
                background: shipment.charges.status === 'Paid' ? '#dcfce7' :
                            shipment.charges.status === 'Partially paid' ? '#fef3c7' : '#fee2e2',
                color: shipment.charges.status === 'Paid' ? '#166534' :
                       shipment.charges.status === 'Partially paid' ? '#92400e' : '#991b1b',
              }}>
                {shipment.charges.status ?? 'Unpaid'}
              </span>
            </div>
          </>
        )}

        {/* Carrier */}
        {shipment.carrier?.name && (
          <DetailRow label="Carrier" value={shipment.carrier.name} />
        )}
        {shipment.carrier?.trackingCode && (
          <DetailRow
            label="Carrier Ref"
            value={shipment.carrier.trackingCode}
            mono
          />
        )}

        {/* Package photos */}
        {shipment.images && shipment.images.length > 0 && (
          <>
            <div style={{
              padding:      '10px 20px 4px',
              fontFamily:   "'Nunito Sans', sans-serif",
              fontSize:     10,
              fontWeight:   700,
              letterSpacing:'0.15em',
              textTransform:'uppercase',
              color:        '#f97316',
              background:   '#fff7ed',
              borderBottom: '1px solid #fed7aa',
              borderTop:    '1px solid #f3f4f6',
            }}>
              Package Photos
            </div>
            <div style={{
              padding:  '14px 20px',
              display:  'flex',
              gap:      10,
              flexWrap: 'wrap',
            }}>
              {shipment.images.map((url, i) => (
                <div
                  key={i}
                  onClick={() => window.open(url, '_blank')}
                  style={{
                    width:        80,
                    height:       80,
                    borderRadius: 8,
                    overflow:     'hidden',
                    cursor:       'pointer',
                    border:       '1px solid #e5e7eb',
                    flexShrink:   0,
                    position:     'relative',
                  }}
                >
                  <img
                    src={url}
                    alt={`Package photo ${i + 1}`}
                    style={{
                      width:     '100%',
                      height:    '100%',
                      objectFit: 'cover',
                      display:   'block',
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #atlas-timeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
